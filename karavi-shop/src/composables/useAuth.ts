import { ref } from 'vue';
import { getCurrentUser, signIn as svcSignIn, signUp as svcSignUp, signOut as svcSignOut } from '../services/mockAuth';

const userRef = ref(getCurrentUser());

export function useAuth() {
  async function signIn(email: string, password: string) {
    const u = svcSignIn(email, password);
    userRef.value = u;
    return u;
  }
  async function signUp(name: string, email: string, password: string) {
    const u = svcSignUp(name, email, password);
    userRef.value = u;
    return u;
  }
  function signOut() {
    svcSignOut();
    userRef.value = null;
  }
  return { user: userRef, signIn, signUp, signOut };
}
