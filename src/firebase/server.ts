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

async function getProducts() {
  const querySnapshot = await firestore.collection('products').get();
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

// Guardar información del vendedor en la colección 'sellers'
export async function saveSellerProductInfo(sellerId: string, sellerName: string, productId: string, price: number, stock: number) {
  try {
    const sellerData = {
      sellerId,
      sellerName,
      productId,
      price,
      stock,
      reviews: [], // Inicializa como un array vacío
    };
    const docRef = await firestore.collection('sellers').add(sellerData); // Guarda el documento en Firestore
    console.log('Información del vendedor guardada con ID:', docRef.id); // Mensaje en consola
    return { id: docRef.id, ...sellerData };
  } catch (error) {
    console.error('Error al guardar la información del vendedor:', error);
    throw new Error('Error al guardar la información del vendedor');
  }
}


// Obtener vendedores que venden un producto específico
export async function getSellerProductInfo(productId) {
  try {
    const sellersRef = firestore.collection('sellers');
    const snapshot = await sellersRef.where('productId', '==', productId).get();

    if (snapshot.empty) {
      return [];
    }

    const sellers = snapshot.docs.map(doc => ({
      sellerName: doc.data().sellerName,
      sellerId: doc.data().sellerId, // Asegúrate de capturar el sellerId correcto
      price: doc.data().price,
      stock: doc.data().stock,
    }));

    return sellers;
  } catch (error) {
    console.error('Error obteniendo información de vendedores:', error);
    return [];
  }
}

// Obtener información del vendedor por su ID
export async function getSellerInfo(sellerId: string) {
  try {
    // Obtener la información del vendedor por ID desde la colección "sellers"
    const sellerSnapshot = await firestore.collection('sellers').where('sellerId', '==', sellerId).get();
    
    // Verificar si el vendedor existe
    if (sellerSnapshot.empty) {
      throw new Error('Vendedor no encontrado');
    }

    const sellerData = sellerSnapshot.docs[0].data(); // Tomar los datos del primer documento del vendedor

    // Obtener todos los productos que este vendedor ha listado
    const products = await Promise.all(sellerSnapshot.docs.map(async doc => {
      const data = doc.data();
      const productDoc = await firestore.collection('products').doc(data.productId).get();

      if (!productDoc.exists) {
        return {
          productId: data.productId,
          sellerName: data.sellerName,
          price: data.price,
          stock: data.stock,
          name: 'Nombre no disponible', // Si no existe el producto, retorna un nombre predeterminado
        };
      }

      return {
        productId: data.productId,
        sellerName: data.sellerName,
        price: data.price,
        stock: data.stock,
        name: productDoc.data().name, // Nombre del producto
      };
    }));

    // Retornar la información del vendedor y los productos que ofrece
    return {
      seller: {
        sellerName: sellerData.sellerName,
        sellerImage: sellerData.sellerImage || '',  // Imagen del vendedor
        reviews: sellerData.reviews || [],  // Reseñas del vendedor (puede estar vacío)
      },
      products
    };
  } catch (error) {
    console.error('Error obteniendo la información del vendedor:', error);
    throw new Error('Error al obtener la información del vendedor');
  }
}


export { auth, firestore, getProducts };
