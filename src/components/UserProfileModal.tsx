import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  logoutUser,
  updateActiveUserProfile,
  AVATAR_OPTIONS
} from '../utils/authManager';
import {
  CheckCircle2,
  Bookmark,
  PenTool,
  Mic,
  LogOut,
  Sparkles,
  Edit3,
  Check,
  Award,
  BookOpen
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header with Avatar and User Name */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-emerald-600 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur border-2 border-white/40 flex items-center justify-center text-3xl shadow-lg select-none">
              {isEditing ? newAvatar : user.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight truncate">
                  {user.displayName}
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Chỉnh sửa thông tin"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-purple-200 font-mono">
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
                    className={`w-8 h-8 rounded-xl text-base flex items-center justify-center shrink-0 ${
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
                className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </div>
        )}

        {/* User Stats Grid (Như ảnh khoanh đỏ của người dùng) */}
        <div className="p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tiến trình học tập đã lưu:
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-emerald-800 font-semibold">Đã thuộc</div>
                <div className="text-lg font-black text-emerald-950">
                  {learnedCount} <span className="text-xs font-normal">từ</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-amber-800 font-semibold">Yêu thích</div>
                <div className="text-lg font-black text-amber-950">
                  {favCount} <span className="text-xs font-normal">từ</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-indigo-800 font-semibold">Đã tập viết</div>
                <div className="text-lg font-black text-indigo-950">
                  {practicedCount} <span className="text-xs font-normal">từ</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-purple-800 font-semibold">Điểm nói cao nhất</div>
                <div className="text-lg font-black text-purple-950">
                  {bestScore} <span className="text-xs font-normal">đ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleLogoutClick}
              className="px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất (Đổi tài khoản)</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-all active:scale-95"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
