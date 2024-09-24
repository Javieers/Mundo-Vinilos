// mundo-vinilos/absolute-antimatter/src/pages/api/auth/addSellerProduct.ts
import type { APIRoute } from 'astro';
import { firestore } from '../../../firebase/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { sellerId, sellerName, productId, price, stock } = await request.json();

    if (!sellerId || !sellerName || !productId || !price || !stock) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'Faltan datos para agregar el producto del vendedor'
      }), { status: 400 });
    }

    const sellersRef = firestore.collection('sellers');
    await sellersRef.add({
      sellerId,
      sellerName,
      productId,
      price,
      stock,
    });

    return new Response(JSON.stringify({
      status: 200,
      message: 'Producto del vendedor añadido con éxito'
    }), { status: 200 });
  } catch (error: any) {
    console.error('Error añadiendo producto del vendedor:', error);
    return new Response(JSON.stringify({
      status: 400,
      message: 'Algo salió mal: ' + error.message
    }), { status: 400 });
  }
};
