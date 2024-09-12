import type { APIRoute } from 'astro';
import { auth, firestore } from '../../../firebase/server';
import * as bcrypt from 'bcrypt';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();

    if (!email || !password || !firstName || !lastName) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'Faltan datos en el formulario'
      }), { status: 400 });
    }

    const usersRef = firestore.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (!snapshot.empty) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'El correo ya está en uso'
      }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: firstName
    });

    await usersRef.doc(userRecord.uid).set({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({
      status: 200,
      message: 'Usuario creado con éxito'
    }), { status: 200 });
  } catch (error: any) {
    console.error('Error during user registration:', error);
    return new Response(JSON.stringify({
      status: 400,
      message: 'Algo salió mal: ' + error.message
    }), { status: 400 });
  }
};
