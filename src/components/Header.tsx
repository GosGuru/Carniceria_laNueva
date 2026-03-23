import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaCartShopping, FaWhatsapp } from "react-icons/fa6";
import { useCartSidebar } from "../lib/CartSidebarContext";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSidebar } = useCartSidebar();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/catalogo", label: "Productos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-madera/95 shadow-lg shadow-madera/10 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8" aria-label="Navegacion principal">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/Public/Logo.png"
            alt="Logo de Carniceria La Fe"
            className="h-10 w-auto rounded-md sm:h-12"
            width={48}
            height={48}
          />
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold leading-tight text-hueso sm:text-xl">Carniceria La Fe</span>
            <span className="hidden text-xs text-dorado sm:block">Tu carniceria de confianza en Durazno</span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-wide transition-colors duration-200 hover:text-dorado ${
                  isActive ? "text-dorado" : "text-hueso/85"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={openSidebar}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-dorado/50 px-3 py-2 text-hueso transition-all duration-150 hover:bg-hueso/10 active:scale-[0.98]"
            aria-label="Abrir carrito rapido"
            title="Abrir carrito"
          >
            <FaCartShopping size={18} aria-hidden="true" />
          </button>
          <a
            href="https://wa.me/59891778437?text=Hola%2C%20quiero%20hacer%20una%20consulta"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-verde px-4 py-2 text-sm font-medium text-hueso transition-all duration-150 hover:bg-verde-claro active:scale-[0.98]"
          >
            <FaWhatsapp size={16} aria-hidden="true" />
            Consultar
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-hueso transition-colors hover:bg-hueso/10 md:hidden"
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
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
      </nav>

      {menuOpen && (
        <div className="border-t border-hueso/10 bg-madera/95 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base text-hueso/90 transition-colors hover:bg-hueso/10"
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                openSidebar();
              }}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-left text-base text-hueso/90 transition-all duration-150 hover:bg-hueso/10 active:scale-[0.98]"
            >
              <FaCartShopping size={16} aria-hidden="true" />
              Carrito
            </button>
            <a
              href="https://wa.me/59891778437?text=Hola%2C%20quiero%20hacer%20una%20consulta"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-verde px-4 py-3 text-center text-sm font-medium text-hueso transition-all duration-150 hover:bg-verde-claro active:scale-[0.98]"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
