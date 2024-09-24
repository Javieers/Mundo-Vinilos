import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute } from './astro/server_BCQgC0OR.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getProducts } from './server_B6Bxn1q6.mjs';

const $$ProductAssigment = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getProducts();
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-4xl px-8 py-16"> <h2 class="text-2xl font-bold text-gray-900 mb-8">Asignar Producto a Vendedor</h2> <!-- Formulario para asignar el producto al vendedor --> <form onsubmit="handleSubmit(event)" class="space-y-6"> <!-- Selección de Producto --> <div> <label for="product" class="block text-sm font-medium text-gray-700">Selecciona un Producto</label> <select id="product" name="product" onchange="selectedProductId = this.value" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"> <option value="">Selecciona un producto</option> ${products.map((product) => renderTemplate`<option${addAttribute(product.id, "value")}>${product.name}</option>`)} </select> </div> <!-- Campo para Nombre del Vendedor --> <div> <label for="seller-name" class="block text-sm font-medium text-gray-700">Nombre del Vendedor</label> <input type="text" id="seller-name" name="seller-name" onchange="sellerName = this.value" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required> </div> <!-- Campo para el Precio --> <div> <label for="price" class="block text-sm font-medium text-gray-700">Precio</label> <input type="number" id="price" name="price" onchange="price = this.value" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required> </div> <!-- Campo para el Stock --> <div> <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label> <input type="number" id="stock" name="stock" onchange="stock = this.value" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required> </div> <!-- Botón de Enviar --> <div> <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
Asignar Producto
</button> </div> </form> </section>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/seller/ProductAssigment.astro", void 0);

const $$file = "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/seller/ProductAssigment.astro";
const $$url = "/seller/ProductAssigment";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ProductAssigment,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ProductAssigment as $, _page as _ };
