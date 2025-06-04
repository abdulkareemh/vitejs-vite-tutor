`<template>
  <div class="profile">
    <h2>Profile</h2>
    <div v-if="authStore.user" class="profile-info">
      <img 
        v-if="authStore.user.photoURL" 
        :src="authStore.user.photoURL" 
        alt="Profile picture"
        class="profile-picture"
      >
      <div class="user-details">
        <p><strong>Display Name:</strong> {{ authStore.user.displayName }}</p>
        <p><strong>Email:</strong> {{ authStore.user.email }}</p>
      </div>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-info {
  text-align: center;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.user-details {
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
}
</style>`