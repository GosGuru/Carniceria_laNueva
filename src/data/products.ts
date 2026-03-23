export interface Product {
  id: string;
  name: string;
  category: "carnes" | "pan-fresco";
  image: string;
  alt: string;
  description: string;
  details?: string;
  available: boolean;
}

export const products: Product[] = [
  {
    id: "carne-1",
    name: "Asado de Tira",
    category: "carnes",
    image: "/Public/Carnes/carne1.jpg",
    alt: "Asado de tira fresco en Carniceria La Fe de Durazno",
    description: "Corte ideal para parrilla de fin de semana",
    details:
      "Recomendado para fuego medio y coccion progresiva. Ideal para compartir en asados familiares por su sabor intenso y buena textura.",
    available: true,
  },
  {
    id: "carne-2",
    name: "Vacio",
    category: "carnes",
    image: "/Public/Carnes/carne2.jpg",
    alt: "Vacio fresco de Carniceria La Fe en Durazno",
    description: "Tierno y jugoso, perfecto para asado lento",
    details:
      "Excelente para parrilla o horno. Queda muy bien con marinados suaves y una coccion lenta para mantener jugosidad.",
    available: true,
  },
  {
    id: "carne-3",
    name: "Matambre",
    category: "carnes",
    image: "/Public/Carnes/carne3.jpg",
    alt: "Matambre fresco de Carniceria La Fe en Durazno",
    description: "Excelente para matambre relleno o a la pizza",
    details:
      "Versatil para preparaciones al horno o parrilla. Muy elegido para recetas rellenas y versiones a la pizza.",
    available: true,
  },
  {
    id: "carne-4",
    name: "Entrana",
    category: "carnes",
    image: "/Public/Carnes/carne4.jpg",
    alt: "Entrana fresca cortada en Carniceria La Fe de Durazno",
    description: "Sabor intenso y coccion rapida a la plancha",
    details:
      "Corte de coccion corta para sellar bien y servir en el punto justo. Muy sabroso para plancha o parrilla caliente.",
    available: true,
  },
  {
    id: "carne-5",
    name: "Bife de Chorizo",
    category: "carnes",
    image: "/Public/Carnes/carne5.jpg",
    alt: "Bife de chorizo de Carniceria La Fe en Durazno",
    description: "Un clasico para quienes buscan un corte premium",
    available: true,
  },
  {
    id: "carne-6",
    name: "Tapa de Asado",
    category: "carnes",
    image: "/Public/Carnes/carne6.jpg",
    alt: "Tapa de asado fresca en Carniceria La Fe de Durazno",
    description: "Versatil para horno, parrilla o cocciones largas",
    available: true,
  },
  {
    id: "carne-7",
    name: "Paleta",
    category: "carnes",
    image: "/Public/Carnes/carne7.jpg",
    alt: "Paleta de res fresca en Carniceria La Fe de Durazno",
    description: "Muy rendidora para guisos y comidas caseras",
    available: true,
  },
  {
    id: "carne-8",
    name: "Cuadril",
    category: "carnes",
    image: "/Public/Carnes/carne8.jpg",
    alt: "Cuadril magro y fresco en Carniceria La Fe de Durazno",
    description: "Magro, tierno y rendidor para todos los dias",
    available: true,
  },
  {
    id: "pan-1",
    name: "Galleta de Campo",
    category: "pan-fresco",
    image: "/Public/PanFresco/Galleta.jpg",
    alt: "Galleta de campo artesanal de Carniceria La Fe en Durazno",
    description: "Crujiente, tradicional y recien hecha",
    available: true,
  },
  {
    id: "pan-2",
    name: "Pan Artesanal",
    category: "pan-fresco",
    image: "/Public/PanFresco/pan.jpg",
    alt: "Pan artesanal de Carniceria La Fe en Durazno",
    description: "Pan fresco recien horneado cada dia",
    available: true,
  },
  {
    id: "pan-3",
    name: "Pan Chico",
    category: "pan-fresco",
    image: "/Public/PanFresco/panChico.jpg",
    alt: "Pan chico individual de Carniceria La Fe en Durazno",
    description: "Ideal para una comida rapida o acompanar el asado",
    available: true,
  },
  {
    id: "pan-4",
    name: "Pan Chico Especial",
    category: "pan-fresco",
    image: "/Public/PanFresco/panChico2.jpg",
    alt: "Pan chico especial de Carniceria La Fe en Durazno",
    description: "Version especial con mejor miga y sabor",
    available: true,
  },
  {
    id: "pan-5",
    name: "Pan y Galleta",
    category: "pan-fresco",
    image: "/Public/PanFresco/panYGalleta.jpg",
    alt: "Combo de pan y galleta de Carniceria La Fe en Durazno",
    description: "La combinacion preferida para llevar todo junto",
    available: true,
  },
  {
    id: "pan-6",
    name: "Vacio Relleno",
    category: "pan-fresco",
    image: "/Public/PanFresco/VacioRelleno.jpg",
    alt: "Vacio relleno especialidad de Carniceria La Fe en Durazno",
    description: "Especialidad de la casa para ocasiones especiales",
    available: true,
  },
];

export const categories = [
  { id: "todos", label: "Todos", icon: "grid" },
  { id: "carnes", label: "Carnes", icon: "steak" },
  { id: "pan-fresco", label: "Pan Fresco", icon: "bread" },
] as const;

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getProductSlug(product: Product) {
  return `${slugify(product.name)}-${product.id}`;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => getProductSlug(product) === slug) ?? null;
}
