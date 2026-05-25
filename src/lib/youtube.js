/**
 * Extrae el ID de YouTube de una URL.
 * Soporta: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 * Retorna null si la URL no es válida.
 */
export function getYoutubeId(url = "") {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
