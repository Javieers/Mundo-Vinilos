import { f as firestore, b as auth } from '../../../chunks/server_B6Bxn1q6.mjs';
import * as bcrypt from 'bcrypt';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    if (!email || !password || !firstName || !lastName) {
      return new Response(JSON.stringify({
        status: 400,
        message: "Faltan datos en el formulario"
      }), { status: 400 });
    }
    const usersRef = firestore.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (!snapshot.empty) {
      return new Response(JSON.stringify({
        status: 400,
        message: "El correo ya está en uso"
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
      password: hashedPassword
    });
    return new Response(JSON.stringify({
      status: 200,
      message: "Usuario creado con éxito"
    }), { status: 200 });
  } catch (error) {
    console.error("Error during user registration:", error);
    return new Response(JSON.stringify({
      status: 400,
      message: "Algo salió mal: " + error.message
    }), { status: 400 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
