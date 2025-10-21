import { Router } from "express";
import { prisma } from "../lib/prisma"; // Note: now importing { prisma } not default

const router = Router();

// Auto-save endpoint
router.post("/auto-save", async (req, res) => {
  try {
    const { roomId, playerId, content } = req.body; // Remove roundNumber

    if (!roomId || !playerId || !content) {
      return res.status(400).json({
        error: "Missing required fields: roomId, playerId, content",
      });
    }

    // Store auto-save - one per player per room
    const autoSave = await prisma.autoSave.upsert({
      where: {
        roomId_playerId: {
          // Update unique constraint
          roomId,
          playerId,
        },
      },
      update: {
        content,
        updatedAt: new Date(),
      },
      create: {
        roomId,
        playerId,
        content,
      },
    });

    res.json({ success: true, autoSave });
  } catch (error) {
    console.error("Auto-save error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
