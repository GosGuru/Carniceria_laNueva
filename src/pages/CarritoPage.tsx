import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTransition } from "../components/PageTransition";
import { Reveal } from "../components/Reveal";
import {
  clearCart,
  getCart,
  getWhatsAppOrderUrl,
  onCartUpdated,
  removeFromCart,
  setItemQuantity,
} from "../lib/cart";

export function CarritoPage() {
  const [items, setItems] = useState(() => getCart());

  useEffect(() => {
    const sync = () => setItems(getCart());
    return onCartUpdated(sync);
  }, []);

  const hasItems = items.length > 0;

  return (
    <PageTransition>
      <Header />
      <main className="min-h-[70vh] bg-hueso px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl">
          <Reveal as="h1" className="font-heading text-4xl font-bold text-madera sm:text-5xl">Tu carrito</Reveal>
          <p className="mt-3 text-madera-clara">
            Revisa tu pedido y envialo por WhatsApp para confirmar stock, corte y forma de entrega.
          </p>

          {!hasItems && (
            <div className="mt-8 rounded-2xl border border-dorado/20 bg-crema p-8 text-center">
              <FiShoppingCart size={56} className="mx-auto mb-4 text-dorado/40" />
              <p className="text-lg text-madera">Tu carrito esta vacio.</p>
              <Link
                to="/catalogo"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-rojo px-6 py-3 font-semibold text-hueso transition-all duration-150 hover:bg-rojo-hover active:scale-[0.98]"
              >
                Ver productos
              </Link>
            </div>
          )}

          {hasItems && (
            <>
              <div className="mt-8 space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid grid-cols-[72px_1fr] gap-4 rounded-xl border border-dorado/20 bg-crema p-4 sm:grid-cols-[92px_1fr_auto] sm:items-center"
                  >
                    <img
                      src={item.image}
                      alt={`Producto ${item.name} en carrito`}
                      className="h-18 w-18 rounded-lg object-cover sm:h-23 sm:w-23"
                      loading="lazy"
                    />

                    <div>
                      <h2 className="font-heading text-xl font-semibold text-madera">{item.name}</h2>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setItemQuantity(item.id, item.quantity - 1)}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-dorado/40 bg-hueso text-madera"
                          aria-label={`Quitar una unidad de ${item.name}`}
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="min-w-10 text-center font-mono text-lg text-madera">{item.quantity}</span>
                        <button
                          onClick={() => setItemQuantity(item.id, item.quantity + 1)}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-dorado/40 bg-hueso text-madera"
                          aria-label={`Agregar una unidad de ${item.name}`}
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="self-start rounded-lg p-2.5 text-rojo hover:bg-rojo/10 sm:self-center"
                      aria-label={`Quitar ${item.name} del carrito`}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => clearCart()}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rojo/40 px-6 py-3 font-semibold text-rojo transition-all duration-150 hover:bg-rojo/10 active:scale-[0.98]"
                >
                  <FiTrash2 size={16} />
                  Vaciar carrito
                </button>
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-verde px-6 py-3 font-semibold text-hueso transition-all duration-150 hover:bg-verde-claro active:scale-[0.98]"
                >
                  <FaWhatsapp size={20} />
                  Enviar pedido por WhatsApp
                </a>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
