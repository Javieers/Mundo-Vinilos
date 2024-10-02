// src/pages/api/auth/signin.ts

import type { APIRoute } from 'astro';
import { adminAuth } from '../../../firebase/server';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Obtener el token de las cabeceras
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return new Response(JSON.stringify({ message: 'Token no encontrado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar el ID token y obtener los claims
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Token inválido o expirado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear una cookie de sesión que expire en 5 días
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 días en milisegundos
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // Establecer la cookie de sesión
    cookies.set('session', sessionCookie, {
      path: '/',
      maxAge: expiresIn / 1000, // maxAge en segundos
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 'true' en producción
    });

    // Devolver los roles del usuario para redirección en el cliente
    return new Response(
      JSON.stringify({
        message: 'Inicio de sesión exitoso',
        isSeller: decodedToken.seller || false,
        isAdmin: decodedToken.admin || false,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al manejar la solicitud de inicio de sesión:', error);
    return new Response(JSON.stringify({ message: 'Error en el servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
