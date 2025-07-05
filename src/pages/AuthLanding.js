import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthLanding() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome, Adventurer!</h1>
      <p>
        Please{" "}
        <a href="/login" className="underline text-indigo-400">
          login
        </a>{" "}
        to begin your journey.
      </p>
    </div>
  );
}
