import React, { useState, useEffect, useMemo, useRef } from 'react';
import { SENTENCE_SCRAMBLE_DATA } from '../data/sentenceData';
import { SentenceScrambleQuestion } from '../types';
import {
  playChineseAudio,
  playCorrectSound,
  playWrongSound
} from '../utils/audio';
import {
  Sparkles,
  Flame,
  Volume2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  BookOpen,
  Filter,
  Trophy,
  Layers,
  ChevronRight,
  Check,
  HelpCircle,
  Eye
} from 'lucide-react';

interface SentenceScrambleViewProps {
  initialLevel?: 1 | 2 | 3 | 4;
  onBack: () => void;
  onSelectWordToPractice?: (wordHanzi: string) => void;
}

const STORAGE_KEY_PROGRESS = 'hsk_sentence_scramble_progress_v2';

interface SavedProgress {
  completedIds: string[];
  mistakeIds: string[];
  levelIndex: Record<number, number>;
}

const getSavedProgress = (): SavedProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        completedIds: parsed.completedIds || [],
        mistakeIds: parsed.mistakeIds || [],
        levelIndex: parsed.levelIndex || { 1: 0, 2: 0, 3: 0, 4: 0 }
      };
    }
  } catch (e) {
    console.error('Failed to load sentence scramble progress:', e);
  }
  return {
    completedIds: [],
    mistakeIds: [],
    levelIndex: { 1: 0, 2: 0, 3: 0, 4: 0 }
  };
};

// Deterministic or clean random shuffle
const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  // If shuffle accidentally equals original and length > 1, swap first two
  if (arr.length > 1 && copy.every((val, idx) => val === arr[idx])) {
    [copy[0], copy[1]] = [copy[1], copy[0]];
  }
  return copy;
};

