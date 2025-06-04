export interface LearningPath {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  rating: number;
  image: string;
  duration: string;
  ratingCount: number;
  level: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  rating: number;
  image: string;
  duration: string;
  ratingCount: number;
  level: string;
  categories: string[];
  org: string;
  modules: Module[];
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
  id: number;
  title: string;
  duration: string;
  type: "VIDEO" | "ARTICLE" | "QUIZ";
  videoUrl?: string;
  article?: string;
  quiz?: Quiz;
}

export interface Quiz {
  id: number;
  questions: Question[];
}

export interface Question {
  id: number;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

export interface Category {
  id: number;
  name: string;
}
