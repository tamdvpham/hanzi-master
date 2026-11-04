import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Headphones,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  Shuffle,
  Repeat,
  Repeat1,
  Sliders,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Clock,
  ArrowLeft,
  ListMusic,
  X,
  Award,
  PenTool,
  Check,
  Quote
} from 'lucide-react';
import { HSKWord } from '../types';
import {
  playChineseAudio,
  playVietnameseAudio,
  preloadChineseAudio,
  preloadVietnameseAudio,
  stopAllAudio
} from '../utils/audio';
import { HighlightText } from './HighlightText';

interface HandsFreePlayerViewProps {
  allWords: HSKWord[];
  initialLevel?: 1 | 2 | 3 | 4;
  learnedWordIds: string[];
  favoriteWordIds: string[];
  onToggleLearned: (wordId: string) => void;
  onToggleFavorite: (wordId: string) => void;
  onBack: () => void;
  onSelectWordToPractice?: (word: HSKWord) => void;
}

// 4 distinct speaking stages with 2-second thinking pauses between each:
// 1. word_cn -> pause_after_word (2s)
// 2. word_vi -> pause_before_sentence (2s)
// 3. sentence_cn -> pause_after_sentence (2s)
// 4. sentence_vi -> interval (1.2s) -> Next Word
export type HandsFreeStep =
  | 'word_cn'
  | 'pause_after_word'
  | 'word_vi'
  | 'pause_before_sentence'
  | 'sentence_cn'
  | 'pause_after_sentence'
  | 'sentence_vi'
  | 'interval';

