import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent } from '../chunks/astro/server_BCQgC0OR.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CdtLeX4R.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Login$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> <div class="flex relative justify-center lg:px-0 items-center lg:h-screen md:px-12 overflow-hidden"> <div class="bg-white px-4 relative flex flex-1 flex-col lg:py-24 md:flex-none md:px-28 py-10 sm:justify-center xl:py-36 z-10"> <div class="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4"> <div class="flex flex-col"> <div> <h2 class="font-medium leading-tight text-black text-xl font-display">
Inicia sesión en Mundo Vinilos
</h2> <div class="space-y-6"> <form id="signin-form" action="/api/auth/signin" method="post" enctype="multipart/form-data"> <div class="w-full"> <label class="sr-only" for="email">Correo electrónico</label> <input class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500" id="email" name="email" type="email" autocomplete="email" placeholder="Ingresa tu correo electrónico" required> </div> <div class="w-full"> <label class="sr-only" for="password">Contraseña</label> <input class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500" id="password" name="password" type="password" autocomplete="current-password" placeholder="Ingresa tu contraseña" required> </div> <button type="button" onclick="togglePasswordVisibility()">Ver/Ocultar</button> <button type="submit" id="buttonSub" class="w-full focus:outline-none h-12 border py-3 bg-indigo-600 border-indigo-600 focus:border-indigo-700 focus:ring-1 focus:ring-indigo-700 focus:z-10 font-medium hover:bg-indigo-700 inline-flex items-center justify-center px-4 relative rounded-xl text-white text-sm">Iniciar sesión</button> </form></div><div class="space-y-4"> <p class="font-medium text-sm leading-tight text-black">
¿Eres un vendedor? <a class="text-accent-500 hover:text-accent-400 ml-3" href="/productassigment">Accede aquí</a> </p></div> </div> </div> </div> </div> </div> </section>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/Forms/Login.astro", void 0);

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginForm", $$Login$1, {})} ` })}`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/login.astro", void 0);

const $$file = "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
