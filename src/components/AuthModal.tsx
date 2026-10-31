import React, { useState } from 'react';
import { UserProfile, UserStats } from '../types';
import {
  registerUser,
  loginUser,
  AVATAR_OPTIONS
} from '../utils/authManager';
import {
  User,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LogIn,
  UserPlus,
  Smile,
  ShieldCheck
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  currentGuestStats?: UserStats;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  currentGuestStats
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const learnedCount = currentGuestStats?.learnedWordIds?.length || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (mode === 'register') {
        const res = registerUser(
          username,
          password,
          displayName || username,
          selectedAvatar,
          currentGuestStats
        );
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Đăng ký không thành công');
        }
      } else {
        const res = loginUser(username, password);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Đăng nhập không thành công');
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-emerald-600 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-lg select-none">
              {mode === 'register' ? selectedAvatar : '👤'}
            </span>
            <div>
              <h2 className="text-lg font-black tracking-tight">
                {mode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Tạo Tài Khoản Mới'}
              </h2>
              <p className="text-xs text-purple-200">
                Lưu và đồng bộ tiến trình học vĩnh viễn trên thiết bị
              </p>
            </div>
          </div>

          {/* Migration prompt for existing progress */}
          {learnedCount > 0 && mode === 'register' && (
            <div className="mt-3 bg-white/15 backdrop-blur-md rounded-xl p-2.5 flex items-center gap-2 text-xs border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>
                Bạn đã thuộc <strong>{learnedCount} từ vựng</strong>. Tiến trình này sẽ được lưu ngay vào tài khoản mới!
              </span>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 p-1">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng nhập</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Đăng ký mới</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 px-3 py-2 rounded-xl text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Display Name (Only for Register) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên hiển thị của bạn
              </label>
              <div className="relative">
                <Smile className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ví dụ: Minh Tâm, Tuấn Anh..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tên đăng nhập (Username)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ví dụ: minhtam2026"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ít nhất 4 ký tự"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Avatar Selector (Only for Register) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Chọn hình đại diện (Avatar)
              </label>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                      selectedAvatar === emoji
                        ? 'bg-purple-600 scale-110 shadow-md ring-2 ring-purple-300'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Device Auto-Login Notice */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 text-[11px] text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Tự động ghi nhớ:</strong> Trên điện thoại này bạn sẽ không cần đăng nhập lại các lần sau.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            {mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập Ngay</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Hoàn Tất Đăng Ký</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
