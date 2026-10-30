// Speech Recognition and Pronunciation Evaluation Engine
import { PronunciationScoreResult } from '../types';
import { stopAllChineseAudio } from './audio';

/**
 * Clean Chinese text for character comparison
 * Strips punctuation, spaces, em-dashes, and normalizes
 */
export const normalizeChineseText = (text: string): string => {
  return text
    .trim()
    .replace(/[。，！？、；：“”‘’（）《》\s.,!?;:()~—\-_/]/g, '')
    .toLowerCase();
};

/**
 * Common homophones and phonetic aliases for isolated Chinese words.
 * Since single Chinese syllables lack context, speech-to-text engines
 * often transcribe valid homophones (e.g. bǎi -> 白 instead of 百).
 */
const HOMOPHONE_MAP: Record<string, string[]> = {
  百: ['百', '一百', '白', '摆', '柏', '伯'],
  不: ['不', '步', '部', '布'],
  客: ['客', '课', '克', '刻'],
  气: ['气', '器', '汽', '弃'],
  不客气: ['不客气', '不客氣', '客气', '别客气'],
  你好: ['你好', '您好'],
  再见: ['再见', '在见'],
  谢谢: ['谢谢', '谢', '多谢'],
  对不起: ['对不起', '对吾起'],
  没关系: ['没关系', '没关联', '没关係'],
  喜欢: ['喜欢', '喜好'],
  吃: ['吃', '吃饭'],
  喝: ['喝', '喝水'],
  看: ['看', '看到', '看见'],
  听: ['听', '听到', '听见'],
  说: ['说', '说话'],
  写: ['写', '写字'],
  读: ['读', '读书'],
  买: ['买', '买了'],
  去: ['去', '去了'],
  来: ['来', '来了'],
  做: ['做', '作'],
  有: ['有', '还有', '友'],
  大: ['大', '达'],
  小: ['小', '晓'],
  多: ['多'],
  少: ['少'],
  冷: ['冷'],
  热: ['热'],
  好: ['好', '郝'],
  水: ['水'],
  茶: ['茶', '查'],
  米饭: ['米饭', '白饭'],
  苹果: ['苹果', '平果'],
  爸爸: ['爸爸', '爸'],
  妈妈: ['妈妈', '妈'],
  儿子: ['儿子'],
  女儿: ['女儿'],
  老师: ['老师', '老实'],
  学生: ['学生'],
  朋友: ['朋友'],
  医生: ['医生', '一生']
};

/**
 * Detect whether the user is opening the app inside an In-App browser
 * like Zalo, Facebook, Messenger, Instagram, WeChat, TikTok
 */
export const isInAppBrowser = (): boolean => {
  if (typeof window === 'undefined' || !navigator) return false;
  const ua = (navigator.userAgent || navigator.vendor || (window as any).opera || '').toLowerCase();
  return /fban|fbav|instagram|zalo|micromessenger|wechat|line|musical_ly|bytedance|tiktok|snapchat|threads/i.test(
    ua
  );
};

/**
 * Detect if user is on Google Chrome on iOS (CriOS)
 * Apple strictly disables Web Speech API in third-party iOS browsers.
 */
export const isIOSChrome = (): boolean => {
  if (typeof window === 'undefined' || !navigator) return false;
  return /CriOS/i.test(navigator.userAgent || '');
};

/**
 * Detect if device is a mobile or tablet
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || !navigator) return false;
  const ua = navigator.userAgent || '';
  const isTouchMac = navigator.platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1;
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || isTouchMac;
};

/**
 * Check if the browser supports Chinese Speech Recognition
 */
export const isSpeechRecognitionSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
};

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j + 1] // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Score Chinese pronunciation accurately based on recognized speech vs expected text.
 * Strictly awards 0 points if speech is not recognized or not heard.
 *
 * @param recognizedList List of candidate transcripts from speech recognition
 * @param expectedText The target Chinese phrase or sentence
 * @param highlightWord Optional key vocabulary word in the sentence
 */
