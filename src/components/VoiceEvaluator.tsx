import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  Volume2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  X,
  Copy,
  Check,
  ShieldAlert,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PronunciationScoreResult } from '../types';
import {
  VoiceRecorderManager,
  evaluatePronunciation,
  isInAppBrowser,
  isIOSChrome,
  isSpeechRecognitionSupported
} from '../utils/speechScorer';
import { playChineseAudio, playSuccessSound, preloadChineseAudio, stopAllChineseAudio } from '../utils/audio';
import { HighlightText } from './HighlightText';

interface VoiceEvaluatorProps {
  targetText: string;
  targetPinyin?: string;
  targetMeaning?: string;
  highlightWord?: string; // Word to highlight in red
  title?: string;
  mode?: 'word' | 'sentence';
  timeoutSeconds?: number;
  onClose: () => void;
  onScoreSaved?: (score: number) => void;
}

export const VoiceEvaluator: React.FC<VoiceEvaluatorProps> = ({
  targetText,
  targetPinyin,
  targetMeaning,
  highlightWord = '',
  title = 'Luyện Đọc & Chấm Điểm',
  mode,
  timeoutSeconds,
  onClose,
  onScoreSaved
}) => {
  // Timeout: 6s for 1 word, 12s for 1 sentence
  const isSentence =
    mode === 'sentence' ||
    targetText.length > 4 ||
    targetText.includes('。') ||
    targetText.includes('，') ||
    targetText.includes('！') ||
    targetText.includes('？');
  const effectiveTimeout = timeoutSeconds ?? (isSentence ? 12 : 6);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [listenStatus, setListenStatus] = useState<string>('Sẵn sàng');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [result, setResult] = useState<PronunciationScoreResult | null>(null);
  const [isPlayingNativeAudio, setIsPlayingNativeAudio] = useState(false);

  const isZaloOrFB = isInAppBrowser();
  const isCriOS = isIOSChrome();
  const isSupported = isSpeechRecognitionSupported() && !isCriOS;

  const recorderRef = useRef<VoiceRecorderManager | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const timeoutTimerRef = useRef<any>(null);
  const speechAlternativesRef = useRef<string[]>([]);
  const latestLiveTranscriptRef = useRef<string>('');

  useEffect(() => {
    recorderRef.current = new VoiceRecorderManager();
    // Preload native pronunciation in background immediately
    preloadChineseAudio(targetText);

    return () => {
      stopAllChineseAudio();
      if (recorderRef.current && isRecording) {
        recorderRef.current.stopRecording();
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
      }
    };
  }, [targetText]);

  // Format seconds to 00:0X
  const formatTime = (sec: number) => `00:${sec < 10 ? '0' : ''}${sec}`;

  // Copy current URL for users stuck in In-App WebView
  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (e) {}
  };

  // Perform scoring evaluation - STRICT: 0 points if not recognized
  const finalizeEvaluation = (alts: string[], primary: string) => {
    const candidates = Array.from(
      new Set([
        ...alts,
        ...speechAlternativesRef.current,
        primary,
        latestLiveTranscriptRef.current
      ])
    ).filter(Boolean);

    const evaluation = evaluatePronunciation(candidates, targetText, highlightWord);
    setResult(evaluation);

    if (evaluation.score >= 85) {
      playSuccessSound();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    if (onScoreSaved) {
      onScoreSaved(evaluation.score);
    }
  };

  // Start recording
  const handleStartRecording = () => {
    // Stop any currently playing audio so iOS audio session frees the microphone
    stopAllChineseAudio();

    setResult(null);
    setMicError(null);
    setLiveTranscript('');
    latestLiveTranscriptRef.current = '';
    setRecordingSeconds(0);
    setListenStatus('Đang mở micro...');
    speechAlternativesRef.current = [];

    if (!recorderRef.current) {
      recorderRef.current = new VoiceRecorderManager();
    }

    setIsRecording(true);

    timerIntervalRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        const next = prev + 1;
        if (next >= effectiveTimeout) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          // Auto stop when reaching timeout
          setTimeout(() => {
            handleStopRecording();
          }, 0);
          return effectiveTimeout;
        }
        return next;
      });
    }, 1000);

    // Fallback timer trigger
    timeoutTimerRef.current = setTimeout(() => {
      handleStopRecording();
    }, effectiveTimeout * 1000);

    // Start speech recognition synchronously in the tap turn (maintains iOS Safari gesture token)
    recorderRef.current.startRecording({
      onStartListening: () => {
        setListenStatus('Đang lắng nghe... hãy đọc to vào micro');
      },
      onSpeechDetected: () => {
        setListenStatus('Đã phát hiện giọng nói! Đang nhận diện...');
      },
      onLiveTranscript: (text) => {
        setLiveTranscript(text);
        latestLiveTranscriptRef.current = text;
        setListenStatus(`Đang nghe: 「${text}」`);
      },
      onSpeechResult: (alternatives, primary) => {
        speechAlternativesRef.current = alternatives;
        if (primary) {
          latestLiveTranscriptRef.current = primary;
          setLiveTranscript(primary);
        }
      },
      onError: (errMessage) => {
        setMicError(errMessage);
      },
      onAutoEnd: (alternatives, transcript) => {
        setIsRecording(false);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        if (timeoutTimerRef.current) {
          clearTimeout(timeoutTimerRef.current);
          timeoutTimerRef.current = null;
        }
        finalizeEvaluation(alternatives, transcript);
      }
    });
  };

  // Stop recording and evaluate
  const handleStopRecording = async () => {
    if (!recorderRef.current) return;
    setIsRecording(false);

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current);
      timeoutTimerRef.current = null;
    }

    const { speechAlternatives, transcript } = await recorderRef.current.stopRecording();
    finalizeEvaluation(speechAlternatives, transcript);
  };

  // Play teacher native audio
  const handlePlayNativeAudio = async () => {
    setIsPlayingNativeAudio(true);
    try {
      await playChineseAudio(targetText);
    } catch (e) {
      console.warn('Native audio play error:', e);
    } finally {
      setIsPlayingNativeAudio(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-emerald-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">{title}</h3>
              <p className="text-[11px] text-slate-500">Chấm điểm phát âm tiếng Trung chuẩn xác</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* In-App Browser Warning Banner (Zalo / FB / Messenger) */}
        {isZaloOrFB && (
          <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 flex items-start gap-2.5 text-amber-800 text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1.5">
              <p className="leading-snug">
                <strong>Bạn đang mở trong Zalo/Facebook:</strong> Trình duyệt Zalo thường chặn micro.
                Hãy bấm <strong>dấu 3 chấm (⋮ hoặc •••)</strong> ở góc trên và chọn{' '}
                <strong>"Mở bằng trình duyệt" (Safari / Chrome)</strong> để nhận diện giọng nói.
              </p>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-200/70 hover:bg-amber-200 text-amber-900 font-medium text-[11px] transition-colors"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? 'Đã sao chép liên kết!' : 'Sao chép link để dán vào Chrome/Safari'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Chrome on iOS Notice */}
        {isCriOS && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-start gap-2 text-amber-900 text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              Trên iPhone, Apple chặn micro nhận diện giọng nói trên Google Chrome.{' '}
              <strong>Vui lòng mở trang web này bằng Safari trên iPhone</strong> để sử dụng được tính năng ghi âm nhé!
            </p>
          </div>
        )}

        {/* Unsupported Browser Alert */}
        {!isSupported && !isZaloOrFB && !isCriOS && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 flex items-start gap-2 text-rose-800 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói tiếng Trung. Vui lòng mở ứng dụng
              bằng <strong>Google Chrome</strong> (Android) hoặc <strong>Safari</strong> (iPhone).
            </p>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex flex-col items-center overflow-y-auto">
          {/* Target Text Card */}
          <div className="w-full bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 mb-4 sm:mb-6">
            {targetPinyin && (
              <div className="text-sm font-semibold text-purple-600 mb-1">{targetPinyin}</div>
            )}
            <div className="text-2xl sm:text-3xl font-bold font-chinese text-slate-900 tracking-wide">
              <HighlightText text={targetText} highlight={highlightWord} />
            </div>
            {targetMeaning && (
              <div className="text-xs text-slate-500 mt-2 font-medium">{targetMeaning}</div>
            )}

            {/* Quick listen button */}
            <div className="mt-3 flex justify-center">
              <button
                onClick={handlePlayNativeAudio}
                disabled={isPlayingNativeAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <Volume2
                  className={`w-3.5 h-3.5 ${isPlayingNativeAudio ? 'animate-pulse' : ''}`}
                />
                <span>Nghe phát âm chuẩn</span>
              </button>
            </div>
          </div>

          {/* Error Banner if mic denied */}
          {micError && (
            <div className="w-full mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold">{micError}</div>
                <div className="mt-1 text-[11px] text-rose-600">
                  Mẹo: Đưa sát điện thoại vào gần miệng và đọc to rõ ràng một lần nữa nhé!
                </div>
              </div>
            </div>
          )}

          {/* Recording Status / Mic Button */}
          {!result ? (
            <div className="flex flex-col items-center my-2 w-full">
              <div className="relative">
                {/* Pulse wave ring when recording */}
                {isRecording && (
                  <span className="absolute -inset-3 rounded-full bg-rose-400 opacity-75 animate-ping" />
                )}

                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-200 active:scale-95 ${
                    isRecording
                      ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200 ring-4 ring-rose-200'
                      : 'bg-gradient-to-tr from-purple-600 to-emerald-500 hover:scale-105 shadow-purple-200'
                  }`}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 fill-white" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </button>
              </div>

              <div className="mt-4 text-center w-full max-w-xs">
                {isRecording ? (
                  <div>
                    <span className="text-rose-600 font-bold text-sm flex items-center justify-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                      <span>
                        Đang ghi âm... ({formatTime(recordingSeconds)} / {formatTime(effectiveTimeout)})
                      </span>
                    </span>

                    {/* Progress bar towards timeout */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden border border-slate-200/50">
                      <div
                        className="bg-rose-500 h-1.5 rounded-full transition-all duration-300 ease-linear"
                        style={{
                          width: `${Math.min(100, (recordingSeconds / effectiveTimeout) * 100)}%`
                        }}
                      />
                    </div>

                    {/* Live speech feedback in real-time */}
                    <div className="mt-3 p-2.5 bg-purple-50 rounded-xl border border-purple-100 min-h-[46px] flex items-center justify-center">
                      <div className="flex items-center gap-1.5 text-xs text-purple-700">
                        <Radio className="w-3.5 h-3.5 text-purple-500 animate-pulse shrink-0" />
                        <span className="font-medium">{listenStatus}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2">
                      Hệ thống tự động chấm điểm khi bạn đọc xong, hoặc bấm nút vuông đỏ để dừng
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-slate-700 font-semibold text-sm">
                      Bấm vào mic để bắt đầu đọc
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      Nói to, rõ ràng vào mic • Tự chấm điểm ngay khi đọc xong
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Scoring Result Card */
            <div className="w-full flex flex-col items-center animate-fade-in">
              {/* Score circle badge */}
              <div
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-xl ${
                  result.score >= 90
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : result.score >= 70
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : result.score >= 50
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-rose-500 bg-rose-50 text-rose-700'
                }`}
              >
                <div className="text-3xl font-black leading-none">{result.score}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider mt-1">Điểm</div>
              </div>

              {/* Feedback text */}
              <div className="text-center mt-3 w-full">
                <div
                  className={`text-sm font-bold flex items-center justify-center gap-1.5 ${
                    result.score >= 70 ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {result.score >= 70 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>{result.feedback}</span>
                </div>

                {/* Recognized vs Expected comparison */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-left text-xs space-y-1.5">
                  <div className="flex items-start gap-1">
                    <span className="font-semibold text-slate-500 shrink-0">Bạn đã đọc:</span>
                    <span
                      className={`font-chinese font-bold ${
                        result.score >= 70 ? 'text-emerald-700' : 'text-slate-800'
                      }`}
                    >
                      「{result.recognizedText}」
                    </span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="font-semibold text-slate-500 shrink-0">Mẫu chuẩn:</span>
                    <span className="font-chinese font-bold text-emerald-700">
                      「{result.expectedText}」
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex items-center gap-2 mt-4">
                {/* Play native teacher audio */}
                <button
                  onClick={handlePlayNativeAudio}
                  disabled={isPlayingNativeAudio}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    isPlayingNativeAudio
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-300 ring-2 ring-emerald-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Volume2
                    className={`w-3.5 h-3.5 ${
                      isPlayingNativeAudio ? 'text-emerald-600 animate-pulse' : ''
                    }`}
                  />
                  <span>Nghe giọng mẫu</span>
                </button>

                {/* Retry button */}
                <button
                  onClick={handleStartRecording}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-200 transition-all active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đọc lại</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>HSK Pronunciation Coach</span>
          <button
            onClick={onClose}
            className="px-3 py-1 font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-200/60"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
