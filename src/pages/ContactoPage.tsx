import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageTransition } from "../components/PageTransition";

export function ContactoPage() {
  return (
    <PageTransition>
      <Header />
      <main className="pt-20 sm:pt-24">
        <ContactSection />
      </main>
      <Footer />
    </PageTransition>
  );
}
