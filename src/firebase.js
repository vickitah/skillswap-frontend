// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDs3ic6p3-u5vZKLOzDDYvms1RI21eE6IM",
  authDomain: "skillswap-de631.firebaseapp.com",
  projectId: "skillswap-de631",
  storageBucket: "skillswap-de631.firebasestorage.app",
  messagingSenderId: "961691748205",
  appId: "1:961691748205:web:7fec96b6bae2cb021ebc64"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
};
