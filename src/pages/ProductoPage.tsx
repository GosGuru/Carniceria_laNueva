import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Reveal } from "../components/Reveal";
import { SeoMeta } from "../components/SeoMeta";
import { getProductBySlug, getProductSlug, products } from "../data/products";
import { useCartSidebar } from "../lib/CartSidebarContext";
import { addToCart } from "../lib/cart";
import { useMemo, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { PageTransition } from "../components/PageTransition";
import { motion } from "framer-motion";

export function ProductoPage() {
  const { productSlug = "" } = useParams();
  const navigate = useNavigate();
  const { openSidebar } = useCartSidebar();
  const [feedback, setFeedback] = useState("");

  const product = getProductBySlug(productSlug);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return <Navigate to="/catalogo" replace />;
  }

  const categoryLabel = product.category === "carnes" ? "Carnes" : "Pan Fresco";
  const productDetails =
    product.details ??
    "Producto seleccionado por su frescura y calidad. Si quieres una recomendacion de coccion o cantidad, te asesoramos en el local y por WhatsApp.";

  const seoTitle = `${product.name} en Durazno | Carniceria La Fe`;
  const seoDescription = `${product.description}. ${productDetails}`;

  const handleAdd = () => {
    addToCart(product);
    openSidebar();
    setFeedback(`${product.name} agregado al carrito`);
    window.setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <PageTransition>
      <SeoMeta
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/producto/${productSlug}`}
        image={product.image}
        keywords={`carniceria en Durazno, ${product.name}, ${categoryLabel.toLowerCase()}, carnes frescas Durazno`}
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: [product.image],
          description: seoDescription,
          category: categoryLabel,
          brand: {
            "@type": "Brand",
            name: "Carniceria La Fe",
          },
          url: `${window.location.origin}/producto/${productSlug}`,
          offers: {
            "@type": "Offer",
            priceCurrency: "UYU",
            availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            seller: {
              "@type": "Organization",
              name: "Carniceria La Fe",
            },
          },
        }}
      />

      <Header />

      <main className="min-h-[70vh] bg-hueso px-4 pb-16 pt-24 sm:px-6 lg:px-8" aria-label={`Detalle de ${product.name}`}>
        {feedback && (
          <div className="fixed right-4 top-24 z-50 rounded-lg bg-madera px-4 py-3 text-sm font-semibold text-hueso shadow-lg animate-[slide-in-right_200ms_ease-out]">
            {feedback}
          </div>
        )}

        <section className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs tracking-wide text-madera-clara sm:text-sm">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="font-medium hover:text-madera">Inicio</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/catalogo" className="font-medium hover:text-madera">Catalogo</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-madera">{product.name}</li>
            </ol>
          </nav>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dorado/30 px-4 py-2 text-xs font-semibold tracking-wide text-madera transition-colors hover:bg-crema sm:text-sm"
          >
            <FiArrowLeft size={16} />
            Volver
          </button>

          <article className="overflow-hidden rounded-2xl border border-dorado/25 bg-crema shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <motion.img
                src={product.image}
                alt={product.alt}
                className="h-full min-h-[260px] w-full object-cover"
                loading="eager"
                decoding="async"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />

              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-dorado/20 bg-hueso px-3 py-1 text-xs font-semibold text-madera">
                    {categoryLabel}
                  </span>
                  {product.available ? (
                    <span className="rounded-full bg-verde/90 px-3 py-1 text-xs font-semibold text-hueso">Disponible</span>
                  ) : (
                    <span className="rounded-full bg-rojo/90 px-3 py-1 text-xs font-semibold text-hueso">No disponible</span>
                  )}
                </div>

                <h1 className="font-heading mt-3 text-3xl font-bold text-madera sm:text-4xl">{product.name}</h1>

                <p className="mt-4 text-base leading-relaxed text-madera-clara">{product.description}</p>

                <section className="mt-5 rounded-xl border border-dorado/20 bg-hueso p-4 sm:p-5" aria-label="Detalle del producto">
                  <h2 className="font-heading text-2xl font-semibold text-madera">Detalle</h2>
                  <p className="mt-2 text-sm leading-relaxed text-madera-clara sm:text-base">{productDetails}</p>
                </section>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={handleAdd}
                    disabled={!product.available}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-rojo px-4 py-3 text-sm font-semibold text-hueso transition-colors hover:bg-rojo-hover disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    Agregar al carrito
                  </button>
                  <Link
                    to="/catalogo"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-dorado/40 px-4 py-3 text-sm font-semibold text-madera transition-colors hover:bg-hueso"
                  >
                    Ver mas productos
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mx-auto mt-12 max-w-6xl" aria-label="Productos relacionados">
            <Reveal as="h2" className="font-heading text-2xl font-bold text-madera sm:text-3xl">Productos relacionados</Reveal>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item, index) => (
                <Reveal key={item.id} as="article" delay={(index % 4) as 0 | 1 | 2 | 3} className="overflow-hidden rounded-xl border border-dorado/20 bg-crema shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <Link to={`/producto/${getProductSlug(item)}`} className="block h-full">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="aspect-4/3 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="p-4">
                      <h3 className="font-heading text-xl font-semibold text-madera">{item.name}</h3>
                      <p className="mt-2 text-sm text-madera-clara">{item.description}</p>
                      <p className="mt-3 text-sm font-semibold text-rojo">Ver detalle</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </PageTransition>
  );
}
