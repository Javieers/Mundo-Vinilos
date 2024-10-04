// src/pages/api/seller/add-new-product.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore, admin } from '../../../firebase/server';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get('session')?.value;

    console.log('Session Cookie:', sessionCookie);

    if (!sessionCookie) {
      console.error('No session cookie found.');
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    console.log('Decoded Claims:', decodedClaims);

    const sellerId = decodedClaims.uid;
    console.log('Seller ID:', sellerId);

    // Obtener el cuerpo de la solicitud
    const data = await request.json();
    console.log('Data received:', data);

    const { name, artistName, albumName, description, imageUrl } = data;

    // Validar campos requeridos
    if (!name || !artistName || !albumName || !description || !imageUrl) {
      console.error('Missing required fields:', data);
      return new Response(JSON.stringify({ message: 'Todos los campos son requeridos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Agregar producto a la colección "products"
    const productRef = adminFirestore.collection('products').doc(); // Genera un nuevo ID
    await productRef.set({
      name,
      artistName,
      albumName,
      description,
      imageUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`Producto agregado a 'products': ${productRef.id}`);

    // Agregar referencia en la subcolección del vendedor
    const sellerProductRef = adminFirestore
      .collection('sellers')
      .doc(sellerId)
      .collection('products')
      .doc(productRef.id);
    await sellerProductRef.set({
      productId: productRef.id,
      price: 0, // Inicialmente 0, puede ser actualizado luego
      stock: 0, // Inicialmente 0, puede ser actualizado luego
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`Referencia agregada a 'sellers/${sellerId}/products/${productRef.id}'`);

    return new Response(JSON.stringify({ message: 'Producto agregado correctamente.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al agregar el producto:', error);
    console.error('Error stack:', error.stack);

    // Manejar errores específicos
    if (error.code === 'auth/invalid-session-cookie') {
      return new Response(JSON.stringify({ message: 'Cookie de sesión inválida.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Error al agregar el producto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
