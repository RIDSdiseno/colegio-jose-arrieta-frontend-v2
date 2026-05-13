import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "../lib/tracking";

const GTM_ID = import.meta.env.VITE_GTM_ID;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

function injectGTM(id) {
  if (!id || document.getElementById("gtm-script")) return;

  // GTM head snippet
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${id}');
  `;
  document.head.prepend(script);

  // GTM body noscript
  const noscript = document.createElement("noscript");
  noscript.id = "gtm-noscript";
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.prepend(noscript);
}

function injectMetaPixel(id) {
  if (!id || document.getElementById("meta-pixel-script")) return;

  const script = document.createElement("script");
  script.id = "meta-pixel-script";
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${id}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    injectGTM(GTM_ID);
    injectMetaPixel(META_PIXEL_ID);
  }, []);

  // Track pageview on every route change
  useEffect(() => {
    track("page_view", { page_path: location.pathname });

    // Meta Pixel pageview on route change (SPA)
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);

  return null;
}
