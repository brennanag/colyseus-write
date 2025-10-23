import { Room, Client } from "colyseus";
import { JWT } from "@colyseus/auth";
import { prisma } from "../lib/prisma";
import { GAME_CONFIG } from "../constants/game-config";

interface JWTPayload {
  email: string;
  name?: string;
  [key: string]: any;
}

interface StoryData {
  id: string;
  prompt: string;
  accumulatedContent: string;
  editHistory: any[];
  orderIndex: number;
}

export class ReadingRoom extends Room {
  maxClients = 50; // Reading rooms can hold more people

  static async onAuth(token: string) {
    try {
      const payload = (await JWT.verify(token)) as JWTPayload;
      return payload;
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

  async onCreate() {
    console.log("ReadingRoom created!", this.roomId);
    this.setupMessageHandlers();
  }

  async onJoin(client: Client, options: any, auth: JWTPayload) {
    console.log("User joined reading room:", auth.email);

    // Send initial story data to the client
    await this.sendAvailableStories(client);
  }

  private setupMessageHandlers() {
    this.onMessage("requestStories", async (client) => {
      await this.sendAvailableStories(client);
    });

    this.onMessage("requestStoryHistory", async (client, message) => {
      await this.sendStoryHistory(client, message.storyId);
    });
  }

  private async sendAvailableStories(client: Client) {
    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: client.auth.email },
      });

      if (!user) {
        client.send("error", { message: "User not found" });
        return;
      }

      // Calculate time threshold for "currently reading"
      const recentThreshold = new Date();
      recentThreshold.setHours(
        recentThreshold.getHours() - GAME_CONFIG.readingRoom.recentStoriesHours
      );

      // Get stories from games the user participated in
      const stories = await prisma.story.findMany({
        where: {
          gameSession: {
            participants: {
              some: {
                playerId: user.id,
              },
            },
            status: "completed",
          },
        },
        include: {
          prompt: true,
          gameSession: true,
        },
        orderBy: {
          gameSession: {
            completedAt: "desc",
          },
        },
      });

      // Separate into "currently reading" (recent) and "shelf" (older)
      const currentlyReading = stories.filter(
        (story) =>
          story.gameSession.completedAt &&
          story.gameSession.completedAt > recentThreshold
      );

      const storyShelf = stories.filter(
        (story) =>
          story.gameSession.completedAt &&
          story.gameSession.completedAt <= recentThreshold
      );

      client.send("storiesData", {
        currentlyReading: currentlyReading.map(this.formatStoryData),
        storyShelf: storyShelf.map(this.formatStoryData),
      });
    } catch (error) {
      console.error("Error fetching stories:", error);
      client.send("error", { message: "Failed to load stories" });
    }
  }

  private async sendStoryHistory(client: Client, storyId: string) {
    try {
      const story = await prisma.story.findUnique({
        where: { id: storyId },
        include: {
          prompt: true,
        },
      });

      if (!story) {
        client.send("error", { message: "Story not found" });
        return;
      }

      client.send("storyHistory", {
        story: this.formatStoryData(story),
        editHistory: story.editHistory,
      });
    } catch (error) {
      console.error("Error fetching story history:", error);
      client.send("error", { message: "Failed to load story history" });
    }
  }

  private formatStoryData(story: any): StoryData {
    return {
      id: story.id,
      prompt: story.prompt.text,
      accumulatedContent: story.accumulatedContent,
      editHistory: story.editHistory,
      orderIndex: story.orderIndex,
    };
  }

  onDispose() {
    console.log("ReadingRoom disposed", this.roomId);
  }
}
