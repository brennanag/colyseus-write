"use client";

import { WritingGameState, Player } from "@/schema/WritingGameState";

interface ReadingPhaseProps {
  gameState: WritingGameState;
  currentPlayer: Player | null | undefined;
  onBackToLobby: () => void; // Changed from onNextRound
}

export function ReadingPhase({
  gameState,
  currentPlayer,
  onBackToLobby,
}: ReadingPhaseProps) {
  return (
    <div className="--bg-primary p-4 rounded-lg border --border-color">
      <h3 className="text-xl font-normal mb-2 --text-secondary">
        Read the Completed Stories
      </h3>

      <div className="flex flex-col gap-6 mb-6">
        {Array.from(gameState.stories?.entries() || []).map(
          ([storyId, story]: [string, any], index: number) => (
            <div
              key={storyId}
              className="--bg-secondary p-4 rounded-lg shadow-sm border --border-color"
            >
              <p className="font-light mb-2 text-base --text-secondary">
                Story {index + 1} Prompt: "{story.originalPrompt}"
              </p>
              <div
                className="p-4 rounded-md text-base leading-relaxed --bg-secondary prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: story.accumulatedContent || "",
                }}
              />
              <hr className="my-4 --border-color" />
            </div>
          )
        )}
      </div>

      <div className="text-center">
        <p className="mb-4 --text-secondary">
          {currentPlayer?.isReady
            ? "✓ Waiting for other players to be ready"
            : "Click when you're ready for a new game"}
        </p>
        <button
          onClick={onBackToLobby}
          className={`px-6 py-3 rounded-lg text-lg ${
            currentPlayer?.isReady
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white transition-colors`}
        >
          {currentPlayer?.isReady
            ? "✓ Ready for New Game"
            : "Ready for New Game"}
        </button>
      </div>
    </div>
  );
}
