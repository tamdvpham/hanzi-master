import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Eraser,
  Eye,
  EyeOff,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sparkles,
  Info,
  Mic,
  Award
} from 'lucide-react';
import { HSKWord } from '../types';
import { MizigeGrid } from './MizigeGrid';
import { playChineseAudio, playSuccessSound, preloadChineseAudio } from '../utils/audio';
import { HighlightText } from './HighlightText';
import { VoiceEvaluator } from './VoiceEvaluator';

interface HanziPracticeProps {
  word: HSKWord;
  onBack: () => void;
  onNextWord: () => void;
  onPrevWord: () => void;
  isFavorite: boolean;
  isLearned: boolean;
  onToggleFavorite: (wordId: string) => void;
  onToggleLearned: (wordId: string) => void;
  onRecordPractice: (wordId: string) => void;
  bestScore?: number;
  onSaveScore?: (wordId: string, score: number) => void;
  isPhoneMode?: boolean;
  wordIndex?: number;
  totalWords?: number;
}

interface EvaluatingTarget {
  text: string;
  pinyin?: string;
  meaning?: string;
  highlight: string;
  title: string;
  mode: 'word' | 'sentence';
}

export const HanziPractice: React.FC<HanziPracticeProps> = ({
  word,
  onBack,
  onNextWord,
  onPrevWord,
  isFavorite,
  isLearned,
  onToggleFavorite,
  onToggleLearned,
  onRecordPractice,
  bestScore,
  onSaveScore,
  isPhoneMode = false,
  wordIndex,
  totalWords
}) => {
  // Characters in current word (e.g. "你好" -> ['你', '好'])
  const characters = Array.from(word.hanzi);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const currentChar = characters[currentCharIndex] || characters[0];

  const writerRef = useRef<any>(null);
  const writerContainerRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isWideMode = !isPhoneMode && isDesktop;
  // Canvas size for Mizige grid: 270px on desktop web, 215px on mobile to guarantee 1-screen fit without bottom cutoff
  const canvasSize = isWideMode ? 270 : 215;

  const [showOutline, setShowOutline] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [mistakes, setMistakes] = useState(0);
  const [currentStrokeNum, setCurrentStrokeNum] = useState(1);
  const [totalStrokes, setTotalStrokes] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [activeExampleTab, setActiveExampleTab] = useState(0);

  // State for recording and voice evaluation modal
  const [evaluatingTarget, setEvaluatingTarget] = useState<EvaluatingTarget | null>(null);

  // Switch between example sentences
  const handleNextExample = () => {
    if (!word.examples || word.examples.length === 0) return;
    setActiveExampleTab((prev) => (prev < word.examples.length - 1 ? prev + 1 : 0));
  };

  const handlePrevExample = () => {
    if (!word.examples || word.examples.length === 0) return;
    setActiveExampleTab((prev) => (prev > 0 ? prev - 1 : word.examples.length - 1));
  };

  // Preload audio for current word and its example sentences in background
  useEffect(() => {
    setActiveExampleTab(0);
    preloadChineseAudio(word.hanzi);
    if (word.examples) {
      word.examples.forEach((ex) => preloadChineseAudio(ex.hz));
    }
  }, [word]);

  // Initialize and update HanziWriter when character changes
  useEffect(() => {
    setIsCompleted(false);
    setMistakes(0);
    setCurrentStrokeNum(1);

    if (!writerContainerRef.current) return;

    // Clear previous SVG content inside container
    writerContainerRef.current.innerHTML = '';

    try {
      const writer = HanziWriter.create(writerContainerRef.current, currentChar, {
        width: canvasSize,
        height: canvasSize,
        padding: isWideMode ? 24 : 18,
        showOutline: showOutline,
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 150,
        strokeColor: '#1e293b',
        outlineColor: '#cbd5e1',
        drawingColor: '#059669', // Emerald ink when user writes
        drawingWidth: isWideMode ? 26 : 22,
        showCharacter: false,
        showHintAfterMisses: 2,
        highlightOnComplete: true,
        highlightColor: '#10b981',
        charDataLoader: (char, onComplete, onErr) => {
          // Cache character stroke data in localStorage for instant offline access
          const cacheKey = `hanzi_char_${char}`;
          try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
              onComplete(JSON.parse(cached));
              return;
            }
          } catch (e) {}

          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
            .then((res) => {
              if (!res.ok) throw new Error('CDN error');
              return res.json();
            })
            .then((data) => {
              try {
                localStorage.setItem(cacheKey, JSON.stringify(data));
              } catch (e) {}
              onComplete(data);
            })
            .catch(() => {
              // Fallback mirror unpkg
              fetch(`https://unpkg.com/hanzi-writer-data@2.0/${char}.json`)
                .then((res) => res.json())
                .then((data) => onComplete(data))
                .catch(onErr);
            });
        },
        onLoadCharDataSuccess: (data: any) => {
          if (data && data.strokes) {
            setTotalStrokes(data.strokes.length);
          }
        }
      });

      writerRef.current = writer;
      startQuiz(writer, showOutline);
    } catch (err) {
      console.error('Error initializing HanziWriter:', err);
    }

    return () => {
      if (writerRef.current) {
        writerRef.current.cancelQuiz();
      }
    };
  }, [currentChar, canvasSize]);

  // Handle quiz logic
  const startQuiz = (writer: any, outlineVisible: boolean) => {
    if (!writer) return;

    writer.quiz({
      showOutline: outlineVisible,
      onMistake: (_strokeData: any) => {
        setMistakes((prev) => prev + 1);
      },
      onCorrectStroke: (strokeData: any) => {
        setCurrentStrokeNum(strokeData.strokeNum + 2);
      },
      onComplete: (_summary: any) => {
        setIsCompleted(true);
        playSuccessSound();
        onRecordPractice(word.id);

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#10b981', '#34d399', '#6ee7b7', '#f59e0b', '#3b82f6']
        });
      }
    });
  };

  // Toggle outline visibility
  const handleToggleOutline = () => {
    const nextState = !showOutline;
    setShowOutline(nextState);

    if (writerRef.current) {
      if (nextState) {
        writerRef.current.showOutline();
      } else {
        writerRef.current.hideOutline();
      }
    }
  };

  // Erase and restart current character
  const handleReset = () => {
    setIsCompleted(false);
    setMistakes(0);
    setCurrentStrokeNum(1);
    if (writerRef.current) {
      writerRef.current.cancelQuiz();
      startQuiz(writerRef.current, showOutline);
    }
  };

  // Watch stroke animation
  const handleAnimate = () => {
    if (isAnimating || !writerRef.current) return;
    setIsAnimating(true);

    writerRef.current.cancelQuiz();
    writerRef.current.animateCharacter({
      onComplete: () => {
        setIsAnimating(false);
        startQuiz(writerRef.current, showOutline);
      }
    });
  };

  // Pronounce audio with guaranteed state reset
  const handleSpeak = async (text: string) => {
    try {
      setIsPlayingAudio(true);
      await playChineseAudio(text, audioSpeed);
    } catch (err) {
      console.error('Audio play error:', err);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  // Pronounce individual example sentence
  const handleSpeakSentence = async (text: string, index: number) => {
    try {
      setPlayingSentenceIdx(index);
      await playChineseAudio(text, audioSpeed);
    } catch (err) {
      console.error('Audio play error:', err);
    } finally {
      setPlayingSentenceIdx(null);
    }
  };

  // Reset character index when word changes
  useEffect(() => {
    setCurrentCharIndex(0);
    setActiveExampleTab(0);
  }, [word.id]);

  // Handle opening voice evaluation for the target word (5s timeout)
  const handleOpenWordEvaluator = () => {
    setEvaluatingTarget({
      text: word.hanzi,
      pinyin: word.pinyin,
      meaning: word.meaning,
      highlight: word.hanzi,
      title: 'Luyện Đọc & Chấm Điểm Từ Vựng',
      mode: 'word'
    });
  };

  // Handle opening voice evaluation for a sentence (10s timeout)
  const handleOpenSentenceEvaluator = (sentence: { hz: string; py: string; vi: string }, index: number) => {
    setEvaluatingTarget({
      text: sentence.hz,
      pinyin: sentence.py,
      meaning: sentence.vi,
      highlight: word.hanzi,
      title: `Luyện Đọc & Chấm Điểm Câu Ví Dụ ${index + 1}`,
      mode: 'sentence'
    });
  };

  const handleScoreSaved = (score: number) => {
    if (onSaveScore) {
      onSaveScore(word.id, score);
    }
  };

  return (
    <div className={`flex flex-col h-full w-full ${isWideMode ? 'max-w-4xl' : 'max-w-md'} mx-auto bg-gradient-to-b from-purple-50/70 via-white to-emerald-50/40 shadow-xl rounded-none sm:rounded-3xl overflow-hidden border-0 sm:border border-purple-100 min-w-0 min-h-0`}>
      {/* Top App Bar */}
      <div className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/80 backdrop-blur border-b border-purple-100 flex items-center justify-between shrink-0 min-w-0">
        <button
          onClick={onBack}
          className="p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 font-medium text-xs sm:text-sm shrink-0"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-1.5 truncate mx-1">
          <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 truncate inline-block max-w-[130px]">
            HSK {word.level} • {word.category}
          </span>
          {typeof wordIndex === 'number' && typeof totalWords === 'number' && (
            <span
              className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                isLearned
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title={isLearned ? 'Từ đã học (nằm ở cuối danh sách)' : 'Từ chưa học'}
            >
              #{wordIndex + 1}/{totalWords} {isLearned ? '✓' : ''}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onToggleFavorite(word.id)}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isFavorite
                ? 'text-amber-500 bg-amber-50'
                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-50'
            }`}
            title="Lưu từ yêu thích"
          >
            <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-amber-500' : ''}`} />
          </button>
          <button
            onClick={() => onToggleLearned(word.id)}
            className={`px-2 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
              isLearned
                ? 'text-emerald-700 bg-emerald-100 border border-emerald-300 shadow-xs'
                : 'text-slate-600 bg-slate-100 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-200'
            }`}
            title={isLearned ? 'Bấm để đánh dấu chưa thuộc (đưa về đầu danh sách)' : 'Bấm để đánh dấu đã thuộc (chuyển xuống cuối danh sách)'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLearned ? 'fill-emerald-600 text-white' : ''}`} />
            <span className="text-[11px] font-semibold">{isLearned ? 'Đã thuộc' : 'Thuộc'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isWideMode ? (
        // ================= DESKTOP 2-COLUMN STUDIO LAYOUT =================
        <div className="flex-1 p-6 grid grid-cols-12 gap-8 items-start overflow-y-auto">
          {/* Left Column: Canvas & Controls */}
          <div className="col-span-5 flex flex-col items-center bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            {/* Square writing box container */}
            <div
              className="relative bg-white rounded-2xl shadow-md border-2 border-emerald-300 overflow-hidden select-none touch-none"
              style={{ width: canvasSize, height: canvasSize }}
            >
              <MizigeGrid size={canvasSize} />
              <div
                ref={writerContainerRef}
                className="absolute inset-0 cursor-crosshair flex items-center justify-center touch-none"
                style={{ width: canvasSize, height: canvasSize }}
              />
              <div className="absolute top-2 left-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-200 pointer-events-none">
                Nét {Math.min(currentStrokeNum, totalStrokes || currentStrokeNum)} / {totalStrokes || '?'}
              </div>
              {mistakes > 0 && !isCompleted && (
                <div className="absolute top-2 right-2 bg-rose-50 text-rose-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-rose-200 pointer-events-none">
                  Lỗi: {mistakes}
                </div>
              )}

              {/* Completion Celebration Overlay */}
              {isCompleted && (
                <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 z-10">
                  <div className="bg-white/95 rounded-2xl p-4 shadow-xl border border-emerald-200 text-center max-w-[210px]">
                    <span className="text-3xl animate-bounce inline-block">🎉</span>
                    <div className="text-sm font-extrabold text-emerald-700 mt-1">Xuất sắc!</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Viết đúng chuẩn nét bút</div>
                    <div className="flex items-center gap-2 mt-3 justify-center">
                      <button
                        onClick={handleReset}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1 transition-all active:scale-95"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Viết lại</span>
                      </button>
                      <button
                        onClick={onNextWord}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1 transition-all active:scale-95"
                      >
                        <span>Từ tiếp</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3 Canvas Action Buttons directly underneath */}
            <div className="flex items-center justify-center gap-2.5 mt-3.5">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/90 active:scale-95 transition-all shadow-2xs font-bold text-xs cursor-pointer"
                title="Xóa và viết lại từ đầu"
              >
                <Eraser className="w-4 h-4 text-emerald-600" />
                <span>Viết lại</span>
              </button>
              <button
                onClick={handleToggleOutline}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border active:scale-95 transition-all shadow-2xs font-bold text-xs cursor-pointer ${
                  showOutline
                    ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
                title={showOutline ? 'Ẩn nét mẫu gợi ý' : 'Hiện nét mẫu gợi ý'}
              >
                {showOutline ? <Eye className="w-4 h-4 text-sky-600" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                <span>{showOutline ? 'Ẩn gợi ý' : 'Hiện gợi ý'}</span>
              </button>
              <button
                onClick={handleAnimate}
                disabled={isAnimating}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 active:scale-95 transition-all shadow-2xs font-bold text-xs cursor-pointer ${
                  isAnimating ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                title="Xem hoạt hình nét bút mẫu"
              >
                <Play className={`w-4 h-4 text-purple-600 fill-purple-500 ${isAnimating ? 'animate-spin' : ''}`} />
                <span>{isAnimating ? 'Đang vẽ...' : 'Chạy nét mẫu'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Dùng chuột hoặc bút vẽ theo các nét bút trên ô chữ</p>
          </div>

          {/* Right Column: Word Details & 3 Examples */}
          <div className="col-span-7 flex flex-col space-y-4">
            {/* Word Banner Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                {/* Row 1: Hanzi only - large and prominent */}
                <div className="text-3xl font-bold font-chinese text-slate-900 tracking-wide">
                  {word.hanzi}
                </div>

                {/* Row 2: Pronunciation (Pinyin + Han Viet + Score) placed below Hanzi */}
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-base font-bold text-purple-600">{word.pinyin}</span>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium">{word.hanViet}</span>
                  {bestScore !== undefined && bestScore > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {bestScore}đ
                    </span>
                  )}
                </div>

                {/* Row 3: Vietnamese Meaning */}
                <div className="text-sm font-semibold text-slate-700 mt-1">{word.meaning}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenWordEvaluator}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                  title="Ghi âm chấm điểm từ này"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSpeak(word.hanzi)}
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center ${
                    isPlayingAudio ? 'ring-2 ring-emerald-300 ring-offset-1 scale-105 animate-pulse' : ''
                  }`}
                  title="Phát âm từ này"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Multi-character Selector Tabs */}
            {characters.length > 1 && (
              <div className="flex items-center gap-2 bg-slate-100/90 p-2 rounded-xl">
                <span className="text-xs text-slate-600 font-medium">Chọn chữ để luyện viết:</span>
                <div className="flex items-center gap-1.5">
                  {characters.map((char, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCharIndex(index)}
                      className={`px-3 py-1 rounded-lg text-sm font-chinese font-bold transition-all ${
                        currentCharIndex === index
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-purple-50'
                      }`}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3 Example Sentences Section */}
            {word.examples && word.examples.length > 0 && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700">3 Câu ví dụ thực tế</span>
                  <div className="flex items-center gap-1.5">
                    {word.examples.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveExampleTab(idx)}
                        className={`w-6 h-6 rounded-lg text-xs font-bold transition-all ${
                          activeExampleTab === idx
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {(() => {
                  const ex = word.examples[activeExampleTab] || word.examples[0];
                  return (
                    <div className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-100">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-chinese font-semibold text-slate-900 leading-relaxed">
                            <HighlightText
                              text={ex.hz}
                              highlight={word.hanzi}
                              highlightClassName="text-purple-600 font-bold"
                            />
                          </div>
                          <div className="text-xs text-purple-600 font-medium mt-1">
                            {ex.py}
                          </div>
                          <div className="text-xs text-slate-600 mt-1 italic">
                            {ex.vi}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-center">
                          <button
                            onClick={() => handleOpenSentenceEvaluator(ex, activeExampleTab)}
                            className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                            title="Ghi âm và chấm điểm câu ví dụ này"
                          >
                            <Mic className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSpeakSentence(ex.hz, activeExampleTab)}
                            className={`w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all ${
                              playingSentenceIdx === activeExampleTab ? 'ring-2 ring-emerald-300 ring-offset-1 scale-110 animate-pulse' : ''
                            }`}
                            title="Nghe câu ví dụ này"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Navigation bar for example sentences: Câu trước / Câu tiếp theo */}
                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Câu {activeExampleTab + 1} / {word.examples.length}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePrevExample}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-slate-600 hover:text-purple-700 hover:bg-purple-50 border border-slate-200 font-medium transition-colors text-xs active:scale-95"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Câu trước</span>
                          </button>
                          <button
                            onClick={handleNextExample}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold transition-colors text-xs active:scale-95"
                          >
                            <span>Câu tiếp theo</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      ) : (
        // ================= MOBILE / PHONE FRAME LAYOUT =================
        <div className="w-full flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 flex flex-col justify-between items-center overflow-y-auto no-scrollbar min-h-0 min-w-0 gap-1.5">
          {/* Compact Character & Word Header */}
          <div className="w-full flex items-center justify-between px-3 py-1.5 bg-white rounded-2xl shadow-xs border border-slate-100 shrink-0 min-w-0">
            <div
              onClick={() => handleSpeak(word.hanzi)}
              className="cursor-pointer group select-none flex-1 min-w-0 pr-1.5"
              title="Bấm để nghe phát âm"
            >
              {/* Row 1: Hanzi only */}
              <div className="text-xl sm:text-2xl font-bold font-chinese text-slate-900 group-hover:text-purple-600 transition-colors leading-tight">
                {word.hanzi}
              </div>

              {/* Row 2: Pronunciation (Pinyin + Han Viet + Score) placed below Hanzi */}
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className="text-sm font-bold text-purple-600 truncate">
                  {word.pinyin}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded truncate">
                  {word.hanViet}
                </span>
                {bestScore !== undefined && bestScore > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-0.5 shrink-0">
                    <Award className="w-2.5 h-2.5 text-amber-500" />
                    {bestScore}đ
                  </span>
                )}
              </div>

              {/* Row 3: Vietnamese Meaning */}
              <div className="text-xs font-semibold text-slate-700 truncate mt-0.5">
                {word.meaning}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleOpenWordEvaluator}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shrink-0"
                title="Ghi âm chấm điểm từ này"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSpeak(word.hanzi)}
                className={`w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shrink-0 ${
                  isPlayingAudio ? 'ring-2 ring-emerald-300 ring-offset-1 scale-105 animate-pulse' : ''
                }`}
                title="Phát âm từ này"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mizige Canvas Area + 3 Control Buttons STRICTLY TOGETHER */}
          <div className="flex flex-col items-center shrink-0">
            {/* Multi-character Selector Tabs (if compound word) */}
            {characters.length > 1 && (
              <div className="flex items-center gap-1.5 bg-slate-100/90 px-2 py-0.5 rounded-lg mb-1.5 shrink-0 max-w-full overflow-x-auto">
                <span className="text-[11px] text-slate-500 font-medium shrink-0">Chọn nét:</span>
                {characters.map((char, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCharIndex(index)}
                    className={`px-2.5 py-0.5 rounded-md text-xs font-chinese font-bold transition-all shrink-0 ${
                      currentCharIndex === index
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-purple-50'
                    }`}
                  >
                    {char}
                  </button>
                ))}
              </div>
            )}

            {/* Square writing box container */}
            <div
              className="relative bg-white rounded-2xl shadow-md border-2 border-emerald-300 overflow-hidden select-none touch-none"
              style={{ width: canvasSize, height: canvasSize }}
            >
              <MizigeGrid size={canvasSize} />
              <div
                ref={writerContainerRef}
                className="absolute inset-0 cursor-crosshair flex items-center justify-center touch-none"
                style={{ width: canvasSize, height: canvasSize }}
              />
              <div className="absolute top-1.5 left-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.2 rounded-full border border-emerald-200 pointer-events-none">
                Nét {Math.min(currentStrokeNum, totalStrokes || currentStrokeNum)} / {totalStrokes || '?'}
              </div>
              {mistakes > 0 && !isCompleted && (
                <div className="absolute top-1.5 right-1.5 bg-rose-50 text-rose-600 text-[10px] font-semibold px-2 py-0.2 rounded-full border border-rose-200 pointer-events-none">
                  Lỗi: {mistakes}
                </div>
              )}

              {/* Mobile Completion Celebration Overlay */}
              {isCompleted && (
                <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 z-10">
                  <div className="bg-white/95 rounded-2xl p-3 shadow-xl border border-emerald-200 text-center max-w-[190px]">
                    <span className="text-2xl animate-bounce inline-block">🎉</span>
                    <div className="text-xs font-extrabold text-emerald-700 mt-0.5">Xuất sắc!</div>
                    <div className="text-[10px] text-slate-500 font-medium">Đã viết đúng bút thuận</div>
                    <div className="flex items-center gap-1.5 mt-2 justify-center">
                      <button
                        onClick={handleReset}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 transition-all active:scale-95"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Luyện lại</span>
                      </button>
                      <button
                        onClick={onNextWord}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white text-[10px] font-bold shadow-xs flex items-center gap-1 transition-all active:scale-95"
                      >
                        <span>Từ tiếp</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3 Action Buttons directly under Canvas: Eraser, Eye, Play with vibrant labels */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/90 active:scale-95 transition-all shadow-2xs font-semibold text-[11px] cursor-pointer"
                title="Xóa và viết lại từ đầu"
              >
                <Eraser className="w-3.5 h-3.5 text-emerald-600" />
                <span>Viết lại</span>
              </button>
              <button
                onClick={handleToggleOutline}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border active:scale-95 transition-all shadow-2xs font-semibold text-[11px] cursor-pointer ${
                  showOutline
                    ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
                title={showOutline ? 'Ẩn nét mẫu gợi ý' : 'Hiện nét mẫu gợi ý'}
              >
                {showOutline ? <Eye className="w-3.5 h-3.5 text-sky-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                <span>{showOutline ? 'Ẩn gợi ý' : 'Hiện gợi ý'}</span>
              </button>
              <button
                onClick={handleAnimate}
                disabled={isAnimating}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 active:scale-95 transition-all shadow-2xs font-semibold text-[11px] cursor-pointer ${
                  isAnimating ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                title="Xem hoạt hình nét bút mẫu"
              >
                <Play className={`w-3.5 h-3.5 text-purple-600 fill-purple-500 ${isAnimating ? 'animate-spin' : ''}`} />
                <span>{isAnimating ? 'Đang vẽ...' : 'Nét mẫu'}</span>
              </button>
            </div>
          </div>

          {/* 3 Example Sentences Section - Balanced & Complete */}
          {word.examples && word.examples.length > 0 && (
            <div className="w-full bg-white rounded-2xl p-2.5 border border-slate-100 shadow-xs shrink-0 min-w-0">
              <div className="flex items-center justify-between mb-1 min-w-0">
                <span className="text-xs font-bold text-slate-700 truncate">3 Câu ví dụ thực tế</span>
                <div className="flex items-center gap-1 shrink-0">
                  {word.examples.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveExampleTab(idx)}
                      className={`w-5 h-5 rounded-md text-[10px] font-bold transition-all ${
                        activeExampleTab === idx
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const ex = word.examples[activeExampleTab] || word.examples[0];
                return (
                  <div className="bg-slate-50/90 rounded-xl p-2 border border-slate-100 min-w-0">
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <div className="min-w-0 flex-1 overflow-hidden">
                        {/* Chinese Sentence */}
                        <div className="text-xs font-chinese font-semibold text-slate-900 leading-snug break-words">
                          <HighlightText
                            text={ex.hz}
                            highlight={word.hanzi}
                            highlightClassName="text-purple-600 font-bold"
                          />
                        </div>
                        {/* Pinyin */}
                        <div className="text-[11px] text-purple-600 font-medium leading-tight mt-0.5 break-words">
                          {ex.py}
                        </div>
                        {/* Full Vietnamese Translation (NEVER TRUNCATED) */}
                        <div className="text-[11px] text-slate-600 mt-0.5 italic leading-normal break-words">
                          {ex.vi}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-center">
                        <button
                          onClick={() => handleOpenSentenceEvaluator(ex, activeExampleTab)}
                          className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shrink-0"
                          title="Ghi âm và chấm điểm câu ví dụ này"
                        >
                          <Mic className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSpeakSentence(ex.hz, activeExampleTab)}
                          className={`w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shrink-0 ${
                            playingSentenceIdx === activeExampleTab ? 'ring-2 ring-emerald-300 ring-offset-1 scale-110 animate-pulse' : ''
                          }`}
                          title="Nghe câu ví dụ này"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Navigation bar for example sentences: Câu trước / Câu tiếp theo */}
                    <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium text-[10px]">Câu {activeExampleTab + 1} / {word.examples.length}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handlePrevExample}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-slate-600 hover:text-purple-700 hover:bg-purple-50 border border-slate-200 font-medium transition-colors text-[10px] active:scale-95"
                          title="Câu ví dụ trước"
                        >
                          <ChevronLeft className="w-3 h-3" />
                          <span>Câu trước</span>
                        </button>
                        <button
                          onClick={handleNextExample}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold transition-colors text-[10px] active:scale-95"
                          title="Câu ví dụ tiếp theo"
                        >
                          <span>Câu tiếp theo</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation Toolbar */}
      <div className="w-full px-3 py-2 pb-[max(0.7rem,env(safe-area-inset-bottom))] bg-white border-t border-slate-100 flex items-center justify-between shrink-0 min-w-0 z-10 shadow-sm">
        <button
          onClick={onPrevWord}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-slate-700 font-medium hover:bg-slate-100 active:scale-95 transition-all text-xs shrink-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Từ trước</span>
        </button>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          title="Luyện lại"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onNextWord}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-sm shadow-purple-200 active:scale-95 transition-all text-xs shrink-0 cursor-pointer"
        >
          <span>Từ tiếp theo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Voice Recording and Scoring Modal */}
      {evaluatingTarget && (
        <VoiceEvaluator
          targetText={evaluatingTarget.text}
          targetPinyin={evaluatingTarget.pinyin}
          targetMeaning={evaluatingTarget.meaning}
          highlightWord={evaluatingTarget.highlight}
          title={evaluatingTarget.title}
          onClose={() => setEvaluatingTarget(null)}
          onScoreSaved={handleScoreSaved}
        />
      )}
    </div>
  );
};
