import React from "react";
import { getAuth } from "firebase/auth";

const TestToken = () => {
  const handleClick = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      console.log("Firebase ID Token:", token);
      alert("Token logged to console!");
    } else {
      alert("No user signed in");
    }
  };

  return <button onClick={handleClick}>Get Firebase Token</button>;
};

export default TestToken;
