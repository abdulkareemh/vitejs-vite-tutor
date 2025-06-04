<template>
  <div class="home">
    <h1>Welcome</h1>
    <div v-if="authStore.user">
      <p>Welcome back, {{ authStore.user.displayName || authStore.user.email }}!</p>
      <LearningGoals />
      <router-link to="/profile" class="profile-link">View Profile</router-link>
    </div>
    <div v-else>
      <p>Please log in to access your profile</p>
      <div class="auth-links">
        <router-link to="/login" class="auth-link">Login</router-link>
        <router-link to="/signup" class="auth-link">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import LearningGoals from '../components/LearningGoals.vue';

const authStore = useAuthStore();
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.auth-links {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.auth-link {
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #646cff;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.auth-link:hover {
  background-color: #535bf2;
}

.profile-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.profile-link:hover {
  background-color: #3aa876;
}
</style>