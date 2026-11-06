// lib/speech.ts - Premium Natural German Speech Synthesis with iOS/Safari Optimization

export type SpeechRate = 'normal' | 'slow';

export interface SpeakOptions {
  rate?: SpeechRate;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: Error) => void;
}

// Module-level references to prevent iOS Safari garbage collection during speech playback
let activeUtterance: SpeechSynthesisUtterance | null = null;
let cachedBestGermanVoice: SpeechSynthesisVoice | null = null;
let isVoiceInitialized = false;

/**
 * Score German voices to select the most natural, human-like voice available on
 * iOS (Anna Enhanced, Helena, Martin), Android (Google Deutsch), Windows/Edge
 * (Stefan/Katja Natural), or macOS.
 */
function evaluateVoiceQuality(voice: SpeechSynthesisVoice): number {
  const lang = (voice.lang || '').toLowerCase();
  if (!lang.startsWith('de')) return -1;

  let score = 10;
  const name = (voice.name || '').toLowerCase();

  // Prefer standard German Germany (de-DE)
  if (lang === 'de-de' || lang === 'de_de') {
    score += 25;
  } else if (lang.startsWith('de')) {
    score += 15;
  }

  // Premium / Enhanced / Natural modern voice keywords
  if (name.includes('enhanced')) score += 80;
  if (name.includes('natural')) score += 75;
  if (name.includes('premium')) score += 70;
  if (name.includes('google')) score += 55; // Google Deutsch is smooth and natural
  if (name.includes('online')) score += 50; // Edge/Azure neural voices
  if (name.includes('siri') || name.includes('apple')) score += 40;

  // Well-known high-quality German voice talent
  if (
    name.includes('anna') ||
    name.includes('helena') ||
    name.includes('marlene') ||
    name.includes('martin') ||
    name.includes('stefan') ||
    name.includes('katja')
  ) {
    score += 30;
  }

  // Heavily penalize compact or robotic legacy TTS
  if (name.includes('compact')) score -= 45;

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

    // Safari / WebKit fallback timeout
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      isVoiceInitialized = true;
      resolve(cachedBestGermanVoice || findBestGermanVoice());
    }, 1200);
  });
}

// Warm up voices on client load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initVoices();
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    findBestGermanVoice();
  });
}

export async function speakGerman(
  text: string,
  options: SpeakOptions = {}
): Promise<{ success: boolean; errorReason?: string }> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { success: false, errorReason: 'আপনার ডিভাইসে স্পিচ সিন্থেসিস সমর্থিত নয়।' };
  }

  try {
    // Cancel ongoing utterance
    window.speechSynthesis.cancel();

    // Ensure voices are loaded
    if (!isVoiceInitialized || !cachedBestGermanVoice) {
      await initVoices();
    }

    const voice = cachedBestGermanVoice || findBestGermanVoice();
    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance; // Prevent garbage collection in iOS Safari

    utterance.lang = voice?.lang || 'de-DE';
    if (voice) {
      utterance.voice = voice;
    }

    // Natural German speaking cadence:
    // 0.92 gives clear, human-like tempo on iOS/PC, 0.72 gives gentle learning pace
    utterance.rate = options.rate === 'slow' ? 0.72 : 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      activeUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        options.onError?.(new Error(e.error || 'Speech error'));
      }
    };

    // iOS Safari sometimes gets paused internally, resume ensures it speaks
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    window.speechSynthesis.speak(utterance);
    return { success: true };
  } catch (err: unknown) {
    activeUtterance = null;
    const msg = err instanceof Error ? err.message : 'Unknown speech error';
    return { success: false, errorReason: msg };
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
