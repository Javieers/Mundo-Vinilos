// src/pages/api/seller/edit-product.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../../firebase/server';
import { FieldValue } from 'firebase-admin/firestore';

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
    const { productId, price, stock } = await request.json();

    if (!productId || price == null || stock == null) {
      return new Response(JSON.stringify({ message: 'Datos de producto inválidos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Referencia al producto en la subcolección del vendedor
    const productRef = adminFirestore
      .collection('sellers')
      .doc(sellerId)
      .collection('products')
      .doc(productId);

    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return new Response(JSON.stringify({ message: 'Producto no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Actualizar el producto
    await productRef.update({
      price,
      stock,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return new Response(JSON.stringify({ message: 'Producto actualizado correctamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al editar el producto del vendedor:', error);
    return new Response(JSON.stringify({ message: 'Error al editar el producto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
