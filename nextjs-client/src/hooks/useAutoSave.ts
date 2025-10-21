import { useState, useEffect, useRef, useCallback } from "react";
// import { GAME_CONFIG } from "../../../server/src/constants/game-config";

interface UseAutoSaveProps {
  roomId: string;
  playerId: string;
  //   roundNumber: number;
  content: string;
  onSaveSuccess?: () => void;
  onSaveError?: (error: any) => void;
}
const AUTO_SAVE_INTERVAL_MS = 10000; // 10 seconds

export function useAutoSave({
  roomId,
  playerId,
  //   roundNumber,
  content,
  onSaveSuccess,
  onSaveError,
}: UseAutoSaveProps) {
  console.log("🔍 useAutoSave hook called with:", {
    roomId,
    playerId,
    // roundNumber,
    contentLength: content.length,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const contentRef = useRef(content);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Update content ref whenever content changes
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  const performSave = useCallback(async () => {
    // 🔍 ADD THIS DEBUG LOG AT THE TOP OF performSave
    console.log(
      "🔍 Auto-save triggered, content length:",
      contentRef.current.length
    );
    if (!contentRef.current.trim()) return; // Don't save empty content

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/submissions/auto-save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          playerId,
          //   roundNumber,
          content: contentRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`Auto-save failed: ${response.statusText}`);
      }

      const data = await response.json();

      setLastSaved(new Date());
      onSaveSuccess?.();

      console.log("Auto-save successful:", data.autoSave.id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      onSaveError?.(err);
      console.error("Auto-save error:", err);
    } finally {
      setIsSaving(false);
    }
  }, [roomId, playerId, onSaveSuccess, onSaveError]);

  // Set up auto-save interval
  useEffect(() => {
    const interval = AUTO_SAVE_INTERVAL_MS;

    const savePeriodically = () => {
      if (contentRef.current.trim()) {
        performSave();
      }
    };

    // Save immediately on first render if there's content
    if (content.trim()) {
      saveTimeoutRef.current = setTimeout(() => {
        performSave();
      }, 1000); // Small delay to avoid immediate save on component mount
    }

    // Set up interval for periodic saves
    const intervalId = setInterval(savePeriodically, interval);
    console.log(interval, " interval");

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      clearInterval(intervalId);
    };
  }, [performSave, content]);

  // Manual save function for explicit saves (like when submitting)
  const manualSave = useCallback(async () => {
    await performSave();
  }, [performSave]);

  return {
    isSaving,
    lastSaved,
    error,
    manualSave,
  };
}
