// src/pages/api/auth/register.ts
import type { APIRoute } from 'astro';
import { admin, adminAuth, adminFirestore } from '../../../firebase/server';
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

    // Validar contraseña: al menos 6 caracteres, incluyendo letras y números
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.'
      }), { status: 400 });
    }

    const usersRef = adminFirestore.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (!snapshot.empty) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'El correo ya está en uso'
      }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    await usersRef.doc(userRecord.uid).set({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // Marca de tiempo
    });

    return new Response(JSON.stringify({
      status: 200,
      message: 'Usuario creado con éxito'
    }), { status: 200 });
  } catch (error: any) {
    console.error('Error durante el registro del usuario:', error);
    return new Response(JSON.stringify({
      status: 400,
      message: 'Algo salió mal: ' + error.message
    }), { status: 400 });
  }
};
