import { f as firestore } from '../../../chunks/server_D_TZjYN_.mjs';
import * as bcrypt from 'bcrypt';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      return new Response(JSON.stringify({
        status: 400,
        message: "Faltan datos en el formulario"
      }), { status: 400 });
    }
    const usersRef = firestore.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (snapshot.empty) {
      return new Response(JSON.stringify({
        status: 400,
        message: "El usuario no existe"
      }), { status: 400 });
    }
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return new Response(JSON.stringify({
        status: 400,
        message: "Contraseña incorrecta"
      }), { status: 400 });
    }
    return new Response(JSON.stringify({
      status: 200,
      message: "Inicio de sesión exitoso"
    }), { status: 200 });
  } catch (error) {
    console.error("Error during user login:", error);
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
