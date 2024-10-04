// src/pages/api/seller/get-assigned-products.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore, admin } from '../../../firebase/server';

export const GET: APIRoute = async ({ request, cookies }) => {
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

    // Obtener los productos asignados al vendedor
    const sellerProductsSnapshot = await adminFirestore
      .collection('sellers')
      .doc(sellerId)
      .collection('products')
      .get();

    const productIds = sellerProductsSnapshot.docs.map(doc => doc.id);

    console.log('Product IDs asignados:', productIds);

    if (productIds.length === 0) {
      console.log('No hay productos asignados a este vendedor.');
      return new Response(JSON.stringify({ products: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Firestore permite un máximo de 10 elementos en una consulta 'in'
    // Si hay más de 10 productos, debemos dividir la consulta
    const chunks = [];
    const chunkSize = 10;
    for (let i = 0; i < productIds.length; i += chunkSize) {
      chunks.push(productIds.slice(i, i + chunkSize));
    }

    let products: any[] = [];

    for (const chunk of chunks) {
      const productsSnapshot = await adminFirestore
        .collection('products')
        .where(admin.firestore.FieldPath.documentId(), 'in', chunk)
        .get();

      const chunkProducts = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      products = products.concat(chunkProducts);
    }

    console.log('Productos asignados:', products);

    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al obtener productos asignados:', error);
    return new Response(JSON.stringify({ message: 'Error al obtener productos asignados.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
