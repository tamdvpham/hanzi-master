import React, { useState, useEffect, useMemo } from 'react';
import { SENTENCE_SCRAMBLE_DATA } from '../data/sentenceData';
import { SentenceScrambleQuestion } from '../types';
import {
  playChineseAudio,
  playCorrectSound,
  playWrongSound
} from '../utils/audio';
import {
  Flame,
  Volume2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  BookOpen,
  Check,
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

const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
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

  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

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

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [placedBankIndices, setPlacedBankIndices] = useState<number[]>([]);
  const [shuffledBank, setShuffledBank] = useState<string[]>([]);
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showGridModal, setShowGridModal] = useState<boolean>(false);

  const currentQuestion: SentenceScrambleQuestion | undefined =
    activeQuestions[currentIndex] || activeQuestions[0];

  useEffect(() => {
    if (currentQuestion) {
      setShuffledBank(shuffleArray(currentQuestion.segments));
      setPlacedBankIndices([]);
      setAnswerStatus('idle');
      setShowAnswer(false);
    }
  }, [currentQuestion?.id]);

  const saveProgressToStorage = (updated: SavedProgress) => {
    setSavedProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save sentence scramble progress:', e);
    }
  };

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

  const handleTapBankWord = (bankIndex: number) => {
    if (answerStatus === 'correct') return;
    if (placedBankIndices.includes(bankIndex)) return;
    setPlacedBankIndices((prev) => [...prev, bankIndex]);
    if (answerStatus === 'wrong') {
      setAnswerStatus('idle');
    }
  };

  const handleRemovePlacedWord = (placedPosition: number) => {
    if (answerStatus === 'correct') return;
    setPlacedBankIndices((prev) => prev.filter((_, idx) => idx !== placedPosition));
    if (answerStatus === 'wrong') {
      setAnswerStatus('idle');
    }
  };

  const handleResetOrder = () => {
    setPlacedBankIndices([]);
    setAnswerStatus('idle');
    setShowAnswer(false);
  };

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

      const updatedMistakes = Array.from(
        new Set([...savedProgress.mistakeIds, currentQuestion.id])
      );
      saveProgressToStorage({
        ...savedProgress,
        mistakeIds: updatedMistakes
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(activeQuestions.length - 1);
    }
  };

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
    <div className="max-w-3xl mx-auto px-2.5 sm:px-4 py-1.5 sm:py-3 w-full">
      {/* Sleek, Compact Header Toolbar */}
      <div className="space-y-1.5 mb-1.5">
        {/* Row 1: Back + HSK Tabs + Streak */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar shrink min-w-0">
            <button
              onClick={onBack}
              className="shrink-0 flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs transition-all active:scale-95"
              title="Quay lại"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>

            {/* HSK Level Switcher Tabs */}
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
                  className={`shrink-0 px-2 sm:px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>HSK {lvl}</span>
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded-full font-medium ${
                      isSelected
                        ? 'bg-purple-800 text-purple-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {countCompleted}/100
                  </span>
                </button>
              );
            })}
          </div>

          {streak > 1 && (
            <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>{streak}</span>
            </span>
          )}
        </div>

        {/* Row 2: Filter Pills + 100 câu modal trigger */}
        <div className="flex items-center justify-between gap-1 text-xs">
          {/* Compact Filter Pills */}
          <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-lg p-0.5 text-xs shrink-0">
            <button
              onClick={() => {
                setFilterMode('all');
                setCurrentIndex(0);
              }}
              className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition-all ${
                filterMode === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => {
                setFilterMode('uncompleted');
                setCurrentIndex(0);
              }}
              className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition-all ${
                filterMode === 'uncompleted'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chưa xong ({100 - levelCompletedCount})
            </button>
            {levelMistakesCount > 0 && (
              <button
                onClick={() => {
                  setFilterMode('mistakes');
                  setCurrentIndex(0);
                }}
                className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition-all ${
                  filterMode === 'mistakes'
                    ? 'bg-rose-600 text-white'
                    : 'text-rose-600 hover:text-rose-900'
                }`}
              >
                Sai ({levelMistakesCount})
              </button>
            )}
          </div>

          <button
            onClick={() => setShowGridModal(true)}
            className="shrink-0 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg transition-all border border-purple-200 flex items-center gap-1 active:scale-95"
            title="Xem danh sách 100 câu"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">100 câu</span>
            <span>({progressPercent}%)</span>
          </button>
        </div>
      </div>

      {/* Slim 2px Progress Bar */}
      <div className="w-full bg-slate-200 h-1 sm:h-1.5 rounded-full mb-1.5 sm:mb-2.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 rounded-full"
          style={{ width: `${Math.max(progressPercent, 2)}%` }}
        />
      </div>

      {/* Main Single-Screen Question Card */}
      {currentQuestion ? (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-3 sm:p-5 space-y-2 sm:space-y-3">
          {/* Header Row: Index & Audio button */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
              Câu {currentIndex + 1} / {activeQuestions.length}
            </span>

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

          {/* Vietnamese meaning prompt */}
          <div className="bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200/70">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Dịch & sắp xếp lại thành câu tiếng Trung:
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              "{currentQuestion.translation}"
            </div>
          </div>

          {/* Target Vocabulary Badges (compact inline) */}
          {currentQuestion.targetWords && currentQuestion.targetWords.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500" />
                Từ vựng:
              </span>
              {currentQuestion.targetWords.map((tw, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectWordToPractice?.(tw.hanzi)}
                  className="bg-amber-50/80 hover:bg-amber-100 border border-amber-200/70 rounded-lg px-2 py-0.5 text-xs transition-all flex items-center gap-1 cursor-pointer"
                  title="Bấm để luyện viết từ này"
                >
                  <span className="font-chinese font-bold text-amber-950 text-xs">
                    {tw.hanzi}
                  </span>
                  <span className="text-[10px] text-amber-700 font-medium">
                    [{tw.pinyin}]
                  </span>
                  <span className="text-[10px] text-slate-600">
                    {tw.meaning}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Sentence Assembly Area (Khung câu đang ghép) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span>Khung câu đang ghép:</span>
              {placedBankIndices.length > 0 && answerStatus !== 'correct' && (
                <button
                  onClick={handleResetOrder}
                  className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold text-[11px] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Xóa hết</span>
                </button>
              )}
            </div>

            <div
              className={`min-h-[54px] sm:min-h-[60px] p-2 sm:p-2.5 rounded-xl border-2 transition-all flex flex-wrap items-center gap-1.5 ${
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
                <div className="text-slate-400 text-xs italic text-center py-1 select-none">
                  👉 Chạm vào các từ bên dưới theo thứ tự để ghép câu...
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
                        className={`group px-3 py-1.5 rounded-lg font-chinese font-bold text-sm sm:text-base transition-all shadow-xs flex items-center gap-1 active:scale-95 ${
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
                  <span className="text-slate-400 font-bold text-base select-none">
                    {currentQuestion.targetSentence.endsWith('？') ? '？' : '。'}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Word Bank Area (Kho từ xáo trộn) */}
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 px-1">
              Kho từ xáo trộn (Chạm để chọn):
            </div>

            <div className="flex flex-wrap gap-2 p-2 sm:p-2.5 bg-slate-100/70 rounded-xl border border-slate-200/60 min-h-[50px] items-center">
              {shuffledBank.map((word, bankIdx) => {
                const isPlaced = placedBankIndices.includes(bankIdx);
                return (
                  <button
                    key={bankIdx}
                    onClick={() => handleTapBankWord(bankIdx)}
                    disabled={isPlaced || answerStatus === 'correct'}
                    className={`px-3.5 py-1.5 sm:py-2 rounded-xl font-chinese font-bold text-sm sm:text-base transition-all shadow-xs active:scale-95 ${
                      isPlaced
                        ? 'opacity-25 bg-slate-200 text-slate-400 cursor-not-allowed scale-95'
                        : 'bg-white hover:bg-purple-50 text-slate-800 hover:text-purple-700 border border-slate-200 hover:border-purple-300 shadow-slate-100 hover:shadow-xs'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Feedback Banner */}
          {answerStatus === 'correct' && (
            <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chính xác tuyệt đối! Xuất sắc! 🎉</span>
              </div>

              <div className="bg-white/80 rounded-lg p-2 border border-emerald-200/60 flex items-center justify-between gap-2">
                <div>
                  <span className="font-chinese font-bold text-sm sm:text-base text-slate-900 mr-2">
                    {currentQuestion.targetSentence}
                  </span>
                  <span className="text-xs text-purple-700 font-mono">
                    [{currentQuestion.pinyin}]
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-emerald-900 bg-emerald-100/60 px-2 py-1 rounded border border-emerald-200">
                <span className="font-bold">💡 Ngữ pháp: </span>
                <span>{currentQuestion.grammarTip}</span>
              </div>
            </div>
          )}

          {answerStatus === 'wrong' && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs sm:text-sm">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Chưa đúng trật tự câu! Hãy đổi lại vị trí từ hoặc xem đáp án.</span>
              </div>

              {showAnswer && (
                <div className="bg-white rounded-lg p-2 border border-rose-200 text-xs space-y-0.5">
                  <div className="font-chinese font-bold text-sm text-slate-900">
                    {currentQuestion.targetSentence}{' '}
                    <span className="text-xs text-purple-700 font-mono font-normal">
                      [{currentQuestion.pinyin}]
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    💡 <span className="font-bold">Ngữ pháp:</span> {currentQuestion.grammarTip}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevQuestion}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1 active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Câu trước</span>
              </button>

              {answerStatus === 'wrong' && !showAnswer && (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all flex items-center gap-1 active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem đáp án</span>
                </button>
              )}
            </div>

            {answerStatus === 'correct' ? (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm shadow-emerald-200 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleCheckAnswer}
                disabled={placedBankIndices.length === 0}
                className={`px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
                  placedBankIndices.length === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Kiểm tra đáp án</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 text-center text-slate-500 text-sm">
          Không tìm thấy câu hỏi phù hợp với bộ lọc này.
        </div>
      )}

      {/* Grid Modal: 100 questions overview */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Danh sách 100 Câu HSK {level}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Chạm vào số câu để chuyển trực tiếp đến câu đó
                </p>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Questions Grid 1-100 */}
            <div className="p-3 sm:p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
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
                      className={`h-9 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center border ${
                        isCurrent ? 'ring-2 ring-purple-600 ring-offset-1' : ''
                      } ${
                        isDone
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                          : isMistake
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{qIdx + 1}</span>
                      {isDone && <span className="text-[8px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer Legend */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-600">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Đúng ({levelCompletedCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-200 border border-rose-400" />
                <span>Cần ôn ({levelMistakesCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300" />
                <span>Chưa làm ({100 - levelCompletedCount})</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
