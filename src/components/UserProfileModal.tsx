import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { UserProfile } from '../types';
import {
  logoutUser,
  updateActiveUserProfile,
  generateQRLoginUrl,
  exportAccountSyncKey,
  AVATAR_OPTIONS
} from '../utils/authManager';
import {
  CheckCircle2,
  Bookmark,
  PenTool,
  LogOut,
  Sparkles,
  Edit3,
  Check,
  Award,
  Smartphone,
  Copy,
  QrCode,
  ScanQrCode
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUserUpdated: (user: UserProfile) => void;
  onLogout: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdated,
  onLogout
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const [newAvatar, setNewAvatar] = useState(user.avatar);
  const [showQRView, setShowQRView] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedSync, setIsCopiedSync] = useState(false);

  if (!isOpen) return null;

  const learnedCount = user.stats.learnedWordIds?.length || 0;
  const favCount = user.stats.favoriteWordIds?.length || 0;
  const practicedCount = Object.keys(user.stats.practiceCount || {}).length;
  const highestScores = Object.values(user.stats.pronunciationScores || {});
  const bestScore = highestScores.length > 0 ? Math.max(...highestScores) : 0;

  const handleSaveProfile = () => {
    const updated = updateActiveUserProfile(newDisplayName, newAvatar);
    if (updated) {
      onUserUpdated(updated);
    }
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    logoutUser();
    onLogout();
    onClose();
  };

  const qrLoginUrl = generateQRLoginUrl(user);

  const handleCopyQRLink = () => {
    if (qrLoginUrl) {
      navigator.clipboard.writeText(qrLoginUrl);
      setIsCopiedLink(true);
      setTimeout(() => setIsCopiedLink(false), 2500);
    }
  };

  const handleCopySyncKey = () => {
    const key = exportAccountSyncKey(user.id);
    if (key) {
      navigator.clipboard.writeText(key);
      setIsCopiedSync(true);
      setTimeout(() => setIsCopiedSync(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200 my-auto">
        {/* Header with Avatar and User Name */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-emerald-600 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur border-2 border-white/40 flex items-center justify-center text-3xl shadow-lg select-none shrink-0">
              {isEditing ? newAvatar : user.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight truncate">
                  {user.displayName}
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  title="Chỉnh sửa thông tin"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-purple-200 font-mono truncate">
                @{user.username}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Đã lưu trên thiết bị này</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Mode */}
        {isEditing && (
          <div className="p-4 bg-purple-50/70 border-b border-purple-100 space-y-3 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Tên hiển thị mới
              </label>
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Chọn Avatar mới
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setNewAvatar(emoji)}
                    className={`w-8 h-8 rounded-xl text-base flex items-center justify-center shrink-0 cursor-pointer ${
                      newAvatar === emoji
                        ? 'bg-purple-600 ring-2 ring-purple-300'
                        : 'bg-white hover:bg-slate-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setIsEditing(false)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </div>
        )}

        {/* User Stats Grid */}
        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tiến trình học tập đã lưu:
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-emerald-800 font-semibold">Đã thuộc</div>
                <div className="text-base font-black text-emerald-950">
                  {learnedCount} <span className="text-xs font-normal">từ</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-amber-800 font-semibold">Yêu thích</div>
                <div className="text-base font-black text-amber-950">
                  {favCount} <span className="text-xs font-normal">từ</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl p-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-indigo-800 font-semibold">Đã tập viết</div>
                <div className="text-base font-black text-indigo-950">
                  {practicedCount} <span className="text-xs font-normal">từ</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-purple-800 font-semibold">Nói cao nhất</div>
                <div className="text-base font-black text-purple-950">
                  {bestScore} <span className="text-xs font-normal">đ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Device QR Code Login Section */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50/50 border border-purple-200 rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-purple-600" />
                <span>Mã QR Đăng Nhập Trên Máy Khác</span>
              </span>
              <button
                type="button"
                onClick={() => setShowQRView(!showQRView)}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <ScanQrCode className="w-3.5 h-3.5 text-amber-300" />
                <span>{showQRView ? 'Ẩn mã QR' : 'Hiện Mã QR'}</span>
              </button>
            </div>

            {showQRView ? (
              <div className="flex flex-col items-center bg-white rounded-2xl p-4 border border-purple-100 shadow-xs animate-in zoom-in-95 duration-200 space-y-3">
                <div className="p-3 bg-white rounded-2xl border-2 border-purple-300 shadow-md">
                  <QRCodeSVG
                    value={qrLoginUrl}
                    size={190}
                    level="M"
                    includeMargin={true}
                  />
                </div>
                <div className="text-center space-y-1">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
                    <span>{user.avatar}</span>
                    <span>Tài khoản: @{user.username}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-xs leading-normal">
                    👉 <strong>Cách 1:</strong> Mở camera trên điện thoại hướng vào mã QR này để tự động mở web và đăng nhập ngay.
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-xs leading-normal">
                    👉 <strong>Cách 2:</strong> Trên máy khác, vào <strong>Đăng nhập → Quét mã QR</strong> để quét.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1 w-full">
                  <button
                    type="button"
                    onClick={handleCopyQRLink}
                    className="flex-1 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-purple-200"
                  >
                    {isCopiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Đã chép link đăng nhập!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép Link QR</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-purple-800 leading-relaxed">
                Bấm <strong>"Hiện Mã QR"</strong>, sau đó mở camera trên điện thoại hoặc thiết bị khác quét mã là tự động đăng nhập tài khoản sang máy đó ngay lập tức!
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleLogoutClick}
              className="px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
