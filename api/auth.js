// Vercel Serverless Function: Cloud Authentication & Multi-Device Progress Sync
// Allows users to register on phone and immediately log in on computer or any device

const CLOUD_DB_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a1933b62dd78f6';

// Helper to fetch all users from cloud database
async function getCloudUsers() {
  try {
    const res = await fetch(CLOUD_DB_URL);
    if (!res.ok) throw new Error(`Cloud fetch failed: ${res.status}`);
    const json = await res.json();
    return json?.data?.users || {};
  } catch (e) {
    console.error('getCloudUsers error:', e);
    return {};
  }
}

// Helper to persist users to cloud database
async function saveCloudUsers(users) {
  try {
    const res = await fetch(CLOUD_DB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'hsk_master_users_db',
        data: { users }
      })
    });
    if (!res.ok) throw new Error(`Cloud save failed: ${res.status}`);
    return true;
  } catch (e) {
    console.error('saveCloudUsers error:', e);
    return false;
  }
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const action = req.query?.action || (req.body && req.body.action);
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  // ACTION: GET USER (Case-insensitive)
  if (action === 'get-user') {
    const usernameRaw = req.query?.username || body?.username;
    if (!usernameRaw) {
      res.status(400).json({ success: false, error: 'Thiếu tên đăng nhập.' });
      return;
    }
    const cleanUsername = usernameRaw.trim().toLowerCase();
    const users = await getCloudUsers();
    const user = users[cleanUsername];

    if (!user) {
      res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản.' });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        password: user.password
      }
    });
    return;
  }

  // ACTION: REGISTER (Multi-device cloud registration)
  if (action === 'register') {
    const { username: rawUser, password, displayName, avatar, stats } = body;
    if (!rawUser || !password) {
      res.status(400).json({ success: false, error: 'Thiếu thông tin đăng ký.' });
      return;
    }

    const cleanUsername = rawUser.trim().toLowerCase();
    const cleanDisplay = (displayName || rawUser).trim();

    if (cleanUsername.length < 3) {
      res.status(400).json({ success: false, error: 'Tên đăng nhập cần ít nhất 3 ký tự.' });
      return;
    }
    if (password.trim().length < 4) {
      res.status(400).json({ success: false, error: 'Mật khẩu cần ít nhất 4 ký tự.' });
      return;
    }

    const users = await getCloudUsers();
    if (users[cleanUsername]) {
      res.status(409).json({
        success: false,
        error: 'Tên đăng nhập này đã được sử dụng. Vui lòng chọn tên khác hoặc Đăng Nhập.'
      });
      return;
    }

    const newUser = {
      id: `u_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      username: cleanUsername,
      displayName: cleanDisplay,
      password: password.trim(),
      avatar: avatar || '👩🏻‍🎓',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      stats: stats || {
        learnedWordIds: [],
        favoriteWordIds: [],
        practiceCount: {},
        lastPracticed: {},
        pronunciationScores: {}
      }
    };

    users[cleanUsername] = newUser;
    await saveCloudUsers(users);

    res.status(200).json({ success: true, user: newUser });
    return;
  }

  // ACTION: LOGIN (Multi-device cloud login)
  if (action === 'login') {
    const { username: rawUser, password, incomingStats } = body;
    if (!rawUser || !password) {
      res.status(400).json({ success: false, error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
      return;
    }

    const cleanUsername = rawUser.trim().toLowerCase();
    const cleanPassword = password.trim();

    const users = await getCloudUsers();
    const user = users[cleanUsername];

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại tên đăng nhập hoặc Đăng ký.'
      });
      return;
    }

    if (user.password !== cleanPassword) {
      res.status(401).json({
        success: false,
        error: 'Mật khẩu không chính xác. Bạn có thể bấm "Quên mật khẩu?" để lấy lại.'
      });
      return;
    }

    // Merge incoming stats if any
    if (incomingStats) {
      const learned = Array.from(new Set([...(user.stats?.learnedWordIds || []), ...(incomingStats.learnedWordIds || [])]));
      const favs = Array.from(new Set([...(user.stats?.favoriteWordIds || []), ...(incomingStats.favoriteWordIds || [])]));
      user.stats = {
        ...(user.stats || {}),
        learnedWordIds: learned,
        favoriteWordIds: favs
      };
    }

    user.lastLoginAt = new Date().toISOString();
    users[cleanUsername] = user;
    await saveCloudUsers(users);

    res.status(200).json({ success: true, user });
    return;
  }

  // ACTION: SYNC STATS
  if (action === 'sync-stats') {
    const { username: rawUser, stats } = body;
    if (!rawUser || !stats) {
      res.status(400).json({ success: false });
      return;
    }
    const cleanUsername = rawUser.trim().toLowerCase();
    const users = await getCloudUsers();
    if (users[cleanUsername]) {
      users[cleanUsername].stats = stats;
      users[cleanUsername].lastLoginAt = new Date().toISOString();
      await saveCloudUsers(users);
    }
    res.status(200).json({ success: true });
    return;
  }

  // ACTION: RESET PASSWORD
  if (action === 'reset-password') {
    const { username: rawUser, newPassword } = body;
    if (!rawUser || !newPassword) {
      res.status(400).json({ success: false, error: 'Thiếu dữ liệu đổi mật khẩu.' });
      return;
    }
    const cleanUsername = rawUser.trim().toLowerCase();
    const users = await getCloudUsers();
    if (!users[cleanUsername]) {
      res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản.' });
      return;
    }
    users[cleanUsername].password = newPassword.trim();
    users[cleanUsername].lastLoginAt = new Date().toISOString();
    await saveCloudUsers(users);

    res.status(200).json({ success: true, user: users[cleanUsername] });
    return;
  }

  res.status(400).json({ success: false, error: 'Action không hợp lệ.' });
}
