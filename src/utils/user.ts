import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

// Obtener usuario por ID
export async function getUserById(userId: string) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (!userDoc.exists()) {
    throw new Error('User not found');
  }
  return { id: userDoc.id, ...userDoc.data() };
}
