// User Authentication & Cloud Synchronization Service
// Enables multi-device login (phone, laptop, tablet) with automatic case-insensitive usernames

import { HSKWord, UserProfile, UserStats } from '../types';

const DB_KEY = 'hsk_master_users_db_v2';
const SESSION_KEY = 'hsk_master_active_session_v2';
const GUEST_STATS_KEY = 'chinese_hsk_user_stats_v1';
const CLOUD_FALLBACK_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a1933b62dd78f6';

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

/**
 * Normalize username: ALWAYS case-insensitive and trimmed
 * E.g. "Tampham", "tampham", "TAMPHAM " -> "tampham"
 */
export const normalizeUsername = (raw: string): string => {
  return (raw || '').trim().toLowerCase();
};

// Simple hash for local cache
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
 * Get all registered users from local browser cache
 */
export const getUsersDB = (): Record<string, UserProfile> => {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load users DB:', e);
  }
  return {};
};

/**
 * Save users database to local browser cache
 */
export const saveUsersDB = (db: Record<string, UserProfile>): void => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Failed to save users DB:', e);
  }
};

/**
 * Cloud API Helper: Call Vercel serverless function with direct cloud DB fallback
 */
async function callCloudAuth(action: string, payload: any = {}): Promise<any> {
  try {
    // 1. Try local Vercel serverless API route first
    const apiRes = await fetch(`/api/auth?action=${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload })
    });
    if (apiRes.ok) {
      return await apiRes.json();
    }
  } catch (e) {
    // API route not reachable (e.g. running on Vite dev server without Vercel CLI)
  }

  // 2. Direct Cloud DB fallback
  try {
    const cloudRes = await fetch(CLOUD_FALLBACK_URL);
    const cloudData = await cloudRes.json();
    const users: Record<string, any> = cloudData?.data?.users || {};

    if (action === 'get-user') {
      const u = normalizeUsername(payload.username);
      if (users[u]) {
        return { success: true, user: users[u] };
      }
      return { success: false, error: 'Tài khoản không tồn tại.' };
    }

    if (action === 'login') {
      const u = normalizeUsername(payload.username);
      const user = users[u];
      if (!user) {
        return { success: false, error: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại tên đăng nhập hoặc Đăng ký.' };
      }
      if (user.password !== payload.password) {
        return { success: false, error: 'Mật khẩu không chính xác. Bạn có thể bấm "Quên mật khẩu?" để lấy lại.' };
      }
      user.lastLoginAt = new Date().toISOString();
      if (payload.incomingStats) {
        user.stats = mergeStats(user.stats, payload.incomingStats);
      }
      users[u] = user;

      // Update cloud DB
      fetch(CLOUD_FALLBACK_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'hsk_master_users_db', data: { users } })
      }).catch(() => {});

      return { success: true, user };
    }

    if (action === 'register') {
      const u = normalizeUsername(payload.username);
      if (users[u]) {
        return { success: false, error: 'Tên đăng nhập này đã được sử dụng. Vui lòng chọn tên khác.' };
      }
      const newUser: UserProfile = {
        id: `u_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        username: u,
        displayName: payload.displayName || u,
        password: payload.password,
        passwordHash: simpleHash(payload.password),
        avatar: payload.avatar || '👩🏻‍🎓',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        stats: payload.stats || {
          learnedWordIds: [],
          favoriteWordIds: [],
          practiceCount: {},
          lastPracticed: {},
          pronunciationScores: {}
        }
      };
      users[u] = newUser;

      await fetch(CLOUD_FALLBACK_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'hsk_master_users_db', data: { users } })
      });

      return { success: true, user: newUser };
    }

    if (action === 'sync-stats') {
      const u = normalizeUsername(payload.username);
      if (users[u]) {
        users[u].stats = payload.stats;
        users[u].lastLoginAt = new Date().toISOString();
        fetch(CLOUD_FALLBACK_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'hsk_master_users_db', data: { users } })
        }).catch(() => {});
      }
      return { success: true };
    }

    if (action === 'reset-password') {
      const u = normalizeUsername(payload.username);
      if (!users[u]) {
        return { success: false, error: 'Không tìm thấy tài khoản.' };
      }
      users[u].password = payload.newPassword;
      users[u].passwordHash = simpleHash(payload.newPassword);
      users[u].lastLoginAt = new Date().toISOString();

      await fetch(CLOUD_FALLBACK_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'hsk_master_users_db', data: { users } })
      });

      return { success: true, user: users[u] };
    }
  } catch (e: any) {
    console.error('Direct cloud fallback error:', e);
  }

  return { success: false, error: 'Không thể kết nối đến máy chủ.' };
}

/**
 * Get all saved accounts on this device sorted by most recently used
 */
