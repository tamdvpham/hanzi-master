// User Authentication & Progress Management Service
// Auto-login & persistent device session for HSK learners

import { UserProfile, UserStats } from '../types';

const DB_KEY = 'hsk_master_users_db_v2';
const SESSION_KEY = 'hsk_master_active_session_v2';
const GUEST_STATS_KEY = 'chinese_hsk_user_stats_v1';

export const AVATAR_OPTIONS = [
  '👩🏻‍🎓',
  '🧑‍💻',
  '🐼',
  '🦊',
  '🦁',
  '🐱',
  '🚀',
  '🌟',
  '🏮',
  '🌸',
  '🏆',
  '🎯'
];

// Simple hash for local storage
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `hsk_${Math.abs(hash).toString(36)}`;
};

/**
 * Get all registered users from localStorage
 */
export const getUsersDB = (): Record<string, UserProfile> => {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load users DB:', e);
  }
  return {};
};

/**
 * Save users database
 */
export const saveUsersDB = (db: Record<string, UserProfile>): void => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Failed to save users DB:', e);
  }
};

/**
 * Get currently active logged-in user on this device/phone
 */
export const getActiveUser = (): UserProfile | null => {
  try {
    const activeId = localStorage.getItem(SESSION_KEY);
    if (!activeId) return null;

    const db = getUsersDB();
    const user = db[activeId];
    if (user) {
      return user;
    }
  } catch (e) {
    console.error('Failed to load active session:', e);
  }
  return null;
};

/**
 * Register a new user account
 */
export const registerUser = (
  usernameRaw: string,
  passwordRaw: string,
  displayNameRaw: string,
  avatarChoice?: string,
  initialStats?: UserStats
): { success: boolean; user?: UserProfile; error?: string } => {
  const username = usernameRaw.trim().toLowerCase();
  const displayName = displayNameRaw.trim() || username;
  const password = passwordRaw.trim();

  if (username.length < 3) {
    return { success: false, error: 'Tên đăng nhập cần ít nhất 3 ký tự' };
  }
  if (password.length < 4) {
    return { success: false, error: 'Mật khẩu cần ít nhất 4 ký tự' };
  }

  const db = getUsersDB();

  // Check if username already exists
  const existingId = Object.keys(db).find(
    (id) => db[id].username.toLowerCase() === username
  );
  if (existingId) {
    return { success: false, error: 'Tên đăng nhập này đã được sử dụng. Vui lòng chọn tên khác hoặc Đăng nhập.' };
  }

  const newId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const avatar = avatarChoice || AVATAR_OPTIONS[0];

  const emptyStats: UserStats = {
    learnedWordIds: [],
    favoriteWordIds: [],
    practiceCount: {},
    lastPracticed: {},
    pronunciationScores: {}
  };

  const newUser: UserProfile = {
    id: newId,
    username,
    displayName,
    passwordHash: simpleHash(password),
    avatar,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    stats: initialStats ? { ...initialStats } : emptyStats
  };

  db[newId] = newUser;
  saveUsersDB(db);

  // Set as active session (auto login on this phone/computer)
  try {
    localStorage.setItem(SESSION_KEY, newId);
  } catch (e) {}

  return { success: true, user: newUser };
};

/**
 * Log in with existing username & password
 */
export const loginUser = (
  usernameRaw: string,
  passwordRaw: string
): { success: boolean; user?: UserProfile; error?: string } => {
  const username = usernameRaw.trim().toLowerCase();
  const password = passwordRaw.trim();

  const db = getUsersDB();
  const userId = Object.keys(db).find(
    (id) => db[id].username.toLowerCase() === username
  );

  if (!userId) {
    return { success: false, error: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại hoặc Đăng ký.' };
  }

  const user = db[userId];
  const expectedHash = simpleHash(password);

  if (user.passwordHash && user.passwordHash !== expectedHash) {
    return { success: false, error: 'Mật khẩu không chính xác. Vui lòng thử lại.' };
  }

  // Update last login
  user.lastLoginAt = new Date().toISOString();
  db[userId] = user;
  saveUsersDB(db);

  // Set active session
  try {
    localStorage.setItem(SESSION_KEY, userId);
  } catch (e) {}

  return { success: true, user };
};

/**
 * Log out current session
 */
export const logoutUser = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error('Failed to logout:', e);
  }
};

/**
 * Update stats for active logged in user
 */
export const updateActiveUserStats = (stats: UserStats): void => {
  try {
    const activeId = localStorage.getItem(SESSION_KEY);
    if (!activeId) return;

    const db = getUsersDB();
    if (db[activeId]) {
      db[activeId].stats = stats;
      saveUsersDB(db);
    }
  } catch (e) {
    console.error('Failed to update user stats:', e);
  }
};

/**
 * Update active user profile details (displayName, avatar)
 */
export const updateActiveUserProfile = (
  displayName: string,
  avatar: string
): UserProfile | null => {
  try {
    const activeId = localStorage.getItem(SESSION_KEY);
    if (!activeId) return null;

    const db = getUsersDB();
    if (db[activeId]) {
      db[activeId].displayName = displayName.trim() || db[activeId].displayName;
      db[activeId].avatar = avatar;
      saveUsersDB(db);
      return db[activeId];
    }
  } catch (e) {}
  return null;
};
