import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface CartSidebarContextValue {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const CartSidebarContext = createContext<CartSidebarContextValue | undefined>(undefined);

export function CartSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openSidebar: () => setIsOpen(true),
      closeSidebar: () => setIsOpen(false),
      toggleSidebar: () => setIsOpen((prev) => !prev),
    }),
    [isOpen],
  );

  return <CartSidebarContext.Provider value={value}>{children}</CartSidebarContext.Provider>;
}

export function useCartSidebar() {
  const context = useContext(CartSidebarContext);

  if (!context) {
    throw new Error("useCartSidebar must be used within CartSidebarProvider");
  }

  return context;
}
