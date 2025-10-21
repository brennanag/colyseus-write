"use client";
import { useState } from "react";
import { useAutoSave } from "../../../hooks/useAutoSave"; // Add this import

interface WritingPhaseProps {
  currentRound: number;
  totalRounds: number;
  prompt: string;
  timeRemaining: number;
  onSubmitWriting: (content: string) => void;
  roomId: string; // Add this prop
  playerId: string; // Add this prop
  roundNumber: number; // Add this prop
}

export function WritingPhase({
  currentRound,
  totalRounds,
  prompt,
  timeRemaining,
  onSubmitWriting,
  roomId, // Add this
  playerId, // Add this
  roundNumber, // Add this
}: WritingPhaseProps) {
  const [writingContent, setWritingContent] = useState("");

  const handleSubmit = async () => {
    if (writingContent.trim().length > 0) {
      // Add final save before submit
      await manualSave();
      onSubmitWriting(writingContent.trim());
      setWritingContent("");
    }
  };

  // Rest of your existing component remains exactly the same
  return (
    <div>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Writing Phase</h1>

        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Round {currentRound} of {totalRounds}
          </span>
          <p className="text-sm text-gray-500">Time: {timeRemaining}s</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentRound / totalRounds) * 100}%` }}
          ></div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-bold mb-2 text-gray-900">Writing Prompt:</p>
          <p className="text-gray-700">{prompt}</p>
        </div>

        <textarea
          value={writingContent}
          onChange={(e) => setWritingContent(e.target.value)}
          placeholder="Write your contribution to the story..."
          className="min-h-[200px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        />

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
          onClick={handleSubmit}
          disabled={writingContent.trim().length === 0}
        >
          Submit Your Writing
        </button>

        <p className="text-sm text-gray-500 text-center">
          Each player contributes to build the story together
        </p>
      </div>
    </div>
  );
}
