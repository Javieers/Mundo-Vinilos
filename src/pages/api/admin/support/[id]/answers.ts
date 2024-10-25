// src/pages/api/admin/support/[id]/answers.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../../../../firebase/server';

export const GET: APIRoute = async ({ request, params, cookies }) => {
  const { id } = params;

  try {
    const sessionCookie = cookies.get('session')?.value;

    if (!sessionCookie) {
      return new Response(
        JSON.stringify({ status: 401, message: 'No autorizado.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (!decodedClaims.admin) {
      return new Response(
        JSON.stringify({ status: 403, message: 'Acceso denegado.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar que el caso de soporte exista
    const supportDoc = await adminFirestore.collection('support').doc(id).get();

    if (!supportDoc.exists) {
      return new Response(
        JSON.stringify({ status: 404, message: 'Caso de soporte no encontrado.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener las respuestas de la subcolección "answer"
    const answersSnapshot = await adminFirestore.collection('support').doc(id).collection('answer').orderBy('createdAt', 'asc').get();

    const answers = answersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    }));

    return new Response(
      JSON.stringify({ status: 200, answers }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al obtener las respuestas:', error);
    return new Response(
      JSON.stringify({ status: 500, message: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
