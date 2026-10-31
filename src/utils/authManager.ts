// User Authentication & Progress Management Service
// Persistent device session & cross-device sync for HSK learners

import { HSKWord, UserProfile, UserStats } from '../types';

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
export const simpleHash = (str: string): string => {
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
 * Find user by username
 */
export const getUserByUsername = (usernameRaw: string): UserProfile | null => {
  const username = usernameRaw.trim().toLowerCase();
  const db = getUsersDB();
  const userId = Object.keys(db).find((id) => db[id].username.toLowerCase() === username);
  return userId ? db[userId] : null;
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
    (id) => db[id].username.toLowerCase() === username
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
    displayName,
    password, // Stored to allow password reveal on answering quiz correctly
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
 * Log in with existing username & password
 */
export const loginUser = (
  identifierRaw: string,
  passwordRaw: string,
  incomingStats?: UserStats
): { success: boolean; user?: UserProfile; error?: string } => {
  const identifier = identifierRaw.trim().toLowerCase();
  const password = passwordRaw.trim();

  const db = getUsersDB();
  const userId = Object.keys(db).find((id) => db[id].username.toLowerCase() === identifier);

  if (!userId) {
    return {
      success: false,
      error: 'Tài khoản không tồn tại trên thiết bị này. Vui lòng kiểm tra lại tên đăng nhập hoặc Đăng ký.'
    };
  }

  const user = db[userId];
  const expectedHash = simpleHash(password);

  // Accept either plain password match or hash match
  const isMatch = (user.password && user.password === password) || (user.passwordHash && user.passwordHash === expectedHash);

  if (!isMatch) {
    return { success: false, error: 'Mật khẩu không chính xác. Bạn có thể bấm "Quên mật khẩu?" để lấy lại.' };
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
 * Reset password for a username after completing quiz challenge
 */
export const resetUserPassword = (
  usernameRaw: string,
  newPasswordRaw: string
): { success: boolean; user?: UserProfile; error?: string } => {
  const username = usernameRaw.trim().toLowerCase();
  const newPassword = newPasswordRaw.trim();

  if (newPassword.length < 4) {
    return { success: false, error: 'Mật khẩu mới cần ít nhất 4 ký tự' };
  }

  const db = getUsersDB();
  const userId = Object.keys(db).find((id) => db[id].username.toLowerCase() === username);

  if (!userId) {
    return { success: false, error: 'Không tìm thấy tài khoản để đặt lại mật khẩu.' };
  }

  db[userId].password = newPassword;
  db[userId].passwordHash = simpleHash(newPassword);
  db[userId].lastLoginAt = new Date().toISOString();
  saveUsersDB(db);

  try {
    localStorage.setItem(SESSION_KEY, userId);
    localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(db[userId].stats));
  } catch (e) {}

  return { success: true, user: db[userId] };
};

/**
 * Generate a random Hanzi multiple-choice quiz question for password recovery
 */
export interface RecoveryQuizQuestion {
  word: HSKWord;
  promptText: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  correctOptionId: string;
}

export const generateRecoveryQuizQuestion = (allWords: HSKWord[]): RecoveryQuizQuestion => {
  // Prefer HSK 1 or 2 words so recovery questions are accessible and clear
  const pool = allWords.filter((w) => w.level === 1 || w.level === 2);
  const activePool = pool.length >= 10 ? pool : allWords;

  const targetWord = activePool[Math.floor(Math.random() * activePool.length)];

  // Get 3 distractors
  const otherWords = activePool.filter((w) => w.id !== targetWord.id && w.meaning !== targetWord.meaning);
  const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5);
  const distractors = shuffledOthers.slice(0, 3);

  const correctOption = {
    id: `opt_correct_${Date.now()}`,
    text: targetWord.meaning,
    isCorrect: true
  };

  const distractorOptions = distractors.map((w, i) => ({
    id: `opt_distractor_${i}_${Date.now()}`,
    text: w.meaning,
    isCorrect: false
  }));

  const allOptions = [correctOption, ...distractorOptions].sort(() => Math.random() - 0.5);

  return {
    word: targetWord,
    promptText: `Từ "${targetWord.hanzi}" (${targetWord.pinyin}) có nghĩa là gì trong tiếng Việt?`,
    options: allOptions,
    correctOptionId: correctOption.id
  };
};

/**
 * Export account to a portable Sync Key string for transferring to another device
 */
export const exportAccountSyncKey = (userId: string): string | null => {
  const db = getUsersDB();
  const user = db[userId];
  if (!user) return null;

  try {
    const payload = JSON.stringify({
      version: 1,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        password: user.password,
        passwordHash: user.passwordHash,
        avatar: user.avatar,
        stats: user.stats
      }
    });
    // UTF-8 safe base64
    const encoded = btoa(encodeURIComponent(payload));
    return `HSK_SYNC_${encoded}`;
  } catch (e) {
    console.error('Failed to export sync key:', e);
    return null;
  }
};

/**
 * Import account from a Sync Key string created on another device
 */
export const importAccountSyncKey = (
  rawKey: string,
  incomingStats?: UserStats
): { success: boolean; user?: UserProfile; error?: string } => {
  try {
    const cleanKey = rawKey.trim();
    if (!cleanKey.startsWith('HSK_SYNC_')) {
      return { success: false, error: 'Mã đồng bộ không hợp lệ. Mã bắt đầu bằng "HSK_SYNC_..."' };
    }

    const base64Data = cleanKey.replace('HSK_SYNC_', '');
    const jsonStr = decodeURIComponent(atob(base64Data));
    const data = JSON.parse(jsonStr);

    if (!data?.user?.username || !data?.user?.stats) {
      return { success: false, error: 'Dữ liệu tài khoản trong mã không hợp lệ hoặc bị hỏng.' };
    }

    const importedUser: UserProfile = {
      id: data.user.id || `user_${Date.now()}`,
      username: data.user.username,
      displayName: data.user.displayName || data.user.username,
      password: data.user.password,
      passwordHash: data.user.passwordHash,
      avatar: data.user.avatar || '👩🏻‍🎓',
      createdAt: data.user.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      stats: incomingStats ? mergeStats(data.user.stats, incomingStats) : data.user.stats
    };

    const db = getUsersDB();
    db[importedUser.id] = importedUser;
    saveUsersDB(db);

    try {
      localStorage.setItem(SESSION_KEY, importedUser.id);
      localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(importedUser.stats));
    } catch (e) {}

    return { success: true, user: importedUser };
  } catch (e: any) {
    return { success: false, error: 'Không thể giải mã mã đồng bộ. Vui lòng kiểm tra lại mã đã sao chép.' };
  }
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
