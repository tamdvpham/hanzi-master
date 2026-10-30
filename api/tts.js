import https from 'https';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const text = req.query?.text;
  if (!text) {
    res.status(400).send('Missing text parameter');
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
        res.status(502).send('Baidu TTS unavailable');
      }
    });
    baiduReq.on('error', () => {
      res.status(502).send('TTS Proxy Error');
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
}
