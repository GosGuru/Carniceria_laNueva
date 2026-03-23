import { AboutSection } from "../components/AboutSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Reveal } from "../components/Reveal";
import { PageTransition } from "../components/PageTransition";

export function NosotrosPage() {
  return (
    <PageTransition>
      <Header />
      <main className="pt-20 sm:pt-24">
        <section className="bg-hueso px-4 py-14 text-center sm:px-6">
          <Reveal as="h1" className="font-heading text-4xl font-bold text-madera sm:text-5xl">Nosotros</Reveal>
          <p className="mx-auto mt-4 max-w-2xl text-base text-madera-clara sm:text-lg">
            Conoce nuestra historia, nuestra forma de trabajar y por que los vecinos de Durazno nos eligen cada dia.
          </p>
        </section>
        <AboutSection />
      </main>
      <Footer />
    </PageTransition>
  );
}
