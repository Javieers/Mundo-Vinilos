import type { APIRoute } from 'astro';
import { adminAuth } from '../../../firebase/server';

export const POST: APIRoute = async ({ request }) => {
  const { idToken } = await request.json();

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const isSeller = decodedToken.seller || false;

    return new Response(JSON.stringify({ isSeller }), { status: 200 });
  } catch (error) {
    console.error('Error al verificar los claims:', error);
    return new Response(JSON.stringify({ error: 'Error al verificar los claims' }), { status: 500 });
  }
};
