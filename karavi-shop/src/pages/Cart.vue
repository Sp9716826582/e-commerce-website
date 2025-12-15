<template>
  <div class="container">
    <div class="section">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="font-size:18px; font-weight:700;">Your Cart</div>
        <button v-if="cart.length" class="btn-outline" @click="clear">Clear cart</button>
      </div>
    </div>
    <div class="section grid grid-3">
      <cart-item
        v-for="item in cart"
        :key="item.id"
        :item="item"
        @update:qty="({ id, qty }) => setQty(id, qty)"
        @remove="remove"
      />
    </div>
    <div class="section card" style="padding:20px;">
      <div style="display:flex;justify-content:space-between;">
        <div>Total</div>
        <div class="price">₹ {{ total }}</div>
      </div>
      <div class="spacer"></div>
      <button class="btn" :disabled="!cart.length" @click="$router.push('/checkout')">Proceed to checkout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart';
import CartItem from '../components/CartItem.vue';

const { cart, setQty, remove, clear, total } = useCart();
</script>
