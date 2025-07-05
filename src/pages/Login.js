import React from "react";
import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login Success:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to OBSIDIA</h1>

        {!user && (
          <button
            onClick={handleGoogleSignIn}
            className="bg-indigo-600 px-6 py-3 text-lg rounded-lg hover:bg-indigo-700 transition"
          >
            Sign in with Google
          </button>
        )}

        {user && (
          <p className="text-green-400 text-lg">You are already logged in!</p>
        )}
      </div>
    </div>
  );
}
