// Speech Recognition and Pronunciation Evaluation Engine
import { PronunciationScoreResult } from '../types';

// Clean text for Chinese character comparison
export const normalizeChineseText = (text: string): string => {
  return text
    .trim()
    .replace(/[。，！？、；：“”‘’（）《》\s.,!?;:()]/g, '')
    .toLowerCase();
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
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Score Chinese pronunciation based on recognized text vs expected text
 */
export const evaluatePronunciation = (
  recognizedList: string[],
  expectedText: string
): PronunciationScoreResult => {
  const normExpected = normalizeChineseText(expectedText);

  if (!recognizedList || recognizedList.length === 0) {
    return {
      score: 0,
      recognizedText: 'Không nhận diện được giọng nói',
      expectedText,
      feedback: 'Chưa nghe rõ phát âm. Vui lòng nói to, rõ ràng và thử lại!',
      isCorrect: false
    };
  }

  let bestScore = 0;
  let bestTranscript = recognizedList[0];

  for (const transcript of recognizedList) {
    const normActual = normalizeChineseText(transcript);

    // Exact match
    if (normActual === normExpected) {
      bestScore = 100;
      bestTranscript = transcript;
      break;
    }

    // Check if target word is contained in recognized text
    if (normActual.includes(normExpected)) {
      const score = Math.max(90, Math.round(100 - (normActual.length - normExpected.length) * 5));
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    if (normExpected.includes(normActual) && normActual.length > 0) {
      const score = Math.max(60, Math.round((normActual.length / normExpected.length) * 90));
      if (score > bestScore) {
        bestScore = score;
        bestTranscript = transcript;
      }
      continue;
    }

    // Levenshtein similarity
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

  // Construct feedback
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

/**
 * Helper to record user voice and recognize Chinese speech simultaneously
 */
export class VoiceRecorderManager {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recognition: any = null;
  private stream: MediaStream | null = null;

  async startRecording(onSpeechResult?: (results: string[]) => void): Promise<void> {
    this.audioChunks = [];

    // 1. Start audio recording via MediaRecorder
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      this.mediaRecorder.start();
    } catch (err) {
      console.warn('Microphone access denied or error:', err);
    }

    // 2. Start Speech Recognition if supported
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        this.recognition = recognition;
        recognition.lang = 'zh-CN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 5;

        recognition.onresult = (event: any) => {
          const results: string[] = [];
          for (let i = 0; i < event.results[0].length; i++) {
            results.push(event.results[0][i].transcript);
          }
          if (onSpeechResult) {
            onSpeechResult(results);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition error:', e.error);
        };

        recognition.start();
      } catch (e) {
        console.warn('SpeechRecognition failed to start:', e);
      }
    }
  }

  stopRecording(): Promise<{ audioBlobUrl: string | null; audioBlob: Blob | null }> {
    return new Promise((resolve) => {
      // Stop recognition
      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }

      // Stop MediaRecorder
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          const audioBlobUrl = URL.createObjectURL(audioBlob);

          // Stop mic tracks
          if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
            this.stream = null;
          }

          resolve({ audioBlobUrl, audioBlob });
        };
        this.mediaRecorder.stop();
      } else {
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
          this.stream = null;
        }
        resolve({ audioBlobUrl: null, audioBlob: null });
      }
    });
  }
}
