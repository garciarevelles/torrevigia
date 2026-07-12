// Función PROGRAMADA de Netlify: cada día dispara una reconstrucción del sitio,
// para que los comunicados con fecha de inicio/fin cambien de visibilidad solos
// (aparecen al llegar su fecha de inicio y se ocultan al pasar la de fin).
//
// Requiere la variable de entorno BUILD_HOOK_URL, que es un "Build hook" que se
// crea en Netlify (Site configuration → Build & deploy → Build hooks).

export const config = {
  schedule: "@daily",
};

export default async () => {
  const url = process.env.BUILD_HOOK_URL;
  if (!url) {
    return new Response("Falta BUILD_HOOK_URL: no se ha configurado el build hook.", { status: 200 });
  }
  await fetch(url, { method: "POST" });
  return new Response("Reconstrucción diaria disparada.");
};
