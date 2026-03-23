---
description: "Plan completo para construir la web de Carnicería La Fe con Bun + React + Tailwind. SEO local, catálogo de productos, diseño profesional personalizado. Usar cuando se necesite implementar o continuar el desarrollo del sitio."
agent: "agent"
---

# Plan de Desarrollo — Carnicería La Fe

Eres un desarrollador senior especializado en sitios web para negocios locales con fuerte enfoque en SEO local. Tu misión es transformar este proyecto Bun + React + Tailwind en la web profesional de **Carnicería La Fe**.

> **REGLA ABSOLUTA**: Nada de estética genérica de IA. Nada de gradientes neón, nada de "hero sections" con texto centrado gigante sobre imagen oscura. Este sitio debe sentirse como una carnicería real, artesanal, con personalidad propia.

---

## STACK TECNOLÓGICO (ya configurado)

- **Runtime/Server**: Bun (serve API + static)
- **Frontend**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4
- **Build**: Custom build.ts con bun-plugin-tailwind
- **Dev**: `bun dev` con HMR

---

## FASE 1: Estructura HTML y SEO Fundacional

### 1.1 — Reescribir `src/index.html`

Reemplazar el HTML genérico actual con SEO local completo:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO Core -->
  <title>Carnicería La Fe | Carnes Frescas y Pan Artesanal en [CIUDAD]</title>
  <meta name="description" content="Carnicería La Fe: carnes frescas seleccionadas, cortes premium y pan artesanal recién horneado. Atención personalizada en [CIUDAD]. Visitanos en [DIRECCIÓN]." />
  <meta name="keywords" content="carnicería, carnes frescas, cortes de carne, pan artesanal, carnicería [CIUDAD], carnicería cerca de mí" />
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

  <!-- Preload fuentes -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- JSON-LD Structured Data (SEO Local) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Butcher",
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
        "closes": "20:00"
      }
    ],
    "priceRange": "$$"
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./frontend.tsx"></script>
</body>
</html>
```

**NOTA**: Reemplazar todos los `[PLACEHOLDERS]` con datos reales del negocio. Pregunta al usuario por: ciudad, dirección, teléfono, coordenadas, horarios, dominio.

### 1.2 — Servir archivos estáticos del Public/

En `src/index.ts`, configurar rutas estáticas para servir las imágenes de `Public/`:

```typescript
// Agregar rutas para servir imágenes estáticas
"/Public/*": async (req) => {
  const path = new URL(req.url).pathname;
  const file = Bun.file(`.${path}`);
  if (await file.exists()) return new Response(file);
  return new Response("Not Found", { status: 404 });
}
```

---

## FASE 2: Identidad Visual y Tipografía

### 2.1 — Paleta de Colores (Carnicería auténtica)

NO usar rojos brillantes genéricos. Usar tonos que evoquen carne artesanal, madera, tradición:

```
--color-rojo-sangre:    #8B1A1A   /* Rojo profundo, carne curada */
--color-hueso:          #F5F0E8   /* Fondo principal, cálido como papel de estraza */
--color-madera-oscura:  #3E2723   /* Textos principales, madera de carnicería */
--color-madera-clara:   #6D4C41   /* Textos secundarios */
--color-dorado:         #C8A96E   /* Acentos, precios, detalles premium */
--color-crema:          #FFF8F0   /* Cards, secciones alternas */
--color-verde-hierba:   #4A6741   /* Frescura, indicador de disponibilidad */
```

### 2.2 — Tipografía

**Heading (títulos):** `"Playfair Display"` — Serif elegante con personalidad, transmite tradición y calidad. NO es una fuente genérica de IA.

**Body (cuerpo):** `"Source Sans 3"` — Sans-serif limpia, muy legible, profesional sin ser fría.

**Accent (precios, badges):** `"DM Mono"` — Mono con carácter para precios y datos.

Implementación en Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Source+Sans+3:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 2.3 — Tailwind Config (en index.css con @theme)

```css
@import "tailwindcss";

