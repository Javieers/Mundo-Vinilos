import { a as createComponent, r as renderTemplate, m as maybeRenderHead, c as createAstro, b as renderComponent, e as renderHead, f as renderSlot } from './astro/server_CBQ7ihRA.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                       */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="author" content="Michael Andreuzza"><meta name="your keywords" content="wallpaper,black wallpaper, gradient wallpaper,aesthetic wallpaper,iphone wallpaper,wallpaper iphone,white wallpaper,pink wallpaper"><!-- Favicon guidelines generated with https://realfavicongenerator.net/ --><link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png"><link rel="manifest" href="/images/favicons/site.webmanifest"><link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg" color="#ffffff"><meta name="msapplication-TileColor" content="#ffffff"><meta name="theme-color" content="#ffffff"><!--Ionicons --><script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"><\/script><!--\nhttps://rsms.me/inter/\n--><link rel="preconnect" href="https://rsms.me/"><link rel="stylesheet" href="https://rsms.me/inter/inter.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet"><!---- Alpine  --><script defer src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js"><\/script>'])));
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/BaseHead.astro", void 0);

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-white border-b border-black/5"> <div class="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16"> <div x-data="{ open: false }" class="relative flex flex-col w-full py-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6"> <div class="flex flex-row items-center justify-between lg:justify-start"> <a href="/" class=" text-black inline-flex items-center gap-3"> <svg class="h-4" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#283CFF"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#5263FF"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#808CFF"></path> </svg> <span class="font-bold font-display">Mundo Vinilos</span> </a> <button @click="open = !open" class="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:outline-none focus:text-black md:hidden"> <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"> <path :class="{'hidden': open, 'inline-flex': !open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> <path :class="{'hidden': !open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <nav :class="{'flex': open, 'hidden': !open}" class="flex-col items-center flex-grow hidden md:pb-0 md:flex md:justify-end md:flex-row"> <a class="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto" href="/#features">Novedades</a> <a class="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400" href="/#pricing">Pricing</a> <a class="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400" href="/faq">
Preguntas frecuentes</a> <div class="inline-flex items-center gap-2 list-none lg:ml-auto"> <a href="/signup" class="block px-4 py-2 mt-2 text-sm font-medium text-black md:mt-0 hover:text-accent-400 focus:outline-none focus:shadow-outline">
Registrate
</a> <a href="/login" class="inline-flex items-center h-8 justify-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-50 active:bg-gray-200 active:text-accent-400 focus-visible:outline-black">
Iniciar Sesión
</a> </div> </nav> </div> </div> </section>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/global/Navigation.astro", void 0);

const $$Astro = createAstro("https://lexingtonthemes.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24"> <div class="grid grid-cols-2 lg:grid-cols-4 items-start gap-x-8 gap-y-24"> <a href="/" class="xl:col-span-1 text-black inline-flex items-center gap-3"> <svg class="h-4" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#283CFF"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#5263FF"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#808CFF"></path> </svg> <span class="font-bold font-display">Mundo Vinilos</span> </a> <div class="md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-8 text-sm text-gray-400 lg:col-span-3"> <div> <h3 class="text-lg text-black font-medium tracking-tight">
All pages
</h3> <ul role="list" class="mt-4 space-y-1"> <li> <a href="/" class="hover:text-black">
Home
</a> </li> <li> <a href="/faq" class="hover:text-black">
FAQ
</a> </li> <li> <a href="/terms" class="hover:text-black">
Terms
</a> </li> <li> <a href="/privacy" class="hover:text-black">
Privacy
</a> </li> <li> <a href="/signup" class="hover:text-black">
Sign up
</a> </li> <li> <a href="/signup" class="hover:text-black">
Sign In
</a> </li> </ul> </div> <div class="mt-12 md:mt-0"> <h3 class="text-lg text-black font-medium tracking-tight">
Resources
</h3> <ul role="list" class="mt-4 space-y-1"> <li> <a href="https://github.com/michael-andreuzza/astrosaas" class="hover:text-black">
GitHub repo
</a> </li> </ul> </div> <div> <h3 class="text-lg text-black font-medium tracking-tight">
More themes
</h3> <ul role="list" class="mt-4 space-y-1"> <li> <a href="https://lexingtonthemes.com/" class="hover:text-black">
Lexington Themes
</a> </li> </ul> </div> <div class="mt-12 md:mt-0"> <h3 class="text-lg text-black font-medium tracking-tight">Socials</h3> <ul role="list" class="mt-4 space-y-1"> <li> <a href="https://x.com/lexingtonthemes" class="hover:text-black">
@lexingtonthemes
</a> </li> <li> <a href="https://x.com/Mike_Andreuzza" class="hover:text-black">
@Mike_Andreuzza
</a> </li> </ul> </div> </div> </div> </div> </footer> <footer class="bg-white"> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-6"> <div class="border-t pt-6 border-gray-200"> <p class="text-sm text-neutral-600 lg:col-span-2">
© 2024 Lexington Themes. All rights reserved. Lexington Themes is not
        affiliated with Astro or Tailwind Labs team, nor is it endorsed by or
        sponsored by this ones. A side project by <a class="text-sm text-black hover:text-accent-400 underline" href="https://michaelandreuzza.com/">Michael Andreuzza</a> This website was built with Astro &amp; Tailwind. Crafted in Åland Islands,
        Finland.
</p> </div> </div> </footer>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/components/global/Footer.astro", void 0);

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" class="scroll-smooth selection:bg-accent-500 selection:text-white no-touchevents hydrated"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, {})}${renderHead()}</head> <body class="bg-white flex flex-col min-h-svh"> ${renderComponent($$result, "Navigation", $$Navigation, {})} <main class="grow">${renderSlot($$result, $$slots["default"])}</main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
