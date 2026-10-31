import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Gamepad2,
  User
} from 'lucide-react';
import { UserProfile } from '../types';

interface LandingPageProps {
  onSelectLevel: (level: '1' | '2' | '3' | '4') => void;
  hsk1Total: number;
  hsk2Total: number;
  hsk3Total: number;
  hsk4Total: number;
  totalLearned: number;
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
  onOpenQuiz,
  onOpenSentenceScramble,
  currentUser,
  onOpenAuth,
  onOpenProfile
}) => {
  const cards = [
    {
      id: '1' as const,
      badge: 'Mới bắt đầu',
      title: 'HSK 1',
      desc: 'Xây nền tảng từ vựng cơ bản, làm quen chữ Hán đầu tiên và ngữ âm Pinyin.',
      cta: 'Thử ngay',
      wordCount: `${hsk1Total} từ vựng`,
      emoji: '👩🏻‍🎓',
      accentColor: 'from-amber-400 to-yellow-600',
      bannerBg: 'bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400'
    },
    {
      id: '2' as const,
      badge: 'Sơ cấp',
      title: 'HSK 2',
      desc: 'Mở rộng vốn từ đàm thoại hằng ngày, câu ghép đơn giản và giao tiếp thực tế.',
      cta: 'Thử ngay',
      wordCount: `${hsk2Total} từ vựng`,
      emoji: '🎧',
      accentColor: 'from-amber-400 to-yellow-600',
      bannerBg: 'bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400'
    },
    {
      id: '3' as const,
      badge: 'Sơ – trung cấp',
      title: 'HSK 3',
      desc: 'Nắm vững ngữ pháp cốt lõi, diễn đạt ý kiến và giao lưu cuộc sống trôi chảy.',
      cta: 'Thử ngay',
      wordCount: `${hsk3Total} từ vựng`,
      emoji: '🏆',
      accentColor: 'from-amber-400 to-yellow-600',
      bannerBg: 'bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400'
    },
    {
      id: '4' as const,
      badge: 'Trung cấp',
      title: 'HSK 4',
      desc: 'Đọc hiểu đoạn văn trôi chảy, thảo luận chủ đề đa dạng và sẵn sàng thi chứng chỉ.',
      cta: 'Thử ngay',
      wordCount: `${hsk4Total} từ vựng`,
      emoji: '📜',
      accentColor: 'from-amber-400 to-yellow-600',
      bannerBg: 'bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-56px)] sm:h-[calc(100vh-56px)] bg-[#19181a] text-white flex flex-col justify-center gap-3 sm:gap-5 selection:bg-rose-500 selection:text-white px-3 sm:px-6 py-4 sm:py-6 overflow-hidden">
      {/* Top Clean Hero Section */}
      <div className="max-w-4xl mx-auto w-full text-center">
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          Chọn Cấp Độ HSK Để Bắt Đầu Học
        </h1>

        {/* User Stats / Progress Pill (chỉ hiện khi đã đăng nhập hoặc đã học thuộc từ vựng) */}
        {(currentUser || totalLearned > 0) && (
          <div className="mt-2 flex items-center justify-center">
            {currentUser ? (
              <button
                onClick={onOpenProfile}
                className="inline-flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-3 py-1 rounded-full text-xs text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Bấm để xem chi tiết hồ sơ học tập"
              >
                <span className="text-sm select-none">{currentUser.avatar}</span>
                <span className="text-xs"><strong>{currentUser.displayName}</strong> • Đã thuộc <strong>{totalLearned}</strong> từ vựng</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-3 py-1 rounded-full text-xs text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-xs group"
                title="Bấm để đăng ký tài khoản và lưu tiến trình này"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-xs">Bạn đã thuộc <strong>{totalLearned}</strong> từ vựng</span>
                <span className="bg-emerald-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-1">
                  Lưu tài khoản
                </span>
              </button>
            )}
          </div>
        )}

        {/* Quick Challenge Modes Shortcut */}
        <div className="mt-2.5 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-0.5 whitespace-nowrap">
          {onOpenSentenceScramble && (
            <button
              onClick={onOpenSentenceScramble}
              className="shrink-0 group flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-900/30 border border-purple-400/30 transition-all active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
              <span className="hidden sm:inline">Luyện Sắp Xếp Câu (400 Câu)</span>
              <span className="sm:hidden">Sắp Xếp Câu (400)</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-1">
                Mới
              </span>
            </button>
          )}

          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="shrink-0 group flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 border border-emerald-400/30 transition-all active:scale-95"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
              <span>Trắc Nghiệm 4 Chế Độ</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Cards in 2 Rows (2x2 Grid) - Cân đối, vừa vặn trên 1 màn hình */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-4xl mx-auto w-full">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectLevel(card.id)}
            className="group cursor-pointer bg-[#242327] hover:bg-[#2b2a2f] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between transform hover:-translate-y-0.5"
          >
            {/* Top Banner with Image/Illustration */}
            <div className={`relative h-14 sm:h-24 w-full ${card.bannerBg} overflow-hidden`}>
              {/* Badge Pill in corner */}
              <div className="absolute top-1.5 sm:top-2 left-2 sm:left-2.5 z-20">
                <span className="px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-medium border border-white/20 shadow-xs">
                  {card.badge}
                </span>
              </div>

              {/* Banner Illustration Content */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:14px_14px]" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-100 to-yellow-50 border sm:border-2 border-white shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl sm:text-3xl select-none">{card.emoji}</span>
                  </div>
                  <div className="hidden sm:flex mt-0.5 items-center gap-1 bg-amber-950/20 backdrop-blur-md px-2 py-0.2 rounded-full text-[9px] sm:text-[10px] font-bold text-amber-950 border border-white/20">
                    <span>Cấp độ {card.title}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1">
                  <h2 className="text-sm sm:text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                    {card.title}
                  </h2>
                  <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-semibold bg-white/10 text-slate-300 border border-white/10 shrink-0">
                    {card.wordCount}
                  </span>
                </div>

                <p className="hidden sm:block text-[11px] sm:text-xs text-slate-400 mt-1 leading-relaxed line-clamp-1 sm:line-clamp-2">
                  {card.desc}
                </p>
              </div>

              {/* Action CTA link */}
              <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#e05656] group-hover:text-[#f87171] transition-colors">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
