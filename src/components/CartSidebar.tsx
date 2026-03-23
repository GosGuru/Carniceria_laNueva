import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  clearCart,
  getCart,
  getWhatsAppOrderUrl,
  onCartUpdated,
  removeFromCart,
  setItemQuantity,
} from "../lib/cart";
import { useCartSidebar } from "../lib/CartSidebarContext";

export function CartSidebar() {
  const { isOpen, closeSidebar } = useCartSidebar();
  const [items, setItems] = useState(() => getCart());

  useEffect(() => {
    const sync = () => setItems(getCart());
    return onCartUpdated(sync);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen, closeSidebar]);

  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-label="Cerrar carrito"
        onClick={closeSidebar}
        className={`fixed inset-0 z-70 cursor-default bg-madera/55 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito rapido"
        className={`fixed right-0 top-0 z-80 flex h-screen w-full max-w-97.5 flex-col border-l border-dorado/25 bg-crema shadow-2xl transition-transform duration-300 sm:w-97.5 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-dorado/20 px-4 py-4">
          <h2 className="font-heading text-2xl font-bold text-madera">Tu carrito</h2>
          <button
            onClick={closeSidebar}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-dorado/30 text-madera transition-all duration-150 hover:bg-hueso active:scale-[0.98]"
            aria-label="Cerrar carrito"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 && (
            <div className="rounded-xl border border-dorado/20 bg-hueso p-5 text-center">
              <p className="text-base text-madera">Todavia no agregaste productos.</p>
              <p className="mt-1 text-sm text-madera-clara">Explora el catalogo y arma tu pedido.</p>
            </div>
          )}

          {items.length > 0 && (
            <div className="space-y-3">
              {items.map((item) => (
                <article key={item.id} className="rounded-xl border border-dorado/20 bg-hueso p-3">
                  <div className="grid grid-cols-[56px_1fr] gap-3">
                    <img src={item.image} alt={`Producto ${item.name} en carrito`} className="h-14 w-14 rounded-lg object-cover" loading="lazy" />
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-madera">{item.name}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => setItemQuantity(item.id, item.quantity - 1)}
                          className="min-h-9 min-w-9 rounded-lg border border-dorado/40 bg-crema text-base font-bold text-madera"
                          aria-label={`Quitar una unidad de ${item.name}`}
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center font-mono text-base text-madera">{item.quantity}</span>
                        <button
                          onClick={() => setItemQuantity(item.id, item.quantity + 1)}
                          className="min-h-9 min-w-9 rounded-lg border border-dorado/40 bg-crema text-base font-bold text-madera"
                          aria-label={`Agregar una unidad de ${item.name}`}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto rounded-lg px-2 py-1 text-sm font-semibold text-rojo transition-all duration-150 hover:bg-rojo/10 active:scale-[0.98]"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <footer className="border-t border-dorado/20 px-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Link
              to="/carrito"
              onClick={closeSidebar}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-dorado/40 px-4 py-2.5 text-sm font-semibold text-madera transition-all duration-150 hover:bg-hueso active:scale-[0.98]"
            >
              Ver carrito completo
            </Link>
            <button
              onClick={() => clearCart()}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-rojo/40 px-4 py-2.5 text-sm font-semibold text-rojo transition-all duration-150 hover:bg-rojo/10 active:scale-[0.98]"
            >
              Vaciar carrito
            </button>
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-verde px-4 py-2.5 text-sm font-semibold text-hueso transition-all duration-150 hover:bg-verde-claro active:scale-[0.98]"
            >
              Enviar pedido por WhatsApp
            </a>
          </div>
        </footer>
      </aside>
    </>
  );
}
