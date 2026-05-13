import api from "./axios";

export async function postFormularioContacto(payload) {
  const response = await api.post("/contacto", payload);
  return response.data;
}
