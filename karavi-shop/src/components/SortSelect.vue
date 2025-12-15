<template>
  <div class="card" style="padding:12px;">
    <label style="font-size:12px;color:var(--muted);">Sort by</label>
    <select class="select" :value="modelValue || ''" @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value || null)">
      <option value="rating_desc">Top rated</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="title_asc">Title A-Z</option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: 'price_asc' | 'price_desc' | 'rating_desc' | 'title_asc' | null }>();
defineEmits<{ (e:'update:modelValue', v:any):void }>();
</script>
