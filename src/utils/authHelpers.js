// src/utils/authHelpers.js
import { auth } from "../firebase";

// Wait for Firebase auth to be ready (resolves current user)
export const waitForAuthReady = (timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Auth timeout")), timeout);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      clearTimeout(timer);
      unsubscribe();
      resolve(user);
    });
  });
};


