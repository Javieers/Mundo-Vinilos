// /api/user/submit-review.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../../firebase/server';
import { Timestamp } from 'firebase-admin/firestore';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Verificar la autenticación del usuario
    const sessionCookie = cookies.get('session')?.value;

    if (!sessionCookie) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userId = decodedClaims.uid;

    // Obtener los datos del cuerpo de la solicitud
    const data = await request.json();
    console.log('Datos recibidos en el servidor:', data);

    const { orderId, rating, reviewText } = data;

    // Validaciones básicas
    if (!orderId || typeof orderId !== 'string' || orderId.trim() === '') {
      return new Response(JSON.stringify({ message: 'El orderId es inválido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (rating == null || typeof rating !== 'number') {
      return new Response(JSON.stringify({ message: 'La calificación es requerida y debe ser un número.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim() === '') {
      return new Response(JSON.stringify({ message: 'La reseña es requerida y debe ser una cadena.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validar que la calificación esté entre 1 y 10
    if (rating < 1 || rating > 10) {
      return new Response(JSON.stringify({ message: 'La calificación debe estar entre 1 y 10.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validar que la reseña no exceda los 200 caracteres
    if (reviewText.length > 200) {
      return new Response(JSON.stringify({ message: 'La reseña debe tener un máximo de 200 caracteres.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Obtener la orden desde Firestore
    const purchaseDoc = await adminFirestore.collection('orders').doc(orderId).get();

    if (!purchaseDoc.exists) {
      console.log('No se encontró la compra con orderId:', orderId);
      return new Response(JSON.stringify({ message: 'Compra no encontrada.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const purchase = purchaseDoc.data();

    // Verificar que la orden pertenece al usuario
    if (purchase.userId !== userId) {
      return new Response(JSON.stringify({ message: 'No autorizado.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar que el estado es "Completado"
    if (purchase.status !== 'Completado') {
      return new Response(JSON.stringify({ message: 'La compra no está completada.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar si ya existe una reseña para esta orden
    const reviewSnapshot = await adminFirestore
      .collection('reviews')
      .where('orderId', '==', orderId)
      .limit(1)
      .get();

    if (!reviewSnapshot.empty) {
      return new Response(JSON.stringify({ message: 'Ya has enviado una reseña para esta compra.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear la reseña en Firestore
    await adminFirestore.collection('reviews').add({
      userId,
      sellerId: purchase.sellerId,
      productId: purchase.productId,
      orderId,
      rating,
      reviewText,
      createdAt: Timestamp.now(),
    });

    return new Response(JSON.stringify({ message: 'Reseña enviada exitosamente.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error al enviar la reseña:', error);

    return new Response(JSON.stringify({ message: 'Error al enviar la reseña.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
