import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  preferences: jsonb("preferences"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const therapists = pgTable("therapists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  photo: text("photo").notNull(),
  specialties: jsonb("specialties").notNull(),
  rating: integer("rating").notNull(),
  reviews: integer("reviews").notNull(),
  available: boolean("available").default(true),
  vectorEmbedding: jsonb("vector_embedding"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  therapistId: integer("therapist_id").notNull(),
  conversationId: text("conversation_id").notNull(),
  status: text("status").notNull(),
  startedAt: timestamp("started_at").defaultNow(),
  endedAt: timestamp("ended_at"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  content: text("content").notNull(),
  role: text("role").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const communities = pgTable("communities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  moderatorId: integer("moderator_id").notNull(),
  memberCount: integer("member_count").default(0),
  tags: jsonb("tags"),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  preferences: true,
});

export const insertTherapistSchema = createInsertSchema(therapists).pick({
  name: true,
  title: true,
  bio: true,
  photo: true,
  specialties: true,
  rating: true,
  reviews: true,
  available: true,
  vectorEmbedding: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  userId: true,
  therapistId: true,
  conversationId: true,
  status: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  sessionId: true,
  content: true,
  role: true,
});

export const insertCommunitySchema = createInsertSchema(communities).pick({
  name: true,
  description: true,
  moderatorId: true,
  memberCount: true,
  tags: true,
  status: true,
});

export const chatMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  conversationId: z.string().optional(),
});

export const therapistMatchingSchema = z.object({
  feeling: z.string(),
  prevTherapy: z.string(),
  goals: z.array(z.string()).min(1),
  preferences: z.string().optional(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTherapist = z.infer<typeof insertTherapistSchema>;
export type Therapist = typeof therapists.$inferSelect;

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertCommunity = z.infer<typeof insertCommunitySchema>;
export type Community = typeof communities.$inferSelect;

export type ChatMessagePayload = z.infer<typeof chatMessageSchema>;
export type TherapistMatchingPayload = z.infer<typeof therapistMatchingSchema>;
