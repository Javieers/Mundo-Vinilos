import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  // Elimina la cookie de sesión
  cookies.delete('session', { path: '/' });

  // Redirige a la página principal u otra página después de cerrar sesión
  return redirect('/');
};
