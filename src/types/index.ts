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