export const getSavedAccountsOnDevice = (): UserProfile[] => {
  try {
    const db = getUsersDB();
    if (!db || typeof db !== 'object') return [];
    return Object.values(db)
      .filter((u): u is UserProfile => Boolean(u && typeof u === 'object' && u.username))
      .sort((a, b) => {
        const timeA = new Date(a.lastLoginAt || 0).getTime() || 0;
        const timeB = new Date(b.lastLoginAt || 0).getTime() || 0;
        return timeB - timeA;
      });
  } catch (e) {
    console.error('Failed to get saved accounts:', e);
    return [];
  }
};

/**
 * Delete an account from the local device storage
 */
export const deleteAccountFromDevice = (userId: string): boolean => {
  try {
    const db = getUsersDB();
    if (db && db[userId]) {
      delete db[userId];
      saveUsersDB(db);

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
    const user = db && db[activeId];
    if (user && typeof user === 'object' && user.username) {
      return user;
    }
  } catch (e) {
    console.error('Failed to load active session:', e);
  }
  return null;
};

/**
 * Find user by username (case-insensitive, checks local cache then cloud DB)
 */
export const getUserByUsername = async (usernameRaw: string): Promise<UserProfile | null> => {
  const username = normalizeUsername(usernameRaw);
  if (!username) return null;

  // 1. Check local cache
  const db = getUsersDB();
  const localId = Object.keys(db).find((id) => normalizeUsername(db[id].username) === username);
  if (localId && db[localId]) {
    return db[localId];
  }

  // 2. Query cloud database
  try {
    const res = await callCloudAuth('get-user', { username });
    if (res?.success && res?.user) {
      return res.user;
    }
  } catch (e) {}

  return null;
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

  // Sync to cloud in background
  callCloudAuth('sync-stats', { username: user.username, stats: user.stats }).catch(() => {});

  return { success: true, user };
};

/**
 * Register a new user account with custom username & password
 * Syncs to cloud so computer / other phones can log in immediately
 */
export const registerUser = async (
  usernameRaw: string,
  passwordRaw: string,
  displayNameRaw: string,
  avatarChoice?: string,
  initialStats?: UserStats
): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
  const username = normalizeUsername(usernameRaw);
  const displayName = displayNameRaw.trim() || username;
  const password = passwordRaw.trim();

  if (username.length < 3) {
    return { success: false, error: 'Tên đăng nhập cần ít nhất 3 ký tự' };
  }
  if (password.length < 4) {
    return { success: false, error: 'Mật khẩu cần ít nhất 4 ký tự' };
  }

  const avatar = avatarChoice || AVATAR_OPTIONS[0];

  const emptyStats: UserStats = {
    learnedWordIds: [],
    favoriteWordIds: [],
    practiceCount: {},
    lastPracticed: {},
    pronunciationScores: {}
  };
  const stats = initialStats ? mergeStats(emptyStats, initialStats) : emptyStats;

  // Call Cloud Register
  const cloudRes = await callCloudAuth('register', {
    username,
    password,
    displayName,
    avatar,
    stats
  });

  if (!cloudRes.success) {
    return { success: false, error: cloudRes.error || 'Đăng ký không thành công.' };
  }

  const user: UserProfile = cloudRes.user;

  // Save to local cache
  const db = getUsersDB();
  db[user.id] = user;
  saveUsersDB(db);

  try {
    localStorage.setItem(SESSION_KEY, user.id);
    localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(user.stats));
  } catch (e) {}

  return { success: true, user };
};

/**
 * Log in with existing username & password
 * Case-insensitive username, checks local cache then cloud DB
 */
export const loginUser = async (
  identifierRaw: string,
  passwordRaw: string,
  incomingStats?: UserStats
): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
  const username = normalizeUsername(identifierRaw);
  const password = passwordRaw.trim();

  if (!username) {
    return { success: false, error: 'Vui lòng nhập tên đăng nhập.' };
  }
  if (!password) {
    return { success: false, error: 'Vui lòng nhập mật khẩu.' };
  }

  // 1. Try local cache first for instant response
  const db = getUsersDB();
  const localId = Object.keys(db).find((id) => db[id]?.username && normalizeUsername(db[id].username) === username);

  if (localId && db[localId]) {
    const localUser = db[localId];
    const isMatch = (localUser.password && localUser.password === password) ||
      (localUser.passwordHash && localUser.passwordHash === simpleHash(password));

    if (isMatch) {
      localUser.lastLoginAt = new Date().toISOString();
      if (incomingStats) {
        localUser.stats = mergeStats(localUser.stats, incomingStats);
      }
      db[localId] = localUser;
      saveUsersDB(db);

      try {
        localStorage.setItem(SESSION_KEY, localId);
        localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(localUser.stats));
      } catch (e) {}

      // Background cloud sync
      callCloudAuth('sync-stats', { username: localUser.username, stats: localUser.stats }).catch(() => {});

      return { success: true, user: localUser };
    }
  }

  // 2. Query Cloud Database (Enables logging in from a new computer or another device!)
  const cloudRes = await callCloudAuth('login', {
    username,
    password,
    incomingStats
  });

  if (cloudRes.success && cloudRes.user) {
    const user: UserProfile = cloudRes.user;

    // Cache to local device DB
    db[user.id] = user;
    saveUsersDB(db);

    try {
      localStorage.setItem(SESSION_KEY, user.id);
      localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(user.stats));
    } catch (e) {}

    return { success: true, user };
  }

  return {
    success: false,
    error: cloudRes.error || 'Tài khoản không tồn tại hoặc mật khẩu không chính xác.'
  };
};

