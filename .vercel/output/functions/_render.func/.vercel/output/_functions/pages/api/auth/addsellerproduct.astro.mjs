import { f as firestore } from '../../../chunks/server_B6Bxn1q6.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { sellerId, sellerName, productId, price, stock } = await request.json();
    if (!sellerId || !sellerName || !productId || !price || !stock) {
      return new Response(JSON.stringify({
        status: 400,
        message: "Faltan datos para agregar el producto del vendedor"
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
      message: "Producto del vendedor añadido con éxito"
    }), { status: 200 });
  } catch (error) {
    console.error("Error añadiendo producto del vendedor:", error);
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
