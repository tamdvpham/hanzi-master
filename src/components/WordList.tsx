import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  PenTool,
  Bookmark,
  CheckCircle2,
  Filter,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Flame,
  Mic
} from 'lucide-react';
import { HSKWord, UserStats } from '../types';
import { CATEGORIES } from '../data/hskData';
import { playChineseAudio } from '../utils/audio';

interface WordListProps {
  words: HSKWord[];
  currentLevel: 1 | 2 | 3 | 4;
  userStats: UserStats;
  onSelectWord: (word: HSKWord) => void;
  onToggleFavorite: (wordId: string) => void;
  onToggleLearned: (wordId: string) => void;
  onBackToLanding?: () => void;
}

export const WordList: React.FC<WordListProps> = ({
  words,
  currentLevel,
  userStats,
  onSelectWord,
  onToggleFavorite,
  onToggleLearned,
  onBackToLanding
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'learned' | 'favorites'>('all');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  // Filter words strictly to currentLevel
  const levelWords = useMemo(() => {
    return words.filter((w) => w.level === currentLevel);
  }, [words, currentLevel]);

  // Dynamic categories available in this HSK level
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    levelWords.forEach((w) => {
      if (w.category) cats.add(w.category);
    });
    return ['Tất cả', ...Array.from(cats)];
  }, [levelWords]);

  // Reset category and sub-filter when level changes
  React.useEffect(() => {
    setSelectedCategory('Tất cả');
    setStatusFilter('all');
  }, [currentLevel]);

  // Filtered words
  const filteredWords = useMemo(() => {
    return levelWords.filter((w) => {
      // Sub-filter: learned or favorites
      if (statusFilter === 'learned' && !userStats.learnedWordIds.includes(w.id)) return false;
      if (statusFilter === 'favorites' && !userStats.favoriteWordIds.includes(w.id)) return false;

      // Category filter
      if (selectedCategory !== 'Tất cả' && w.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchHanzi = w.hanzi.includes(q);
        const matchPinyin = w.pinyin.toLowerCase().includes(q);
        const matchMeaning = w.meaning.toLowerCase().includes(q);
        const matchHanViet = w.hanViet.toLowerCase().includes(q);
        return matchHanzi || matchPinyin || matchMeaning || matchHanViet;
      }

      return true;
    });
  }, [levelWords, statusFilter, selectedCategory, searchQuery, userStats]);

  // Statistics for currentLevel only
  const totalInLevel = levelWords.length;
  const learnedInLevel = levelWords.filter((w) => userStats.learnedWordIds.includes(w.id)).length;
  const favInLevel = levelWords.filter((w) => userStats.favoriteWordIds.includes(w.id)).length;
  const practicedInLevel = levelWords.filter((w) => (userStats.practiceCount[w.id] || 0) > 0).length;

  const handleSpeak = async (e: React.MouseEvent, word: HSKWord) => {
    e.stopPropagation();
    try {
      setPlayingWordId(word.id);
      await playChineseAudio(word.hanzi);
    } catch (err) {
      console.error('Audio play error:', err);
    } finally {
      setPlayingWordId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* App Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-emerald-600 p-6 text-white shadow-xl mb-6">
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Cấp độ HSK {currentLevel} ({totalInLevel} từ vựng)
            </span>

            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="text-xs bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-1.5 rounded-full transition-colors backdrop-blur flex items-center gap-1 shadow-sm"
              >
                <span>← Chọn cấp độ HSK</span>
              </button>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Luyện Viết Chữ Hán & Phát Âm HSK {currentLevel}
          </h1>
          <p className="text-purple-100 text-sm mt-1 max-w-xl">
            Tập viết theo đúng thứ tự nét bút trên ô chữ Mễ, luyện phát âm chuẩn Bắc Kinh với 3 câu ví dụ cho mỗi từ và tính năng ghi âm chấm điểm trực tiếp.
          </p>

          {/* Quick stats grid for currentLevel ONLY */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-2.5">
              <div className="text-xs text-purple-200">Tổng từ HSK {currentLevel}</div>
              <div className="text-xl font-bold flex items-center gap-1">
                <span>{totalInLevel}</span>
                <span className="text-xs font-normal text-purple-200">từ</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-2.5">
              <div className="text-xs text-purple-200">Đã thuộc</div>
              <div className="text-xl font-bold flex items-center gap-1">
                <span>{learnedInLevel}</span>
                <span className="text-xs font-normal text-purple-200">/ {totalInLevel}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-2.5">
              <div className="text-xs text-purple-200">Đã luyện viết</div>
              <div className="text-xl font-bold flex items-center gap-1">
                <span>{practicedInLevel}</span>
                <span className="text-xs font-normal text-purple-200">từ</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-2.5">
              <div className="text-xs text-purple-200">Yêu thích</div>
              <div className="text-xl font-bold flex items-center gap-1">
                <span>{favInLevel}</span>
                <span className="text-xs font-normal text-purple-200">từ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Main Filters */}
      <div className="space-y-3 mb-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Tìm theo chữ Hán, Pinyin, Hán Việt hoặc nghĩa tiếng Việt trong HSK ${currentLevel}...`}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md text-slate-600"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Level & Status Tabs: ONLY for this HSK level */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            HSK {currentLevel} ({totalInLevel})
          </button>
          <button
            onClick={() => setStatusFilter('learned')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
              statusFilter === 'learned'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Đã thuộc ({learnedInLevel})</span>
          </button>
          <button
            onClick={() => setStatusFilter('favorites')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
              statusFilter === 'favorites'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                : 'bg-white text-amber-700 hover:bg-amber-50 border border-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Yêu thích ({favInLevel})</span>
          </button>
        </div>

        {/* Categories horizontal scroll pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs text-slate-500 font-medium pl-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Chủ đề:
          </span>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Quick Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
        <span>Hiển thị {filteredWords.length} từ vựng HSK {currentLevel}</span>
        <span>Bấm vào từ để mở màn hình luyện viết theo nét bút</span>
      </div>

      {/* Vocabulary Cards Grid */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">Không tìm thấy từ nào</h3>
          <p className="text-sm text-slate-500 mt-1">
            Hãy thử tìm bằng từ khóa khác hoặc bỏ chọn bộ lọc hiện tại.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredWords.map((word) => {
            const isFav = userStats.favoriteWordIds.includes(word.id);
            const isDone = userStats.learnedWordIds.includes(word.id);
            const practiceCount = userStats.practiceCount[word.id] || 0;

            return (
              <div
                key={word.id}
                onClick={() => onSelectWord(word)}
                className="group relative bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                {/* Top card row: Hanzi & Controls */}
                <div>
                  <div className="flex items-start justify-between">
                    {/* Chinese Character & Pinyin */}
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center">
                        <span className={`${word.hanzi.length > 2 ? 'text-2xl sm:text-3xl' : 'text-3xl'} font-bold font-chinese text-slate-900 group-hover:text-purple-600 transition-colors whitespace-nowrap tracking-wide`}>
                          {word.hanzi}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-sm font-semibold text-purple-600 whitespace-nowrap">
                          {word.pinyin}
                        </span>
                        <span className="text-xs text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                          {word.hanViet}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons on card: Favorite, Learned, and prominent Speaker outermost */}
                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      {/* Favorite Button */}
                      <button
                        onClick={() => onToggleFavorite(word.id)}
                        className={`p-2 rounded-xl hover:bg-amber-50 transition-colors ${
                          isFav ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'
                        }`}
                        title="Yêu thích"
                      >
                        <Bookmark className={`w-4 h-4 ${isFav ? 'fill-amber-500' : ''}`} />
                      </button>

                      {/* Learned Button */}
                      <button
                        onClick={() => onToggleLearned(word.id)}
                        className={`p-2 rounded-xl hover:bg-emerald-50 transition-colors ${
                          isDone ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'
                        }`}
                        title="Đánh dấu đã thuộc"
                      >
                        <CheckCircle2 className={`w-4 h-4 ${isDone ? 'fill-emerald-600 text-white' : ''}`} />
                      </button>

                      {/* Audio Button - Outermost & Prominent */}
                      <button
                        onClick={(e) => handleSpeak(e, word)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-xs ${
                          playingWordId === word.id
                            ? 'bg-emerald-500 text-white scale-105 shadow-md shadow-emerald-200 animate-pulse'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200/90 hover:scale-105 active:scale-95'
                        }`}
                        title="Nghe phát âm chuẩn"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Vietnamese Meaning */}
                  <div className="mt-2 text-sm font-semibold text-slate-800 line-clamp-2">
                    {word.meaning}
                  </div>
                </div>

                {/* Bottom card footer: Action call & Practice stats */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Luyện viết & nói</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {userStats.pronunciationScores?.[word.id] !== undefined && userStats.pronunciationScores[word.id] > 0 && (
                      <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                        <Award className="w-3 h-3 text-amber-500" />
                        {userStats.pronunciationScores[word.id]}đ
                      </span>
                    )}

                    {practiceCount > 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Flame className="w-3 h-3 text-orange-500" />
                        {practiceCount} lần
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
