// lib/speech.ts - Unified Studio-Quality German Audio across iOS, Android & PC

export type SpeechRate = 'normal' | 'slow';

export interface SpeakOptions {
  rate?: SpeechRate;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: Error) => void;
}

// Global active audio & utterance tracking to prevent overlapping and iOS Safari garbage collection
let activeAudio: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let cachedBestGermanVoice: SpeechSynthesisVoice | null = null;
let isVoiceInitialized = false;

// Client-side cache for instant zero-latency replay
const clientAudioCache = new Map<string, string>();

/**
 * Score German voices for offline Web Speech API fallback.
 */
function evaluateVoiceQuality(voice: SpeechSynthesisVoice): number {
  const lang = (voice.lang || '').replace('_', '-').toLowerCase();
  if (!lang.startsWith('de')) return -1;

  let score = 20;
  const name = (voice.name || '').toLowerCase();
  const uri = (voice.voiceURI || '').toLowerCase();

  // Prefer standard German Germany (de-DE)
  if (lang === 'de-de') {
    score += 30;
  } else if (lang.startsWith('de')) {
    score += 15;
  }

  // Modern Neural / Enhanced / Studio voice keywords
  if (name.includes('natural') || uri.includes('natural')) score += 80;
  if (name.includes('enhanced') || uri.includes('enhanced')) score += 75;
  if (name.includes('premium') || uri.includes('premium')) score += 70;
  if (name.includes('google') || uri.includes('google')) score += 65; // Google Deutsch (PC / Android)
  if (name.includes('online') || uri.includes('online')) score += 60; // Microsoft Edge Online Neural
  if (name.includes('siri') || name.includes('apple')) score += 50;

  // High-quality German voice talent personas
  if (
    name.includes('katja') ||
    name.includes('stefan') ||
    name.includes('anna') ||
    name.includes('helena') ||
    name.includes('marlene') ||
    name.includes('martin') ||
    name.includes('viktor') ||
    name.includes('conrad')
  ) {
    score += 35;
  }

  return score;
}

function findBestGermanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  let bestVoice: SpeechSynthesisVoice | null = null;
  let highestScore = -1;

  for (const voice of voices) {
    const score = evaluateVoiceQuality(voice);
    if (score > highestScore) {
      highestScore = score;
      bestVoice = voice;
    }
  }

  // Fallback: any voice starting with de
  if (!bestVoice) {
    bestVoice = voices.find((v) => (v.lang || '').toLowerCase().startsWith('de')) || null;
  }

  if (bestVoice) {
    cachedBestGermanVoice = bestVoice;
  }

  return bestVoice;
}

function initVoices(): Promise<SpeechSynthesisVoice | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve(null);
      return;
    }

    const immediate = findBestGermanVoice();
    if (immediate) {
      isVoiceInitialized = true;
      resolve(immediate);
      return;
    }

    const handleVoicesChanged = () => {
      const v = findBestGermanVoice();
      if (v) {
        isVoiceInitialized = true;
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        resolve(v);
      }
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      isVoiceInitialized = true;
      resolve(cachedBestGermanVoice || findBestGermanVoice());
    }, 800);
  });
}

// Pre-warm Web Speech voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initVoices();
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    findBestGermanVoice();
  });
}

/**
 * Play German pronunciation using the unified high-fidelity neural audio engine.
 * Ensures identical, crystal-clear, native studio sound on iOS, Android, PC, and Mac.
 */
export async function speakGerman(
  text: string,
  options: SpeakOptions = {}
): Promise<{ success: boolean; errorReason?: string }> {
  const cleanText = text.trim();
  if (!cleanText) return { success: false, errorReason: 'Text is empty' };

  // Stop any currently playing audio or speech synthesis
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // Ignore pause error
    }
    activeAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancel error
    }
    activeUtterance = null;
  }

  // 1. Primary Method: High-Fidelity Studio Neural Audio via /api/tts
  // Provides identical pristine 24kHz native German speaker voice across all devices
  try {
    let audioUrl = clientAudioCache.get(cleanText.toLowerCase());

    if (!audioUrl) {
      const apiUrl = `/api/tts?text=${encodeURIComponent(cleanText)}`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`TTS server responded with ${res.status}`);
      }
      const blob = await res.blob();
      audioUrl = URL.createObjectURL(blob);
      clientAudioCache.set(cleanText.toLowerCase(), audioUrl);
    }

    return new Promise((resolve) => {
      const audio = new Audio(audioUrl);
      activeAudio = audio;

      // Rate handling for slow learning mode
      audio.playbackRate = options.rate === 'slow' ? 0.78 : 1.0;

      let started = false;

      audio.onplay = () => {
        started = true;
        options.onStart?.();
      };

      audio.onended = () => {
        activeAudio = null;
        options.onEnd?.();
        resolve({ success: true });
      };

      audio.onerror = () => {
        activeAudio = null;
        // Fall back to Web Speech synthesis below
        fallbackWebSpeech(cleanText, options).then(resolve);
      };

      audio.play().catch((playErr) => {
        console.warn('HTML5 Audio play failed (possibly blocked without user gesture), falling back:', playErr);
        activeAudio = null;
        fallbackWebSpeech(cleanText, options).then(resolve);
      });
    });
  } catch (err) {
    console.warn('Server TTS failed or offline, falling back to Web Speech:', err);
    return fallbackWebSpeech(cleanText, options);
  }
}

/**
 * Fallback Web Speech API when offline or if server TTS is unreachable.
 */
async function fallbackWebSpeech(
  text: string,
  options: SpeakOptions = {}
): Promise<{ success: boolean; errorReason?: string }> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options.onError?.(new Error('Speech synthesis not supported'));
    return { success: false, errorReason: 'আপনার ডিভাইসে স্পিচ সিন্থেসিস সমর্থিত নয়।' };
  }

  try {
    if (!isVoiceInitialized || !cachedBestGermanVoice) {
      await initVoices();
    }

    const voice = cachedBestGermanVoice || findBestGermanVoice();
    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;

    // Strict standard de-DE tag
    utterance.lang = 'de-DE';
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = options.rate === 'slow' ? 0.72 : 0.9;
    utterance.pitch = 1.0;

    return new Promise((resolve) => {
      utterance.onstart = () => {
        options.onStart?.();
      };

      utterance.onend = () => {
        activeUtterance = null;
        options.onEnd?.();
        resolve({ success: true });
      };

      utterance.onerror = (e) => {
        activeUtterance = null;
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          const err = new Error(e.error || 'Speech error');
          options.onError?.(err);
          resolve({ success: false, errorReason: err.message });
        } else {
          resolve({ success: true });
        }
      };

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utterance);
    });
  } catch (fallbackErr: unknown) {
    activeUtterance = null;
    const msg = fallbackErr instanceof Error ? fallbackErr.message : 'Unknown fallback error';
    options.onError?.(new Error(msg));
    return { success: false, errorReason: msg };
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && ('Audio' in window || 'speechSynthesis' in window);
}
