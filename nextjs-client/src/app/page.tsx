"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthForms from "../components/AuthForms";

export default function Home() {
  const { user, logout } = useAuth();

  if (!user) {
    return <AuthForms />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {user.name || user.email}!
            </h1>
            <p className="text-gray-400">Collaborative Writing Game</p>
          </div>
          <button
            onClick={() => logout()}
            className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800"
          >
            Logout
          </button>
        </div>

        {/* Temporary placeholder */}
        <div className="text-center py-16">
          <h2 className="text-xl mb-4">Game temporarily unavailable</h2>
          <p className="text-gray-400 mb-6">
            We're updating the interface. Please check back soon.
          </p>
          <button className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700">
            Check Status
          </button>
        </div>
      </div>
    </div>
  );
}
