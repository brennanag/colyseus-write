"use client";
import { useState } from "react"; // ADD THIS IMPORT
import { WritingGameState, Player } from "@/schema/WritingGameState";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"; // ADD THIS IMPORT

interface WritingPhaseProps {
  gameState: WritingGameState;
  currentPlayer: Player | null | undefined;
  writingText: string;
  onWritingUpdate: (content: string) => void;
  onSubmitWriting: () => void;
  formatTime: (ms: number) => string;
}

export function WritingPhase({
  gameState,
  currentPlayer,
  writingText,
  onWritingUpdate,
  onSubmitWriting,
  formatTime,
}: WritingPhaseProps) {
  const assignedStoryId = gameState.currentAssignments?.get(
    currentPlayer?.playerId || ""
  );
  const assignedStory = gameState.stories?.get(assignedStoryId || "");

  //debug story number not showing up
  console.log("=== DEBUG WritingPhase ===");
  console.log("currentPlayer:", currentPlayer);
  console.log("currentPlayer ID:", currentPlayer?.playerId);
  console.log(
    "currentAssignments:",
    Array.from(gameState.currentAssignments?.entries() || [])
  );
  console.log("assignedStoryId:", assignedStoryId);
  console.log("all stories:", Array.from(gameState.stories?.keys() || []));

  return (
    <div className=" card">
      <p className="text-base mb-2 text-gray-200">
        Continuing:{" "}
        <strong>
          {(() => {
            if (!assignedStoryId) return "Story ?";

            const storyNum = parseInt(assignedStoryId.replace("story_", ""));
            return isNaN(storyNum) ? "Story ?" : `Story ${storyNum + 1}`;
          })()}
        </strong>
      </p>

      {/* Show accumulated story so far */}
      {assignedStory?.accumulatedContent && (
        <div className="mb-4">
          <p className="text-sm  mb-2 ">The story so far:</p>
          <div
            className="p-4 rounded-md text-base leading-relaxed bg-white border border-gray-200 prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: assignedStory.accumulatedContent || "",
            }}
          />
        </div>
      )}

      <p className="text-sm text-gray-600 mb-4">
        Time remaining: {formatTime(gameState.timeRemaining)} seconds
        {currentPlayer?.hasSubmitted && " • ✓ Submitted"}
      </p>

      <SimpleEditor
        initialContent={writingText}
        onUpdate={onWritingUpdate} // Use the prop function directly
        editable={!currentPlayer?.hasSubmitted}
      />

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          {writingText.replace(/<[^>]*>/g, "").length} characters
        </p>
        <button
          onClick={onSubmitWriting}
          disabled={!writingText.trim() || currentPlayer?.hasSubmitted}
          className={`px-4 py-2 rounded-md ${
            !writingText.trim() || currentPlayer?.hasSubmitted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white transition-colors`}
        >
          {currentPlayer?.hasSubmitted ? "✓ Submitted" : "Submit Continuation"}
        </button>
      </div>
    </div>
  );
}
