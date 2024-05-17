import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD8zQiX8v8xTIUVEfnGeXqBkY2UfJIAJIo",
  authDomain: "projeto-residencia-iii.firebaseapp.com",
  projectId: "projeto-residencia-iii",
  storageBucket: "projeto-residencia-iii.appspot.com",
  messagingSenderId: "84972689817",
  appId: "1:84972689817:web:840ee5213fe12dad479b08"
};


initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore();