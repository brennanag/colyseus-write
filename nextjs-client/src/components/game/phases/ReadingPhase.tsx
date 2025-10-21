"use client";
import { ChatMessage, Player } from "@/lib/types";

interface ReadingPhaseProps {
  finalStory: string;
  chatMessages: ChatMessage[];
  players: { [sessionId: string]: Player };
  onSendMessage: (message: string) => void;
}

export function ReadingPhase({ finalStory, chatMessages }: ReadingPhaseProps) {
  return (
    <div className="flex space-x-6 items-start h-[600px]">
      {/* Story Display */}
      <div className="flex-2 h-full overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <h1 className="text-xl font-bold">Your Collaborative Story</h1>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4">
              <p className="whitespace-pre-wrap text-gray-900">{finalStory}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 h-full">
        <div className="flex flex-col space-y-4 h-full">
          <h2 className="text-lg font-bold">Group Chat</h2>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1">
            <div className="p-4 h-full">
              <div className="flex flex-col space-y-3 h-full overflow-y-auto">
                {chatMessages.map((message, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        {message.playerName.charAt(0)}
                      </div>
                      <p className="font-bold text-gray-900">
                        {message.playerName}:
                      </p>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                    {index < chatMessages.length - 1 && (
                      <hr className="my-2 border-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
