export interface ExampleSentence {
  hz: string;
  py: string;
  vi: string;
}

export interface HSKWord {
  id: string;
  hanzi: string;
  pinyin: string;
  hanViet: string;
  meaning: string;
  level: 1 | 2 | 3 | 4;
  category: string;
  type?: string;
  examples: ExampleSentence[];
}

export type PracticeMode = 'trace' | 'quiz';

export type QuizMode = 'meaning' | 'audio' | 'pinyin' | 'speed';

export interface QuizOption {
  id: string;
  text: string;
  subText?: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  word: HSKWord;
  mode: QuizMode;
  questionTitle: string;
  promptDisplay: string;
  options: QuizOption[];
}

export interface QuizAnswerRecord {
  question: QuizQuestion;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface UserStats {
  learnedWordIds: string[];
  favoriteWordIds: string[];
  practiceCount: Record<string, number>;
  lastPracticed: Record<string, string>;
  pronunciationScores: Record<string, number>; // wordId -> highest score (0-100)
}

export interface PronunciationScoreResult {
  score: number; // 0 - 100
  recognizedText: string;
  expectedText: string;
  feedback: string;
  audioBlobUrl?: string;
  isCorrect: boolean;
}

export interface TargetWord {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export interface SentenceScrambleQuestion {
  id: string;
  level: 1 | 2 | 3 | 4;
  targetSentence: string;
  cleanSentence: string;
  pinyin: string;
  translation: string;
  segments: string[];
  targetWords: TargetWord[];
  grammarTip: string;
}

export type MainView = 'landing' | 'study' | 'quiz' | 'sentence';
