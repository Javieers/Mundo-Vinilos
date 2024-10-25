// src/pages/api/support.ts

import type { APIRoute } from 'astro';
import { admin, adminAuth, adminFirestore } from '../../firebase/server';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Obtener la cookie de sesión utilizando el objeto 'cookies' de Astro
    const sessionCookie = cookies.get('session')?.value;

    if (!sessionCookie) {
      return new Response(
        JSON.stringify({ status: 401, message: 'No se encontró la cookie de sesión.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userId = decodedClaims.uid;

    // Obtener los datos del formulario
    const formData = await request.formData();
    const subject = formData.get('subject')?.toString();
    const orderNumber = formData.get('orderNumber')?.toString();
    const sellerName = formData.get('sellerName')?.toString();
    const message = formData.get('message')?.toString();

    // Validar campos obligatorios
    if (!subject || !message) {
      return new Response(
        JSON.stringify({ status: 400, message: 'Asunto y motivo son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Preparar los datos para Firestore
    const supportData = {
      userId,
      subject: subject.trim(),
      orderNumber: orderNumber?.trim() || null,
      sellerName: sellerName?.trim() || null,
      message: message.trim(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Agregar el documento a la colección "support"
    await adminFirestore.collection('support').add(supportData);

    // Responder con éxito
    return new Response(
      JSON.stringify({ status: 200, message: 'Tu solicitud de soporte ha sido enviada exitosamente. Nos pondremos en contacto contigo a la brevedad.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al procesar la solicitud de soporte:', error);
    return new Response(
      JSON.stringify({ status: 500, message: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
