<template>
  <div class="card" style="padding:12px;">
    <img :src="product.image" alt="" style="width:100%;height:150px;object-fit:cover;border-radius:6px;" />
    <div class="spacer"></div>
    <div style="font-weight:600;">{{ product.title }}</div>
    <div style="color:var(--muted);font-size:14px;">{{ product.brand }} • {{ product.category }}</div>
    <div class="spacer"></div>
    <div class="price">₹ {{ product.price }}</div>
    <div style="font-size:13px;color:var(--muted);">⭐ {{ product.rating }}</div>
    <div class="spacer"></div>
    <quantity-counter v-model="qty" />
    <div class="spacer"></div>
    <button class="btn" @click="addToCart">Add to cart</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCart } from '../composables/useCart';
import type { Product } from '../composables/useProducts';
import QuantityCounter from './QuantityCounter.vue';

const props = defineProps<{ product: Product }>();
const qty = ref(1);
const { add } = useCart();

function addToCart() {
  add({
    id: props.product.id,
    title: props.product.title,
    price: props.product.price,
    image: props.product.image
  }, qty.value);
}
</script>
