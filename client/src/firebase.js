// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hostify-ffccd.firebaseapp.com",
  projectId: "hostify-ffccd",
  storageBucket: "hostify-ffccd.appspot.com",
  messagingSenderId: "788850881699",
  appId: "1:788850881699:web:ebcb622e82923a37523b16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);