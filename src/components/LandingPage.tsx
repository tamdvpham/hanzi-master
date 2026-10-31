import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Gamepad2,
  Sparkles
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
      desc: '157 từ vựng nền tảng • Pinyin & Luyện viết nét ô chữ Mễ',
      wordCount: hsk1Total,
      emoji: '🌱',
      watermark: '学',
      features: ['✍️ Nét chữ Mễ', '🎙️ AI chấm điểm', '🧩 100 câu xếp'],
      theme: {
        cardBg: 'bg-gradient-to-br from-[#122820] via-[#0d1d17] to-[#07120e]',
        border: 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-emerald-950/60',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        iconBg: 'bg-gradient-to-tr from-emerald-500/25 to-teal-500/10 border-emerald-500/40 text-emerald-300 shadow-xl shadow-emerald-950/60',
        watermarkColor: 'text-emerald-400',
        progressBar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
        btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950/50'
      }
    },
    {
      id: '2' as const,
      numLevel: 2 as const,
      badge: 'Sơ cấp',
      title: 'HSK 2',
      subtitle: 'Đàm thoại thực tế',
      desc: '145 từ giao tiếp • Câu ghép đời sống & Mẫu câu hỏi đáp',
      wordCount: hsk2Total,
      emoji: '🗣️',
      watermark: '说',
      features: ['✍️ Nét chữ Mễ', '🎙️ AI chấm điểm', '🧩 100 câu xếp'],
      theme: {
        cardBg: 'bg-gradient-to-br from-[#14263a] via-[#0e1d2c] to-[#08121d]',
        border: 'border-sky-500/30 hover:border-sky-400 hover:shadow-sky-950/60',
        badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        iconBg: 'bg-gradient-to-tr from-sky-500/25 to-indigo-500/10 border-sky-500/40 text-sky-300 shadow-xl shadow-sky-950/60',
        watermarkColor: 'text-sky-400',
        progressBar: 'bg-gradient-to-r from-sky-500 to-indigo-400',
        btnBg: 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-md shadow-sky-950/50'
      }
    },
    {
      id: '3' as const,
      numLevel: 3 as const,
      badge: 'Sơ - Trung cấp',
      title: 'HSK 3',
      subtitle: 'Ngữ pháp cốt lõi',
      desc: '273 từ nâng cao • Diễn đạt ý kiến trôi chảy & Giao lưu sâu',
      wordCount: hsk3Total,
      emoji: '📘',
      watermark: '读',
      features: ['✍️ Nét chữ Mễ', '🎙️ AI chấm điểm', '🧩 100 câu xếp'],
      theme: {
        cardBg: 'bg-gradient-to-br from-[#271a3a] via-[#1c122b] to-[#120a1c]',
        border: 'border-purple-500/30 hover:border-purple-400 hover:shadow-purple-950/60',
        badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        iconBg: 'bg-gradient-to-tr from-purple-500/25 to-pink-500/10 border-purple-500/40 text-purple-300 shadow-xl shadow-purple-950/60',
        watermarkColor: 'text-purple-400',
        progressBar: 'bg-gradient-to-r from-purple-500 to-indigo-400',
        btnBg: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-950/50'
      }
    },
    {
      id: '4' as const,
      numLevel: 4 as const,
      badge: 'Trung cấp',
      title: 'HSK 4',
      subtitle: 'Đọc hiểu & Thi cử',
      desc: '131 từ chuyên sâu • Thảo luận đoạn văn & Chuẩn bị thi chứng chỉ',
      wordCount: hsk4Total,
      emoji: '🎯',
      watermark: '写',
      features: ['✍️ Nét chữ Mễ', '🎙️ AI chấm điểm', '🧩 100 câu xếp'],
      theme: {
        cardBg: 'bg-gradient-to-br from-[#302014] via-[#24170d] to-[#160e07]',
        border: 'border-amber-500/30 hover:border-amber-400 hover:shadow-amber-950/60',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        iconBg: 'bg-gradient-to-tr from-amber-500/25 to-rose-500/10 border-amber-500/40 text-amber-300 shadow-xl shadow-amber-950/60',
        watermarkColor: 'text-amber-400',
        progressBar: 'bg-gradient-to-r from-amber-500 to-orange-400',
        btnBg: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md shadow-amber-950/50'
      }
    }
  ];

  return (
    <div className="h-[calc(100dvh-56px)] max-h-[calc(100dvh-56px)] bg-[#111013] text-white flex flex-col justify-between p-2.5 sm:p-5 max-w-5xl mx-auto w-full select-none overflow-hidden">
      {/* Top Header Section */}
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
                className="inline-flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-3 py-0.5 rounded-full text-xs text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-xs"
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
                className="inline-flex items-center gap-1 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-3 py-0.5 rounded-full text-xs text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-xs group"
                title="Bấm để đăng ký tài khoản và lưu tiến trình này"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  Bạn đã thuộc <strong>{totalLearned}</strong> từ vựng
                </span>
                <span className="bg-emerald-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-1">
                  Lưu tài khoản
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
      <div className="flex-1 grid grid-cols-2 gap-2.5 sm:gap-4 my-1.5 sm:my-2 min-h-0">
        {cards.map((card) => {
          const learnedCount = learnedByLevel ? learnedByLevel[card.numLevel] || 0 : 0;
          const progressPercent = Math.round((learnedCount / Math.max(1, card.wordCount)) * 100);

          return (
            <div
              key={card.id}
              onClick={() => onSelectLevel(card.id)}
              className={`group relative cursor-pointer rounded-2xl sm:rounded-3xl p-3 sm:p-4 border transition-all duration-300 shadow-xl flex flex-col justify-between hover:scale-[1.01] active:scale-[0.98] overflow-hidden ${card.theme.cardBg} ${card.theme.border}`}
            >
              {/* Calligraphy Watermark in background */}
              <div className={`font-chinese text-7xl sm:text-[115px] font-black absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-110 transition-all duration-500 ${card.theme.watermarkColor}`}>
                {card.watermark}
              </div>

              {/* Card Header: Level Badge & Word Count */}
              <div className="relative z-10 flex items-center justify-between gap-1 shrink-0">
                <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border shadow-xs ${card.theme.badgeBg}`}>
                  {card.badge}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-xs">
                  {card.wordCount} từ
                </span>
              </div>

              {/* Card Center: Visual Hero with 3D Icon, Title, Subtitle & Description */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-1 sm:py-2 text-center">
                {/* Large glowing icon container */}
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl border shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${card.theme.iconBg}`}>
                  <span className="select-none filter drop-shadow-md">{card.emoji}</span>
                </div>

                {/* Big Bold Title */}
                <h2 className="text-lg sm:text-2xl font-black text-white mt-1 sm:mt-2 tracking-tight group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h2>

                {/* Subtitle */}
                <span className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">
                  {card.subtitle}
                </span>

                {/* Description (Hiển thị đầy đủ trên màn hình lớn, ẩn trên mobile để tránh bị cắt chữ '...') */}
                <p className="hidden sm:block text-xs text-slate-400 mt-1 max-w-[280px] leading-relaxed">
                  {card.desc}
                </p>

                {/* Feature tags (visible on desktop) */}
                <div className="hidden sm:flex items-center gap-1.5 mt-2 flex-wrap justify-center">
                  {card.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Progress Bar & Action CTA Button */}
              <div className="relative z-10 pt-1.5 sm:pt-2 border-t border-white/10 space-y-1 sm:space-y-1.5 shrink-0">
                {/* Progress bar line */}
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-slate-400 font-medium">Tiến độ:</span>
                  <span className="font-bold text-white">
                    {learnedCount}/{card.wordCount} từ
                    {progressPercent > 0 ? (
                      <span className="text-amber-400 ml-1 font-black">({progressPercent}%)</span>
                    ) : (
                      <span className="text-slate-500 ml-1 font-normal">(Chưa học)</span>
                    )}
                  </span>
                </div>

                <div className="w-full bg-black/50 h-1 sm:h-1.5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-500 shadow-sm ${card.theme.progressBar}`}
                    style={{ width: `${Math.max(progressPercent, progressPercent > 0 ? 5 : 0)}%` }}
                  />
                </div>

                {/* CTA Button */}
                <div className={`w-full py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-lg group-hover:brightness-110 active:scale-95 ${card.theme.btnBg}`}>
                  <span>Bắt đầu học {card.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Subtle Grounding Strip */}
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
