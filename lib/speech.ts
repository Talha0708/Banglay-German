// lib/speech.ts - German speech synthesis with async voice resolution and fallback

type SpeechRate = 'normal' | 'slow';

let germanVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

function loadGermanVoice(): Promise<SpeechSynthesisVoice | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve(null);
      return;
    }

    const findVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Look for de-DE or any German voice
      const voice =
        voices.find((v) => v.lang === 'de-DE' || v.lang === 'de_DE') ||
        voices.find((v) => v.lang.toLowerCase().startsWith('de')) ||
        null;
      germanVoice = voice;
      voicesLoaded = true;
      return voice;
    };

    const immediate = findVoice();
    if (immediate) {
      resolve(immediate);
      return;
    }

    // iOS and Chrome populate voices asynchronously
    const onVoicesChanged = () => {
      const v = findVoice();
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(v);
    };

    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);

    // Timeout fallback after 1.5s
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(germanVoice);
    }, 1500);
  });
}

// Pre-warm voices on first client load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadGermanVoice();
}

export interface SpeakOptions {
  rate?: SpeechRate;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: Error) => void;
}

export async function speakGerman(
  text: string,
  options: SpeakOptions = {}
): Promise<{ success: boolean; errorReason?: string }> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { success: false, errorReason: 'আপনার ব্রাউজারে স্পিচ সাপোর্ট নেই।' };
  }

  try {
    // Cancel any previous speaking to prevent queue blockage
    window.speechSynthesis.cancel();

    if (!voicesLoaded) {
      await loadGermanVoice();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';

    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    // Set speed: normal = 0.95 (natural German tempo), slow = 0.70 (clear beginner tempo)
    utterance.rate = options.rate === 'slow' ? 0.7 : 0.92;
    utterance.pitch = 1.0;

    if (options.onStart) utterance.onstart = () => options.onStart?.();
    if (options.onEnd) utterance.onend = () => options.onEnd?.();
    utterance.onerror = (e) => {
      if (options.onError) {
        options.onError(new Error(e.error || 'Speech synthesis error'));
      }
    };

    window.speechSynthesis.speak(utterance);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown speech error';
    return { success: false, errorReason: message };
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
