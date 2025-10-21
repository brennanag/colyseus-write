"use client";
import { useState } from "react";
import { Player, SetupStage } from "@/lib/types";

interface GameSetupPhaseProps {
  currentStage: SetupStage;
  onStageComplete: (stage: SetupStage, data: any) => void;
  players: { [sessionId: string]: Player };
}

export function GameSetupPhase({
  currentStage,
  onStageComplete,
}: GameSetupPhaseProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const genres = [
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Romance",
    "Horror",
    "Contemporary",
  ];
  const themes = [
    "Redemption",
    "Discovery",
    "Transformation",
    "Sacrifice",
    "Justice",
    "Love",
  ];

  const renderGenreSelection = () => (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Choose a Genre</h2>
      <div className="grid grid-cols-2 gap-4 w-full">
        {genres.map((genre) => (
          <div
            key={genre}
            className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${
              selectedGenre === genre
                ? "bg-blue-100 border-blue-500 shadow-sm"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            <p className="font-bold text-gray-900">{genre}</p>
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={!selectedGenre}
        onClick={() =>
          onStageComplete("genre_selection", { genre: selectedGenre })
        }
      >
        Confirm Genre
      </button>
    </div>
  );

  const renderThemeVoting = () => (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Vote for Themes (Select 2-3)</h2>
      <div className="grid grid-cols-2 gap-2 w-full">
        {themes.map((theme) => (
          <span
            key={theme}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              selectedThemes.includes(theme)
                ? "bg-blue-100 text-blue-800 border border-blue-300"
                : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
            }`}
            onClick={() => {
              setSelectedThemes((prev) =>
                prev.includes(theme)
                  ? prev.filter((t) => t !== theme)
                  : [...prev, theme]
              );
            }}
          >
            {theme}
          </span>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={selectedThemes.length < 2}
        onClick={() =>
          onStageComplete("theme_voting", { themes: selectedThemes })
        }
      >
        Confirm Themes
      </button>
    </div>
  );

  const getStageProgress = (): number => {
    const stages: SetupStage[] = [
      "genre_selection",
      "theme_voting",
      "character_creation",
      "setting_establishment",
    ];
    return (stages.indexOf(currentStage) / stages.length) * 100;
  };

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Game Setup</h1>
        <p className="text-gray-700">
          Let's build the foundation of your story together
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getStageProgress()}%` }}
          ></div>
        </div>

        <div className="w-full">
          {currentStage === "genre_selection" && renderGenreSelection()}
          {currentStage === "theme_voting" && renderThemeVoting()}
          {currentStage === "character_creation" && (
            <p className="text-gray-700">
              Character Creation Stage - To be implemented
            </p>
          )}
          {currentStage === "setting_establishment" && (
            <p className="text-gray-700">
              Setting Establishment Stage - To be implemented
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