@theme {
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;
  --font-mono: "DM Mono", monospace;

  --color-rojo: #8B1A1A;
  --color-hueso: #F5F0E8;
  --color-madera: #3E2723;
  --color-madera-clara: #6D4C41;
  --color-dorado: #C8A96E;
  --color-crema: #FFF8F0;
  --color-verde: #4A6741;
}
```

---

## FASE 3: Arquitectura de Componentes React

### Estructura de archivos a crear:

```
src/
├── components/
│   ├── Layout.tsx          # Header + Footer wrapper
│   ├── Header.tsx          # Nav con logo, nombre, contacto
│   ├── Footer.tsx          # Info negocio, horarios, mapa
│   ├── Hero.tsx            # Foto real de la carnicería (fotoAfueraCarnicería.jpg)
│   ├── CatalogSection.tsx  # Sección de catálogo con tabs
│   ├── ProductCard.tsx     # Card individual de producto
│   ├── AboutSection.tsx    # Sobre nosotros con foto del local
│   ├── ContactSection.tsx  # Dirección, teléfono, WhatsApp
│   └── SEOHead.tsx         # Meta tags dinámicos (si se necesita)
├── data/
│   └── products.ts         # Catálogo de productos tipado
├── App.tsx
├── frontend.tsx
├── index.css
├── index.html
└── index.ts
```

### 3.1 — Modelo de datos del catálogo (`src/data/products.ts`)

```typescript
export interface Product {
  id: string;
  name: string;
  category: "carnes" | "pan-fresco";
  image: string;
  description: string;
  available: boolean;
}

