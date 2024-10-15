// src/pages/api/search-order.ts

import type { APIRoute } from 'astro';
import { adminFirestore } from '../../firebase/server';

export const POST: APIRoute = async ({ request }) => {
  const { orderId } = await request.json();

  if (!orderId || orderId.length !== 5) {
    return new Response(JSON.stringify({ success: false, message: 'Order ID inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Buscar la orden por orderId
    const ordersRef = adminFirestore.collection('orders').where('orderId', '==', orderId);
    const snapshot = await ordersRef.get();

    if (snapshot.empty) {
      return new Response(JSON.stringify({ success: false, message: 'Orden no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const orderDoc = snapshot.docs[0];
    const orderData = orderDoc.data();

    // Función interna para obtener el nombre del usuario
    async function getUserName(userId: string): Promise<string> {
      const userDoc = await adminFirestore.collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        return userData?.firstName ? userData.firstName : userData?.email || 'Nombre no disponible';
      }
      return 'Nombre no disponible';
    }

    const userName = await getUserName(orderData.userId);

    return new Response(JSON.stringify({
      success: true,
      order: {
        orderId: orderData.orderId,
        productId: orderData.productId,
        userId: orderData.userId,
        quantity: orderData.quantity,
        price: orderData.price,
        total: orderData.total,
        status: orderData.status,
        createdAt: orderData.createdAt,
        pin: orderData.pin, // Asegúrate de manejar el PIN de forma segura en el frontend
        userName: userName,
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al buscar la orden:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error al buscar la orden' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
