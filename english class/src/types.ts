export interface Course {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  whoIsItFor: string[];
  keyTopics: string[];
  duration: string;
  category: "all" | "spoken" | "academic" | "career" | "grammar";
  iconName: string;
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  course: string;
  message?: string;
  createdAt: string;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface SuccessStory {
  id: string;
  category: "ielts" | "it" | "homemaker";
  title: string;
  stat: string;
  description: string;
  audience: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  role: string;
  rating?: number;
}

