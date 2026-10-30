import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  PenTool,
  Mic,
  Headphones,
  TrendingUp,
  CheckCircle2,
  Award,
  Layers
} from 'lucide-react';

interface LandingPageProps {
  onSelectLevel: (level: '1' | '2' | '3' | '4') => void;
  hsk1Total: number;
  hsk2Total: number;
  hsk3Total: number;
  hsk4Total: number;
  totalLearned: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectLevel,
  hsk1Total,
  hsk2Total,
  hsk3Total,
  hsk4Total,
  totalLearned
}) => {
  const cards = [
    {
      id: '1' as const,
      badge: 'Mới bắt đầu',
      title: 'HSK 1',
      desc: 'Xây nền tảng từ vựng cơ bản, làm quen chữ Hán đầu tiên và ngữ âm Pinyin.',
      cta: 'Thử ngay',
      wordCount: `${hsk1Total} từ vựng`,
      accentColor: 'from-amber-400 to-yellow-500',
      bannerBg: 'bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400',
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100 to-yellow-50 border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <span className="text-4xl select-none">👩🏻‍🎓</span>
            </div>
            <div className="mt-2 flex items-center gap-1 bg-amber-950/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-bold text-amber-950 border border-white/20">
              <span>Cấp độ HSK 1</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '2' as const,
      badge: 'Sơ cấp',
      title: 'HSK 2',
      desc: 'Mở rộng vốn từ đàm thoại hằng ngày, câu ghép đơn giản và giao tiếp thực tế.',
      cta: 'Thử ngay',
      wordCount: `${hsk2Total} từ vựng`,
      accentColor: 'from-amber-500 to-orange-500',
      bannerBg: 'bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400',
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100 to-yellow-50 border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <span className="text-4xl select-none">🎧</span>
            </div>
            <div className="mt-2 flex items-center gap-1 bg-amber-950/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-bold text-amber-950 border border-white/20">
              <span>Cấp độ HSK 2</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '3' as const,
      badge: 'Sơ – trung cấp',
      title: 'HSK 3',
      desc: 'Nắm vững ngữ pháp cốt lõi, diễn đạt ý kiến và giao lưu cuộc sống trôi chảy.',
      cta: 'Thử ngay',
      wordCount: `${hsk3Total} từ vựng`,
      accentColor: 'from-yellow-400 to-amber-500',
      bannerBg: 'bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400',
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100 to-yellow-50 border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <span className="text-4xl select-none">🏆</span>
            </div>
            <div className="mt-2 flex items-center gap-1 bg-amber-950/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-bold text-amber-950 border border-white/20">
              <span>Cấp độ HSK 3</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '4' as const,
      badge: 'Trung cấp',
      title: 'HSK 4',
      desc: 'Đọc hiểu đoạn văn trôi chảy, thảo luận chủ đề đa dạng và sẵn sàng thi chứng chỉ.',
      cta: 'Thử ngay',
      wordCount: `${hsk4Total} từ vựng`,
      accentColor: 'from-amber-400 to-yellow-600',
      bannerBg: 'bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400',
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100 to-yellow-50 border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <span className="text-4xl select-none">📜</span>
            </div>
            <div className="mt-2 flex items-center gap-1 bg-amber-950/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-bold text-amber-950 border border-white/20">
              <span>Cấp độ HSK 4</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#19181a] text-white flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Top Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Lộ trình chinh phục 4 cấp độ HSK 1 - HSK 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Chọn Cấp Độ HSK Để Bắt Đầu Học
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Bấm vào cấp độ mong muốn để mở kho từ vựng riêng biệt của cấp độ đó (luyện viết nét chữ Mễ, 3 câu ví dụ và chấm điểm phát âm AI).
          </p>

          {totalLearned > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full text-xs text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bạn đã thuộc <strong>{totalLearned}</strong> từ vựng</span>
            </div>
          )}
        </div>

        {/* 4 Cards Grid: HSK 1, HSK 2, HSK 3, HSK 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectLevel(card.id)}
              className="group cursor-pointer bg-[#242327] hover:bg-[#2b2a2f] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between transform hover:-translate-y-1"
            >
              {/* Top Banner with Image/Illustration */}
              <div className={`relative h-44 sm:h-48 w-full ${card.bannerBg} overflow-hidden`}>
                {/* Badge Pill in corner */}
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/20 shadow-sm">
                    {card.badge}
                  </span>
                </div>

                {/* Banner Illustration Content */}
                {card.illustration}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      {card.title}
                    </h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-white/10 text-slate-300 border border-white/10">
                      {card.wordCount}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Action CTA link in coral/red color matching screenshot */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e05656] group-hover:text-[#f87171] transition-colors">
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights Footer */}
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Luyện viết ô chữ Mễ</div>
              <div className="text-[11px] text-slate-400">Tập vẽ đúng thứ tự từng nét bút</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Chấm điểm phát âm AI</div>
              <div className="text-[11px] text-slate-400">Ghi âm và chấm điểm 0 - 100đ</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">3 Câu ví dụ mẫu</div>
              <div className="text-[11px] text-slate-400">3 câu ví dụ mẫu cho từ vựng đi kèm</div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 mt-6">
          Hán Tự Master • Hệ Thống Học Tiếng Trung HSK 1 - HSK 4
        </div>
      </div>
    </div>
  );
};
