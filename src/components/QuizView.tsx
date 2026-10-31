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
  PenTool
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

export const QuizView: React.FC<QuizViewProps> = ({
  allWords,
  initialLevel = 1,
  onSelectWordToPractice,
  onBackToStudy
}) => {
  // Game Configuration State
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 'all'>(initialLevel);
  const [selectedMode, setSelectedMode] = useState<QuizMode>('meaning');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'result'>('lobby');

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

  // Filter pool based on selectedLevel
  const levelPool =
    selectedLevel === 'all'
      ? allWords
      : allWords.filter((w) => w.level === selectedLevel);

  // Auto-play audio when question is in 'audio' mode
  useEffect(() => {
    if (gameState === 'playing' && questions[currentIndex]) {
      const currentQ = questions[currentIndex];
      if (currentQ.mode === 'audio') {
        // Auto play teacher voice
        playChineseAudio(currentQ.word.hanzi);
      }
    }
  }, [gameState, currentIndex, questions]);

  // Speed mode countdown timer
  useEffect(() => {
    if (gameState === 'playing' && selectedMode === 'speed') {
      setTimeLeft(60);
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
  }, [gameState, selectedMode]);

  // Start new game
  const handleStartGame = () => {
    stopAllChineseAudio();
    const count = selectedMode === 'speed' ? 25 : questionCount;
    const generated = generateQuizQuestions(levelPool, allWords, selectedMode, count);

    if (generated.length === 0) return;

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
  const correctCount = history.filter((h) => h.isCorrect).length;
  const totalAnswered = history.length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // ----------------------------------------------------------------------
  // VIEW 1: LOBBY & CONFIGURATION SCREEN
  // ----------------------------------------------------------------------
  if (gameState === 'lobby') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
        {/* Navigation & Title */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToStudy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold border border-slate-200 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại học từ</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200">
            <Trophy className="w-3.5 h-3.5 text-purple-600" />
            <span>Đấu Trường Trắc Nghiệm</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-emerald-600 text-white p-6 sm:p-8 shadow-xl mb-8">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Luyện phản xạ Hán tự & Âm thanh chuẩn</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Thử Thách Trắc Nghiệm HSK
            </h1>
            <p className="text-sm text-purple-100 leading-relaxed">
              Kiểm tra khả năng ghi nhớ mặt chữ Hán, phản xạ nghe âm thanh chuẩn Bắc Kinh và nhận diện Pinyin thanh điệu với 4 chế độ tương tác thú vị.
            </p>
          </div>

          <div className="absolute -right-8 -bottom-8 opacity-20 pointer-events-none">
            <Gamepad2 className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* Setting Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-8">
          {/* 1. Chọn cấp độ HSK */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>1. Chọn cấp độ HSK</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[1, 2, 3, 4, 'all'].map((lvl) => {
                const isSelected = selectedLevel === lvl;
                const count = lvl === 'all' ? allWords.length : allWords.filter(w => w.level === lvl).length;
                return (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl as any)}
                    className={`py-3 px-3 rounded-2xl text-center border font-semibold transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200 ring-2 ring-purple-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-sm font-bold">{lvl === 'all' ? 'Tất cả cấp độ' : `HSK ${lvl}`}</div>
                    <div className={`text-xs mt-0.5 ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                      {count} từ vựng
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Chọn Chế độ Chơi (4 Chế độ theo yêu cầu người dùng) */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span>2. Chọn 1 trong 4 chế độ thử thách</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Mode 1: Đoán Nghĩa */}
              <div
                onClick={() => setSelectedMode('meaning')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                  selectedMode === 'meaning'
                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-200'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">1. Đoán Nghĩa Tiếng Việt</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Nhìn chữ Hán ➔ Chọn nghĩa tiếng Việt chính xác. Thích hợp để củng cố vốn từ.
                  </p>
                </div>
              </div>

              {/* Mode 2: Luyện Nghe Phản Xạ */}
              <div
                onClick={() => setSelectedMode('audio')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                  selectedMode === 'audio'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-200'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">2. Luyện Nghe Phản Xạ</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Nghe phát âm chuẩn Bắc Kinh ➔ Đoán chữ Hán đúng. Rèn luyện đôi tai phản xạ nhanh.
                  </p>
                </div>
              </div>

              {/* Mode 3: Đoán Pinyin */}
              <div
                onClick={() => setSelectedMode('pinyin')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                  selectedMode === 'pinyin'
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-200'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <SpellCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">3. Đoán Pinyin & Thanh Điệu</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Nhìn chữ Hán ➔ Chọn đúng phiên âm và dấu thanh (1, 2, 3, 4). Tránh nhầm thanh điệu.
                  </p>
                </div>
              </div>

              {/* Mode 4: Thử Thách Tốc Độ 60s */}
              <div
                onClick={() => setSelectedMode('speed')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                  selectedMode === 'speed'
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-200'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">4. Thử Thách Tốc Độ 60 Giây</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Đếm ngược 60s, kết hợp câu hỏi hỗn hợp. Trả lời đúng liên tục để nhân điểm Combo!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Số lượng câu hỏi (ngoại trừ Speed mode) */}
          {selectedMode !== 'speed' && (
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>3. Số lượng câu hỏi</span>
              </label>
              <div className="flex items-center gap-3">
                {[5, 10, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuestionCount(num)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      questionCount === num
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {num} câu
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Start Action Button */}
          <div className="pt-2">
            <button
              onClick={handleStartGame}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:opacity-95 text-white font-bold text-base shadow-xl shadow-purple-200 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Bắt Đầu Thử Thách Ngay</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW 2: ACTIVE PLAYING SCREEN
  // ----------------------------------------------------------------------
  if (gameState === 'playing' && currentQ) {
    const isLastQuestion = currentIndex === questions.length - 1;

    return (
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 animate-fade-in flex flex-col min-h-[80vh]">
        {/* Header HUD: Progress, Timer & Streak */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => setGameState('lobby')}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
            title="Thoát trò chơi"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Question Counter / Timer */}
          <div className="flex-1 flex items-center justify-center gap-3">
            {selectedMode === 'speed' ? (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  timeLeft <= 10
                    ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Câu {currentIndex + 1} / {questions.length}
              </div>
            )}

            {/* Streak Counter */}
            {streak >= 2 && (
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-sm animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Streak {streak}!</span>
              </div>
            )}
          </div>

          {/* Current Score */}
          <div className="text-right">
            <span className="text-xs text-slate-400 font-semibold block">Điểm</span>
            <span className="text-base font-black text-purple-700">{score}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="bg-purple-600 h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center flex flex-col items-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 mb-4">
            {currentQ.mode === 'meaning' && <BookOpen className="w-3.5 h-3.5" />}
            {currentQ.mode === 'audio' && <Headphones className="w-3.5 h-3.5" />}
            {currentQ.mode === 'pinyin' && <SpellCheck className="w-3.5 h-3.5" />}
            <span>{currentQ.questionTitle}</span>
          </div>

          {/* Prompt Display Area */}
          {currentQ.mode === 'audio' ? (
            /* Audio Mode: Sound Button */
            <div className="my-4 flex flex-col items-center">
              <button
                onClick={() => playChineseAudio(currentQ.word.hanzi)}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-xl shadow-emerald-200 hover:scale-105 active:scale-95 transition-transform"
              >
                <Volume2 className="w-10 h-10 animate-pulse" />
              </button>
              <span className="text-xs text-slate-400 font-medium mt-3">
                Bấm vào loa để nghe lại âm thanh
              </span>
            </div>
          ) : (
            /* Meaning or Pinyin Mode: Big Hanzi */
            <div className="my-2 flex flex-col items-center">
              <div className="text-5xl sm:text-6xl font-chinese font-bold text-slate-900 tracking-wider">
                {currentQ.promptDisplay}
              </div>

              {/* Optional Speaker Icon for Quick Listen */}
              <button
                onClick={() => playChineseAudio(currentQ.word.hanzi)}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Nghe phát âm</span>
              </button>
            </div>
          )}
        </div>

        {/* 4 Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOptionId === option.id;

            // Compute styling based on whether answer was revealed
            let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-purple-300 hover:bg-purple-50/30';

            if (isAnswerRevealed) {
              if (option.isCorrect) {
                btnStyle = 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200 ring-2 ring-emerald-300';
              } else if (isSelected && !option.isCorrect) {
                btnStyle = 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={isAnswerRevealed}
                className={`p-4 rounded-2xl border-2 text-left font-semibold transition-all flex items-center gap-3.5 active:scale-[0.99] ${btnStyle}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
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
                  <div className="text-sm sm:text-base font-bold truncate">{option.text}</div>
                  {option.subText && isAnswerRevealed && (
                    <div className="text-xs opacity-90 mt-0.5 truncate">{option.subText}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Action Footer */}
        {isAnswerRevealed && (
          <div className="mt-auto animate-fade-in flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-md">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                {questions[currentIndex].options.find(o => o.id === selectedOptionId)?.isCorrect
                  ? '🎉 Bạn đã trả lời chính xác!'
                  : '❌ Chưa chính xác! Đáp án đúng màu xanh lá.'}
              </span>
              <span className="text-xs text-purple-700 font-bold">
                {currentQ.word.hanzi} ({currentQ.word.pinyin}) — {currentQ.word.meaning}
              </span>
            </div>

            <button
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-200 transition-all active:scale-95"
            >
              <span>{isLastQuestion ? 'Xem Tổng Kết' : 'Câu Tiếp Theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW 3: RESULT & REVIEW SUMMARY SCREEN
  // ----------------------------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      {/* Result Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center flex flex-col items-center mb-8">
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
          Bạn vừa hoàn thành thử thách trắc nghiệm tiếng Trung
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

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
          <button
            onClick={handleStartGame}
            className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-200 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử Thách Lại</span>
          </button>
          <button
            onClick={() => setGameState('lobby')}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 transition-colors"
          >
            <span>Đổi Chế Độ Khác</span>
          </button>
        </div>
      </div>

      {/* Detailed Question Review List */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Chi tiết các câu đã làm ({correctCount}/{totalAnswered} câu đúng)</span>
        </h3>

        {history.map((record, i) => {
          const w = record.question.word;
          return (
            <div
              key={i}
              className={`p-4 rounded-2xl bg-white border flex items-center justify-between gap-3 shadow-sm transition-all ${
                record.isCorrect ? 'border-emerald-200' : 'border-rose-200'
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
