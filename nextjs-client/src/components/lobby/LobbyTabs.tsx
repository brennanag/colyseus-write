"use client";

import { useState } from "react";
import { OpenGamesTab } from "./OpenGamesTab";
import { JoinViaCodeTab } from "./JoinViaCodeTab";
import { CreateGameTab } from "./CreateGameTab";

export type LobbyTab = "open-games" | "join-code" | "create-game";

interface LobbyTabsProps {
  activeTab: LobbyTab;
  onTabChange: (tab: LobbyTab) => void;
}

export function LobbyTabs({ activeTab, onTabChange }: LobbyTabsProps) {
  const tabs: { id: LobbyTab; label: string }[] = [
    { id: "open-games", label: "Open Games" },
    { id: "join-code", label: "Join Via Code" },
    { id: "create-game", label: "Create Game" },
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}