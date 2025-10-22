"use client";

import { WritingGameState, Player } from "../../../schema/WritingGameState";
import { SimpleEditor } from "../../tiptap-templates/simple/simple-editor";
import { useGame } from "../../../contexts/GameContext";

// Props are now minimal - most data comes from GameContext
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
  const { isSubmitting } = useGame();

  const assignedStoryId = gameState.currentAssignments?.get(
    currentPlayer?.playerId || ""
  );
  const assignedStory = gameState.stories?.get(assignedStoryId || "");

  // Calculate story number for display
  const getStoryNumber = (): string => {
    if (!assignedStoryId) return "Story ?";
    const storyNum = parseInt(assignedStoryId.replace("story_", ""));
    return isNaN(storyNum) ? "Story ?" : `Story ${storyNum + 1}`;
  };

  return (
    <div className="card">
      {/* Story Header */}
      <div className="mb-6">
        <p className="text-base mb-2 text-gray-200">
          Continuing: <strong>{getStoryNumber()}</strong>
        </p>

        {/* Show accumulated story content */}
        {assignedStory?.accumulatedContent && (
          <div className="mb-4">
            <p className="text-sm mb-2">The story so far:</p>
            <div
              className="p-4 rounded-md text-base leading-relaxed bg-white border border-gray-200 prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: assignedStory.accumulatedContent || "",
              }}
            />
          </div>
        )}
      </div>

      {/* Timer and Status */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Time remaining: {formatTime(gameState.timeRemaining)} seconds
          {currentPlayer?.hasSubmitted && " • ✓ Submitted"}
        </p>
      </div>

      {/* Writing Editor */}
      <SimpleEditor
        initialContent={writingText}
        onUpdate={onWritingUpdate}
        editable={!currentPlayer?.hasSubmitted && !isSubmitting}
      />

      {/* Submission Controls */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          {writingText.replace(/<[^>]*>/g, "").length} characters
        </p>
        <button
          onClick={onSubmitWriting}
          disabled={
            !writingText.trim() || currentPlayer?.hasSubmitted || isSubmitting
          }
          className={`px-4 py-2 rounded-md font-medium ${
            !writingText.trim() || currentPlayer?.hasSubmitted || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white transition-colors`}
        >
          {isSubmitting
            ? "Submitting..."
            : currentPlayer?.hasSubmitted
            ? "✓ Submitted"
            : "Submit Continuation"}
        </button>
      </div>
    </div>
  );
}
