// src/pages/api/admin/support/[id]/answer.ts

import type { APIRoute } from 'astro';
import { admin, adminAuth, adminFirestore } from '../../../../../firebase/server';

export const POST: APIRoute = async ({ request, params, cookies }) => {
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

    // Obtener el cuerpo de la solicitud
    const { message } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ status: 400, message: 'El mensaje es obligatorio.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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

    // Agregar la respuesta en la subcolección "answer"
    await adminFirestore.collection('support').doc(id).collection('answer').add({
      message: message.trim(),
      adminId: decodedClaims.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new Response(
      JSON.stringify({ status: 200, message: 'Respuesta enviada con éxito.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al responder al caso de soporte:', error);
    return new Response(
      JSON.stringify({ status: 500, message: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
