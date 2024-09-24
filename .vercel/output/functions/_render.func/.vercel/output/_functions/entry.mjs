import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DxbczXRE.mjs';
import { manifest } from './manifest_BpqMFBYF.mjs';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/addproduct.astro.mjs');
const _page2 = () => import('./pages/api/auth/addsellerproduct.astro.mjs');
const _page3 = () => import('./pages/api/auth/register.astro.mjs');
const _page4 = () => import('./pages/api/auth/signin.astro.mjs');
const _page5 = () => import('./pages/api/seller/getsellerinfo.astro.mjs');
const _page6 = () => import('./pages/faq.astro.mjs');
const _page7 = () => import('./pages/login.astro.mjs');
const _page8 = () => import('./pages/privacy.astro.mjs');
const _page9 = () => import('./pages/product/_id_.astro.mjs');
const _page10 = () => import('./pages/productassigment.astro.mjs');
const _page11 = () => import('./pages/seller/productassigment.astro.mjs');
const _page12 = () => import('./pages/seller/_id_.astro.mjs');
const _page13 = () => import('./pages/sellerpage.astro.mjs');
const _page14 = () => import('./pages/signup.astro.mjs');
const _page15 = () => import('./pages/terms.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/auth/addProduct.ts", _page1],
    ["src/pages/api/auth/addSellerProduct.ts", _page2],
    ["src/pages/api/auth/register.ts", _page3],
    ["src/pages/api/auth/signin.ts", _page4],
    ["src/pages/api/seller/getSellerInfo.ts", _page5],
    ["src/pages/faq.astro", _page6],
    ["src/pages/login.astro", _page7],
    ["src/pages/privacy.astro", _page8],
    ["src/pages/product/[id].astro", _page9],
    ["src/pages/productassigment.astro", _page10],
    ["src/pages/seller/ProductAssigment.astro", _page11],
    ["src/pages/seller/[id].astro", _page12],
    ["src/pages/sellerpage.astro", _page13],
    ["src/pages/signup.astro", _page14],
    ["src/pages/terms.astro", _page15],
    ["src/pages/index.astro", _page16]
]);
const serverIslandMap = new Map();

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "15bc825d-6035-4f8d-b389-08fbb5c6a2d4",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
