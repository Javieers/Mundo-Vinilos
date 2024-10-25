// src/pages/api/admin/support.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../../firebase/server';

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get('session')?.value;

    if (!sessionCookie) {
      return new Response(
        JSON.stringify({ status: 401, message: 'No autorizado.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (!decodedClaims.admin) {
      return new Response(
        JSON.stringify({ status: 403, message: 'Acceso denegado.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener todos los casos de soporte
    const supportSnapshot = await adminFirestore.collection('support').orderBy('createdAt', 'desc').get();

    const supportCases = supportSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    }));

    return new Response(
      JSON.stringify({ status: 200, supportCases }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al obtener los casos de soporte:', error);
    return new Response(
      JSON.stringify({ status: 500, message: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
