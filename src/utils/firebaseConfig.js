import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANG5Iy3Lot9HLuymfAo8xtf-sYYQUSAqM",
  authDomain: "merkato-ed078.firebaseapp.com",
  projectId: "merkato-ed078",
  storageBucket: "merkato-ed078.appspot.com",
  messagingSenderId: "2430167457",
  appId: "1:2430167457:web:2ab96ee7664bcc06d583e0",
  measurementId: "G-9LJM0YLC4C",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const storage = getStorage(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
