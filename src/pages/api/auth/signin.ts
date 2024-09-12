import type { APIRoute } from 'astro';
import { auth, firestore } from '../../../firebase/server';
import * as bcrypt from 'bcrypt';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'Faltan datos en el formulario'
      }), { status: 400 });
    }

    const usersRef = firestore.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'El usuario no existe'
      }), { status: 400 });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'Contraseña incorrecta'
      }), { status: 400 });
    }

    return new Response(JSON.stringify({
      status: 200,
      message: 'Inicio de sesión exitoso'
    }), { status: 200 });
  } catch (error: any) {
    console.error('Error during user login:', error);
    return new Response(JSON.stringify({
      status: 400,
      message: 'Algo salió mal: ' + error.message
    }), { status: 400 });
  }
};
