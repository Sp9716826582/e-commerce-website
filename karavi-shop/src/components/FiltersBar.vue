<template>
  <div class="card" style="padding:12px; display:grid; grid-template-columns: repeat(5, 1fr); gap:10px;">
    <div>
      <label style="font-size:12px;color:var(--muted);">Search</label>
      <input class="input" :value="query" @input="$emit('update:query', ($event.target as HTMLInputElement).value)" placeholder="Search..." />
    </div>
    <div>
      <label style="font-size:12px;color:var(--muted);">Category</label>
      <select class="select" :value="category || ''" @change="$emit('update:category', ($event.target as HTMLSelectElement).value || null)">
        <option value="">All</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>
    <div>
      <label style="font-size:12px;color:var(--muted);">Brand</label>
      <select class="select" :value="brand || ''" @change="$emit('update:brand', ($event.target as HTMLSelectElement).value || null)">
        <option value="">All</option>
        <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>
    <div>
      <label style="font-size:12px;color:var(--muted);">Min price</label>
      <input class="input" type="number" :value="minPrice ?? ''" @input="$emit('update:minPrice', parseNum(($event.target as HTMLInputElement).value))" />
    </div>
    <div>
      <label style="font-size:12px;color:var(--muted);">Max price</label>
      <input class="input" type="number" :value="maxPrice ?? ''" @input="$emit('update:maxPrice', parseNum(($event.target as HTMLInputElement).value))" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  query: string;
  category: string | null;
  brand: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  categories: string[];
  brands: string[];
}>();
defineEmits([
  'update:query', 'update:category', 'update:brand', 'update:minPrice', 'update:maxPrice'
]);

function parseNum(val: string) {
  const n = Number(val);
  return isNaN(n) ? null : n;
}
</script>
