import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2SZj3VZhpQuStGNhfEXUDPWQPlB423AI",
  authDomain: "notion-clone-979d1.firebaseapp.com",
  projectId: "notion-clone-979d1",
  storageBucket: "notion-clone-979d1.firebasestorage.app",
  messagingSenderId: "259439210340",
  appId: "1:259439210340:web:781900402f1db1251a9471",
  measurementId: "G-6VZJ6GRYRS"
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };