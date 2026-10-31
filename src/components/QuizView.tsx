import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Flame,
  ArrowRight,
  Clock,
  ChevronLeft,
  Trophy,
  Headphones,
  BookOpen,
  SpellCheck,
  Zap,
  Play,
  Layers,
  PenTool,
  Target,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HSKWord, QuizMode, QuizQuestion, QuizAnswerRecord } from '../types';
import { generateQuizQuestions } from '../utils/quizGenerator';
import { playChineseAudio, playCorrectSound, playWrongSound, playSuccessSound, stopAllChineseAudio } from '../utils/audio';

interface QuizViewProps {
  allWords: HSKWord[];
  initialLevel?: 1 | 2 | 3 | 4;
  onSelectWordToPractice?: (word: HSKWord) => void;
  onBackToStudy: () => void;
}

const TESTED_STORAGE_KEY = 'hsk_quiz_tested_ids_v1';

const getInitialTestedIds = (): string[] => {
  try {
    const s = localStorage.getItem(TESTED_STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch (e) {
    return [];
  }
};

export const QuizView: React.FC<QuizViewProps> = ({
  allWords,
  initialLevel = 1,
  onSelectWordToPractice,
  onBackToStudy
}) => {
  // Game Configuration State
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 'all'>(initialLevel);
  const [selectedMode, setSelectedMode] = useState<QuizMode>('meaning');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [speedMinutes, setSpeedMinutes] = useState<number>(1);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'result'>('lobby');

  // Track tested words to guarantee NO DUPLICATES across consecutive learning sessions
  const [testedWordIds, setTestedWordIds] = useState<string[]>(getInitialTestedIds);

  // In-Game State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [history, setHistory] = useState<QuizAnswerRecord[]>([]);

  // Gamification & Scores
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const speedTimerRef = useRef<any>(null);

  // Save tested words to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TESTED_STORAGE_KEY, JSON.stringify(testedWordIds));
    } catch (e) {}
  }, [testedWordIds]);

  // Filter pool based on selectedLevel
  const levelPool =
    selectedLevel === 'all'
      ? allWords
      : allWords.filter((w) => w.level === selectedLevel);

  // Count how many words in this pool have been tested in current cycle
  const poolIds = levelPool.map((w) => w.id);
  const testedInPoolCount = testedWordIds.filter((id) => poolIds.includes(id)).length;
  const remainingInPoolCount = levelPool.length - testedInPoolCount;

  // Auto-play audio when question is in 'audio' mode
  useEffect(() => {
    if (gameState === 'playing' && questions[currentIndex]) {
      const currentQ = questions[currentIndex];
      if (currentQ.mode === 'audio') {
        playChineseAudio(currentQ.word.hanzi);
      }
    }
  }, [gameState, currentIndex, questions]);

  // Speed mode countdown timer (counts down from selected minutes)
  useEffect(() => {
    if (gameState === 'playing' && selectedMode === 'speed') {
      const totalSeconds = speedMinutes * 60;
      setTimeLeft(totalSeconds);
      speedTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(speedTimerRef.current);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (speedTimerRef.current) clearInterval(speedTimerRef.current);
      };
    }
  }, [gameState, selectedMode, speedMinutes]);

  // Reset cycle for the current level pool
  const handleResetCycle = () => {
    setTestedWordIds((prev) => prev.filter((id) => !poolIds.includes(id)));
  };

  // Start new game with smart no-repeat cycling
  const handleStartGame = (specificWords?: HSKWord[]) => {
    stopAllChineseAudio();
    const pool = specificWords || levelPool;

    // If all words in this pool have been tested, auto-reset cycle so user can start a fresh round
    let activeTested = testedWordIds;
    if (!specificWords) {
      const freshAvailable = pool.filter((w) => !activeTested.includes(w.id));
      if (freshAvailable.length === 0) {
        activeTested = activeTested.filter((id) => !poolIds.includes(id));
        setTestedWordIds(activeTested);
      }
    }

    const count = specificWords
      ? specificWords.length
      : selectedMode === 'speed'
      ? Math.min(speedMinutes * 30, pool.length)
      : questionCount === -1
      ? pool.length
      : questionCount;

    const generated = generateQuizQuestions(
      pool,
      allWords,
      selectedMode,
      count,
      specificWords ? [] : activeTested
    );

    if (generated.length === 0) return;

    // Record the newly tested word IDs so the NEXT session gets fresh, unseen words!
    if (!specificWords) {
      const newIds = generated.map((q) => q.word.id);
      setTestedWordIds((prev) => Array.from(new Set([...prev, ...newIds])));
    }

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerRevealed(false);
    setHistory([]);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setGameState('playing');
  };

  // Launch targeted session with ONLY the words user answered incorrectly
  const handleRetryMistakes = () => {
    const wrongWords = history.filter((h) => !h.isCorrect).map((h) => h.question.word);
    if (wrongWords.length === 0) return;
    handleStartGame(wrongWords);
  };

  // User selects an option
  const handleSelectOption = (optionId: string) => {
    if (isAnswerRevealed) return; // Prevent double clicks

    const currentQ = questions[currentIndex];
    const chosen = currentQ.options.find((o) => o.id === optionId);
    if (!chosen) return;

    setSelectedOptionId(optionId);
    setIsAnswerRevealed(true);

    const isCorrect = chosen.isCorrect;

    // Record answer
    setHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        selectedOptionId: optionId,
        isCorrect
      }
    ]);

    // Play pronunciation of the word
    playChineseAudio(currentQ.word.hanzi);

    if (isCorrect) {
      playCorrectSound();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const multiplier = newStreak >= 3 ? 1.5 : 1;
      setScore((prev) => prev + Math.round(10 * multiplier));
    } else {
      playWrongSound();
      setStreak(0);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerRevealed(false);
    } else {
      finishQuiz();
    }
  };

  // Finish Quiz and transition to result
  const finishQuiz = () => {
    if (speedTimerRef.current) clearInterval(speedTimerRef.current);
    setGameState('result');
    playSuccessSound();

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 200);
  };

  const currentQ = questions[currentIndex];
  const wrongRecords = history.filter((h) => !h.isCorrect);
  const correctCount = history.filter((h) => h.isCorrect).length;
  const totalAnswered = history.length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // ----------------------------------------------------------------------
  // VIEW 1: LOBBY & CONFIGURATION SCREEN (Balanced, Proportional 1-Screen Fit)
  // ----------------------------------------------------------------------
  if (gameState === 'lobby') {
    return (
      <div className="max-w-xl mx-auto px-3 sm:px-4 py-2 sm:py-3 animate-fade-in w-full h-[calc(100dvh-56px)] max-h-[calc(100dvh-56px)] flex flex-col justify-between overflow-hidden">
        {/* Sleek Top Navigation & Header */}
        <div className="flex items-center justify-between gap-2 shrink-0 mb-1.5 sm:mb-2">
          <button
            onClick={onBackToStudy}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold border border-slate-200 transition-colors shadow-xs active:scale-95 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>

          <div className="text-center">
            <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5 justify-center">
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span>Trắc Nghiệm HSK</span>
            </h1>
          </div>

          {/* Compact Cycle Progress Badge */}
          <div className="flex items-center gap-1 shrink-0">
            <div
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 text-purple-700 text-[11px] font-bold border border-purple-200"
              title="Tiến độ xoay vòng câu hỏi trong cấp độ này"
            >
              <Target className="w-3 h-3 text-purple-600" />
              <span>{testedInPoolCount}/{levelPool.length} từ</span>
            </div>
            {testedInPoolCount > 0 && (
              <button
                onClick={handleResetCycle}
                className="p-1 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-slate-100 transition-colors"
                title="Bắt đầu vòng học mới từ đầu"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Main Settings Card: Proportional, Fills screen comfortably with NO giant bottom void */}
        <div className="flex-1 min-h-0 flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-sm border border-slate-200 my-1 overflow-y-auto">
          {/* 1. Chọn cấp độ HSK (Siêu gọn trên 1 hàng 5 tab) */}
          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center justify-between px-0.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>1. Chọn cấp độ HSK</span>
              </label>
              <span className="text-[10px] text-purple-600 font-semibold">
                {selectedLevel === 'all' ? 'Tất cả 4 cấp độ' : `Đang chọn HSK ${selectedLevel}`}
              </span>
            </div>

            {/* 5 Tabs on a Single Compact Row */}
            <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
              {[1, 2, 3, 4, 'all'].map((lvl) => {
                const isSelected = selectedLevel === lvl;
                const count = lvl === 'all' ? allWords.length : allWords.filter((w) => w.level === lvl).length;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl as any)}
                    className={`py-2 px-0.5 rounded-lg text-center font-bold transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                    }`}
                  >
                    <div className="text-xs sm:text-sm leading-tight">
                      {lvl === 'all' ? 'Tất cả' : `HSK ${lvl}`}
                    </div>
                    <div className={`text-[9px] sm:text-[10px] mt-0.5 font-normal ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                      {count} từ
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Chọn 1 trong 4 chế độ thử thách (2x2 Grid, Clean text, NO TRUNCATION) */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 px-0.5 flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-600" />
              <span>2. Chọn chế độ trắc nghiệm</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {/* Mode 1: Đoán Nghĩa */}
              <button
                type="button"
                onClick={() => setSelectedMode('meaning')}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all flex items-center gap-2.5 text-left active:scale-95 ${
                  selectedMode === 'meaning'
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-1 ring-purple-300'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">Đoán Nghĩa</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Hán ➔ Nghĩa
                  </p>
                </div>
              </button>

              {/* Mode 2: Luyện Nghe Phản Xạ */}
              <button
                type="button"
                onClick={() => setSelectedMode('audio')}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all flex items-center gap-2.5 text-left active:scale-95 ${
                  selectedMode === 'audio'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-300'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">Luyện Nghe</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Nghe ➔ Chữ Hán
                  </p>
                </div>
              </button>

              {/* Mode 3: Đoán Pinyin */}
              <button
                type="button"
                onClick={() => setSelectedMode('pinyin')}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all flex items-center gap-2.5 text-left active:scale-95 ${
                  selectedMode === 'pinyin'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-300'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <SpellCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">Đoán Pinyin</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Hán ➔ Pinyin
                  </p>
                </div>
              </button>

              {/* Mode 4: Thử Thách Tốc Độ Tính Giờ */}
              <button
                type="button"
                onClick={() => setSelectedMode('speed')}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all flex items-center gap-2.5 text-left active:scale-95 cursor-pointer ${
                  selectedMode === 'speed'
                    ? 'border-amber-500 bg-amber-50/70 shadow-xs ring-1 ring-amber-300'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                    Tốc Độ {speedMinutes} Phút
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Đếm ngược & Combo
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 3. Lựa chọn: Số phút (khi ở chế độ Tốc độ) HOẶC Số lượng câu hỏi (chế độ thường) */}
          {selectedMode === 'speed' ? (
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center justify-between px-0.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>3. Chọn thời gian thi đấu</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  Trả lời càng nhiều càng tốt
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                {[1, 2, 3, 4, 5].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setSpeedMinutes(mins)}
                    className={`py-2 px-0.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center active:scale-95 cursor-pointer ${
                      speedMinutes === mins
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-bold ring-1 ring-amber-300'
                        : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 font-semibold'
                    }`}
                  >
                    <span className="text-xs sm:text-sm leading-tight font-bold">{mins}</span>
                    <span
                      className={`text-[9px] sm:text-[10px] mt-0.5 leading-none ${
                        speedMinutes === mins ? 'text-amber-100' : 'text-slate-400'
                      }`}
                    >
                      phút
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center justify-between px-0.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>3. Số lượng câu hỏi</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  Tự động xoay vòng từ mới
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                {[
                  { label: '10', sub: 'câu', val: 10 },
                  { label: '20', sub: 'câu', val: 20 },
                  { label: '30', sub: 'câu', val: 30 },
                  { label: '50', sub: 'câu', val: 50 },
                  { label: 'Tất cả', sub: `${levelPool.length} từ`, val: -1 }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setQuestionCount(item.val)}
                    className={`py-2 px-0.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center active:scale-95 cursor-pointer ${
                      questionCount === item.val
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs font-bold ring-1 ring-purple-300'
                        : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 font-semibold'
                    }`}
                  >
                    <span className="text-xs sm:text-sm leading-tight font-bold">{item.label}</span>
                    <span
                      className={`text-[9px] sm:text-[10px] mt-0.5 leading-none ${
                        questionCount === item.val ? 'text-purple-200' : 'text-slate-400'
                      }`}
                    >
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Start Action Button (Prominent, anchored beautifully at the bottom of the card) */}
          <div className="pt-2">
            <button
              onClick={() => handleStartGame()}
              className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:brightness-105 text-white font-bold text-sm sm:text-base shadow-md shadow-purple-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>
                {selectedMode === 'speed'
                  ? `Bắt Đầu Thi Tốc Độ (${speedMinutes} phút)`
                  : remainingInPoolCount > 0
                  ? `Bắt Đầu Bài Test (${questionCount === -1 ? levelPool.length : Math.min(questionCount, levelPool.length)} câu mới)`
                  : 'Bắt Đầu Vòng Test Mới'}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW 2: ACTIVE PLAYING SCREEN (Zero bottom clipping, 100% viewport fit)
  // ----------------------------------------------------------------------
  if (gameState === 'playing' && currentQ) {
    const isLastQuestion = currentIndex === questions.length - 1;

    return (
      <div className="max-w-xl mx-auto px-2.5 sm:px-4 py-2 sm:py-3 animate-fade-in flex flex-col h-[calc(100dvh-56px)] max-h-[calc(100dvh-56px)] justify-between overflow-hidden">
        {/* Header HUD: Progress, Timer & Streak */}
        <div className="flex items-center justify-between gap-3 shrink-0 mb-1">
          <button
            onClick={() => setGameState('lobby')}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
            title="Thoát trò chơi"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Question Counter / Timer */}
          <div className="flex-1 flex items-center justify-center gap-2.5">
            {selectedMode === 'speed' ? (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  timeLeft <= 10
                    ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {Math.floor(timeLeft / 60) < 10 ? '0' : ''}{Math.floor(timeLeft / 60)}:
                  {timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                </span>
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Câu {currentIndex + 1} / {questions.length}
              </div>
            )}

            {/* Streak Counter */}
            {streak >= 2 && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-sm animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Streak {streak}!</span>
              </div>
            )}
          </div>

          {/* Current Score */}
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold block leading-none">Điểm</span>
            <span className="text-sm sm:text-base font-black text-purple-700 leading-tight">{score}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-1 sm:h-1.5 mb-2 overflow-hidden shrink-0">
          <div
            className="bg-purple-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center shrink mb-2 min-h-0">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 mb-1.5">
            {currentQ.mode === 'meaning' && <BookOpen className="w-3.5 h-3.5" />}
            {currentQ.mode === 'audio' && <Headphones className="w-3.5 h-3.5" />}
            {currentQ.mode === 'pinyin' && <SpellCheck className="w-3.5 h-3.5" />}
            <span>{currentQ.questionTitle}</span>
          </div>

          {/* Prompt Display Area */}
          {currentQ.mode === 'audio' ? (
            /* Audio Mode: Sound Button */
            <div className="my-2 flex flex-col items-center">
              <button
                onClick={() => playChineseAudio(currentQ.word.hanzi)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-200 hover:scale-105 active:scale-95 transition-transform"
              >
                <Volume2 className="w-8 h-8 animate-pulse" />
              </button>
              <span className="text-[11px] text-slate-400 font-medium mt-1.5">
                Bấm vào loa để nghe lại âm thanh
              </span>
            </div>
          ) : (
            /* Meaning or Pinyin Mode: Big Hanzi */
            <div className="my-1 flex flex-col items-center">
              <div className="text-3xl sm:text-5xl font-chinese font-bold text-slate-900 tracking-wider">
                {currentQ.promptDisplay}
              </div>

              {/* Speaker Icon for Quick Listen */}
              <button
                onClick={() => playChineseAudio(currentQ.word.hanzi)}
                className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition-colors"
              >
                <Volume2 className="w-3 h-3 text-purple-600" />
                <span>Nghe phát âm</span>
              </button>
            </div>
          )}
        </div>

        {/* 4 Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5 mb-2 shrink-0">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOptionId === option.id;

            let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-purple-300 hover:bg-purple-50/30';

            if (isAnswerRevealed) {
              if (option.isCorrect) {
                btnStyle = 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200 ring-2 ring-emerald-300';
              } else if (isSelected && !option.isCorrect) {
                btnStyle = 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-200';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={isAnswerRevealed}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 text-left font-semibold transition-all flex items-center gap-2.5 active:scale-[0.99] ${btnStyle}`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isAnswerRevealed && option.isCorrect
                      ? 'bg-white text-emerald-700'
                      : isAnswerRevealed && isSelected && !option.isCorrect
                      ? 'bg-white text-rose-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isAnswerRevealed && option.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isAnswerRevealed && isSelected && !option.isCorrect ? (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  ) : (
                    letter
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate">{option.text}</div>
                  {option.subText && isAnswerRevealed && (
                    <div className="text-[10px] sm:text-xs opacity-90 mt-0.5 truncate">{option.subText}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Action Footer - Always completely visible and never clipped */}
        {isAnswerRevealed ? (
          <div className="shrink-0 animate-fade-in flex items-center justify-between p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-md">
            <div className="min-w-0 pr-2">
              <span className="text-[11px] font-semibold text-slate-500 block leading-tight truncate">
                {questions[currentIndex].options.find((o) => o.id === selectedOptionId)?.isCorrect
                  ? '🎉 Bạn đã trả lời chính xác!'
                  : '❌ Chưa chính xác!'}
              </span>
              <span className="text-xs text-purple-700 font-bold block truncate">
                {currentQ.word.hanzi} ({currentQ.word.pinyin}) — {currentQ.word.meaning}
              </span>
            </div>

            <button
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-200 transition-all active:scale-95 shrink-0"
            >
              <span>{isLastQuestion ? 'Xem Tổng Kết' : 'Câu Tiếp Theo'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        ) : (
          <div className="h-10 sm:h-12 shrink-0 flex items-center justify-center text-xs text-slate-400 font-medium">
            💡 Chọn 1 trong 4 đáp án trên để kiểm tra kết quả
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW 3: RESULT & REVIEW SUMMARY SCREEN
  // ----------------------------------------------------------------------
  return (
    <div className="max-w-xl mx-auto px-2.5 sm:px-4 py-2 sm:py-4 animate-fade-in w-full h-[calc(100dvh-56px)] max-h-[calc(100dvh-56px)] flex flex-col justify-between overflow-y-auto">
      {/* Result Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md border border-slate-100 text-center flex flex-col items-center my-auto">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center shadow-xl shadow-amber-300/40 mb-4 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
          {accuracy >= 90
            ? 'Xuất Sắc! Bậc Thầy Hán Tự!'
            : accuracy >= 70
            ? 'Rất Tốt! Hãy Tiếp Tục Phát Huy!'
            : accuracy >= 50
            ? 'Khá Tốt! Cần Luyện Thêm Một Chút!'
            : 'Cần Cố Gắng Hơn! Hãy Ôn Lại Nhé!'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Bạn vừa hoàn thành bài trắc nghiệm với {totalAnswered} câu hỏi
        </p>

        {/* 3 Metric Pills */}
        <div className="w-full grid grid-cols-3 gap-3 max-w-md mb-6">
          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100">
            <div className="text-xs text-purple-600 font-bold uppercase tracking-wider">Điểm Số</div>
            <div className="text-2xl font-black text-purple-700 mt-0.5">{score}</div>
          </div>
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Chính Xác</div>
            <div className="text-2xl font-black text-emerald-700 mt-0.5">{accuracy}%</div>
          </div>
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-xs text-amber-600 font-bold uppercase tracking-wider">Max Streak</div>
            <div className="text-2xl font-black text-amber-700 mt-0.5">{maxStreak} 🔥</div>
          </div>
        </div>

        {/* Action Buttons: Includes "Luyện riêng câu sai" and "Tiếp tục từ mới" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-lg">
          {/* Retry mistakes button if any */}
          {wrongRecords.length > 0 && (
            <button
              onClick={handleRetryMistakes}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-rose-200 transition-all active:scale-95"
            >
              <Target className="w-4 h-4" />
              <span>Ôn riêng {wrongRecords.length} câu làm sai</span>
            </button>
          )}

          {/* Continue with next fresh batch */}
          <button
            onClick={() => handleStartGame()}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-purple-200 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tiếp tục từ mới</span>
          </button>

          <button
            onClick={() => setGameState('lobby')}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition-colors"
          >
            <span>Đổi Cài Đặt</span>
          </button>
        </div>
      </div>

      {/* Detailed Question Review List */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center justify-between mb-3">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Chi tiết các câu đã làm ({correctCount}/{totalAnswered} câu đúng)</span>
          </span>
          {wrongRecords.length > 0 && (
            <span className="text-xs text-rose-600 font-semibold">
              {wrongRecords.length} câu cần ôn lại
            </span>
          )}
        </h3>

        {history.map((record, i) => {
          const w = record.question.word;
          return (
            <div
              key={i}
              className={`p-4 rounded-2xl bg-white border flex items-center justify-between gap-3 shadow-sm transition-all ${
                record.isCorrect ? 'border-emerald-200' : 'border-rose-200 bg-rose-50/20'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    record.isCorrect
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {record.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-chinese font-bold text-slate-900">{w.hanzi}</span>
                    <span className="text-xs font-semibold text-purple-600">{w.pinyin}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      HSK {w.level}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{w.meaning}</div>
                </div>
              </div>

              {/* Action Buttons: Listen & Practice Writing */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => playChineseAudio(w.hanzi)}
                  className="p-2 rounded-xl text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors"
                  title="Nghe phát âm chuẩn"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {onSelectWordToPractice && (
                  <button
                    onClick={() => onSelectWordToPractice(w)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200 transition-colors"
                    title="Luyện viết chữ này"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Luyện viết</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
