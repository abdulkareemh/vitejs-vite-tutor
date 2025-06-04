import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '../firebase/config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import type { User } from 'firebase/auth';

interface CurriculumWeek {
  title: string;
  description: string;
  tasks: string[];
  resources: string[];
}

interface Curriculum {
  weeks: CurriculumWeek[];
  generatedAt: Date;
}

export const useCurriculumStore = defineStore('curriculum', () => {
  const curriculum = ref<Curriculum | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

  const subscribeToCurriculum = (user: User) => {
    if (unsubscribe) {
      unsubscribe();
    }

    const curriculumRef = doc(db, 'users', user.uid, 'curriculum', 'current');
    unsubscribe = onSnapshot(curriculumRef, (doc) => {
      if (doc.exists()) {
        curriculum.value = {
          ...doc.data() as Curriculum,
          generatedAt: doc.data().generatedAt.toDate()
        };
      } else {
        curriculum.value = null;
      }
    }, (err) => {
      error.value = err.message;
    });
  };

  const unsubscribeFromCurriculum = () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  };

  return {
    curriculum,
    loading,
    error,
    subscribeToCurriculum,
    unsubscribeFromCurriculum
  };
});