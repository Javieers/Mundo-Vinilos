// src/pages/api/purchase.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../firebase/server';
import admin from 'firebase-admin'; // Importamos 'admin' desde 'firebase-admin'

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

    if (!decodedClaims) {
      return new Response(JSON.stringify({ message: 'Sesión inválida' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userId = decodedClaims.uid;

    // Obtener los datos de la solicitud
    const { productId, sellerId, price, quantity } = await request.json();

    // Validar los datos recibidos
    if (!productId || !sellerId || typeof price !== 'number' || typeof quantity !== 'number') {
      return new Response(JSON.stringify({ message: 'Datos de compra inválidos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Referencias a Firestore
    const productRef = adminFirestore.collection('products').doc(productId);
    const sellerProductRef = adminFirestore
      .collection('sellers')
      .doc(sellerId)
      .collection('products')
      .doc(productId);
    const userPurchasesRef = adminFirestore.collection('users').doc(userId).collection('purchases');
    const ordersRef = adminFirestore.collection('orders');

    // Generar un número de orden único
    const orderId = ordersRef.doc().id;

    // Ejecutar la compra en una transacción para asegurar la consistencia
    await adminFirestore.runTransaction(async (transaction) => {
      const productDoc = await transaction.get(productRef);
      const sellerProductDoc = await transaction.get(sellerProductRef);

      if (!productDoc.exists) {
        throw new Error('Producto no encontrado');
      }

      if (!sellerProductDoc.exists) {
        throw new Error('El vendedor no ofrece este producto');
      }

      const sellerProductData = sellerProductDoc.data();

      if (sellerProductData.stock < quantity) {
        throw new Error('Stock insuficiente del vendedor');
      }

      // Actualizar el stock del vendedor
      transaction.update(sellerProductRef, {
        stock: admin.firestore.FieldValue.increment(-quantity),
      });

      // Registrar la compra en un objeto
      const purchaseData = {
        orderId, // Guardar el ID de la orden
        productId: productId,
        sellerId: sellerId,
        userId: userId,
        price: price,
        quantity: quantity,
        total: price * quantity,
        status: 'Pendiente',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // Registrar la compra en la subcolección de compras del usuario
      transaction.set(userPurchasesRef.doc(orderId), purchaseData);

      // Registrar la orden en la colección 'orders'
      transaction.set(ordersRef.doc(orderId), purchaseData);
    });

    return new Response(
      JSON.stringify({ message: 'Compra realizada con éxito', orderId }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error al procesar la compra:', error);
    return new Response(
      JSON.stringify({
        message: `Error al procesar la compra: ${error.message}`,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
