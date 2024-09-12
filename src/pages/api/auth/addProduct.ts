import type { APIRoute } from 'astro';
import { firestore } from '../../../firebase/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const product = await request.json();

    const productsRef = firestore.collection('products');
    await productsRef.add(product);

    return new Response(JSON.stringify({
      status: 200,
      message: 'Producto añadido con éxito'
    }), { status: 200 });
  } catch (error: any) {
    console.error('Error añadiendo producto:', error);
    return new Response(JSON.stringify({
      status: 400,
      message: 'Algo salió mal: ' + error.message
    }), { status: 400 });
  }
};
