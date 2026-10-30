import React, { useState, useEffect } from 'react';
import { HSK_WORDS } from './data/hskData';
import { HSKWord, UserStats } from './types';
import { WordList } from './components/WordList';
import { HanziPractice } from './components/HanziPractice';
import { LandingPage } from './components/LandingPage';
import {
  Smartphone,
  Monitor,
  BookOpen,
  LayoutGrid,
  Sparkles,
  Award,
  Home
} from 'lucide-react';

const STATS_STORAGE_KEY = 'chinese_hsk_user_stats_v1';

const getInitialStats = (): UserStats => {
  try {
    const saved = localStorage.getItem(STATS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        learnedWordIds: parsed.learnedWordIds || [],
        favoriteWordIds: parsed.favoriteWordIds || [],
        practiceCount: parsed.practiceCount || {},
        lastPracticed: parsed.lastPracticed || {},
        pronunciationScores: parsed.pronunciationScores || {}
      };
    }
  } catch (e) {
    console.error('Failed to load stats:', e);
  }
  return {
    learnedWordIds: [],
    favoriteWordIds: [],
    practiceCount: {},
    lastPracticed: {},
    pronunciationScores: {}
  };
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'study'>('landing');
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3 | 4>(1);
  const [selectedWord, setSelectedWord] = useState<HSKWord | null>(null);
  const [userStats, setUserStats] = useState<UserStats>(getInitialStats);
  const [phoneFrame, setPhoneFrame] = useState(false);

  // Save stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(userStats));
    } catch (e) {
      console.error('Failed to save stats:', e);
    }
  }, [userStats]);

  // Toggle favorite
  const handleToggleFavorite = (wordId: string) => {
    setUserStats((prev) => {
      const isFav = prev.favoriteWordIds.includes(wordId);
      return {
        ...prev,
        favoriteWordIds: isFav
          ? prev.favoriteWordIds.filter((id) => id !== wordId)
          : [...prev.favoriteWordIds, wordId]
      };
    });
  };

  // Toggle learned
  const handleToggleLearned = (wordId: string) => {
    setUserStats((prev) => {
      const isLearned = prev.learnedWordIds.includes(wordId);
      return {
        ...prev,
        learnedWordIds: isLearned
          ? prev.learnedWordIds.filter((id) => id !== wordId)
          : [...prev.learnedWordIds, wordId]
      };
    });
  };

  // Record practice
  const handleRecordPractice = (wordId: string) => {
    setUserStats((prev) => ({
      ...prev,
      practiceCount: {
        ...prev.practiceCount,
        [wordId]: (prev.practiceCount[wordId] || 0) + 1
      },
      lastPracticed: {
        ...prev.lastPracticed,
        [wordId]: new Date().toISOString()
      }
    }));
  };

  // Record highest pronunciation score
  const handleSaveScore = (wordId: string, score: number) => {
    setUserStats((prev) => {
      const currentBest = prev.pronunciationScores?.[wordId] || 0;
      return {
        ...prev,
        pronunciationScores: {
          ...prev.pronunciationScores,
          [wordId]: Math.max(currentBest, score)
        }
      };
    });
  };

  // Handle landing page card selection
  const handleSelectLevelGroup = (level: '1' | '2' | '3' | '4') => {
    const num = parseInt(level, 10) as 1 | 2 | 3 | 4;
    setCurrentLevel(num);
    setSelectedWord(null);
    setCurrentView('study');
  };

  // Active level words & totals for landing page
  const activeLevelWords = HSK_WORDS.filter((w) => w.level === currentLevel);
  const hsk1Total = HSK_WORDS.filter((w) => w.level === 1).length;
  const hsk2Total = HSK_WORDS.filter((w) => w.level === 2).length;
  const hsk3Total = HSK_WORDS.filter((w) => w.level === 3).length;
  const hsk4Total = HSK_WORDS.filter((w) => w.level === 4).length;
  const totalLearned = userStats.learnedWordIds.length;

  // Navigation between words in practice mode (strictly within current HSK level)
  const currentIndex = selectedWord
    ? activeLevelWords.findIndex((w) => w.id === selectedWord.id)
    : -1;

  const handleNextWord = () => {
    if (currentIndex >= 0 && currentIndex < activeLevelWords.length - 1) {
      setSelectedWord(activeLevelWords[currentIndex + 1]);
    } else {
      setSelectedWord(activeLevelWords[0]); // Loop back to start of current level
    }
  };

  const handlePrevWord = () => {
    if (currentIndex > 0) {
      setSelectedWord(activeLevelWords[currentIndex - 1]);
    } else {
      setSelectedWord(activeLevelWords[activeLevelWords.length - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#1c1b1f] text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div
            onClick={() => {
              setSelectedWord(null);
              setCurrentView('landing');
            }}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center font-bold text-lg font-chinese shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              文
            </div>
            <div>
              <span className="font-bold text-white text-base">Hán Tự Master</span>
              <span className="hidden sm:inline text-xs text-amber-400 font-semibold ml-2 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                HSK {currentLevel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Home / Landing Page Toggle Button */}
            <button
              onClick={() => {
                setSelectedWord(null);
                setCurrentView('landing');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'landing' && !selectedWord
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>4 Cấp độ HSK</span>
            </button>

            {/* Current Level Vocabulary Button */}
            <button
              onClick={() => {
                setSelectedWord(null);
                setCurrentView('study');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'study' && !selectedWord
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>HSK {currentLevel} ({activeLevelWords.length})</span>
            </button>

            {/* View Mode Toggle: Phone Frame vs Full Responsive (when in practice mode) */}
            {selectedWord && (
              <button
                onClick={() => setPhoneFrame(!phoneFrame)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Chuyển đổi kiểu khung điện thoại"
              >
                {phoneFrame ? <Monitor className="w-3.5 h-3.5 text-amber-400" /> : <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{phoneFrame ? 'Giao diện Web rộng' : 'Khung điện thoại'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col">
        {selectedWord ? (
          // Practice Mode
          <div className="flex-1 flex items-center justify-center py-4 px-2 sm:px-6 bg-slate-100">
            {phoneFrame ? (
              // Mobile Mockup Frame
              <div className="relative border-[10px] border-slate-900 rounded-[44px] shadow-2xl overflow-hidden bg-slate-900 w-full max-w-[390px] ring-1 ring-slate-800">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-800 rounded-full" />
                </div>
                <div className="pt-3 h-[720px] overflow-hidden bg-white rounded-[34px] flex flex-col w-full min-w-0">
                  <HanziPractice
                    word={selectedWord}
                    onBack={() => setSelectedWord(null)}
                    onNextWord={handleNextWord}
                    onPrevWord={handlePrevWord}
                    isFavorite={userStats.favoriteWordIds.includes(selectedWord.id)}
                    isLearned={userStats.learnedWordIds.includes(selectedWord.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleLearned={handleToggleLearned}
                    onRecordPractice={handleRecordPractice}
                    bestScore={userStats.pronunciationScores?.[selectedWord.id]}
                    onSaveScore={handleSaveScore}
                    isPhoneMode={true}
                  />
                </div>
              </div>
            ) : (
              // Standard Clean Responsive Studio View for Desktop Web
              <div className="w-full max-w-4xl py-2 sm:py-6">
                <HanziPractice
                  word={selectedWord}
                  onBack={() => setSelectedWord(null)}
                  onNextWord={handleNextWord}
                  onPrevWord={handlePrevWord}
                  isFavorite={userStats.favoriteWordIds.includes(selectedWord.id)}
                  isLearned={userStats.learnedWordIds.includes(selectedWord.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleLearned={handleToggleLearned}
                  onRecordPractice={handleRecordPractice}
                  bestScore={userStats.pronunciationScores?.[selectedWord.id]}
                  onSaveScore={handleSaveScore}
                  isPhoneMode={false}
                />
              </div>
            )}
          </div>
        ) : currentView === 'landing' ? (
          // Landing Page with 4 HSK cards (matching user's uploaded screenshot)
          <LandingPage
            onSelectLevel={handleSelectLevelGroup}
            hsk1Total={hsk1Total}
            hsk2Total={hsk2Total}
            hsk3Total={hsk3Total}
            hsk4Total={hsk4Total}
            totalLearned={totalLearned}
          />
        ) : (
          // Word List and Filters strictly scoped to currentLevel
          <div className="bg-slate-100 flex-1">
            <WordList
              words={HSK_WORDS}
              currentLevel={currentLevel}
              userStats={userStats}
              onSelectWord={(word) => setSelectedWord(word)}
              onToggleFavorite={handleToggleFavorite}
              onToggleLearned={handleToggleLearned}
              onBackToLanding={() => setCurrentView('landing')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-white/10 bg-[#161518] text-center text-xs text-slate-400">
        Ứng dụng Học Tiếng Trung HSK 1, HSK 2, HSK 3 & HSK 4 • Luyện viết nét chuẩn, Phát âm & Chấm điểm AI
      </footer>
    </div>
  );
};
