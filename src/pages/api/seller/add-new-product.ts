// src/pages/api/seller/add-new-product.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore, admin } from '../../../firebase/server';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get('session')?.value;

    if (!sessionCookie) {
      console.error('No session cookie found.');
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const sellerId = decodedClaims.uid;

    // Obtener el cuerpo de la solicitud
    const data = await request.json();

    const {
      name,
      artistName,
      albumName,
      genres,
      tracklist,
      additionalInfo,
      imageUrl,
      isPreOrder,
      releaseDate,
    } = data;

    // Validar campos requeridos
    if (
      !name ||
      !artistName ||
      !albumName ||
      !genres ||
      !Array.isArray(genres) ||
      genres.length === 0 ||
      !tracklist ||
      !imageUrl
    ) {
      console.error('Missing required fields:', data);
      return new Response(JSON.stringify({ message: 'Todos los campos obligatorios son requeridos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Si es preventa, validar que releaseDate esté presente
    if (isPreOrder && !releaseDate) {
      console.error('Release date is required for pre-orders.');
      return new Response(JSON.stringify({ message: 'La fecha de salida es requerida para preventas.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // **Nueva validación: Verificar si el producto ya existe**
    const existingProductSnapshot = await adminFirestore
      .collection('products')
      .where('albumName', '==', albumName)
      .limit(1)
      .get();

    if (!existingProductSnapshot.empty) {
      console.error(`Producto con albumName "${albumName}" ya existe.`);
      return new Response(
        JSON.stringify({
          message: 'Este producto ya existe, por favor agrega precio y stock en la sección con el mismo nombre.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Convertir releaseDate a Timestamp de Firestore si está presente
    const releaseDateTimestamp = releaseDate ? admin.firestore.Timestamp.fromDate(new Date(releaseDate)) : null;

    // Agregar producto a la colección "products"
    const productRef = adminFirestore.collection('products').doc(); // Genera un nuevo ID
    await productRef.set({
      name,
      artistName,
      albumName,
      genres,
      tracklist,
      additionalInfo: additionalInfo || '',
      imageUrl,
      isPreOrder: isPreOrder || false,
      releaseDate: releaseDateTimestamp,
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
      productId: productRef.id, // Agregar el campo 'productId'
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
