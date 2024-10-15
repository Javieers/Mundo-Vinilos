// src/pages/api/complete-order.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../firebase/server';
import admin from 'firebase-admin';
import bcrypt from 'bcrypt'; // Solo si hasheaste el PIN

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

    if (!decodedClaims || !decodedClaims.seller) {
      return new Response(JSON.stringify({ message: 'Acceso denegado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sellerId = decodedClaims.uid;
    const { orderId, pin } = await request.json();

    if (!orderId || !pin) {
      return new Response(JSON.stringify({ message: 'Falta el ID de la orden o el PIN' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar que la orden pertenece al vendedor
    const orderRef = adminFirestore.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return new Response(JSON.stringify({ message: 'Orden no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const orderData = orderDoc.data();

    if (orderData.sellerId !== sellerId) {
      return new Response(JSON.stringify({ message: 'No tienes permiso para modificar esta orden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (orderData.status === 'Completado') {
      return new Response(JSON.stringify({ message: 'Orden ya está completada' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar el PIN
    const isPinValid = orderData.pin === pin;
    // Si hasheaste el PIN, utiliza bcrypt.compare
    // const isPinValid = await bcrypt.compare(pin, orderData.pin);

    if (!isPinValid) {
      return new Response(JSON.stringify({ message: 'PIN inválido' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Actualizar el estado de la orden
    await orderRef.update({
      status: 'Completado',
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Opcional: Enviar notificación al usuario de que la orden ha sido completada

    return new Response(JSON.stringify({ message: 'Orden marcada como completada' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al marcar la orden como completada:', error);
    return new Response(JSON.stringify({ message: `Error al marcar la orden como completada: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
