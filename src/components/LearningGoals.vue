<template>
  <div class="learning-goals">
    <h2>Set Your Learning Goals</h2>
    
    <form @submit.prevent="handleSubmit" class="goals-form">
      <div class="input-group">
        <label for="goalInput">Enter your learning goal:</label>
        <div class="input-wrapper">
          <input
            id="goalInput"
            v-model="goalText"
            type="text"
            placeholder="Type or use voice input..."
            :class="{ 'error': errors.goalText }"
            @input="validateGoal"
          >
          <button 
            type="button" 
            @click="toggleVoiceInput"
            :class="{ 'recording': isRecording }"
          >
            🎤
          </button>
        </div>
        <span class="error-message" v-if="errors.goalText">{{ errors.goalText }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting || Object.keys(errors).length > 0">
        {{ isSubmitting ? 'Saving...' : 'Save Goal' }}
      </button>
    </form>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const authStore = useAuthStore();
const goalText = ref('');
const isRecording = ref(false);
const isSubmitting = ref(false);
const successMessage = ref('');
const errors = reactive({
  goalText: ''
});

let recognition: SpeechRecognition | null = null;

// Initialize speech recognition if supported
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    goalText.value = transcript;
    validateGoal();
    isRecording.value = false;
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isRecording.value = false;
  };
}

const toggleVoiceInput = () => {
  if (!recognition) {
    alert('Speech recognition is not supported in your browser.');
    return;
  }

  if (isRecording.value) {
    recognition.stop();
  } else {
    recognition.start();
  }
  isRecording.value = !isRecording.value;
};

const validateGoal = () => {
  errors.goalText = '';
  
  if (!goalText.value.trim()) {
    errors.goalText = 'Goal text is required';
  } else if (goalText.value.length < 3) {
    errors.goalText = 'Goal must be at least 3 characters long';
  } else if (goalText.value.length > 200) {
    errors.goalText = 'Goal must be less than 200 characters';
  }
};

const handleSubmit = async () => {
  validateGoal();
  if (Object.keys(errors).length > 0) return;

  try {
    isSubmitting.value = true;
    
    if (!authStore.user) {
      throw new Error('You must be logged in to save goals');
    }

    const goalRef = doc(db, 'users', authStore.user.uid, 'goals', new Date().getTime().toString());
    await setDoc(goalRef, {
      text: goalText.value,
      createdAt: serverTimestamp()
    });

    successMessage.value = 'Goal saved successfully!';
    goalText.value = '';

    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errors.goalText = error instanceof Error ? error.message : 'An error occurred while saving your goal';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.learning-goals {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.goals-form {
  margin-top: 20px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-wrapper {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input.error {
  border-color: #dc3545;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #646cff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #535bf2;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button.recording {
  background-color: #dc3545;
}

.error-message {
  display: block;
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
}

.success-message {
  margin-top: 16px;
  padding: 12px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
}
</style>