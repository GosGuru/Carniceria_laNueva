# PLAN DE IMPLEMENTACIÓN — Carnicería La Fe

## Para: Codex 5.3
## Stack: Bun + React 19 + TypeScript + Tailwind CSS v4

> **CONTEXTO**: Este proyecto parte de un template Bun+React. Hay que transformarlo en el sitio web profesional de Carnicería La Fe, una carnicería real argentina. El foco principal es **SEO local** y un diseño **artesanal auténtico** (NO estética genérica de IA).

> **PLACEHOLDERS**: Los valores entre `[CORCHETES]` son datos del negocio pendientes de confirmar. Usarlos como están por ahora — se reemplazarán después.

---

## ESTRUCTURA FINAL DE ARCHIVOS

```
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── CatalogSection.tsx
│   ├── ProductCard.tsx
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── data/
│   └── products.ts
├── App.tsx              ← REESCRIBIR
├── frontend.tsx         ← MANTENER (sin cambios)
├── index.css            ← REESCRIBIR
├── index.html           ← REESCRIBIR
└── index.ts             ← MODIFICAR (agregar rutas estáticas)
```

**Archivos a ELIMINAR** al final:
- `src/APITester.tsx`
- `src/logo.svg`
- `src/react.svg`

---

## PASO 1: Reescribir `src/index.html`

Reemplazar TODO el contenido de `src/index.html` con:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO Core -->
    <title>Carnicería La Fe | Carnes Frescas y Pan Artesanal en [CIUDAD]</title>
    <meta name="description" content="Carnicería La Fe: carnes frescas seleccionadas, cortes premium y pan artesanal recién horneado. Atención personalizada en [CIUDAD]. Visitanos en [DIRECCIÓN]." />
    <meta name="keywords" content="carnicería, carnes frescas, cortes de carne, pan artesanal, carnicería [CIUDAD], carnicería cerca de mí, panadería [CIUDAD]" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://[DOMINIO]/" />

    <!-- Open Graph -->
    <meta property="og:title" content="Carnicería La Fe | Carnes Frescas y Pan Artesanal" />
    <meta property="og:description" content="Las mejores carnes frescas y pan artesanal recién horneado. Visítanos en [DIRECCIÓN], [CIUDAD]." />
    <meta property="og:image" content="https://[DOMINIO]/Public/Logo.png" />
    <meta property="og:url" content="https://[DOMINIO]/" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_AR" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/Public/Logo.png" />

    <!-- Google Fonts: Playfair Display + Source Sans 3 + DM Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Source+Sans+3:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

    <!-- JSON-LD Schema.org — Tipo Butcher para SEO local -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ButcherShop",
      "name": "Carnicería La Fe",
      "image": "https://[DOMINIO]/Public/Logo.png",
      "url": "https://[DOMINIO]",
      "telephone": "[TELÉFONO]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[DIRECCIÓN]",
        "addressLocality": "[CIUDAD]",
        "addressRegion": "[PROVINCIA]",
        "postalCode": "[CP]",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "[LAT]",
        "longitude": "[LNG]"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "08:00",
          "closes": "13:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "17:00",
          "closes": "20:30"
        }
      ],
      "priceRange": "$$",
      "servesCuisine": "Carnes argentinas",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Productos de Carnicería La Fe",
        "itemListElement": [
          { "@type": "OfferCatalog", "name": "Carnes Frescas" },
          { "@type": "OfferCatalog", "name": "Pan Fresco Artesanal" }
        ]
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

---

## PASO 2: Reescribir `src/index.css`

Reemplazar TODO el contenido de `src/index.css` con:

