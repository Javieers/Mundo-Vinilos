// src/userFunctions.js
import { auth, createUserWithEmailAndPassword } from './firebaseConfig';

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado:", userCredential.user);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}
