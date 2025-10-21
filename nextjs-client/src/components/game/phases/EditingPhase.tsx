"use client";
import { useState } from "react";
import { WritingContribution } from "@/lib/types";

interface EditingPhaseProps {
  currentStory: string;
  contributions: WritingContribution[];
  onSaveEdit: (editedStory: string) => void;
}

export function EditingPhase({
  currentStory,
  contributions,
  onSaveEdit,
}: EditingPhaseProps) {
  const [editedContent, setEditedContent] = useState(currentStory);

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Editing & Review Phase</h1>
        <p className="text-gray-700">
          Collaboratively refine the story together
        </p>

        <div className="flex space-x-4 overflow-x-auto py-2">
          {contributions.map((contribution, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm min-w-[200px] flex-shrink-0"
            >
              <div className="p-4">
                <div className="flex flex-col space-y-2 items-start">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Round {contribution.round}
                  </span>
                  <p className="font-bold text-gray-900">
                    {contribution.playerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {contribution.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="font-bold mb-2 text-gray-900">Current Story:</p>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full min-h-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="The collaborative story will appear here..."
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">All players can suggest edits</p>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            onClick={() => onSaveEdit(editedContent)}
          >
            Save Edits
          </button>
        </div>
      </div>
    </div>
  );
}