export const products: Product[] = [
  // CARNES
  { id: "carne-1", name: "Asado de Tira", category: "carnes", image: "/Public/Carnes/carne1.jpg", description: "Corte clásico para la parrilla", available: true },
  { id: "carne-2", name: "Vacío", category: "carnes", image: "/Public/Carnes/carne2.jpg", description: "Tierno y jugoso, ideal para asar", available: true },
  { id: "carne-3", name: "Matambre", category: "carnes", image: "/Public/Carnes/carne3.jpg", description: "Perfecto relleno o a la pizza", available: true },
  { id: "carne-4", name: "Entraña", category: "carnes", image: "/Public/Carnes/carne4.jpg", description: "Sabor intenso, cocción rápida", available: true },
  { id: "carne-5", name: "Bife de Chorizo", category: "carnes", image: "/Public/Carnes/carne5.jpg", description: "El rey de la parrilla argentina", available: true },
  { id: "carne-6", name: "Tapa de Asado", category: "carnes", image: "/Public/Carnes/carne6.jpg", description: "Versátil, para horno o parrilla", available: true },
  { id: "carne-7", name: "Paleta", category: "carnes", image: "/Public/Carnes/carne7.jpg", description: "Ideal para estofados y guisos", available: true },
  { id: "carne-8", name: "Cuadril", category: "carnes", image: "/Public/Carnes/carne8.jpg", description: "Magro y sabroso", available: true },

  // PAN FRESCO
  { id: "pan-1", name: "Galleta de Campo", category: "pan-fresco", image: "/Public/PanFresco/Galleta.jpg", description: "Crujiente y tradicional", available: true },
  { id: "pan-2", name: "Pan Artesanal", category: "pan-fresco", image: "/Public/PanFresco/pan.jpg", description: "Recién horneado cada día", available: true },
  { id: "pan-3", name: "Pan Chico", category: "pan-fresco", image: "/Public/PanFresco/panChico.jpg", description: "Porción individual perfecta", available: true },
  { id: "pan-4", name: "Pan Chico Especial", category: "pan-fresco", image: "/Public/PanFresco/panChico2.jpg", description: "Con masa madre", available: true },
  { id: "pan-5", name: "Pan y Galleta Combo", category: "pan-fresco", image: "/Public/PanFresco/panYGalleta.jpg", description: "Lo mejor de ambos mundos", available: true },
  { id: "pan-6", name: "Vacío Relleno", category: "pan-fresco", image: "/Public/PanFresco/VacioRelleno.jpg", description: "Especialidad de la casa", available: true },
];
```

> **NOTA**: Los nombres de productos son sugeridos. El usuario debe confirmarlos con los nombres reales de cada corte/producto.

### 3.2 — Descripción de cada componente

#### `Header.tsx`
- Logo (`/Public/Logo.png`) a la izquierda
- Nombre "Carnicería La Fe" en `font-heading` con `font-bold`
- Navegación simple: Inicio | Catálogo | Nosotros | Contacto
- Scroll-aware: fondo transparente arriba, `bg-madera/95 backdrop-blur` al hacer scroll
- Mobile: hamburger menu con animación sutil
- Teléfono visible en desktop: ícono + número clicable (`tel:`)

#### `Hero.tsx`
- Foto real `fotoAfueraCarnicería.jpg` como background
- Overlay semitransparente oscuro (no negro puro, usar `bg-madera/70`)
- Título `<h1>`: "Carnes frescas y pan artesanal, todos los días"
- Subtítulo con dirección y horario
- CTA: "Ver Catálogo" (scroll suave a la sección)
- **NO usar efectos parallax ni animaciones exageradas**
- La imagen debe tener `alt` descriptivo para SEO

#### `CatalogSection.tsx`
- Título `<h2>`: "Nuestros Productos"
- Tabs/filtro: "Todos" | "Carnes" | "Pan Fresco"
- Grid responsive: 1 col mobile, 2 col tablet, 3-4 col desktop
- Usar `ProductCard` para cada item
- Animación entrada sutil: solo `opacity` + leve `translateY`, < 300ms

#### `ProductCard.tsx`
- Imagen con `aspect-ratio: 4/3`, `object-cover`
- Lazy loading: `loading="lazy"` + `decoding="async"`
- Alt text descriptivo (nombre del producto + categoría)
- Nombre del producto en `font-heading`
- Descripción breve en `font-body`
- Badge de disponibilidad (punto verde)
- Hover: escala sutil de la imagen (1.03), sombra
- Border-radius generoso pero no excesivo (`rounded-xl`)
- Fondo `bg-crema`, borde sutil `border-dorado/20`

#### `AboutSection.tsx`
- Foto `fotoCarniceriaConPersonalVacia.jpg`
- Texto sobre la historia/valores de la carnicería
- Layout: imagen a un lado, texto al otro (responsive: stack en mobile)
- Tono cálido, humano, familiar

#### `ContactSection.tsx`
- Dirección completa
- Teléfono clicable
- Botón WhatsApp (verde, prominente)
- Horarios de atención
- Google Maps embed (iframe) o link a Google Maps
- Schema.org markup ya cubierto en el HTML

#### `Footer.tsx`
- Repetir info de contacto
- Horarios resumidos
- Links a secciones
- "© 2026 Carnicería La Fe — Todos los derechos reservados"
- Background oscuro (`bg-madera`)

---

## FASE 4: SEO Local Avanzado

### 4.1 — Optimización de Imágenes
- Todas las imágenes con `alt` semántico: "Corte de asado de tira fresco en Carnicería La Fe"
- Usar `loading="lazy"` en todo excepto Hero y Logo
- Agregar `width` y `height` a imágenes para evitar CLS
- Servir con headers de cache apropiados desde Bun

### 4.2 — Semántica HTML
- Un solo `<h1>` por página (en Hero)
- `<h2>` para cada sección principal
- `<h3>` para nombres de productos
- `<nav>` para navegación
- `<main>` para contenido principal
- `<section>` con `aria-label` para cada bloque
- `<footer>` para el pie

### 4.3 — Performance
- Fuentes con `display=swap` para evitar FOIT
- Preconnect a Google Fonts
- Imágenes lazy-loaded
- CSS mínimo con Tailwind (purge automático)
- Sin JavaScript innecesario — React hydration limpio

### 4.4 — Meta tags por sección (futuro)
- Si se agregan más páginas, implementar meta tags dinámicos
- Sitemap.xml (puede generarse desde Bun en una ruta `/sitemap.xml`)
- robots.txt servido desde Bun

### 4.5 — Generar sitemap.xml y robots.txt

Agregar en `src/index.ts`:

```typescript
"/robots.txt": () => new Response(
  `User-agent: *\nAllow: /\nSitemap: https://[DOMINIO]/sitemap.xml`,
  { headers: { "Content-Type": "text/plain" } }
),
"/sitemap.xml": () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://[DOMINIO]/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  </urlset>`,
  { headers: { "Content-Type": "application/xml" } }
),
```

---

## FASE 5: Estilos Globales y Detalles

### 5.1 — `index.css` completo

- Eliminar completamente los estilos del template Bun+React
- Reset base con Tailwind
- Variables de color y tipografía en `@theme`
- Scroll suave (`scroll-behavior: smooth`)
- Selección de texto personalizada con color de la marca
- Fondo general `bg-hueso`
- Links con underline offset sutil

### 5.2 — Detalles que marcan la diferencia

- Texturas sutiles en fondos (CSS patterns, no imágenes pesadas)
- Separator entre secciones: línea con un pequeño ícono de cuchillo o res (SVG inline)
- Sombras cálidas (no grises, sino con tinte `madera-clara`)
- Transiciones suaves en hover (200-300ms, ease-out)

---

## FASE 6: Responsive y Accesibilidad

- Mobile-first: diseñar primero para 320px+
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Touch targets mínimo 44x44px
- Contraste mínimo 4.5:1 en todos los textos
- Focus visible en elementos interactivos
- Skip-to-content link oculto para screen readers
- Imágenes con alt descriptivo (ya cubierto)

---

## ORDEN DE EJECUCIÓN RECOMENDADO

1. **Primero**: `index.html` con SEO completo + `index.css` con tema
2. **Segundo**: `index.ts` con rutas estáticas + robots + sitemap
3. **Tercero**: `data/products.ts` con catálogo
4. **Cuarto**: Componentes en orden: Layout → Header → Hero → CatalogSection + ProductCard → AboutSection → ContactSection → Footer
5. **Quinto**: `App.tsx` integrando todo
6. **Sexto**: Ajustes responsive y testing visual
7. **Séptimo**: Limpieza de archivos del template (APITester.tsx, logos SVG del template)

---

## ARCHIVOS A ELIMINAR DEL TEMPLATE

- `src/APITester.tsx` — No se necesita
- `src/logo.svg` — Reemplazado por Logo.png
- `src/react.svg` — No se necesita

---

## ASSETS DISPONIBLES EN PUBLIC/

| Archivo | Uso |
|---------|-----|
| `Public/Logo.png` | Logo principal en header y favicon |
| `Public/fotoAfueraCarnicería.jpg` | Hero section — fachada del local |
| `Public/fotoCarniceriaConPersonalVacia.jpg` | Sección "Sobre Nosotros" |
| `Public/Carnes/carne1.jpg` a `carne8.jpg` | Catálogo de carnes (8 productos) |
| `Public/PanFresco/Galleta.jpg` | Galleta de campo |
| `Public/PanFresco/pan.jpg` | Pan artesanal |
| `Public/PanFresco/panChico.jpg` | Pan chico |
| `Public/PanFresco/panChico2.jpg` | Pan chico variante |
| `Public/PanFresco/panYGalleta.jpg` | Combo pan y galleta |
| `Public/PanFresco/VacioRelleno.jpg` | Vacío relleno (especialidad) |

---

## DATOS QUE NECESITO DEL USUARIO

Antes de implementar, solicita estos datos al usuario:

1. **Ciudad y provincia** donde se ubica la carnicería
2. **Dirección exacta** (calle y número)
3. **Teléfono** (fijo y/o celular para WhatsApp)
4. **Horarios** de atención (días y horas)
5. **Coordenadas GPS** (latitud/longitud) para el JSON-LD
6. **Dominio web** (si ya tienen uno)
7. **Nombres reales** de cada corte/producto de las fotos
8. **Breve historia** o valores de la carnicería (para "Sobre Nosotros")
9. **Redes sociales** (Instagram, Facebook, si tienen)
