`<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
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
        {{ authStore.loading ? 'Loading...' : 'Login' }}
      </button>
      <button type="button" @click="handleGoogleLogin" :disabled="authStore.loading">
        Login with Google
      </button>
    </form>
    <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
    <p>
      Don't have an account? 
      <router-link to="/signup">Sign up</router-link>
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

const handleSubmit = async () => {
  await authStore.loginWithEmail(email.value, password.value);
  if (!authStore.error) {
    router.push('/profile');
  }
};

const handleGoogleLogin = async () => {
  await authStore.loginWithGoogle();
  if (!authStore.error) {
    router.push('/profile');
  }
};
</script>

<style scoped>
.login {
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