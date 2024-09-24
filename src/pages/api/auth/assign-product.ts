import type { APIRoute } from 'astro';
import { firestore } from '../../../../firebase/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { sellerId, sellerName, productId, price, stock } = data;

    // Validar que todos los campos necesarios estén presentes
    if (!sellerId || !sellerName || !productId || price == null || stock == null) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'Faltan datos en la solicitud'
      }), { status: 400 });
    }

    // Referencia a la colección de sellers
    const sellersRef = firestore.collection('sellers');

    // Guardar información del vendedor
    await sellersRef.add({
      sellerId,
      sellerName,
      productId,
      price,
      stock
    });

    return new Response(JSON.stringify({
      status: 200,
      message: 'Información del vendedor guardada correctamente'
    }), { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar información del vendedor:', error);
    return new Response(JSON.stringify({
      status: 500,
      message: 'Algo salió mal: ' + error.message
    }), { status: 500 });
  }
};
