import "./index.css";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartSidebar } from "./components/CartSidebar";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Reveal } from "./components/Reveal";
import { getProductSlug, products } from "./data/products";
import { CartSidebarProvider } from "./lib/CartSidebarContext";
import { CarritoPage } from "./pages/CarritoPage";
import { CatalogoPage } from "./pages/CatalogoPage";
import { ContactoPage } from "./pages/ContactoPage";
import { NosotrosPage } from "./pages/NosotrosPage";
import { ProductoPage } from "./pages/ProductoPage";
import { PageTransition } from "./components/PageTransition";

function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <PageTransition>
      <a href="#contenido-principal" className="skip-to-content">
        Ir al contenido principal
      </a>

      <Header />

      <main id="contenido-principal">
        <Hero />

        <section className="bg-crema py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-6 sm:px-6 lg:px-8">
            <Reveal className="rounded-xl border border-dorado/25 bg-hueso px-6 py-5 text-center transition-all duration-200 hover:border-dorado/40 hover:shadow-sm">
              <p className="font-heading text-xl font-bold text-rojo">Atencion cercana</p>
              <p className="mt-1 text-sm text-madera-clara">Te asesoramos corte por corte</p>
            </Reveal>
            <Reveal delay={1} className="rounded-xl border border-dorado/25 bg-hueso px-6 py-5 text-center transition-all duration-200 hover:border-dorado/40 hover:shadow-sm">
              <p className="font-heading text-xl font-bold text-rojo">Horarios amplios</p>
              <p className="mt-1 text-sm text-madera-clara">Lun-Sab y tambien domingo de manana</p>
            </Reveal>
            <Reveal delay={2} className="rounded-xl border border-dorado/25 bg-hueso px-6 py-5 text-center transition-all duration-200 hover:border-dorado/40 hover:shadow-sm">
              <p className="font-heading text-xl font-bold text-rojo">Pedido por WhatsApp</p>
              <p className="mt-1 text-sm text-madera-clara">Carrito online y confirmacion rapida</p>
            </Reveal>
          </div>
        </section>

        <section className="bg-hueso py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal as="h2" className="font-heading text-3xl font-bold text-madera sm:text-4xl">Explora Carniceria La Fe</Reveal>
            <p className="mt-4 max-w-2xl text-base text-madera-clara sm:text-lg">
              Navega entre secciones sin recarga: una experiencia rapida, fluida y pensada para comprar facil.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Reveal as="div">
                <Link to="/catalogo" className="block cursor-pointer rounded-xl border border-dorado/20 bg-crema p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-hueso-dark hover:shadow-sm">
                  <h3 className="font-heading text-xl font-semibold text-madera">Catalogo</h3>
                  <p className="mt-2 text-sm leading-relaxed text-madera-clara">Cortes frescos y pan artesanal.</p>
                </Link>
              </Reveal>
              <Reveal as="div" delay={1}>
                <Link to="/nosotros" className="block cursor-pointer rounded-xl border border-dorado/20 bg-crema p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-hueso-dark hover:shadow-sm">
                  <h3 className="font-heading text-xl font-semibold text-madera">Nosotros</h3>
                  <p className="mt-2 text-sm leading-relaxed text-madera-clara">Conoce la historia de nuestra carniceria.</p>
                </Link>
              </Reveal>
              <Reveal as="div" delay={2}>
                <Link to="/contacto" className="block cursor-pointer rounded-xl border border-dorado/20 bg-crema p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-hueso-dark hover:shadow-sm">
                  <h3 className="font-heading text-xl font-semibold text-madera">Contacto</h3>
                  <p className="mt-2 text-sm leading-relaxed text-madera-clara">Direccion, horarios y canales de pedido.</p>
                </Link>
              </Reveal>
              <Reveal as="div" delay={3}>
                <Link to="/carrito" className="block cursor-pointer rounded-xl border border-dorado/20 bg-crema p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-hueso-dark hover:shadow-sm">
                  <h3 className="font-heading text-xl font-semibold text-madera">Carrito</h3>
                  <p className="mt-2 text-sm leading-relaxed text-madera-clara">Arma tu pedido y envialo por WhatsApp.</p>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-crema py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Reveal as="h2" className="font-heading text-3xl font-bold text-madera sm:text-4xl">Destacados de la semana</Reveal>
                <p className="mt-4 max-w-2xl text-base text-madera-clara sm:text-lg">
                  Una seleccion de productos elegidos por nuestros clientes en Durazno.
                </p>
              </div>
              <Link to="/catalogo" className="hidden rounded-lg border border-dorado/30 px-4 py-2 text-sm font-semibold text-madera transition-colors hover:bg-hueso sm:inline-flex">
                Ver todo el catalogo
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((item, index) => (
                <Reveal key={item.id} as="article" delay={(index % 4) as 0 | 1 | 2 | 3} className="rounded-xl border border-dorado/20 bg-hueso p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <Link
                    to={`/producto/${getProductSlug(item)}`}
                    className="block w-full cursor-pointer text-left"
                    aria-label={`Ver detalles de ${item.name}`}
                  >
                    <img src={item.image} alt={item.alt} className="aspect-4/3 w-full rounded-lg object-cover" loading="lazy" decoding="async" />
                    <h3 className="font-heading mt-4 text-xl font-semibold text-madera">{item.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-madera-clara">{item.description}</p>
                    <p className="mt-3 text-sm font-semibold text-rojo hover:text-rojo-hover">Ver detalles y agregar</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-hueso py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal as="h2" className="font-heading text-3xl font-bold text-madera sm:text-4xl">Por que elegirnos</Reveal>
            <p className="mt-4 max-w-2xl text-base text-madera-clara sm:text-lg">
              Calidad, cercanía y compromiso con cada cliente.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Reveal as="article" className="rounded-xl border border-dorado/20 bg-crema p-7">
                <h3 className="font-heading text-2xl font-semibold text-madera">Frescura diaria</h3>
                <p className="mt-3 leading-relaxed text-madera-clara">Trabajamos con rotacion diaria para ofrecer cortes frescos y bien seleccionados.</p>
              </Reveal>
              <Reveal as="article" delay={1} className="rounded-xl border border-dorado/20 bg-crema p-7">
                <h3 className="font-heading text-2xl font-semibold text-madera">Asesoria real</h3>
                <p className="mt-3 leading-relaxed text-madera-clara">Te recomendamos segun la coccion que quieras: parrilla, horno, olla o plancha.</p>
              </Reveal>
              <Reveal as="article" delay={2} className="rounded-xl border border-dorado/20 bg-crema p-7">
                <h3 className="font-heading text-2xl font-semibold text-madera">Compra simple</h3>
                <p className="mt-3 leading-relaxed text-madera-clara">Armas tu carrito online y envias el pedido por WhatsApp en segundos.</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-madera py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <Reveal as="h2" className="font-heading text-3xl font-bold text-hueso sm:text-4xl">Listo para hacer tu pedido?</Reveal>
            <p className="mx-auto mt-4 max-w-2xl text-base text-hueso/80 sm:text-lg">
              Elegi tus productos, cargalos al carrito y te respondemos por WhatsApp para coordinar rapido.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Reveal as="div">
                <Link to="/catalogo" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-dorado px-7 py-3 font-semibold text-madera transition-all duration-150 hover:bg-dorado-claro active:scale-[0.98]">
                  Ir al catalogo
                </Link>
              </Reveal>
              <Reveal as="div" delay={1}>
                <Link to="/carrito" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-hueso/30 px-7 py-3 font-semibold text-hueso transition-all duration-150 hover:bg-hueso/10 active:scale-[0.98]">
                  Ver carrito
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-hueso py-16 sm:py-20" aria-label="Ubicacion del local">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <Reveal as="h2" className="font-heading text-3xl font-bold text-madera sm:text-4xl">Donde estamos</Reveal>
              <p className="mx-auto mt-3 max-w-3xl text-base text-madera-clara sm:text-lg">
                Estamos en Emilio Rossi y Federico Duran, Durazno. Te esperamos para asesorarte en persona con cortes frescos y pan recien hecho.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-dorado/25 bg-crema shadow-lg">
              <iframe
                title="Mapa de Carniceria La Fe"
                src="https://www.google.com/maps?q=Emilio+Rossi+y+Federico+Duran,+Durazno,+Uruguay&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-85 w-full sm:h-105"
              />
            </div>

            <div className="mt-5 text-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Emilio+Rossi+y+Federico+Duran,+Durazno,+Uruguay"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-dorado/40 px-6 py-3 text-sm font-semibold text-madera transition-all duration-150 hover:bg-crema active:scale-[0.98]"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

function MainRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/producto/:productSlug" element={<ProductoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <CartSidebarProvider>
      <MainRoutes />
      <CartSidebar />
    </CartSidebarProvider>
  );
}

export default App;
