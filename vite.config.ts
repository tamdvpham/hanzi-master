import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import https from 'https';

// Local proxy for Chinese Mandarin TTS: bypasses browser Referer blocking
const ttsProxyPlugin = (): Plugin => ({
  name: 'chinese-tts-proxy',
  configureServer(server) {
    server.middlewares.use('/api/tts', (req, res) => {
      // CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
      }

      const parsedUrl = new URL(req.url || '', 'http://localhost:5173');
      const text = parsedUrl.searchParams.get('text');

      if (!text) {
        res.statusCode = 400;
        res.end('Missing text parameter');
        return;
      }

      const encoded = encodeURIComponent(text);
      const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encoded}`;

      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*'
        }
      };

      const fallbackToBaidu = () => {
        const baiduUrl = `https://fanyi.baidu.com/gettts?lan=zh&text=${encoded}&spd=5&source=web`;
        const baiduReq = https.get(baiduUrl, options, (baiduRes) => {
          if (baiduRes.statusCode === 200) {
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            baiduRes.pipe(res);
          } else {
            res.statusCode = 502;
            res.end('Baidu TTS unavailable');
          }
        });
        baiduReq.on('error', () => {
          res.statusCode = 502;
          res.end('TTS Proxy Error');
        });
      };

      const ttsReq = https.get(googleUrl, options, (ttsRes) => {
        if (ttsRes.statusCode === 200) {
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          ttsRes.pipe(res);
        } else {
          fallbackToBaidu();
        }
      });

      ttsReq.on('error', () => {
        fallbackToBaidu();
      });
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ttsProxyPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
