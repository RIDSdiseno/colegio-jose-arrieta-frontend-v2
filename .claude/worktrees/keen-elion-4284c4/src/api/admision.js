import api from "./axios";

export async function postFormularioAdmision(payload) {
  const response = await api.post("/admision", payload);
  return response.data;
}
