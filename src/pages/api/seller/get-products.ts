// src/pages/api/seller/get-products.ts

import type { APIRoute } from 'astro';
import { adminFirestore, admin } from '../../../firebase/server';

export const GET: APIRoute = async () => {
  try {
    // Obtener los 9 productos más recientes
    const productsSnapshot = await adminFirestore.collection('products')
      .orderBy('createdAt', 'desc')
      .limit(9)
      .get();

    const productIds = productsSnapshot.docs.map(doc => doc.id);

    // Obtener todos los precios de vendedores para estos productos en una sola consulta
    const sellersProductsSnapshot = await adminFirestore.collectionGroup('products')
      .where('productId', 'in', productIds)
      .get();

    // Organizar los precios por productId
    const priceMap: { [key: string]: number[] } = {};

    sellersProductsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const pid = data.productId;
      const price = data.price;
      if (priceMap[pid]) {
        priceMap[pid].push(price);
      } else {
        priceMap[pid] = [price];
      }
    });

    // Construir la lista de productos con el precio más bajo
    const products = productsSnapshot.docs.map(doc => {
      const data = doc.data();
      const productId = doc.id;
      const prices = priceMap[productId] || [];
      const lowestPrice = prices.length > 0 ? Math.min(...prices) : 'N/A'; // 'N/A' si no hay precios

      return {
        id: productId,
        name: data.name,
        artistName: data.artistName,
        albumName: data.albumName,
        description: data.description,
        imageUrl: data.imageUrl,
        price: lowestPrice,
        // Puedes agregar más campos si es necesario
      };
    });

    console.log('Productos obtenidos:', products);

    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    return new Response(JSON.stringify({ message: 'Error al obtener productos.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
