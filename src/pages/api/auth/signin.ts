import type { APIRoute } from 'astro';
import { app } from '../../../firebase/server';
import { getAuth } from 'firebase-admin/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  try {
    // Obtener el token de las cabeceras
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!idToken) {
      return new Response(JSON.stringify({ message: 'Token no encontrado' }), { status: 401 });
    }

    // Verificar el ID del token
    try {
      await auth.verifyIdToken(idToken);
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Token inválido o expirado' }), { status: 401 });
    }

    // Crear una cookie de sesión que expire en 5 días
    const fiveDays = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: fiveDays,
    });

    // Guardar la cookie
    cookies.set('session', sessionCookie, {
      path: '/',
      expires: new Date(Date.now() + fiveDays),
      httpOnly: true,
      secure: true, // Para mayor seguridad, habilita secure en producción.
    });

    // Redirigir a la página de perfil
    return redirect('/perfil');

  } catch (error) {
    console.error('Error al manejar la solicitud de inicio de sesión:', error);
    return new Response(JSON.stringify({ message: 'Error en el servidor' }), { status: 500 });
  }
};
