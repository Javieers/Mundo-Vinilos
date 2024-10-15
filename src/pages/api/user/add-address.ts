// src/pages/api/user/add-address.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../../firebase/server';
import admin from 'firebase-admin';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get('session')?.value;

    if (!sessionCookie) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userId = decodedClaims.uid;

    // Obtener el cuerpo de la solicitud
    const data = await request.json();
    const { region, comuna, direccion, numeroContacto } = data;

    // Validar campos requeridos
    if (
      !region ||
      !comuna ||
      !direccion
    ) {
      return new Response(JSON.stringify({ message: 'Región, comuna y dirección son requeridas.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Opcional: Validar que la región sea una de las regiones válidas de Chile
    const regionesValidas = [
      'Arica y Parinacota',
      'Tarapacá',
      'Antofagasta',
      'Atacama',
      'Coquimbo',
      'Valparaíso',
      'Metropolitana',
      'O’Higgins',
      'Maule',
      'Ñuble',
      'Biobío',
      'Araucanía',
      'Los Ríos',
      'Los Lagos',
      'Aysén',
      'Magallanes',
    ];

    if (!regionesValidas.includes(region)) {
      return new Response(JSON.stringify({ message: 'Región inválida.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Actualizar la dirección del usuario en Firestore
    const userRef = adminFirestore.collection('users').doc(userId);

    // Obtener los datos actuales del usuario
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return new Response(JSON.stringify({ message: 'Usuario no encontrado.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Actualizar o agregar la dirección
    await userRef.update({
      address: {
        region,
        comuna,
        direccion,
        numeroContacto: numeroContacto || '',
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new Response(JSON.stringify({ message: 'Dirección agregada/actualizada correctamente.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error al agregar la dirección:', error);
    return new Response(JSON.stringify({ message: 'Error al agregar la dirección.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
