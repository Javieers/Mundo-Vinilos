import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_CBQ7ihRA.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Bl3_i4tG.mjs';
import { g as getProducts } from '../../chunks/server_D_TZjYN_.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://lexingtonthemes.com");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) {
    throw new Error("Producto no encontrado");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24"> <div class="bg-white p-6 rounded-lg shadow-lg"> <img${addAttribute(product.imageUrl, "src")}${addAttribute(product.name, "alt")} class="w-full h-auto max-h-96 object-contain rounded-md"> <h3 class="mt-4 text-lg font-semibold">${product.name}</h3> <p class="mt-2 text-gray-600">${product.description}</p> <p class="mt-2 text-gray-800 font-bold">$${product.price}</p> <p class="mt-2 text-gray-600">Stock: ${product.stock}</p> </div> </div> </section> ` })}`;
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
