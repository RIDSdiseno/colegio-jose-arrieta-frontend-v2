// Push events to GTM dataLayer
// GTM forwards these to GA4 and Meta Pixel automatically
export function track(eventName, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

// Predefined events
export const trackFormularioContacto = () =>
  track("form_submit", { form_name: "contacto" });

export const trackFormularioVisita = () =>
  track("form_submit", { form_name: "agenda_visita" });

export const trackWhatsAppClick = (source = "desconocido") =>
  track("whatsapp_click", { source });

export const trackPostulacionClick = (source = "desconocido") =>
  track("postulacion_click", { source });

export const trackVisitaAdmision = () =>
  track("page_view_admision");
