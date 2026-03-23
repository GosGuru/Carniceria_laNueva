import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contacto" className="bg-hueso py-16 sm:py-24" aria-label="Informacion de contacto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <Reveal as="h2" className="font-heading text-3xl font-bold text-madera sm:text-4xl md:text-5xl">Veni a conocernos</Reveal>
          <p className="mx-auto mt-4 max-w-xl text-base text-madera-clara sm:text-lg">
            Si buscas una carniceria en Durazno con atencion cercana, estamos para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Reveal as="div" className="rounded-2xl border border-dorado/15 bg-crema p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-8">
            <div className="mb-3 flex justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-dorado/10 text-dorado">
                <FiMapPin size={22} />
              </span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-madera">Direccion</h3>
            <p className="mt-2 text-madera-clara">
              Emilio Rossi y Federico Duran
              <br />
              Durazno, Departamento de Durazno (referencial)
            </p>
          </Reveal>

          <Reveal as="div" delay={1} className="rounded-2xl border border-dorado/15 bg-crema p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-8">
            <div className="mb-3 flex justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-dorado/10 text-dorado">
                <FiClock size={22} />
              </span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-madera">Horarios</h3>
            <div className="mt-2 space-y-1 text-sm text-madera-clara">
              <p>Lunes a Sabado: 8:00-13:30 / 17:00-22:30</p>
              <p>Domingo: 8:00-13:30</p>
            </div>
          </Reveal>

          <Reveal as="div" delay={2} className="rounded-2xl border border-dorado/15 bg-crema p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-8 md:col-span-2 lg:col-span-1">
            <div className="mb-3 flex justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-dorado/10 text-dorado">
                <FiPhone size={22} />
              </span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-madera">Contacto</h3>
            <div className="mt-3 space-y-3">
              <a href="tel:091778437" className="inline-flex items-center justify-center gap-1.5 font-mono text-lg text-madera transition-colors hover:text-rojo">
                <FiPhone size={16} />
                091778437
              </a>
              <a
                href="https://wa.me/59891778437?text=Hola%2C%20quiero%20consultar%20por%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-verde px-6 py-3 font-semibold text-hueso transition-all duration-150 hover:bg-verde-claro active:scale-[0.98]"
              >
                <FaWhatsapp size={20} />
                Hacer pedido por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
