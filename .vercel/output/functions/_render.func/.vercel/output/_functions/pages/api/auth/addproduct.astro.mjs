import { f as firestore } from '../../../chunks/server_D_TZjYN_.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const product = await request.json();
    const productsRef = firestore.collection("products");
    await productsRef.add(product);
    return new Response(JSON.stringify({
      status: 200,
      message: "Producto añadido con éxito"
    }), { status: 200 });
  } catch (error) {
    console.error("Error añadiendo producto:", error);
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
