// src/pages/api/seller/assign-product.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore, admin } from '../../../firebase/server';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get('session')?.value;

    console.log('Session Cookie:', sessionCookie);

    if (!sessionCookie) {
      console.error('No session cookie found.');
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    console.log('Decoded Claims:', decodedClaims);

    const sellerId = decodedClaims.uid;
    console.log('Seller ID:', sellerId);

    // Obtener el cuerpo de la solicitud
    const data = await request.json();
    console.log('Data received:', data);

    const { productId, price, stock } = data;

    // Validar campos requeridos
    if (!productId || typeof price !== 'number' || typeof stock !== 'number') {
      console.error('Missing or invalid required fields:', data);
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
      // Actualizar los campos price y stock
      await sellerProductRef.update({
        price: price,
        stock: stock,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Producto ${productId} actualizado para vendedor ${sellerId} con price: ${price}, stock: ${stock}`);
    } else {
      // Crear un nuevo documento con price y stock
      await sellerProductRef.set({
        price: price,
        stock: stock,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Producto ${productId} asignado al vendedor ${sellerId} con price: ${price}, stock: ${stock}`);
    }

    return new Response(JSON.stringify({ message: 'Precio y stock asignados correctamente.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al asignar el producto:', error);
    console.error('Error stack:', error.stack);

    // Manejar errores específicos
    if (error.code === 'auth/invalid-session-cookie') {
      return new Response(JSON.stringify({ message: 'Cookie de sesión inválida.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Error al asignar el producto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
