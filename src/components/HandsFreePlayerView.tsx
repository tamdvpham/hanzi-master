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
  Check
} from 'lucide-react';
import { HSKWord } from '../types';
import { playChineseAudio, playVietnameseAudio, preloadChineseAudio, preloadVietnameseAudio, stopAllAudio } from '../utils/audio';

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

  // Filter words based on selected level and filterMode
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

    return list;
  }, [allWords, selectedLevel, filterMode, learnedWordIds, favoriteWordIds]);

  // Current playing word index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Audio Playback state
  const [isPlaying, setIsPlaying] = useState(true);

  // Step in the hands-free cycle:
  // 'chinese' -> speaking Chinese Hanzi & Pinyin
  // 'pause' -> 2-second thinking pause for user to recall meaning
  // 'vietnamese' -> speaking Vietnamese translation
  // 'interval' -> short 1s breather before next word
  const [currentStep, setCurrentStep] = useState<'chinese' | 'pause' | 'vietnamese' | 'interval'>('chinese');

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

  // Keep currentIndex bounded when activeWordList changes
  useEffect(() => {
    if (currentIndex >= activeWordList.length && activeWordList.length > 0) {
      setCurrentIndex(0);
    }
  }, [activeWordList.length, currentIndex]);

  // Preload audio for upcoming 2 words in background for zero lag
  useEffect(() => {
    if (!activeWordList || activeWordList.length === 0) return;
    const nextIdx1 = (currentIndex + 1) % activeWordList.length;
    const nextIdx2 = (currentIndex + 2) % activeWordList.length;
    const w1 = activeWordList[nextIdx1];
    const w2 = activeWordList[nextIdx2];
    if (w1) {
      preloadChineseAudio(w1.hanzi);
      preloadVietnameseAudio(w1.meaning);
    }
    if (w2) {
      preloadChineseAudio(w2.hanzi);
      preloadVietnameseAudio(w2.meaning);
    }
  }, [currentIndex, activeWordList]);

  // Main Hands-Free Playback Loop Orchestrator
  useEffect(() => {
    if (!isPlaying || !currentWord) {
      stopAllAudio();
      return;
    }

    const currentToken = ++loopTokenRef.current;
    let isCancelled = false;

    const runPlaybackCycle = async () => {
      try {
        if (isCancelled || loopTokenRef.current !== currentToken) return;

        // Step 1: Speak Chinese (Hanzi & Pinyin)
        setCurrentStep('chinese');
        setPauseProgress(0);

        // Update mobile lock screen media session
        if ('mediaSession' in navigator && currentWord) {
          try {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: `${currentWord.hanzi} (${currentWord.pinyin})`,
              artist: `${currentWord.meaning} • HSK ${currentWord.level}`,
              album: 'Hán Tự Master - Chế độ Rảnh tay'
            });
          } catch (e) {}
        }

        await playChineseAudio(currentWord.hanzi, speed);
        if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

        // Step 2: Thinking Pause (Default 2 seconds)
        setCurrentStep('pause');
        const totalPauseMs = delaySeconds * 1000;
        const tickIntervalMs = 50;
        const steps = Math.floor(totalPauseMs / tickIntervalMs);

        for (let i = 0; i <= steps; i++) {
          if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;
          setPauseProgress((i / steps) * 100);
          await new Promise((r) => setTimeout(r, tickIntervalMs));
        }

        if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

        // Step 3: Speak Vietnamese Meaning
        setCurrentStep('vietnamese');
        await playVietnameseAudio(currentWord.meaning, speed);
        if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

        // Step 4: Breather interval before advancing
        setCurrentStep('interval');
        await new Promise((r) => setTimeout(r, 900));
        if (isCancelled || loopTokenRef.current !== currentToken || !isPlayingRef.current) return;

        // Step 5: Advance to next word
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
      // Re-trigger the same index
      loopTokenRef.current++;
      setCurrentStep('chinese');
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
    setCurrentStep('chinese');
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

  // Change HSK Level
  const handleSelectLevel = (lvl: 1 | 2 | 3 | 4 | 'all') => {
    stopAllAudio();
    loopTokenRef.current++;
    setSelectedLevel(lvl);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const isCurrentLearned = currentWord ? learnedWordIds.includes(currentWord.id) : false;
  const isCurrentFav = currentWord ? favoriteWordIds.includes(currentWord.id) : false;

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-950 via-[#13111c] to-[#0a0a0f] text-white min-h-0 select-none overflow-hidden relative">
      {/* Top Header Bar */}
      <header className="shrink-0 px-3 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 flex items-center justify-between backdrop-blur-md bg-black/30 z-20">
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
                  Tự động phát
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
      <div className="shrink-0 px-3 py-2 bg-white/[0.03] border-b border-white/5 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar z-10">
        <div className="flex items-center gap-1.5 sm:gap-2 mx-auto max-w-lg w-full justify-between">
          {([1, 2, 3, 4] as const).map((lvl) => {
            const count = allWords.filter((w) => w.level === lvl).length;
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleSelectLevel(lvl)}
                className={`flex-1 py-1 sm:py-1.5 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all text-center flex flex-col items-center cursor-pointer active:scale-95 ${
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
            className={`py-1 sm:py-1.5 px-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-center flex flex-col items-center cursor-pointer active:scale-95 ${
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
      <div className="flex-1 flex flex-col items-center justify-between p-3 sm:p-6 max-w-xl mx-auto w-full min-h-0 overflow-y-auto no-scrollbar">
        {/* Dynamic Status / Step Banner */}
        <div className="w-full shrink-0 flex items-center justify-center my-1 sm:my-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs shadow-inner">
            {isPlaying ? (
              currentStep === 'chinese' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  <span className="text-purple-300 font-bold">1. Đang phát âm tiếng Trung</span>
                </>
              ) : currentStep === 'pause' ? (
                <>
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-amber-300 font-bold">2. Nhớ nghĩa trong {delaySeconds}s...</span>
                </>
              ) : currentStep === 'vietnamese' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 font-bold">3. Đang đọc nghĩa tiếng Việt</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  <span className="text-indigo-300 font-medium">Chuẩn bị từ tiếp theo...</span>
                </>
              )
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-300 font-semibold">Đang tạm dừng • Bấm Play để nghe tiếp</span>
              </>
            )}
          </div>
        </div>

        {/* Word Hero Card (Music Player Album Art style) */}
        <div className="relative w-full max-w-md bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col items-center justify-center my-auto overflow-hidden group">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top card row: Category, Word Count & Fav/Learned buttons */}
          <div className="w-full flex items-center justify-between mb-3 text-xs z-10">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30 text-[11px]">
              HSK {currentWord?.level} • {currentWord?.category}
            </span>

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
          <div className="h-6 flex items-center gap-1 my-1 z-10">
            {[40, 75, 55, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isPlaying && (currentStep === 'chinese' || currentStep === 'vietnamese')
                    ? currentStep === 'chinese'
                      ? 'bg-purple-400 animate-pulse'
                      : 'bg-emerald-400 animate-pulse'
                    : 'bg-white/20 h-1.5'
                }`}
                style={{
                  height:
                    isPlaying && (currentStep === 'chinese' || currentStep === 'vietnamese')
                      ? `${Math.max(6, Math.sin((i + 1) * 1.5) * 18 + 10)}px`
                      : '4px'
                }}
              />
            ))}
          </div>

          {/* Chinese Character (Hanzi) - Huge Bold Font */}
          <div
            onClick={handleReplayCurrent}
            className="cursor-pointer group/word relative my-2 select-none z-10 text-center"
            title="Bấm để nghe lại từ này"
          >
            <div className="text-5xl sm:text-7xl font-bold font-chinese text-white tracking-wide drop-shadow-md group-hover/word:text-purple-300 transition-colors">
              {currentWord?.hanzi}
            </div>

            {/* Pinyin with tone marks */}
            <div className="text-xl sm:text-2xl font-bold text-purple-400 mt-1 tracking-wider">
              {currentWord?.pinyin}
            </div>

            {/* Han Viet */}
            <div className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded-md inline-block mt-1 font-medium border border-white/5">
              Hán Việt: {currentWord?.hanViet}
            </div>
          </div>

          {/* Thinking 2-Second Countdown Progress Bar */}
          <div className="w-full mt-3 mb-2 z-10">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-400 font-medium">
                {currentStep === 'pause' ? '🧠 Khoảng nghỉ 2s tự đoán nghĩa:' : 'Nghĩa tiếng Việt:'}
              </span>
              {currentStep === 'pause' && (
                <span className="text-amber-400 font-bold font-mono">
                  {((delaySeconds * (100 - pauseProgress)) / 100).toFixed(1)}s
                </span>
              )}
            </div>

            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div
                className={`h-full transition-all duration-75 ${
                  currentStep === 'chinese'
                    ? 'w-0'
                    : currentStep === 'pause'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400'
                    : 'w-full bg-emerald-400'
                }`}
                style={{
                  width: currentStep === 'pause' ? `${pauseProgress}%` : currentStep === 'vietnamese' ? '100%' : '0%'
                }}
              />
            </div>
          </div>

          {/* Vietnamese Meaning (Revealed with highlight effect) */}
          <div className="w-full p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center z-10 transition-all mt-1">
            <div
              className={`text-base sm:text-lg font-bold transition-all duration-300 ${
                currentStep === 'vietnamese'
                  ? 'text-emerald-300 scale-105'
                  : 'text-slate-200'
              }`}
            >
              {currentWord?.meaning}
            </div>

            {currentWord?.type && (
              <div className="text-[11px] text-slate-400 mt-0.5">
                Loại từ: {currentWord.type}
              </div>
            )}
          </div>
        </div>

        {/* Timeline Scrubbing Bar */}
        <div className="w-full max-w-md my-2 shrink-0 z-10">
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
        <div className="w-full max-w-md flex items-center justify-between gap-3 my-2 z-10">
          {/* Shuffle Toggle */}
          <button
            onClick={() => {
              setPlayMode(playMode === 'shuffle' ? 'sequence' : 'shuffle');
            }}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              playMode === 'shuffle'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-400/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title={playMode === 'shuffle' ? 'Đang bật xáo trộn ngẫu nhiên' : 'Bật xáo trộn ngẫu nhiên'}
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
            className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/50 ring-4 ring-purple-500/20'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/50 ring-4 ring-emerald-500/20'
            }`}
            title={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
            ) : (
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
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
          <div className="shrink-0 my-1 z-10">
            <button
              onClick={() => {
                stopAllAudio();
                onSelectWordToPractice(currentWord);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
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

            {/* Khoảng nghỉ giữa từ Trung & nghĩa Việt (Delay) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">Khoảng nghỉ trước khi đọc nghĩa:</span>
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
                (Khuyên dùng 2s: Đủ thời gian để não bộ tự tư duy và nhớ lại nghĩa của từ)
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
              <h3 className="font-bold text-sm text-white">
                Danh sách từ {selectedLevel === 'all' ? 'tất cả HSK' : `HSK ${selectedLevel}`}
              </h3>
              <p className="text-xs text-slate-400">
                {activeWordList.length} từ vựng • Bấm từ bất kỳ để phát ngay
              </p>
            </div>
            <button
              onClick={() => setShowDrawer(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
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
