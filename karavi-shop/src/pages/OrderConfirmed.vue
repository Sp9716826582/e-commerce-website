<template>
  <div class="container center" style="min-height:60vh;">
    <div class="card" style="padding:24px;max-width:520px;text-align:center;">
      <div style="font-size:24px;font-weight:800;color:var(--primary);">Order confirmed 🎉</div>
      <div class="spacer"></div>
      <div>Order ID: <strong>{{ orderId }}</strong></div>
      <div class="spacer"></div>
      <div>Total paid: <span class="price">₹ {{ amount }}</span></div>
      <div class="spacer"></div>
      <button class="btn" @click="$router.push('/home')">Continue shopping</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const orderId = route.query.id || 'N/A';
const amount = route.query.amount || '0';
</script>
