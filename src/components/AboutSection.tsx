import { FiCheck, FiHeart, FiStar } from "react-icons/fi";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-crema py-16 sm:py-24" aria-label="Sobre nosotros">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal as="div" className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl shadow-lg shadow-madera/10">
            <img
              src="/Public/fotoCarniceriaConPersonalVacia.jpg"
              alt="Interior de Carniceria La Fe"
              loading="lazy"
              decoding="async"
              className="aspect-4/3 h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal as="div" delay={1} className="order-1 lg:order-2">
          <span className="font-mono text-sm font-medium uppercase tracking-wider text-dorado">Nuestra Historia</span>
          <h2 className="font-heading mt-3 text-3xl font-bold text-madera sm:text-4xl">
            Cercania, confianza y buena carne
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-madera-clara sm:text-lg">
            <p>
              En <strong className="text-madera">Carniceria La Fe</strong> creemos que una buena comida empieza con
              un producto fresco y una recomendacion honesta.
            </p>
            <p>
              Somos parte de Durazno y atendemos como se atiende en el barrio: escuchando, aconsejando y ayudandote a
              llevar justo lo que necesitas.
            </p>
            <p>
              Ademas de carnes seleccionadas, ofrecemos pan artesanal para que te lleves todo en un solo lugar.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Reveal as="div" className="flex items-start gap-3 rounded-xl border border-dorado/15 bg-hueso p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-dorado/30 hover:shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dorado/10 text-dorado">
                <FiCheck size={18} strokeWidth={2.5} />
              </span>
              <div>
                <p className="font-semibold text-madera">Frescura diaria</p>
                <p className="mt-0.5 text-sm text-madera-clara">Cortes del dia, siempre frescos</p>
              </div>
            </Reveal>
            <Reveal as="div" delay={1} className="flex items-start gap-3 rounded-xl border border-dorado/15 bg-hueso p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-dorado/30 hover:shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dorado/10 text-dorado">
                <FiHeart size={18} />
              </span>
              <div>
                <p className="font-semibold text-madera">Atencion de barrio</p>
                <p className="mt-0.5 text-sm text-madera-clara">Te asesoramos con el mejor corte</p>
              </div>
            </Reveal>
            <Reveal as="div" delay={2} className="flex items-start gap-3 rounded-xl border border-dorado/15 bg-hueso p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-dorado/30 hover:shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dorado/10 text-dorado">
                <FiStar size={18} />
              </span>
              <div>
                <p className="font-semibold text-madera">Pan artesanal</p>
                <p className="mt-0.5 text-sm text-madera-clara">Todo lo que necesitas en un lugar</p>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
