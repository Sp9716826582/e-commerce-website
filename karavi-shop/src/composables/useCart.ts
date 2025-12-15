import { ref, computed } from 'vue';
import { load, save } from '../services/storage';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

const CART_KEY = 'mock_cart';
const cartRef = ref(load<CartItem[]>(CART_KEY, []));

export function useCart() {
  function persist() { save(CART_KEY, cartRef.value); }

  function add(item: Omit<CartItem, 'qty'>, qty = 1) {
    const existing = cartRef.value.find((x) => x.id === item.id);
    if (existing) { existing.qty += qty; }
    else { cartRef.value.push({ ...item, qty }); }
    persist();
  }

  function remove(id: string) {
    cartRef.value = cartRef.value.filter((x) => x.id !== id);
    persist();
  }

  function setQty(id: string, qty: number) {
    const item = cartRef.value.find((x) => x.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty);
    persist();
  }

  function clear() {
    cartRef.value = [];
    persist();
  }

  const total = computed(() => cartRef.value.reduce((sum, x) => sum + x.price * x.qty, 0));

  return { cart: cartRef, add, remove, setQty, clear, total };
}
