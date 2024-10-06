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
    const { productId, price, stock } = data;

    // Validar campos requeridos
    if (!productId || typeof price !== 'number' || typeof stock !== 'number') {
      return new Response(JSON.stringify({ message: 'Todos los campos son requeridos y deben ser válidos.' }), {
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

    // Intentar obtener el documento para verificar si ya existe
    const sellerProductDoc = await sellerProductRef.get();

    if (sellerProductDoc.exists) {
      await sellerProductRef.update({
        price: price,
        stock: stock,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      await sellerProductRef.set({
        price: price,
        stock: stock,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return new Response(JSON.stringify({ message: 'Precio y stock asignados correctamente.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: 'Error al asignar el producto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
