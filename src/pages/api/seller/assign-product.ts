// src/pages/api/seller/assign-product.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore, admin } from '../../../firebase/server';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get('session')?.value;

    if (!sessionCookie) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const sellerId = decodedClaims.uid;

    // Obtener el cuerpo de la solicitud
    const data = await request.json();
    const { productId, price, stock, estadoVinilo, estadoCaratula } = data;

    // Validar campos requeridos
    if (
      !productId ||
      typeof price !== 'number' ||
      typeof stock !== 'number' ||
      !estadoVinilo ||
      !estadoCaratula
    ) {
      return new Response(JSON.stringify({ message: 'Todos los campos son requeridos y deben ser válidos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validar valores de estadoVinilo y estadoCaratula
    const estadosValidos = ['Nuevo', 'Usado'];
    if (!estadosValidos.includes(estadoVinilo) || !estadosValidos.includes(estadoCaratula)) {
      return new Response(JSON.stringify({ message: 'Los valores de estado del vinilo y carátula son inválidos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Referencia al producto en la subcolección del vendedor
    const sellerProductRef = adminFirestore
      .collection('sellers')
      .doc(sellerId)
      .collection('products')
      .doc(productId);

    // Obtener los datos del producto principal
    const productDoc = await adminFirestore.collection('products').doc(productId).get();

    if (!productDoc.exists) {
      return new Response(JSON.stringify({ message: 'El producto no existe.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const productData = productDoc.data();

    // Definir el tipo de datos del producto del vendedor
    interface SellerProductData {
      productId: string;
      name: string;
      artistName: string;
      description: string;
      imageUrl: string;
      price: number;
      stock: number;
      estadoVinilo: string;
      estadoCaratula: string;
      updatedAt: FirebaseFirestore.FieldValue;
      createdAt?: FirebaseFirestore.FieldValue; // Propiedad opcional
    }

    // Preparar los datos para guardar en la subcolección del vendedor
    const sellerProductData: SellerProductData = {
      productId: productId,
      name: productData?.name ?? '',
      artistName: productData?.artistName ?? '',
      description: productData?.description ?? '',
      imageUrl: productData?.imageUrl ?? '',
      price: price,
      stock: stock,
      estadoVinilo: estadoVinilo,
      estadoCaratula: estadoCaratula,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Intentar obtener el documento para verificar si ya existe
    const sellerProductDoc = await sellerProductRef.get();

    if (sellerProductDoc.exists) {
      // Si el documento existe, actualizamos los datos usando 'set' con 'merge: true'
      await sellerProductRef.set(sellerProductData, { merge: true });
    } else {
      // Si el documento no existe, agregamos 'createdAt' y creamos el documento
      sellerProductData.createdAt = admin.firestore.FieldValue.serverTimestamp();
      await sellerProductRef.set(sellerProductData);
    }

    return new Response(JSON.stringify({ message: 'Precio y stock asignados correctamente.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al asignar el producto:', error);
    return new Response(JSON.stringify({ message: 'Error al asignar el producto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
