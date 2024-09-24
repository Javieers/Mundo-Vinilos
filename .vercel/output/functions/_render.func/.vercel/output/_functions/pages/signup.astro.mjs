import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent } from '../chunks/astro/server_BCQgC0OR.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CdtLeX4R.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Signup$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> <div class="flex relative justify-center lg:px-0 items-center lg:h-screen md:px-12 overflow-hidden"> <div class="bg-white px-4 relative flex flex-1 flex-col lg:py-24 md:flex-none md:px-28 py-10 sm:justify-center xl:py-36 z-10"> <div class="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4"> <div class="flex flex-col"> <div> <h2 class="font-medium leading-tight text-black text-xl font-display">
Registrate en Mundo Vinilos
</h2> <div class="py-3"> <span class="w-full inline-flex relative mt-3 z-0"> <button class="w-full focus:outline-none h-12 border py-3 bg-white border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:z-10 font-medium hover:bg-gray-50 inline-flex items-center justify-center px-4 relative rounded-xl text-gray-700 text-sm" type="button"> <span>Sign up with</span> <span class="ml-3"> <svg fill="none" height="24" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg"> <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4"></path> <path d="M16.2862 30C20.1433 30 23.3814 28.7555 25.7465 26.6089L21.2386 23.1865C20.0322 24.011 18.4132 24.5866 16.2862 24.5866C12.5085 24.5866 9.30219 22.1444 8.15923 18.7688L7.9917 18.7827L3.58202 22.1272L3.52435 22.2843C5.87353 26.8577 10.6989 30 16.2862 30Z" fill="#34A853"></path> <path d="M8.15923 18.7688C7.88634 17.8977 7.72761 16.9732 7.72761 16C7.72761 15.0268 7.88634 14.1023 8.15923 13.2312L8.14843 13.0486L3.68953 9.64648L3.58202 9.7157C2.60488 11.593 2 13.713 2 16C2 18.287 2.60488 20.407 3.58202 22.2843L8.15923 18.7688Z" fill="#FBBC05"></path> <path d="M16.2862 7.41339C18.7132 7.41339 20.5327 8.31161 21.619 9.31739L25.8355 5.10087C23.3772 2.86174 20.1433 1.5 16.2862 1.5C10.6989 1.5 5.87353 4.64226 3.52435 9.21565L8.15923 13.2312C9.30219 9.85565 12.5085 7.41339 16.2862 7.41339Z" fill="#EA4335"></path> </svg> </span> </button> </span> <div class="w-full border-t border-gray-300"></div> </div> <div class="flex relative justify-center"> <span class="bg-white text-sm px-2 text-gray-500">Or continue with</span> </div> <div class="space-y-6"> <form id="register-form" action="/api/auth/register" method="post" enctype="multipart/form-data"> <div class="w-full flex flex-row gap-3"> <div class="w-full"> <label class="sr-only" for="firstName">First name</label> <input class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500" id="firstName" name="firstName" autocomplete="given-name" placeholder="Ingresa tu nombre" required> </div> <div class="w-full"> <label class="sr-only" for="lastName">Last name</label> <input class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500" id="lastName" name="lastName" autocomplete="family-name" placeholder="Ingresa tu apellido" required> </div> </div> <div class="w-full"> <label class="sr-only" for="email">Correo electrónico</label> <input class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500" id="email" name="email" type="email" autocomplete="email" placeholder="Ingresa tu correo electrónico" required> </div> <div class="w-full"> <label class="sr-only" for="password">Contraseña</label> <input class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500" id="password" name="password" type="password" autocomplete="new-password" placeholder="Ingresa tu contraseña" required> </div> <div class="flex"> <div class="flex items-start"> <input class="text-accent-500 focus:ring-accent-500 border-accent-500 h-4 rounded w-4" id="remember-me" name="remember-me" type="checkbox"> <label class="font-medium text-xs block leading-tight ml-2 text-gray-500" for="remember-me">Creating an account means you’re okay with our <a class="text-accent-500 hover:text-accent-400" href="/terms">Terms of Service,
</a><a class="text-accent-500 hover:text-accent-400" href="/privacy">Privacy Policy
</a>, and our default <a class="text-accent-500 hover:text-accent-400" href="/notifications">Notification Settings.</a> </label> </div> </div><div class="col-span-full"> <button class="items-center justify-center h-12 rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full" type="submit">Create an account</button> </div><div class="space-y-4"> <p class="font-medium text-sm leading-tight text-black">
Already a member? <a class="text-accent-500 hover:text-accent-400 ml-3" href="/SellerSignup">Sign in</a> </p><p class="font-medium text-xs leading-tight text-gray-500">
This site is protected by reCAPTCHA and the Google Privacy
                    Policy and Terms of Service apply.
</p> </div> </form></div> </div> </div> </div> </div></div></section>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/Forms/Signup.astro", void 0);

const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SignupForm", $$Signup$1, {})} ` })}`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/signup.astro", void 0);

const $$file = "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
