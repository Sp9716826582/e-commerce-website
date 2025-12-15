<template>
  <div class="card" style="padding:12px; display:flex; gap:12px; align-items:center;">
    <img :src="item.image" alt="" style="width:120px;height:80px;object-fit:cover;border-radius:6px;">
    <div style="flex:1;">
      <div style="font-weight:600;">{{ item.title }}</div>
      <div class="price">₹ {{ item.price }}</div>
      <div class="spacer"></div>
      <quantity-counter v-model="localQty" />
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
      <div>Subtotal: <span class="price">₹ {{ item.price * item.qty }}</span></div>
      <button class="btn-outline" @click="$emit('remove', item.id)">Remove</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import QuantityCounter from './QuantityCounter.vue';
import type { CartItem as Item } from '../composables/useCart';

const props = defineProps<{ item: Item }>();
const emit = defineEmits<{ (e:'update:qty', payload:{ id:string; qty:number }):void; (e:'remove', id:string):void }>();

const localQty = ref(props.item.qty);
watch(localQty, (q) => emit('update:qty', { id: props.item.id, qty: q }));
</script>
