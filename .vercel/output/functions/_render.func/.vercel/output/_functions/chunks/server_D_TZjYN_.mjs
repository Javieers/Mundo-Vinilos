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

export { auth as a, firestore as f, getProducts as g };
