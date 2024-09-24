import { f as firestore } from '../../../chunks/server_B6Bxn1q6.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  try {
    const sellerId = params.id;
    if (!sellerId) {
      return new Response(JSON.stringify({
        status: 400,
        message: "El ID del vendedor es necesario"
      }), { status: 400 });
    }
    const sellerDoc = await firestore.collection("sellers").doc(sellerId).get();
    if (!sellerDoc.exists) {
      return new Response(JSON.stringify({
        status: 404,
        message: "Vendedor no encontrado"
      }), { status: 404 });
    }
    const sellerData = sellerDoc.data();
    const productsSnapshot = await firestore.collection("sellers").where("sellerId", "==", sellerId).get();
    const products = productsSnapshot.docs.map((doc) => doc.data());
    return new Response(JSON.stringify({
      status: 200,
      seller: sellerData,
      products
    }), { status: 200 });
  } catch (error) {
    console.error("Error obteniendo la información del vendedor:", error);
    return new Response(JSON.stringify({
      status: 500,
      message: "Error al obtener la información del vendedor: " + error.message
    }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
