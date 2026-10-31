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
 * Safely merge guest progress with existing user progress
 * Ensures no learned words or high scores are ever lost
 */
export const mergeStats = (baseStats: UserStats, incomingStats?: UserStats): UserStats => {
  if (!incomingStats) return { ...baseStats };

  const learnedWordIds = Array.from(
    new Set([...(baseStats.learnedWordIds || []), ...(incomingStats.learnedWordIds || [])])
  );

  const favoriteWordIds = Array.from(
    new Set([...(baseStats.favoriteWordIds || []), ...(incomingStats.favoriteWordIds || [])])
  );

  const practiceCount: Record<string, number> = { ...(baseStats.practiceCount || {}) };
  Object.entries(incomingStats.practiceCount || {}).forEach(([k, v]) => {
    practiceCount[k] = (practiceCount[k] || 0) + v;
  });

  const lastPracticed: Record<string, string> = { ...(baseStats.lastPracticed || {}) };
  Object.entries(incomingStats.lastPracticed || {}).forEach(([k, v]) => {
    if (!lastPracticed[k] || new Date(v) > new Date(lastPracticed[k])) {
      lastPracticed[k] = v;
    }
  });

  const pronunciationScores: Record<string, number> = { ...(baseStats.pronunciationScores || {}) };
  Object.entries(incomingStats.pronunciationScores || {}).forEach(([k, v]) => {
    pronunciationScores[k] = Math.max(pronunciationScores[k] || 0, v);
  });

  return {
    learnedWordIds,
    favoriteWordIds,
    practiceCount,
    lastPracticed,
    pronunciationScores
  };
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
 * Get all saved accounts on this device sorted by most recently used
 */
export const getSavedAccountsOnDevice = (): UserProfile[] => {
  const db = getUsersDB();
  return Object.values(db).sort((a, b) => {
    const timeA = new Date(a.lastLoginAt || 0).getTime();
    const timeB = new Date(b.lastLoginAt || 0).getTime();
    return timeB - timeA;
  });
};

/**
 * Delete an account from the device storage
 */
export const deleteAccountFromDevice = (userId: string): boolean => {
  try {
    const db = getUsersDB();
    if (db[userId]) {
      delete db[userId];
      saveUsersDB(db);

      // If active session was deleted, clear active session
      const activeId = localStorage.getItem(SESSION_KEY);
      if (activeId === userId) {
        localStorage.removeItem(SESSION_KEY);
      }
      return true;
    }
  } catch (e) {
    console.error('Failed to delete account:', e);
  }
  return false;
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
 * Instant 1-Click Login / Register with Gmail
 * Auto-detects whether the Gmail was used before:
 * - If already exists: logs in immediately, merges any guest progress, restores all data.
 * - If new: automatically creates profile, attaches guest progress, saves, and logs in.
 * Guaranteed zero password lockout!
 */
export const loginWithGmail = (
  rawEmail: string,
  incomingStats?: UserStats
): { success: boolean; user?: UserProfile; isNew?: boolean; error?: string } => {
  let email = rawEmail.trim().toLowerCase();

  // If user only typed username, auto-append @gmail.com
  if (!email.includes('@')) {
    email = `${email}@gmail.com`;
  }

  // Basic email pattern validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Địa chỉ Gmail không hợp lệ. Vui lòng kiểm tra lại.' };
  }

  const db = getUsersDB();

  // Search if user exists by email or matching username
  const existingId = Object.keys(db).find((id) => {
    const u = db[id];
    return (
      u.email?.toLowerCase() === email ||
      u.username?.toLowerCase() === email ||
      u.username?.toLowerCase() === email.replace('@gmail.com', '')
    );
  });

  if (existingId) {
    const user = db[existingId];
    user.email = email;
    user.lastLoginAt = new Date().toISOString();
    // Merge stats with incoming progress so no learned words are lost
    user.stats = mergeStats(user.stats, incomingStats);

    db[existingId] = user;
    saveUsersDB(db);

    try {
      localStorage.setItem(SESSION_KEY, existingId);
      localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(user.stats));
    } catch (e) {}

    return { success: true, user, isNew: false };
  }

  // Create new profile for this Gmail
  const newId = `gmail_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const emailPrefix = email.split('@')[0];
  // Capitalize display name: e.g. "minh.tam" -> "Minh Tam"
  const formattedName = emailPrefix
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Assign random fun avatar
  const avatar = AVATAR_OPTIONS[Math.floor(Math.random() * AVATAR_OPTIONS.length)];

  const emptyStats: UserStats = {
    learnedWordIds: [],
    favoriteWordIds: [],
    practiceCount: {},
    lastPracticed: {},
    pronunciationScores: {}
  };

  const newUser: UserProfile = {
    id: newId,
    username: emailPrefix,
    email,
    authProvider: 'gmail',
    displayName: formattedName || 'Học viên HSK',
    avatar,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    stats: incomingStats ? mergeStats(emptyStats, incomingStats) : emptyStats
  };

  db[newId] = newUser;
  saveUsersDB(db);

  try {
    localStorage.setItem(SESSION_KEY, newId);
    localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(newUser.stats));
  } catch (e) {}

  return { success: true, user: newUser, isNew: true };
};

/**
 * 1-Tap Login with an existing saved account on device
 */
export const loginSavedAccount = (
  userId: string,
  incomingStats?: UserStats
): { success: boolean; user?: UserProfile; error?: string } => {
  const db = getUsersDB();
  const user = db[userId];

  if (!user) {
    return { success: false, error: 'Tài khoản không tìm thấy trên thiết bị.' };
  }

  user.lastLoginAt = new Date().toISOString();
  if (incomingStats) {
    user.stats = mergeStats(user.stats, incomingStats);
  }

  db[userId] = user;
  saveUsersDB(db);

  try {
    localStorage.setItem(SESSION_KEY, userId);
    localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(user.stats));
  } catch (e) {}

  return { success: true, user };
};

/**
 * Register a new user account with custom username & password
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
    (id) => db[id].username.toLowerCase() === username || db[id].email?.toLowerCase() === username
  );
  if (existingId) {
    return {
      success: false,
      error: 'Tên đăng nhập này đã được sử dụng. Vui lòng chuyển sang tab Đăng Nhập hoặc chọn tên khác.'
    };
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
    authProvider: 'password',
    displayName,
    passwordHash: simpleHash(password),
    avatar,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    stats: initialStats ? mergeStats(emptyStats, initialStats) : emptyStats
  };

  db[newId] = newUser;
  saveUsersDB(db);

  try {
    localStorage.setItem(SESSION_KEY, newId);
    localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(newUser.stats));
  } catch (e) {}

  return { success: true, user: newUser };
};

/**
 * Log in with existing username/email & password
 */
export const loginUser = (
  identifierRaw: string,
  passwordRaw: string,
  incomingStats?: UserStats
): { success: boolean; user?: UserProfile; error?: string } => {
  const identifier = identifierRaw.trim().toLowerCase();
  const password = passwordRaw.trim();

  const db = getUsersDB();
  const userId = Object.keys(db).find((id) => {
    const u = db[id];
    return (
      u.username.toLowerCase() === identifier ||
      u.email?.toLowerCase() === identifier
    );
  });

  if (!userId) {
    return {
      success: false,
      error: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại hoặc Đăng nhập nhanh bằng Gmail.'
    };
  }

  const user = db[userId];
  const expectedHash = simpleHash(password);

  if (user.passwordHash && user.passwordHash !== expectedHash) {
    return { success: false, error: 'Mật khẩu không chính xác. Vui lòng thử lại.' };
  }

  // Update last login & merge incoming stats
  user.lastLoginAt = new Date().toISOString();
  if (incomingStats) {
    user.stats = mergeStats(user.stats, incomingStats);
  }

  db[userId] = user;
  saveUsersDB(db);

  try {
    localStorage.setItem(SESSION_KEY, userId);
    localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(user.stats));
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
