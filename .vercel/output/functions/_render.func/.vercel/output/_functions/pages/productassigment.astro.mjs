import { c as createComponent, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_BCQgC0OR.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DrObJnCT.mjs';
import { $ as $$ProductAssigment } from '../chunks/ProductAssigment_CUhiwIv6.mjs';
export { renderers } from '../renderers.mjs';

const $$Productassigment = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductAssigmentForm", $$ProductAssigment, {})} ` })}`;
}, "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/productassigment.astro", void 0);

const $$file = "D:/mundo-vinilos/mundo-vinilos/absolute-antimatter/src/pages/productassigment.astro";
const $$url = "/productassigment";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Productassigment,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
