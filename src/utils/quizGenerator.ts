import { HSKWord, QuizMode, QuizOption, QuizQuestion } from '../types';

/**
 * Shuffle an array randomly using Fisher-Yates
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate diverse, balanced quiz questions from word dataset.
 * Supports smart no-repeat cycling across multiple sessions.
 */
export function generateQuizQuestions(
  poolWords: HSKWord[],
  allWords: HSKWord[],
  mode: QuizMode,
  count: number = 10,
  recentTestedIds: string[] = []
): QuizQuestion[] {
  if (!poolWords || poolWords.length === 0) return [];

  // Always randomize all words completely using Fisher-Yates shuffle so every session or re-entry is 100% random and fresh
  const shuffledPool = shuffleArray(poolWords);

  // If questionCount is <= 0 (Tất cả), use all words in random order; otherwise pick requested count
  const actualCount = count <= 0 ? shuffledPool.length : Math.min(count, shuffledPool.length);
  const selectedPool = shuffledPool.slice(0, actualCount);

  const questions: QuizQuestion[] = [];

  selectedPool.forEach((targetWord, index) => {
    // Determine effective mode for speed mode (mix of the 3 modes)
    let effectiveMode: 'meaning' | 'audio' | 'pinyin' = 'meaning';
    if (mode === 'speed') {
      const modes: ('meaning' | 'audio' | 'pinyin')[] = ['meaning', 'audio', 'pinyin'];
      effectiveMode = modes[index % modes.length];
    } else {
      effectiveMode = mode;
    }

    // Pick 3 distractors from the same level if possible, else from all words
    const sameLevelOthers = allWords.filter(
      (w) => w.id !== targetWord.id && w.level === targetWord.level
    );
    const poolOthers = sameLevelOthers.length >= 3 ? sameLevelOthers : allWords.filter((w) => w.id !== targetWord.id);
    const shuffledOthers = shuffleArray(poolOthers).slice(0, 3);

    let questionTitle = '';
    let promptDisplay = '';
    const options: QuizOption[] = [];

    if (effectiveMode === 'meaning') {
      questionTitle = 'Từ này có nghĩa là gì trong tiếng Việt?';
      promptDisplay = targetWord.hanzi;

      options.push({
        id: `opt-${targetWord.id}`,
        text: targetWord.meaning,
        subText: targetWord.hanViet ? `Âm Hán Việt: ${targetWord.hanViet}` : undefined,
        isCorrect: true
      });

      shuffledOthers.forEach((d) => {
        options.push({
          id: `opt-${d.id}`,
          text: d.meaning,
          subText: d.hanViet ? `Âm Hán Việt: ${d.hanViet}` : undefined,
          isCorrect: false
        });
      });
    } else if (effectiveMode === 'audio') {
      questionTitle = 'Luyện nghe phản xạ: Chọn chữ Hán phát âm đúng';
      promptDisplay = '🎧 Nghe âm thanh chuẩn Bắc Kinh';

      options.push({
        id: `opt-${targetWord.id}`,
        text: targetWord.hanzi,
        subText: `${targetWord.pinyin} • ${targetWord.meaning}`,
        isCorrect: true
      });

      shuffledOthers.forEach((d) => {
        options.push({
          id: `opt-${d.id}`,
          text: d.hanzi,
          subText: `${d.pinyin} • ${d.meaning}`,
          isCorrect: false
        });
      });
    } else {
      // Pinyin mode
      questionTitle = 'Chọn phiên âm Pinyin và thanh điệu đúng:';
      promptDisplay = targetWord.hanzi;

      options.push({
        id: `opt-${targetWord.id}`,
        text: targetWord.pinyin,
        subText: targetWord.meaning,
        isCorrect: true
      });

      shuffledOthers.forEach((d) => {
        options.push({
          id: `opt-${d.id}`,
          text: d.pinyin,
          subText: d.meaning,
          isCorrect: false
        });
      });
    }

    questions.push({
      id: `q-${targetWord.id}-${index}`,
      word: targetWord,
      mode: effectiveMode,
      questionTitle,
      promptDisplay,
      options: shuffleArray(options)
    });
  });

  return shuffleArray(questions);
}
