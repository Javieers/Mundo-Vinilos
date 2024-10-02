// src/pages/api/seller/initialize.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../../firebase/server';
import { FieldValue } from 'firebase-admin/firestore'; // Importamos FieldValue

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (!decodedClaims.seller) {
      return new Response(JSON.stringify({ message: 'Acceso denegado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sellerId = decodedClaims.uid;
    const sellerEmail = decodedClaims.email;

    // Verificar si el documento del vendedor existe
    const sellerDocRef = adminFirestore.collection('sellers').doc(sellerId);
    const sellerDoc = await sellerDocRef.get();

    if (!sellerDoc.exists) {
      // Crear el documento del vendedor
      await sellerDocRef.set({
        name: sellerEmail, // Puedes solicitar un nombre personalizado
        email: sellerEmail,
        createdAt: FieldValue.serverTimestamp(), // Usamos FieldValue aquí
      });
    }

    return new Response(JSON.stringify({ message: 'Vendedor inicializado correctamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al inicializar el vendedor:', error);
    return new Response(JSON.stringify({ message: 'Error al inicializar el vendedor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
