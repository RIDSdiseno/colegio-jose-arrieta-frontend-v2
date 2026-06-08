import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "../lib/tracking";

const GTM_ID = import.meta.env.VITE_GTM_ID;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

function injectGTM(id) {
  if (!id || document.getElementById("gtm-script")) return;

  // Inicializar dataLayer antes de cargar GTM (evita race condition)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  // GTM head snippet — usa src externo en lugar de innerHTML para compatibilidad con CSP
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.prepend(script);

  // GTM body noscript
  const noscript = document.createElement("noscript");
  noscript.id = "gtm-noscript";
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.cssText = "display:none;visibility:hidden";
  noscript.appendChild(iframe);
  document.body.prepend(noscript);
}

function injectMetaPixel(id) {
  if (!id || document.getElementById("meta-pixel-script")) return;

  // Inicializar fbq antes de cargar el SDK externo
  window.fbq = window.fbq || function () {
    (window.fbq.q = window.fbq.q || []).push(arguments);
  };
  window._fbq = window._fbq || window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = "2.0";
  window.fbq.queue = [];
  window.fbq("init", id);
  // No llamar fbq("track", "PageView") aquí — el efecto de ruta lo dispara una sola vez

  // Cargar SDK externo con src en lugar de innerHTML
  const script = document.createElement("script");
  script.id = "meta-pixel-script";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
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
