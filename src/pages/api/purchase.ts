// src/pages/api/purchase.ts
import type { APIRoute } from 'astro';
import { getAuth } from 'firebase-admin/auth';
import { app, firestore } from '../../firebase/server';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  // Obtener la cookie de sesión
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    return new Response('No autorizado', { status: 401 });
  }

  try {
    // Verificar y decodificar la cookie de sesión
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userId = decodedClaims.uid;

    // Obtener los datos del formulario
    const formData = await request.formData();
    const productId = formData.get('productId') as string;
    const sellerId = formData.get('sellerId') as string;
    const sellerName = formData.get('sellerName') as string;
    const price = formData.get('price') as string;

    // Validar los datos recibidos
    if (!productId || !sellerId || !price) {
      return new Response('Datos incompletos', { status: 400 });
    }

    // Crear el objeto de compra
    const purchaseData = {
      userId,
      productId,
      sellerId,
      sellerName,
      price: parseFloat(price),
      date: new Date(), // Guarda la fecha como Date de JS
    };

    // Guardar la compra en la subcolección 'purchases' dentro del usuario
    await firestore.collection('users').doc(userId).collection('purchases').add(purchaseData);

    // Redirigir al usuario al perfil o a una página de confirmación
    return redirect('/perfil');

  } catch (error) {
    console.error('Error al procesar la compra:', error);
    return new Response('Error al procesar la compra', { status: 500 });
  }
};
