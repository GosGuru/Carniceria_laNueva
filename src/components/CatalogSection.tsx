import { useState } from "react";
import { FiGrid } from "react-icons/fi";
import { GiBread, GiSteak } from "react-icons/gi";
import { categories, products } from "../data/products";
import type { Product } from "../data/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

const categoryIcons: Record<string, React.ReactNode> = {
  grid: <FiGrid size={15} />,
  steak: <GiSteak size={17} />,
  bread: <GiBread size={17} />,
};

interface CatalogSectionProps {
  showAddButton?: boolean;
  onAddToCart?: (product: Product) => void;
}

export function CatalogSection({
  showAddButton = false,
  onAddToCart,
}: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const filteredProducts =
    activeCategory === "todos"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id="catalogo" className="bg-hueso py-16 sm:py-24" aria-label="Catalogo de productos">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <Reveal as="h2" className="font-heading text-3xl font-bold text-madera sm:text-4xl md:text-5xl">Productos frescos en Durazno</Reveal>
          <p className="mx-auto mt-4 max-w-2xl text-base text-madera-clara sm:text-lg">
            Descubri nuestros cortes del dia y pan artesanal. Calidad, frescura y atencion personalizada en
            Carniceria La Fe.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3" role="tablist" aria-label="Filtrar productos">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-6 ${
                activeCategory === category.id
                  ? "bg-rojo text-hueso shadow-md shadow-rojo/20"
                  : "border border-dorado/20 bg-crema text-madera-clara hover:-translate-y-px hover:border-dorado/40 hover:text-madera"
              }`}
            >
              {categoryIcons[category.icon]}
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <Reveal 
              key={product.id} 
              as="div" 
              delay={(index % 4) as 0 | 1 | 2 | 3}
              direction={index % 2 === 0 ? "diagonal-left" : "diagonal-right"}
            >
              <ProductCard
                product={product}
                showAddButton={showAddButton}
                onAddToCart={onAddToCart}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
