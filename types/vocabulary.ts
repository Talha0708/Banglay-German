export type Article = 'der' | 'die' | 'das' | null;

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'phrase'
  | 'preposition'
  | 'number'
  | 'numeral'
  | 'conjunction'
  | string;

export interface VerbConjugations {
  ich: string;
  du: string;
  er_sie_es: string;
  wir: string;
  ihr: string;
  sie_Sie: string;
}

export interface Word {
  id: string;
  german: string;
  article: Article;
  plural?: string | null;
  pos: PartOfSpeech;
  bengali: string;
  english: string;
  pronunciationBn: string;
  example_de: string;
  example_bn: string;
  topic: string;
  level: 'A1';
  conjugations?: VerbConjugations;
  conjugation?: VerbConjugations;
}
