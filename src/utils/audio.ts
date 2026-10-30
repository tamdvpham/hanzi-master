// Bulletproof Mandarin Chinese pronunciation player with local blob caching & instant replay

let currentAudio: HTMLAudioElement | null = null;
let currentSafetyTimer: any = null;

// In-memory audio Blob URL cache for instant zero-latency playback
const audioBlobCache = new Map<string, string>();

/**
 * Stop any currently playing Chinese audio and reset speech synthesis
 */
export const stopAllChineseAudio = (): void => {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.src = '';
    } catch (e) {}
    currentAudio = null;
  }

  if (currentSafetyTimer) {
    clearTimeout(currentSafetyTimer);
    currentSafetyTimer = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};

/**
 * Preload Chinese audio in the background so clicks are 100% instant
 */
export const preloadChineseAudio = async (text: string): Promise<void> => {
  const trimmed = text.trim();
  if (!trimmed || audioBlobCache.has(trimmed)) return;

  try {
    const encoded = encodeURIComponent(trimmed);
    const res = await fetch(`/api/tts?text=${encoded}`);
    if (res.ok) {
      const blob = await res.blob();
      if (blob.size > 200) {
        const blobUrl = URL.createObjectURL(blob);
        audioBlobCache.set(trimmed, blobUrl);
      }
    }
  } catch (e) {
    // Background preload fail is non-fatal
  }
};

/**
 * Play standard Mandarin pronunciation for a Chinese word or sentence
 * @param text Chinese text (e.g. "文", "你好", "我爸爸是医生。")
 * @param rate playback speed (default 1.0)
 */
export const playChineseAudio = async (text: string, rate: number = 1.0): Promise<void> => {
  return new Promise(async (resolve) => {
    // 1. Stop any currently playing audio
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch (e) {}
      currentAudio = null;
    }

    if (currentSafetyTimer) {
      clearTimeout(currentSafetyTimer);
      currentSafetyTimer = null;
    }

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    const trimmed = text.trim();
    if (!trimmed) {
      resolve();
      return;
    }

    let isResolved = false;
    const finish = () => {
      if (isResolved) return;
      isResolved = true;
      if (currentSafetyTimer) {
        clearTimeout(currentSafetyTimer);
        currentSafetyTimer = null;
      }
      resolve();
    };

    // Safety timer: maximum 5s
    currentSafetyTimer = setTimeout(finish, 5000);

    // Play an HTMLAudioElement with given src
    const playAudioSrc = (src: string): Promise<boolean> => {
      return new Promise((resPlay) => {
        const audio = new Audio();
        try {
          (audio as any).referrerPolicy = 'no-referrer';
        } catch (e) {}
        currentAudio = audio;

        if (rate && rate !== 1.0) {
          try {
            audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
          } catch (e) {}
        }

        let hasStarted = false;
        const localTimer = setTimeout(() => {
          if (!hasStarted) {
            try { audio.pause(); } catch (e) {}
            resPlay(false);
          }
        }, 2500);

        audio.onplaying = () => {
          hasStarted = true;
          clearTimeout(localTimer);
        };

        audio.onended = () => {
          clearTimeout(localTimer);
          currentAudio = null;
          finish();
          resPlay(true);
        };

        audio.onerror = () => {
          clearTimeout(localTimer);
          resPlay(false);
        };

        audio.src = src;
        const p = audio.play();
        if (p !== undefined) {
          p.catch(() => {
            clearTimeout(localTimer);
            resPlay(false);
          });
        }
      });
    };

    // Check if we already have a cached blob URL
    if (audioBlobCache.has(trimmed)) {
      const cachedUrl = audioBlobCache.get(trimmed)!;
      const success = await playAudioSrc(cachedUrl);
      if (success) return;
    }

    // Try fetching via local proxy and cache as Blob
    try {
      const encoded = encodeURIComponent(trimmed);
      const res = await fetch(`/api/tts?text=${encoded}`);
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 200) {
          const blobUrl = URL.createObjectURL(blob);
          audioBlobCache.set(trimmed, blobUrl);
          const success = await playAudioSrc(blobUrl);
          if (success) return;
        }
      }
    } catch (e) {
      // Local fetch failed, try direct links below
    }

    // Fallback: direct streaming links
    const encoded = encodeURIComponent(trimmed);
    const isShortWord = trimmed.length <= 4 && !/[。，！？,.!?\s]/.test(trimmed);

    const directUrls: string[] = [
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encoded}`,
      `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=zh-CN&q=${encoded}`,
      `https://fanyi.baidu.com/gettts?lan=zh&text=${encoded}&spd=${rate < 0.9 ? 4 : 5}&source=web`
    ];

    if (isShortWord) {
      directUrls.unshift(`https://dict.youdao.com/dictvoice?audio=${encoded}&le=zh`);
    }

    for (const url of directUrls) {
      if (isResolved) return;
      const success = await playAudioSrc(url);
      if (success) return;
    }

    // Final fallback: Web Speech API
    if (!isResolved) {
      await speakWithWebSpeech(trimmed, rate);
      finish();
    }
  });
};

// Web Speech API fallback
const speakWithWebSpeech = (text: string, rate: number): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = rate;

      const voices = window.speechSynthesis.getVoices();
      const zhVoice = voices.find(
        (v) =>
          v.lang === 'zh-CN' ||
          v.lang === 'zh_CN' ||
          v.lang.startsWith('zh') ||
          v.name.includes('Chinese') ||
          v.name.includes('Mandarin')
      );
      if (zhVoice) {
        utterance.voice = zhVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    } catch {
      resolve();
    }
  });
};

// Pleasant success chime when character writing is finished
export const playSuccessSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + i * 0.08);
      osc.stop(audioCtx.currentTime + i * 0.08 + 0.35);
    });
  } catch (e) {
    // Ignore audio context error
  }
};
