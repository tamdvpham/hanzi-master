import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  Volume2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  X,
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PronunciationScoreResult } from '../types';
import { VoiceRecorderManager, evaluatePronunciation } from '../utils/speechScorer';
import { playChineseAudio, playSuccessSound, preloadChineseAudio } from '../utils/audio';
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
  // Timeout: 5s for 1 word, 10s for 1 sentence
  const isSentence = mode === 'sentence' || targetText.length > 4 || targetText.includes('。') || targetText.includes('，') || targetText.includes('！') || targetText.includes('？');
  const effectiveTimeout = timeoutSeconds ?? (isSentence ? 10 : 5);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [result, setResult] = useState<PronunciationScoreResult | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [isPlayingNativeAudio, setIsPlayingNativeAudio] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);

  const recorderRef = useRef<VoiceRecorderManager | null>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const timeoutTimerRef = useRef<any>(null);
  const speechAlternativesRef = useRef<string[]>([]);

  useEffect(() => {
    recorderRef.current = new VoiceRecorderManager();
    // Preload native pronunciation in background immediately
    preloadChineseAudio(targetText);

    return () => {
      if (recorderRef.current && isRecording) {
        recorderRef.current.stopRecording();
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
      }
      if (userAudioUrl) {
        URL.revokeObjectURL(userAudioUrl);
      }
      if (userAudioPlayerRef.current) {
        userAudioPlayerRef.current.pause();
        userAudioPlayerRef.current = null;
      }
    };
  }, [targetText]);

  // Format seconds to 00:0X
  const formatTime = (sec: number) => `00:${sec < 10 ? '0' : ''}${sec}`;

  // Start recording
  const handleStartRecording = async () => {
    setResult(null);
    setRecordingSeconds(0);
    speechAlternativesRef.current = [];

    if (recorderRef.current) {
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

      await recorderRef.current.startRecording((results) => {
        speechAlternativesRef.current = results;
      });
    }
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

    const { audioBlobUrl } = await recorderRef.current.stopRecording();
    setUserAudioUrl(audioBlobUrl);

    // Wait 300ms for speech recognition to finalize
    setTimeout(() => {
      const recognized = speechAlternativesRef.current;
      const evaluation = evaluatePronunciation(recognized, targetText);
      evaluation.audioBlobUrl = audioBlobUrl || undefined;
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
    }, 400);
  };

  // Play user recorded audio
  const handlePlayUserAudio = () => {
    if (!userAudioUrl) return;

    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }
    setIsPlayingNativeAudio(false);

    const audio = new Audio(userAudioUrl);
    userAudioPlayerRef.current = audio;
    setIsPlayingUserAudio(true);

    audio.onended = () => setIsPlayingUserAudio(false);
    audio.onerror = () => setIsPlayingUserAudio(false);
    audio.play().catch(() => setIsPlayingUserAudio(false));
  };

  // Play teacher native audio with guaranteed state release
  const handlePlayNativeAudio = async () => {
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      setIsPlayingUserAudio(false);
    }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-emerald-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">{title}</h3>
              <p className="text-xs text-slate-500">Ghi âm và chấm điểm phát âm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center">
          {/* Target Text Card */}
          <div className="w-full bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 mb-6">
            {targetPinyin && (
              <div className="text-sm font-semibold text-purple-600 mb-1">
                {targetPinyin}
              </div>
            )}
            <div className="text-2xl sm:text-3xl font-bold font-chinese text-slate-900 tracking-wide">
              <HighlightText text={targetText} highlight={highlightWord} />
            </div>
            {targetMeaning && (
              <div className="text-xs text-slate-500 mt-2 font-medium">
                {targetMeaning}
              </div>
            )}

            {/* Quick listen button */}
            <div className="mt-3 flex justify-center">
              <button
                onClick={handlePlayNativeAudio}
                disabled={isPlayingNativeAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingNativeAudio ? 'animate-pulse' : ''}`} />
                <span>Nghe phát âm chuẩn</span>
              </button>
            </div>
          </div>

          {/* Recording Status / Mic Button */}
          {!result ? (
            <div className="flex flex-col items-center my-2">
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
                      <span>Đang ghi âm... ({formatTime(recordingSeconds)} / {formatTime(effectiveTimeout)})</span>
                    </span>

                    {/* Progress bar towards timeout */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden border border-slate-200/50">
                      <div
                        className="bg-rose-500 h-1.5 rounded-full transition-all duration-300 ease-linear"
                        style={{ width: `${Math.min(100, (recordingSeconds / effectiveTimeout) * 100)}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-400 mt-2">
                      Bấm nút đỏ để dừng sớm hoặc tự động kết thúc sau {effectiveTimeout}s
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-slate-700 font-semibold text-sm">
                      Bấm vào mic để bắt đầu đọc
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      Giới hạn {effectiveTimeout}s ({isSentence ? 'câu ví dụ' : 'từ vựng'}) • Tự động dừng hoặc bấm dừng bất kỳ lúc nào
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
              <div className="text-center mt-3">
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
                    <span className="font-chinese font-bold text-slate-800">
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

              {/* Comparison & Replay Actions */}
              <div className="w-full grid grid-cols-2 gap-2 mt-4">
                {/* Play user audio */}
                <button
                  onClick={handlePlayUserAudio}
                  disabled={!userAudioUrl}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isPlayingUserAudio
                      ? 'bg-purple-100 text-purple-700 border-purple-300 ring-2 ring-purple-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 ${isPlayingUserAudio ? 'text-purple-600 animate-pulse' : ''}`} />
                  <span>Nghe lại giọng bạn</span>
                </button>

                {/* Play native teacher audio */}
                <button
                  onClick={handlePlayNativeAudio}
                  disabled={isPlayingNativeAudio}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isPlayingNativeAudio
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-300 ring-2 ring-emerald-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingNativeAudio ? 'text-emerald-600 animate-pulse' : ''}`} />
                  <span>Nghe giọng mẫu</span>
                </button>
              </div>

              {/* Retry button */}
              <button
                onClick={handleStartRecording}
                className="w-full mt-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-200 transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thử đọc lại để nâng điểm</span>
              </button>
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
