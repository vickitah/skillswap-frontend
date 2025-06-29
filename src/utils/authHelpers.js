// src/utils/authHelpers.js
import { auth } from "../firebase";

// Wait for Firebase auth to be ready (resolves current user)
export const waitForAuthReady = () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // stop listening once we get the user
      resolve(user);
    });
  });
};

