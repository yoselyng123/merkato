import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQONy8NcJa3EeEXOZywbUm8OSnUHHwhbg",
  authDomain: "merkatonew.firebaseapp.com",
  databaseURL: "https://merkatonew-default-rtdb.firebaseio.com",
  projectId: "merkatonew",
  storageBucket: "merkatonew.appspot.com",
  messagingSenderId: "1053078180899",
  appId: "1:1053078180899:web:4ea06484f12e1223138d96",
  measurementId: "G-7YV1W1H958"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const storage = getStorage(firebaseApp);

const firebaseExports = { db, auth, storage };

export default firebaseExports;
