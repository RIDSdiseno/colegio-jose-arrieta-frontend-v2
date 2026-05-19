const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export async function postFormularioContacto(payload) {
  if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes("REEMPLAZAR")) {
    throw new Error("El formulario no está configurado aún. Contacta al administrador.");
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
