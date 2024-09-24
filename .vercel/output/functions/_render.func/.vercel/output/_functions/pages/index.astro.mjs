import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro, d as renderComponent } from '../chunks/astro/server_BCQgC0OR.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DrObJnCT.mjs';
import 'clsx';
import { g as getProducts } from '../chunks/server_B6Bxn1q6.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getProducts();
  return renderTemplate`${maybeRenderHead()}<section> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24"> <div> <div class="text-center max-w-4xl mx-auto"> <div class="sm:flex sm:justify-center"> <div class="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"> <a href="https://lexingtonthemes.com/free-templates/" class="font-semibold text-accent-600"> <span class="absolute inset-0" aria-hidden="true"></span> <span class="block lg:inline">Lo más buscado <span aria-hidden="true">→</span></span> </a> </div> </div> <p class="text-4xl tracking-tight font-semibold text-black md:text-5xl font-display mt-8">Mundo Vinilos</p> <p class="text-gray-500 lg:text-xl max-w-2xl mt-4 mx-auto text-base">Vinilo que buscas, vinilo que encuentras.</p> </div> <dl class="lg:gap-x-8 lg:grid-cols-3 max-w-4xl mt-8 mx-auto sm:gap-x-6 sm:gap-y-12 sm:grid sm:grid-cols-2 sm:space-y-0 space-y-6 text-center text-sm items-start"> <div class="text-gray-500"> <strong class="text-gray-700">Tus vinilos favoritos al mejor precio</strong> ━ Encontrarás una lista de precios ordenados del más bajo al más alto.
</div> <div class="text-gray-500"> <strong class="text-gray-700">Álbumes en tendencia</strong> ━ Todos los artistas y álbumes del momento en nuestra página principal.
</div> <div class="text-gray-500"> <strong class="text-gray-700">Tus vendedores de confianza</strong> ━ Encuentra a tu vendedor favorito o explora otros vendedores cercanos a tu zona.
</div> </dl> </div> <div class="mt-12"> <h2 class="text-2xl font-semibold text-center">Nuestros Productos</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"> ${products.map((product) => renderTemplate`<a${addAttribute(`/product/${product.id}`, "href")} class="bg-white p-6 rounded-lg shadow-lg"> <img${addAttribute(product.imageUrl, "src")}${addAttribute(product.name, "alt")} class="w-full h-48 object-cover rounded-md"> <h3 class="mt-4 text-lg font-semibold">${product.name}</h3> <p class="mt-2 text-gray-600">${product.description}</p> <p class="mt-2 text-gray-800 font-bold">$${product.price}</p> <p class="mt-2 text-gray-600">Stock: ${product.stock}</p> </a>`)} </div> </div> </div></section>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/landing/Hero.astro", void 0);

const $$Astro = createAstro("https://lexingtonthemes.com");
const $$SectionOne = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SectionOne;
  return renderTemplate`${maybeRenderHead()}<section id="features"> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12"> <div class="mx-auto max-w-xl text-center"> <div> <p class="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
I am a slightly longer heading than the others
</p><p class="mt-4 text-lg text-na mx-auto tracking-tight text-gray-500">
If you could kick the person in the pants responsible for most of your
          trouble, you wouldn't sit for a month
</p> </div> </div> <div> <div class="mx-auto max-w-7xl pt-12"> <h2 class="sr-only">Features.</h2><div> <div class="grid gap-12 grid-cols-1 lg:space-y-0 lg:text-center md:grid-cols-3"> <div> <div> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-4 w-4", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
Built with Astro.js.
</p> </div><div class="mt-4 text-gray-500 text-sm">
Astro is an all-in-one web framework for building fast,
                content-focused websites.
</div> </div><div> <div> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-4 w-4", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
Styled with Tailwind CSS.
</p> </div><div class="mt-4 text-gray-500 text-sm">
Tailwind CSS generates styles by searching for class names in
                HTML, JavaScript, and templates, and then outputs them in a
                single CSS file.
</div> </div><div> <div> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-4 w-4", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
Relived with Alpine.js
</p> </div><div class="mt-4 text-gray-500 text-sm">
Alpine is a rugged, minimal tool for for adding behavior to your
                markup, similar to jQuery but for the modern web.
</div> </div><div> <div> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-4 w-4", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
Keyboard accessible.
</p> </div><div class="mt-4 text-gray-500 text-sm">
Everything I build is keyboard accessible, and I meticulously
                write the markup to deliver the best screenreader experience I
                can provide.
</div> </div><div> <div> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-4 w-4", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
Production-ready
</p> </div><div class="mt-4 text-gray-500 text-sm">
I tested the template in the latest versions of all browsers to
                handle lots of edge-cases you might encounter.
