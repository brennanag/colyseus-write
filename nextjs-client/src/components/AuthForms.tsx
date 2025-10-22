"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 card shadow-sm">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "login"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "register"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("register")}
        >
          Register
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "login" && (
          <div>
            <LoginForm onSuccess={() => console.log("Login successful!")} />
          </div>
        )}
        {activeTab === "register" && (
          <div>
            <RegisterForm
              onSuccess={() => {
                console.log("Registration successful!");
                setActiveTab("login");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
