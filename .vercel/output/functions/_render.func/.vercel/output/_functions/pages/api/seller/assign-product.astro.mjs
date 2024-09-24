import { f as firestore } from '../../../chunks/server_D_TZjYN_.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { sellerId, sellerName, productId, price, stock } = data;
    if (!sellerId || !sellerName || !productId || price == null || stock == null) {
      return new Response(JSON.stringify({
        status: 400,
        message: "Faltan datos en la solicitud"
      }), { status: 400 });
    }
    const sellersRef = firestore.collection("sellers");
    await sellersRef.add({
      sellerId,
      sellerName,
      productId,
      price,
      stock
    });
    return new Response(JSON.stringify({
      status: 200,
      message: "Información del vendedor guardada correctamente"
    }), { status: 200 });
  } catch (error) {
    console.error("Error al guardar información del vendedor:", error);
    return new Response(JSON.stringify({
      status: 500,
      message: "Algo salió mal: " + error.message
    }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
