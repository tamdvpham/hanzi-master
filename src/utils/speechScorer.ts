// Speech Recognition and Pronunciation Evaluation Engine
import { PronunciationScoreResult } from '../types';

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
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Score Chinese pronunciation based on recognized speech vs expected text
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

  if (candidates.length === 0) {
    return {
      score: 0,
      recognizedText: 'Không nhận diện được giọng nói',
      expectedText,
      feedback: 'Chưa nghe rõ phát âm. Vui lòng nói to, rõ ràng và thử lại!',
      isCorrect: false
    };
  }

  let bestScore = 0;
  let bestTranscript = candidates[0];

  for (const transcript of candidates) {
    const normActual = normalizeChineseText(transcript);
    if (!normActual) continue;

    // 1. Exact match with expected text
    if (normActual === normExpected) {
      bestScore = 100;
      bestTranscript = transcript;
      break;
    }

    // 2. Exact match with highlight keyword
    if (normHighlight && normActual === normHighlight) {
      const score = 95;
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 3. Highlight keyword is contained in actual speech
    if (normHighlight && normActual.includes(normHighlight)) {
      const score = Math.max(90, Math.round(98 - (normActual.length - normHighlight.length) * 3));
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 4. Target sentence contains actual speech (e.g. user read a key clause)
    if (normExpected.includes(normActual)) {
      const ratio = normActual.length / Math.max(1, normExpected.length);
      const score = Math.max(65, Math.round(ratio * 95));
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 5. Actual speech contains target text (e.g. user said "你好啊" for "你好")
    if (normActual.includes(normExpected)) {
      const extraLen = normActual.length - normExpected.length;
      const score = Math.max(85, Math.round(100 - extraLen * 4));
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // 6. Levenshtein edit-distance similarity
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

  // Construct friendly pedagogical feedback
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
  onLiveTranscript?: (transcript: string) => void;
  onSpeechResult?: (alternatives: string[], primaryText: string) => void;
  onError?: (errorMessage: string, code?: string) => void;
  onEnd?: () => void;
}

/**
 * Bulletproof Voice Recorder & Mandarin Speech Recognition Manager
 * Optimized for Mobile Safari (iOS) and Mobile Chrome (Android)
 */
export class VoiceRecorderManager {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recognition: any = null;
  private stream: MediaStream | null = null;
  private isListening: boolean = false;
  private recordedMimeType: string = 'audio/webm';
  private latestAlternatives: string[] = [];
  private latestTranscript: string = '';

  /**
   * Start speech recognition immediately (synchronous user gesture for iOS Safari)
   */
  startRecording(callbacks?: RecorderCallbacks): void {
    this.audioChunks = [];
    this.latestAlternatives = [];
    this.latestTranscript = '';
    this.isListening = true;

    // 1. Initialize and start Web Speech API immediately (User Gesture context)
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        this.recognition = recognition;

        recognition.lang = 'zh-CN'; // Mandarin Chinese
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 5;

        recognition.onresult = (event: any) => {
          let fullCombined = '';
          const alts: string[] = [];

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

          const unique = Array.from(new Set(alts)).filter(Boolean);
          this.latestTranscript = cleanFull;
          this.latestAlternatives = unique;

          if (callbacks?.onLiveTranscript) {
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
            callbacks?.onError?.(
              'Trình duyệt chưa được cấp quyền micro. Bạn hãy bấm vào biểu tượng 🔒 hoặc aA trên thanh địa chỉ để Bật Micro.',
              'permission-denied'
            );
          } else if (err === 'audio-capture') {
            callbacks?.onError?.(
              'Không tìm thấy hoặc không mở được micro. Hãy kiểm tra kết nối micro trên thiết bị.',
              'audio-capture'
            );
          } else if (err === 'network') {
            callbacks?.onError?.(
              'Lỗi mạng khi kết nối máy chủ nhận diện giọng nói. Hãy kiểm tra kết nối WiFi/4G.',
              'network'
            );
          }
        };

        recognition.onend = () => {
          // If stopped naturally but still marked listening, trigger end
          if (callbacks?.onEnd) {
            callbacks.onEnd();
          }
        };

        // Synchronous start call preserves iOS Safari User Activation token
        recognition.start();
      } catch (err: any) {
        console.warn('SpeechRecognition start failed:', err);
        callbacks?.onError?.('Không thể khởi động bộ nhận diện giọng nói: ' + (err?.message || ''));
      }
    } else {
      callbacks?.onError?.(
        'Trình duyệt không hỗ trợ nhận diện giọng nói Web Speech API.',
        'not-supported'
      );
    }

    // 2. Start MediaRecorder non-blockingly for desktop/devices that support concurrent streams
    // On iOS Safari, getUserMedia can conflict with webkitSpeechRecognition, so we only run on non-mobile
    if (!isMobileDevice() && typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          if (!this.isListening) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }

          this.stream = stream;
          let mimeType = 'audio/webm';
          if (typeof MediaRecorder !== 'undefined') {
            if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
              mimeType = 'audio/webm;codecs=opus';
            } else if (MediaRecorder.isTypeSupported('audio/webm')) {
              mimeType = 'audio/webm';
            } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
              mimeType = 'audio/mp4';
            } else if (MediaRecorder.isTypeSupported('audio/aac')) {
              mimeType = 'audio/aac';
            }

            this.recordedMimeType = mimeType;
            try {
              this.mediaRecorder = new MediaRecorder(stream, { mimeType });
              this.mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                  this.audioChunks.push(e.data);
                }
              };
              this.mediaRecorder.start();
            } catch (mrErr) {
              console.warn('MediaRecorder init error:', mrErr);
            }
          }
        })
        .catch((err) => {
          console.warn('Non-blocking getUserMedia caught:', err);
        });
    }
  }

  /**
   * Stop recording and return captured audio and speech alternatives
   */
  stopRecording(): Promise<{
    audioBlobUrl: string | null;
    audioBlob: Blob | null;
    speechAlternatives: string[];
    transcript: string;
  }> {
    this.isListening = false;

    return new Promise((resolve) => {
      // 1. Stop SpeechRecognition gracefully
      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }

      const alternatives = [...this.latestAlternatives];
      const transcript = this.latestTranscript;

      // 2. Stop MediaRecorder if running
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.onstop = () => {
          let audioBlob: Blob | null = null;
          let audioBlobUrl: string | null = null;

          if (this.audioChunks.length > 0) {
            audioBlob = new Blob(this.audioChunks, { type: this.recordedMimeType });
            audioBlobUrl = URL.createObjectURL(audioBlob);
          }

          if (this.stream) {
            this.stream.getTracks().forEach((t) => t.stop());
            this.stream = null;
          }

          resolve({
            audioBlobUrl,
            audioBlob,
            speechAlternatives: alternatives,
            transcript
          });
        };

        try {
          this.mediaRecorder.stop();
        } catch (e) {
          resolve({
            audioBlobUrl: null,
            audioBlob: null,
            speechAlternatives: alternatives,
            transcript
          });
        }
      } else {
        if (this.stream) {
          this.stream.getTracks().forEach((t) => t.stop());
          this.stream = null;
        }

        resolve({
          audioBlobUrl: null,
          audioBlob: null,
          speechAlternatives: alternatives,
          transcript
        });
      }
    });
  }
}
