import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import Main from '../pages/Main.vue';
import Cart from '../pages/Cart.vue';
import Checkout from '../pages/Checkout.vue';
import OrderConfirmed from '../pages/OrderConfirmed.vue';
import { getCurrentUser } from '../services/mockAuth';

const routes = [
  { path: '/', redirect: '/signin' },
  { path: '/signin', component: SignIn, meta: { public: true } },
  { path: '/signup', component: SignUp, meta: { public: true } },
  { path: '/home', component: Main, meta: { requiresAuth: true } },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/order-confirmed', component: OrderConfirmed, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/signin' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const user = getCurrentUser();
  if (to.meta.requiresAuth && !user) {
    return { path: '/signin', query: { redirect: to.fullPath } };
  }
  if ((to.path === '/signin' || to.path === '/signup') && user) {
    return { path: '/home' };
  }
});

export default router;
