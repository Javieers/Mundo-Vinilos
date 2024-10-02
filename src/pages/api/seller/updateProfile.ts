// src/pages/api/seller/updateProfile.ts

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
    const { name } = await request.json();

    if (!name) {
      return new Response(JSON.stringify({ message: 'Nombre no proporcionado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Actualizar el documento del vendedor
    await adminFirestore.collection('sellers').doc(sellerId).update({
      name: name,
      updatedAt: FieldValue.serverTimestamp(), // Usamos FieldValue aquí
    });

    return new Response(JSON.stringify({ message: 'Perfil actualizado correctamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar el perfil del vendedor:', error);
    return new Response(JSON.stringify({ message: 'Error al actualizar el perfil' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
