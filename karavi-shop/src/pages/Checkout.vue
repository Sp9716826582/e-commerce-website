<template>
  <div class="container">
    <div class="section">
      <div style="font-size:18px;font-weight:700;">Checkout</div>
    </div>

    <div class="grid" style="grid-template-columns: 2fr 1fr; gap:16px;">
      <div class="card" style="padding:16px;">
        <div style="font-weight:600;">Shipping details</div>
        <div class="spacer"></div>
        <div class="form-row">
          <label>Full name</label>
          <input class="input" v-model.trim="name" />
          <div class="form-error" v-if="nameError">{{ nameError }}</div>
        </div>
        <div class="form-row">
          <label>Phone</label>
          <input class="input" v-model.trim="phone" />
          <div class="form-error" v-if="phoneError">{{ phoneError }}</div>
        </div>
        <div class="form-row">
          <label>Address</label>
          <input class="input" v-model.trim="address" />
          <div class="form-error" v-if="addressError">{{ addressError }}</div>
        </div>
        <div class="form-row">
          <label>Pincode</label>
          <input class="input" v-model.trim="pincode" />
          <div class="form-error" v-if="pincodeError">{{ pincodeError }}</div>
        </div>

        <div class="spacer"></div>
        <div style="font-weight:600;">Payment</div>
        <div class="spacer"></div>
        <div class="form-row">
          <label>Card number</label>
          <input class="input" v-model.trim="card" placeholder="4111 1111 1111 1111" />
          <div class="form-error" v-if="cardError">{{ cardError }}</div>
        </div>
        <div class="form-row" style="grid-template-columns: 1fr 1fr;">
          <div>
            <label>Expiry (MM/YY)</label>
            <input class="input" v-model.trim="expiry" placeholder="12/29" />
            <div class="form-error" v-if="expiryError">{{ expiryError }}</div>
          </div>
          <div>
            <label>CVV</label>
            <input class="input" v-model.trim="cvv" placeholder="123" />
            <div class="form-error" v-if="cvvError">{{ cvvError }}</div>
          </div>
        </div>
        <div class="spacer"></div>
        <button class="btn" :disabled="!valid || !cart.length" @click="placeOrder">Place order</button>
        <div class="form-error" v-if="submitError">{{ submitError }}</div>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-weight:600;">Order summary</div>
        <div class="spacer"></div>
        <div v-for="item in cart" :key="item.id" style="display:flex;justify-content:space-between;">
          <div>{{ item.title }} × {{ item.qty }}</div>
          <div class="price">₹ {{ item.price * item.qty }}</div>
        </div>
        <div class="spacer"></div>
        <div style="display:flex;justify-content:space-between;font-weight:700;">
          <div>Total</div><div class="price">₹ {{ total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCart } from '../composables/useCart';
import { useRouter } from 'vue-router';

const router = useRouter();
const { cart, total, clear } = useCart();

const name = ref('');
const phone = ref('');
const address = ref('');
const pincode = ref('');
const card = ref('');
const expiry = ref('');
const cvv = ref('');
const submitError = ref('');

const nameError = computed(() => !name.value ? 'Name is required.' : '');
const phoneError = computed(() => /^\d{10}$/.test(phone.value) ? '' : 'Enter valid 10-digit phone.');
const addressError = computed(() => !address.value ? 'Address is required.' : '');
const pincodeError = computed(() => /^\d{6}$/.test(pincode.value) ? '' : 'Enter valid 6-digit pincode.');
const cardError = computed(() => /^\d{16}$/.test(card.value.replace(/\s+/g,'')) ? '' : 'Enter 16-digit card number.');
const expiryError = computed(() => /^\d{2}\/\d{2}$/.test(expiry.value) ? '' : 'Enter MM/YY.');
const cvvError = computed(() => /^\d{3}$/.test(cvv.value) ? '' : 'Enter 3-digit CVV.');

const valid = computed(() =>
  !nameError.value && !phoneError.value && !addressError.value && !pincodeError.value &&
  !cardError.value && !expiryError.value && !cvvError.value
);

function placeOrder() {
  if (!valid.value) {
    submitError.value = 'Please fix the errors above.';
    return;
  }
  // Mock "processing"
  setTimeout(() => {
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const amt = total.value;
    clear();
    router.push({ path: '/order-confirmed', query: { id: orderId, amount: amt.toString() } });
  }, 500);
}
</script>
