import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { chatMessageSchema, therapistMatchingSchema } from "@shared/schema";
import { generateEmbedding } from "./services/huggingface";
import { findSimilarTherapists, matchTherapistsToQuery, initializeTherapistIndex } from "./services/faiss";
import { generateTherapyResponse, createTherapyConversation } from "./services/huggingface";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/therapists", async (req, res) => {
    try {
      const therapists = await storage.getAllTherapists();
      res.json(therapists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch therapists", error: error.message });
    }
  });

  app.get("/api/therapists/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid therapist ID" });
      }

      const therapist = await storage.getTherapist(id);
      if (!therapist) {
        return res.status(404).json({ message: "Therapist not found" });
      }

      res.json(therapist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch therapist", error: error.message });
    }
  });

  // Initialize FAISS index when the app starts
  (async () => {
    try {
      const therapists = await storage.getAllTherapists();
      await initializeTherapistIndex(therapists);
      console.log("FAISS index initialized with therapist data");
    } catch (error) {
      console.error("Failed to initialize FAISS index:", error);
    }
  })();

  // FAISS vector search endpoints
  app.post("/api/faiss/search", async (req, res) => {
    try {
      const { query, limit = 10 } = req.body;
      
      if (!query || typeof query !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }

      const queryEmbedding = await generateEmbedding(query);
      const therapists = await storage.getAllTherapists();
      const results = await findSimilarTherapists(therapists, queryEmbedding, limit);
      
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Search failed", error: error.message });
    }
  });

  app.post("/api/faiss/similar/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { limit = 5 } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid therapist ID" });
      }

      const therapist = await storage.getTherapist(id);
      if (!therapist) {
        return res.status(404).json({ message: "Therapist not found" });
      }

      const therapists = await storage.getAllTherapists();
      const similarTherapists = await findSimilarTherapists(
        therapists.filter(t => t.id !== id), 
        therapist.vectorEmbedding as number[], 
        limit
      );
      
      res.json(similarTherapists);
    } catch (error) {
      res.status(500).json({ message: "Failed to find similar therapists", error: error.message });
    }
  });

  app.post("/api/faiss/match", async (req, res) => {
    try {
      const validatedData = therapistMatchingSchema.parse(req.body);
      
      // Create a query from the form data
      const queryText = `
        Feeling: ${validatedData.feeling}. 
        Previous therapy experience: ${validatedData.prevTherapy}. 
        Goals: ${validatedData.goals.join(", ")}. 
        Preferences: ${validatedData.preferences || "None"}
      `;
      
      const queryEmbedding = await generateEmbedding(queryText);
      const therapists = await storage.getAllTherapists();
      const matches = await matchTherapistsToQuery(
        therapists, 
        queryEmbedding, 
        validatedData
      );
      
      res.json(matches);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid matching request data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Matching failed", error: error.message });
      }
    }
  });

  // Hugging Face API endpoints
  app.post("/api/huggingface/chat", async (req, res) => {
    try {
      const validatedData = chatMessageSchema.parse(req.body);
      const { message, conversationId } = validatedData;

      // Get or create a conversation session
      let session;
      if (conversationId) {
        session = await storage.getSessionByConversationId(conversationId);
        if (!session) {
          return res.status(404).json({ message: "Conversation not found" });
        }
      } else {
        // For demo purposes, we'll create a new session with a default therapist
        const therapists = await storage.getAllTherapists();
        const therapist = therapists[0];
        const user = await storage.getUserById(1); // Default demo user
        
        const newConversationId = `conv_${Date.now()}`;
        session = await storage.createSession({
          userId: user.id,
          therapistId: therapist.id,
          conversationId: newConversationId,
          status: "active"
        });
      }

      // Store the user message
      await storage.createMessage({
        sessionId: session.id,
        content: message,
        role: "user"
      });

      // Generate AI response using Hugging Face
      const response = await generateTherapyResponse(message, session.conversationId);
      
      // Store the AI response
      await storage.createMessage({
        sessionId: session.id,
        content: response,
        role: "assistant"
      });

      res.json({
        response,
        conversationId: session.conversationId
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid chat request", errors: error.errors });
      } else {
        res.status(500).json({ message: "Chat generation failed", error: error.message });
      }
    }
  });

  app.post("/api/huggingface/session", async (req, res) => {
    try {
      const { therapistId } = req.body;
      
      if (!therapistId || typeof therapistId !== "number") {
        return res.status(400).json({ message: "Valid therapist ID is required" });
      }

      const therapist = await storage.getTherapist(therapistId);
      if (!therapist) {
        return res.status(404).json({ message: "Therapist not found" });
      }

      const user = await storage.getUserById(1); // Default demo user
      
      // Create a new conversation with Hugging Face
      const { conversationId, greeting } = await createTherapyConversation(therapist);
      
      // Store session in our database
      const session = await storage.createSession({
        userId: user.id,
        therapistId,
        conversationId,
        status: "active"
      });

      // Store the AI greeting message
      await storage.createMessage({
        sessionId: session.id,
        content: greeting,
        role: "assistant"
      });

      res.json({
        conversationId,
        greeting
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to create therapy session", 
        error: error.message 
      });
    }
  });

  app.get("/api/huggingface/conversations/:id", async (req, res) => {
    try {
      const conversationId = req.params.id;
      
      const session = await storage.getSessionByConversationId(conversationId);
      if (!session) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      const messages = await storage.getMessagesBySessionId(session.id);
      
      res.json(messages);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to retrieve conversation history", 
        error: error.message 
      });
    }
  });

  // Analytics endpoints (for demo dashboard)
  app.get("/api/analytics", async (req, res) => {
    try {
      const therapists = await storage.getAllTherapists();
      const users = await storage.getAllUsers();
      const sessions = await storage.getAllSessions();
      const communities = await storage.getAllCommunities();
      
      // Calculate analytics
      const analytics = {
        users: {
          total: users.length,
          growth: 24.3, // Demo value
          retention: 78.4 // Demo value
        },
        sessions: {
          total: sessions.length,
          avgDuration: 18.5, // Demo value in minutes
          satisfaction: 94.2 // Demo percentage
        },
        revenue: {
          mrr: 842500, // Demo value
          projectedArr: 14200000, // Demo value
          cac: 24.80 // Demo value
        },
        therapists: {
          total: therapists.length,
          active: therapists.filter(t => t.available).length,
          newThisMonth: 124 // Demo value
        },
        communities: {
          total: communities.length,
          active: communities.filter(c => c.status === "active").length,
          newThisMonth: 32 // Demo value
        }
      };
      
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
