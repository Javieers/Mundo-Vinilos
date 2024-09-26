import 'dotenv/config';
import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// Verifica que las variables de entorno estén definidas
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error("Faltan variables de entorno necesarias para Firebase");
}

// Tus credenciales del servicio
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Inicializa la aplicación Firebase si no está ya inicializada
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "YOUR_STORAGE_BUCKET"
  });
}

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage().bucket();

// Obtener todos los productos disponibles en la colección 'products'
async function getProducts() {
  const querySnapshot = await firestore.collection('products').get();
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

// Guardar información del producto para un vendedor en la subcolección 'products'
export async function saveSellerProductInfo(sellerId: string, productId: string, price: number, stock: number) {
  try {
    const productData = {
      productId,
      price,
      stock,
    };
    
    // Guarda en la subcolección 'products' dentro del vendedor
    const productRef = firestore.collection('sellers').doc(sellerId).collection('products').doc(productId);
    await productRef.set(productData);

    console.log(`Producto ${productId} guardado para el vendedor ${sellerId}`);
    return { productId, ...productData };
  } catch (error) {
    console.error('Error al guardar la información del producto para el vendedor:', error);
    throw new Error('Error al guardar la información del producto para el vendedor');
  }
}

// Obtener precios y stock de productos para un vendedor específico
export async function getSellerProductInfo(productId: string) {
  try {
    const sellersRef = firestore.collection('sellers'); // Colección de vendedores
    const snapshot = await sellersRef.get(); // Obtiene todos los documentos de vendedores

    const sellersWithProduct = []; // Array para almacenar los vendedores que tienen este producto

    // Iterar sobre cada vendedor para encontrar productos en su subcolección
    for (const doc of snapshot.docs) {
      const sellerId = doc.id; // ID del vendedor
      const productSnapshot = await sellersRef.doc(sellerId).collection('products').where('productId', '==', productId).get();

      if (!productSnapshot.empty) {
        productSnapshot.forEach(productDoc => {
          const productData = productDoc.data();
          sellersWithProduct.push({
            sellerId: sellerId,
            sellerName: doc.data().sellerName,
            price: productData.price,
            stock: productData.stock,
          });
        });
      }
    }

    return sellersWithProduct; // Retorna los vendedores que tienen el producto específico
  } catch (error) {
    console.error('Error obteniendo información de vendedores:', error);
    return [];
  }
}

// Obtener información de un vendedor específico junto con los productos que vende
export async function getSellerInfo(sellerId: string) {
  try {
    const sellerRef = firestore.collection('sellers').doc(sellerId);
    const sellerSnapshot = await sellerRef.get();
    
    if (!sellerSnapshot.exists) {
      throw new Error('Vendedor no encontrado');
    }

    const sellerData = sellerSnapshot.data();

    // Obtener todos los productos listados por el vendedor en su subcolección 'products'
    const productSnapshot = await sellerRef.collection('products').get();

    const products = await Promise.all(productSnapshot.docs.map(async (doc) => {
      const productId = doc.id;
      const sellerProductData = doc.data();
      
      // Obtener la información del producto desde la colección 'products'
      const productDoc = await firestore.collection('products').doc(productId).get();

      if (!productDoc.exists) {
        return {
          productId,
          price: sellerProductData.price,
          stock: sellerProductData.stock,
          name: 'Producto no disponible',
        };
      }

      return {
        productId,
        price: sellerProductData.price,
        stock: sellerProductData.stock,
        name: productDoc.data().name,  // Nombre del producto
        description: productDoc.data().description,
        imageUrl: productDoc.data().imageUrl,
      };
    }));

    return {
      seller: {
        sellerName: sellerData?.sellerName,
        sellerImage: sellerData?.sellerImage || '',  // Imagen del vendedor
        reviews: sellerData?.reviews || [],  // Reseñas del vendedor
      },
      products,
    };
  } catch (error) {
    console.error('Error obteniendo la información del vendedor:', error);
    throw new Error('Error al obtener la información del vendedor');
  }
}

export { auth, firestore, getProducts };
