import { 
  users, type User, type InsertUser,
  therapists, type Therapist, type InsertTherapist,
  sessions, type Session, type InsertSession,
  messages, type Message, type InsertMessage,
  communities, type Community, type InsertCommunity
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUserById(id: number): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Therapist operations
  getTherapist(id: number): Promise<Therapist | undefined>;
  getAllTherapists(): Promise<Therapist[]>;
  createTherapist(therapist: InsertTherapist): Promise<Therapist>;

  // Session operations
  getSession(id: number): Promise<Session | undefined>;
  getSessionByConversationId(conversationId: string): Promise<Session | undefined>;
  getAllSessions(): Promise<Session[]>;
  createSession(session: InsertSession): Promise<Session>;

  // Message operations
  getMessage(id: number): Promise<Message | undefined>;
  getMessagesBySessionId(sessionId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;

  // Community operations
  getCommunity(id: number): Promise<Community | undefined>;
  getAllCommunities(): Promise<Community[]>;
  createCommunity(community: InsertCommunity): Promise<Community>;
}

export class MemStorage implements IStorage {
  private usersData: Map<number, User>;
  private therapistsData: Map<number, Therapist>;
  private sessionsData: Map<number, Session>;
  private messagesData: Map<number, Message>;
  private communitiesData: Map<number, Community>;
  
  private userIdCounter: number;
  private therapistIdCounter: number;
  private sessionIdCounter: number;
  private messageIdCounter: number;
  private communityIdCounter: number;

  constructor() {
    this.usersData = new Map();
    this.therapistsData = new Map();
    this.sessionsData = new Map();
    this.messagesData = new Map();
    this.communitiesData = new Map();
    
    this.userIdCounter = 1;
    this.therapistIdCounter = 1;
    this.sessionIdCounter = 1;
    this.messageIdCounter = 1;
    this.communityIdCounter = 1;

    // Seed the database with initial data
    this.seedDatabase();
  }

  private seedDatabase() {
    // Create demo user
    this.createUser({
      username: "demo_user",
      password: "password123",
      email: "user@example.com",
      name: "Demo User",
      preferences: {
        goals: ["anxiety", "productivity"],
        issues: ["academic_stress", "sleep"],
        therapistPreferences: "Someone experienced with anxiety and academic stress"
      }
    });

    // Create therapists with vector embeddings (these would normally be calculated)
    const therapistData: InsertTherapist[] = [
      {
        name: "Dr. Sarah Johnson",
        title: "Clinical Psychologist • Anxiety Specialist",
        bio: "I specialize in helping young professionals and students manage anxiety and academic stress through evidence-based cognitive behavioral techniques.",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        specialties: ["anxiety", "depression", "academic_stress"],
        rating: 4.8,
        reviews: 387,
        available: true,
        vectorEmbedding: Array.from({length: 384}, () => Math.random() * 2 - 1) // Mock embedding
      },
      {
        name: "Dr. Michael Chen",
        title: "Licensed Therapist • Performance Coach",
        bio: "Combines cognitive behavioral techniques with performance psychology to help clients achieve their academic and career goals.",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        specialties: ["performance", "motivation", "career"],
        rating: 4.1,
        reviews: 219,
        available: true,
        vectorEmbedding: Array.from({length: 384}, () => Math.random() * 2 - 1) // Mock embedding
      },
      {
        name: "Dr. Lisa Martinez",
        title: "Clinical Psychologist • Trauma Specialist",
        bio: "Experienced in treating complex trauma, PTSD, and stress-related disorders using evidence-based therapeutic approaches.",
        photo: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        specialties: ["trauma", "ptsd", "resilience"],
        rating: 4.6,
        reviews: 305,
        available: false,
        vectorEmbedding: Array.from({length: 384}, () => Math.random() * 2 - 1) // Mock embedding
      }
    ];

    therapistData.forEach(therapist => this.createTherapist(therapist));

    // Create communities
    const communityData: InsertCommunity[] = [
      {
        name: "Anxiety Support Circle",
        description: "A safe space to discuss anxiety management techniques, share experiences, and support one another through challenging times.",
        moderatorId: 1, // Dr. Sarah Johnson
        memberCount: 2189,
        tags: ["anxiety", "stress", "support"],
        status: "active"
      },
      {
        name: "Mindfulness Meditation",
        description: "Learn and practice various mindfulness techniques to reduce stress, improve focus, and enhance overall mental well-being.",
        moderatorId: 2, // Dr. Michael Chen
        memberCount: 1852,
        tags: ["mindfulness", "meditation", "focus"],
        status: "scheduled"
      },
      {
        name: "Career Transition Support",
        description: "Navigate career changes and professional development challenges with support from peers and expert guidance.",
        moderatorId: 3, // Dr. Lisa Martinez
        memberCount: 1246,
        tags: ["career", "transition", "professional"],
        status: "recurring"
      },
      {
        name: "Student Success Network",
        description: "A supportive community of students and young professionals sharing strategies for academic success, stress management, and career development.",
        moderatorId: 1, // Dr. Sarah Johnson
        memberCount: 4298,
        tags: ["students", "academic", "career"],
        status: "active"
      }
    ];

    communityData.forEach(community => this.createCommunity(community));
  }

  // User methods
  async getUserById(id: number): Promise<User> {
    const user = this.usersData.get(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    
    const user: User = {
      ...userData,
      id,
      createdAt: now
    };
    
    this.usersData.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.usersData.values());
  }

  // Therapist methods
  async getTherapist(id: number): Promise<Therapist | undefined> {
    return this.therapistsData.get(id);
  }

  async getAllTherapists(): Promise<Therapist[]> {
    return Array.from(this.therapistsData.values());
  }

  async createTherapist(therapistData: InsertTherapist): Promise<Therapist> {
    const id = this.therapistIdCounter++;
    const now = new Date();
    
    const therapist: Therapist = {
      ...therapistData,
      id,
      createdAt: now
    };
    
    this.therapistsData.set(id, therapist);
    return therapist;
  }

  // Session methods
  async getSession(id: number): Promise<Session | undefined> {
    return this.sessionsData.get(id);
  }

  async getSessionByConversationId(conversationId: string): Promise<Session | undefined> {
    return Array.from(this.sessionsData.values()).find(
      (session) => session.conversationId === conversationId
    );
  }

  async getAllSessions(): Promise<Session[]> {
    return Array.from(this.sessionsData.values());
  }

  async createSession(sessionData: InsertSession): Promise<Session> {
    const id = this.sessionIdCounter++;
    const now = new Date();
    
    const session: Session = {
      ...sessionData,
      id,
      startedAt: now,
      endedAt: null
    };
    
    this.sessionsData.set(id, session);
    return session;
  }

  // Message methods
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messagesData.get(id);
  }

  async getMessagesBySessionId(sessionId: number): Promise<Message[]> {
    return Array.from(this.messagesData.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const now = new Date();
    
    const message: Message = {
      ...messageData,
      id,
      timestamp: now
    };
    
    this.messagesData.set(id, message);
    return message;
  }

  // Community methods
  async getCommunity(id: number): Promise<Community | undefined> {
    return this.communitiesData.get(id);
  }

  async getAllCommunities(): Promise<Community[]> {
    return Array.from(this.communitiesData.values());
  }

  async createCommunity(communityData: InsertCommunity): Promise<Community> {
    const id = this.communityIdCounter++;
    const now = new Date();
    
    const community: Community = {
      ...communityData,
      id,
      createdAt: now
    };
    
    this.communitiesData.set(id, community);
    return community;
  }
}

export const storage = new MemStorage();
