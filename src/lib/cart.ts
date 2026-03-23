import type { Product } from "../data/products";

export const WHATSAPP_NUMBER = "59891778437";
const STORAGE_KEY = "carniceria-la-fe-cart";
const CART_UPDATED_EVENT = "cart:updated";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
}

function emitCartUpdated() {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function onCartUpdated(listener: () => void): () => void {
  window.addEventListener(CART_UPDATED_EVENT, listener);
  window.addEventListener("storage", listener);

  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

export function getCart(): CartItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  emitCartUpdated();
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
    saveCart([...cart]);
    return;
  }

  saveCart([
    ...cart,
    {
      id: product.id,
      name: product.name,
      image: product.image,
      quantity: 1,
    },
  ]);
}

export function setItemQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const next = cart
    .map((item) => {
      if (item.id !== productId) return item;
      return { ...item, quantity };
    })
    .filter((item) => item.quantity > 0);

  saveCart(next);
}

export function removeFromCart(productId: string) {
  const cart = getCart();
  saveCart(cart.filter((item) => item.id !== productId));
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce((acc, item) => acc + item.quantity, 0);
}

export function createWhatsAppOrderText() {
  const cart = getCart();

  if (cart.length === 0) {
    return "Hola! Quiero hacer un pedido en Carniceria La Fe.";
  }

  const lines = cart.map((item) => `- ${item.name} x${item.quantity}`);

  return [
    "Hola! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    "Retiro/entrega: a coordinar",
    "Nombre: ",
    "Telefono: ",
  ].join("\n");
}

export function getWhatsAppOrderUrl() {
  const text = createWhatsAppOrderText();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
