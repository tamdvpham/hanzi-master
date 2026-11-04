import React, { useState, useEffect, useMemo } from 'react';
import { HSK_WORDS } from './data/hskData';
import { HSKWord, UserStats, UserProfile } from './types';
import { WordList } from './components/WordList';
import { HanziPractice } from './components/HanziPractice';
import { LandingPage } from './components/LandingPage';
import { QuizView } from './components/QuizView';
import { SentenceScrambleView } from './components/SentenceScrambleView';
import { HandsFreePlayerView } from './components/HandsFreePlayerView';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import confetti from 'canvas-confetti';
import { getActiveUser, updateActiveUserStats, parseQRAuthToken, loginUser } from './utils/authManager';
import {
  Smartphone,
  Monitor,
  BookOpen,
  LayoutGrid,
  Sparkles,
  Award,
  Home,
  Gamepad2,
  Layers,
  User,
  Headphones
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
  const initialActiveUser = getActiveUser();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialActiveUser);
  const [currentView, setCurrentView] = useState<'landing' | 'study' | 'quiz' | 'sentence' | 'handsfree'>('landing');
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3 | 4>(1);
  const [selectedWord, setSelectedWord] = useState<HSKWord | null>(null);
  const [userStats, setUserStats] = useState<UserStats>(() => {
    if (initialActiveUser?.stats) {
      return initialActiveUser.stats;
    }
    return getInitialStats();
  });
  const [phoneFrame, setPhoneFrame] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [qrLoginStatus, setQrLoginStatus] = useState<string | null>(null);

  // Save stats to localStorage & update active user's DB entry
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(userStats));
      if (currentUser) {
        updateActiveUserStats(userStats);
      }
    } catch (e) {
      console.error('Failed to save stats:', e);
    }
  }, [userStats, currentUser]);

  // Auto-login from QR Code link (when scanned with phone's native camera or external apps)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qrAuth = params.get('qr_auth');
      if (qrAuth) {
        setQrLoginStatus('Đang xác thực và đăng nhập tự động từ mã QR...');
        const parsed = parseQRAuthToken(qrAuth);
        if (parsed?.username) {
          window.history.replaceState({}, document.title, window.location.pathname);
          loginUser(parsed.username, parsed.password || '', userStats).then((res) => {
            if (res.success && res.user) {
              handleAuthSuccess(res.user);
              setQrLoginStatus(`Đăng nhập thành công tài khoản @${res.user.username}! 🎉`);
              setTimeout(() => setQrLoginStatus(null), 3500);
              try {
                confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
              } catch (e) {}
            } else {
              setQrLoginStatus(res.error || 'Đăng nhập từ mã QR không thành công.');
              setTimeout(() => setQrLoginStatus(null), 4000);
            }
          });
        } else {
          setQrLoginStatus('Mã QR không hợp lệ hoặc đã hết hạn.');
          setTimeout(() => setQrLoginStatus(null), 4000);
        }
      }
    } catch (e) {
      console.error('QR auto login error:', e);
      setQrLoginStatus('Có lỗi khi xử lý mã QR.');
      setTimeout(() => setQrLoginStatus(null), 3000);
    }
  }, []);

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.stats) {
      setUserStats(user.stats);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    const emptyStats: UserStats = {
      learnedWordIds: [],
      favoriteWordIds: [],
      practiceCount: {},
      lastPracticed: {},
      pronunciationScores: {}
    };
    setUserStats(emptyStats);
    try {
      localStorage.removeItem(STATS_STORAGE_KEY);
    } catch (e) {}
  };

  const handleUserUpdated = (updated: UserProfile) => {
    setCurrentUser(updated);
  };

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

  // Active level words: Unlearned words first, learned words moved to the bottom
  const activeLevelWords = useMemo(() => {
    const wordsInLevel = HSK_WORDS.filter((w) => w.level === currentLevel);
    const unlearned = wordsInLevel.filter((w) => !userStats.learnedWordIds.includes(w.id));
    const learned = wordsInLevel.filter((w) => userStats.learnedWordIds.includes(w.id));
    return [...unlearned, ...learned];
  }, [currentLevel, userStats.learnedWordIds]);

  const hsk1Total = HSK_WORDS.filter((w) => w.level === 1).length;
  const hsk2Total = HSK_WORDS.filter((w) => w.level === 2).length;
  const hsk3Total = HSK_WORDS.filter((w) => w.level === 3).length;
  const hsk4Total = HSK_WORDS.filter((w) => w.level === 4).length;
  const totalLearned = userStats.learnedWordIds.length;

  const learnedByLevel = useMemo(() => {
    return {
      1: HSK_WORDS.filter((w) => w.level === 1 && userStats.learnedWordIds.includes(w.id)).length,
      2: HSK_WORDS.filter((w) => w.level === 2 && userStats.learnedWordIds.includes(w.id)).length,
      3: HSK_WORDS.filter((w) => w.level === 3 && userStats.learnedWordIds.includes(w.id)).length,
      4: HSK_WORDS.filter((w) => w.level === 4 && userStats.learnedWordIds.includes(w.id)).length
    };
  }, [userStats.learnedWordIds]);

  // Navigation between words in practice mode (strictly within current HSK level)
  const currentIndex = selectedWord
    ? activeLevelWords.findIndex((w) => w.id === selectedWord.id)
    : -1;

  const handleNextWord = () => {
    if (activeLevelWords.length === 0) return;

    // If current word is marked as learned and there are unlearned words remaining,
    // jump directly to the next unlearned word at the top
    const isLearned = selectedWord ? userStats.learnedWordIds.includes(selectedWord.id) : false;
    const unlearned = activeLevelWords.filter((w) => !userStats.learnedWordIds.includes(w.id));

    if (isLearned && unlearned.length > 0 && (currentIndex === activeLevelWords.length - 1 || currentIndex >= unlearned.length)) {
      setSelectedWord(unlearned[0]);
      return;
    }

    if (currentIndex >= 0 && currentIndex < activeLevelWords.length - 1) {
      setSelectedWord(activeLevelWords[currentIndex + 1]);
    } else {
      setSelectedWord(activeLevelWords[0]); // Loop back to start of current level
    }
  };

  const handlePrevWord = () => {
    if (activeLevelWords.length === 0) return;
    if (currentIndex > 0) {
      setSelectedWord(activeLevelWords[currentIndex - 1]);
    } else {
      setSelectedWord(activeLevelWords[activeLevelWords.length - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#1c1b1f] text-white border-b border-white/10 h-14 min-h-[56px] max-h-[56px]">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-full flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div
            onClick={() => {
              setSelectedWord(null);
              setCurrentView('landing');
            }}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center font-bold text-base font-chinese shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
              文
            </div>
            <span className="font-bold text-white text-base tracking-tight whitespace-nowrap">
              Hán Tự Master
            </span>
          </div>

          {/* Right Action: Nút Đăng nhập CHỈ HIỂN THỊ Ở TRANG CHỦ */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Hands-Free Listening Button */}
            <button
              onClick={() => {
                setSelectedWord(null);
                setCurrentView('handsfree');
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 border cursor-pointer ${
                currentView === 'handsfree'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-300 shadow-md shadow-amber-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
              title="Mở chế độ nghe rảnh tay tự động (đọc từ rồi 2s sau đọc nghĩa)"
            >
              <Headphones className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden xs:inline">Rảnh tay</span>
            </button>

            {currentView === 'landing' && !selectedWord ? (
              currentUser ? (
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-white text-xs font-semibold transition-all active:scale-95 shadow-xs"
                  title="Hồ sơ & Tiến trình"
                >
                  <span className="text-sm select-none">{currentUser.avatar}</span>
                  <span className="font-bold max-w-[100px] truncate">{currentUser.displayName}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                  title="Đăng ký hoặc Đăng nhập để tự động lưu tiến trình"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </button>
              )
            ) : (
              /* Khi đang ở các màn hình khác (học, trắc nghiệm, xếp câu): Nút về Trang chủ */
              <button
                onClick={() => {
                  setSelectedWord(null);
                  setCurrentView('landing');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all active:scale-95 border border-white/10"
                title="Quay về trang chủ"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
                <span>Trang chủ</span>
              </button>
            )}

            {/* View Mode Toggle: Phone Frame vs Full Responsive (when in practice mode on desktop) */}
            {selectedWord && (
              <button
                onClick={() => setPhoneFrame(!phoneFrame)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Chuyển đổi kiểu khung điện thoại"
              >
                {phoneFrame ? <Monitor className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                <span>{phoneFrame ? 'Web rộng' : 'Điện thoại'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {selectedWord ? (
          // Practice Mode
          <div
            key={`view-practice-${selectedWord.id}`}
            className="flex-1 flex flex-col items-center justify-center h-[calc(100dvh-56px)] max-h-[calc(100dvh-56px)] overflow-hidden bg-slate-100 p-0 sm:py-3 sm:px-4"
          >
            {phoneFrame ? (
              // Mobile Mockup Frame
              <div className="relative border-[10px] border-slate-900 rounded-[44px] shadow-2xl overflow-hidden bg-slate-900 w-full max-w-[390px] ring-1 ring-slate-800">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-800 rounded-full" />
                </div>
                <div className="pt-3 h-[720px] overflow-hidden bg-white rounded-[34px] flex flex-col w-full min-w-0">
                  <HanziPractice
                    key={`practice-${selectedWord.id}`}
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
                    wordIndex={currentIndex}
                    totalWords={activeLevelWords.length}
                  />
                </div>
              </div>
            ) : (
              // Standard Clean Responsive Studio View for Mobile & Desktop
              <div className="w-full max-w-4xl h-full flex flex-col justify-center min-h-0">
                <HanziPractice
                  key={`practice-${selectedWord.id}`}
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
                  wordIndex={currentIndex}
                  totalWords={activeLevelWords.length}
                />
              </div>
            )}
          </div>
        ) : currentView === 'sentence' ? (
          // Sentence Scramble View (400 câu sắp xếp HSK 1 - 4)
          <div key={`view-sentence-${currentLevel}`} className="bg-slate-100 flex-1 flex flex-col">
            <SentenceScrambleView
              key={`scramble-${currentLevel}`}
              initialLevel={currentLevel}
              onBack={() => setCurrentView('study')}
              onSelectWordToPractice={(wordHanzi) => {
                const found = HSK_WORDS.find((w) => w.hanzi === wordHanzi);
                if (found) {
                  setSelectedWord(found);
                  setCurrentLevel(found.level);
                  setCurrentView('study');
                }
              }}
            />
          </div>
        ) : currentView === 'quiz' ? (
          // Quiz Arena View (Trắc nghiệm 4 chế độ)
          <div key={`view-quiz-${currentLevel}`} className="bg-slate-100 flex-1 flex flex-col">
            <QuizView
              key={`quiz-${currentLevel}`}
              allWords={HSK_WORDS}
              initialLevel={currentLevel}
              learnedWordIds={userStats.learnedWordIds || []}
              onSelectWordToPractice={(word) => {
                setSelectedWord(word);
                setCurrentView('study');
              }}
              onBackToStudy={() => setCurrentView('study')}
            />
          </div>
        ) : currentView === 'handsfree' ? (
          // Hands-Free Audio Player View (Phát audio tiếng Trung -> 2s -> đọc nghĩa tiếng Việt)
          <div key={`view-handsfree-${currentLevel}`} className="bg-slate-950 flex-1 flex flex-col min-h-0">
            <HandsFreePlayerView
              allWords={HSK_WORDS}
              initialLevel={currentLevel}
              learnedWordIds={userStats.learnedWordIds || []}
              favoriteWordIds={userStats.favoriteWordIds || []}
              onToggleLearned={handleToggleLearned}
              onToggleFavorite={handleToggleFavorite}
              onBack={() => setCurrentView('landing')}
              onSelectWordToPractice={(word) => {
                setSelectedWord(word);
                setCurrentLevel(word.level);
                setCurrentView('study');
              }}
            />
          </div>
        ) : currentView === 'landing' ? (
          // Landing Page with 4 HSK cards (matching user's uploaded screenshot)
          <LandingPage
            key="view-landing"
            onSelectLevel={handleSelectLevelGroup}
            hsk1Total={hsk1Total}
            hsk2Total={hsk2Total}
            hsk3Total={hsk3Total}
            hsk4Total={hsk4Total}
            totalLearned={totalLearned}
            learnedByLevel={learnedByLevel}
            onOpenQuiz={() => setCurrentView('quiz')}
            onOpenSentenceScramble={() => setCurrentView('sentence')}
            onOpenHandsFree={() => setCurrentView('handsfree')}
            currentUser={currentUser}
            onOpenAuth={() => setShowAuthModal(true)}
            onOpenProfile={() => setShowProfileModal(true)}
          />
        ) : (
          // Word List and Filters strictly scoped to currentLevel
          <div key={`view-study-${currentLevel}`} className="bg-slate-100 flex-1">
            <WordList
              key={`wordlist-${currentLevel}`}
              words={HSK_WORDS}
              currentLevel={currentLevel}
              userStats={userStats}
              onSelectWord={(word) => setSelectedWord(word)}
              onToggleFavorite={handleToggleFavorite}
              onToggleLearned={handleToggleLearned}
              onBackToLanding={() => setCurrentView('landing')}
              onOpenQuiz={() => setCurrentView('quiz')}
              onOpenSentenceScramble={() => setCurrentView('sentence')}
              onOpenHandsFree={() => setCurrentView('handsfree')}
            />
          </div>
        )}
      </main>



      {/* QR Auto-Login Toast Notification */}
      {qrLoginStatus && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white text-xs font-bold shadow-xl border border-purple-500/50 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{qrLoginStatus}</span>
          </div>
        </div>
      )}

      {/* Authentication Modal (Đăng ký / Đăng nhập) */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
          currentGuestStats={userStats}
        />
      )}

      {/* User Profile & Progress Modal */}
      {currentUser && showProfileModal && (
        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={currentUser}
          onUserUpdated={handleUserUpdated}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};
