import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGkQsGEA3s1nMJ6KBGBiKTfjQKuSZ8cSo",
  authDomain: "chatgpt-example-6efc8.firebaseapp.com",
  projectId: "chatgpt-example-6efc8",
  storageBucket: "chatgpt-example-6efc8.appspot.com",
  messagingSenderId: "271548355006",
  appId: "1:271548355006:web:3d9ece54b980d46ba929ef",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
