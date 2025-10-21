import { Router } from "express";
import { prisma } from "../lib/prisma"; // Note: now importing { prisma } not default

const router = Router();

// Auto-save endpoint
router.post("/auto-save", async (req, res) => {
  try {
    const { roomId, playerId, content, roundNumber } = req.body;

    console.log("Auto-save received:", {
      roomId,
      playerId,
      roundNumber,
      contentLength: content.length,
    });

    if (!roomId || !playerId || !content || roundNumber === undefined) {
      return res.status(400).json({
        error:
          "Missing required fields: roomId, playerId, content, roundNumber",
      });
    }

    // Store auto-save in database
    const autoSave = await prisma.autoSave.upsert({
      where: {
        roomId_playerId_roundNumber: {
          roomId,
          playerId,
          roundNumber,
        },
      },
      update: {
        content,
        updatedAt: new Date(),
      },
      create: {
        roomId,
        playerId,
        roundNumber,
        content,
      },
    });

    console.log("Auto-save successful:", autoSave.id);
    res.json({ success: true, autoSave });
  } catch (error) {
    console.error("Auto-save error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
