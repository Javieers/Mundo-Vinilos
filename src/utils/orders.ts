import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Asumiendo que usas Firebase

const db = getFirestore();

export async function getUserOrders(userId: string) {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const orders = [];
  querySnapshot.forEach(doc => {
    orders.push({ id: doc.id, ...doc.data() });
  });
  return orders;
}

export async function getSellerOrders(sellerId: string) {
  const q = query(collection(db, 'orders'), where('sellerId', '==', sellerId));
  const querySnapshot = await getDocs(q);
  const orders = [];
  querySnapshot.forEach(doc => {
    orders.push({ id: doc.id, ...doc.data() });
  });
  return orders;
}
