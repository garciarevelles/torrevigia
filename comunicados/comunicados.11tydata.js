// Un comunicado es visible si está publicado y la fecha de hoy está dentro de
// su ventana [fecha_inicio, fecha_fin]. La comprobación ocurre en cada build.
function ymd(v) {
  if (!v) return "";
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
}
function isVisible(data) {
  if (data.publicado === false) return false;
  const today = new Date().toISOString().slice(0, 10);
  const ini = ymd(data.fecha_inicio);
  const fin = ymd(data.fecha_fin);
  if (ini && ini > today) return false; // aún no ha empezado
  if (fin && fin < today) return false; // ya ha terminado
  return true;
}

module.exports = {
  layout: "comunicado.njk",
  tags: "comunicados",
  eleventyComputed: {
    visible: (data) => isVisible(data),
    // Si no es visible, no se genera su página.
    permalink: (data) =>
      isVisible(data) ? `comunicados/${data.page.fileSlug}.html` : false,
  },
};
