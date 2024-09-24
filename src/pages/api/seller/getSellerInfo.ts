// mundo-vinilos/absolute-antimatter/src/pages/api/sellers/getSellerInfo.ts
import type { APIRoute } from 'astro';
import { firestore } from '../../../firebase/server';

export const GET: APIRoute = async ({ params }) => {
  try {
    const sellerId = params.id;  // Se recibe el sellerId de los parámetros de la URL

    if (!sellerId) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'El ID del vendedor es necesario'
      }), { status: 400 });
    }

    // Obtener la información del vendedor
    const sellerDoc = await firestore.collection('sellers').doc(sellerId).get();
    if (!sellerDoc.exists) {
      return new Response(JSON.stringify({
        status: 404,
        message: 'Vendedor no encontrado'
      }), { status: 404 });
    }

    const sellerData = sellerDoc.data();

    // Obtener todos los productos asociados al vendedor
    const productsSnapshot = await firestore.collection('sellers')
      .where('sellerId', '==', sellerId).get();
    
    const products = productsSnapshot.docs.map(doc => doc.data());

    // Enviar la información completa del vendedor
    return new Response(JSON.stringify({
      status: 200,
      seller: sellerData,
      products
    }), { status: 200 });
  } catch (error: any) {
    console.error('Error obteniendo la información del vendedor:', error);
    return new Response(JSON.stringify({
      status: 500,
      message: 'Error al obtener la información del vendedor: ' + error.message
    }), { status: 500 });
  }
};
