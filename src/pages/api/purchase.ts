// src/pages/api/purchase.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../firebase/server';
import admin from 'firebase-admin';
import bcrypt from 'bcrypt'; // Asegúrate de tener bcrypt instalado

// Función para generar un Order ID de 5 caracteres
function generateOrderId(length: number = 5): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for(let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Función para generar un PIN de 4 dígitos
function generatePIN(length: number = 4): string {
  let pin = '';
  for(let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10).toString();
  }
  return pin;
}

// Función para asegurar la unicidad del Order ID
async function generateUniqueOrderId(length: number = 5): Promise<string> {
  let unique = false;
  let orderId = '';
  
  while (!unique) {
    orderId = generateOrderId(length);
    const q = adminFirestore.collection('orders').where('orderId', '==', orderId);
    const snapshot = await q.get();
    if (snapshot.empty) {
      unique = true;
    }
  }
  
  return orderId;
}

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
    const { productId, sellerId, price, quantity, estadoVinilo, estadoCaratula } = await request.json();

    // Validar los datos recibidos
    if (
      !productId ||
      !sellerId ||
      typeof price !== 'number' ||
      typeof quantity !== 'number' ||
      !estadoVinilo ||
      !estadoCaratula
    ) {
      return new Response(JSON.stringify({ message: 'Datos de compra inválidos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validar valores de estadoVinilo y estadoCaratula
    const estadosValidos = ['Nuevo', 'Usado','nuevo', 'usado'];
    if (!estadosValidos.includes(estadoVinilo) || !estadosValidos.includes(estadoCaratula)) {
      return new Response(JSON.stringify({ message: 'Los valores de estado del vinilo y carátula son inválidos.' }), {
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

    // Generar un Order ID único de 5 caracteres
    const orderId = await generateUniqueOrderId();

    // Generar un PIN de 4 dígitos
    const pin = generatePIN();

    // Opcional: Hash del PIN para mayor seguridad
    // const hashedPin = await bcrypt.hash(pin, 10);

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

      const productData = productDoc.data();
      const sellerProductData = sellerProductDoc.data();

      if (sellerProductData.stock < quantity) {
        throw new Error('Stock insuficiente del vendedor');
      }

      // Actualizar el stock del vendedor
      transaction.update(sellerProductRef, {
        stock: admin.firestore.FieldValue.increment(-quantity),
      });

      // Obtener campos adicionales del producto
      const isPreOrder = productData?.isPreOrder ?? false;
      const releaseDate = productData?.releaseDate ?? null;

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
        isPreOrder,
        releaseDate,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        pin, // Almacenar el PIN en texto plano
        estadoVinilo, // Nuevo campo
        estadoCaratula, // Nuevo campo
        // pin: hashedPin, // Si decides hashear el PIN
      };

      // Registrar la compra en la subcolección de compras del usuario
      transaction.set(userPurchasesRef.doc(orderId), purchaseData);

      // Registrar la orden en la colección 'orders'
      transaction.set(ordersRef.doc(orderId), purchaseData);
    });

    // Enviar el PIN al usuario de manera segura
    // Por ejemplo, en la respuesta de la API, o por email
    // Aquí, lo devolvemos en la respuesta
    return new Response(
      JSON.stringify({ message: 'Compra realizada con éxito', orderId, pin }),
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