/**
 * Reset password for a username after completing quiz challenge
 */
export const resetUserPassword = async (
  usernameRaw: string,
  newPasswordRaw: string
): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
  const username = normalizeUsername(usernameRaw);
  const newPassword = newPasswordRaw.trim();

  if (newPassword.length < 4) {
    return { success: false, error: 'Mật khẩu mới cần ít nhất 4 ký tự' };
  }

  // Update cloud
  const cloudRes = await callCloudAuth('reset-password', {
    username,
    newPassword
  });

  if (!cloudRes.success) {
    return { success: false, error: cloudRes.error || 'Không thể đổi mật khẩu.' };
  }

  const updatedUser: UserProfile = cloudRes.user;

  // Update local cache
  const db = getUsersDB();
  db[updatedUser.id] = updatedUser;
  saveUsersDB(db);

  try {
    localStorage.setItem(SESSION_KEY, updatedUser.id);
    localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(updatedUser.stats));
  } catch (e) {}

  return { success: true, user: updatedUser };
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
  const pool = allWords.filter((w) => w.level === 1 || w.level === 2);
  const activePool = pool.length >= 10 ? pool : allWords;

  const targetWord = activePool[Math.floor(Math.random() * activePool.length)];

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
 * Generate a complete QR login URL for 1-tap scanning with phone camera or web scanner
 */
export const generateQRLoginUrl = (user: UserProfile): string => {
  try {
    const payload = JSON.stringify({
      v: 2,
      u: user.username,
      p: user.password,
      d: user.displayName,
      a: user.avatar,
      t: Date.now()
    });
    const token = btoa(encodeURIComponent(payload));
    const baseUrl = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://hanzi-master-web-a121.vercel.app';
    return `${baseUrl}/?qr_auth=${token}`;
  } catch (e) {
    console.error('Failed to generate QR login URL:', e);
    return '';
  }
};

/**
 * Parse QR auth token from either URL (?qr_auth=...), raw token, or legacy HSK_SYNC_ key
 */
export const parseQRAuthToken = (
  rawInput: string
): { username: string; password?: string; displayName?: string; avatar?: string } | null => {
  if (!rawInput) return null;
  const str = rawInput.trim();

  try {
    let token = str;

    // 1. If scanned input is a URL with ?qr_auth=...
    if (str.includes('qr_auth=')) {
      const url = new URL(str.startsWith('http') ? str : `https://dummy.com${str.startsWith('/') ? '' : '/'}${str}`);
      const param = url.searchParams.get('qr_auth');
      if (param) token = param;
    }

    // 2. If it's legacy HSK_SYNC_...
    if (token.startsWith('HSK_SYNC_')) {
      const base64Data = token.replace('HSK_SYNC_', '');
      const jsonStr = decodeURIComponent(atob(base64Data));
      const data = JSON.parse(jsonStr);
      if (data?.user?.username) {
        return {
          username: normalizeUsername(data.user.username),
          password: data.user.password,
          displayName: data.user.displayName,
          avatar: data.user.avatar
        };
      }
    }

    // 3. Standard base64 token
    const jsonStr = decodeURIComponent(atob(token));
    const data = JSON.parse(jsonStr);
    if (data?.u) {
      return {
        username: normalizeUsername(data.u),
        password: data.p,
        displayName: data.d,
        avatar: data.a
      };
    }
  } catch (e) {
    console.error('Failed to parse QR auth:', e);
  }
  return null;
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
        avatar: user.avatar,
        stats: user.stats
      }
    });
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
      username: normalizeUsername(data.user.username),
      displayName: data.user.displayName || data.user.username,
      password: data.user.password,
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

    // Background sync to cloud
    callCloudAuth('register', {
      username: importedUser.username,
      password: importedUser.password,
      displayName: importedUser.displayName,
      avatar: importedUser.avatar,
      stats: importedUser.stats
    }).catch(() => {});

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
 * Update stats for active logged in user (local + background cloud sync)
 */
export const updateActiveUserStats = (stats: UserStats): void => {
  try {
    const activeId = localStorage.getItem(SESSION_KEY);
    if (!activeId) return;

    const db = getUsersDB();
    if (db[activeId]) {
      db[activeId].stats = stats;
      saveUsersDB(db);

      // Async cloud sync
      callCloudAuth('sync-stats', {
        username: db[activeId].username,
        stats
      }).catch(() => {});
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