```css
@import "tailwindcss";

@theme {
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;
  --font-mono: "DM Mono", monospace;

  --color-rojo: #8B1A1A;
  --color-rojo-hover: #A52020;
  --color-hueso: #F5F0E8;
  --color-madera: #3E2723;
  --color-madera-clara: #6D4C41;
  --color-dorado: #C8A96E;
  --color-dorado-claro: #D4B97A;
  --color-crema: #FFF8F0;
  --color-verde: #4A6741;
  --color-verde-claro: #5A7A51;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-body);
    color: var(--color-madera);
    background-color: var(--color-hueso);
    margin: 0;
    padding: 0;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--color-madera);
    line-height: 1.2;
  }

  ::selection {
    background-color: var(--color-dorado);
    color: var(--color-madera);
  }

  img {
    max-width: 100%;
    height: auto;
  }
}

/* Skip-to-content para accesibilidad */
.skip-to-content {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.75rem 1.5rem;
  background: var(--color-madera);
  color: var(--color-hueso);
  font-weight: 600;
  text-decoration: none;
}

.skip-to-content:focus {
  left: 0;
}

/* Separador decorativo entre secciones */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 0;
}

.section-divider::before,
.section-divider::after {
  content: "";
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: var(--color-dorado);
  opacity: 0.5;
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-hueso);
}

::-webkit-scrollbar-thumb {
  background: var(--color-madera-clara);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-madera);
}

@media (prefers-reduced-motion) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

---

## PASO 3: Modificar `src/index.ts`

Reemplazar TODO el contenido de `src/index.ts` con:

```typescript
import { serve } from "bun";
import index from "./index.html";
import path from "path";

