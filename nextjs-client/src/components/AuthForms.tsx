"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "login") {
      login(email, password);
    } else {
      signup(email, password, name);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border border-gray-600 rounded-lg bg-gray-800">
      {/* Tab buttons */}
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 ${
            activeTab === "login" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "signup" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === "signup" && (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          {activeTab === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
