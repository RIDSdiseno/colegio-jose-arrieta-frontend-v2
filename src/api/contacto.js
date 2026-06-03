const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

// Sentinel exportado para que el consumidor detecte el error sin acoplamiento de strings
export const CONFIG_ERROR_MSG = "FORMSPREE_NOT_CONFIGURED";

export async function postFormularioContacto(payload) {
  if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes("REEMPLAZAR")) {
    throw new Error(CONFIG_ERROR_MSG);
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      nombre: payload.nombre,
      email: payload.email,
      telefono: payload.telefono,
      mensaje: payload.mensaje,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "No se pudo enviar el mensaje.");
  }

  return { message: "¡Mensaje enviado! Te responderemos a la brevedad." };
}
