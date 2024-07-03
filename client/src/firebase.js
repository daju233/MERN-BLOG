// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-54470.firebaseapp.com",
  projectId: "mern-blog-54470",
  storageBucket: "mern-blog-54470.appspot.com",
  messagingSenderId: "137585029682",
  appId: "1:137585029682:web:7169648850b1615a2f822b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
