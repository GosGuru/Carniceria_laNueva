import { Link } from "react-router-dom";
import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import { FaFacebook, FaWhatsapp } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-madera text-hueso" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img src="/Public/Logo.png" alt="Logo Carniceria La Fe" className="h-10 w-auto rounded-md" loading="lazy" width={40} height={40} />
              <span className="font-heading text-xl font-bold text-hueso">Carniceria La Fe</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-hueso/70">
              Carniceria en Durazno con cortes frescos, pan artesanal y atencion de confianza.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/carniceria.la.fe.881170"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-hueso/10 text-hueso/70 transition-colors hover:bg-dorado/20 hover:text-dorado"
                aria-label="Facebook de Carniceria La Fe"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="https://wa.me/59891778437?text=Hola%2C%20quiero%20consultar%20por%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-hueso/10 text-hueso/70 transition-colors hover:bg-dorado/20 hover:text-dorado"
                aria-label="WhatsApp de Carniceria La Fe"
              >
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading mb-5 text-base font-semibold text-dorado">Explora el sitio</h3>
            <nav aria-label="Enlaces del pie de pagina">
              <ul className="space-y-3 text-sm text-hueso/70">
                <li><Link to="/" className="transition-colors hover:text-dorado">Inicio</Link></li>
                <li><Link to="/catalogo" className="transition-colors hover:text-dorado">Catalogo</Link></li>
                <li><Link to="/nosotros" className="transition-colors hover:text-dorado">Nosotros</Link></li>
                <li><Link to="/contacto" className="transition-colors hover:text-dorado">Contacto</Link></li>
                <li><Link to="/carrito" className="transition-colors hover:text-dorado">Carrito</Link></li>
              </ul>
            </nav>
          </div>

          <address className="not-italic">
            <h3 className="font-heading mb-5 text-base font-semibold text-dorado">Contacto</h3>
            <div className="space-y-3 text-sm text-hueso/70">
              <p className="flex items-start gap-2.5">
                <FiMapPin size={15} className="mt-0.5 shrink-0 text-dorado" />
                <span>Emilio Rossi y Federico Duran<br />Durazno, Departamento de Durazno (referencial)</span>
              </p>
              <a href="tel:091778437" className="flex items-center gap-2.5 text-hueso/80 transition-colors hover:text-dorado">
                <FiPhone size={15} className="shrink-0 text-dorado" />
                091778437
              </a>
              <div className="flex items-start gap-2.5 pt-1">
                <FiClock size={15} className="mt-0.5 shrink-0 text-dorado" />
                <div className="text-sm text-hueso/60">
                  <p>Lun-Sab: 8:00-13:30 / 17:00-22:30</p>
                  <p>Dom: 8:00-13:30</p>
                </div>
              </div>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-hueso/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-hueso/40">
            © {currentYear} Carniceria La Fe — Todos los derechos reservados.
          </p>
          <p className="text-xs text-hueso/30">
            Hecho con dedicacion en Durazno, Uruguay
          </p>
        </div>
      </div>
    </footer>
  );
}
