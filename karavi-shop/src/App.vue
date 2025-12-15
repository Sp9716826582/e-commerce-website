<template>
  <div>
    <header class="header">
      <div class="header-inner">
        <router-link to="/home" class="brand">ShopKart</router-link>
        <div class="search-bar">
          <input
            class="input"
            placeholder="Search for products, brands and more"
            v-model="search"
            @keydown.enter="goHome"
          />
          <button class="btn" @click="goHome">Search</button>
        </div>
        <nav class="nav">
          <router-link class="link" to="/cart">
            Cart <span class="badge">{{ cartCount }}</span>
          </router-link>
          <span v-if="user" class="badge">{{ user.name }}</span>
          <button v-if="user" class="btn-outline" @click="logout">Logout</button>
          <router-link v-else class="link" to="/signin">Sign in</router-link>
        </nav>
      </div>
    </header>
    <router-view :searchQuery="search" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCart } from './composables/useCart';
import { useAuth } from './composables/useAuth';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const search = ref(route.query.q?.toString() || '');

const { cart } = useCart();
const cartCount = computed(() => cart.value.reduce((sum, i) => sum + i.qty, 0));

const { user, signOut } = useAuth();

function goHome() {
  router.push({ path: '/home', query: { q: search.value } });
}
function logout() {
  signOut();
  router.push('/signin');
}
watch(
  () => route.query.q,
  (q) => {
    if (typeof q === 'string') search.value = q;
  }
);
</script>

<style scoped>
</style>

