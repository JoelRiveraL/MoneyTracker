//firebaseConfig.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDV10po-zbQpeTgBkyxwNmpeTKDtX4JOio",
    authDomain: "money-tracer-a3726.firebaseapp.com",
    projectId: "money-tracer-a3726",
    storageBucket: "money-tracer-a3726.appspot.com",
    messagingSenderId: "449497660440",
    appId: "1:449497660440:web:befd097ef572c296b8976d",
    measurementId: "G-H93KTBZC91"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDataBase = getDatabase(app);
