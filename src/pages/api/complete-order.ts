// src/pages/api/complete-order.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../firebase/server';

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

    if (!decodedClaims || !decodedClaims.seller) {
      return new Response(JSON.stringify({ message: 'Acceso denegado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sellerId = decodedClaims.uid;
    const { orderId } = await request.json();

    if (!orderId) {
      return new Response(JSON.stringify({ message: 'Falta el ID de la orden' }), {
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

    // Actualizar el estado de la orden
    await orderRef.update({
      status: 'Completado',
    });

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