const server = serve({
  routes: {
    "/*": index,

    "/robots.txt": () =>
      new Response(
        `User-agent: *\nAllow: /\nSitemap: https://[DOMINIO]/sitemap.xml`,
        { headers: { "Content-Type": "text/plain" } }
      ),

    "/sitemap.xml": () =>
      new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[DOMINIO]/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`,
        { headers: { "Content-Type": "application/xml" } }
      ),
  },

  async fetch(req) {
    const url = new URL(req.url);

    // Servir archivos estáticos de Public/
    if (url.pathname.startsWith("/Public/")) {
      const filePath = path.join(process.cwd(), url.pathname);
      const file = Bun.file(filePath);

      if (await file.exists()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes: Record<string, string> = {
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".webp": "image/webp",
          ".svg": "image/svg+xml",
          ".gif": "image/gif",
        };
        const contentType = mimeTypes[ext] || "application/octet-stream";

        return new Response(file, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
      return new Response("Not Found", { status: 404 });
    }

    return new Response("Not Found", { status: 404 });
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Carnicería La Fe — Server running at ${server.url}`);
```

---

## PASO 4: Crear `src/data/products.ts`

Crear el archivo `src/data/products.ts`:

```typescript
export interface Product {
  id: string;
  name: string;
  category: "carnes" | "pan-fresco";
  image: string;
  alt: string;
  description: string;
  available: boolean;
}

export const products: Product[] = [
  // ── CARNES ──
  {
    id: "carne-1",
    name: "Asado de Tira",
    category: "carnes",
    image: "/Public/Carnes/carne1.jpg",
    alt: "Asado de tira fresco cortado en Carnicería La Fe",
    description: "Corte clásico para la parrilla",
    available: true,
  },
  {
    id: "carne-2",
    name: "Vacío",
    category: "carnes",
    image: "/Public/Carnes/carne2.jpg",
    alt: "Vacío fresco listo para asar en Carnicería La Fe",
    description: "Tierno y jugoso, ideal para asar",
    available: true,
  },
  {
    id: "carne-3",
    name: "Matambre",
    category: "carnes",
    image: "/Public/Carnes/carne3.jpg",
    alt: "Matambre fresco de Carnicería La Fe",
    description: "Perfecto relleno o a la pizza",
    available: true,
  },
  {
    id: "carne-4",
    name: "Entraña",
    category: "carnes",
    image: "/Public/Carnes/carne4.jpg",
    alt: "Entraña fresca cortada en Carnicería La Fe",
    description: "Sabor intenso, cocción rápida",
    available: true,
  },
  {
    id: "carne-5",
    name: "Bife de Chorizo",
    category: "carnes",
    image: "/Public/Carnes/carne5.jpg",
    alt: "Bife de chorizo premium de Carnicería La Fe",
    description: "El rey de la parrilla argentina",
    available: true,
  },
  {
    id: "carne-6",
    name: "Tapa de Asado",
    category: "carnes",
    image: "/Public/Carnes/carne6.jpg",
    alt: "Tapa de asado fresca de Carnicería La Fe",
    description: "Versátil, para horno o parrilla",
    available: true,
  },
  {
    id: "carne-7",
    name: "Paleta",
    category: "carnes",
    image: "/Public/Carnes/carne7.jpg",
    alt: "Paleta de res fresca de Carnicería La Fe",
    description: "Ideal para estofados y guisos",
    available: true,
  },
  {
    id: "carne-8",
    name: "Cuadril",
    category: "carnes",
    image: "/Public/Carnes/carne8.jpg",
    alt: "Cuadril magro y fresco de Carnicería La Fe",
    description: "Magro y sabroso",
    available: true,
  },

  // ── PAN FRESCO ──
  {
    id: "pan-1",
    name: "Galleta de Campo",
    category: "pan-fresco",
    image: "/Public/PanFresco/Galleta.jpg",
    alt: "Galleta de campo artesanal de Carnicería La Fe",
    description: "Crujiente y tradicional",
    available: true,
  },
  {
    id: "pan-2",
    name: "Pan Artesanal",
    category: "pan-fresco",
    image: "/Public/PanFresco/pan.jpg",
    alt: "Pan artesanal recién horneado de Carnicería La Fe",
    description: "Recién horneado cada día",
    available: true,
  },
  {
    id: "pan-3",
    name: "Pan Chico",
    category: "pan-fresco",
    image: "/Public/PanFresco/panChico.jpg",
    alt: "Pan chico individual de Carnicería La Fe",
    description: "Porción individual perfecta",
    available: true,
  },
  {
    id: "pan-4",
    name: "Pan Chico Especial",
    category: "pan-fresco",
    image: "/Public/PanFresco/panChico2.jpg",
    alt: "Pan chico especial con masa madre de Carnicería La Fe",
    description: "Con masa madre",
    available: true,
  },
  {
    id: "pan-5",
    name: "Pan y Galleta",
    category: "pan-fresco",
    image: "/Public/PanFresco/panYGalleta.jpg",
    alt: "Combo de pan y galleta artesanal de Carnicería La Fe",
    description: "Lo mejor de ambos mundos",
    available: true,
  },
  {
    id: "pan-6",
    name: "Vacío Relleno",
    category: "pan-fresco",
    image: "/Public/PanFresco/VacioRelleno.jpg",
    alt: "Vacío relleno especialidad de Carnicería La Fe",
    description: "Especialidad de la casa",
    available: true,
  },
];

export const categories = [
  { id: "todos", label: "Todos" },
  { id: "carnes", label: "Carnes" },
  { id: "pan-fresco", label: "Pan Fresco" },
] as const;
```

---

## PASO 5: Crear `src/components/Header.tsx`

Crear el archivo `src/components/Header.tsx`:

```tsx
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#catalogo", label: "Catálogo" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-madera/95 backdrop-blur-sm shadow-lg shadow-madera/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Nombre */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <img
              src="/Public/Logo.png"
              alt="Logo de Carnicería La Fe"
              className="h-10 sm:h-12 w-auto rounded-md"
              width={48}
              height={48}
            />
            <div className="flex flex-col">
              <span
                className={`font-heading font-bold text-lg sm:text-xl leading-tight transition-colors duration-300 ${
                  scrolled ? "text-hueso" : "text-hueso"
                }`}
              >
                Carnicería La Fe
              </span>
              <span
                className={`text-xs font-body hidden sm:block transition-colors duration-300 ${
                  scrolled ? "text-dorado-claro" : "text-dorado"
                }`}
              >
                Carnes frescas y pan artesanal
              </span>
            </div>
          </a>

          {/* Nav Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-semibold tracking-wide uppercase transition-colors duration-200 hover:text-dorado ${
                  scrolled ? "text-hueso/80" : "text-hueso/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:[TELÉFONO]"
              className={`font-mono text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                scrolled
                  ? "bg-dorado text-madera hover:bg-dorado-claro"
                  : "bg-hueso/15 text-hueso hover:bg-hueso/25"
              }`}
              aria-label="Llamar a Carnicería La Fe"
            >
              ☎ [TELÉFONO]
            </a>
          </div>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-hueso hover:bg-hueso/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-hueso/10">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-hueso/90 text-base font-medium py-3 px-4 rounded-lg hover:bg-hueso/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:[TELÉFONO]"
                className="font-mono text-sm font-medium mt-2 px-4 py-3 bg-dorado text-madera rounded-lg text-center hover:bg-dorado-claro transition-colors"
              >
                ☎ Llamanos: [TELÉFONO]
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

---

## PASO 6: Crear `src/components/Hero.tsx`

Crear el archivo `src/components/Hero.tsx`:

```tsx
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Presentación de Carnicería La Fe"
    >
      {/* Imagen de fondo real de la carnicería */}
      <img
        src="/Public/fotoAfueraCarnicería.jpg"
        alt="Fachada de Carnicería La Fe en [CIUDAD]"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      {/* Overlay con tono madera, NO negro puro */}
      <div className="absolute inset-0 bg-madera/70" />

      {/* Contenido */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-20">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-hueso leading-tight mb-6">
          Carnes frescas y pan artesanal,{" "}
          <span className="text-dorado">todos los días</span>
        </h1>

        <p className="font-body text-lg sm:text-xl text-hueso/85 mb-4 max-w-xl mx-auto">
          Seleccionamos los mejores cortes para tu mesa. Atención personalizada
          con la calidad de siempre.
        </p>

        <p className="font-body text-sm sm:text-base text-dorado-claro mb-8">
          📍 [DIRECCIÓN], [CIUDAD] &nbsp;·&nbsp; Lun a Sáb 8:00–13:00 / 17:00–20:30
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#catalogo"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-rojo text-hueso font-body font-semibold text-base rounded-xl hover:bg-rojo-hover transition-colors duration-200 shadow-lg shadow-rojo/25 min-h-[44px]"
          >
            Ver Catálogo
          </a>
          <a
            href="https://wa.me/[TELÉFONO_SINFORMATO]?text=Hola%2C%20quiero%20consultar%20por%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-verde text-hueso font-body font-semibold text-base rounded-xl hover:bg-verde-claro transition-colors duration-200 min-h-[44px]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-hueso/50">
          <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
```

---

## PASO 7: Crear `src/components/ProductCard.tsx`

Crear el archivo `src/components/ProductCard.tsx`:

```tsx
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group bg-crema rounded-xl border border-dorado/15 overflow-hidden shadow-sm hover:shadow-md hover:shadow-madera-clara/10 transition-all duration-300">
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        {/* Badge de disponibilidad */}
        {product.available && (
          <span className="absolute top-3 right-3 flex items-center gap-1.5 bg-verde/90 text-hueso text-xs font-body font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-hueso rounded-full animate-pulse" />
            Disponible
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-madera mb-1.5">
          {product.name}
        </h3>
        <p className="font-body text-sm text-madera-clara leading-relaxed">
          {product.description}
        </p>
      </div>
    </article>
  );
}
```

---

## PASO 8: Crear `src/components/CatalogSection.tsx`

Crear el archivo `src/components/CatalogSection.tsx`:

```tsx
import { useState } from "react";
import { products, categories } from "../data/products";
import { ProductCard } from "./ProductCard";

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const filteredProducts =
    activeCategory === "todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      id="catalogo"
      className="py-16 sm:py-24 bg-hueso"
      aria-label="Catálogo de productos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-madera mb-4">
            Nuestros Productos
          </h2>
          <p className="font-body text-base sm:text-lg text-madera-clara max-w-2xl mx-auto">
            Seleccionamos cada corte con dedicación. Carnes frescas del día y
            pan artesanal recién horneado.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 flex-wrap" role="tablist" aria-label="Filtrar productos por categoría">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`px-5 sm:px-6 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[44px] ${
                activeCategory === cat.id
                  ? "bg-rojo text-hueso shadow-md shadow-rojo/20"
                  : "bg-crema text-madera-clara border border-dorado/20 hover:border-dorado/40 hover:text-madera"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## PASO 9: Crear `src/components/AboutSection.tsx`

Crear el archivo `src/components/AboutSection.tsx`:

```tsx
export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="py-16 sm:py-24 bg-crema"
      aria-label="Sobre nosotros"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Imagen */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-madera/10">
              <img
                src="/Public/fotoCarniceriaConPersonalVacia.jpg"
                alt="Interior de Carnicería La Fe, mostrador y vitrinas con productos frescos"
                loading="lazy"
                decoding="async"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              {/* Esquina decorativa */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rojo via-dorado to-rojo" />
            </div>
          </div>

          {/* Texto */}
          <div className="order-1 lg:order-2">
            <span className="font-mono text-sm text-dorado font-medium uppercase tracking-wider">
              Nuestra Historia
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-madera mt-3 mb-6">
              Tradición y calidad en cada corte
            </h2>
            <div className="space-y-4 font-body text-base sm:text-lg text-madera-clara leading-relaxed">
              <p>
                En <strong className="text-madera">Carnicería La Fe</strong> creemos que la buena
                mesa empieza con productos frescos y bien seleccionados. Cada mañana
                recibimos cortes de primera calidad para ofrecerte lo mejor.
              </p>
              <p>
                Más que una carnicería, somos parte del barrio. Conocemos a nuestros
                clientes por su nombre y sabemos exactamente qué corte necesitan para
                cada ocasión — ya sea un asado del domingo, un guiso entre semana o
                ese vacío relleno que es nuestra especialidad.
              </p>
              <p>
                Además, horneamos pan fresco todos los días. Galletas de campo crocantes,
                pan artesanal y nuestras recetas de siempre, porque no hay mejor
                compañía para la buena carne que un pan recién sacado del horno.
              </p>
            </div>

            {/* Datos destacados */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-dorado/20">
              <div className="text-center">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-rojo">8+</span>
                <p className="font-body text-xs sm:text-sm text-madera-clara mt-1">Cortes<br/>frescos</p>
              </div>
              <div className="text-center">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-rojo">6</span>
                <p className="font-body text-xs sm:text-sm text-madera-clara mt-1">Variedades<br/>de pan</p>
              </div>
              <div className="text-center">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-rojo">6</span>
                <p className="font-body text-xs sm:text-sm text-madera-clara mt-1">Días a<br/>la semana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## PASO 10: Crear `src/components/ContactSection.tsx`

Crear el archivo `src/components/ContactSection.tsx`:

```tsx
export function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-16 sm:py-24 bg-hueso"
      aria-label="Información de contacto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-madera mb-4">
            Visitanos
          </h2>
          <p className="font-body text-base sm:text-lg text-madera-clara max-w-xl mx-auto">
            Estamos en el barrio, esperándote con los mejores cortes y pan recién horneado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Dirección */}
          <div className="bg-crema rounded-2xl p-6 sm:p-8 border border-dorado/15 text-center">
            <div className="w-14 h-14 bg-rojo/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rojo">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-madera mb-2">Dirección</h3>
            <p className="font-body text-madera-clara">
              [DIRECCIÓN]<br />
              [CIUDAD], [PROVINCIA]
            </p>
          </div>

          {/* Horarios */}
          <div className="bg-crema rounded-2xl p-6 sm:p-8 border border-dorado/15 text-center">
            <div className="w-14 h-14 bg-rojo/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rojo">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-madera mb-2">Horarios</h3>
            <div className="font-body text-sm text-madera-clara space-y-1">
              <p><strong className="text-madera">Lunes a Viernes</strong></p>
              <p>8:00 – 13:00 / 17:00 – 20:30</p>
              <p className="mt-2"><strong className="text-madera">Sábados</strong></p>
              <p>8:00 – 13:00</p>
              <p className="mt-2 text-rojo font-medium">Domingos cerrado</p>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-crema rounded-2xl p-6 sm:p-8 border border-dorado/15 text-center md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 bg-rojo/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rojo">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-madera mb-3">Contacto</h3>
            <div className="space-y-3">
              <a
                href="tel:[TELÉFONO]"
                className="block font-mono text-lg text-madera hover:text-rojo transition-colors"
              >
                [TELÉFONO]
              </a>
              <a
                href="https://wa.me/[TELÉFONO_SINFORMATO]?text=Hola%2C%20quiero%20consultar%20por%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-verde text-hueso font-body font-semibold rounded-xl hover:bg-verde-claro transition-colors duration-200 min-h-[44px]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Escribinos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## PASO 11: Crear `src/components/Footer.tsx`

Crear el archivo `src/components/Footer.tsx`:

```tsx
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-madera text-hueso" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo + Descripción */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Public/Logo.png"
                alt="Logo Carnicería La Fe"
                className="h-10 w-auto rounded-md"
                loading="lazy"
                width={40}
                height={40}
              />
              <span className="font-heading text-xl font-bold text-hueso">
                Carnicería La Fe
              </span>
            </div>
            <p className="font-body text-sm text-hueso/70 leading-relaxed max-w-xs">
              Carnes frescas seleccionadas y pan artesanal recién horneado.
              La calidad de siempre para tu mesa.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-heading text-base font-semibold text-dorado mb-4">
              Navegación
            </h3>
            <nav aria-label="Enlaces del pie de página">
              <ul className="space-y-2">
                {[
                  { href: "#inicio", label: "Inicio" },
                  { href: "#catalogo", label: "Catálogo" },
                  { href: "#nosotros", label: "Nosotros" },
                  { href: "#contacto", label: "Contacto" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-hueso/60 hover:text-dorado transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-heading text-base font-semibold text-dorado mb-4">
              Contacto
            </h3>
            <address className="not-italic space-y-2 font-body text-sm text-hueso/70">
              <p>[DIRECCIÓN]</p>
              <p>[CIUDAD], [PROVINCIA]</p>
              <a
                href="tel:[TELÉFONO]"
                className="block text-hueso/80 hover:text-dorado transition-colors"
              >
                [TELÉFONO]
              </a>
              <div className="pt-2">
                <p className="text-hueso/50 text-xs">Lun–Vie: 8:00–13:00 / 17:00–20:30</p>
                <p className="text-hueso/50 text-xs">Sáb: 8:00–13:00</p>
              </div>
            </address>
          </div>
        </div>

        {/* Línea separadora + Copyright */}
        <div className="mt-10 pt-6 border-t border-hueso/10 text-center">
          <p className="font-body text-xs text-hueso/40">
            © {currentYear} Carnicería La Fe — Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## PASO 12: Reescribir `src/App.tsx`

Reemplazar TODO el contenido de `src/App.tsx` con:

```tsx
import "./index.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CatalogSection } from "./components/CatalogSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <>
      {/* Skip-to-content para accesibilidad */}
      <a href="#catalogo" className="skip-to-content">
        Ir al contenido principal
      </a>

      <Header />

      <main id="contenido-principal">
        <Hero />

        {/* Separador decorativo */}
        <div className="section-divider" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dorado/60">
            <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" fill="currentColor" />
          </svg>
        </div>

        <CatalogSection />

        <div className="section-divider" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dorado/60">
            <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" fill="currentColor" />
          </svg>
        </div>

        <AboutSection />

        <div className="section-divider" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dorado/60">
            <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" fill="currentColor" />
          </svg>
        </div>

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
```

---

## PASO 13: Eliminar archivos del template

Eliminar estos archivos que ya no se necesitan:

```bash
rm src/APITester.tsx
rm src/logo.svg
rm src/react.svg
```

---

## PASO 14: Verificar que funciona

```bash
bun dev
```

Abrir en el navegador y verificar:
1. ✅ Header con logo y navegación
2. ✅ Hero con foto real de la carnicería
3. ✅ Catálogo con filtros funcionando
4. ✅ Sección "Nosotros" con foto del interior
5. ✅ Contacto con teléfono y WhatsApp
6. ✅ Footer completo
7. ✅ Responsive en mobile
8. ✅ Scroll suave entre secciones

---

## PLACEHOLDERS A REEMPLAZAR

Buscar y reemplazar estos valores en TODOS los archivos una vez que se tengan los datos reales:

| Placeholder | Descripción | Archivos afectados |
|---|---|---|
| `[CIUDAD]` | Ciudad donde está la carnicería | index.html, Hero.tsx, ContactSection.tsx, Footer.tsx |
| `[PROVINCIA]` | Provincia | index.html, ContactSection.tsx, Footer.tsx |
| `[DIRECCIÓN]` | Calle y número | index.html, Hero.tsx, ContactSection.tsx, Footer.tsx |
| `[CP]` | Código postal | index.html |
| `[TELÉFONO]` | Teléfono con formato (ej: 011 1234-5678) | index.html, Header.tsx, ContactSection.tsx, Footer.tsx |
| `[TELÉFONO_SINFORMATO]` | Solo números sin espacios (ej: 5491112345678) | Hero.tsx, ContactSection.tsx |
| `[DOMINIO]` | Dominio web (ej: carnicerialafe.com.ar) | index.html, index.ts |
| `[LAT]` | Latitud GPS | index.html |
| `[LNG]` | Longitud GPS | index.html |

---

## REGLAS DE DISEÑO (NO NEGOCIABLES)

1. **NO gradientes neón** — Solo colores de la paleta definida
2. **NO fuentes genéricas** — Solo Playfair Display, Source Sans 3, DM Mono
3. **NO animaciones exageradas** — Máximo 300ms, solo opacity y transform
4. **NO parallax** — Diseño limpio y directo
5. **NO fondos negros puros** — Usar `bg-madera` (#3E2723) para oscuros
6. **NO texto gris frío** — Usar `text-madera-clara` (#6D4C41) para texto secundario
7. **Imágenes con lazy loading** — Excepto Hero y Logo
8. **Alt text semántico** — Incluir "Carnicería La Fe" en todos los alt
9. **Touch targets 44x44px** — En TODOS los botones y links
10. **Un solo `<h1>`** — Solo en Hero section
