import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import router from "./router";

createApp(App).use(router).mount("#app");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1LhjfJ6G5Xg0OFXSfy_AG0XQBYddScrE",
    authDomain: "hellens-yisual-auth.firebaseapp.com",
    projectId: "hellens-yisual-auth",
    storageBucket: "hellens-yisual-auth.appspot.com",
    messagingSenderId: "126521317042",
    appId: "1:126521317042:web:08c05230be746ee461dbab"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export { app };