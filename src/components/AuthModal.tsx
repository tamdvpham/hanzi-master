import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, UserStats } from '../types';
import { HSK_WORDS } from '../data/hskData';
import {
  registerUser,
  loginUser,
  loginSavedAccount,
  getSavedAccountsOnDevice,
  deleteAccountFromDevice,
  getUserByUsername,
  resetUserPassword,
  generateRecoveryQuizQuestion,
  importAccountSyncKey,
  parseQRAuthToken,
  RecoveryQuizQuestion,
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
  Trash2,
  ArrowRight,
  HelpCircle,
  KeyRound,
  RotateCcw,
  Smartphone,
  Check,
  Copy,
  QrCode,
  ScanQrCode,
  Camera,
  Upload
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  currentGuestStats?: UserStats;
}

type ModalView = 'login' | 'register' | 'forgot-username' | 'forgot-quiz' | 'forgot-success' | 'scan-qr' | 'import-sync';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  currentGuestStats
}) => {
  const [view, setView] = useState<ModalView>('login');

  // Login / Register Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  // Forgot password quiz states
  const [recoveryUsername, setRecoveryUsername] = useState('');
  const [targetUser, setTargetUser] = useState<UserProfile | null>(null);
  const [quizQuestion, setQuizQuestion] = useState<RecoveryQuizQuestion | null>(null);
  const [selectedQuizOptionId, setSelectedQuizOptionId] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isCopiedPassword, setIsCopiedPassword] = useState(false);

  // Cross-device sync import state
  const [syncKeyInput, setSyncKeyInput] = useState('');

  // Saved accounts on device
  const [savedAccounts, setSavedAccounts] = useState<UserProfile[]>([]);

  // QR Scan states
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const html5QrCodeRef = useRef<any>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSavedAccounts(getSavedAccountsOnDevice());
      setView('login');
      setErrorMessage(null);
      setSuccessMessage(null);
      setQuizFeedback(null);
      setSelectedQuizOptionId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const learnedCount = currentGuestStats?.learnedWordIds?.length || 0;

  // 1-Tap select saved account
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

  // Delete saved account
  const handleDeleteAccount = (e: React.MouseEvent, accountId: string) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc muốn xóa tài khoản này khỏi thiết bị?')) {
      deleteAccountFromDevice(accountId);
      setSavedAccounts(getSavedAccountsOnDevice());
    }
  };

  // Standard Login / Register submit
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (view === 'register') {
        const res = await registerUser(
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
        const res = await loginUser(username, password, currentGuestStats);
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

  // STEP 1 of Forgot Password: check if username exists and start quiz
  const handleStartRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const user = await getUserByUsername(recoveryUsername);
      if (!user) {
        setErrorMessage(
          'Không tìm thấy tài khoản này. Vui lòng kiểm tra lại tên đăng nhập.'
        );
        return;
      }

      setTargetUser(user);
      setQuizQuestion(generateRecoveryQuizQuestion(HSK_WORDS));
      setSelectedQuizOptionId(null);
      setQuizFeedback(null);
      setView('forgot-quiz');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2 of Forgot Password: user answers Hanzi multiple-choice quiz
  const handleAnswerQuiz = (optionId: string) => {
    if (!quizQuestion || selectedQuizOptionId) return;

    setSelectedQuizOptionId(optionId);
    const chosenOption = quizQuestion.options.find((o) => o.id === optionId);
    const isCorrect = !!chosenOption?.isCorrect;

    if (isCorrect) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}

      setQuizFeedback({
        isCorrect: true,
        message: '🎉 Chính xác! Bạn đã vượt qua câu hỏi trắc nghiệm.'
      });

      // Advance to success view after short delay
      setTimeout(() => {
        setNewPassword(targetUser?.password || '');
        setView('forgot-success');
      }, 700);
    } else {
      setQuizFeedback({
        isCorrect: false,
        message: `Chưa đúng! Nghĩa của "${quizQuestion.word.hanzi}" là "${quizQuestion.word.meaning}". Hãy thử lại câu khác nhé!`
      });

      // Generate new question after 1.5s
      setTimeout(() => {
        setQuizQuestion(generateRecoveryQuizQuestion(HSK_WORDS));
        setSelectedQuizOptionId(null);
        setQuizFeedback(null);
      }, 1500);
    }
  };

  // STEP 3 of Forgot Password: Save new password and auto login
  const handleCompleteRecovery = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!targetUser) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (newPassword && newPassword !== targetUser.password) {
        const res = await resetUserPassword(targetUser.username, newPassword);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Không thể đổi mật khẩu.');
        }
      } else {
        // Log in with existing password
        const res = await loginUser(targetUser.username, targetUser.password || password, currentGuestStats);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  // QR code scan success processor
  const handleQRSuccess = async (decodedText: string) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const parsed = parseQRAuthToken(decodedText);
      if (!parsed?.username) {
        setErrorMessage('Mã QR không hợp lệ hoặc không chứa dữ liệu tài khoản Hán Tự Master.');
        setIsLoading(false);
        return;
      }

      const res = await loginUser(parsed.username, parsed.password || '', currentGuestStats);
      if (res.success && res.user) {
        try {
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        setSuccessMessage(`Đăng nhập thành công từ mã QR tài khoản "${res.user.displayName}"!`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 500);
      } else {
        setErrorMessage(res.error || 'Đăng nhập từ mã QR không thành công.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi khi quét mã QR.');
    } finally {
      setIsLoading(false);
    }
  };

  // Upload QR image file
  const handleFileQRChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const tempScanner = html5QrCodeRef.current || new Html5Qrcode('qr-camera-viewport');
      const decodedText = await tempScanner.scanFile(file, true);
      handleQRSuccess(decodedText);
    } catch (err) {
      console.warn('Scan file error:', err);
      setErrorMessage('Không nhận diện được mã QR trong ảnh này. Vui lòng thử ảnh rõ nét hơn hoặc dùng camera.');
      setIsLoading(false);
    }
  };

  // Camera QR scanner lifecycle (dynamically loaded only in scan-qr view)
  useEffect(() => {
    let scanner: any = null;
    let isMounted = true;

    if (isOpen && view === 'scan-qr') {
      setCameraError(null);
      setIsCameraActive(false);

      const timer = setTimeout(async () => {
        if (!isMounted) return;
        const elem = document.getElementById('qr-camera-viewport');
        if (!elem) return;

        try {
          const { Html5Qrcode } = await import('html5-qrcode');
          if (!isMounted) return;

          scanner = new Html5Qrcode('qr-camera-viewport');
          html5QrCodeRef.current = scanner;

          scanner.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 220, height: 220 } },
            (decodedText: string) => {
              if (scanner && scanner.isScanning) {
                scanner.stop().then(() => {
                  handleQRSuccess(decodedText);
                }).catch(() => {
                  handleQRSuccess(decodedText);
                });
              } else {
                handleQRSuccess(decodedText);
              }
            },
            () => {}
          ).then(() => {
            if (isMounted) setIsCameraActive(true);
          }).catch((err: any) => {
            console.warn('Camera start error:', err);
            if (isMounted) {
              setCameraError('Không thể mở camera. Bạn có thể cho phép quyền máy ảnh, hoặc bấm "Tải ảnh mã QR" bên dưới.');
            }
          });
        } catch (e) {
          console.error(e);
        }
      }, 350);

      return () => {
        isMounted = false;
        clearTimeout(timer);
        if (scanner) {
          try {
            if (scanner.isScanning) {
              scanner.stop().catch(() => {});
            }
          } catch (e) {}
        }
      };
    }
  }, [isOpen, view]);

  // Import Account from Sync Key or QR URL (cross-device)
  const handleImportSyncKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const parsed = parseQRAuthToken(syncKeyInput);
      if (parsed?.username) {
        const res = await loginUser(parsed.username, parsed.password || '', currentGuestStats);
        if (res.success && res.user) {
          try {
            confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          } catch (e) {}
          setSuccessMessage(`Đã đăng nhập thành công tài khoản "${res.user.displayName}"!`);
          setTimeout(() => {
            onAuthSuccess(res.user!);
            onClose();
          }, 500);
          return;
        }
      }

      const res = importAccountSyncKey(syncKeyInput, currentGuestStats);
      if (res.success && res.user) {
        setSuccessMessage(`Đã khôi phục thành công tài khoản "${res.user.displayName}" sang thiết bị này!`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 500);
      } else {
        setErrorMessage(res.error || 'Mã đồng bộ không hợp lệ.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPassword = () => {
    if (targetUser?.password) {
      navigator.clipboard.writeText(targetUser.password);
      setIsCopiedPassword(true);
      setTimeout(() => setIsCopiedPassword(false), 2000);
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
              {view.startsWith('forgot') ? '🔐' : view === 'scan-qr' ? '📷' : view === 'import-sync' ? '📲' : view === 'register' ? selectedAvatar : '👤'}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                {view.startsWith('forgot')
                  ? 'Lấy Lại Mật Khẩu (Trắc Nghiệm)'
                  : view === 'scan-qr'
                  ? 'Quét Mã QR Đăng Nhập'
                  : view === 'import-sync'
                  ? 'Đồng Bộ Từ Thiết Bị Khác'
                  : view === 'register'
                  ? 'Đăng Ký Tài Khoản Mới'
                  : 'Đăng Nhập Tài Khoản'}
              </h2>
              <p className="text-[11px] sm:text-xs text-purple-200">
                {view.startsWith('forgot')
                  ? 'Vượt qua câu hỏi đố chữ Hán để lấy lại mật khẩu'
                  : view === 'scan-qr'
                  ? 'Hướng camera vào mã QR trên thiết bị cũ để đăng nhập ngay'
                  : view === 'import-sync'
                  ? 'Dán mã đồng bộ hoặc link QR từ thiết bị cũ'
                  : 'Lưu vĩnh viễn tiến trình học tập và từ vựng đã thuộc'}
              </p>
            </div>
          </div>

          {/* Migration prompt for existing progress */}
          {learnedCount > 0 && (view === 'login' || view === 'register') && (
            <div className="mt-3 bg-white/15 backdrop-blur-md rounded-xl p-2 sm:p-2.5 flex items-center gap-2 text-xs border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>
                Bạn đang có <strong>{learnedCount} từ vựng đã học</strong>. Tiến trình này sẽ được lưu ngay vào tài khoản!
              </span>
            </div>
          )}
        </div>

        {/* 1-Tap Saved Accounts on Device (shown on Login & Register) */}
        {(view === 'login' || view === 'register') && savedAccounts.length > 0 && (
          <div className="p-3 bg-slate-50 border-b border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Tài khoản trên thiết bị này:
              </span>
              <span className="text-[10px] text-slate-400">Chạm để vào ngay</span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
              {savedAccounts.filter((acc) => Boolean(acc && acc.id)).map((acc) => {
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
                          <span>@{acc.username}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">{wordsLearned} từ đã thuộc</span>
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

        {/* Tab Switcher: Login vs Register */}
        {(view === 'login' || view === 'register') && (
          <div className="flex border-b border-slate-100 bg-slate-100/60 p-1">
            <button
              type="button"
              onClick={() => {
                setView('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                view === 'login'
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
                setView('register');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                view === 'register'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Đăng ký mới</span>
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 px-3 py-2 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* VIEW 1 & 2: LOGIN / REGISTER */}
          {(view === 'login' || view === 'register') && (
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {view === 'register' && (
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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Mật khẩu
                  </label>
                  {view === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setRecoveryUsername(username);
                        setView('forgot-username');
                        setErrorMessage(null);
                      }}
                      className="text-[11px] font-semibold text-purple-600 hover:text-purple-800 hover:underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
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

              {view === 'register' && (
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
                        className={`w-8 h-8 rounded-xl text-base flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer ${
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                {view === 'login' ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Đăng Nhập</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Tạo Tài Khoản & Lưu Tiến Trình</span>
                  </>
                )}
              </button>

              {/* Secondary Option: QR Code Login Button & Alternative Sync */}
              <div className="pt-2.5 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setView('scan-qr');
                    setErrorMessage(null);
                  }}
                  className="w-full py-2.5 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50/60 hover:from-purple-100 hover:to-indigo-100 text-purple-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <ScanQrCode className="w-4 h-4 text-purple-600" />
                  <span>Quét Mã QR Đăng Nhập Từ Thiết Bị Khác</span>
                </button>
              </div>
            </form>
          )}

          {/* VIEW 3: FORGOT PASSWORD - STEP 1: USERNAME INPUT */}
          {view === 'forgot-username' && (
            <form onSubmit={handleStartRecovery} className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 text-xs text-purple-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-purple-950">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  <span>Lấy lại mật khẩu qua trắc nghiệm</span>
                </div>
                <span>
                  Nhập tên đăng nhập của bạn. Hệ thống sẽ đưa ra một câu hỏi chữ Hán đố vui, trả lời đúng là bạn sẽ lấy lại được mật khẩu ngay!
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nhập tên đăng nhập cần lấy lại mật khẩu
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={recoveryUsername}
                    onChange={(e) => setRecoveryUsername(e.target.value)}
                    placeholder="Ví dụ: minhtam2026"
                    autoFocus
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setView('login');
                    setErrorMessage(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={!recoveryUsername.trim()}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>Bắt Đầu Thử Thách Trắc Nghiệm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* VIEW 4: FORGOT PASSWORD - STEP 2: HANZI QUIZ CHALLENGE */}
          {view === 'forgot-quiz' && quizQuestion && targetUser && (
            <div className="space-y-3.5">
              <div className="text-center">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold mb-1">
                  Xác minh tài khoản: @{targetUser.username}
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  Chữ Hán dưới đây có nghĩa là gì trong tiếng Việt?
                </h3>
              </div>

              {/* Chinese Card */}
              <div className="bg-gradient-to-b from-purple-50 to-indigo-50/50 rounded-2xl p-4 border border-purple-100 text-center shadow-xs">
                <div className="font-chinese text-5xl font-black text-purple-700 drop-shadow-xs">
                  {quizQuestion.word.hanzi}
                </div>
                <div className="text-sm font-bold text-purple-600 mt-1">
                  {quizQuestion.word.pinyin}
                </div>
              </div>

              {/* Feedback Alert */}
              {quizFeedback && (
                <div
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
                    quizFeedback.isCorrect
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {quizFeedback.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{quizFeedback.message}</span>
                </div>
              )}

              {/* 4 Options Grid */}
              <div className="grid grid-cols-2 gap-2">
                {quizQuestion.options.map((opt, idx) => {
                  const isSelected = selectedQuizOptionId === opt.id;
                  let btnColor = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-purple-300 hover:bg-purple-50/50';

                  if (isSelected) {
                    btnColor = opt.isCorrect
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-md'
                      : 'bg-rose-500 border-rose-600 text-white shadow-md';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={!!selectedQuizOptionId}
                      onClick={() => handleAnswerQuiz(opt.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all active:scale-95 cursor-pointer flex items-start gap-1.5 ${btnColor}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug break-words">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setView('forgot-username');
                    setQuizFeedback(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  ← Đổi tên tài khoản
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setQuizQuestion(generateRecoveryQuizQuestion(HSK_WORDS));
                    setSelectedQuizOptionId(null);
                    setQuizFeedback(null);
                  }}
                  className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đổi câu hỏi khác</span>
                </button>
              </div>
            </div>
          )}

          {/* VIEW 5: FORGOT PASSWORD - STEP 3: SUCCESS & RESET */}
          {view === 'forgot-success' && targetUser && (
            <div className="space-y-3.5 animate-in zoom-in-95">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center text-lg mb-1.5 shadow-xs">
                  ✓
                </div>
                <h3 className="text-sm font-bold text-emerald-950">
                  Xác minh thành công!
                </h3>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Bạn là chủ sở hữu của tài khoản <strong>@{targetUser.username}</strong>
                </p>
              </div>

              {/* Show retrieved current password */}
              {targetUser.password && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Mật khẩu hiện tại của bạn:
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-base text-purple-700 bg-white px-3 py-1 rounded-lg border border-slate-200 select-all">
                      {targetUser.password}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="px-2.5 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-100 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      {isCopiedPassword ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedPassword ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Or Set New Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Hoặc đổi mật khẩu mới (Tùy chọn):
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới nếu muốn đổi"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCompleteRecovery()}
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập Vào Tài Khoản Ngay</span>
              </button>
            </div>
          )}

          {/* VIEW: SCAN QR CODE TO LOG IN */}
          {view === 'scan-qr' && (
            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 text-xs text-purple-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-purple-950">
                  <ScanQrCode className="w-4 h-4 text-purple-600" />
                  <span>Quét Mã QR Để Đăng Nhập</span>
                </div>
                <span>
                  Trên máy đang đăng nhập, bạn mở <strong>Hồ sơ → bấm "Hiện Mã QR"</strong>, sau đó hướng camera vào mã QR để đăng nhập ngay mà không cần gõ mật khẩu!
                </span>
              </div>

              {/* Viewport element for Html5Qrcode camera */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-purple-300 aspect-square max-w-[260px] mx-auto shadow-inner flex items-center justify-center">
                <div id="qr-camera-viewport" className="w-full h-full overflow-hidden" />

                {/* Overlaid Animated Scanner Line & Corner Brackets */}
                <div className="absolute inset-4 pointer-events-none border-2 border-dashed border-purple-400/70 rounded-xl flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
                </div>

                {!isCameraActive && !cameraError && (
                  <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center text-white text-xs gap-2 p-3 text-center">
                    <Camera className="w-8 h-8 text-purple-400 animate-bounce" />
                    <span>Đang khởi động máy ảnh...</span>
                  </div>
                )}

                {cameraError && (
                  <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center text-white text-xs gap-2 p-3 text-center">
                    <AlertCircle className="w-8 h-8 text-rose-400" />
                    <span className="text-rose-200 leading-tight">{cameraError}</span>
                  </div>
                )}
              </div>

              {/* Hidden file input for uploading QR code screenshot */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileQRChange}
              />

              {/* Camera Actions & Alternative */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-purple-600" />
                  <span>Tải ảnh mã QR lên (từ thư viện ảnh / ảnh chụp)</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setView('login');
                      setErrorMessage(null);
                    }}
                    className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Quay lại
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setView('import-sync');
                      setErrorMessage(null);
                    }}
                    className="flex-1 py-2 text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border border-purple-200"
                  >
                    Dán link / Mã thủ công
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 6: IMPORT FROM OTHER DEVICE (CROSS-DEVICE SYNC) */}
          {view === 'import-sync' && (
            <form onSubmit={handleImportSyncKey} className="space-y-3">
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 text-xs text-sky-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-sky-950">
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  <span>Đăng nhập từ thiết bị khác</span>
                </div>
                <span>
                  Trên điện thoại hoặc máy tính cũ, bạn vào <strong>Hồ sơ tài khoản → bấm "Sao chép Mã Đồng Bộ"</strong>, sau đó dán mã vào ô bên dưới để chuyển toàn bộ tài khoản và tiến trình sang máy này!
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dán Mã Đồng Bộ (Sync Key) vào đây:
                </label>
                <textarea
                  required
                  rows={3}
                  value={syncKeyInput}
                  onChange={(e) => setSyncKeyInput(e.target.value)}
                  placeholder="Dán mã bắt đầu bằng HSK_SYNC_..."
                  className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setView('login');
                    setErrorMessage(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !syncKeyInput.trim()}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Đồng Bộ & Đăng Nhập Ngay</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
