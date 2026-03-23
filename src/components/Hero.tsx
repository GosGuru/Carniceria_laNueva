import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden sm:min-h-screen"
      aria-label="Presentacion de Carniceria La Fe"
    >
      <motion.img
        src="/Public/fotoAfueraCarniceria.jpg"
        alt="Fachada de Carniceria La Fe"
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
        decoding="async"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div 
        className="absolute inset-0 bg-madera/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
        <motion.h1 
          className="font-heading mb-6 text-4xl font-bold leading-tight text-hueso sm:text-5xl md:text-6xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          Tu carniceria en Durazno con <span className="text-dorado">cortes frescos todos los dias</span>
        </motion.h1>

        <motion.p 
          className="mx-auto mb-5 max-w-xl text-lg leading-relaxed text-hueso/85 sm:text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          En Carniceria La Fe te ayudamos a elegir el corte ideal para cada comida: asado, horno o plancha, con
          atencion cercana de barrio.
        </motion.p>

        <motion.p 
          className="mb-10 text-sm text-dorado-claro sm:text-base"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          Emilio Rossi y Federico Duran, Durazno - Lun a Sab 8:00-13:30 / 17:00-22:30 - Dom 8:00-13:30
        </motion.p>

        <motion.div 
          className="flex flex-col justify-center gap-4 sm:flex-row"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          <Link
            to="/catalogo"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rojo px-8 py-3.5 text-base font-semibold text-hueso shadow-lg shadow-rojo/25 transition-all duration-150 hover:bg-rojo-hover active:scale-[0.98]"
          >
            Ver productos y cortes
            <FiArrowRight size={18} />
          </Link>
          <a
            href="https://wa.me/59891778437?text=Hola%2C%20quiero%20consultar%20por%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-verde px-8 py-3.5 text-base font-semibold text-hueso transition-all duration-150 hover:bg-verde-claro active:scale-[0.98]"
          >
            <FaWhatsapp size={20} />
            Pedir por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
