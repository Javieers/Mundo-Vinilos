// src/pages/api/seller/deleteProduct.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../../firebase/server';

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (!decodedClaims.seller) {
      return new Response(JSON.stringify({ message: 'Acceso denegado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sellerId = decodedClaims.uid;
    const { productId } = await request.json();

    if (!productId) {
      return new Response(JSON.stringify({ message: 'ID de producto no proporcionado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Referencia al producto en la subcolección del vendedor
    const productRef = adminFirestore.collection('sellers').doc(sellerId).collection('products').doc(productId);

    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return new Response(JSON.stringify({ message: 'Producto no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Eliminar el producto
    await productRef.delete();

    return new Response(JSON.stringify({ message: 'Producto eliminado correctamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al eliminar el producto del vendedor:', error);
    return new Response(JSON.stringify({ message: 'Error al eliminar el producto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
