<template>
  <div class="container">
    <div class="card" style="max-width:520px;margin:40px auto;padding:20px;">
      <div style="font-size:20px;font-weight:700;color:var(--primary);">Create account</div>
      <div style="color:var(--muted);">Sign up to start shopping</div>
      <div class="spacer"></div>

      <div class="form-row">
        <label>Full name</label>
        <input class="input" v-model.trim="name" placeholder="Your name" />
        <div class="form-error" v-if="nameError">{{ nameError }}</div>
      </div>

      <div class="form-row">
        <label>Email</label>
        <input class="input" v-model.trim="email" placeholder="you@example.com" />
        <div class="form-error" v-if="emailError">{{ emailError }}</div>
      </div>

      <div class="form-row">
        <label>Password</label>
        <input class="input" v-model="password" type="password" placeholder="At least 6 characters" />
        <div class="form-error" v-if="passwordError">{{ passwordError }}</div>
      </div>

      <div class="form-row">
        <label>Confirm password</label>
        <input class="input" v-model="confirm" type="password" placeholder="Re-enter password" />
        <div class="form-error" v-if="confirmError">{{ confirmError }}</div>
      </div>

      <div class="spacer"></div>
      <button class="btn" @click="onSubmit" :disabled="loading">Sign up</button>
      <div class="spacer"></div>
      <div style="font-size:13px;">Already have an account? <router-link to="/signin" class="link">Sign in</router-link></div>
      <div class="spacer"></div>
      <div class="form-error" v-if="submitError">{{ submitError }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const { signUp } = useAuth();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');
const loading = ref(false);
const submitError = ref('');

const nameError = computed(() => !name.value ? 'Name is required.' : '');
const emailError = computed(() => {
  if (!email.value) return 'Email is required.';
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  return ok ? '' : 'Please enter a valid email.';
});
const passwordError = computed(() => {
  if (!password.value) return 'Password is required.';
  return password.value.length < 6 ? 'Password must be at least 6 characters.' : '';
});
const confirmError = computed(() => confirm.value !== password.value ? 'Passwords do not match.' : '');

async function onSubmit() {
  submitError.value = '';
  if (nameError.value || emailError.value || passwordError.value || confirmError.value) return;
  try {
    loading.value = true;
    await signUp(name.value, email.value, password.value);
    router.push('/home');
  } catch (e: any) {
    submitError.value = e.message || 'Sign up failed.';
  } finally {
    loading.value = false;
  }
}
</script>
