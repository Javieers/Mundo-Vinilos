import 'dotenv/config';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error("Faltan variables de entorno necesarias para Firebase");
}
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "YOUR_STORAGE_BUCKET"
  });
}
const auth = getAuth();
const firestore = getFirestore();
getStorage().bucket();
async function getProducts() {
  const querySnapshot = await firestore.collection("products").get();
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}
async function getSellerProductInfo(productId) {
  try {
    const sellersRef = firestore.collection("sellers");
    const snapshot = await sellersRef.where("productId", "==", productId).get();
    if (snapshot.empty) {
      return [];
    }
    const sellers = snapshot.docs.map((doc) => ({
      sellerName: doc.data().sellerName,
      sellerId: doc.data().sellerId,
      // Asegúrate de capturar el sellerId correcto
      price: doc.data().price,
      stock: doc.data().stock
    }));
    return sellers;
  } catch (error) {
    console.error("Error obteniendo información de vendedores:", error);
    return [];
  }
}
async function getSellerInfo(sellerId) {
  try {
    const sellerSnapshot = await firestore.collection("sellers").where("sellerId", "==", sellerId).get();
    if (sellerSnapshot.empty) {
      throw new Error("Vendedor no encontrado");
    }
    const sellerData = sellerSnapshot.docs[0].data();
    const products = await Promise.all(sellerSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const productDoc = await firestore.collection("products").doc(data.productId).get();
      if (!productDoc.exists) {
        return {
          productId: data.productId,
          sellerName: data.sellerName,
          price: data.price,
          stock: data.stock,
          name: "Nombre no disponible"
          // Si no existe el producto, retorna un nombre predeterminado
        };
      }
      return {
        productId: data.productId,
        sellerName: data.sellerName,
        price: data.price,
        stock: data.stock,
        name: productDoc.data().name
        // Nombre del producto
      };
    }));
    return {
      seller: {
        sellerName: sellerData.sellerName,
        sellerImage: sellerData.sellerImage || "",
        // Imagen del vendedor
        reviews: sellerData.reviews || []
        // Reseñas del vendedor (puede estar vacío)
      },
      products
    };
  } catch (error) {
    console.error("Error obteniendo la información del vendedor:", error);
    throw new Error("Error al obtener la información del vendedor");
  }
}

export { getSellerInfo as a, auth as b, getSellerProductInfo as c, firestore as f, getProducts as g };
