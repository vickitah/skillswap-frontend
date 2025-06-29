import { useState, useEffect } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setIsSignup(mode === "signup");
  }, [mode]);

  const callProtectedRoute = async (jwt) => {
    try {
      const res = await fetch("http://localhost:5000/api/protected", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const data = await res.json();
      console.log("🔐 Protected route response:", data);
    } catch (err) {
      console.error("❌ Failed to call protected route:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, email: data.email })
      );

      onLogin?.(data.name);
      await callProtectedRoute(data.token);
      navigate("/feed");
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Try again.");
    }
  };

  const handleFormAuth = async () => {
    try {
      let userCredential;

      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      }

      const idToken = await userCredential.user.getIdToken();
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, email: data.email })
      );

      onLogin?.(data.name);
      await callProtectedRoute(data.token);
      navigate("/feed");
    } catch (err) {
      console.error("Form login/signup error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email already exists. Try logging in.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Wrong email or password.");
      } else {
        setError(isSignup ? "Sign-up failed." : "Login failed.");
      }
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          {isSignup ? "Join SkillSwap" : "Login to SkillSwap"}
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={formData.password}
          />
          <button
            onClick={handleFormAuth}
            className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-semibold transition"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>or</span>
            <button
              onClick={handleGoogleLogin}
              className="text-blue-600 underline hover:text-blue-800"
            >
              Continue with Google
            </button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-3">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              className="text-indigo-600 font-medium underline"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
            >
              {isSignup ? "Login here" : "Sign up"}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2 transition">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