export const evaluatePronunciation = (
  recognizedList: string[],
  expectedText: string,
  highlightWord?: string
): PronunciationScoreResult => {
  const normExpected = normalizeChineseText(expectedText);
  const normHighlight = highlightWord ? normalizeChineseText(highlightWord) : '';

  // Filter and deduplicate candidates
  const candidates = (recognizedList || [])
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // STRICT REQUIREMENT: If nothing was recognized -> 0 points!
  if (candidates.length === 0) {
    return {
      score: 0,
      recognizedText: 'Không nhận diện được giọng nói',
      expectedText,
      feedback: 'Chưa nhận diện được phát âm. Hãy đọc to, rõ ràng vào mic và thử lại nhé!',
      isCorrect: false
    };
  }

  let bestScore = 0;
  let bestTranscript = candidates[0];

  // Homophone candidates for isolated words
  const aliases = HOMOPHONE_MAP[expectedText] || [];
  const highlightAliases = highlightWord ? HOMOPHONE_MAP[highlightWord] || [] : [];

  for (const transcript of candidates) {
    const normActual = normalizeChineseText(transcript);
    if (!normActual) continue;

    // 1. Exact match with expected text
    if (normActual === normExpected) {
      bestScore = 100;
      bestTranscript = transcript;
      break;
    }

    // 2. Exact match with homophone / alias of target word
    if (aliases.some((a) => normalizeChineseText(a) === normActual)) {
      const score = 95;
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 3. Match with highlight word or its homophones
    if (normHighlight && normActual === normHighlight) {
      const score = 95;
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    if (highlightAliases.some((a) => normalizeChineseText(a) === normActual)) {
      const score = 90;
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 4. Highlight keyword is contained in actual speech
    if (normHighlight && normActual.includes(normHighlight)) {
      const score = Math.max(90, Math.round(98 - (normActual.length - normHighlight.length) * 3));
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 5. Target sentence contains actual speech (e.g. user read a key clause)
    if (normExpected.includes(normActual)) {
      const ratio = normActual.length / Math.max(1, normExpected.length);
      const score = Math.max(65, Math.round(ratio * 95));
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 6. Actual speech contains target text (e.g. user said "你好啊" for "你好")
    if (normActual.includes(normExpected)) {
      const extraLen = normActual.length - normExpected.length;
      const score = Math.max(85, Math.round(100 - extraLen * 4));
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 7. Levenshtein edit-distance similarity
    const maxLen = Math.max(normExpected.length, normActual.length);
    if (maxLen > 0) {
      const distance = levenshteinDistance(normExpected, normActual);
      const similarity = Math.max(0, 1 - distance / maxLen);
      const score = Math.round(similarity * 100);
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
    }
  }

  // Construct precise pedagogical feedback
  let feedback = '';
  let isCorrect = false;

  if (bestScore >= 90) {
    isCorrect = true;
    feedback = 'Xuất sắc! Phát âm cực kỳ chuẩn xác như người bản xứ.';
  } else if (bestScore >= 75) {
    isCorrect = true;
    feedback = 'Rất tốt! Phát âm tương đối chuẩn, bạn hãy phát huy nhé.';
  } else if (bestScore >= 55) {
    isCorrect = false;
    feedback = 'Tạm được! Cần chú ý nhấn đúng thanh điệu và mở to khẩu hình.';
  } else {
    isCorrect = false;
    feedback = 'Chưa chính xác! Hãy bấm nghe lại phát âm mẫu và luyện tập lại nhé.';
  }

  return {
    score: bestScore,
    recognizedText: bestTranscript,
    expectedText,
    feedback,
    isCorrect
  };
};

export interface RecorderCallbacks {
  onStartListening?: () => void;
  onSpeechDetected?: () => void;
  onLiveTranscript?: (transcript: string) => void;
  onSpeechResult?: (alternatives: string[], primaryText: string) => void;
  onError?: (errorMessage: string, code?: string) => void;
  onAutoEnd?: (alternatives: string[], transcript: string) => void;
}

/**
 * Bulletproof Voice Recorder & Mandarin Speech Recognition Manager
 * Optimized for Mobile Safari (iOS) and Mobile Chrome (Android)
 * Includes auto-restart for Android silence-timeout handling
 */
export class VoiceRecorderManager {
  private recognition: any = null;
  private isListening: boolean = false;
  private latestAlternatives: string[] = [];
  private latestTranscript: string = '';
  private restartCount: number = 0;
  private maxRestarts: number = 5;

  /**
   * Start speech recognition immediately (synchronous user gesture for iOS Safari)
   */
  startRecording(callbacks?: RecorderCallbacks): void {
    this.latestAlternatives = [];
    this.latestTranscript = '';
    this.isListening = true;
    this.restartCount = 0;

    // Reset any active audio playback to prevent WebKit audio session lock
    stopAllChineseAudio();

    // 1. Initialize Web Speech API
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      callbacks?.onError?.(
        'Trình duyệt không hỗ trợ nhận diện giọng nói Web Speech API.',
        'not-supported'
      );
      return;
    }

    const initAndStart = () => {
      try {
        const recognition = new SpeechRec();
        this.recognition = recognition;

        recognition.lang = 'zh-CN'; // Mandarin Chinese
        recognition.continuous = false; // single-shot mode on mobile for reliable finalization
        recognition.interimResults = true;
        recognition.maxAlternatives = 5;

        recognition.onstart = () => {
          callbacks?.onStartListening?.();
        };

        recognition.onspeechstart = () => {
          callbacks?.onSpeechDetected?.();
        };

        recognition.onresult = (event: any) => {
          let fullCombined = '';
          const alts: string[] = [];

          // Accumulate across all segments in event.results
          for (let i = 0; i < event.results.length; i++) {
            const segment = event.results[i];
            if (segment && segment.length > 0) {
              fullCombined += segment[0].transcript;
              for (let j = 0; j < segment.length; j++) {
                const altText = segment[j]?.transcript?.trim();
                if (altText) {
                  alts.push(altText);
                }
              }
            }
          }

          const cleanFull = fullCombined.trim();
          if (cleanFull) {
            alts.unshift(cleanFull);
          }

          const unique = Array.from(new Set([...this.latestAlternatives, ...alts])).filter(Boolean);
          this.latestTranscript = cleanFull || this.latestTranscript;
          this.latestAlternatives = unique;

          if (cleanFull && callbacks?.onLiveTranscript) {
            callbacks.onLiveTranscript(cleanFull);
          }
          if (callbacks?.onSpeechResult) {
            callbacks.onSpeechResult(unique, cleanFull);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('SpeechRecognition error:', e.error);
          const err = e.error || '';

          if (err === 'not-allowed' || err === 'service-not-allowed') {
            this.isListening = false;
            callbacks?.onError?.(
              'Trình duyệt chưa được cấp quyền micro. Bạn hãy bấm vào biểu tượng 🔒 hoặc aA trên thanh địa chỉ để Bật Micro.',
              'permission-denied'
            );
          } else if (err === 'audio-capture') {
            this.isListening = false;
            callbacks?.onError?.(
              'Không tìm thấy hoặc không mở được micro. Hãy kiểm tra kết nối micro trên thiết bị.',
              'audio-capture'
            );
          } else if (err === 'network') {
            callbacks?.onError?.(
              'Lỗi mạng khi kết nối máy chủ nhận diện giọng nói. Hãy kiểm tra WiFi/4G.',
              'network'
            );
          } else if (err === 'language-not-supported') {
            callbacks?.onError?.(
              'Thiết bị chưa hỗ trợ gói ngôn ngữ tiếng Trung (zh-CN). Vui lòng thêm bàn phím tiếng Trung trong cài đặt máy.',
              'language-not-supported'
            );
          }
          // Note: 'no-speech' is intentionally handled by auto-restart in onend
        };

        recognition.onend = () => {
          if (!this.isListening) return;

          // If we have captured a transcript, we finalize naturally
          if (this.latestTranscript.trim().length > 0 || this.latestAlternatives.length > 0) {
            this.isListening = false;
            callbacks?.onAutoEnd?.(this.latestAlternatives, this.latestTranscript);
          } else {
            // Android premature cutoff before speech was transcribed: auto-restart while listening
            if (this.restartCount < this.maxRestarts) {
              this.restartCount++;
              try {
                recognition.start();
              } catch (e) {
                // If restarting existing instance throws, recreate cleanly
                setTimeout(() => {
                  if (this.isListening) {
                    initAndStart();
                  }
                }, 100);
              }
            } else {
              this.isListening = false;
              callbacks?.onAutoEnd?.([], '');
            }
          }
        };

        // Synchronous start call preserves iOS Safari User Activation token
        recognition.start();
      } catch (err: any) {
        console.warn('SpeechRecognition start failed:', err);
        callbacks?.onError?.('Không thể khởi động bộ nhận diện giọng nói: ' + (err?.message || ''));
      }
    };

    initAndStart();
  }

  /**
   * Stop recording and return captured speech alternatives
   */
  stopRecording(): Promise<{
    speechAlternatives: string[];
    transcript: string;
  }> {
    this.isListening = false;

    return new Promise((resolve) => {
      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }

      // Small delay to let any trailing result buffer flush
      setTimeout(() => {
        const alternatives = [...this.latestAlternatives];
        const transcript = this.latestTranscript;
        resolve({
          speechAlternatives: alternatives,
          transcript
        });
      }, 200);
    });
  }
}
