// src/pages/api/admin/setSellerClaim.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../firebase/server';
import { FieldValue } from 'firebase-admin/firestore'; // Importar FieldValue correctamente

export const POST: APIRoute = async ({ request, cookies }) => {
  // Verificar si el usuario que hace la solicitud es un administrador
  const sessionCookie = cookies.get('session')?.value;
  if (!sessionCookie) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let decodedClaims;
  try {
    decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!decodedClaims.admin) {
      return new Response(JSON.stringify({ message: 'Acceso denegado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error al verificar la cookie de sesión:', error);
    return new Response(JSON.stringify({ message: 'Error al verificar la sesión' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Obtener el email del usuario al que se le asignará el rol de vendedor
  const { email, storeName } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ message: 'Email no proporcionado' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Obtener el usuario por email
    const userRecord = await adminAuth.getUserByEmail(email);

    // Asignar el rol de vendedor
    await adminAuth.setCustomUserClaims(userRecord.uid, { seller: true });

    // Crear el documento en la colección 'sellers' si no existe
    const sellerDocRef = adminFirestore.collection('sellers').doc(userRecord.uid);
    const sellerDoc = await sellerDocRef.get();

    if (!sellerDoc.exists) {
      // Crear el documento del vendedor con información adicional si se proporciona
      await sellerDocRef.set({
        name: storeName || email, // Usa storeName si se proporciona, de lo contrario el email
        email: email,
        createdAt: FieldValue.serverTimestamp(), // Usar FieldValue correctamente
      });
    }

    return new Response(JSON.stringify({ message: 'Rol de vendedor asignado y documento creado' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al asignar el rol de vendedor:', error);
    return new Response(JSON.stringify({ message: 'Error al asignar el rol de vendedor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