export const HandsFreePlayerView: React.FC<HandsFreePlayerViewProps> = ({
  allWords,
  initialLevel = 1,
  learnedWordIds,
  favoriteWordIds,
  onToggleLearned,
  onToggleFavorite,
  onBack,
  onSelectWordToPractice
}) => {
  // Current active HSK Level (1, 2, 3, 4, or 'all')
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 'all'>(initialLevel);

  // Filter mode: all words, only unlearned words, or only favorites
  const [filterMode, setFilterMode] = useState<'all' | 'unlearned' | 'favorite'>('all');

  // Randomize list order: default TRUE (mỗi lần vào web / chuyển cấp độ danh sách tự động xáo trộn ngẫu nhiên)
  const [isRandomOrder, setIsRandomOrder] = useState<boolean>(true);
  const [shuffleSeed, setShuffleSeed] = useState<number>(() => Date.now());

  // Filter words based on selected level, filterMode, and randomized order
  const activeWordList = useMemo(() => {
    let list =
      selectedLevel === 'all'
        ? allWords
        : allWords.filter((w) => w.level === selectedLevel);

    if (filterMode === 'unlearned') {
      list = list.filter((w) => !learnedWordIds.includes(w.id));
    } else if (filterMode === 'favorite') {
      list = list.filter((w) => favoriteWordIds.includes(w.id));
    }

    if (isRandomOrder) {
      // Fisher-Yates shuffle algorithm: creates a brand new random sequence on each visit / level switch
      const shuffled = [...list];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    return list;
  }, [allWords, selectedLevel, filterMode, learnedWordIds, favoriteWordIds, isRandomOrder, shuffleSeed]);

  // Current playing word index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Audio Playback state
  const [isPlaying, setIsPlaying] = useState(true);

  // Current step in the 4-step playback cycle
  const [currentStep, setCurrentStep] = useState<HandsFreeStep>('word_cn');

  // Pause duration (default 2.0s as requested by user)
  const [delaySeconds, setDelaySeconds] = useState<number>(2.0);

  // Playback speed
  const [speed, setSpeed] = useState<number>(1.0);

  // Loop & Shuffle mode: 'sequence' (lần lượt), 'shuffle' (ngẫu nhiên), 'repeat_one' (lặp 1 từ)
  const [playMode, setPlayMode] = useState<'sequence' | 'shuffle' | 'repeat_one'>('sequence');

  // Countdown timer progress (0% to 100%) during 2s pause
  const [pauseProgress, setPauseProgress] = useState(0);

  // Drawer to see all words in level
  const [showDrawer, setShowDrawer] = useState(false);

  // Settings dropdown
  const [showSettings, setShowSettings] = useState(false);

  // Cancellation and loop token
  const loopTokenRef = useRef<number>(0);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const currentWord = activeWordList[currentIndex] || activeWordList[0];
  const currentExample =
    currentWord?.examples && currentWord.examples.length > 0
      ? currentWord.examples[0]
      : null;

  // Keep currentIndex bounded when activeWordList changes
  useEffect(() => {
    if (currentIndex >= activeWordList.length && activeWordList.length > 0) {
      setCurrentIndex(0);
    }
  }, [activeWordList.length, currentIndex]);

  // Preload audio for current word and upcoming words in background for zero lag
  useEffect(() => {
    if (!activeWordList || activeWordList.length === 0) return;
    const indicesToPreload = [
      currentIndex,
      (currentIndex + 1) % activeWordList.length,
      (currentIndex + 2) % activeWordList.length
    ];

    indicesToPreload.forEach((idx) => {
      const w = activeWordList[idx];
      if (w) {
        preloadChineseAudio(w.hanzi);
        preloadVietnameseAudio(w.meaning);
        if (w.examples?.[0]?.hz) {
          preloadChineseAudio(w.examples[0].hz);
        }
        if (w.examples?.[0]?.vi) {
          preloadVietnameseAudio(w.examples[0].vi);
        }
      }
    });
  }, [currentIndex, activeWordList]);

  // Helper function to execute smooth animated pauses
  const waitWithCountdown = async (
    durationSec: number,
    step: HandsFreeStep,
    token: number,
    checkCancelled: () => boolean
  ): Promise<boolean> => {
    setCurrentStep(step);
    setPauseProgress(0);
    const totalMs = durationSec * 1000;
    const tickIntervalMs = 50;
    const totalSteps = Math.max(1, Math.floor(totalMs / tickIntervalMs));

    for (let i = 0; i <= totalSteps; i++) {
      if (checkCancelled() || loopTokenRef.current !== token || !isPlayingRef.current) {
        return false;
      }
      setPauseProgress((i / totalSteps) * 100);
      await new Promise((r) => setTimeout(r, tickIntervalMs));
    }
    return true;
  };

  // Main Hands-Free Playback Loop Orchestrator:
  // 1. Chinese Word -> 2s Pause -> 2. Vietnamese Word Meaning
  // -> 2s Pause -> 3. Chinese Example Sentence -> 2s Pause -> 4. Vietnamese Sentence Meaning
  // -> 1.2s Breather -> Next Word!
  useEffect(() => {
    if (!isPlaying || !currentWord) {
      stopAllAudio();
      return;
    }

    const currentToken = ++loopTokenRef.current;
    let isCancelled = false;

    const runPlaybackCycle = async () => {
      try {
        if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

        const ex =
          currentWord.examples && currentWord.examples.length > 0
            ? currentWord.examples[0]
            : null;

        // ============================================
        // STEP 1: Đọc từ vựng tiếng Trung (Hanzi & Pinyin)
        // ============================================
        setCurrentStep('word_cn');
        setPauseProgress(0);

        if ('mediaSession' in navigator && currentWord) {
          try {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: `${currentWord.hanzi} (${currentWord.pinyin})`,
              artist: `${currentWord.meaning} • HSK ${currentWord.level}`,
              album: 'Hán Tự Master - Rảnh Tay'
            });
          } catch (e) {}
        }

        await playChineseAudio(currentWord.hanzi, speed);
        if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

        // ============================================
        // PAUSE 1: Nghỉ 2s nhớ nghĩa từ
        // ============================================
        const p1 = await waitWithCountdown(
          delaySeconds,
          'pause_after_word',
          currentToken,
          () => isCancelled
        );
        if (!p1) return;

        // ============================================
        // STEP 2: Đọc nghĩa tiếng Việt của từ
        // ============================================
        setCurrentStep('word_vi');
        await playVietnameseAudio(currentWord.meaning, speed);
        if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

        // ============================================
        // STEP 3 & 4: Đọc câu ví dụ tiếng Trung + Nghĩa câu (nếu có)
        // ============================================
        if (ex && ex.hz) {
          // PAUSE 2: Nghỉ 2s chuẩn bị nghe câu ví dụ
          const p2 = await waitWithCountdown(
            delaySeconds,
            'pause_before_sentence',
            currentToken,
            () => isCancelled
          );
          if (!p2) return;

          // STEP 3: Đọc câu ví dụ tiếng Trung
          setCurrentStep('sentence_cn');
          if ('mediaSession' in navigator) {
            try {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: ex.hz,
                artist: `${ex.vi} • Ví dụ: ${currentWord.hanzi}`,
                album: 'Hán Tự Master - Rảnh Tay'
              });
            } catch (e) {}
          }
          await playChineseAudio(ex.hz, speed);
          if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

          // PAUSE 3: Nghỉ 2s đoán/nhớ nghĩa câu ví dụ
          const p3 = await waitWithCountdown(
            delaySeconds,
            'pause_after_sentence',
            currentToken,
            () => isCancelled
          );
          if (!p3) return;

          // STEP 4: Đọc nghĩa tiếng Việt của câu ví dụ
          setCurrentStep('sentence_vi');
          await playVietnameseAudio(ex.vi, speed);
          if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;
        }

        // ============================================
        // INTERVAL: Nghỉ ngắn trước khi sang từ tiếp theo
        // ============================================
        setCurrentStep('interval');
        setPauseProgress(100);
        await new Promise((r) => setTimeout(r, 1200));
        if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

        // Tự động chuyển sang từ tiếp theo
        advanceToNextWord();
      } catch (err) {
        console.warn('Hands-free playback error:', err);
      }
    };

    runPlaybackCycle();

    return () => {
      isCancelled = true;
      stopAllAudio();
    };
  }, [currentIndex, isPlaying, delaySeconds, speed, currentWord?.id]);

  // Setup Mobile Lock Screen Media Controls (MediaSession API)
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    try {
      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler('previoustrack', () => handlePrev());
      navigator.mediaSession.setActionHandler('nexttrack', () => handleNext());
    } catch (e) {}

    return () => {
      try {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
      } catch (e) {}
    };
  }, [activeWordList.length, currentIndex, playMode]);

  // Advance to next word according to playMode
  const advanceToNextWord = () => {
    if (activeWordList.length <= 1) return;

    if (playMode === 'repeat_one') {
      loopTokenRef.current++;
      setCurrentStep('word_cn');
      return;
    }

    if (playMode === 'shuffle') {
      let randIdx = Math.floor(Math.random() * activeWordList.length);
      if (randIdx === currentIndex && activeWordList.length > 1) {
        randIdx = (randIdx + 1) % activeWordList.length;
      }
      setCurrentIndex(randIdx);
      return;
    }

    // Sequence (Loop all)
    setCurrentIndex((prev) => (prev + 1) % activeWordList.length);
  };

  const handleNext = () => {
    stopAllAudio();
    loopTokenRef.current++;
    advanceToNextWord();
  };

  const handlePrev = () => {
    stopAllAudio();
    loopTokenRef.current++;
    if (activeWordList.length <= 1) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : activeWordList.length - 1));
  };

  const handleReplayCurrent = () => {
    stopAllAudio();
    loopTokenRef.current++;
    setCurrentStep('word_cn');
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAllAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  // Re-shuffle the list immediately with fresh random order
  const handleReshuffleList = () => {
    stopAllAudio();
    loopTokenRef.current++;
    setShuffleSeed(Date.now());
    setIsRandomOrder(true);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  // Change HSK Level (tự động xáo trộn ngẫu nhiên thứ tự cho level mới)
  const handleSelectLevel = (lvl: 1 | 2 | 3 | 4 | 'all') => {
    stopAllAudio();
    loopTokenRef.current++;
    setSelectedLevel(lvl);
    setShuffleSeed(Date.now());
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const isCurrentLearned = currentWord ? learnedWordIds.includes(currentWord.id) : false;
  const isCurrentFav = currentWord ? favoriteWordIds.includes(currentWord.id) : false;

  // Active audio speaking states for equalizer wave
  const isSpeakingChinese = currentStep === 'word_cn' || currentStep === 'sentence_cn';
  const isSpeakingVietnamese = currentStep === 'word_vi' || currentStep === 'sentence_vi';
  const isAnyPause =
    currentStep === 'pause_after_word' ||
    currentStep === 'pause_before_sentence' ||
    currentStep === 'pause_after_sentence';

  const remainingSeconds = Math.max(
    0,
    (delaySeconds * (100 - pauseProgress)) / 100
  ).toFixed(1);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-950 via-[#13111c] to-[#0a0a0f] text-white min-h-0 select-none overflow-hidden relative">
      {/* Top Header Bar */}
      <header className="shrink-0 px-3 sm:px-6 py-2 sm:py-2.5 border-b border-white/10 flex items-center justify-between backdrop-blur-md bg-black/30 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs sm:text-sm font-semibold"
            title="Quay lại"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Thoát</span>
          </button>

          <div className="flex items-center gap-1.5 ml-1">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-purple-500/30">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                <span>Chế Độ Rảnh Tay</span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Từ + Nghĩa + Ví dụ
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Right Settings & Drawer triggers */}
        <div className="flex items-center gap-1.5">
          {/* Settings Trigger */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1 cursor-pointer ${
              showSettings
                ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
            title="Cài đặt khoảng nghỉ và tốc độ"
          >
            <Sliders className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline font-semibold">{delaySeconds}s • {speed}x</span>
          </button>

          {/* Word List Drawer Trigger */}
          <button
            onClick={() => setShowDrawer(true)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Xem danh sách toàn bộ từ vựng"
          >
            <ListMusic className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline font-semibold">
              {activeWordList.length} từ
            </span>
          </button>
        </div>
      </header>

      {/* 4 HSK Level Selector Tabs (Tương đương 4 HSK) */}
      <div className="shrink-0 px-3 py-1.5 bg-white/[0.03] border-b border-white/5 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar z-10">
        <div className="flex items-center gap-1.5 sm:gap-2 mx-auto max-w-lg w-full justify-between">
          {([1, 2, 3, 4] as const).map((lvl) => {
            const count = allWords.filter((w) => w.level === lvl).length;
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleSelectLevel(lvl)}
                className={`flex-1 py-1 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all text-center flex flex-col items-center cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/40 border border-purple-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                <span>HSK {lvl}</span>
                <span className={`text-[9px] sm:text-[10px] font-normal ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                  {count} từ
                </span>
              </button>
            );
          })}

          <button
            onClick={() => handleSelectLevel('all')}
            className={`py-1 px-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-center flex flex-col items-center cursor-pointer active:scale-95 ${
              selectedLevel === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/30 border border-amber-400/50'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
            }`}
          >
            <span>Tất cả</span>
            <span className={`text-[9px] sm:text-[10px] font-normal ${selectedLevel === 'all' ? 'text-amber-200' : 'text-slate-500'}`}>
              {allWords.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Player Visual Stage */}
      <div className="flex-1 flex flex-col items-center justify-between p-2.5 sm:p-5 max-w-xl mx-auto w-full min-h-0 overflow-y-auto no-scrollbar">
        {/* Visual 4-Step Cycle Indicator Bar */}
        <div className="w-full max-w-md shrink-0 flex items-center justify-between px-1 my-1 text-[11px] sm:text-xs font-bold z-10 gap-1 select-none">
          <div
            className={`flex-1 py-1 px-1.5 rounded-xl border text-center transition-all ${
              currentStep === 'word_cn'
                ? 'bg-purple-600 text-white border-purple-400 shadow-sm shadow-purple-500/40 ring-1 ring-purple-400'
                : currentStep === 'pause_after_word'
                ? 'bg-purple-950/50 text-purple-300 border-purple-500/40'
                : 'bg-white/[0.04] text-slate-500 border-white/5'
            }`}
          >
            1. Từ Trung
          </div>
          <span className="text-slate-600 text-[10px]">→</span>
          <div
            className={`flex-1 py-1 px-1.5 rounded-xl border text-center transition-all ${
              currentStep === 'word_vi'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm shadow-emerald-500/40 ring-1 ring-emerald-400'
                : currentStep === 'pause_before_sentence'
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                : 'bg-white/[0.04] text-slate-500 border-white/5'
            }`}
          >
            2. Nghĩa Từ
          </div>
          <span className="text-slate-600 text-[10px]">→</span>
          <div
            className={`flex-1 py-1 px-1.5 rounded-xl border text-center transition-all ${
              currentStep === 'sentence_cn'
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm shadow-indigo-500/40 ring-1 ring-indigo-400'
                : currentStep === 'pause_after_sentence'
                ? 'bg-indigo-950/50 text-indigo-300 border-indigo-500/40'
                : 'bg-white/[0.04] text-slate-500 border-white/5'
            }`}
          >
            3. Câu Ví Dụ
          </div>
          <span className="text-slate-600 text-[10px]">→</span>
          <div
            className={`flex-1 py-1 px-1.5 rounded-xl border text-center transition-all ${
              currentStep === 'sentence_vi'
                ? 'bg-teal-600 text-white border-teal-400 shadow-sm shadow-teal-500/40 ring-1 ring-teal-400'
                : 'bg-white/[0.04] text-slate-500 border-white/5'
            }`}
          >
            4. Nghĩa Câu
          </div>
        </div>

        {/* Dynamic Status / Step Banner */}
        <div className="w-full shrink-0 flex items-center justify-center my-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs shadow-inner">
            {isPlaying ? (
              currentStep === 'word_cn' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  <span className="text-purple-300 font-bold">1. Đang phát từ vựng tiếng Trung</span>
                </>
              ) : currentStep === 'pause_after_word' ? (
                <>
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-amber-300 font-bold">2. Nhớ nghĩa từ trong {remainingSeconds}s...</span>
                </>
              ) : currentStep === 'word_vi' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 font-bold">3. Đang đọc nghĩa tiếng Việt của từ</span>
                </>
              ) : currentStep === 'pause_before_sentence' ? (
                <>
                  <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  <span className="text-indigo-300 font-bold">4. Chuẩn bị nghe câu ví dụ trong {remainingSeconds}s...</span>
                </>
              ) : currentStep === 'sentence_cn' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  <span className="text-indigo-300 font-bold">5. Đang đọc câu ví dụ tiếng Trung</span>
                </>
              ) : currentStep === 'pause_after_sentence' ? (
                <>
                  <Clock className="w-3.5 h-3.5 text-teal-400 animate-spin" />
                  <span className="text-teal-300 font-bold">6. Đoán nghĩa câu ví dụ trong {remainingSeconds}s...</span>
                </>
              ) : currentStep === 'sentence_vi' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-teal-300 font-bold">7. Đang đọc nghĩa của câu ví dụ</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  <span className="text-indigo-300 font-medium">Chuyển sang từ tiếp theo...</span>
                </>
              )
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-300 font-semibold">Đang tạm dừng • Bấm Play để tiếp tục</span>
              </>
            )}
          </div>
        </div>

        {/* Word & Example Sentence Hero Card */}
        <div className="relative w-full max-w-md bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col items-center justify-center my-auto overflow-hidden group">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top card row: Category, Word Count & Fav/Learned buttons */}
          <div className="w-full flex items-center justify-between mb-2 text-xs z-10">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30 text-[11px]">
                HSK {currentWord?.level} • {currentWord?.category}
              </span>
              {isRandomOrder && (
                <button
                  onClick={handleReshuffleList}
                  className="px-2 py-0.5 rounded-full bg-indigo-500/20 hover:bg-indigo-500/35 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  title="Đang bật thứ tự ngẫu nhiên. Bấm để xáo trộn lại!"
                >
                  <Shuffle className="w-2.5 h-2.5 text-indigo-300" />
                  <span>Ngẫu nhiên</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Word Count Index */}
              <span className="text-slate-400 text-xs font-mono font-bold">
                #{currentIndex + 1} / {activeWordList.length}
              </span>

              {/* Bookmark */}
              {currentWord && (
                <button
                  onClick={() => onToggleFavorite(currentWord.id)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isCurrentFav
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-amber-400'
                  }`}
                  title={isCurrentFav ? 'Đã yêu thích' : 'Lưu yêu thích'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isCurrentFav ? 'fill-amber-400' : ''}`} />
                </button>
              )}

              {/* Learned check */}
              {currentWord && (
                <button
                  onClick={() => onToggleLearned(currentWord.id)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isCurrentLearned
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-emerald-400'
                  }`}
                  title={isCurrentLearned ? 'Đã thuộc từ này' : 'Đánh dấu đã thuộc'}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentLearned ? 'fill-emerald-400 text-slate-900' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Audio Equalizer dancing wave (animates when audio is actively speaking) */}
          <div className="h-5 flex items-center gap-1 my-1 z-10">
            {[40, 75, 55, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isPlaying && (isSpeakingChinese || isSpeakingVietnamese)
                    ? isSpeakingChinese
                      ? 'bg-purple-400 animate-pulse'
                      : 'bg-emerald-400 animate-pulse'
                    : 'bg-white/20 h-1.5'
                }`}
                style={{
                  height:
                    isPlaying && (isSpeakingChinese || isSpeakingVietnamese)
                      ? `${Math.max(6, Math.sin((i + 1) * 1.5) * 16 + 8)}px`
                      : '4px'
                }}
              />
            ))}
          </div>

          {/* Chinese Character (Hanzi) - Huge Bold Font */}
          <div
            onClick={handleReplayCurrent}
            className="cursor-pointer group/word relative my-1 select-none z-10 text-center"
            title="Bấm để nghe lại từ này"
          >
            <div
              className={`text-5xl sm:text-6xl font-bold font-chinese tracking-wide drop-shadow-md transition-colors ${
                currentStep === 'word_cn'
                  ? 'text-purple-300 scale-105'
                  : 'text-white group-hover/word:text-purple-300'
              }`}
            >
              {currentWord?.hanzi}
            </div>

            {/* Pinyin with tone marks */}
            <div className="text-lg sm:text-xl font-bold text-purple-400 mt-0.5 tracking-wider">
              {currentWord?.pinyin}
            </div>

            {/* Han Viet */}
            <div className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded-md inline-block mt-0.5 font-medium border border-white/5">
              Hán Việt: {currentWord?.hanViet}
            </div>
          </div>

          {/* 2-Second Thinking Countdown Progress Bar */}
          <div className="w-full mt-2 mb-1.5 z-10">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-300 font-medium flex items-center gap-1">
                {currentStep === 'pause_after_word' ? (
                  <>
                    <Clock className="w-3 h-3 text-amber-400 animate-spin" />
                    <span>🧠 Tự nhớ nghĩa từ vựng:</span>
                  </>
                ) : currentStep === 'pause_before_sentence' ? (
                  <>
                    <Clock className="w-3 h-3 text-indigo-400 animate-spin" />
                    <span>🧠 Chuẩn bị nghe câu ví dụ:</span>
                  </>
                ) : currentStep === 'pause_after_sentence' ? (
                  <>
                    <Clock className="w-3 h-3 text-teal-400 animate-spin" />
                    <span>🧠 Tự đoán nghĩa câu ví dụ:</span>
                  </>
                ) : (
                  <span>Nghĩa tiếng Việt của từ:</span>
                )}
              </span>
              {isAnyPause && (
                <span className="text-amber-400 font-bold font-mono text-xs">
                  {remainingSeconds}s
                </span>
              )}
            </div>

            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div
                className={`h-full transition-all duration-75 ${
                  currentStep === 'pause_after_word'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400'
                    : currentStep === 'pause_before_sentence'
                    ? 'bg-gradient-to-r from-indigo-400 to-purple-400'
                    : currentStep === 'pause_after_sentence'
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                    : currentStep === 'word_vi' || currentStep === 'sentence_vi' || currentStep === 'interval'
                    ? 'w-full bg-emerald-400'
                    : 'w-0'
                }`}
                style={{
                  width: isAnyPause
                    ? `${pauseProgress}%`
                    : currentStep === 'word_vi' || currentStep === 'sentence_vi' || currentStep === 'interval'
                    ? '100%'
                    : '0%'
                }}
              />
            </div>
          </div>

          {/* Vietnamese Word Meaning Card */}
          <div
            className={`w-full p-2.5 sm:p-3 rounded-2xl border text-center z-10 transition-all duration-300 mt-1 ${
              currentStep === 'word_vi'
                ? 'bg-emerald-950/40 border-emerald-400/60 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/50'
                : 'bg-white/[0.04] border-white/10'
            }`}
          >
            <div
              className={`text-base sm:text-lg font-bold transition-all duration-300 ${
                currentStep === 'word_vi' ? 'text-emerald-300 scale-102' : 'text-slate-200'
              }`}
            >
              {currentWord?.meaning}
            </div>

            {currentWord?.type && (
              <div className="text-[10px] text-slate-400 mt-0.5">
                Loại từ: {currentWord.type}
              </div>
            )}
          </div>

          {/* Example Sentence Card (Câu Ví Dụ + Nghĩa Cách nhau 2s) */}
          {currentExample && (
            <div
              className={`w-full p-3 rounded-2xl border transition-all duration-300 mt-2.5 text-left z-10 ${
                currentStep === 'sentence_cn'
                  ? 'bg-indigo-950/45 border-indigo-400/60 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-950/50'
                  : currentStep === 'sentence_vi'
                  ? 'bg-teal-950/45 border-teal-400/60 ring-2 ring-teal-500/30 shadow-lg shadow-teal-950/50'
                  : currentStep === 'pause_after_sentence'
                  ? 'bg-amber-950/30 border-amber-500/40 shadow-md'
                  : 'bg-white/[0.03] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="flex items-center gap-1.5 font-bold text-indigo-300">
                  <Quote className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Câu ví dụ:</span>
                </span>
                {currentStep === 'sentence_cn' && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px] animate-pulse">
                    Đang phát ví dụ
                  </span>
                )}
                {currentStep === 'pause_after_sentence' && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] animate-pulse font-mono">
                    Đoán nghĩa: {remainingSeconds}s
                  </span>
                )}
                {currentStep === 'sentence_vi' && (
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold text-[10px] animate-pulse">
                    Đang đọc nghĩa câu
                  </span>
                )}
              </div>

              {/* Chinese Sentence with Keyword Highlighted */}
              <div className="text-sm sm:text-base font-bold font-chinese tracking-wide text-white">
                <HighlightText
                  text={currentExample.hz}
                  highlight={currentWord.hanzi}
                  highlightClassName="text-amber-300 font-black underline decoration-amber-400/60 decoration-2"
                />
              </div>

              {/* Sentence Pinyin */}
              <div className="text-xs font-semibold text-purple-300/90 mt-0.5 tracking-wide">
                {currentExample.py}
              </div>

              {/* Sentence Vietnamese Translation */}
              <div
                className={`mt-1.5 pt-1.5 border-t border-white/10 text-xs sm:text-sm font-medium transition-all duration-300 ${
                  currentStep === 'sentence_vi'
                    ? 'text-teal-200 font-bold scale-[1.01]'
                    : currentStep === 'pause_after_sentence'
                    ? 'text-amber-300/90 italic font-semibold flex items-center gap-1'
                    : 'text-slate-300'
                }`}
              >
                {currentStep === 'pause_after_sentence' ? (
                  <>
                    <Clock className="w-3 h-3 text-amber-400 animate-spin" />
                    <span>Nghĩ nghĩa câu này trước khi nghe... ({remainingSeconds}s)</span>
                  </>
                ) : (
                  currentExample.vi
                )}
              </div>
            </div>
          )}
        </div>

        {/* Timeline Scrubbing Bar */}
        <div className="w-full max-w-md my-1.5 shrink-0 z-10">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
            <span>Từ #{currentIndex + 1}</span>
            <span>Tổng {activeWordList.length} từ</span>
          </div>

          <input
            type="range"
            min={0}
            max={Math.max(0, activeWordList.length - 1)}
            value={currentIndex}
            onChange={(e) => {
              stopAllAudio();
              loopTokenRef.current++;
              setCurrentIndex(Number(e.target.value));
            }}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Primary Music Player Controls */}
        <div className="w-full max-w-md flex items-center justify-between gap-3 my-1.5 z-10">
          {/* Shuffle / Re-randomize Button */}
          <button
            onClick={() => {
              handleReshuffleList();
            }}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              isRandomOrder
                ? 'bg-purple-600/30 text-purple-300 border border-purple-400/40 shadow-xs ring-1 ring-purple-400/30 hover:bg-purple-600/40'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Đang bật thứ tự ngẫu nhiên (Bấm để xáo trộn lại danh sách mới)"
          >
            <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Previous Word */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 text-white transition-all border border-white/10 cursor-pointer shadow-md"
            title="Từ trước đó"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Big Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/50 ring-4 ring-purple-500/20'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/50 ring-4 ring-emerald-500/20'
            }`}
            title={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
            ) : (
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
            )}
          </button>

          {/* Next Word */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 text-white transition-all border border-white/10 cursor-pointer shadow-md"
            title="Từ tiếp theo"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Repeat Mode Toggle */}
          <button
            onClick={() => {
              if (playMode === 'sequence') setPlayMode('repeat_one');
              else if (playMode === 'repeat_one') setPlayMode('sequence');
              else setPlayMode('repeat_one');
            }}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              playMode === 'repeat_one'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-400/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title={playMode === 'repeat_one' ? 'Đang lặp lại 1 từ này' : 'Lặp lại toàn bộ'}
          >
            {playMode === 'repeat_one' ? (
              <Repeat1 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* Bottom Quick Action: Luyện viết & nói for this word */}
        {onSelectWordToPractice && currentWord && (
          <div className="shrink-0 my-0.5 z-10">
            <button
              onClick={() => {
                stopAllAudio();
                onSelectWordToPractice(currentWord);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5 text-purple-400" />
              <span>Chuyển sang Luyện viết & chấm điểm từ này</span>
            </button>
          </div>
        )}
      </div>

      {/* Settings Modal / Overlay */}
      {showSettings && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c1a24] border border-white/15 rounded-3xl p-5 max-w-sm w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm">Cài Đặt Rảnh Tay</h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Khoảng nghỉ giữa các bước (Delay) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">Khoảng nghỉ giữa các bước:</span>
                <span className="font-bold text-amber-400 font-mono">{delaySeconds} giây</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[1.5, 2.0, 2.5, 3.0].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setDelaySeconds(sec)}
                    className={`py-1.5 rounded-xl font-bold text-xs transition-all ${
                      delaySeconds === sec
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {sec}s {sec === 2.0 ? '★' : ''}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1 italic">
                (Khuyên dùng 2s: Đủ thời gian để não bộ tự tư duy nghĩa từ và câu ví dụ)
              </p>
            </div>

            {/* Tốc độ đọc audio (Playback speed) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">Tốc độ phát âm:</span>
                <span className="font-bold text-purple-400 font-mono">{speed}x</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[0.8, 1.0, 1.2].map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setSpeed(sp)}
                    className={`py-1.5 rounded-xl font-bold text-xs transition-all ${
                      speed === sp
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {sp === 0.8 ? '0.8x (Chậm)' : sp === 1.0 ? '1.0x (Chuẩn)' : '1.2x (Nhanh)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Lọc danh sách phát */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1.5">Nội dung danh sách phát:</div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`py-1.5 px-1 rounded-xl text-xs font-semibold transition-all ${
                    filterMode === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Tất cả từ
                </button>
                <button
                  onClick={() => setFilterMode('unlearned')}
                  className={`py-1.5 px-1 rounded-xl text-xs font-semibold transition-all ${
                    filterMode === 'unlearned'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Chưa thuộc
                </button>
                <button
                  onClick={() => setFilterMode('favorite')}
                  className={`py-1.5 px-1 rounded-xl text-xs font-semibold transition-all ${
                    filterMode === 'favorite'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  Yêu thích
                </button>
              </div>
            </div>

            {/* Thứ tự danh sách từ (Mặc định: Ngẫu nhiên mỗi lần mở) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">Thứ tự danh sách:</span>
                <span className="font-bold text-indigo-400">
                  {isRandomOrder ? '🎲 Ngẫu nhiên' : '📋 Thứ tự HSK'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    setIsRandomOrder(true);
                    setShuffleSeed(Date.now());
                    setCurrentIndex(0);
                  }}
                  className={`py-1.5 px-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 ${
                    isRandomOrder
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Ngẫu nhiên (Mặc định)</span>
                </button>
                <button
                  onClick={() => {
                    setIsRandomOrder(false);
                    setCurrentIndex(0);
                  }}
                  className={`py-1.5 px-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 ${
                    !isRandomOrder
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <span>Tuần tự #1 → #150</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 italic">
                {isRandomOrder
                  ? 'Mỗi lần vào web danh sách sẽ tự động xáo trộn khác nhau để học không bị nhàm chán.'
                  : 'Phát lần lượt theo số thứ tự từ điển HSK.'}
              </p>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-xs text-white shadow-md active:scale-95 cursor-pointer"
            >
              Hoàn tất & Tiếp tục nghe
            </button>
          </div>
        </div>
      )}

      {/* Word List Drawer (Danh sách toàn bộ từ của HSK) */}
      {showDrawer && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col animate-in fade-in duration-200">
          <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5 flex-wrap">
                <span>Danh sách từ {selectedLevel === 'all' ? 'tất cả HSK' : `HSK ${selectedLevel}`}</span>
                {isRandomOrder && (
                  <span className="px-1.5 py-0.2 rounded-md bg-indigo-500/20 text-indigo-300 font-bold text-[10px] border border-indigo-500/30">
                    🎲 Ngẫu nhiên
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                {activeWordList.length} từ vựng • Bấm từ bất kỳ để phát ngay
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {isRandomOrder && (
                <button
                  onClick={handleReshuffleList}
                  className="px-2.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-300 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  title="Xáo trộn thứ tự mới"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xáo trộn lại</span>
                </button>
              )}
              <button
                onClick={() => setShowDrawer(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {activeWordList.map((word, idx) => {
              const isSelected = idx === currentIndex;
              const isDone = learnedWordIds.includes(word.id);
              return (
                <div
                  key={word.id}
                  onClick={() => {
                    stopAllAudio();
                    loopTokenRef.current++;
                    setCurrentIndex(idx);
                    setIsPlaying(true);
                    setShowDrawer(false);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-400 w-7">
                      #{idx + 1}
                    </span>
                    <span className="text-xl font-bold font-chinese tracking-wide">
                      {word.hanzi}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-purple-400 truncate">
                        {word.pinyin}
                      </div>
                      <div className="text-xs text-slate-300 truncate font-medium">
                        {word.meaning}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isSelected && isPlaying && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mr-1" />
                    )}
                    {isDone && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Đã học
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
