// config.js
// This file initializes and exports the Firebase configuration for the app.
// It sets up Firebase services like Firestore and Storage for use in other components.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with YOUR actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAdDjeHiulnbd2VcUi4h4Vo7DcZrKVqsMU",
  authDomain: "sit313-task-8-1d-b4710.firebaseapp.com",
  projectId: "sit313-task-8-1d-b4710",
  storageBucket: "sit313-task-8-1d-b4710.firebasestorage.app",
  messagingSenderId: "228515304155",
  appId: "1:228515304155:web:2b9826f5a72c9a79e072fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database only
export const db = getFirestore(app);

export default app;