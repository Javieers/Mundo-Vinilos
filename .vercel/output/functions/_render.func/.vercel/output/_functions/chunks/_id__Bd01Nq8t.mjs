import { b as createAstro, c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from './astro/server_BCQgC0OR.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from './BaseLayout_DrObJnCT.mjs';
import { a as getSellerInfo } from './server_B6Bxn1q6.mjs';

const $$Astro = createAstro("https://lexingtonthemes.com");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const sellerInfo = await getSellerInfo(id);
  if (!sellerInfo) {
    throw new Error("Vendedor no encontrado");
  }
  const { seller, products } = sellerInfo;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24"> <div class="bg-white p-6 rounded-lg shadow-lg"> <img${addAttribute(seller.sellerImage, "src")}${addAttribute(seller.sellerName, "alt")} class="w-full h-auto max-h-96 object-contain rounded-md"> <h3 class="mt-4 text-lg font-semibold">${seller.sellerName}</h3> <h4 class="mt-8 text-xl font-semibold">Productos Disponibles</h4> <ul class="mt-4"> ${products.length > 0 ? products.map((product) => renderTemplate`<li class="border-b py-4"> <a${addAttribute(`/product/${product.productId}`, "href")} class="text-blue-600 underline">${product.name}</a> - $${product.price} ${product.stock === 0 ? "(Agotado)" : `(Stock: ${product.stock})`} </li>`) : renderTemplate`<p class="text-gray-500">Este vendedor no tiene productos disponibles.</p>`} </ul> <h4 class="mt-12 text-xl font-semibold">Reseñas</h4> <div class="mt-4"> ${seller.reviews.length > 0 ? seller.reviews.map((review) => renderTemplate`<div class="border-b py-4"> <p class="text-gray-700">${review.text}</p> <p class="text-gray-500 text-sm">- ${review.user}</p> </div>`) : renderTemplate`<p class="text-gray-500">Este vendedor no tiene reseñas aún.</p>`} </div> </div> </div> </section> ` })}`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/seller/[id].astro", void 0);

const $$file = "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/seller/[id].astro";
const $$url = "/seller/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$id as $, _page as _ };
