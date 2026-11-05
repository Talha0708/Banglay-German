import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SRSCard, SRSGrade } from '../types/srs';
import { Word } from '../types/vocabulary';
import { calculateSM2, createInitialCard } from '../lib/srs';

export interface AppSettings {
  darkMode: boolean;
  speechSpeed: 'normal' | 'slow';
  explanationLang: 'bn' | 'en';
}

interface AppState {
  completedLessons: string[];
  knownWords: Record<string, boolean>; // wordId -> boolean
  srsCards: Record<string, SRSCard>;
  settings: AppSettings;
  dismissedInstallBanner: boolean;
  
  // Actions
  completeLesson: (lessonId: string, vocab?: Word[], sentences?: { de: string; bn: string }[]) => void;
  toggleWordKnown: (wordId: string) => void;
  markWordKnown: (wordId: string, known: boolean) => void;
  recordSRSReview: (cardId: string, grade: SRSGrade) => void;
  addWordToSRS: (word: Word) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  dismissInstallBanner: () => void;
  resetProgress: () => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isWordKnown: (wordId: string) => boolean;
  getDueCardsCount: () => number;
}

const safeLocalStorage = {
  getItem: (name: string): string | null => {
    try {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(name);
    } catch (e) {
      console.warn('Storage read failed:', e);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(name, value);
      }
    } catch (e) {
      console.warn('Storage write failed:', e);
    }
  },
  removeItem: (name: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(name);
      }
    } catch (e) {
      console.warn('Storage delete failed:', e);
    }
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      knownWords: {},
      srsCards: {},
      settings: {
        darkMode: true, // Defaulting to sleek dark mode
        speechSpeed: 'normal',
        explanationLang: 'bn',
      },
      dismissedInstallBanner: false,

      completeLesson: (lessonId: string, vocab = [], sentences = []) => {
        set((state) => {
          const completed = state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId];

          const newCards = { ...state.srsCards };
          const newKnownWords = { ...state.knownWords };

          // Automatically enroll lesson vocabulary into SRS cards
          for (const word of vocab) {
            if (!newCards[word.id]) {
              newCards[word.id] = createInitialCard({
                id: word.id,
                type: 'word',
                front: word.article ? `${word.article} ${word.german}` : word.german,
                back: word.bengali,
                pronunciationBn: word.pronunciationBn,
                article: word.article,
                pos: word.pos,
                example_de: word.example_de,
                example_bn: word.example_bn,
              });
            }
          }

          // Enroll sample sentences into SRS cards as well
          for (const s of sentences) {
            const sid = `s_${s.de.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase().slice(0, 24)}`;
            if (!newCards[sid]) {
              newCards[sid] = createInitialCard({
                id: sid,
                type: 'sentence',
                front: s.de,
                back: s.bn,
                example_de: s.de,
                example_bn: s.bn,
              });
            }
          }

          return {
            completedLessons: completed,
            srsCards: newCards,
            knownWords: newKnownWords,
          };
        });
      },

      toggleWordKnown: (wordId: string) => {
        set((state) => ({
          knownWords: {
            ...state.knownWords,
            [wordId]: !state.knownWords[wordId],
          },
        }));
      },

      markWordKnown: (wordId: string, known: boolean) => {
        set((state) => ({
          knownWords: {
            ...state.knownWords,
            [wordId]: known,
          },
        }));
      },

      recordSRSReview: (cardId: string, grade: SRSGrade) => {
        set((state) => {
          const card = state.srsCards[cardId];
          if (!card) return state;

          const updated = calculateSM2(card, grade);
          return {
            srsCards: {
              ...state.srsCards,
              [cardId]: updated,
            },
          };
        });
      },

      addWordToSRS: (word: Word) => {
        set((state) => {
          if (state.srsCards[word.id]) return state;
          const newCard = createInitialCard({
            id: word.id,
            type: 'word',
            front: word.article ? `${word.article} ${word.german}` : word.german,
            back: word.bengali,
            pronunciationBn: word.pronunciationBn,
            article: word.article,
            pos: word.pos,
            example_de: word.example_de,
            example_bn: word.example_bn,
          });

          return {
            srsCards: {
              ...state.srsCards,
              [word.id]: newCard,
            },
          };
        });
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        }));
      },

      dismissInstallBanner: () => {
        set({ dismissedInstallBanner: true });
      },

      resetProgress: () => {
        set({
          completedLessons: [],
          knownWords: {},
          srsCards: {},
          dismissedInstallBanner: false,
        });
      },

      isLessonCompleted: (lessonId: string) => {
        return get().completedLessons.includes(lessonId);
      },

      isWordKnown: (wordId: string) => {
        return !!get().knownWords[wordId];
      },

      getDueCardsCount: () => {
        const cards = Object.values(get().srsCards);
        const now = new Date().getTime();
        return cards.filter((card) => {
          if (!card.dueDate) return true;
          return new Date(card.dueDate).getTime() <= now;
        }).length;
      },
    }),
    {
      name: 'banglay-german-storage',
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
