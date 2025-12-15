<template>
  <div class="container">
    <div class="card" style="max-width:420px;margin:40px auto;padding:20px;">
      <div style="font-size:20px;font-weight:700;color:var(--primary);">Welcome back</div>
      <div style="color:var(--muted);">Sign in to continue</div>
      <div class="spacer"></div>

      <div class="form-row">
        <label>Email</label>
        <input class="input" v-model.trim="email" placeholder="you@example.com" />
        <div class="form-error" v-if="emailError">{{ emailError }}</div>
      </div>

      <div class="form-row">
        <label>Password</label>
        <input class="input" v-model="password" type="password" placeholder="••••••••" />
        <div class="form-error" v-if="passwordError">{{ passwordError }}</div>
      </div>

      <div class="spacer"></div>
      <button class="btn" @click="onSubmit" :disabled="loading">Sign in</button>
      <div class="spacer"></div>
      <div style="font-size:13px;">New here? <router-link to="/signup" class="link">Create an account</router-link></div>
      <div class="spacer"></div>
      <div class="form-error" v-if="submitError">{{ submitError }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter, useRoute } from 'vue-router';

const { signIn } = useAuth();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const loading = ref(false);
const submitError = ref('');

const emailError = computed(() => {
  if (!email.value) return 'Email is required.';
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  return ok ? '' : 'Please enter a valid email.';
});
const passwordError = computed(() => {
  if (!password.value) return 'Password is required.';
  return password.value.length < 6 ? 'Password must be at least 6 characters.' : '';
});

async function onSubmit() {
  submitError.value = '';
  if (emailError.value || passwordError.value) return;
  try {
    loading.value = true;
    await signIn(email.value, password.value);
    const redirect = (route.query.redirect as string) || '/home';
    router.push(redirect);
  } catch (e: any) {
    submitError.value = e.message || 'Sign in failed.';
  } finally {
    loading.value = false;
  }
}
</script>
