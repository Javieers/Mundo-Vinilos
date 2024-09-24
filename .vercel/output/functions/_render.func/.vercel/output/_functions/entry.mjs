import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DxbczXRE.mjs';
import { manifest } from './manifest_5rbKejRJ.mjs';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/addproduct.astro.mjs');
const _page2 = () => import('./pages/api/auth/register.astro.mjs');
const _page3 = () => import('./pages/api/auth/signin.astro.mjs');
const _page4 = () => import('./pages/api/seller/assign-product.astro.mjs');
const _page5 = () => import('./pages/faq.astro.mjs');
const _page6 = () => import('./pages/login.astro.mjs');
const _page7 = () => import('./pages/privacy.astro.mjs');
const _page8 = () => import('./pages/product/_id_.astro.mjs');
const _page9 = () => import('./pages/productassigment.astro.mjs');
const _page10 = () => import('./pages/seller/productassigment.astro.mjs');
const _page11 = () => import('./pages/signup.astro.mjs');
const _page12 = () => import('./pages/terms.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/auth/addProduct.ts", _page1],
    ["src/pages/api/auth/register.ts", _page2],
    ["src/pages/api/auth/signin.ts", _page3],
    ["src/pages/api/seller/assign-product.ts", _page4],
    ["src/pages/faq.astro", _page5],
    ["src/pages/login.astro", _page6],
    ["src/pages/privacy.astro", _page7],
    ["src/pages/product/[id].astro", _page8],
    ["src/pages/productassigment.astro", _page9],
    ["src/pages/seller/ProductAssigment.astro", _page10],
    ["src/pages/signup.astro", _page11],
    ["src/pages/terms.astro", _page12],
    ["src/pages/index.astro", _page13]
]);
const serverIslandMap = new Map();

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "1e94532e-f758-4bb4-9e77-baf87326bd47",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
