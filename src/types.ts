// Types for the Intelligent Tutoring System

export interface PretestResult {
  score: number;
  timestamp: Date;
  unlockedSections: number[]; // IDs of sections unlocked based on pretest score
}

export interface Section {
  id: number;
  title: string;
  description: string;
  isLocked: boolean;
  progress: number; // 0-100
  pretestRequired: boolean;
  content: string; // URL or content identifier
  questions?: PretestQuestion[]; // Section-specific quiz questions
}

export interface Module {
  id: number;
  title: string;
  description: string;
  icon?: string;
  sections: Section[];
  overallProgress: number; // 0-100
  pretestResult?: PretestResult;
  isStarted: boolean;
  pretestQuestions?: PretestQuestion[]; // Module-specific pretest questions
}

export interface UserProgress {
  moduleId: number;
  sectionId: number;
  progress: number; // 0-100
  completed: boolean;
  timestamp: Date;
}

export interface PretestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