export const SentenceScrambleView: React.FC<SentenceScrambleViewProps> = ({
  initialLevel = 1,
  onBack,
  onSelectWordToPractice
}) => {
  const [level, setLevel] = useState<1 | 2 | 3 | 4>(initialLevel);
  const [filterMode, setFilterMode] = useState<'all' | 'uncompleted' | 'mistakes'>('all');
  const [savedProgress, setSavedProgress] = useState<SavedProgress>(getSavedProgress);

  // Streak counter
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  // Active question list for current level & filter
  const levelQuestions = useMemo(() => {
    return SENTENCE_SCRAMBLE_DATA.filter((q) => q.level === level);
  }, [level]);

  const activeQuestions = useMemo(() => {
    if (filterMode === 'uncompleted') {
      const uncompleted = levelQuestions.filter(
        (q) => !savedProgress.completedIds.includes(q.id)
      );
      return uncompleted.length > 0 ? uncompleted : levelQuestions;
    }
    if (filterMode === 'mistakes') {
      const mistakes = levelQuestions.filter((q) =>
        savedProgress.mistakeIds.includes(q.id)
      );
      return mistakes.length > 0 ? mistakes : levelQuestions;
    }
    return levelQuestions;
  }, [levelQuestions, filterMode, savedProgress]);

  // Current question index in activeQuestions
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Selected word indices from the bank
  const [placedBankIndices, setPlacedBankIndices] = useState<number[]>([]);
  const [shuffledBank, setShuffledBank] = useState<string[]>([]);

  // Answer status: 'idle' | 'correct' | 'wrong'
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showGridModal, setShowGridModal] = useState<boolean>(false);

  const currentQuestion: SentenceScrambleQuestion | undefined =
    activeQuestions[currentIndex] || activeQuestions[0];

  // Initialize/reset bank when question changes
  useEffect(() => {
    if (currentQuestion) {
      setShuffledBank(shuffleArray(currentQuestion.segments));
      setPlacedBankIndices([]);
      setAnswerStatus('idle');
      setShowAnswer(false);
    }
  }, [currentQuestion?.id]);

  // Persist progress
  const saveProgressToStorage = (updated: SavedProgress) => {
    setSavedProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save sentence scramble progress:', e);
    }
  };

  // Play audio helper
  const handlePlaySentenceAudio = async (text: string) => {
    if (isPlayingAudio) return;
    try {
      setIsPlayingAudio(true);
      await playChineseAudio(text);
    } catch (e) {
      console.error('Sentence audio error:', e);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  // User taps a word chip in bank -> place into assembly
  const handleTapBankWord = (bankIndex: number) => {
    if (answerStatus === 'correct') return;
    if (placedBankIndices.includes(bankIndex)) return;
    setPlacedBankIndices((prev) => [...prev, bankIndex]);
    if (answerStatus === 'wrong') {
      setAnswerStatus('idle');
    }
  };

  // User taps an already placed word chip -> remove from assembly back to bank
  const handleRemovePlacedWord = (placedPosition: number) => {
    if (answerStatus === 'correct') return;
    setPlacedBankIndices((prev) => prev.filter((_, idx) => idx !== placedPosition));
    if (answerStatus === 'wrong') {
      setAnswerStatus('idle');
    }
  };

  // Reset all placed words
  const handleResetOrder = () => {
    setPlacedBankIndices([]);
    setAnswerStatus('idle');
    setShowAnswer(false);
  };

  // Check the assembled answer
  const handleCheckAnswer = () => {
    if (!currentQuestion) return;
    const assembledText = placedBankIndices.map((i) => shuffledBank[i]).join('');
    const isCorrect = assembledText === currentQuestion.cleanSentence;

    if (isCorrect) {
      setAnswerStatus('correct');
      playCorrectSound();
      handlePlaySentenceAudio(currentQuestion.targetSentence);

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      // Save completion
      const updatedCompleted = Array.from(
        new Set([...savedProgress.completedIds, currentQuestion.id])
      );
      const updatedMistakes = savedProgress.mistakeIds.filter(
        (id) => id !== currentQuestion.id
      );
      saveProgressToStorage({
        ...savedProgress,
        completedIds: updatedCompleted,
        mistakeIds: updatedMistakes
      });
    } else {
      setAnswerStatus('wrong');
      playWrongSound();
      setStreak(0);

      // Mark mistake
      const updatedMistakes = Array.from(
        new Set([...savedProgress.mistakeIds, currentQuestion.id])
      );
      saveProgressToStorage({
        ...savedProgress,
        mistakeIds: updatedMistakes
      });
    }
  };

  // Next question
  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  // Prev question
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(activeQuestions.length - 1);
    }
  };

  // Level statistics
  const levelCompletedCount = levelQuestions.filter((q) =>
    savedProgress.completedIds.includes(q.id)
  ).length;
  const levelMistakesCount = levelQuestions.filter((q) =>
    savedProgress.mistakeIds.includes(q.id)
  ).length;
  const progressPercent = Math.round(
    (levelCompletedCount / levelQuestions.length) * 100
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Navigation & Level Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại</span>
          </button>

          <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-xl shadow-sm text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>Sắp Xếp Câu HSK (400 Câu)</span>
          </div>
        </div>

        {/* HSK Level Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {([1, 2, 3, 4] as const).map((lvl) => {
            const countCompleted = SENTENCE_SCRAMBLE_DATA.filter(
              (q) => q.level === lvl && savedProgress.completedIds.includes(q.id)
            ).length;
            const isSelected = level === lvl;
            return (
              <button
                key={lvl}
                onClick={() => {
                  setLevel(lvl);
                  setCurrentIndex(0);
                  setFilterMode('all');
                }}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>HSK {lvl}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    isSelected
                      ? 'bg-purple-800 text-purple-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {countCompleted}/100
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Banner & Progress Summary */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                HSK {level} • 100 CÂU HỎI
              </span>
              {streak > 1 && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/30 border border-orange-400/40 text-orange-300 text-xs font-bold animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                  <span>Chuỗi {streak} câu đúng</span>
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Luyện Trật Tự Câu & Ngữ Pháp (连词成句)
            </h1>
            <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-xl">
              Chạm và ghép các từ vựng theo đúng ngữ pháp chuẩn Bắc Kinh. Mỗi câu đi kèm 1 - 3 từ vựng trọng tâm HSK {level} và hướng dẫn ngữ pháp.
            </p>
          </div>

          {/* Quick Jump and Grid Trigger */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
            <button
              onClick={() => setShowGridModal(true)}
              className="text-xs bg-white/15 hover:bg-white/25 text-white font-bold px-3 py-1.5 rounded-xl transition-all border border-white/20 flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-yellow-300" />
              <span>Xem danh sách 100 câu</span>
            </button>
            <div className="text-right text-xs text-purple-200">
              Đã thuộc: <span className="font-bold text-white">{levelCompletedCount}</span> / 100 ({progressPercent}%)
            </div>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(progressPercent, 2)}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs: All, Uncompleted, Mistakes */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            setFilterMode('all');
            setCurrentIndex(0);
          }}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterMode === 'all'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Tất cả 100 câu
        </button>
        <button
          onClick={() => {
            setFilterMode('uncompleted');
            setCurrentIndex(0);
          }}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filterMode === 'uncompleted'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Chưa hoàn thành</span>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 rounded-full">
            {100 - levelCompletedCount}
          </span>
        </button>
        {levelMistakesCount > 0 && (
          <button
            onClick={() => {
              setFilterMode('mistakes');
              setCurrentIndex(0);
            }}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterMode === 'mistakes'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white text-rose-600 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            <span>Câu làm sai</span>
            <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 rounded-full font-black">
              {levelMistakesCount}
            </span>
          </button>
        )}
      </div>

      {/* Main Interactive Sentence Arena Card */}
      {currentQuestion ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-7 space-y-6">
          {/* Question Header: Index, Prompt, Audio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                Câu {currentIndex + 1} / {activeQuestions.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlaySentenceAudio(currentQuestion.targetSentence)}
                  disabled={isPlayingAudio}
                  className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200 active:scale-95"
                  title="Nghe mẫu phát âm"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce text-emerald-600' : ''}`} />
                  <span>{isPlayingAudio ? 'Đang phát...' : 'Nghe mẫu'}</span>
                </button>
              </div>
            </div>

            {/* Vietnamese meaning prompt */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Dịch & Sắp xếp lại thành câu tiếng Trung:
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                "{currentQuestion.translation}"
              </div>
            </div>

            {/* Target Vocabulary Badges (1-3 words) */}
            {currentQuestion.targetWords && currentQuestion.targetWords.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentQuestion.targetWords.length} Từ vựng trọng tâm trong câu:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.targetWords.map((tw, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectWordToPractice?.(tw.hanzi)}
                      className="group bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200/80 rounded-xl px-2.5 py-1 text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                      title="Bấm để xem và luyện viết từ này"
                    >
                      <span className="font-chinese font-bold text-amber-950 text-sm">
                        {tw.hanzi}
                      </span>
                      <span className="text-[11px] text-amber-800 font-medium">
                        [{tw.pinyin}]
                      </span>
                      <span className="text-[11px] text-slate-600">
                        {tw.meaning}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sentence Assembly Area (Khung ghép câu) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <span>Khung câu đang ghép:</span>
              {placedBankIndices.length > 0 && answerStatus !== 'correct' && (
                <button
                  onClick={handleResetOrder}
                  className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Xóa hết để xếp lại</span>
                </button>
              )}
            </div>

            <div
              className={`min-h-[72px] sm:min-h-[80px] p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2 ${
                answerStatus === 'correct'
                  ? 'bg-emerald-50/70 border-emerald-400'
                  : answerStatus === 'wrong'
                  ? 'bg-rose-50/70 border-rose-400'
                  : placedBankIndices.length === 0
                  ? 'border-dashed border-slate-300 bg-slate-50/50 justify-center'
                  : 'border-purple-300 bg-purple-50/30'
              }`}
            >
              {placedBankIndices.length === 0 ? (
                <div className="text-slate-400 text-xs sm:text-sm italic text-center py-2 select-none">
                  👉 Chạm vào các từ bên dưới theo đúng thứ tự để xếp câu...
                </div>
              ) : (
                <>
                  {placedBankIndices.map((bankIndex, orderIdx) => {
                    const word = shuffledBank[bankIndex];
                    return (
                      <button
                        key={`${bankIndex}-${orderIdx}`}
                        onClick={() => handleRemovePlacedWord(orderIdx)}
                        disabled={answerStatus === 'correct'}
                        className={`group px-3.5 py-2 rounded-xl font-chinese font-bold text-base sm:text-lg transition-all shadow-sm flex items-center gap-1.5 active:scale-95 ${
                          answerStatus === 'correct'
                            ? 'bg-emerald-600 text-white cursor-default'
                            : answerStatus === 'wrong'
                            ? 'bg-rose-600 text-white cursor-pointer hover:bg-rose-700'
                            : 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer shadow-purple-200'
                        }`}
                        title="Bấm để đưa từ này trở lại kho từ"
                      >
                        <span>{word}</span>
                        {answerStatus !== 'correct' && (
                          <span className="text-[10px] opacity-75 group-hover:opacity-100">
                            ✕
                          </span>
                        )}
                      </button>
                    );
                  })}
                  {/* Punctuation end of sentence marker */}
                  <span className="text-slate-400 font-bold text-lg select-none">
                    {currentQuestion.targetSentence.endsWith('？') ? '？' : '。'}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Word Bank Area (Kho từ xáo trộn) */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold text-slate-500 px-1">
              Kho từ xáo trộn (Chạm để chọn):
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3 p-3 bg-slate-100/70 rounded-2xl border border-slate-200/60 min-h-[64px] items-center">
              {shuffledBank.map((word, bankIdx) => {
                const isPlaced = placedBankIndices.includes(bankIdx);
                return (
                  <button
                    key={bankIdx}
                    onClick={() => handleTapBankWord(bankIdx)}
                    disabled={isPlaced || answerStatus === 'correct'}
                    className={`px-4 py-2.5 rounded-xl font-chinese font-bold text-base sm:text-lg transition-all shadow-sm active:scale-95 ${
                      isPlaced
                        ? 'opacity-25 bg-slate-200 text-slate-400 cursor-not-allowed scale-95'
                        : 'bg-white hover:bg-purple-50 text-slate-800 hover:text-purple-700 border border-slate-200 hover:border-purple-300 shadow-slate-100 hover:shadow-md'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result / Explanation Feedback Card */}
          {answerStatus === 'correct' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Chính xác tuyệt đối! Xuất sắc! 🎉</span>
              </div>

              <div className="bg-white/80 rounded-xl p-3 border border-emerald-200/60 space-y-1">
                <div className="font-chinese font-bold text-lg sm:text-xl text-slate-900">
                  {currentQuestion.targetSentence}
                </div>
                <div className="text-xs text-purple-700 font-medium font-mono">
                  {currentQuestion.pinyin}
                </div>
                <div className="text-xs text-slate-600">
                  {currentQuestion.translation}
                </div>
              </div>

              {/* Grammar explanation tip */}
              <div className="text-xs text-emerald-900 bg-emerald-100/60 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Điểm ngữ pháp: </span>
                  <span>{currentQuestion.grammarTip}</span>
                </div>
              </div>
            </div>
          )}

          {answerStatus === 'wrong' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Chưa đúng trật tự câu!</span>
              </div>
              <p className="text-xs text-rose-800">
                Hãy bấm vào từ trong khung câu để xếp lại hoặc bấm "Xem gợi ý đáp án" bên dưới.
              </p>

              {showAnswer && (
                <div className="mt-2 bg-white rounded-xl p-3 border border-rose-200 space-y-1">
                  <div className="text-[11px] font-bold text-rose-700 uppercase">
                    Đáp án chuẩn:
                  </div>
                  <div className="font-chinese font-bold text-base text-slate-900">
                    {currentQuestion.targetSentence}
                  </div>
                  <div className="text-xs text-purple-700 font-mono">
                    {currentQuestion.pinyin}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    💡 <span className="font-bold">Gợi ý ngữ pháp:</span> {currentQuestion.grammarTip}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Button Bar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevQuestion}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1 active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Câu trước</span>
              </button>

              {answerStatus === 'wrong' && !showAnswer && (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all flex items-center gap-1 active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem đáp án</span>
                </button>
              )}
            </div>

            {answerStatus === 'correct' ? (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-200 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCheckAnswer}
                disabled={placedBankIndices.length === 0}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95 ${
                  placedBankIndices.length === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Kiểm tra đáp án</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 text-center text-slate-500">
          Không tìm thấy câu hỏi phù hợp với bộ lọc này.
        </div>
      )}

      {/* Grid Modal: 100 questions overview */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Danh sách 100 Câu HSK {level}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chạm vào số câu để chuyển trực tiếp đến câu đó
                </p>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Questions Grid 1-100 */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {levelQuestions.map((q, qIdx) => {
                  const isDone = savedProgress.completedIds.includes(q.id);
                  const isMistake = savedProgress.mistakeIds.includes(q.id);
                  const isCurrent = currentQuestion?.id === q.id;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        const targetIdx = activeQuestions.findIndex(
                          (item) => item.id === q.id
                        );
                        if (targetIdx !== -1) {
                          setCurrentIndex(targetIdx);
                        } else {
                          setFilterMode('all');
                          setCurrentIndex(qIdx);
                        }
                        setShowGridModal(false);
                      }}
                      className={`h-11 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center border ${
                        isCurrent
                          ? 'ring-2 ring-purple-600 ring-offset-2'
                          : ''
                      } ${
                        isDone
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                          : isMistake
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{qIdx + 1}</span>
                      {isDone && <span className="text-[9px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer Legend */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Đã đúng ({levelCompletedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-200 border border-rose-400" />
                <span>Cần ôn ({levelMistakesCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
                <span>Chưa làm ({100 - levelCompletedCount})</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
