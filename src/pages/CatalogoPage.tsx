import { useState } from "react";
import { CatalogSection } from "../components/CatalogSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { type Product } from "../data/products";
import { useCartSidebar } from "../lib/CartSidebarContext";
import { addToCart } from "../lib/cart";
import { PageTransition } from "../components/PageTransition";

export function CatalogoPage() {
  const [feedback, setFeedback] = useState("");
  const { openSidebar } = useCartSidebar();

  const handleAdd = (product: Product) => {
    addToCart(product);
    openSidebar();
    setFeedback(`${product.name} agregado al carrito`);
    window.setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <PageTransition>
      <Header />
      <main className="pt-20 sm:pt-24">
        {feedback && (
          <div className="fixed right-4 top-24 z-50 rounded-lg bg-madera px-4 py-3 text-sm font-semibold text-hueso shadow-lg animate-[slide-in-right_200ms_ease-out]">
            {feedback}
          </div>
        )}
        <CatalogSection
          showAddButton
          onAddToCart={handleAdd}
        />
      </main>
      <Footer />
    </PageTransition>
  );
}
