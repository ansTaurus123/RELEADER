export interface Therapist {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo: string;
  specialties: string[];
  rating: number;
  reviews: number;
  match: number;
  available: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  moderator: string;
  members: number;
  tags: string[];
  status: 'active' | 'scheduled' | 'upcoming';
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  preferences: {
    goals: string[];
    issues: string[];
    therapistPreferences: string;
  };
  therapistMatches?: Therapist[];
}

export interface TherapySession {
  id: string;
  therapistId: number;
  userId: number;
  date: Date;
  status: 'scheduled' | 'completed' | 'canceled';
  duration: number;
  notes?: string;
}

export interface TherapistMatchingForm {
  feeling: string;
  prevTherapy: string;
  goals: string[];
  preferences?: string;
}

export interface AnalyticsData {
  users: {
    total: number;
    growth: number;
    retention: number;
  };
  sessions: {
    total: number;
    avgDuration: number;
    satisfaction: number;
  };
  revenue: {
    mrr: number;
    projectedArr: number;
    cac: number;
  };
  therapists: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  communities: {
    total: number;
    active: number;
    newThisMonth: number;
  };
}
