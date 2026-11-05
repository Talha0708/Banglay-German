import { Article, Word } from './vocabulary';

export type ExerciseType =
  | 'multiple_choice'
  | 'matching_pairs'
  | 'flashcard_flip'
  | 'typing'
  | 'listening'
  | 'article_quiz'
  | 'conjugation_quiz'
  | 'sentence_builder'
  | 'fill_blank';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt_bn: string;
  prompt_en?: string;
  explanation_bn: string;
  explanation_en?: string;
  audioPrompt?: string; // German text to read aloud
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface MatchingPairsExercise extends BaseExercise {
  type: 'matching_pairs';
  pairs: { german: string; bengali: string }[];
}

export interface FlashcardFlipExercise extends BaseExercise {
  type: 'flashcard_flip';
  front: string;
  back: string;
  hint_bn?: string;
  audioText?: string;
}

export interface TypingExercise extends BaseExercise {
  type: 'typing';
  prompt: string; // usually Bengali
  correctAnswer: string; // German target
  acceptedAnswers?: string[];
  placeholder?: string;
}

export interface ListeningExercise extends BaseExercise {
  type: 'listening';
  audioText: string;
  options: string[];
  correctAnswer: string;
}

export interface ArticleQuizExercise extends BaseExercise {
  type: 'article_quiz';
  noun: string; // e.g. "Apfel"
  meaning_bn: string; // e.g. "আপেল"
  correctArticle: 'der' | 'die' | 'das';
}

export interface ConjugationQuizExercise extends BaseExercise {
  type: 'conjugation_quiz';
  verb: string;
  pronoun: 'ich' | 'du' | 'er/sie/es' | 'wir' | 'ihr' | 'sie/Sie';
  meaning_bn: string;
  options: string[];
  correctAnswer: string;
}

export interface SentenceBuilderExercise extends BaseExercise {
  type: 'sentence_builder';
  targetSentence: string;
  scrambledWords: string[];
  meaning_bn: string;
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill_blank';
  sentenceWithBlank: string; // e.g. "Ich ___ aus Bangladesch."
  blankType: 'verb' | 'article' | 'preposition' | 'noun';
  options: string[];
  correctAnswer: string;
  translation_bn: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | MatchingPairsExercise
  | FlashcardFlipExercise
  | TypingExercise
  | ListeningExercise
  | ArticleQuizExercise
  | ConjugationQuizExercise
  | SentenceBuilderExercise
  | FillBlankExercise;

export interface GrammarTip {
  title_bn: string;
  title_en: string;
  content_bn: string;
  content_en?: string;
  rule_table?: { label: string; value: string; note?: string }[];
}

export interface LessonContent {
  intro_bn: string;
  intro_en?: string;
  examples: { de: string; bn: string; en?: string; note?: string }[];
}

export interface PatternPracticeItem {
  id: string;
  template_de: string; // e.g. "Ich möchte {slot}."
  slot_label_bn: string; // e.g. "খাবারের নাম"
  options: { word: string; meaning_bn: string }[];
  translation_template_bn: string; // e.g. "আমি {slot} চাই।"
}

export interface Lesson {
  id: string;
  unitId: string;
  title_bn: string;
  title_en: string;
  subtitle_de: string;
  order: number;
  content: LessonContent;
  vocabulary: Word[];
  grammarTip: GrammarTip;
  exercises: Exercise[];
  patternPractice?: PatternPracticeItem[];
}

export interface Unit {
  id: string;
  level: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  color: string;
  lessons: Lesson[];
}
