// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOYjXjaudf2jIn88nUKGmivRwbplrt0zg",
  authDomain: "finance-tracker-one.firebaseapp.com",
  projectId: "finance-tracker-one",
  storageBucket: "finance-tracker-one.firebasestorage.app",
  messagingSenderId: "39013777078",
  appId: "1:39013777078:web:98de2dec9f249cb310f017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };