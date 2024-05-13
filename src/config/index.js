// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8zQiX8v8xTIUVEfnGeXqBkY2UfJIAJIo",
  authDomain: "projeto-residencia-iii.firebaseapp.com",
  projectId: "projeto-residencia-iii",
  storageBucket: "projeto-residencia-iii.appspot.com",
  messagingSenderId: "84972689817",
  appId: "1:84972689817:web:840ee5213fe12dad479b08"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();