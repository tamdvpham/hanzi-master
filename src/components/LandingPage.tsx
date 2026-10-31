import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Gamepad2
} from 'lucide-react';
import { UserProfile } from '../types';

interface LandingPageProps {
  onSelectLevel: (level: '1' | '2' | '3' | '4') => void;
  hsk1Total: number;
  hsk2Total: number;
  hsk3Total: number;
  hsk4Total: number;
  totalLearned: number;
  learnedByLevel?: Record<1 | 2 | 3 | 4, number>;
  onOpenQuiz?: () => void;
  onOpenSentenceScramble?: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectLevel,
  hsk1Total,
  hsk2Total,
  hsk3Total,
  hsk4Total,
  totalLearned,
  learnedByLevel,
  onOpenQuiz,
  onOpenSentenceScramble,
  currentUser,
  onOpenAuth,
  onOpenProfile
}) => {
  const cards = [
    {
      id: '1' as const,
      numLevel: 1 as const,
      badge: 'Mới bắt đầu',
      title: 'HSK 1',
      subtitle: 'Nền tảng cơ bản',
      wordCount: hsk1Total,
      emoji: '🌱',
      theme: {
        cardBg: 'bg-gradient-to-br from-[#12231c] via-[#0e1b16] to-[#0a1410]',
        border: 'border-emerald-500/30 hover:border-emerald-400',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 shadow-emerald-950/50',
        progressBar: 'bg-emerald-500',
        btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
      }
    },
    {
      id: '2' as const,
      numLevel: 2 as const,
      badge: 'Sơ cấp',
      title: 'HSK 2',
      subtitle: 'Đàm thoại thực tế',
      wordCount: hsk2Total,
      emoji: '🗣️',
      theme: {
        cardBg: 'bg-gradient-to-br from-[#132233] via-[#0f1a27] to-[#0a121c]',
        border: 'border-sky-500/30 hover:border-sky-400',
        badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        iconBg: 'bg-sky-500/15 border-sky-500/30 text-sky-300 shadow-sky-950/50',
        progressBar: 'bg-sky-500',
        btnBg: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-950/40'
      }
    },
    {
      id: '3' as const,
      numLevel: 3 as const,
      badge: 'Sơ - Trung cấp',
      title: 'HSK 3',
      subtitle: 'Ngữ pháp cốt lõi',
      wordCount: hsk3Total,
      emoji: '📘',
      theme: {
        cardBg: 'bg-gradient-to-br from-[#221833] via-[#1a1226] to-[#120c1b]',
        border: 'border-purple-500/30 hover:border-purple-400',
        badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        iconBg: 'bg-purple-500/15 border-purple-500/30 text-purple-300 shadow-purple-950/50',
        progressBar: 'bg-purple-500',
        btnBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/40'
      }
    },
    {
      id: '4' as const,
      numLevel: 4 as const,
      badge: 'Trung cấp',
      title: 'HSK 4',
      subtitle: 'Đọc hiểu & thi cử',
      wordCount: hsk4Total,
      emoji: '🎯',
      theme: {
        cardBg: 'bg-gradient-to-br from-[#2a1e12] via-[#20160d] to-[#160f08]',
        border: 'border-amber-500/30 hover:border-amber-400',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300 shadow-amber-950/50',
        progressBar: 'bg-amber-500',
        btnBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/40'
      }
    }
  ];

  return (
    <div className="h-[calc(100dvh-56px)] max-h-[calc(100dvh-56px)] bg-[#111013] text-white flex flex-col justify-between p-2.5 sm:p-5 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top Header Section (Shrink-0) */}
      <div className="shrink-0 space-y-1.5 sm:space-y-2 text-center">
        <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
          Chọn Cấp Độ HSK Để Bắt Đầu Học
        </h1>

        {/* User Progress Pill (only when logged in or has learned words) */}
        {(currentUser || totalLearned > 0) && (
          <div className="flex items-center justify-center">
            {currentUser ? (
              <button
                onClick={onOpenProfile}
                className="inline-flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-xs text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Bấm để xem chi tiết hồ sơ học tập"
              >
                <span className="text-xs select-none">{currentUser.avatar}</span>
                <span className="text-[11px] sm:text-xs">
                  <strong>{currentUser.displayName}</strong> • Đã thuộc <strong>{totalLearned}</strong> từ vựng
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-xs text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-xs group"
                title="Bấm để đăng ký tài khoản và lưu tiến trình này"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  Bạn đã thuộc <strong>{totalLearned}</strong> từ vựng
                </span>
                <span className="bg-emerald-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-1">
                  Lưu
                </span>
              </button>
            )}
          </div>
        )}

        {/* Quick Challenge Mode Buttons */}
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto w-full pt-0.5">
          {onOpenSentenceScramble && (
            <button
              onClick={onOpenSentenceScramble}
              className="group flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-purple-950/40 border border-purple-400/30 transition-all active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
              <span className="whitespace-nowrap">Xếp Câu (400)</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-0.5">
                Mới
              </span>
            </button>
          )}

          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="group flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-emerald-950/40 border border-emerald-400/30 transition-all active:scale-95"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
              <span className="whitespace-nowrap">Trắc Nghiệm 4 Chế Độ</span>
            </button>
          )}
        </div>
      </div>

      {/* Middle Section: 4 HSK Cards (2x2 Grid, Flex-1, Min-h-0 fills screen evenly) */}
      <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-3.5 my-1.5 sm:my-2 min-h-0">
        {cards.map((card) => {
          const learnedCount = learnedByLevel ? learnedByLevel[card.numLevel] || 0 : 0;
          const progressPercent = Math.round((learnedCount / Math.max(1, card.wordCount)) * 100);

          return (
            <div
              key={card.id}
              onClick={() => onSelectLevel(card.id)}
              className={`group cursor-pointer rounded-2xl p-2.5 sm:p-3.5 border transition-all duration-300 shadow-xl flex flex-col justify-between hover:scale-[1.01] active:scale-[0.98] ${card.theme.cardBg} ${card.theme.border}`}
            >
              {/* Card Header: Level Badge & Word Count */}
              <div className="flex items-center justify-between gap-1 shrink-0">
                <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border ${card.theme.badgeBg}`}>
                  {card.badge}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                  {card.wordCount} từ
                </span>
              </div>

              {/* Card Center: Emoji + Level Title + Subtitle */}
              <div className="flex flex-col items-center justify-center my-auto py-1 text-center">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-3xl border shadow-inner group-hover:scale-110 transition-transform duration-300 ${card.theme.iconBg}`}>
                  <span>{card.emoji}</span>
                </div>
                <h2 className="text-base sm:text-2xl font-black text-white mt-1 sm:mt-1.5 tracking-tight group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h2>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium line-clamp-1">
                  {card.subtitle}
                </span>
              </div>

              {/* Card Bottom: Progress Bar & Action CTA Button */}
              <div className="pt-1.5 sm:pt-2 border-t border-white/10 space-y-1 sm:space-y-1.5 shrink-0">
                {/* Progress bar line */}
                <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                  <span className="text-slate-400">Tiến độ:</span>
                  <span className="font-bold text-white">
                    {learnedCount}/{card.wordCount} từ
                    {progressPercent > 0 && (
                      <span className="text-amber-400 ml-1">({progressPercent}%)</span>
                    )}
                  </span>
                </div>

                <div className="w-full bg-black/40 h-1 sm:h-1.5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${card.theme.progressBar}`}
                    style={{ width: `${Math.max(progressPercent, progressPercent > 0 ? 5 : 0)}%` }}
                  />
                </div>

                {/* CTA Button */}
                <div className={`w-full py-1 sm:py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md group-hover:brightness-110 ${card.theme.btnBg}`}>
                  <span>Học ngay</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Subtle Grounding Strip (Shrink-0) */}
      <div className="shrink-0 py-0.5 text-center text-[10px] sm:text-xs text-slate-500 flex items-center justify-center gap-2 border-t border-white/5">
        <span>✍️ Viết ô chữ Mễ</span>
        <span>•</span>
        <span>🎙️ Chấm điểm phát âm AI</span>
        <span>•</span>
        <span>🧩 400 câu HSK 1 - 4</span>
      </div>
    </div>
  );
};
