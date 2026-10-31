import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  PenTool,
  Mic,
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
      accentColor: 'from-amber-400 to-yellow-500',
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
      accentColor: 'from-amber-500 to-orange-500',
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
      accentColor: 'from-yellow-400 to-amber-500',
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
    <div className="min-h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)] bg-[#19181a] text-white flex flex-col justify-between selection:bg-rose-500 selection:text-white px-3 sm:px-6 py-3 sm:py-4 overflow-y-auto lg:overflow-hidden">
      {/* Top Hero Section */}
      <div className="max-w-6xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-[11px] font-semibold mb-1.5 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Lộ trình chinh phục 4 cấp độ HSK 1 - HSK 4</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          Chọn Cấp Độ HSK Để Bắt Đầu Học
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          Bấm vào cấp độ mong muốn để mở kho từ vựng riêng biệt (luyện viết nét chữ Mễ, 3 câu ví dụ và chấm điểm phát âm AI).
        </p>

        {currentUser ? (
          <button
            onClick={onOpenProfile}
            className="mt-1.5 inline-flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-3 py-1 rounded-full text-xs text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Bấm để xem chi tiết hồ sơ học tập"
          >
            <span className="text-sm select-none">{currentUser.avatar}</span>
            <span><strong>{currentUser.displayName}</strong> • Đã thuộc <strong>{totalLearned}</strong> từ vựng</span>
          </button>
        ) : totalLearned > 0 ? (
          <button
            onClick={onOpenAuth}
            className="mt-1.5 inline-flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-3 py-1 rounded-full text-xs text-emerald-300 transition-all cursor-pointer active:scale-95 shadow-sm group"
            title="Bấm để đăng ký tài khoản và lưu 2 từ vựng này trên điện thoại của bạn"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Bạn đã thuộc <strong>{totalLearned}</strong> từ vựng</span>
            <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full uppercase ml-1">
              Lưu tài khoản
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="mt-1.5 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-1 rounded-full text-xs text-purple-200 transition-all cursor-pointer active:scale-95"
          >
            <User className="w-3 h-3 text-amber-300" />
            <span>Đăng ký / Đăng nhập để ghi nhớ tiến trình</span>
          </button>
        )}

        {/* Quick Challenge Modes Shortcut */}
        <div className="mt-2.5 mb-2.5 sm:mb-4 flex items-center justify-center gap-2.5 flex-wrap">
          {onOpenSentenceScramble && (
            <button
              onClick={onOpenSentenceScramble}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-900/30 border border-purple-400/30 transition-all active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Luyện Sắp Xếp Câu (400 Câu)</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                Mới
              </span>
            </button>
          )}

          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 border border-emerald-400/30 transition-all active:scale-95"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Trắc Nghiệm 4 Chế Độ</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Cards in 1 Row on Desktop: HSK 1, HSK 2, HSK 3, HSK 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto w-full my-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectLevel(card.id)}
            className="group cursor-pointer bg-[#242327] hover:bg-[#2b2a2f] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between transform hover:-translate-y-1"
          >
            {/* Top Banner with Image/Illustration */}
            <div className={`relative h-28 sm:h-32 w-full ${card.bannerBg} overflow-hidden`}>
              {/* Badge Pill in corner */}
              <div className="absolute top-2.5 left-2.5 z-20">
                <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium border border-white/20 shadow-xs">
                  {card.badge}
                </span>
              </div>

              {/* Banner Illustration Content */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:14px_14px]" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-100 to-yellow-50 border-3 border-white shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-3xl select-none">{card.emoji}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 bg-amber-950/20 backdrop-blur-md px-2.5 py-0.2 rounded-full text-[10px] font-bold text-amber-950 border border-white/20">
                    <span>Cấp độ {card.title}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                    {card.title}
                  </h2>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-white/10 text-slate-300 border border-white/10">
                    {card.wordCount}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {card.desc}
                </p>
              </div>

              {/* Action CTA link in coral/red color matching screenshot */}
              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#e05656] group-hover:text-[#f87171] transition-colors">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Highlights Footer (Compact) */}
      <div className="max-w-4xl mx-auto w-full pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Luyện viết ô chữ Mễ</div>
              <div className="text-[10px] text-slate-400">Tập vẽ đúng thứ tự từng nét bút</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Chấm điểm phát âm AI</div>
              <div className="text-[10px] text-slate-400">Ghi âm và chấm điểm 0 - 100đ</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">3 Câu ví dụ mẫu</div>
              <div className="text-[10px] text-slate-400">3 câu ví dụ mẫu cho từ vựng</div>
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-500 mt-2">
          Hán Tự Master • Hệ Thống Học Tiếng Trung HSK 1 - HSK 4
        </div>
      </div>
    </div>
  );
};
