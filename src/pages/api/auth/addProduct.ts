import type { APIRoute } from 'astro';
import { adminFirestore } from '../../../firebase/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { sellerId, sellerName, productId, price, stock } = await request.json();

    if (!sellerId || !sellerName || !productId || !price || !stock) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'Faltan datos para agregar el producto del vendedor'
      }), { status: 400 });
    }

    // Añadir o actualizar el producto en la subcolección del vendedor
    const sellerProductRef = adminFirestore
      .collection('sellers')
      .doc(sellerId)
      .collection('products')
      .doc(productId);

    await sellerProductRef.set({
      productId,
      price,
      stock,
    });

    // Actualizar información del vendedor si es necesario
    const sellerRef = adminFirestore.collection('sellers').doc(sellerId);
    await sellerRef.set({
      sellerId,
      sellerName,
    }, { merge: true });

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
