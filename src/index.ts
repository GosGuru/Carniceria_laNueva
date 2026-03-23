import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/Public/*": async req => {
      const pathname = new URL(req.url).pathname;
      const decodedPath = decodeURIComponent(pathname);
      const file = Bun.file(`.${decodedPath}`);

      if (!(await file.exists())) {
        return new Response("Not Found", { status: 404 });
      }

      return new Response(file, {
        headers: {
          "Cache-Control": "public, max-age=604800",
        },
      });
    },

    "/robots.txt": req => {
      const origin = new URL(req.url).origin;
      return new Response(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml`, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    },

    "/sitemap.xml": req => {
      const origin = new URL(req.url).origin;
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${origin}/catalogo</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${origin}/nosotros</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${origin}/contacto</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>`,
        {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        },
      );
    },

    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
