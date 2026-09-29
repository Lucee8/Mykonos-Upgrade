import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: "AIzaSyCa1hA73-VPw9oBa1o0p4CHZub_aDMk4Yk",
  authDomain: "mykonos-7cace.firebaseapp.com",
  projectId: "mykonos-7cace",
  storageBucket: "mykonos-7cace.firebasestorage.app",
  messagingSenderId: "136820706300",
  appId: "1:136820706300:web:966f3945ff31754dcec079",
  measurementId: "G-E1VCLJ2HB2",
};

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.warn('Firebase Analytics not supported in this environment:', err);
    });
}

export const ADMIN_EMAIL = 'samikshakoyande5@gmail.com';
