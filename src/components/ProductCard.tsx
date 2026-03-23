import { Link } from "react-router-dom";
import { getProductSlug } from "../data/products";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  showAddButton?: boolean;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({
  product,
  showAddButton = false,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-dorado/20 bg-crema shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-madera-clara/10">
      <Link
        to={`/producto/${getProductSlug(product)}`}
        className="relative block w-full cursor-pointer text-left"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {product.available && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-verde/90 px-2.5 py-1 text-xs font-semibold text-hueso backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-hueso" />
              Disponible
            </span>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="font-heading text-lg font-semibold text-madera sm:text-xl">{product.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-madera-clara">{product.description}</p>
          <p className="mt-3 text-sm font-semibold text-rojo transition-colors group-hover:text-rojo-hover">
            Ver detalles
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        {showAddButton && (
          <button
            onClick={() => onAddToCart?.(product)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-rojo px-4 py-2.5 text-sm font-semibold text-hueso transition-all duration-150 hover:bg-rojo-hover active:scale-[0.98]"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  );
}
