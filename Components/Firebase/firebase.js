// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFXYaV30g2fzdrfRZvmoSpnivrwfOKbkk",
  authDomain: "taraenca.firebaseapp.com",
  projectId: "taraenca",
  storageBucket: "taraenca.appspot.com",
  messagingSenderId: "904229380955",
  appId: "1:904229380955:web:2201ec3787723d0a79307e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
const provider = new GoogleAuthProvider();
const auth = getAuth();


//exports
export { auth, provider }
export const db = getDatabase(app)
