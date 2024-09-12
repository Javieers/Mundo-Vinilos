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

export { auth, firestore, getProducts};
