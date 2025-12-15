<template>
  <div class="container">
    <div class="section">
      <filters-bar
        :query="query"
        :category="category"
        :brand="brand"
        :minPrice="minPrice"
        :maxPrice="maxPrice"
        :categories="categories"
        :brands="brands"
        @update:query="(v)=>{ query = v; setQuery(v) }"
        @update:category="(v)=> category = v"
        @update:brand="(v)=> brand = v"
        @update:minPrice="(v)=> minPrice = v"
        @update:maxPrice="(v)=> maxPrice = v"
      />
    </div>
    <div class="section">
      <sort-select v-model="sortBy" />
    </div>

    <div class="section">
      <div v-if="filtered.length === 0" class="card" style="padding:20px;">No products found.</div>
      <div class="grid grid-4">
        <product-card v-for="p in filtered" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useProducts } from '../composables/useProducts';
import { useRoute } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import FiltersBar from '../components/FiltersBar.vue';
import SortSelect from '../components/SortSelect.vue';

const route = useRoute();
const {
  filtered, query, category, brand, minPrice, maxPrice, sortBy, categories, brands, setQuery
} = useProducts();

watch(() => route.query.q, (q) => {
  if (typeof q === 'string') {
    setQuery(q);
  }
}, { immediate: true });
</script>
