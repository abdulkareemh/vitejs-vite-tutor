`<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="displayName">Display Name:</label>
        <input 
          type="text" 
          id="displayName" 
          v-model="displayName" 
          required
        >
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required
        >
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
        >
      </div>
      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Loading...' : 'Sign Up' }}
      </button>
      <button type="button" @click="handleGoogleSignup" :disabled="authStore.loading">
        Sign up with Google
      </button>
    </form>
    <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
    <p>
      Already have an account? 
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const displayName = ref('');

const handleSubmit = async () => {
  await authStore.signup(email.value, password.value, displayName.value);
  if (!authStore.error) {
    router.push('/profile');
  }
};

const handleGoogleSignup = async () => {
  await authStore.loginWithGoogle();
  if (!authStore.error) {
    router.push('/profile');
  }
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  margin-bottom: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>`