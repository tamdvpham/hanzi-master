import React, { useState, useEffect } from 'react';
import { UserProfile, UserStats } from '../types';
import {
  registerUser,
  loginUser,
  loginWithGmail,
  loginSavedAccount,
  getSavedAccountsOnDevice,
  deleteAccountFromDevice,
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
  ShieldCheck,
  Mail,
  Trash2,
  ArrowRight
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
  const [activeTab, setActiveTab] = useState<'gmail' | 'password'>('gmail');
  const [passwordMode, setPasswordMode] = useState<'login' | 'register'>('login');

  // Gmail form state
  const [gmailInput, setGmailInput] = useState('');

  // Password form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  // Saved accounts on device
  const [savedAccounts, setSavedAccounts] = useState<UserProfile[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSavedAccounts(getSavedAccountsOnDevice());
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const learnedCount = currentGuestStats?.learnedWordIds?.length || 0;

  // Handle 1-click login with Gmail
  const handleGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = loginWithGmail(gmailInput, currentGuestStats);
      if (res.success && res.user) {
        setSuccessMessage(
          res.isNew
            ? `Tạo tài khoản thành công! Chào mừng ${res.user.displayName}.`
            : `Đăng nhập thành công! Chào mừng ${res.user.displayName} trở lại.`
        );
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 300);
      } else {
        setErrorMessage(res.error || 'Đăng nhập Gmail không thành công.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle 1-tap select saved account on device
  const handleSelectSavedAccount = (account: UserProfile) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = loginSavedAccount(account.id, currentGuestStats);
      if (res.success && res.user) {
        onAuthSuccess(res.user);
        onClose();
      } else {
        setErrorMessage(res.error || 'Không thể đăng nhập vào tài khoản này.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete saved account from device
  const handleDeleteAccount = (e: React.MouseEvent, accountId: string) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc muốn xóa tài khoản này khỏi thiết bị?')) {
      deleteAccountFromDevice(accountId);
      setSavedAccounts(getSavedAccountsOnDevice());
    }
  };

  // Handle Username & Password submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (passwordMode === 'register') {
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
          setErrorMessage(res.error || 'Đăng ký không thành công.');
        }
      } else {
        const res = loginUser(username, password, currentGuestStats);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Đăng nhập không thành công.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200 my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-emerald-600 p-4 sm:p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-xl shadow-md select-none shrink-0">
              {activeTab === 'gmail' ? '✉️' : passwordMode === 'register' ? selectedAvatar : '👤'}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Đăng Nhập & Lưu Tiến Trình
              </h2>
              <p className="text-[11px] sm:text-xs text-purple-200">
                Ghi nhớ vĩnh viễn từ vựng đã học & điểm số trên thiết bị
              </p>
            </div>
          </div>

          {/* Migration prompt for existing progress */}
          {learnedCount > 0 && (
            <div className="mt-3 bg-white/15 backdrop-blur-md rounded-xl p-2 sm:p-2.5 flex items-center gap-2 text-xs border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>
                Bạn đang có <strong>{learnedCount} từ vựng đã học</strong>. Khi đăng nhập, toàn bộ tiến trình này sẽ được lưu ngay vào tài khoản!
              </span>
            </div>
          )}
        </div>

        {/* 1-Tap Saved Accounts on Device (Solves bug: cannot log back into existing account) */}
        {savedAccounts.length > 0 && (
          <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Tài khoản trên thiết bị này:
              </span>
              <span className="text-[10px] text-slate-400">Chạm để vào ngay</span>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar">
              {savedAccounts.map((acc) => {
                const wordsLearned = acc.stats?.learnedWordIds?.length || 0;
                return (
                  <div
                    key={acc.id}
                    onClick={() => handleSelectSavedAccount(acc)}
                    className="group flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer active:scale-98"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                        {acc.avatar || '👤'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {acc.displayName}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate flex items-center gap-1.5">
                          <span>{acc.email || `@${acc.username}`}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">{wordsLearned} từ</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleDeleteAccount(e, acc.id)}
                        className="p-1 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        title="Xóa tài khoản khỏi máy này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-6 h-6 rounded-lg bg-purple-50 group-hover:bg-purple-600 text-purple-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Switcher: Gmail vs Password */}
        <div className="flex border-b border-slate-100 bg-slate-100/60 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('gmail');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'gmail'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            <span>Đăng nhập Gmail (Nhanh)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('password');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'password'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-slate-600" />
            <span>Mật khẩu</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: GMAIL 1-CLICK AUTH */}
          {activeTab === 'gmail' && (
            <form onSubmit={handleGmailSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nhập địa chỉ Gmail của bạn
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    {/* Google G multi-color icon */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    value={gmailInput}
                    onChange={(e) => setGmailInput(e.target.value)}
                    placeholder="ví dụ: tenban@gmail.com"
                    autoFocus
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                  <span>💡</span>
                  <span>Chỉ cần nhập Gmail, hệ thống sẽ tự động đăng nhập hoặc tạo tài khoản mới ngay lập tức.</span>
                </p>
              </div>

              {/* Notice */}
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 text-[11px] text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Không sợ quên mật khẩu:</strong> Lần sau chỉ cần nhập đúng Gmail này là lấy lại toàn bộ tiến trình học.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading || !gmailInput.trim()}
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:brightness-110 text-white shadow-md shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Đăng Nhập / Tiếp Tục Với Gmail</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: USERNAME & PASSWORD */}
          {activeTab === 'password' && (
            <div>
              {/* Secondary Switcher: Login vs Register */}
              <div className="flex rounded-lg bg-slate-100 p-0.5 mb-3 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordMode('login');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-1.5 rounded-md transition-all ${
                    passwordMode === 'login'
                      ? 'bg-white text-purple-700 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPasswordMode('register');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-1.5 rounded-md transition-all ${
                    passwordMode === 'register'
                      ? 'bg-white text-purple-700 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Đăng ký mới
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                {passwordMode === 'register' && (
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
                        placeholder="Ví dụ: Minh Tâm..."
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                )}

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

                {passwordMode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Chọn Avatar
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                      {AVATAR_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setSelectedAvatar(emoji)}
                          className={`w-8 h-8 rounded-xl text-base flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  {passwordMode === 'login' ? (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Đăng Nhập</span>
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
          )}
        </div>
      </div>
    </div>
  );
};