</div> </div><div> <div> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-4 w-4", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
Simple deploys
</p> </div><div class="mt-4 text-gray-500 text-sm">
The template is ready for production and can be deployed
                anywhere static websites can, such as Vercel, Netlify, or GitHub
                Pages, and more.
</div> </div> </div> </div> </div> </div> </div> </section>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/landing/SectionOne.astro", void 0);

const $$SectionTwo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12"> <div class="grid grid-cols-1 gap-4 mt-6 items-center list-none lg:grid-cols-2 lg:gap-24"> <div class="text-center lg:text-left"> <div> <p class="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
Multilayered security
</p> <p class="text-base mt-4 text-gray-500">
The template is ready for production and can be deployed anywhere
            static websites can, such as Vercel, Netlify, or GitHub Pages. I
            tested the template in the latest versions of all browsers to handle
            lots of edge-cases you might encounter.
</p> </div> </div> <div class="lg:mt-0 mt-12 h-full hidden lg:block rounded-3xl overflow-hidden border border-gray-200"> <div class="bg-gray-100 p-8 rounded-2xl overflow-hidden"> <img alt="Lexingtøn thumbnail" class="border border-gray-200 lg:rounded-3xl object-cover rounded shadow-2xl" src="https://brightlight.lexingtonthemes.com/assets/dashboard.svg"> </div> </div> </div> <div class="mt-24 w-full gap-12 grid grid-cols-1 lg:gap-24 lg:grid-cols-3"> <div> <div class="gap-3 lg:inline-flex lg:items-center"> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-5 w-5", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display lg:mt-0">
Developer experience
</p> </div><p class="text-gray-500 text-sm mt-4">
Everything I build is keyboard accessible, and I meticulously write
          the markup to deliver the best screenreader experience.
</p> </div><div> <div class="gap-3 lg:inline-flex lg:items-center"> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-5 w-5", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display lg:mt-0">
Designers go-to app
</p> </div><p class="text-gray-500 text-sm mt-4">
I tested the template in the latest versions of all browsers to handle
          lots of edge-cases you might encounter.
</p> </div><div> <div class="gap-3 lg:inline-flex lg:items-center"> <div class="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10"> ${renderComponent($$result, "ion-icon", "ion-icon", { "aria-label": "scan outline", "class": "hydrated md h-5 w-5", "name": "scan-outline", "role": "img" })} </div><p class="mt-4 text-lg font-semibold leading-6 text-black font-display lg:mt-0">
Easy onboarding
</p> </div><p class="text-gray-500 text-sm mt-4">
The template is ready for production and can be deployed anywhere
          static websites can, such as Vercel, Netlify, or GitHub Pages,..
</p> </div> </div> </div> </section>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/landing/SectionTwo.astro", void 0);

const $$Testimonial = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24"> <div> <p class="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
Discover the experiences and <span class="sm:block">feedback from satisfied customers</span> </p> </div> <ul class="mt-12 lg:mt-24 grid grid-cols-1 gap-4 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3"> <li> <div class="h-full flex flex-col justify-between"> <div> <div class="flex gap-x-1"> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> </div> <p class="lg:text-sm text-gray-500 mt-4">
"I've always been concerned about privacy online, but since using
              this platform, I feel more empowered and in control of my personal
              data."
</p> </div> <footer class="mt-8"> <p class="lg:text-sm text-gray-500 font-display">Michael A</p> <img class="h-8 mt-4" src="/assets/brands/Attentive.svg" alt=""> </footer> </div> </li> <li> <div class="h-full flex flex-col justify-between"> <div> <div class="flex gap-x-1"> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> </div> <p class="lg:text-sm text-gray-500 mt-4">
"As a professional working with sensitive information, I needed a
              communication solution that prioritizes security"
</p> </div> <footer class="mt-8"> <p class="lg:text-sm text-gray-500 font-display">John D</p> <img class="h-8 mt-4" src="/assets/brands/Coinbase.svg" alt=""> </footer> </div> </li> <li> <div class="h-full flex flex-col justify-between"> <div> <div class="flex gap-x-1"> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star fill-accent-500 stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star stroke-accent-500" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="none" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path> </svg> </div> <p class="lg:text-sm text-gray-500 mt-4">
"As a digital nomad, maintaining my privacy while communicating is
              crucial. This platform has become my go-to choice for secure
              messaging."
</p> </div> <footer class="mt-8"> <p class="lg:text-sm text-gray-500 font-display">Emily R</p> <img class="h-8 mt-4" src="/assets/brands/Figma.svg" alt=""> </footer> </div> </li> </ul> </div> </section>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/global/Testimonial.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "SectionOne", $$SectionOne, {})} ${renderComponent($$result2, "SectionTwo", $$SectionTwo, {})} ${renderComponent($$result2, "Testimonial", $$Testimonial, {})} ` })}`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/index.astro", void 0);

const $$file = "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
