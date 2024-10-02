import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../firebase/server';

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (!decodedClaims.seller) {
      return new Response(JSON.stringify({ message: 'Acceso denegado' }), { status: 403 });
    }

    const sellerId = decodedClaims.uid;
    const { productId, price, stock } = await request.json();

    if (!productId || price == null || stock == null) {
      return new Response(JSON.stringify({ message: 'Datos incompletos' }), { status: 400 });
    }

    // Obtener el nombre del producto
    const productDoc = await adminFirestore.collection('products').doc(productId).get();

    if (!productDoc.exists) {
      return new Response(JSON.stringify({ message: 'El producto no existe' }), { status: 404 });
    }

    const productData = productDoc.data();

    // Asignar el producto al vendedor
    await adminFirestore.collection('sellers').doc(sellerId).collection('products').doc(productId).set({
      name: productData.name,
      price,
      stock,
    });

    return new Response(JSON.stringify({ message: 'Producto asignado correctamente' }), { status: 200 });
  } catch (error) {
    console.error('Error al asignar el producto:', error);
    return new Response(JSON.stringify({ message: 'Error al asignar el producto', error: error.message }), { status: 500 });
  }
};
