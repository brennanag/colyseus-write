"use client";

import { useState, useEffect } from "react";
import { useRoom } from "../../contexts/RoomContext";

interface StoryData {
  id: string;
  prompt: string;
  accumulatedContent: string;
  editHistory: any[];
  orderIndex: number;
}

interface StoriesData {
  currentlyReading: StoryData[];
  storyShelf: StoryData[];
}

export function ReadingView() {
  const { currentRoom } = useRoom();
  const [storiesData, setStoriesData] = useState<StoriesData | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentRoom) return;

    // Listen for stories data from server
    currentRoom.onMessage("storiesData", (data: StoriesData) => {
      setStoriesData(data);
      setLoading(false);
      setError(null);
    });

    currentRoom.onMessage("storyHistory", (data: any) => {
      setSelectedStory(data.story);
      setLoading(false);
    });

    currentRoom.onMessage("error", (message: any) => {
      setError(message.message);
      setLoading(false);
    });

    // Request initial stories data
    currentRoom.send("requestStories");

    return () => {
      // Cleanup message listeners
      currentRoom.onMessage("storiesData", () => {});
      currentRoom.onMessage("storyHistory", () => {});
      currentRoom.onMessage("error", () => {});
    };
  }, [currentRoom]);

  const handleViewStory = (story: StoryData) => {
    setLoading(true);
    currentRoom?.send("requestStoryHistory", { storyId: story.id });
  };

  const handleBackToList = () => {
    setSelectedStory(null);
    currentRoom?.send("requestStories");
  };

  if (loading) {
    return (
      <div className="card text-center py-12">
        <div className="text-lg --text-secondary">Loading stories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center py-12">
        <div className="text-lg text-red-600">Error: {error}</div>
        <button
          onClick={() => currentRoom?.send("requestStories")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedStory) {
    return <StoryDetailView story={selectedStory} onBack={handleBackToList} />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold --text-secondary mb-4">
          Reading Room
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Read stories from your recent writing sessions and explore your
          creative archive.
        </p>
      </div>

      {/* Currently Reading Section */}
      {storiesData?.currentlyReading &&
        storiesData.currentlyReading.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-semibold --text-secondary mb-6 border-b --border-color pb-2">
              Currently Reading
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {storiesData.currentlyReading.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onViewStory={handleViewStory}
                  isRecent={true}
                />
              ))}
            </div>
          </section>
        )}

      {/* Story Shelf Section */}
      {storiesData?.storyShelf && storiesData.storyShelf.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold --text-secondary mb-6 border-b --border-color pb-2">
            Story Shelf
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {storiesData.storyShelf.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onViewStory={handleViewStory}
                isRecent={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!storiesData?.currentlyReading?.length &&
        !storiesData?.storyShelf?.length && (
          <div className="card text-center py-16">
            <h3 className="text-xl font-semibold --text-secondary mb-4">
              No Stories Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Complete a writing game to see your stories here!
            </p>
          </div>
        )}
    </div>
  );
}

// Story Card Component
interface StoryCardProps {
  story: StoryData;
  onViewStory: (story: StoryData) => void;
  isRecent: boolean;
}

function StoryCard({ story, onViewStory, isRecent }: StoryCardProps) {
  const preview =
    story.accumulatedContent?.slice(0, 150) +
    (story.accumulatedContent?.length > 150 ? "..." : "");

  return (
    <div
      className={`border rounded-lg --border-color --bg-secondary p-6 hover:shadow-md transition-shadow ${
        isRecent ? "border-blue-300" : ""
      }`}
    >
      <div className="mb-4">
        <span
          className={`inline-block px-2 py-1 text-xs rounded ${
            isRecent ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {isRecent ? "Recent" : "Archive"}
        </span>
      </div>

      <h4 className="font-bold text-lg --text-secondary mb-2 line-clamp-2">
        Story {story.orderIndex + 1}
      </h4>

      <p className="text-sm --text-secondary mb-3 italic">
        Prompt: "{story.prompt.slice(0, 80)}
        {story.prompt.length > 80 ? "..." : ""}"
      </p>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {preview || "No content yet..."}
      </p>

      <button
        onClick={() => onViewStory(story)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Read Full Story
      </button>
    </div>
  );
}

// Story Detail View Component
interface StoryDetailViewProps {
  story: StoryData;
  onBack: () => void;
}

function StoryDetailView({ story, onBack }: StoryDetailViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 border --border-color rounded --text-secondary hover:--border-color transition-colors"
      >
        ← Back to Stories
      </button>

      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold --text-secondary mb-4">
            Story {story.orderIndex + 1}
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-yellow-800 mb-1">
              Prompt:
            </p>
            <p className="text-yellow-900 italic">"{story.prompt}"</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold --text-secondary mb-4">
            The Story
          </h3>
          <div
            className="prose max-w-none --text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                story.accumulatedContent ||
                '<p class="text-gray-500 italic">No content written yet.</p>',
            }}
          />
        </div>

        {/* Future: Add edit history timeline here */}
        <div className="mt-8 pt-6 border-t --border-color">
          <h4 className="font-semibold --text-secondary mb-3">
            Writing History
          </h4>
          <p className="text-sm text-gray-600">
            {story.editHistory?.length || 0} contributions from{" "}
            {new Set(story.editHistory?.map((edit: any) => edit.playerName))
              .size || 0}{" "}
            writers
          </p>
        </div>
      </div>
    </div>
  );
}
