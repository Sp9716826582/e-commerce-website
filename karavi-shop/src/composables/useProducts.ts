import { ref, computed } from 'vue';
import raw from '../data/products.json';

export type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: number; // 1-5
  image: string;
};

const products = ref<Product[]>(raw);

export function useProducts() {
  const query = ref('');
  const category = ref<string | null>(null);
  const brand = ref<string | null>(null);
  const minPrice = ref<number | null>(null);
  const maxPrice = ref<number | null>(null);
  const sortBy = ref<'price_asc' | 'price_desc' | 'rating_desc' | 'title_asc' | null>('rating_desc');

  const categories = computed(() => Array.from(new Set(products.value.map(p => p.category))).sort());
  const brands = computed(() => Array.from(new Set(products.value.map(p => p.brand))).sort());

  const filtered = computed(() => {
    let list = products.value.slice();

    // search
    if (query.value.trim()) {
      const q = query.value.trim().toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    // category
    if (category.value) list = list.filter(p => p.category === category.value);
    // brand
    if (brand.value) list = list.filter(p => p.brand === brand.value);
    // price
    if (minPrice.value != null) list = list.filter(p => p.price >= minPrice.value!);
    if (maxPrice.value != null) list = list.filter(p => p.price <= maxPrice.value!);

    // sort
    switch (sortBy.value) {
      case 'price_asc': list.sort((a,b)=>a.price-b.price); break;
      case 'price_desc': list.sort((a,b)=>b.price-a.price); break;
      case 'rating_desc': list.sort((a,b)=>b.rating-a.rating); break;
      case 'title_asc': list.sort((a,b)=>a.title.localeCompare(b.title)); break;
    }
    return list;
  });

  function setQuery(q: string) { query.value = q; }

  return {
    products,
    filtered,
    query, category, brand, minPrice, maxPrice, sortBy,
    categories, brands, setQuery
  };
}
