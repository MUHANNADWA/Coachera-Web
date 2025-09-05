export interface LearningPath {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  duration: string;
  ratingCount: number;
  level: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructors: string[];
  price: number;
  rating: number;
  image: string;
  durationHours: string;
  ratingCount: number;
  level: string;
  categories: Category[];
  orgId: number;
  orgTitle: string;
  learningPathIds: number[];
  modules: Module[];
  reviews?: Review[];
  published?: boolean;
}

export interface Module {
  id: number;
  title: string;
  sections: Section[];
}

export interface Section {
  id: number;
  title: string;
  materials: Material[];
}

export interface Material {
  id: number | string;
  title: string;
  duration?: string;
  type?: MaterialType;
  videoUrl?: string;
  article?: string;
  quiz?: Quiz;
}

export type MaterialType = "VIDEO" | "ARTICLE" | "QUIZ";

export interface Quiz {
  id: number;
  questions: Question[];
}

export interface Question {
  id: number;
  content: string;
  answer1: string;
  answer2: string;
  answer3?: string;
  answer4?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  studentId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Organization {
  id: number;
  userId: number;
  orgName: string;
  orgDecription: string;
}

export interface Instructor {
  id: number;
  userId: number;
  bio: string;
}

export interface Student {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  education: string;
  wallet: number;
  phoneNumber: string;
  address: string;
  certificateIds: number[];
  skills: Skill[];
}
