import { b as createAstro, c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_BCQgC0OR.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DrObJnCT.mjs';
import { g as getProducts, c as getSellerProductInfo } from '../../chunks/server_B6Bxn1q6.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://lexingtonthemes.com");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  const sellers = await getSellerProductInfo(id);
  if (!product) {
    throw new Error("Producto no encontrado");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24"> <div class="bg-white p-6 rounded-lg shadow-lg"> <img${addAttribute(product.imageUrl, "src")}${addAttribute(product.name, "alt")} class="w-full h-auto max-h-96 object-contain rounded-md"> <h3 class="mt-4 text-lg font-semibold">${product.name}</h3> <p class="mt-2 text-gray-600">${product.description}</p> <p class="mt-2 text-gray-800 font-bold">$${product.price}</p> <p class="mt-2 text-gray-600">Stock: ${product.stock}</p> </div> <div class="mt-12"> <h3 class="text-2xl font-semibold">Precios por vendedor</h3> <ul class="mt-4"> ${sellers.length > 0 ? sellers.map((seller) => renderTemplate`<li class="border-b py-4"> <a${addAttribute(`/seller/${seller.sellerId}`, "href")} class="text-blue-600 underline">${seller.sellerName}</a>
- $${seller.price} ${seller.stock === 0 ? "(Agotado)" : `(Stock: ${seller.stock})`} </li>`) : renderTemplate`<p class="text-gray-500">No hay vendedores disponibles para este producto.</p>`} </ul> </div> </div> </section> ` })}`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/product/[id].astro", void 0);

const $$file = "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/product/[id].astro";
const $$url = "/product/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
