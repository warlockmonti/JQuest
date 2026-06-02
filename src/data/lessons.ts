import { type Kana, hiragana, katakana } from './kana';
import { type FillBlankProblem } from '../components/games/FillInBlank';
export { type FillBlankProblem };
import { generateGrammarLessons } from './grammarLessons';
import { generateVocabLessons } from './vocabLessons';
import { generateKanjiLessons } from './kanjiLessons';
import { generateMasteryLessons } from './masteryLessons';
import { type VerbMasteryData, masteryVerbs } from './masteryVerbs';

export type LessonType = 'kana' | 'conversation' | 'checkpoint' | 'boss' | 'adventure';

export interface ConversationLine { id: string; speaker: 'npc' | 'user'; text: string; english: string; }
export interface ConversationChoice { id: string; text: string; english: string; isCorrect: boolean; feedback: string; }
export interface ConversationScenario {
    id: string; npcName: string; npcAvatar: string; background: string; intro: string;
    exchanges: { npcQuery: ConversationLine; options: ConversationChoice[]; }[];
}
export interface GrammarSlide {
    type: 'grammar'; title: string; content: string;
    structure: { label: string; color: string; example: string; }[];
    exampleSentence: { japanese: string; romaji: string; english: string; };
}
export interface SentenceProblem {
    id: string; english: string; japanese: string;
    romaji?: string;
    literal?: string;
    emoji?: string;
    words: { id: string; text: string; meaning?: string; romaji?: string }[];
    solution: string[];
}
export interface KanjiLogicSlide {
    type: 'kanji-logic';
    title: string;
    kanji: string;
    meaning: string;
    description: string;
    parts: { kanji: string; meaning: string; color: string }[];
    reading: { on: string; kun?: string };
    example: { word: string; meaning: string; romaji: string };
}
export interface LessonData {
    id: string; worldId: string; title: string; type: LessonType;
    content: (Kana | GrammarSlide | KanjiLogicSlide)[] | ConversationScenario;
    fillBlanks?: FillBlankProblem[];
    sentences?: SentenceProblem[];
    xp: number;
    hideRomaji?: boolean;
    hideEnglish?: boolean;
}

export let allLessons: LessonData[] = [];

export const WORLDS = [
    { id: 'world-1', title: 'World 1: Hiragana Forest', description: 'Early Kana & Foundations' },
    { id: 'world-2', title: 'World 2: Katakana Coast', description: 'Modern Script & Loanwords' },
    { id: 'world-3', title: 'World 3: Spirits of the Path', description: 'Essential Phrases & Conversation' },
    { id: 'world-4', title: 'World 4: Way of the Verb I', description: 'Action Foundations' },
    { id: 'world-5', title: 'World 5: Way of the Verb II', description: 'Conjugation Mastery' },
    { id: 'world-6', title: 'World 6: Grammar Forge I', description: 'Adjectives & Describing' },
    { id: 'world-7', title: 'World 7: Grammar Forge II', description: 'Complex Sentences' },
    { id: 'world-8', title: 'World 8: Core Vocabulary I', description: 'The First 100 Pillars' },
    { id: 'world-9', title: 'World 9: Core Vocabulary II', description: 'Expanding Horizons' },
    { id: 'world-10', title: 'World 10: Kanji Chronicles I', description: 'Basic Elements & Nature' },
    { id: 'world-11', title: 'World 11: Kanji Chronicles II', description: 'Time, People & Places' },
    { id: 'world-12', title: 'World 12: Kanji Chronicles III', description: 'Society & Daily Life' },
    { id: 'world-13', title: 'World 13: Mastery Gauntlet I', description: 'Pure Japanese Pt.1' },
    { id: 'world-14', title: 'World 14: Mastery Gauntlet II', description: 'Pure Japanese Pt.2' },
    { id: 'world-15', title: 'World 15: True Master', description: 'The Final Trial' },
];

export interface VerbInfo {
    id: string;
    dictionary: string;
    masu: string;
    mashita: string;
    masen: string;
    masendeshita: string;
    meaning: string;
    romaji: string;
}

export const essentialVerbs: VerbInfo[] = masteryVerbs.map((v, i) => ({
    id: `v${i + 1}`,
    dictionary: v.verb,
    masu: v.conjugations.politePresent.jp,
    mashita: v.conjugations.politePast.jp,
    masen: v.conjugations.negative.jp.replace('ない', 'ません'), // approximate for backwards compat if needed
    masendeshita: v.conjugations.negative.jp.replace('ない', 'ませんでした'),
    meaning: v.meaning,
    romaji: v.reading
}));

// ── Fill-blank problem banks (3 per lesson, 2 blanks each) ───────────────────

const fillBlankBanks: Record<number, FillBlankProblem[]> = {
    1: [
        {
            id: 'f1-1', japanese: 'こんにちは！',
            english: 'Hello! / Good afternoon!',
            romaji: 'Konnichiwa!',
            literal: 'ko-n-ni-chi-wa',
            emoji: '👋',
            parts: ['_', 'んにちは'],
            blanks: [{ position: 0, answer: 'こ', choices: [{ id: 'a', text: 'こ', romaji: 'ko' }, { id: 'b', text: 'は', romaji: 'wa' }, { id: 'c', text: 'に', romaji: 'ni' }, { id: 'd', text: 'ち', romaji: 'chi' }] }]
        },
        {
            id: 'f1-2', japanese: 'こんにちは！',
            english: 'Hello!',
            romaji: 'Konnichiwa!',
            literal: 'ko-n-ni-chi-wa',
            emoji: '👋',
            parts: ['こんに', '_', 'は'],
            blanks: [{ position: 1, answer: 'ち', choices: [{ id: 'a', text: 'ち', romaji: 'chi' }, { id: 'b', text: 'に', romaji: 'ni' }, { id: 'c', text: 'わ', romaji: 'wa' }, { id: 'd', text: 'こ', romaji: 'ko' }] }]
        },
        {
            id: 'f1-3', japanese: 'こんにちは！',
            english: 'Hello!',
            romaji: 'Konnichiwa!',
            literal: 'ko-n-ni-chi-wa',
            emoji: '👋',
            parts: ['こんにち', '_'],
            blanks: [{ position: 1, answer: 'は', choices: [{ id: 'a', text: 'は', romaji: 'wa (ha)' }, { id: 'b', text: 'わ', romaji: 'wa' }, { id: 'c', text: 'に', romaji: 'ni' }, { id: 'd', text: 'ち', romaji: 'chi' }] }]
        }
    ],
    2: [
        {
            id: 'f2-1', japanese: 'さようなら！',
            english: 'Goodbye!',
            romaji: 'Sayounara!',
            literal: 'sa-yo-u-na-ra',
            emoji: '👋',
            parts: ['_', 'ようなら'],
            blanks: [{ position: 0, answer: 'さ', choices: [{ id: 'a', text: 'さ', romaji: 'sa' }, { id: 'b', text: 'な', romaji: 'na' }, { id: 'c', text: 'よ', romaji: 'yo' }, { id: 'd', text: 'う', romaji: 'u' }] }]
        },
        {
            id: 'f2-2', japanese: 'さようなら！',
            english: 'Goodbye!',
            romaji: 'Sayounara!',
            literal: 'sa-yo-u-na-ra',
            emoji: '👋',
            parts: ['さ', '_', 'うなら'],
            blanks: [{ position: 1, answer: 'よ', choices: [{ id: 'a', text: 'よ', romaji: 'yo' }, { id: 'b', text: 'さ', romaji: 'sa' }, { id: 'c', text: 'ら', romaji: 'ra' }, { id: 'd', text: 'な', romaji: 'na' }] }]
        },
        {
            id: 'f2-3', japanese: 'さようなら！',
            english: 'Goodbye!',
            romaji: 'Sayounara!',
            literal: 'sa-yo-u-na-ra',
            emoji: '👋',
            parts: ['さよう', '_', 'ら'],
            blanks: [{ position: 1, answer: 'な', choices: [{ id: 'a', text: 'な', romaji: 'na' }, { id: 'b', text: 'う', romaji: 'u' }, { id: 'c', text: 'よ', romaji: 'yo' }, { id: 'd', text: 'さ', romaji: 'sa' }] }]
        }
    ],
    3: [
        {
            id: 'f3-1', japanese: 'おはようございます！',
            english: 'Good morning!',
            romaji: 'Ohayou gozaimasu!',
            literal: 'o-ha-yo-u go-za-i-ma-su',
            emoji: '🌅',
            parts: ['_', 'はようございます'],
            blanks: [{ position: 0, answer: 'お', choices: [{ id: 'a', text: 'お', romaji: 'o' }, { id: 'b', text: 'は', romaji: 'ha' }, { id: 'c', text: 'ご', romaji: 'go' }, { id: 'd', text: 'よ', romaji: 'yo' }] }]
        },
        {
            id: 'f3-2', japanese: 'おはようございます！',
            english: 'Good morning!',
            romaji: 'Ohayou gozaimasu!',
            literal: 'o-ha-yo-u go-za-i-ma-su',
            emoji: '🌅',
            parts: ['お', '_', 'ようございます'],
            blanks: [{ position: 1, answer: 'は', choices: [{ id: 'a', text: 'は', romaji: 'ha' }, { id: 'b', text: 'お', romaji: 'o' }, { id: 'c', text: 'よ', romaji: 'yo' }, { id: 'd', text: 'が', romaji: 'ga' }] }]
        },
        {
            id: 'f3-3', japanese: 'おはよう！',
            english: 'Good morning! (casual)',
            romaji: 'Ohayou!',
            literal: 'o-ha-yo-u',
            emoji: '🌅',
            parts: ['おは', '_', 'う'],
            blanks: [{ position: 1, answer: 'よ', choices: [{ id: 'a', text: 'よ', romaji: 'yo' }, { id: 'b', text: 'は', romaji: 'ha' }, { id: 'c', text: 'お', romaji: 'o' }, { id: 'd', text: 'ご', romaji: 'go' }] }]
        }
    ],
    4: [
        {
            id: 'f4-1', japanese: 'ありがとうございます！',
            english: 'Thank you very much!',
            romaji: 'Arigatou gozaimasu!',
            literal: 'a-ri-ga-to-u go-za-i-ma-su',
            emoji: '🙏',
            parts: ['_', 'りがとうございます'],
            blanks: [{ position: 0, answer: 'あ', choices: [{ id: 'a', text: 'あ', romaji: 'a' }, { id: 'b', text: 'り', romaji: 'ri' }, { id: 'c', text: 'と', romaji: 'to' }, { id: 'd', text: 'が', romaji: 'ga' }] }]
        },
        {
            id: 'f4-2', japanese: 'ありがとうございます！',
            english: 'Thank you very much!',
            romaji: 'Arigatou gozaimasu!',
            literal: 'a-ri-ga-to-u go-za-i-ma-su',
            emoji: '🙏',
            parts: ['あり', '_', 'とうございます'],
            blanks: [{ position: 1, answer: 'が', choices: [{ id: 'a', text: 'が', romaji: 'ga' }, { id: 'b', text: 'あ', romaji: 'a' }, { id: 'c', text: 'り', romaji: 'ri' }, { id: 'd', text: 'て', romaji: 'te' }] }]
        },
        {
            id: 'f4-3', japanese: 'ありがとう！',
            english: 'Thank you! (casual)',
            romaji: 'Arigatou!',
            literal: 'a-ri-ga-to-u',
            emoji: '🙏',
            parts: ['ありが', '_', 'う'],
            blanks: [{ position: 1, answer: 'と', choices: [{ id: 'a', text: 'と', romaji: 'to' }, { id: 'b', text: 'が', romaji: 'ga' }, { id: 'c', text: 'あ', romaji: 'a' }, { id: 'd', text: 'り', romaji: 'ri' }] }]
        }
    ],
    5: [
        {
            id: 'f5-1', japanese: 'いいえ！',
            english: 'No!',
            romaji: 'Iie!',
            literal: 'i-i-e',
            emoji: '❌',
            parts: ['い', '_', 'え！'],
            blanks: [{ position: 1, answer: 'い', choices: [{ id: 'a', text: 'い', romaji: 'i' }, { id: 'b', text: 'え', romaji: 'e' }, { id: 'c', text: 'で', romaji: 'de' }, { id: 'd', text: 'す', romaji: 'su' }] }]
        },
        {
            id: 'f5-2', japanese: 'でも、だいじょうぶです。',
            english: 'But, it is okay.',
            romaji: 'Demo, daijoubu desu.',
            literal: 'but, okay is.',
            emoji: '😌',
            parts: ['_', '、だいじょうぶです。'],
            blanks: [{ position: 0, answer: 'でも', choices: [{ id: 'a', text: 'でも', romaji: 'demo', meaning: 'but/however' }, { id: 'b', text: 'すし', romaji: 'sushi', meaning: 'sushi' }, { id: 'c', text: 'えき', romaji: 'eki', meaning: 'station' }, { id: 'd', text: 'でんわ', romaji: 'denwa', meaning: 'phone' }] }]
        },
        {
            id: 'f5-3', japanese: 'すしがすきです。',
            english: 'I like sushi.',
            romaji: 'Sushi ga suki desu.',
            literal: 'sushi (subject) like is.',
            emoji: '🍣',
            parts: ['_', 'がすきです。'],
            blanks: [{ position: 0, answer: 'すし', choices: [{ id: 'a', text: 'すし', romaji: 'sushi', meaning: 'sushi' }, { id: 'b', text: 'いいえ', romaji: 'iie', meaning: 'no' }, { id: 'c', text: 'えき', romaji: 'eki', meaning: 'station' }, { id: 'd', text: 'でも', romaji: 'demo', meaning: 'but' }] }]
        }
    ],
    6: [
        {
            id: 'f6-1', japanese: 'ごめんなさい！',
            english: 'I am sorry!',
            romaji: 'Gomennasai!',
            literal: 'go-me-n-na-sa-i',
            emoji: '😔',
            parts: ['_', 'めんなさい！'],
            blanks: [{ position: 0, answer: 'ご', choices: [{ id: 'a', text: 'ご', romaji: 'go' }, { id: 'b', text: 'か', romaji: 'ka' }, { id: 'c', text: 'げ', romaji: 'ge' }, { id: 'd', text: 'じ', romaji: 'ji' }] }]
        },
        {
            id: 'f6-2', japanese: 'げんきですか？',
            english: 'Are you well?',
            romaji: 'Genki desu ka?',
            literal: 'well-being is question?',
            emoji: '❓',
            parts: ['_', 'ですか？'],
            blanks: [{ position: 0, answer: 'げんき', choices: [{ id: 'a', text: 'げんき', romaji: 'genki', meaning: 'well/fine' }, { id: 'b', text: 'じかん', romaji: 'jikan', meaning: 'time' }, { id: 'c', text: 'ごはん', romaji: 'gohan', meaning: 'rice/meal' }, { id: 'd', text: 'かえる', romaji: 'kaeru', meaning: 'frog/go home' }] }]
        },
        {
            id: 'f6-3', japanese: 'じかんはありますか？',
            english: 'Do you have time?',
            romaji: 'Jikan wa arimasu ka?',
            literal: 'time (topic) have question?',
            emoji: '⏰',
            parts: ['_', 'はありますか？'],
            blanks: [{ position: 0, answer: 'じかん', choices: [{ id: 'a', text: 'じかん', romaji: 'jikan', meaning: 'time' }, { id: 'b', text: 'ごはん', romaji: 'gohan', meaning: 'rice/meal' }, { id: 'c', text: 'げんき', romaji: 'genki', meaning: 'fine' }, { id: 'd', text: 'かに', romaji: 'kani', meaning: 'crab' }] }]
        }
    ],
    7: [
        {
            id: 'f7-1', japanese: 'めがねはどこですか？',
            english: 'Where are the glasses?',
            romaji: 'Megane wa doko desu ka?',
            literal: 'glasses (topic) where is?',
            emoji: '👓',
            parts: ['_', 'はどこですか？'],
            blanks: [{ position: 0, answer: 'めがね', choices: [{ id: 'a', text: 'めがね', romaji: 'megane', meaning: 'glasses' }, { id: 'b', text: 'まど', romaji: 'mado', meaning: 'window' }, { id: 'c', text: 'しごと', romaji: 'shigoto', meaning: 'work' }, { id: 'd', text: 'けむり', romaji: 'kemuri', meaning: 'smoke' }] }]
        },
        {
            id: 'f7-2', japanese: 'まどをあけてください。',
            english: 'Please open the window.',
            romaji: 'Mado o akete kudasai.',
            literal: 'window (object) open please.',
            emoji: '🪟',
            parts: ['_', 'をあけてください。'],
            blanks: [{ position: 0, answer: 'まど', choices: [{ id: 'a', text: 'まど', romaji: 'mado', meaning: 'window' }, { id: 'b', text: 'めがね', romaji: 'megane', meaning: 'glasses' }, { id: 'c', text: 'けむり', romaji: 'kemuri', meaning: 'smoke' }, { id: 'd', text: 'しつれい', romaji: 'shitsurei', meaning: 'rude' }] }]
        },
        {
            id: 'f7-3', japanese: 'しごとがあります。',
            english: 'I have work.',
            romaji: 'Shigoto ga arimasu.',
            literal: 'work (subject) have.',
            emoji: '💼',
            parts: ['_', 'があります。'],
            blanks: [{ position: 0, answer: 'しごと', choices: [{ id: 'a', text: 'しごと', romaji: 'shigoto', meaning: 'work/job' }, { id: 'b', text: 'めがね', romaji: 'megane', meaning: 'glasses' }, { id: 'c', text: 'まど', romaji: 'mado', meaning: 'window' }, { id: 'd', text: 'まあまあ', romaji: 'maamaa', meaning: 'so-so' }] }]
        }
    ],
    8: [
        {
            id: 'f8-1', japanese: 'てがみをかいてください。',
            english: 'Please write a letter.',
            romaji: 'Tegami o kaite kudasai.',
            literal: 'letter (object) write please.',
            emoji: '✉️',
            parts: ['_', 'をかいてください。'],
            blanks: [{ position: 0, answer: 'てがみ', choices: [{ id: 'a', text: 'てがみ', romaji: 'tegami', meaning: 'letter (mail)' }, { id: 'b', text: 'きもち', romaji: 'kimochi', meaning: 'feeling' }, { id: 'c', text: 'きつね', romaji: 'kitsune', meaning: 'fox' }, { id: 'd', text: 'てら', romaji: 'tera', meaning: 'temple' }] }]
        },
        {
            id: 'f8-2', japanese: 'きもちがいいです！',
            english: 'It feels great!',
            romaji: 'Kimochi ga ii desu!',
            literal: 'feeling (subject) good is!',
            emoji: '😊',
            parts: ['_', 'がいいです！'],
            blanks: [{ position: 0, answer: 'きもち', choices: [{ id: 'a', text: 'きもち', romaji: 'kimochi', meaning: 'feeling' }, { id: 'b', text: 'てがみ', romaji: 'tegami', meaning: 'letter' }, { id: 'c', text: 'だれ', romaji: 'dare', meaning: 'who' }, { id: 'd', text: 'たのしい', romaji: 'tanoshii', meaning: 'fun' }] }]
        },
        {
            id: 'f8-3', japanese: 'だいじょうぶですか？',
            english: 'Are you okay?',
            romaji: 'Daijoubu desu ka?',
            literal: 'okay is question?',
            emoji: '❓',
            parts: ['_', 'ですか？'],
            blanks: [{ position: 0, answer: 'だいじょうぶ', choices: [{ id: 'a', text: 'だいじょうぶ', romaji: 'daijoubu', meaning: 'okay/fine' }, { id: 'b', text: 'たべる', romaji: 'taberu', meaning: 'to eat' }, { id: 'c', text: 'てがみ', romaji: 'tegami', meaning: 'letter' }, { id: 'd', text: 'きもち', romaji: 'kimochi', meaning: 'feeling' }] }]
        }
    ],
    9: [
        {
            id: 'f9-1', japanese: 'つきがきれいです。',
            english: 'The moon is beautiful.',
            romaji: 'Tsuki ga kirei desu.',
            literal: 'moon (subject) beautiful is.',
            emoji: '🌙',
            parts: ['_', 'がきれいです。'],
            blanks: [{ position: 0, answer: 'つき', choices: [{ id: 'a', text: 'つき', romaji: 'tsuki', meaning: 'moon' }, { id: 'b', text: 'ほし', romaji: 'hoshi', meaning: 'star' }, { id: 'c', text: 'もち', romaji: 'mochi', meaning: 'rice cake' }, { id: 'd', text: 'ずっと', romaji: 'zutto', meaning: 'always' }] }]
        },
        {
            id: 'f9-2', japanese: 'ほんとうですか？',
            english: 'Is that true? / Really?',
            romaji: 'Hontou desu ka?',
            literal: 'truth is question?',
            emoji: '😲',
            parts: ['_', 'ですか？'],
            blanks: [{ position: 0, answer: 'ほんとう', choices: [{ id: 'a', text: 'ほんとう', romaji: 'hontou', meaning: 'truth/really' }, { id: 'b', text: 'もち', romaji: 'mochi', meaning: 'rice cake' }, { id: 'c', text: 'ほし', romaji: 'hoshi', meaning: 'star' }, { id: 'd', text: 'つき', romaji: 'tsuki', meaning: 'moon' }] }]
        },
        {
            id: 'f9-3', japanese: 'もちがすきです。',
            english: 'I like mochi (rice cake).',
            romaji: 'Mochi ga suki desu.',
            literal: 'mochi (subject) like is.',
            emoji: '🍡',
            parts: ['_', 'がすきです。'],
            blanks: [{ position: 0, answer: 'もち', choices: [{ id: 'a', text: 'もち', romaji: 'mochi', meaning: 'rice cake' }, { id: 'b', text: 'つき', romaji: 'tsuki', meaning: 'moon' }, { id: 'c', text: 'ほし', romaji: 'hoshi', meaning: 'star' }, { id: 'd', text: 'ずっと', romaji: 'zutto', meaning: 'always' }] }]
        }
    ],
    10: [
        {
            id: 'f10-1', japanese: 'くるまがあります。',
            english: 'There is a car. / I have a car.',
            romaji: 'Kuruma ga arimasu.',
            literal: 'car (subject) exists.',
            emoji: '🚗',
            parts: ['_', 'があります。'],
            blanks: [{ position: 0, answer: 'くるま', choices: [{ id: 'a', text: 'くるま', romaji: 'kuruma', meaning: 'car' }, { id: 'b', text: 'やさしい', romaji: 'yasashii', meaning: 'kind' }, { id: 'c', text: 'みんな', romaji: 'minna', meaning: 'everyone' }, { id: 'd', text: 'ゆめ', romaji: 'yume', meaning: 'dream' }] }]
        },
        {
            id: 'f10-2', japanese: 'おやすみなさい！',
            english: 'Good night!',
            romaji: 'Oyasumi nasai!',
            literal: 'rest (honorific command)!',
            emoji: '🌙',
            parts: ['_', 'なさい！'],
            blanks: [{ position: 0, answer: 'おやすみ', choices: [{ id: 'a', text: 'おやすみ', romaji: 'oyasumi', meaning: 'good night' }, { id: 'b', text: 'くるま', romaji: 'kuruma', meaning: 'car' }, { id: 'c', text: 'みんな', romaji: 'minna', meaning: 'everyone' }, { id: 'd', text: 'ゆめ', romaji: 'yume', meaning: 'dream' }] }]
        },
        {
            id: 'f10-3', japanese: 'みんながいます。',
            english: 'Everyone is here.',
            romaji: 'Minna ga imasu.',
            literal: 'everyone (subject) is here.',
            emoji: '👨‍👩‍👧‍👦',
            parts: ['_', 'がいます。'],
            blanks: [{ position: 0, answer: 'みんな', choices: [{ id: 'a', text: 'みんな', romaji: 'minna', meaning: 'everyone' }, { id: 'b', text: 'くるま', romaji: 'kuruma', meaning: 'car' }, { id: 'c', text: 'やさしい', romaji: 'yasashii', meaning: 'kind' }, { id: 'd', text: 'おやすみ', romaji: 'oyasumi', meaning: 'good night' }] }]
        }
    ],
    11: [
        {
            id: 'f11-1', japanese: 'そらがきれいです。', english: 'The sky is beautiful.',
            romaji: 'Sora ga kirei desu.',
            literal: 'sky (subject) beautiful is.',
            emoji: '🌤️',
            parts: ['_', 'がきれいです。'],
            blanks: [{ position: 0, answer: 'そら', choices: [{ id: 'a', text: 'そら', romaji: 'sora', meaning: 'sky' }, { id: 'b', text: 'るす', romaji: 'rusu', meaning: 'absence' }, { id: 'c', text: 'せなか', romaji: 'senaka', meaning: 'back' }, { id: 'd', text: 'のり', romaji: 'nori', meaning: 'seaweed' }] }]
        },
        {
            id: 'f11-2', japanese: 'せんせいはどこですか？', english: 'Where is the teacher?',
            romaji: 'Sensei wa doko desu ka?',
            literal: 'teacher (topic) where is?',
            emoji: '👩‍🏫',
            parts: ['_', 'はどこですか？'],
            blanks: [{ position: 0, answer: 'せんせい', choices: [{ id: 'a', text: 'せんせい', romaji: 'sensei', meaning: 'teacher' }, { id: 'b', text: 'そら', romaji: 'sora', meaning: 'sky' }, { id: 'c', text: 'るす', romaji: 'rusu', meaning: 'absence' }, { id: 'd', text: 'せなか', romaji: 'senaka', meaning: 'back' }] }]
        },
        {
            id: 'f11-3', japanese: 'そうですね！', english: "That's right, isn't it!",
            romaji: 'Sou desu ne!',
            literal: 'that-way is (agreement)!',
            emoji: '😄',
            parts: ['_', 'ですね！'],
            blanks: [{ position: 0, answer: 'そう', choices: [{ id: 'a', text: 'そう', romaji: 'sou', meaning: 'that way/so' }, { id: 'b', text: 'るす', romaji: 'rusu', meaning: 'absence' }, { id: 'c', text: 'せら', romaji: 'sera', meaning: '(nonsense)' }, { id: 'd', text: 'のり', romaji: 'nori', meaning: 'seaweed' }] }]
        }
    ],
    12: [
        {
            id: 'f12-1', japanese: 'へやはひろいです。', english: 'The room is spacious.',
            romaji: 'Heya wa hiroi desu.',
            literal: 'room (topic) spacious is.',
            emoji: '🛋️',
            parts: ['_', 'はひろいです。'],
            blanks: [{ position: 0, answer: 'へや', choices: [{ id: 'a', text: 'へや', romaji: 'heya', meaning: 'room' }, { id: 'b', text: 'のり', romaji: 'nori', meaning: 'seaweed' }, { id: 'c', text: 'ぬの', romaji: 'nuno', meaning: 'cloth' }, { id: 'd', text: 'ぞう', romaji: 'zou', meaning: 'elephant' }] }]
        },
        {
            id: 'f12-2', japanese: 'みずがぬるいです。', english: 'The water is lukewarm.',
            romaji: 'Mizu ga nurui desu.',
            literal: 'water (subject) lukewarm is.',
            emoji: '💧',
            parts: ['みずが', '_', 'です。'],
            blanks: [{ position: 1, answer: 'ぬるい', choices: [{ id: 'a', text: 'ぬるい', romaji: 'nurui', meaning: 'lukewarm' }, { id: 'b', text: 'へんじ', romaji: 'henji', meaning: 'reply' }, { id: 'c', text: 'のり', romaji: 'nori', meaning: 'seaweed' }, { id: 'd', text: 'ぬの', romaji: 'nuno', meaning: 'cloth' }] }]
        },
        {
            id: 'f12-3', japanese: 'どうぞよろしく！', english: 'Please treat me well!',
            romaji: 'Douzo yoroshiku!',
            literal: 'please favorably!',
            emoji: '🙇',
            parts: ['_', 'よろしく！'],
            blanks: [{ position: 0, answer: 'どうぞ', choices: [{ id: 'a', text: 'どうぞ', romaji: 'douzo', meaning: 'please go ahead' }, { id: 'b', text: 'のり', romaji: 'nori', meaning: 'seaweed' }, { id: 'c', text: 'ぞう', romaji: 'zou', meaning: 'elephant' }, { id: 'd', text: 'へや', romaji: 'heya', meaning: 'room' }] }]
        }
    ],
    13: [
        {
            id: 'f13-1', japanese: 'あのひとはだれですか？', english: 'Who is that person?',
            romaji: 'Ano hito wa dare desu ka?',
            literal: 'that person (topic) who is?',
            emoji: '👤',
            parts: ['あの', '_', 'はだれですか？'],
            blanks: [{ position: 1, answer: 'ひと', choices: [{ id: 'a', text: 'ひと', romaji: 'hito', meaning: 'person' }, { id: 'b', text: 'むし', romaji: 'mushi', meaning: 'bug' }, { id: 'c', text: 'ろく', romaji: 'roku', meaning: 'six' }, { id: 'd', text: 'ふつう', romaji: 'futsuu', meaning: 'ordinary' }] }]
        },
        {
            id: 'f13-2', japanese: 'それはむりです！', english: 'That is impossible!',
            romaji: 'Sore wa muri desu!',
            literal: 'that (topic) impossible is!',
            emoji: '🚫',
            parts: ['それは', '_', 'です！'],
            blanks: [{ position: 1, answer: 'むり', choices: [{ id: 'a', text: 'むり', romaji: 'muri', meaning: 'impossible' }, { id: 'b', text: 'ふつう', romaji: 'futsuu', meaning: 'ordinary' }, { id: 'c', text: 'ろく', romaji: 'roku', meaning: 'six' }, { id: 'd', text: 'ひかり', romaji: 'hikari', meaning: 'light' }] }]
        },
        {
            id: 'f13-3', japanese: 'ふつうです。', english: 'It is ordinary / average.',
            romaji: 'Futsuu desu.',
            literal: 'ordinary is.',
            emoji: '😐',
            parts: ['_', 'です。'],
            blanks: [{ position: 0, answer: 'ふつう', choices: [{ id: 'a', text: 'ふつう', romaji: 'futsuu', meaning: 'ordinary' }, { id: 'b', text: 'むり', romaji: 'muri', meaning: 'impossible' }, { id: 'c', text: 'ひかり', romaji: 'hikari', meaning: 'light' }, { id: 'd', text: 'ろく', romaji: 'roku', meaning: 'six' }] }]
        }

    ],
    14: [
        {
            id: 'f14-1', japanese: 'どうぞ！', english: 'Here you go! / Please go ahead!',
            romaji: 'Douzo!',
            literal: 'please (go ahead)!',
            emoji: '🤲',
            parts: ['_', '！'],
            blanks: [{ position: 0, answer: 'どうぞ', choices: [{ id: 'a', text: 'どうぞ', romaji: 'douzo', meaning: 'please / here you go' }, { id: 'b', text: 'れい', romaji: 'rei', meaning: 'zero/bow' }, { id: 'c', text: 'ねがい', romaji: 'negai', meaning: 'wish' }, { id: 'd', text: 'ぺん', romaji: 'pen', meaning: 'pen' }] }]
        },
        {
            id: 'f14-2', japanese: 'ねこがいます。', english: 'There is a cat.',
            romaji: 'Neko ga imasu.',
            literal: 'cat (subject) is here.',
            emoji: '🐱',
            parts: ['_', 'がいます。'],
            blanks: [{ position: 0, answer: 'ねこ', choices: [{ id: 'a', text: 'ねこ', romaji: 'neko', meaning: 'cat' }, { id: 'b', text: 'ぺん', romaji: 'pen', meaning: 'pen' }, { id: 'c', text: 'れい', romaji: 'rei', meaning: 'zero/bow' }, { id: 'd', text: 'どうぞ', romaji: 'douzo', meaning: 'please' }] }]
        },
        {
            id: 'f14-3', japanese: 'にほんごがぺらぺらです！', english: 'Your Japanese is fluent!',
            romaji: 'Nihongo ga pera pera desu!',
            literal: 'Japanese (subject) fluent is!',
            emoji: '🗣️',
            parts: ['にほんごが', '_', 'です！'],
            blanks: [{ position: 1, answer: 'ぺらぺら', choices: [{ id: 'a', text: 'ぺらぺら', romaji: 'perapera', meaning: 'fluent' }, { id: 'b', text: 'どうぞ', romaji: 'douzo', meaning: 'please' }, { id: 'c', text: 'ねこ', romaji: 'neko', meaning: 'cat' }, { id: 'd', text: 'れんしゅう', romaji: 'renshuu', meaning: 'practice' }] }]
        }
    ],
    15: [
        {
            id: 'f15-1', japanese: 'おなかがぺこぺこです。', english: 'I am starving.',
            romaji: 'onaka ga pekopeko desu.',
            literal: 'stomach (subject) starving is.',
            emoji: '🤤',
            parts: ['おなかが', '_', 'です。'],
            blanks: [{ position: 1, answer: 'ぺこぺこ', choices: [{ id: 'a', text: 'ぺこぺこ', romaji: 'pekopeko', meaning: 'starving' }, { id: 'b', text: 'アメリカ', romaji: 'amerika', meaning: 'America' }, { id: 'c', text: 'げんき', romaji: 'genki', meaning: 'healthy' }, { id: 'd', text: 'ねむい', romaji: 'nemui', meaning: 'sleepy' }] }]
        },
        {
            id: 'f15-2', japanese: 'アイスがすきです。', english: 'I like ice cream.',
            romaji: 'aisu ga suki desu.',
            literal: 'ice-cream (subject) like is.',
            emoji: '🍦',
            parts: ['_', 'がすきです。'],
            blanks: [{ position: 0, answer: 'アイス', choices: [{ id: 'a', text: 'アイス', romaji: 'aisu', meaning: 'ice cream' }, { id: 'b', text: 'インド', romaji: 'indo', meaning: 'India' }, { id: 'c', text: 'ケーキ', romaji: 'keeki', meaning: 'cake' }, { id: 'd', text: 'おちゃ', romaji: 'ocha', meaning: 'green tea' }] }]
        },
        {
            id: 'f15-3', japanese: 'トイレはどこですか？', english: 'Where is the toilet?',
            romaji: 'toire wa doko desu ka?',
            literal: 'toilet (topic) where is?',
            emoji: '🚻',
            parts: ['_', 'はどこですか？'],
            blanks: [{ position: 0, answer: 'トイレ', choices: [{ id: 'a', text: 'トイレ', romaji: 'toire', meaning: 'toilet' }, { id: 'b', text: 'ウイルス', romaji: 'uirusu', meaning: 'virus' }, { id: 'c', text: 'ドア', romaji: 'doa', meaning: 'door' }, { id: 'd', text: 'まど', romaji: 'mado', meaning: 'window' }] }]
        }
    ],
    16: [
        {
            id: 'f16-1', japanese: 'オレンジをください。', english: 'Please give me an orange.',
            romaji: 'orenji o kudasai.',
            literal: 'orange (object) please.',
            emoji: '🍊',
            parts: ['_', 'をください。'],
            blanks: [{ position: 0, answer: 'オレンジ', choices: [{ id: 'a', text: 'オレンジ', romaji: 'orenji', meaning: 'orange' }, { id: 'b', text: 'エレベーター', romaji: 'erebeetaa', meaning: 'elevator' }, { id: 'c', text: 'リンゴ', romaji: 'ringo', meaning: 'apple' }, { id: 'd', text: 'バナナ', romaji: 'banana', meaning: 'banana' }] }]
        },
        {
            id: 'f16-2', japanese: 'スペインのひとです。', english: 'They are a person from Spain.',
            romaji: 'supein no hito desu.',
            literal: "Spain's person is.",
            emoji: '🇪🇸',
            parts: ['_', 'のひとです。'],
            blanks: [{ position: 0, answer: 'スペイン', choices: [{ id: 'a', text: 'スペイン', romaji: 'supein', meaning: 'Spain' }, { id: 'b', text: 'オーストラリア', romaji: 'oosutoraria', meaning: 'Australia' }, { id: 'c', text: '日本', romaji: 'nihon', meaning: 'Japan' }, { id: 'd', text: 'アメリカ', romaji: 'amerika', meaning: 'America' }] }]
        },
        {
            id: 'f16-3', japanese: 'エレベーターはここ。', english: 'The elevator is here.',
            romaji: 'erebeetaa wa koko.',
            literal: 'elevator (topic) here.',
            emoji: '🛗',
            parts: ['_', 'はここ。'],
            blanks: [{ position: 0, answer: 'エレベーター', choices: [{ id: 'a', text: 'エレベーター', romaji: 'erebeetaa', meaning: 'elevator' }, { id: 'b', text: 'オレンジ', romaji: 'orenji', meaning: 'orange' }, { id: 'c', text: 'トイレ', romaji: 'toire', meaning: 'toilet' }, { id: 'd', text: '階段', romaji: 'kaidan', meaning: 'stairs' }] }]
        }
    ],
    17: [
        {
            id: 'f17-1', japanese: 'ぎんこうはどこですか？', english: 'Where is the bank?',
            romaji: 'Ginkou wa doko desu ka?', literal: 'bank (topic) where is?', emoji: '🏦',
            parts: ['_', 'はどこですか？'],
            blanks: [{ position: 0, answer: 'ぎんこう', choices: [{ id: 'a', text: 'ぎんこう', romaji: 'ginkou', meaning: 'bank' }, { id: 'b', text: 'がっこう', romaji: 'gakkou', meaning: 'school' }, { id: 'c', text: 'えき', romaji: 'eki', meaning: 'station' }, { id: 'd', text: 'かぎ', romaji: 'kagi', meaning: 'key' }] }]
        },
        {
            id: 'f17-2', japanese: 'ざっしをよみます。', english: 'I read a magazine.',
            romaji: 'Zasshi o yomimasu.', literal: 'magazine (object) read.', emoji: '📖',
            parts: ['_', 'をよみます。'],
            blanks: [{ position: 0, answer: 'ざっし', choices: [{ id: 'a', text: 'ざっし', romaji: 'zasshi', meaning: 'magazine' }, { id: 'b', text: 'ほん', romaji: 'hon', meaning: 'book' }, { id: 'c', text: 'かぜ', romaji: 'kaze', meaning: 'wind' }, { id: 'd', text: 'ひざ', romaji: 'hiza', meaning: 'knee' }] }]
        }
    ],
    18: [
        {
            id: 'f18-1', japanese: 'ばんごうをおねがいします。', english: 'Your number, please.',
            romaji: 'Bangou o onegaishimasu.', literal: 'number (object) please.', emoji: '🔢',
            parts: ['_', 'をおねがいします。'],
            blanks: [{ position: 0, answer: 'ばんごう', choices: [{ id: 'a', text: 'ばんごう', romaji: 'bangou', meaning: 'number' }, { id: 'b', text: 'ぼうし', romaji: 'boushi', meaning: 'hat' }, { id: 'c', text: 'なまえ', romaji: 'namae', meaning: 'name' }, { id: 'd', text: 'かばん', romaji: 'kaban', meaning: 'bag' }] }]
        }
    ],
    19: [
        {
            id: 'f19-1', japanese: 'きょうはいいてんきです。', english: 'Today is good weather.',
            romaji: 'Kyou wa ii tenki desu.', literal: 'today (topic) good weather is.', emoji: '☀️',
            parts: ['_', 'はいいてんきです。'],
            blanks: [{ position: 0, answer: 'きょう', choices: [{ id: 'a', text: 'きょう', romaji: 'kyou', meaning: 'today' }, { id: 'b', text: 'きゃく', romaji: 'kyaku', meaning: 'guest' }, { id: 'c', text: 'きのう', romaji: 'kinou', meaning: 'yesterday' }, { id: 'd', text: 'あした', romaji: 'ashita', meaning: 'tomorrow' }] }]
        }
    ],
    20: [
        {
            id: 'f20-1', japanese: 'しゃしんをとります。', english: 'I take a photo.',
            romaji: 'Shashin o torimasu.', literal: 'photo (object) take.', emoji: '📸',
            parts: ['_', 'をとります。'],
            blanks: [{ position: 0, answer: 'しゃしん', choices: [{ id: 'a', text: 'しゃしん', romaji: 'shashin', meaning: 'photo' }, { id: 'b', text: 'しゅくだい', romaji: 'shukudai', meaning: 'homework' }, { id: 'c', text: 'おちゃ', romaji: 'ocha', meaning: 'tea' }, { id: 'd', text: 'ちょこ', romaji: 'choko', meaning: 'chocolate' }] }]
        }
    ],
    21: [
        {
            id: 'f21-1', japanese: 'しゅくだいをします。', english: 'I do my homework.',
            romaji: 'Shukudai o shimasu.', literal: 'homework (object) do.', emoji: '✍️',
            parts: ['_', 'をします。'],
            blanks: [{ position: 0, answer: 'しゅくだい', choices: [{ id: 'a', text: 'しゅくだい', romaji: 'shukudai', meaning: 'homework' }, { id: 'b', text: 'ひゃく', romaji: 'hyaku', meaning: 'hundred' }, { id: 'c', text: 'にゅうがく', romaji: 'nyuugaku', meaning: 'admission' }, { id: 'd', text: 'べんきょう', romaji: 'benkyou', meaning: 'study' }] }]
        }
    ],
    22: [
        {
            id: 'f22-1', japanese: 'りょこうにいきます。', english: 'I go on a trip.',
            romaji: 'Ryokou ni ikimasu.', literal: 'travel to go.', emoji: '✈️',
            parts: ['_', 'にいきます。'],
            blanks: [{ position: 0, answer: 'りょこう', choices: [{ id: 'a', text: 'りょこう', romaji: 'ryokou', meaning: 'travel' }, { id: 'b', text: 'りゅう', romaji: 'ryuu', meaning: 'dragon' }, { id: 'c', text: 'みゃく', romaji: 'myaku', meaning: 'pulse' }, { id: 'd', text: 'えき', romaji: 'eki', meaning: 'station' }] }]
        }
    ],
    23: [
        {
            id: 'f23-1', japanese: 'ぎゅうにゅうをのみます。', english: 'I drink milk.',
            romaji: 'Gyuunyuu o nomimasu.', literal: 'milk (object) drink.', emoji: '🥛',
            parts: ['_', 'をのみます。'],
            blanks: [{ position: 0, answer: 'ぎゅうにゅう', choices: [{ id: 'a', text: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: 'milk' }, { id: 'b', text: 'おちゃ', romaji: 'ocha', meaning: 'tea' }, { id: 'c', text: 'みず', romaji: 'mizu', meaning: 'water' }, { id: 'd', text: 'ぎゃく', romaji: 'gyaku', meaning: 'reverse' }] }]
        }
    ],
    24: [
        {
            id: 'f24-1', japanese: 'じゅんびができました。', english: 'Preparation is done.',
            romaji: 'Junbi ga dekimashita.', literal: 'preparation (subject) ready was.', emoji: '✅',
            parts: ['_', 'ができました。'],
            blanks: [{ position: 0, answer: 'じゅんび', choices: [{ id: 'a', text: 'じゅんび', romaji: 'junbi', meaning: 'preparation' }, { id: 'b', text: 'じょおう', romaji: 'joou', meaning: 'queen' }, { id: 'c', text: 'じゃあ', romaji: 'jaa', meaning: 'well then' }, { id: 'd', text: 'ごはん', romaji: 'gohan', meaning: 'meal' }] }]
        }
    ],
    25: [
        {
            id: 'f25-1', japanese: 'ひゃくえんですか？', english: 'Is it 100 yen?',
            romaji: 'Hyaku en desu ka?', literal: 'hundred yen is?', emoji: '💰',
            parts: ['_', 'えんですか？'],
            blanks: [{ position: 0, answer: 'ひゃく', choices: [{ id: 'a', text: 'ひゃく', romaji: 'hyaku', meaning: 'hundred' }, { id: 'b', text: 'びょうき', romaji: 'byouki', meaning: 'illness' }, { id: 'c', text: 'ぴょんぴょん', romaji: 'pyonpyon', meaning: 'hopping' }, { id: 'd', text: 'はち', romaji: 'hachi', meaning: 'eight' }] }]
        }
    ],
    26: [
        {
            id: 'f26-1', japanese: 'びょうきですか？', english: 'Are you sick?',
            romaji: 'Byouki desu ka?', literal: 'illness is?', emoji: '🤒',
            parts: ['_', 'ですか？'],
            blanks: [{ position: 0, answer: 'びょうき', choices: [{ id: 'a', text: 'びょうき', romaji: 'byouki', meaning: 'illness' }, { id: 'b', text: 'げんき', romaji: 'genki', meaning: 'healthy' }, { id: 'c', text: 'しあわせ', romaji: 'shiawase', meaning: 'happy' }, { id: 'd', text: 'おなか', romaji: 'onaka', meaning: 'stomach' }] }]
        }
    ],
    27: [
        {
            id: 'f27-1', japanese: 'おめでとうございます！', english: 'Congratulations!',
            romaji: 'Omedetou gozaimasu!', literal: 'congratulations!', emoji: '🎉',
            parts: ['_', 'ございます！'],
            blanks: [{ position: 0, answer: 'おめでとう', choices: [{ id: 'a', text: 'おめでとう', romaji: 'omedetou', meaning: 'congratulations' }, { id: 'b', text: 'ありがとう', romaji: 'arigatou', meaning: 'thank you' }, { id: 'c', text: 'さようなら', romaji: 'sayounara', meaning: 'goodbye' }, { id: 'd', text: 'よろしく', romaji: 'yoroshiku', meaning: 'nice to meet you' }] }]
        }
    ]
};

// ── Helper functions for bank retrieval ──────────────────────────────────────

export const getFillBlanks = (n: number): FillBlankProblem[] => {
    // If we're looking for a lesson that might be procedural (World 2),
    // and allLessons is already populated, try to get it from there.
    if (allLessons.length >= n) {
        const lesson = allLessons[n - 1];
        if (lesson && lesson.fillBlanks && lesson.fillBlanks.length > 0) {
            return lesson.fillBlanks;
        }
    }
    const bank = fillBlankBanks[n] || fillBlankBanks[1];
    return bank.map(p => ({ ...p, id: `f${n}-${p.id.split('-')[1]}` }));
};

export const getSentences = (n: number): SentenceProblem[] => {
    if (allLessons.length >= n) {
        const lesson = allLessons[n - 1];
        if (lesson && lesson.sentences && lesson.sentences.length > 0) {
            return lesson.sentences;
        }
    }
    const bank = sentenceBanks[n] || sentenceBanks[1];
    return bank.map(p => ({ ...p, id: `${n}-${p.id}` }));
};

const sentenceBanks: Record<number, SentenceProblem[]> = {
    1: [
        {
            id: 'l1-s1',
            english: 'Hello! Good afternoon!',
            japanese: 'こんにちは！',
            emoji: '👋',
            romaji: 'Konnichiwa!',
            literal: 'ko-n-ni-chi-wa',
            words: [
                { id: 'w1', text: 'こ', meaning: 'Ko', romaji: 'ko' },
                { id: 'w2', text: 'ん', meaning: 'N', romaji: 'n' },
                { id: 'w3', text: 'に', meaning: 'Ni', romaji: 'ni' },
                { id: 'w4', text: 'ち', meaning: 'Chi', romaji: 'chi' },
                { id: 'w5', text: 'は', meaning: 'Wa (written は)', romaji: 'wa' }
            ],
            solution: ['こ', 'ん', 'に', 'ち', 'は']
        },
        {
            id: 'l1-s2',
            english: 'How are you?',
            japanese: 'おげんきですか？',
            emoji: '❓',
            romaji: 'O-genki desu ka?',
            literal: 'honorable-fine is question?',
            words: [
                { id: 'w1', text: 'おげんき', meaning: 'Fine/Healthy', romaji: 'o-genki' },
                { id: 'w2', text: 'です', meaning: 'Is', romaji: 'desu' },
                { id: 'w3', text: 'か', meaning: '? (question)', romaji: 'ka' }
            ],
            solution: ['おげんき', 'です', 'か']
        },
        {
            id: 'l1-s3',
            english: 'Yes, I am fine!',
            japanese: 'はい、げんきです！',
            emoji: '💪',
            romaji: 'Hai, genki desu!',
            literal: 'yes, fine is!',
            words: [
                { id: 'w1', text: 'はい', meaning: 'Yes', romaji: 'hai' },
                { id: 'w2', text: 'げんき', meaning: 'Fine/Healthy', romaji: 'genki' },
                { id: 'w3', text: 'です', meaning: 'Is', romaji: 'desu' }
            ],
            solution: ['はい', 'げんき', 'です']
        }
    ],
    2: [
        {
            id: 'l2-s1',
            english: 'Goodbye!',
            japanese: 'さようなら！',
            emoji: '👋',
            romaji: 'Sayounara!',
            literal: 'sa-yo-u-na-ra',
            words: [
                { id: 'w1', text: 'さ', meaning: 'Sa', romaji: 'sa' },
                { id: 'w2', text: 'よ', meaning: 'Yo', romaji: 'yo' },
                { id: 'w3', text: 'う', meaning: 'U', romaji: 'u' },
                { id: 'w4', text: 'な', meaning: 'Na', romaji: 'na' },
                { id: 'w5', text: 'ら', meaning: 'Ra', romaji: 'ra' }
            ],
            solution: ['さ', 'よ', 'う', 'な', 'ら']
        },
        {
            id: 'l2-s2',
            english: 'See you later!',
            japanese: 'またね！',
            emoji: '👋',
            romaji: 'Mata ne!',
            literal: 'again (friendly particle)!',
            words: [
                { id: 'w1', text: 'また', meaning: 'Again / See you', romaji: 'mata' },
                { id: 'w2', text: 'ね', meaning: 'Friendly particle', romaji: 'ne' }
            ],
            solution: ['また', 'ね']
        },
        {
            id: 'l2-s3',
            english: 'See you tomorrow!',
            japanese: 'またあした！',
            emoji: '📅',
            romaji: 'Mata ashita!',
            literal: 'again tomorrow!',
            words: [
                { id: 'w1', text: 'また', meaning: 'Again', romaji: 'mata' },
                { id: 'w2', text: 'あした', meaning: 'Tomorrow', romaji: 'ashita' }
            ],
            solution: ['また', 'あした']
        }
    ],
    3: [
        {
            id: 'l3-s1',
            english: 'Good morning!',
            japanese: 'おはようございます！',
            emoji: '🌅',
            romaji: 'Ohayou gozaimasu!',
            literal: 'o-ha-yo-u go-za-i-ma-su',
            words: [
                { id: 'w1', text: 'おはよう', meaning: 'Good morning', romaji: 'ohayou' },
                { id: 'w2', text: 'ございます', meaning: '(polite ending)', romaji: 'gozaimasu' }
            ],
            solution: ['おはよう', 'ございます']
        },
        {
            id: 'l3-s2',
            english: 'Good morning! (casual between friends)',
            japanese: 'おはよう！',
            emoji: '🌅',
            romaji: 'Ohayou!',
            literal: 'good-morning (casual)',
            words: [
                { id: 'w1', text: 'お', meaning: 'O (honorific)', romaji: 'o' },
                { id: 'w2', text: 'は', meaning: 'Ha', romaji: 'ha' },
                { id: 'w3', text: 'よ', meaning: 'Yo', romaji: 'yo' },
                { id: 'w4', text: 'う', meaning: 'U', romaji: 'u' }
            ],
            solution: ['お', 'は', 'よ', 'う']
        },
        {
            id: 'l3-s3',
            english: 'Good evening!',
            japanese: 'こんばんは！',
            emoji: '🌆',
            romaji: 'Konbanwa!',
            literal: 'this-evening (topic)',
            words: [
                { id: 'w1', text: 'こんばん', meaning: 'This evening', romaji: 'konban' },
                { id: 'w2', text: 'は', meaning: 'Wa (topic marker)', romaji: 'wa' }
            ],
            solution: ['こんばん', 'は']
        }
    ],
    4: [
        {
            id: 'l4-s1',
            english: 'Thank you very much!',
            japanese: 'ありがとうございます！',
            emoji: '🙏',
            romaji: 'Arigatou gozaimasu!',
            literal: 'a-ri-ga-to-u go-za-i-ma-su',
            words: [
                { id: 'w1', text: 'ありがとう', meaning: 'Thank you', romaji: 'arigatou' },
                { id: 'w2', text: 'ございます', meaning: '(polite ending)', romaji: 'gozaimasu' }
            ],
            solution: ['ありがとう', 'ございます']
        },
        {
            id: 'l4-s2',
            english: 'Thank you! (casual)',
            japanese: 'ありがとう！',
            emoji: '🙏',
            romaji: 'Arigatou!',
            literal: 'a-ri-ga-to-u (casual)',
            words: [
                { id: 'w1', text: 'あり', meaning: 'Ari', romaji: 'ari' },
                { id: 'w2', text: 'が', meaning: 'Ga', romaji: 'ga' },
                { id: 'w3', text: 'とう', meaning: 'Tou', romaji: 'tou' }
            ],
            solution: ['あり', 'が', 'とう']
        },
        {
            id: 'l4-s3',
            english: 'You are welcome! / Not at all!',
            japanese: 'どういたしまして！',
            emoji: '😊',
            romaji: 'Dou itashimashite!',
            literal: 'how have-done (humble)!',
            words: [
                { id: 'w1', text: 'どう', meaning: 'How', romaji: 'dou' },
                { id: 'w2', text: 'いたし', meaning: 'Did (humble)', romaji: 'itashi' },
                { id: 'w3', text: 'まして', meaning: '(polite ending)', romaji: 'mashite' }
            ],
            solution: ['どう', 'いたし', 'まして']
        }
    ],
    5: [
        {
            id: 'l5-s1',
            english: 'But, it is okay.',
            japanese: 'でも、だいじょうぶです。',
            emoji: '😌',
            romaji: 'Demo, daijoubu desu.',
            literal: 'but, okay is.',
            words: [
                { id: 'w1', text: 'でも', meaning: 'But / However', romaji: 'demo' },
                { id: 'w2', text: '、', meaning: 'Comma', romaji: ',' },
                { id: 'w3', text: 'だいじょうぶ', meaning: 'Okay / Fine', romaji: 'daijoubu' },
                { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }
            ],
            solution: ['でも', '、', 'だいじょうぶ', 'です']
        },
        {
            id: 'l5-s2',
            english: 'The train station is over there.',
            japanese: 'えきはあそこです。',
            emoji: '🚂',
            romaji: 'Eki wa asoko desu.',
            literal: 'station (topic) over there is.',
            words: [
                { id: 'w1', text: 'えき', meaning: 'Train station', romaji: 'eki' },
                { id: 'w2', text: 'は', meaning: 'Topic marker', romaji: 'wa' },
                { id: 'w3', text: 'あそこ', meaning: 'Over there', romaji: 'asoko' },
                { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }
            ],
            solution: ['えき', 'は', 'あそこ', 'です']
        },
        {
            id: 'l5-s3',
            english: 'I like sushi.',
            japanese: 'すしがすきです。',
            emoji: '🍣',
            romaji: 'Sushi ga suki desu.',
            literal: 'sushi (subject) like is.',
            words: [
                { id: 'w1', text: 'すし', meaning: 'Sushi', romaji: 'sushi' },
                { id: 'w2', text: 'が', meaning: 'Subject marker', romaji: 'ga' },
                { id: 'w3', text: 'すき', meaning: 'Like', romaji: 'suki' },
                { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }
            ],
            solution: ['すし', 'が', 'すき', 'です']
        }
    ],
    6: [
        {
            id: 'l6-s1', english: 'I am sorry, I made a mistake.', japanese: 'ごめんなさい。まちがえました。',
            emoji: '😔',
            romaji: 'Gomennasai. Machigaemashita.',
            literal: 'sorry. I made a mistake.',
            words: [
                { id: 'w1', text: 'ごめん', meaning: 'Sorry / Forgive', romaji: 'gomen' },
                { id: 'w2', text: 'なさい', meaning: 'Polite command', romaji: 'nasai' },
                { id: 'w3', text: '。', meaning: 'Period', romaji: '.' },
                { id: 'w4', text: 'まちがえました', meaning: 'Made a mistake', romaji: 'machigaemashita' }
            ],
            solution: ['ごめん', 'なさい', '。', 'まちがえました']
        },
        {
            id: 'l6-s2', english: 'Rice / Meal is ready.', japanese: 'ごはんができました。',
            emoji: '🍚',
            romaji: 'Gohan ga dekimashita.',
            literal: 'rice/meal (subject) ready became.',
            words: [{ id: 'w1', text: 'ごはん', meaning: 'Rice / Meal', romaji: 'gohan' }, { id: 'w2', text: 'が', meaning: 'Subject marker', romaji: 'ga' }, { id: 'w3', text: 'できました', meaning: 'Is ready / Done', romaji: 'dekimashita' }],
            solution: ['ごはん', 'が', 'できました']
        },
        {
            id: 'l6-s3', english: 'Do I have time?', japanese: 'じかんはありますか？',
            emoji: '⏰',
            romaji: 'Jikan wa arimasu ka?',
            literal: 'time (topic) have question?',
            words: [{ id: 'w1', text: 'じかん', meaning: 'Time', romaji: 'jikan' }, { id: 'w2', text: 'は', meaning: 'Topic marker', romaji: 'wa' }, { id: 'w3', text: 'あります', meaning: 'Have / Exist', romaji: 'arimasu' }, { id: 'w4', text: 'か', meaning: 'Question marker', romaji: 'ka' }],
            solution: ['じかん', 'は', 'あります', 'か']
        }
    ],
    7: [
        {
            id: 'l7-s1', english: 'Where are my glasses?', japanese: 'めがねはどこですか？',
            emoji: '👓',
            romaji: 'Megane wa doko desu ka?',
            literal: 'glasses (topic) where is?',
            words: [{ id: 'w1', text: 'めがね', meaning: 'Glasses', romaji: 'megane' }, { id: 'w2', text: 'は', meaning: 'Topic marker', romaji: 'wa' }, { id: 'w3', text: 'どこ', meaning: 'Where', romaji: 'doko' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }, { id: 'w5', text: 'か', meaning: 'Question', romaji: 'ka' }],
            solution: ['めがね', 'は', 'どこ', 'です', 'か']
        },
        {
            id: 'l7-s2', english: 'I have work today.', japanese: 'きょうしごとがあります。',
            emoji: '💼',
            romaji: 'Kyou shigoto ga arimasu.',
            literal: 'today work (subject) have.',
            words: [{ id: 'w1', text: 'きょう', meaning: 'Today', romaji: 'kyou' }, { id: 'w2', text: 'しごと', meaning: 'Work / Job', romaji: 'shigoto' }, { id: 'w3', text: 'が', meaning: 'Subject marker', romaji: 'ga' }, { id: 'w4', text: 'あります', meaning: 'Have / Exist', romaji: 'arimasu' }],
            solution: ['きょう', 'しごと', 'が', 'あります']
        },
        {
            id: 'l7-s3', english: 'Please open the window.', japanese: 'まどをあけてください。',
            emoji: '🪟',
            romaji: 'Mado o akete kudasai.',
            literal: 'window (object) open please.',
            words: [{ id: 'w1', text: 'まど', meaning: 'Window', romaji: 'mado' }, { id: 'w2', text: 'を', meaning: 'Object marker', romaji: 'o' }, { id: 'w3', text: 'あけて', meaning: 'Open', romaji: 'akete' }, { id: 'w4', text: 'ください', meaning: 'Please', romaji: 'kudasai' }],
            solution: ['まど', 'を', 'あけて', 'ください']
        }
    ],
    8: [
        {
            id: 'l8-s1', english: 'Please write the letter.', japanese: 'てがみをかいてください。',
            emoji: '✉️',
            romaji: 'Tegami o kaite kudasai.',
            literal: 'letter (object) write please.',
            words: [{ id: 'w1', text: 'てがみ', meaning: 'Letter (mail)', romaji: 'tegami' }, { id: 'w2', text: 'を', meaning: 'Object marker', romaji: 'o' }, { id: 'w3', text: 'かいて', meaning: 'Write', romaji: 'kaite' }, { id: 'w4', text: 'ください', meaning: 'Please', romaji: 'kudasai' }],
            solution: ['てがみ', 'を', 'かいて', 'ください']
        },
        {
            id: 'l8-s2', english: 'This feeling is great!', japanese: 'このきもちはいいです。',
            emoji: '😊',
            romaji: 'Kono kimochi wa ii desu.',
            literal: 'this feeling (topic) good is.',
            words: [{ id: 'w1', text: 'この', meaning: 'This', romaji: 'kono' }, { id: 'w2', text: 'きもち', meaning: 'Feeling', romaji: 'kimochi' }, { id: 'w3', text: 'は', meaning: 'Topic marker', romaji: 'wa' }, { id: 'w4', text: 'いい', meaning: 'Good', romaji: 'ii' }, { id: 'w5', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['この', 'きもち', 'は', 'いい', 'です']
        },
        {
            id: 'l8-s3', english: 'Are you okay?', japanese: 'だいじょうぶですか？',
            emoji: '❓',
            romaji: 'Daijoubu desu ka?',
            literal: 'fine is question?',
            words: [{ id: 'w1', text: 'だいじょうぶ', meaning: 'Fine/Okay', romaji: 'daijoubu' }, { id: 'w2', text: 'です', meaning: 'Is', romaji: 'desu' }, { id: 'w3', text: 'か', meaning: 'Question marker', romaji: 'ka' }],
            solution: ['だいじょうぶ', 'です', 'か']
        }
    ],
    9: [
        {
            id: 'l9-s1', english: 'The moon is beautiful tonight.', japanese: 'ぐんや、つきがきれいです。',
            emoji: '🌙',
            romaji: 'Kon ya, tsuki ga kirei desu.',
            literal: 'tonight, moon (subject) beautiful is.',
            words: [{ id: 'w1', text: 'こんや', meaning: 'Tonight', romaji: 'kon ya' }, { id: 'w2', text: '、', meaning: 'Comma', romaji: ',' }, { id: 'w3', text: 'つき', meaning: 'Moon', romaji: 'tsuki' }, { id: 'w4', text: 'が', meaning: 'Subject marker', romaji: 'ga' }, { id: 'w5', text: 'きれい', meaning: 'Beautiful', romaji: 'kirei' }, { id: 'w6', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['こんや', '、', 'つき', 'が', 'きれい', 'です']
        },
        {
            id: 'l9-s2', english: 'Is that really true?', japanese: 'ほんとうにほんとうですか？',
            emoji: '😲',
            romaji: 'Hontou ni hontou desu ka?',
            literal: 'truly truly is question?',
            words: [{ id: 'w1', text: 'ほんとうに', meaning: 'Truly / Really', romaji: 'hontou ni' }, { id: 'w2', text: 'ほんとう', meaning: 'Truth / Really', romaji: 'hontou' }, { id: 'w3', text: 'です', meaning: 'Is', romaji: 'desu' }, { id: 'w4', text: 'か', meaning: 'Question', romaji: 'ka' }],
            solution: ['ほんとうに', 'ほんとう', 'です', 'か']
        },
        {
            id: 'l9-s3', english: 'I love mochi!', japanese: 'もちがだいすきです！',
            emoji: '🍡',
            romaji: 'Mochi ga daisuki desu!',
            literal: 'mochi (subject) love is!',
            words: [{ id: 'w1', text: 'もち', meaning: 'Mochi / Rice cake', romaji: 'mochi' }, { id: 'w2', text: 'が', meaning: 'Subject marker', romaji: 'ga' }, { id: 'w3', text: 'だいすき', meaning: 'Love / Favorite', romaji: 'daisuki' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['もち', 'が', 'だいすき', 'です']
        }
    ],
    10: [
        {
            id: 'l10-s1', english: 'My car is there.', japanese: 'くるまはそこです。',
            emoji: '🚗',
            romaji: 'Kuruma wa soko desu.',
            literal: 'car (topic) there is.',
            words: [{ id: 'w1', text: 'くるま', meaning: 'Car', romaji: 'kuruma' }, { id: 'w2', text: 'は', meaning: 'Topic marker', romaji: 'wa' }, { id: 'w3', text: 'そこ', meaning: 'There', romaji: 'soko' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['くるま', 'は', 'そこ', 'です']
        },
        {
            id: 'l10-s2', english: 'Good night, everyone!', japanese: 'みんな、おやすみ！',
            emoji: '🌙',
            romaji: 'Minna, oyasumi!',
            literal: 'everyone, good night!',
            words: [{ id: 'w1', text: 'みんな', meaning: 'Everyone', romaji: 'minna' }, { id: 'w2', text: '、', meaning: 'Comma', romaji: ',' }, { id: 'w3', text: 'おやすみ', meaning: 'Good night', romaji: 'oyasumi' }],
            solution: ['みんな', '、', 'おやすみ']
        },
        {
            id: 'l10-s3', english: 'I had a nice dream last time.', japanese: 'いいゆめをみました。',
            emoji: '💭',
            romaji: 'Ii yume o mimashita.',
            literal: 'good dream (object) saw.',
            words: [{ id: 'w1', text: 'いい', meaning: 'Good / Nice', romaji: 'ii' }, { id: 'w2', text: 'ゆめ', meaning: 'Dream', romaji: 'yume' }, { id: 'w3', text: 'を', meaning: 'Object marker', romaji: 'o' }, { id: 'w4', text: 'みました', meaning: 'Saw', romaji: 'mimashita' }],
            solution: ['いい', 'ゆめ', 'を', 'みました']
        }
    ],
    11: [
        {
            id: 'l11-s1', english: 'The sky is so beautiful!', japanese: 'そらがきれいです。',
            emoji: '🌤️',
            romaji: 'Sora ga kirei desu.',
            literal: 'sky (subject) beautiful is.',
            words: [{ id: 'w1', text: 'そら', meaning: 'Sky', romaji: 'sora' }, { id: 'w2', text: 'が', meaning: 'Subject marker', romaji: 'ga' }, { id: 'w3', text: 'きれい', meaning: 'Beautiful', romaji: 'kirei' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['そら', 'が', 'きれい', 'です']
        },
        {
            id: 'l11-s2', english: 'Where is the teacher?', japanese: 'せんせいはどこですか？',
            emoji: '👩‍🏫',
            romaji: 'Sensei wa doko desu ka?',
            literal: 'teacher (topic) where is?',
            words: [{ id: 'w1', text: 'せんせい', meaning: 'Teacher', romaji: 'sensei' }, { id: 'w2', text: 'は', meaning: 'Topic marker', romaji: 'wa' }, { id: 'w3', text: 'どこ', meaning: 'Where', romaji: 'doko' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }, { id: 'w5', text: 'か', meaning: 'Question', romaji: 'ka' }],
            solution: ['せんせい', 'は', 'どこ', 'です', 'か']
        },
        {
            id: 'l11-s3', english: "That's right, isn't it!", japanese: 'そうですね！',
            emoji: '😄',
            romaji: 'Sou desu ne!',
            literal: 'that way is (agreement)!',
            words: [{ id: 'w1', text: 'そう', meaning: 'That way / So', romaji: 'sou' }, { id: 'w2', text: 'です', meaning: 'Is', romaji: 'desu' }, { id: 'w3', text: 'ね', meaning: 'Agreement particle', romaji: 'ne' }],
            solution: ['そう', 'です', 'ね']
        }
    ],
    12: [
        {
            id: 'l12-s1', english: 'The room is spacious.', japanese: 'へやはひろいです。',
            emoji: '🛋️',
            romaji: 'Heya wa hiroi desu.',
            literal: 'room (topic) spacious is.',
            words: [{ id: 'w1', text: 'へや', meaning: 'Room', romaji: 'heya' }, { id: 'w2', text: 'は', meaning: 'Topic marker', romaji: 'wa' }, { id: 'w3', text: 'ひろい', meaning: 'Spacious / Wide', romaji: 'hiroi' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['へや', 'は', 'ひろい', 'です']
        },
        {
            id: 'l12-s2', english: 'The water is lukewarm.', japanese: 'みずがぬるいです。',
            emoji: '💧',
            romaji: 'Mizu ga nurui desu.',
            literal: 'water (subject) lukewarm is.',
            words: [{ id: 'w1', text: 'みず', meaning: 'Water', romaji: 'mizu' }, { id: 'w2', text: 'が', meaning: 'Subject', romaji: 'ga' }, { id: 'w3', text: 'ぬるい', meaning: 'Lukewarm', romaji: 'nurui' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['みず', 'が', 'ぬるい', 'です']
        },
        {
            id: 'l12-s3', english: 'Please treat me well!', japanese: 'どうぞよろしく！',
            emoji: '🙇',
            romaji: 'Douzo yoroshiku!',
            literal: 'please favorably!',
            words: [{ id: 'w1', text: 'どうぞ', meaning: 'Please / Here you go', romaji: 'douzo' }, { id: 'w2', text: 'よろしく', meaning: 'Favorably', romaji: 'yoroshiku' }],
            solution: ['どうぞ', 'よろしく']
        }
    ],
    13: [
        {
            id: 'l13-s1', english: 'Who is that person?', japanese: 'あのひとはだれですか？',
            emoji: '👤',
            romaji: 'Ano hito wa dare desu ka?',
            literal: 'that person (topic) who is?',
            words: [{ id: 'w1', text: 'あの', meaning: 'That', romaji: 'ano' }, { id: 'w2', text: 'ひと', meaning: 'Person', romaji: 'hito' }, { id: 'w3', text: 'は', meaning: 'Topic marker', romaji: 'wa' }, { id: 'w4', text: 'だれ', meaning: 'Who', romaji: 'dare' }, { id: 'w5', text: 'ですか', meaning: 'Is it?', romaji: 'desu ka' }],
            solution: ['あの', 'ひと', 'は', 'だれ', 'ですか']
        },
        {
            id: 'l13-s2', english: 'That is impossible for me.', japanese: 'わたしにはむりです。',
            emoji: '🚫',
            romaji: 'Watashi ni wa muri desu.',
            literal: 'me for (topic) impossible is.',
            words: [{ id: 'w1', text: 'わたし', meaning: 'Me', romaji: 'watashi' }, { id: 'w2', text: 'には', meaning: 'For (topic)', romaji: 'ni wa' }, { id: 'w3', text: 'むり', meaning: 'Impossible', romaji: 'muri' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['わたし', 'には', 'むり', 'です']
        },
        {
            id: 'l13-s3', english: 'It is ordinary. (an average person)', japanese: 'ふつうのひとです。',
            emoji: '😐',
            romaji: 'Futsuu no hito desu.',
            literal: 'ordinary (possessive) person is.',
            words: [{ id: 'w1', text: 'ふつう', meaning: 'Ordinary', romaji: 'futsuu' }, { id: 'w2', text: 'の', meaning: 'Possessive', romaji: 'no' }, { id: 'w3', text: 'ひと', meaning: 'Person', romaji: 'hito' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['ふつう', 'の', 'ひと', 'です']
        }
    ],
    14: [
        {
            id: 'l14-s1', english: 'Here you go! Please go ahead.', japanese: 'どうぞ！',
            emoji: '🤲',
            romaji: 'Douzo!',
            literal: 'please go ahead!',
            words: [{ id: 'w1', text: 'どうぞ', meaning: 'Here you go / Please', romaji: 'douzo' }],
            solution: ['どうぞ']
        },
        {
            id: 'l14-s2', english: 'There is a cat in the garden.', japanese: 'にわにねこがいます。',
            emoji: '🐱',
            romaji: 'Niwa ni neko ga imasu.',
            literal: 'garden in cat (subject) is here.',
            words: [{ id: 'w1', text: 'にわ', meaning: 'Garden', romaji: 'niwa' }, { id: 'w2', text: 'に', meaning: 'In / At', romaji: 'ni' }, { id: 'w3', text: 'ねこ', meaning: 'Cat', romaji: 'neko' }, { id: 'w4', text: 'が', meaning: 'Subject marker', romaji: 'ga' }, { id: 'w5', text: 'います', meaning: 'Is here', romaji: 'imasu' }],
            solution: ['にわ', 'に', 'ねこ', 'が', 'います']
        },
        {
            id: 'l14-s3', english: 'I can speak Japanese fluently!', japanese: 'にほんごがぺらぺらです！',
            emoji: '🗣️',
            romaji: 'Nihongo ga perapera desu!',
            literal: 'Japanese (subject) fluent is!',
            words: [{ id: 'w1', text: 'にほんご', meaning: 'Japanese (language)', romaji: 'nihongo' }, { id: 'w2', text: 'が', meaning: 'Subject marker', romaji: 'ga' }, { id: 'w3', text: 'ぺらぺら', meaning: 'Fluent', romaji: 'perapera' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['にほんご', 'が', 'ぺらぺら', 'です']
        }
    ],
    15: [
        {
            id: 'l15-s1', english: 'I am starving.', japanese: 'おなかがぺこぺこです。',
            emoji: '🤤',
            romaji: 'onaka ga pekopeko desu.',
            literal: 'stomach (subject) starving is.',
            words: [{ id: 'w1', text: 'おなか', meaning: 'Stomach', romaji: 'onaka' }, { id: 'w2', text: 'が', meaning: 'Subject', romaji: 'ga' }, { id: 'w3', text: 'ぺこぺこ', meaning: 'Starving', romaji: 'pekopeko' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['おなか', 'が', 'ぺこぺこ', 'です']
        },
        {
            id: 'l15-s2', english: 'I like ice cream.', japanese: 'アイスがすきです。',
            emoji: '🍦',
            romaji: 'aisu ga suki desu.',
            literal: 'ice-cream (subject) like is.',
            words: [{ id: 'w1', text: 'アイス', meaning: 'Ice cream', romaji: 'aisu' }, { id: 'w2', text: 'が', meaning: 'Subject', romaji: 'ga' }, { id: 'w3', text: 'すき', meaning: 'Like', romaji: 'suki' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['アイス', 'が', 'すき', 'です']
        },
        {
            id: 'l15-s3', english: 'Where is the toilet?', japanese: 'トイレはどこですか？',
            emoji: '🚻',
            romaji: 'toire wa doko desu ka?',
            literal: 'toilet (topic) where is?',
            words: [{ id: 'w1', text: 'トイレ', meaning: 'Toilet', romaji: 'toire' }, { id: 'w2', text: 'は', meaning: 'Topic marker', romaji: 'wa' }, { id: 'w3', text: 'どこ', meaning: 'Where', romaji: 'doko' }, { id: 'w4', text: 'ですか', meaning: 'Is it?', romaji: 'desu ka' }],
            solution: ['トイレ', 'は', 'どこ', 'ですか']
        }
    ],
    16: [
        {
            id: 'l16-s1', english: 'Please give me an orange.', japanese: 'オレンジをください。',
            emoji: '🍊',
            romaji: 'orenji o kudasai.',
            literal: 'orange (object) please.',
            words: [{ id: 'w1', text: 'オレンジ', meaning: 'Orange', romaji: 'orenji' }, { id: 'w2', text: 'を', meaning: 'Object marker', romaji: 'o' }, { id: 'w3', text: 'ください', meaning: 'Please', romaji: 'kudasai' }],
            solution: ['オレンジ', 'を', 'ください']
        },
        {
            id: 'l16-s2', english: 'They are a person from Spain.', japanese: 'スペインのひとです。',
            emoji: '🇪🇸',
            romaji: 'supein no hito desu.',
            literal: "Spain's person is.",
            words: [{ id: 'w1', text: 'スペイン', meaning: 'Spain', romaji: 'supein' }, { id: 'w2', text: 'の', meaning: 'Possessive', romaji: 'no' }, { id: 'w3', text: 'ひと', meaning: 'Person', romaji: 'hito' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['スペイン', 'の', 'ひと', 'です']
        },
        {
            id: 'l16-s3', english: 'The elevator is here.', japanese: 'エレベーターはここです。',
            emoji: '🛗',
            romaji: 'erebeetaa wa koko desu.',
            literal: 'elevator (topic) here is.',
            words: [{ id: 'w1', text: 'エレベーター', meaning: 'Elevator', romaji: 'erebeetaa' }, { id: 'w2', text: 'は', 'meaning': 'Topic marker', romaji: 'wa' }, { id: 'w3', text: 'ここ', meaning: 'Here', romaji: 'koko' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['エレベーター', 'は', 'ここ', 'です']
        }
    ],
    17: [
        {
            id: 'l17-s1', english: 'Where is the bank?', japanese: 'ぎんこうはどこですか？',
            emoji: '🏦', romaji: 'Ginkou wa doko desu ka?', literal: 'bank (topic) where is?',
            words: [{ id: 'w1', text: 'ぎんこう', meaning: 'Bank', romaji: 'ginkou' }, { id: 'w2', text: 'は', meaning: 'Topic', romaji: 'wa' }, { id: 'w3', text: 'どこ', meaning: 'Where', romaji: 'doko' }, { id: 'w4', text: 'ですか', meaning: 'Is?', romaji: 'desu ka' }],
            solution: ['ぎんこう', 'は', 'どこ', 'ですか']
        }
    ],
    18: [
        {
            id: 'l18-s1', english: 'The number is five.', japanese: 'ばんごうはごです。',
            emoji: '🔢', romaji: 'Bangou wa go desu.', literal: 'number (topic) five is.',
            words: [{ id: 'w1', text: 'ばんごう', meaning: 'Number', romaji: 'bangou' }, { id: 'w2', text: 'は', meaning: 'Topic', romaji: 'wa' }, { id: 'w3', text: 'ご', meaning: 'Five', romaji: 'go' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['ばんごう', 'は', 'ご', 'です']
        }
    ],
    19: [
        {
            id: 'l19-s1', english: 'Today is fine.', japanese: 'きょうはげんきです。',
            emoji: '☀️', romaji: 'Kyou wa genki desu.', literal: 'today (topic) well is.',
            words: [{ id: 'w1', text: 'きょう', meaning: 'Today', romaji: 'kyou' }, { id: 'w2', text: 'は', meaning: 'Topic', romaji: 'wa' }, { id: 'w3', text: 'げんき', meaning: 'Well', romaji: 'genki' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['きょう', 'は', 'げんき', 'です']
        }
    ],
    20: [
        {
            id: 'l20-s1', english: 'Please take a photo.', japanese: 'しゃしんをごりかいください。',
            emoji: '📸', romaji: 'Shashin o go-rikai kudasai.', literal: 'photo (object) understanding please.',
            words: [{ id: 'w1', text: 'しゃしん', meaning: 'Photo', romaji: 'shashin' }, { id: 'w2', text: 'を', meaning: 'Object', romaji: 'o' }, { id: 'w3', text: 'ください', meaning: 'Please', romaji: 'kudasai' }],
            solution: ['しゃしん', 'を', 'ください']
        }
    ],
    21: [
        {
            id: 'l21-s1', english: 'This is a hundred.', japanese: 'これはひゃくです。',
            emoji: '💰', romaji: 'Kore wa hyaku desu.', literal: 'this (topic) 100 is.',
            words: [{ id: 'w1', text: 'これ', meaning: 'This', romaji: 'kore' }, { id: 'w2', text: 'は', meaning: 'Topic', romaji: 'wa' }, { id: 'w3', text: 'ひゃく', meaning: '100', romaji: 'hyaku' }, { id: 'w4', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['これ', 'は', 'ひゃく', 'です']
        }
    ],
    22: [
        {
            id: 'l22-s1', english: 'I go on a trip.', japanese: 'りょこうにいきます。',
            emoji: '✈️', romaji: 'Ryokou ni ikimasu.', literal: 'travel to go.',
            words: [{ id: 'w1', text: 'りょこう', meaning: 'Travel', romaji: 'ryokou' }, { id: 'w2', text: 'に', meaning: 'To', romaji: 'ni' }, { id: 'w3', text: 'いきます', meaning: 'Go', romaji: 'ikimasu' }],
            solution: ['りょこう', 'に', 'いきます']
        }
    ],
    23: [
        {
            id: 'l23-s1', english: 'Drinking milk.', japanese: 'ぎゅうにゅうをのみます。',
            emoji: '🥛', romaji: 'Gyuunyuu o nomimasu.', literal: 'milk (object) drink.',
            words: [{ id: 'w1', text: 'ぎゅうにゅう', meaning: 'Milk', romaji: 'gyuunyuu' }, { id: 'w2', text: 'を', meaning: 'Object', romaji: 'o' }, { id: 'w3', text: 'のみます', meaning: 'Drink', romaji: 'nomimasu' }],
            solution: ['ぎゅうにゅう', 'を', 'のみます']
        }
    ],
    24: [
        {
            id: 'l24-s1', english: 'Well then, let us go.', japanese: 'じゃあ、いきましょう。',
            emoji: '🚶', romaji: 'Jaa, ikimashou.', literal: 'well, let-us-go.',
            words: [{ id: 'w1', text: 'じゃあ', meaning: 'Well', romaji: 'jaa' }, { id: 'w2', text: 'いきましょう', meaning: 'Let us go', romaji: 'ikimashou' }],
            solution: ['じゃあ', 'いきましょう']
        }
    ],
    25: [
        {
            id: 'l25-s1', english: 'I am sick.', japanese: 'びょうきです。',
            emoji: '🤒', romaji: 'Byouki desu.', literal: 'illness is.',
            words: [{ id: 'w1', text: 'びょうき', meaning: 'Illness', romaji: 'byouki' }, { id: 'w2', text: 'です', meaning: 'Is', romaji: 'desu' }],
            solution: ['びょうき', 'です']
        }
    ],
    26: [
        {
            id: 'l26-s1', english: 'Congratulations!', japanese: 'おめでとうございます！',
            emoji: '🎉', romaji: 'Omedetou gozaimasu!', literal: 'congratulations!',
            words: [{ id: 'w1', text: 'おめでとう', meaning: 'Congratulations', romaji: 'omedetou' }, { id: 'w2', text: 'ございます', meaning: '(polite)', romaji: 'gozaimasu' }],
            solution: ['おめでとう', 'ございます']
        }
    ],
    27: [
        {
            id: 'l27-s1', english: 'See you again!', japanese: 'またあいましょう！',
            emoji: '👋', romaji: 'Mata aimashou!', literal: 'again let-us-meet!',
            words: [{ id: 'w1', text: 'また', meaning: 'Again', romaji: 'mata' }, { id: 'w2', text: 'あいましょう', meaning: 'Let us meet', romaji: 'aimashou' }],
            solution: ['また', 'あいましょう']
        }
    ]
};



// ── Grammar slide ─────────────────────────────────────────────────────────────

const grammarSlide: GrammarSlide = {
    type: 'grammar',
    title: '⚔️ Your First Weapon: こんにちは',
    content: 'You have unlocked your first Japanese spell! こんにちは (konnichiwa) means Hello. Now that you know the 4 sounds that build it, you can READ it — not from memory, but from understanding each sound.',
    structure: [
        { label: 'こ → ko', color: 'bg-indigo-100 text-indigo-700', example: '+ ん' },
        { label: 'に → ni', color: 'bg-rose-100 text-rose-700', example: '+ ち' },
        { label: 'ち → chi', color: 'bg-amber-100 text-amber-700', example: '+ は' },
        { label: 'は → wa!', color: 'bg-green-100 text-green-700', example: '= こんにちは' },
    ],
    exampleSentence: { japanese: 'こんにちは、おげんきですか？', romaji: 'Konnichiwa, o-genki desu ka?', english: 'Hello, how are you?' },
};

// ── Conversation scenarios ────────────────────────────────────────────────────

const conversationScenarios: ConversationScenario[] = [
    {
        id: 'conv-cafe', npcName: 'Yuki ☕', npcAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
        background: 'from-amber-50 to-orange-50', intro: 'You walk into a cosy café. Yuki, the barista, greets you.',
        exchanges: [
            {
                npcQuery: { id: 'q1', speaker: 'npc', text: 'いらっしゃいませ！ご注文は？', english: 'Welcome! What would you like?' },
                options: [{ id: 'o1', text: 'コーヒーをください。', english: 'Coffee please.', isCorrect: true, feedback: '✅ Yuki starts brewing!' },
                { id: 'o2', text: 'さようなら。', english: 'Goodbye.', isCorrect: false, feedback: '❌ That means goodbye!' },
                { id: 'o3', text: 'わかりません。', english: "I don't understand.", isCorrect: false, feedback: '❌ Try to order!' }]
            },
            {
                npcQuery: { id: 'q2', speaker: 'npc', text: 'お砂糖はいりますか？', english: 'Do you need sugar?' },
                options: [{ id: 'o1', text: 'はい、お願いします。', english: 'Yes please.', isCorrect: true, feedback: '✅ Perfect!' },
                { id: 'o2', text: 'いいえ、けっこうです。', english: "No thanks.", isCorrect: true, feedback: '✅ Also correct!' },
                { id: 'o3', text: 'あなたは誰？', english: 'Who are you?', isCorrect: false, feedback: '❌ Rude! Yuki frowns.' }]
            },
        ],
    },
    {
        id: 'conv-park', npcName: 'Ken 🌸', npcAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ken',
        background: 'from-green-50 to-emerald-50', intro: 'Relaxing in a park. Ken sits beside you.',
        exchanges: [
            {
                npcQuery: { id: 'q1', speaker: 'npc', text: 'こんにちは！天気がいいですね。', english: "Hello! Nice weather, isn't it?" },
                options: [{ id: 'o1', text: 'そうですね。とても気持ちいいです。', english: 'Yes, feels great.', isCorrect: true, feedback: '✅ Ken nods happily.' },
                { id: 'o2', text: 'うるさい！', english: 'Shut up!', isCorrect: false, feedback: '❌ Very rude! Ken moves away.' },
                { id: 'o3', text: 'わかりません。', english: "I don't understand.", isCorrect: false, feedback: '❌ You understood fine!' }]
            },
            {
                npcQuery: { id: 'q2', speaker: 'npc', text: '好きな食べ物は何ですか？', english: 'What is your favourite food?' },
                options: [{ id: 'o1', text: 'ラーメンが好きです。', english: 'I like ramen.', isCorrect: true, feedback: "✅ Ken's eyes light up!" },
                { id: 'o2', text: 'すしが大好きです！', english: 'I love sushi!', isCorrect: true, feedback: '✅ Ken suggests a place.' },
                { id: 'o3', text: 'ごめんなさい。', english: "I'm sorry.", isCorrect: false, feedback: '❌ Answer the question!' }]
            },
        ],
    },
    {
        id: 'conv-store', npcName: 'Aiko 🛍️', npcAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiko',
        background: 'from-pink-50 to-rose-50', intro: 'At a clothing store. Shopkeeper Aiko approaches.',
        exchanges: [
            {
                npcQuery: { id: 'q1', speaker: 'npc', text: 'なにかお探しですか？', english: 'Are you looking for something?' },
                options: [{ id: 'o1', text: 'はい、シャツを探しています。', english: "Yes, I'm looking for a shirt.", isCorrect: true, feedback: '✅ Aiko leads you over.' },
                { id: 'o2', text: 'いいえ、見ているだけです。', english: 'Just browsing.', isCorrect: true, feedback: '✅ Aiko smiles: "Take your time!"' },
                { id: 'o3', text: 'どこですか？', english: 'Where is it?', isCorrect: false, feedback: "❌ She hasn't pointed you anywhere yet!" }]
            },
            {
                npcQuery: { id: 'q2', speaker: 'npc', text: 'サイズはおいくつですか？', english: 'What is your size?' },
                options: [{ id: 'o1', text: 'Mサイズをください。', english: 'Medium please.', isCorrect: true, feedback: '✅ Aiko finds the right size.' },
                { id: 'o2', text: 'わかりません。', english: "I'm not sure.", isCorrect: false, feedback: '❌ Try being specific!' },
                { id: 'o3', text: '高いですね！', english: "That's expensive!", isCorrect: false, feedback: "❌ She hasn't told you the price yet." }]
            },
        ],
    },
    {
        id: 'conv-restaurant', npcName: 'Taro 🍜', npcAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taro',
        background: 'from-yellow-50 to-amber-50', intro: 'At a ramen restaurant. Waiter Taro comes over.',
        exchanges: [
            {
                npcQuery: { id: 'q1', speaker: 'npc', text: 'いらっしゃいませ！おひとりですか？', english: 'Welcome! Dining alone?' },
                options: [{ id: 'o1', text: 'はい、ひとりです。', english: 'Yes, just one.', isCorrect: true, feedback: '✅ Taro seats you at the counter.' },
                { id: 'o2', text: 'いいえ、ふたりです。', english: 'No, two of us.', isCorrect: true, feedback: '✅ Taro sets a table for two.' },
                { id: 'o3', text: 'トイレはどこですか。', english: 'Where is the toilet?', isCorrect: false, feedback: '❌ Let him seat you first!' }]
            },
            {
                npcQuery: { id: 'q2', speaker: 'npc', text: 'ご注文はお決まりですか？', english: 'Have you decided?' },
                options: [{ id: 'o1', text: '醤油ラーメンをください。', english: 'Soy sauce ramen please.', isCorrect: true, feedback: '✅ "Excellent choice!"' },
                { id: 'o2', text: 'もう少し待ってください。', english: 'Please wait a bit more.', isCorrect: true, feedback: '✅ "Of course, take your time."' },
                { id: 'o3', text: 'おいしい！', english: 'Delicious!', isCorrect: false, feedback: "❌ You haven't eaten yet!" }]
            },
        ],
    },
    {
        id: 'conv-train', npcName: 'Hana 🚃', npcAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HanaTrain',
        background: 'from-blue-50 to-indigo-50', intro: "You're lost at a train station. Hana notices.",
        exchanges: [
            {
                npcQuery: { id: 'q1', speaker: 'npc', text: 'どこかお探しですか？', english: 'Are you looking for somewhere?' },
                options: [{ id: 'o1', text: 'はい、新宿駅はどこですか？', english: 'Yes, where is Shinjuku?', isCorrect: true, feedback: '✅ Hana points to the right platform.' },
                { id: 'o2', text: 'いいえ、だいじょうぶです。', english: "No, I'm fine.", isCorrect: false, feedback: '❌ But you look clearly lost!' },
                { id: 'o3', text: 'おはようございます。', english: 'Good morning.', isCorrect: false, feedback: '❌ Answer her question!' }]
            },
            {
                npcQuery: { id: 'q2', speaker: 'npc', text: '新宿は3番線です。乗り換えが必要です。', english: 'Shinjuku is line 3. You need to transfer.' },
                options: [{ id: 'o1', text: 'ありがとうございます！', english: 'Thank you!', isCorrect: true, feedback: '✅ Hana smiles and waves.' },
                { id: 'o2', text: 'もう一度言ってください。', english: 'Please say it again.', isCorrect: true, feedback: '✅ Hana repeats slowly.' },
                { id: 'o3', text: 'うそをつくな！', english: "Don't lie!", isCorrect: false, feedback: '❌ So rude! Hana walks away.' }]
            },
        ],
    },
];

// ── Build all 20 lessons ──────────────────────────────────────────────────────

// ── Build all 20 lessons ──────────────────────────────────────────────────────

const kanaLessonTitles = [
    'こんにちは (Hello!)',
    'さようなら (Goodbye)',
    'おはようございます (Good Morning)',
    'ありがとう (Thank You)',
    'おげんきですか？(How Are You?)',
    'はじめまして (Nice to Meet You)',
    'よろしくおねがいします (Please Be Good to Me)',
    'ごめんなさい (I Am Sorry)',
    'いただきます (Bon Appétit)',
    'はいとiie (Yes and No)',
    'おやすみなさい (Good Night)',
    'またね (See You Again)',
    'どうぞ (Please / Go Ahead)',
    'すみません (Excuse Me)',
    'だいじょうぶ (I Am Fine)',
    'こちらこそ (The Pleasure Is Mine)',
    'Voiced Vibrations I (G, Z)',
    'Voiced Vibrations II (D, B)',
    'P-line Power (P)',
    'Combo Mastery I (K, S)',
    'Combo Mastery II (C, N)',
    'Combo Mastery III (H, M)',
    'Combo Mastery IV (R, G)',
    'Combo Mastery V (J, D)',
    'Combo Mastery VI (B, P)',
    'Advanced Mix I',
    'Advanced Mix II'
];

const itemsPerLesson = 4;
const kanaLessons: LessonData[] = Array.from({ length: 27 }, (_, i) => {
    const n = i + 1;
    const chars: (Kana | GrammarSlide | KanjiLogicSlide)[] = hiragana.slice(i * itemsPerLesson, i * itemsPerLesson + itemsPerLesson);

    if (n === 1) {
        // ── 6 Adventure intro slides prepended to Lesson 1 ────────────────────────
        chars.unshift(

            // SLIDE 1 — The World Is In Danger (adventure hook)
            {
                type: 'grammar',
                title: '🌑 Darkness Spreads Across the Land...',
                content: 'Ancient Yokai — demons born from forgotten words — have shattered the seals that protected the realm of Nihon. The only force that can stop them is language itself. Words are spells. Phrases are shields. And YOU are the last hope. Your journey begins here, with a single greeting.',
                structure: [
                    { label: '👹 Yokai', color: 'bg-red-100 text-red-700', example: 'Feed on silence' },
                    { label: '🗡️ Words', color: 'bg-indigo-100 text-indigo-700', example: 'Are your weapons' },
                    { label: '⚡ You', color: 'bg-amber-100 text-amber-700', example: 'Are the hero' },
                ],
                exampleSentence: { japanese: 'ようかいをたおせ！', romaji: 'Youkai o taose!', english: 'Defeat the Yokai!' },
            },

            // SLIDE 2 — The Trap of Memorization
            {
                type: 'grammar',
                title: '⚠️ The Trap Most Learners Fall Into',
                content: 'Most people try to memorize Japanese by brute force — repeating words until they stick. But memory fades. The real skill is UNDERSTANDING. When you understand WHY a word sounds the way it does, you never forget it. Every character has logic. Every sentence has a pattern. We will teach you both.',
                structure: [
                    { label: '❌ Memorize', color: 'bg-red-100 text-red-700', example: 'Fades quickly' },
                    { label: '✅ Understand', color: 'bg-green-100 text-green-700', example: 'Stays forever' },
                    { label: '🧠 Logic', color: 'bg-indigo-100 text-indigo-700', example: 'Is the shortcut' },
                ],
                exampleSentence: { japanese: 'りかいすることがたいせつです。', romaji: 'Rikai suru koto ga taisetsu desu.', english: 'Understanding is what matters.' },
            },

            // SLIDE 3 — How Hiragana Works
            {
                type: 'grammar',
                title: '🔤 Hiragana: The Sound Alphabet',
                content: 'Hiragana is a phonetic alphabet — each character is one pure sound. There is no silent letter, no spelling trap. Once you know the sound of こ (ko), に (ni), ち (chi), and は (wa), you can read こんにちは out loud immediately. That is the power of understanding the system.',
                structure: [
                    { label: 'こ = ko', color: 'bg-indigo-100 text-indigo-700', example: 'Always "ko"' },
                    { label: 'に = ni', color: 'bg-rose-100 text-rose-700', example: 'Always "ni"' },
                    { label: 'ち = chi', color: 'bg-amber-100 text-amber-700', example: 'Always "chi"' },
                    { label: 'は = wa*', color: 'bg-green-100 text-green-700', example: '*in greetings' },
                ],
                exampleSentence: { japanese: 'こ＋に＋ち＋は ＝ こんにちは！', romaji: 'ko + ni + chi + wa = Konnichiwa!', english: 'Sounds build words' },
            },

            // SLIDE 4 — Kanji: Radicals (visual logic)
            {
                type: 'kanji-logic',
                title: '🧩 Kanji Secret: Parts Have Meaning',
                kanji: '休',
                meaning: 'Rest',
                description: 'Kanji look complex but they follow a logic. They are built from small picture-parts called radicals. When a PERSON (亻) leans against a TREE (木), what do they do? They REST. Once you see this, you never forget 休.',
                parts: [
                    { kanji: '亻', meaning: 'Person', color: 'bg-blue-100 text-blue-700' },
                    { kanji: '木', meaning: 'Tree', color: 'bg-green-100 text-green-700' }
                ],
                reading: { on: 'kyuu', kun: 'yasu(mu)' },
                example: { word: '休み', meaning: 'Day off / Rest', romaji: 'yasumi' }
            },


            // SLIDE 6 — Sentence Structure logic
            {
                type: 'grammar',
                title: '🗺️ The Map of a Japanese Sentence',
                content: 'Japanese sentences follow a different order than English: Subject → Object → Verb. The VERB always comes last — like the final strike of a sword. Once you know this pattern, ANY sentence makes sense. This is not a rule to memorize. It is a pattern to FEEL.',
                structure: [
                    { label: '私は (I)', color: 'bg-blue-100 text-blue-700', example: 'Subject first' },
                    { label: 'すしを (sushi)', color: 'bg-rose-100 text-rose-700', example: 'Object middle' },
                    { label: '食べます (eat)', color: 'bg-green-100 text-green-700', example: 'Verb LAST ⚔️' },
                ],
                exampleSentence: { japanese: '私はすしを食べます。', romaji: 'Watashi wa sushi o tabemasu.', english: 'I eat sushi. (But in Japanese: I • sushi • eat!)' },
            },

            // SLIDE 7 — The Quest HUD
            {
                type: 'grammar',
                title: '🎮 Your Quest HUD — Know Your Power',
                content: 'At the top of every screen you will see three icons. These are NOT decorations — they track your power and your life force as you journey across Nihon. Master what they mean and you will always know exactly where you stand in the quest.',
                structure: [
                    { label: '⚡ Streak', color: 'bg-amber-100 text-amber-700', example: '10-in-a-row → 50 ⭐' },
                    { label: '⭐ Blue Stars', color: 'bg-blue-100 text-blue-700', example: 'XP → future Mana' },
                    { label: '❤️ Hearts', color: 'bg-red-100 text-red-700', example: 'Lives — 0 = reset!' },
                ],
                exampleSentence: { japanese: 'がんばれ！', romaji: 'Ganbare!', english: 'Do your best! (Keep going!)' },
            },

            // SLIDE 8 — The JSpellbook
            {
                type: 'grammar',
                title: '📖 Your JSpellbook — The Grimoire of Knowledge',
                content: 'As you journey across Nihon, the language you learn will be permanently inscribed into your JSpellbook. You can open it at any time from the top menu (next to your Streak). Use it to review Characters, Words, and Phrases before stepping into battle.',
                structure: [
                    { label: 'あ Characters', color: 'bg-sakura-pink/20 text-sakura-pink', example: 'The building blocks' },
                    { label: '単語 Words', color: 'bg-emerald-100 text-emerald-700', example: 'Your magical vocabulary' },
                    { label: '文 Phrases', color: 'bg-amber-100 text-amber-700', example: 'Sentences woven together' },
                ],
                exampleSentence: { japanese: '本を読みます。', romaji: 'Hon o yomimasu.', english: 'I read the book. (Your spellbook!)' },
            }

        );
        // Append the weapon-unlock slide AFTER the character cards
        chars.push(grammarSlide);
    } else if (n === 2) {
        // ── Celebratory Unlock Slide for Lesson 2 ────────────────────────
        chars.unshift({
            type: 'grammar',
            title: '🏆 Your First Spells Unlocked!',
            content: 'Congratulations! By completing Lesson 1, you have unlocked your first 5 characters in the JSpellbook: こ, ん, に, ち, and は. These are now permanently yours. There are many more to find in the "Hiragana Discovery" inside your JSpellbook. Let\'s get started!',
            structure: [
                { label: 'こ (ko)', color: 'bg-indigo-100 text-deep-indigo', example: 'Unlocked!' },
                { label: 'ん (n)', color: 'bg-indigo-100 text-deep-indigo', example: 'Unlocked!' },
                { label: 'に (ni)', color: 'bg-indigo-100 text-deep-indigo', example: 'Unlocked!' },
                { label: 'ち (chi)', color: 'bg-indigo-100 text-deep-indigo', example: 'Unlocked!' },
                { label: 'は (wa)', color: 'bg-indigo-100 text-deep-indigo', example: 'Unlocked!' },
            ],
            exampleSentence: { japanese: 'これらはあなたのまほうです。', romaji: 'Korera wa anata no mahou desu.', english: 'These are your magic spells.' },
        });
    }

    return {
        id: `lesson-${n}`,
        worldId: 'beginner-1',
        title: `Lesson ${n}: ${kanaLessonTitles[i] || 'Hiragana Basics'}`,
        type: 'kana' as const,
        xp: n === 1 ? 150 : 100,
        content: chars,
        fillBlanks: getFillBlanks(n),
        sentences: getSentences(n),
    };
});

const katakanaLessons: LessonData[] = Array.from({ length: 27 }, (_, i) => {
    const n = i + 28; // Start after Hiragana (1-27)
    const chars: (Kana | GrammarSlide | KanjiLogicSlide)[] = katakana.slice(i * itemsPerLesson, i * itemsPerLesson + itemsPerLesson);

    return {
        id: `lesson-${n}`,
        worldId: 'beginner-1',
        title: `Lesson ${n}: Katakana ${i + 1}`,
        type: 'kana' as const,
        xp: 100,
        content: chars,
        fillBlanks: getFillBlanks(n % 10 + 1), // Review review
        sentences: getSentences(n % 10 + 1),
    };
});

const checkpointLesson: LessonData = {
    id: 'lesson-checkpoint', worldId: 'beginner-1', title: 'Lesson 55: Final Checkpoint Quiz',
    type: 'checkpoint', xp: 500, content: [],
    fillBlanks: getFillBlanks(1),
    sentences: getSentences(1),
};

const conversationLessons: LessonData[] = Array.from({ length: 8 }, (_, i) => {
    const scenario = conversationScenarios[i % conversationScenarios.length];
    const n = 18 + i; // Offset after Kana(16) + Checkpoint(17)
    return {
        id: `lesson-${n}`,
        worldId: 'beginner-1',
        title: `Lesson ${n}: ${scenario.npcName} Conversation`,
        type: 'conversation' as const,
        xp: 150,
        content: scenario,
        fillBlanks: getFillBlanks(n % 10 + 1),
        sentences: getSentences(n % 10 + 1),
    };
});

const bossArcLessons: LessonData[] = [
    {
        id: 'lesson-36', worldId: 'beginner-1', title: 'Lesson 36: Romaji Theft!', type: 'kana', xp: 200,
        hideRomaji: true,
        content: [
            {
                type: 'grammar',
                title: '🚨 ALERT!',
                content: 'The Boss Level Yokai has stolen the Romaji from your JSpellbook! To defeat him, you must prove you can read the spirit language (Hiragana) without any crutches. Good luck!',
                structure: [],
                exampleSentence: { japanese: 'がんばってください！', romaji: '', english: 'Please do your best!' }
            }
        ],
        fillBlanks: getFillBlanks(1), // Mixed review
        sentences: getSentences(1)
    },
    {
        id: 'lesson-37', worldId: 'beginner-1', title: 'Lesson 37: Pure Hiragana', type: 'kana', xp: 200,
        hideRomaji: true,
        content: [],
        fillBlanks: getFillBlanks(2),
        sentences: getSentences(2)
    },
    {
        id: 'lesson-38', worldId: 'beginner-1', title: 'Lesson 38: Breaking Point', type: 'kana', xp: 200,
        hideRomaji: true,
        content: [],
        fillBlanks: getFillBlanks(3),
        sentences: getSentences(3)
    },
    {
        id: 'lesson-39', worldId: 'beginner-1', title: 'Lesson 39: The Yokai Guard', type: 'conversation', xp: 300,
        hideRomaji: true,
        hideEnglish: true,
        content: {
            id: 'guard-oni',
            npcName: 'Yokai Guard',
            npcAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OniGuard&eyebrows=angry&mouth=serious',
            background: 'from-slate-800 to-indigo-900',
            intro: '🚫 HALT! You cannot pass without proving your Worth. Answer my questions in the spirit tongue!',
            exchanges: [
                {
                    npcQuery: { id: 'q1', speaker: 'npc', text: 'おなまえは？', english: 'What is your name?' },
                    options: [
                        { id: 'o1', text: 'わたしはたびびとです。', english: 'I am a traveler.', isCorrect: true, feedback: '...Hmph. Proceed.' },
                        { id: 'o2', text: 'だれですか？', english: 'Who are you?', isCorrect: false, feedback: 'Incorrect! Prove your respect.' }
                    ]
                },
                {
                    npcQuery: { id: 'q2', speaker: 'npc', text: 'げんきですか？', english: 'Are you well?' },
                    options: [
                        { id: 'o1', text: 'はい、げんきです。', english: 'Yes, I am well.', isCorrect: true, feedback: 'Good. Weak spirits fail here.' },
                        { id: 'o2', text: 'いいえ。', english: 'No.', isCorrect: false, feedback: 'Then you are not ready.' }
                    ]
                },
                {
                    npcQuery: { id: 'q3', speaker: 'npc', text: 'にほんごがわかりますか？', english: 'Do you understand Japanese?' },
                    options: [
                        { id: 'o1', text: 'はい、わかります。', english: 'Yes, I understand.', isCorrect: true, feedback: 'We shall see.' },
                        { id: 'o2', text: 'わかりません。', english: "I don't understand.", isCorrect: false, feedback: "Then begone!" }
                    ]
                },
                {
                    npcQuery: { id: 'q4', speaker: 'npc', text: 'これはなんですか？', english: 'What is this? (Points to your sword)' },
                    options: [
                        { id: 'o1', text: 'これはわたしのけんです。', english: 'This is my sword.', isCorrect: true, feedback: 'A sharp answer.' },
                        { id: 'o2', text: 'わかりません。', english: "I don't know.", isCorrect: false, feedback: 'Ignorant!' }
                    ]
                },
                {
                    npcQuery: { id: 'q5', speaker: 'npc', text: 'どこへいきますか？', english: 'Where are you going?' },
                    options: [
                        { id: 'o1', text: 'おしろへいきます。', english: 'I am going to the castle.', isCorrect: true, feedback: 'Very well. Enter.' },
                        { id: 'o2', text: 'あそこ。', english: 'Over there.', isCorrect: false, feedback: 'Vague!' }
                    ]
                }
            ]
        },
        sentences: [
            {
                id: 's39-1', english: 'I am a traveler.', japanese: 'わたしはたびびとです。', romaji: '',
                words: [{ id: 'w1', text: 'わたし', romaji: '' }, { id: 'w2', text: 'は', romaji: '' }, { id: 'w3', text: 'たびびと', romaji: '' }, { id: 'w4', text: 'です', romaji: '' }],
                solution: ['わたし', 'は', 'たびびと', 'です']
            },
            {
                id: 's39-2', english: 'Yes, I am well.', japanese: 'はい、げんきです。', romaji: '',
                words: [{ id: 'w1', text: 'はい', romaji: '' }, { id: 'w2', text: 'げんき', romaji: '' }, { id: 'w3', text: 'です', romaji: '' }],
                solution: ['はい', 'げんき', 'です']
            },
            {
                id: 's39-3', english: 'Yes, I understand.', japanese: 'はい、わかります。', romaji: '',
                words: [{ id: 'w1', text: 'はい', romaji: '' }, { id: 'w2', text: 'わかります', romaji: '' }],
                solution: ['はい', 'わかります']
            },
            {
                id: 's39-4', english: 'This is my sword.', japanese: 'これはわたしのけんです。', romaji: '',
                words: [{ id: 'w1', text: 'これ', romaji: '' }, { id: 'w2', text: 'は', romaji: '' }, { id: 'w3', text: 'わたし', romaji: '' }, { id: 'w4', text: 'の', romaji: '' }, { id: 'w5', text: 'けん', romaji: '' }, { id: 'w6', text: 'です', romaji: '' }],
                solution: ['これ', 'は', 'わたし', 'の', 'けん', 'です']
            },
            {
                id: 's39-5', english: 'I am going to the castle.', japanese: 'おしろへいきます。', romaji: '',
                words: [{ id: 'w1', text: 'おしろ', romaji: '' }, { id: 'w2', text: 'へ', romaji: '' }, { id: 'w3', text: 'いきます', romaji: '' }],
                solution: ['おしろ', 'へ', 'いきます']
            }
        ]
    },
    {
        id: 'lesson-40', worldId: 'beginner-1', title: 'Lesson 40: 💀 Final Boss Gauntlet', type: 'checkpoint', xp: 1000,
        hideRomaji: true,
        hideEnglish: true,
        content: [],
        fillBlanks: Array.from({ length: 10 }, (_, i) => getFillBlanks((i % 5) + 1)[0]),
        sentences: Array.from({ length: 10 }, (_, i) => getSentences((i % 5) + 1)[0])
    }
];
// Exported for use in buildProceduralCurriculum to avoid lint warnings
export const _conversationLessons = conversationLessons;
export const _bossArcLessons = bossArcLessons;

// ── Verb Lesson Generation ────────────────────────────────────────────────────


const verbIntroSlides: GrammarSlide[] = [
    {
        type: 'grammar',
        title: '⚡ The Way of the Verb: Core Actions',
        content: 'You have entered the realm of Actions. In Japanese, the verb is the power source at the end of every sentence. Unlike English, the verb often tells you the tense, politeness, and even the speaker\'s attitude — all in one word.',
        structure: [
            { label: 'Dictionary form', color: 'bg-slate-100 text-slate-700', example: '食べる (taberu)' },
            { label: 'Polite present ✅', color: 'bg-green-100 text-green-700', example: '食べます (tabemasu)' },
            { label: 'Polite past ✅', color: 'bg-blue-100 text-blue-700', example: '食べました (tabemashita)' },
        ],
        exampleSentence: { japanese: 'まいにちたべます。', romaji: 'Mainichi tabemasu.', english: 'I eat every day.' },
    },
    {
        type: 'grammar',
        title: '⚔️ The 4 Conjugation Stances',
        content: 'Every verb in this world comes in 4 polite forms. These are your combat stances. Know them and you can express any action in any tense — positive or negative, past or present. Together they form a complete martial art of expression.',
        structure: [
            { label: 'Present +', color: 'bg-green-100 text-green-700', example: '食べます → I eat' },
            { label: 'Past +', color: 'bg-blue-100 text-blue-700', example: '食べました → I ate' },
            { label: 'Present −', color: 'bg-rose-100 text-rose-700', example: '食べません → I do not eat' },
            { label: 'Past −', color: 'bg-slate-100 text-slate-700', example: '食べませんでした → I did not eat' },
        ],
        exampleSentence: { japanese: 'きのうはたべませんでした。', romaji: 'Kinou wa tabemasen deshita.', english: 'I did not eat yesterday.' },
    },
    {
        type: 'grammar',
        title: '🗺️ New Paths Await',
        content: 'Each lesson in the Verb World unlocks one essential action from the ancient Yokai Codex. These are the most commonly spoken action-words in all of Nihon. Master them and you will be able to hold your ground in any encounter — whether in a market, a dojo, or a moonlit battleground.',
        structure: [
            { label: '🍣 食べる', color: 'bg-amber-100 text-amber-700', example: 'eat' },
            { label: '👁️ 見る', color: 'bg-blue-100 text-blue-700', example: 'see / watch' },
            { label: '🏃 行く', color: 'bg-green-100 text-green-700', example: 'go' },
            { label: '🗣️ 話す', color: 'bg-indigo-100 text-indigo-700', example: 'speak' },
        ],
        exampleSentence: { japanese: 'にほんごをはなします！', romaji: 'Nihongo o hanashimasu!', english: 'I speak Japanese!' },
    },
];

// ── Te-form conversion helpers ───────────────────────────────────────────────
// te-form: simple rules for masu-stem verbs
const teFormMap: Record<string, string> = {
    '食べます': '食べて', '飲みます': '飲んで', '行きます': '行って', '来ます': '来て',
    '帰ります': '帰って', '話します': '話して', '読みます': '読んで', '書きます': '書いて',
    '聞きます': '聞いて', '見ます': '見て', '寝ます': '寝て', '起きます': '起きて',
    '会います': '会って', '買います': '買って', '遊びます': '遊んで', '休みます': '休んで',
    '待ちます': '待って', '持ちます': '持って', 'します': 'して',
};
const taiFormMap: Record<string, string> = {
    '食べます': '食べたい', '飲みます': '飲みたい', '行きます': '行きたい', '来ます': '来たい',
    '帰ります': '帰りたい', '話します': '話したい', '読みます': '読みたい', '書きます': '書きたい',
    '聞きます': '聞きたい', '見ます': '見たい', '寝ます': '寝たい', '起きます': '起きたい',
    '会います': '会いたい', '買います': '買いたい', '遊びます': '遊びたい', '休みます': '休みたい',
    '待ちます': '待ちたい', '持ちます': '持ちたい', 'します': 'したい',
};
const kotozukiMap: Record<string, string> = {
    '食べます': '食べることができます', '飲みます': '飲むことができます', '行きます': '行くことができます',
    '来ます': '来ることができます', '帰ります': '帰ることができます', '話します': '話すことができます',
    '読みます': '読むことができます', '書きます': '書くことができます', '聞きます': '聞くことができます',
    '見ます': '見ることができます', '寝ます': '寝ることができます', '起きます': '起きることができます',
    '会います': '会うことができます', '買います': '買うことができます', '遊びます': '遊ぶことができます',
    '休みます': '休むことができます', '待ちます': '待つことができます', '持ちます': '持つことができます',
    'します': 'することができます',
};

// ── Verb Mastery Helper ───────────────────────────────────────────────────

const createMasteryVerbSlides = (verb: VerbMasteryData): GrammarSlide[] => [
    {
        type: 'grammar',
        title: `Action: ${verb.verb} (${verb.meaning})`,
        content: `Today's quest is to master the essential action: ${verb.verb}. This is one of the most powerful words in the Japanese language!`,
        structure: [
            { label: 'Dictionary Form', color: 'bg-slate-100 text-slate-700', example: `${verb.verb} (${verb.reading})` },
            { label: 'Core Meaning', color: 'bg-blue-100 text-blue-700', example: verb.meaning },
        ],
        exampleSentence: {
            japanese: `${verb.verb}。`,
            romaji: verb.reading,
            english: `(I) ${verb.meaning}.`
        }
    },
    {
        type: 'grammar',
        title: '✨ Contextual Variations',
        content: `In anime, games, and daily talk, "${verb.verb}" changes its form to match the time and politeness of the moment:`,
        structure: [
            { label: 'Past (+)', color: 'bg-emerald-100 text-emerald-700', example: `${verb.conjugations.past.jp} — ${verb.conjugations.past.meaning}` },
            { label: 'Negative (−)', color: 'bg-rose-100 text-rose-700', example: `${verb.conjugations.negative.jp} — ${verb.conjugations.negative.meaning}` },
            { label: 'Te-Form 🔗', color: 'bg-amber-100 text-amber-700', example: `${verb.conjugations.teForm.jp} — ${verb.conjugations.teForm.meaning}` },
            { label: 'Polite Past', color: 'bg-blue-100 text-blue-700', example: `${verb.conjugations.politePast.jp} — ${verb.conjugations.politePast.meaning}` },
            { label: 'Polite Present', color: 'bg-indigo-100 text-indigo-700', example: `${verb.conjugations.politePresent.jp} — ${verb.conjugations.politePresent.meaning}` },
        ],
        exampleSentence: {
            japanese: `${verb.conjugations.politePast.jp}。`,
            romaji: verb.conjugations.politePast.romaji,
            english: verb.conjugations.politePast.meaning
        }
    },
    {
        type: 'grammar',
        title: `🎭 Variations in Subtlety: ${verb.subtlety.label}`,
        content: `The way you say "not ${verb.meaning}" can change how you sound to others. Choose your stance carefully:`,
        structure: [
            { label: 'Standard', color: 'bg-slate-100 text-slate-700', example: `${verb.subtlety.standard.jp} — ${verb.subtlety.standard.note}` },
            { label: 'Casual', color: 'bg-amber-100 text-amber-700', example: `${verb.subtlety.casual.jp} — ${verb.subtlety.casual.note}` },
            ...(verb.subtlety.colloquial ? [{ label: 'Colloquial', color: 'bg-rose-100 text-rose-700', example: `${verb.subtlety.colloquial.jp} — ${verb.subtlety.colloquial.note}` }] : []),
        ],
        exampleSentence: {
            japanese: verb.subtlety.casual.jp,
            romaji: verb.subtlety.casual.romaji,
            english: verb.subtlety.casual.note
        }
    },
    {
        type: 'grammar',
        title: `🌪️ Nuance: ${verb.context.label}`,
        content: `Certain forms of "${verb.verb}" carry specific social weight or emotions:`,
        structure: [
            { label: 'Special Form', color: 'bg-purple-100 text-purple-700', example: `${verb.context.form.jp} (${verb.context.form.romaji})` },
            { label: 'The Feeling', color: 'bg-pink-100 text-pink-700', example: verb.context.form.note },
        ],
        exampleSentence: {
            japanese: verb.context.form.jp,
            romaji: verb.context.form.romaji,
            english: verb.context.form.note
        }
    }
];

const generateVerbLessons = (): LessonData[] => {
    const lessons: LessonData[] = [];

    // ── Group 1: Verb Mastery (The 25 requested lessons) ───────────────────────
    masteryVerbs.forEach((verb, i) => {
        const n = i;
        const introSlides: (GrammarSlide | Kana)[] = (i === 0) ? verbIntroSlides : [];

        lessons.push({
            id: `verb-mastery-${n}`,
            worldId: 'verbs-1',
            title: `Mastery: ${verb.verb} (${verb.meaning})`,
            type: 'kana' as const,
            xp: 250,
            content: [...introSlides, ...createMasteryVerbSlides(verb)],
            fillBlanks: [
                {
                    id: `fmv-${n}-1`,
                    japanese: verb.conjugations.politePresent.jp,
                    english: verb.conjugations.politePresent.meaning,
                    romaji: verb.conjugations.politePresent.romaji,
                    parts: ['_'],
                    blanks: [{
                        position: 0, answer: verb.conjugations.politePresent.jp, choices: [
                            { id: 'a', text: verb.conjugations.politePresent.jp, romaji: '' },
                            { id: 'b', text: verb.conjugations.negative.jp, romaji: '' },
                            { id: 'c', text: verb.subtlety.casual.jp, romaji: '' },
                            { id: 'd', text: verb.conjugations.past.jp, romaji: '' }
                        ]
                    }]
                },
                {
                    id: `fmv-${n}-2`,
                    japanese: verb.subtlety.casual.jp,
                    english: verb.subtlety.casual.note,
                    romaji: verb.subtlety.casual.romaji,
                    parts: ['_'],
                    blanks: [{
                        position: 0, answer: verb.subtlety.casual.jp, choices: [
                            { id: 'a', text: verb.subtlety.casual.jp, romaji: '' },
                            { id: 'b', text: verb.subtlety.standard.jp, romaji: '' },
                            { id: 'c', text: verb.conjugations.politePresent.jp, romaji: '' },
                            { id: 'd', text: verb.conjugations.past.jp, romaji: '' }
                        ]
                    }]
                },
                {
                    id: `fmv-${n}-3`,
                    japanese: verb.context.form.jp,
                    english: verb.context.form.note,
                    romaji: verb.context.form.romaji,
                    parts: ['_'],
                    blanks: [{
                        position: 0, answer: verb.context.form.jp, choices: [
                            { id: 'a', text: verb.context.form.jp, romaji: '' },
                            { id: 'b', text: verb.verb, romaji: '' },
                            { id: 'c', text: verb.conjugations.teForm.jp, romaji: '' },
                            { id: 'd', text: verb.conjugations.politePast.jp, romaji: '' }
                        ]
                    }]
                }
            ],
            sentences: [
                {
                    id: `smv-${n}-1`,
                    english: verb.conjugations.past.meaning,
                    japanese: verb.conjugations.past.jp,
                    romaji: verb.conjugations.past.romaji,
                    words: [
                        { id: 'w1', text: verb.conjugations.past.jp, meaning: verb.conjugations.past.meaning, romaji: verb.conjugations.past.romaji }
                    ],
                    solution: [verb.conjugations.past.jp]
                }
            ]
        });
    });

    // ── Group 2: Te-form etc (remaining lessons) ─────────────────────────────
    const coreVerbs: VerbInfo[] = masteryVerbs.slice(0, 10).map((v, i) => ({
        id: `cv${i + 1}`,
        dictionary: v.verb,
        masu: v.conjugations.politePresent.jp,
        mashita: v.conjugations.politePast.jp,
        masen: v.conjugations.negative.jp.replace('ない', 'ません'),
        masendeshita: v.conjugations.negative.jp.replace('ない', 'ませんでした'),
        meaning: v.meaning,
        romaji: v.reading
    }));

    const teFormIntro: GrammarSlide = {
        type: 'grammar',
        title: '🔗 The Te-Form: Chaining Actions',
        content: 'The て-form (te-form) is used to connect two actions together — like "eat AND drink" or "go AND see." It is one of the most versatile forms in Japanese. Once you master it, you can chain sentences, ask for permission, and describe ongoing actions.',
        structure: [
            { label: '食べます → 食べて', color: 'bg-amber-100 text-amber-700', example: 'eat → eating/and eat' },
            { label: '行きます → 行って', color: 'bg-green-100 text-green-700', example: 'go → going/and go' },
            { label: '飲んで水を飲む', color: 'bg-blue-100 text-blue-700', example: 'drink and drink water' },
        ],
        exampleSentence: { japanese: '食べて、寝ます。', romaji: 'Tabete, nemasu.', english: 'I eat and then sleep.' },
    };

    const verbsForTeForm = coreVerbs;
    verbsForTeForm.forEach((verb, i) => {
        const te = teFormMap[verb.masu] || (verb.masu.slice(0, -2) + 'て');
        const nextVerb = verbsForTeForm[(i + 1) % verbsForTeForm.length];
        const teNext = teFormMap[nextVerb.masu] || '';
        lessons.push({
            id: `verb-te-${i}`,
            worldId: 'verbs-1',
            title: `Te-Form: ${verb.dictionary} → ${te}`,
            type: 'kana' as const,
            xp: 220,
            content: i === 0 ? [teFormIntro] : [],
            fillBlanks: [
                {
                    id: `fvte-${i}-1`,
                    japanese: `${te}、${nextVerb.masu}。`,
                    english: `I ${verb.meaning} and then ${nextVerb.meaning}.`,
                    romaji: `${te}, ${nextVerb.masu}.`,
                    parts: ['_', '、', nextVerb.masu + '。'],
                    blanks: [{
                        position: 0, answer: te, choices: [
                            { id: 'a', text: te, romaji: '' },
                            { id: 'b', text: verb.masu, romaji: '' },
                            { id: 'c', text: (verb as any).masen || '', romaji: '' },
                            { id: 'd', text: teNext, romaji: '' }
                        ]
                    }]
                },
                {
                    id: `fvte-${i}-2`,
                    japanese: `${te}もいいですか？`,
                    english: `May I ${verb.meaning}?`,
                    romaji: `${te} mo ii desu ka?`,
                    parts: ['_', 'もいいですか？'],
                    blanks: [{
                        position: 0, answer: te, choices: [
                            { id: 'a', text: te, romaji: '' },
                            { id: 'b', text: verb.mashita, romaji: '' },
                            { id: 'c', text: verb.masu, romaji: '' },
                            { id: 'd', text: (verb as any).masen || '', romaji: '' }
                        ]
                    }]
                }
            ],
            sentences: [{
                id: `svte-${i}-1`,
                english: `I ${verb.meaning} and then ${nextVerb.meaning}.`,
                japanese: `${te}、${nextVerb.masu}。`,
                romaji: `${te}, ${nextVerb.masu}.`,
                words: [
                    { id: 'w1', text: te, meaning: verb.meaning, romaji: '' },
                    { id: 'w2', text: '、', meaning: ',', romaji: '' },
                    { id: 'w3', text: nextVerb.masu, meaning: nextVerb.meaning, romaji: '' }
                ],
                solution: [te, '、', nextVerb.masu]
            }]
        });
    });

    // ── Group 3: Tai-form (want to) ──────────────────────────────────────────
    const verbsForTai = coreVerbs;
    const taiIntro: GrammarSlide = {
        type: 'grammar',
        title: '💭 ～たい: Expressing Wants',
        content: 'To say you WANT to do something in Japanese, you use the たい (tai) form. Replace the final ます (masu) of any verb with たい (tai). It turns any action into a desire — a wish declared to the world.',
        structure: [
            { label: '食べます → 食べたい', color: 'bg-rose-100 text-rose-700', example: 'I want to eat' },
            { label: '行きます → 行きたい', color: 'bg-green-100 text-green-700', example: 'I want to go' },
            { label: '見ます → 見たい', color: 'bg-blue-100 text-blue-700', example: 'I want to see' },
        ],
        exampleSentence: { japanese: 'すしを食べたいです。', romaji: 'Sushi o tabetai desu.', english: 'I want to eat sushi.' },
    };
    verbsForTai.forEach((verb, i) => {
        const tai = taiFormMap[verb.masu] || (verb.masu.slice(0, -2) + 'たい');
        const otherVerb = verbsForTai[(i + 2) % verbsForTai.length];
        const otherTai = taiFormMap[otherVerb.masu] || '';
        lessons.push({
            id: `verb-tai-${i}`,
            worldId: 'verbs-1',
            title: `Want To: ${verb.dictionary} → ${tai}`,
            type: 'kana' as const,
            xp: 230,
            content: i === 0 ? [taiIntro] : [],
            fillBlanks: [
                {
                    id: `fvtai-${i}-1`,
                    japanese: `${tai}です。`,
                    english: `I want to ${verb.meaning}.`,
                    romaji: `${tai} desu.`,
                    parts: ['_', 'です。'],
                    blanks: [{
                        position: 0, answer: tai, choices: [
                            { id: 'a', text: tai, romaji: '' },
                            { id: 'b', text: verb.masu, romaji: '' },
                            { id: 'c', text: otherTai, romaji: '' },
                            { id: 'd', text: verb.mashita, romaji: '' }
                        ]
                    }]
                },
                {
                    id: `fvtai-${i}-2`,
                    japanese: `日本語を${taiFormMap['話します'] || '話したい'}です。`,
                    english: `I want to speak Japanese.`,
                    romaji: `Nihongo o hanashitai desu.`,
                    parts: ['日本語を', '_', 'です。'],
                    blanks: [{
                        position: 1, answer: taiFormMap['話します'] || '話したい', choices: [
                            { id: 'a', text: taiFormMap['話します'] || '話したい', romaji: 'hanashitai' },
                            { id: 'b', text: tai, romaji: '' },
                            { id: 'c', text: '話します', romaji: 'hanashimasu' },
                            { id: 'd', text: '話しません', romaji: 'hanashimasen' }
                        ]
                    }]
                }
            ],
            sentences: [{
                id: `svtai-${i}-1`,
                english: `I want to ${verb.meaning}.`,
                japanese: `${tai}です。`,
                romaji: `${tai} desu.`,
                words: [
                    { id: 'w1', text: tai, meaning: `want to ${verb.meaning}`, romaji: '' },
                    { id: 'w2', text: 'です', meaning: 'is/am', romaji: 'desu' }
                ],
                solution: [tai, 'です']
            }]
        });
    });

    // ── Group 4: Nagara (while doing) ────────────────────────────────────────
    const nagaraVerbs = coreVerbs;
    const nagaraIntro: GrammarSlide = {
        type: 'grammar',
        title: '🎶 ～ながら: Doing Two Things at Once',
        content: 'The ながら (nagara) pattern means "while doing" — like multitasking in Japanese. Attach ながら to the ます-stem to describe doing one action at the same time as another. The main action (the more important one) comes last.',
        structure: [
            { label: '食べながら話す', color: 'bg-amber-100 text-amber-700', example: 'Talk while eating' },
            { label: '聞きながら書く', color: 'bg-indigo-100 text-indigo-700', example: 'Write while listening' },
            { label: '歩きながら見る', color: 'bg-green-100 text-green-700', example: 'Look while walking' },
        ],
        exampleSentence: { japanese: '音楽を聞きながら、勉強します。', romaji: 'Ongaku o kikinagara, benkyou shimasu.', english: 'I study while listening to music.' },
    };
    nagaraVerbs.forEach((verb, i) => {
        const stem = verb.masu.slice(0, -2); // remove ます
        const nagara = `${stem}ながら`;
        const nextVerb = nagaraVerbs[(i + 1) % nagaraVerbs.length];
        const nextStem = nextVerb.masu.slice(0, -2);
        const nextNagara = `${nextStem}ながら`;
        lessons.push({
            id: `verb-nagara-${i}`,
            worldId: 'verbs-1',
            title: `ながら: ${verb.dictionary} while doing`,
            type: 'kana' as const,
            xp: 240,
            content: i === 0 ? [nagaraIntro] : [],
            fillBlanks: [
                {
                    id: `fvng-${i}-1`,
                    japanese: `${nagara}、${nextVerb.masu}。`,
                    english: `I ${nextVerb.meaning} while ${verb.meaning}ing.`,
                    romaji: `${nagara}, ${nextVerb.masu}.`,
                    parts: ['_', '、', nextVerb.masu + '。'],
                    blanks: [{
                        position: 0, answer: nagara, choices: [
                            { id: 'a', text: nagara, romaji: '' },
                            { id: 'b', text: nextNagara, romaji: '' },
                            { id: 'c', text: verb.masu, romaji: '' },
                            { id: 'd', text: verb.mashita, romaji: '' }
                        ]
                    }]
                },
                {
                    id: `fvng-${i}-2`,
                    japanese: `音楽を聞きながら、${verb.masu}。`,
                    english: `I ${verb.meaning} while listening to music.`,
                    romaji: `ongaku o kikinagara, ${verb.masu}.`,
                    parts: ['音楽を聞きながら、', '_'],
                    blanks: [{
                        position: 1, answer: verb.masu, choices: [
                            { id: 'a', text: verb.masu, romaji: '' },
                            { id: 'b', text: verb.mashita, romaji: '' },
                            { id: 'c', text: verb.masen, romaji: '' },
                            { id: 'd', text: nextVerb.masu, romaji: '' }
                        ]
                    }]
                }
            ],
            sentences: [{
                id: `svng-${i}-1`,
                english: `I ${nextVerb.meaning} while ${verb.meaning}ing.`,
                japanese: `${nagara}、${nextVerb.masu}。`,
                romaji: `${nagara}, ${nextVerb.masu}.`,
                words: [
                    { id: 'w1', text: nagara, meaning: `while ${verb.meaning}ing`, romaji: '' },
                    { id: 'w2', text: '、', meaning: ',', romaji: '' },
                    { id: 'w3', text: nextVerb.masu, meaning: nextVerb.meaning, romaji: '' }
                ],
                solution: [nagara, '、', nextVerb.masu]
            }]
        });
    });

    // ── Group 5: Koto ga dekiru (can do) ─────────────────────────────────────
    const dekiruVerbs = coreVerbs;
    const dekiruIntro: GrammarSlide = {
        type: 'grammar',
        title: '⚡ ～ことができる: Ability',
        content: 'To say you CAN do something, use the pattern: [plain dictionary form] + ことができます. This is the formal way to express ability in Japanese. It is used in formal speech, job interviews, and written Japanese.',
        structure: [
            { label: '話すことができます', color: 'bg-indigo-100 text-indigo-700', example: 'I can speak' },
            { label: '読むことができます', color: 'bg-blue-100 text-blue-700', example: 'I can read' },
            { label: '書けます (casual)', color: 'bg-green-100 text-green-700', example: 'Short form' },
        ],
        exampleSentence: { japanese: '日本語を話すことができます。', romaji: 'Nihongo o hanasu koto ga dekimasu.', english: 'I can speak Japanese.' },
    };
    dekiruVerbs.forEach((verb, i) => {
        const dekiru = kotozukiMap[verb.masu] || `${verb.dictionary.replace('る', 'ること')}ができます`;
        const otherVerb = dekiruVerbs[(i + 3) % dekiruVerbs.length];
        const otherDekiru = kotozukiMap[otherVerb.masu] || '';
        lessons.push({
            id: `verb-dekiru-${i}`,
            worldId: 'verbs-1',
            title: `Can: ${verb.dictionary}ことができます`,
            type: 'kana' as const,
            xp: 250,
            content: i === 0 ? [dekiruIntro] : [],
            fillBlanks: [
                {
                    id: `fvdk-${i}-1`,
                    japanese: `${dekiru}。`,
                    english: `I can ${verb.meaning}.`,
                    romaji: '',
                    parts: ['_'],
                    blanks: [{
                        position: 0, answer: dekiru, choices: [
                            { id: 'a', text: dekiru, romaji: '' },
                            { id: 'b', text: otherDekiru, romaji: '' },
                            { id: 'c', text: verb.masu, romaji: '' },
                            { id: 'd', text: verb.masen, romaji: '' }
                        ]
                    }]
                },
                {
                    id: `fvdk-${i}-2`,
                    japanese: `日本語を${kotozukiMap['話します'] || '話すことができます'}。`,
                    english: `I can speak Japanese.`,
                    romaji: 'Nihongo o hanasu koto ga dekimasu.',
                    parts: ['日本語を', '_'],
                    blanks: [{
                        position: 1, answer: kotozukiMap['話します'] || '話すことができます', choices: [
                            { id: 'a', text: kotozukiMap['話します'] || '話すことができます', romaji: '' },
                            { id: 'b', text: dekiru, romaji: '' },
                            { id: 'c', text: '話します', romaji: 'hanashimasu' },
                            { id: 'd', text: '話しません', romaji: 'hanashimasen' }
                        ]
                    }]
                }
            ],
            sentences: [{
                id: `svdk-${i}-1`,
                english: `I can ${verb.meaning}.`,
                japanese: `${dekiru}。`,
                romaji: '',
                words: [{ id: 'w1', text: dekiru, meaning: `can ${verb.meaning}`, romaji: '' }],
                solution: [dekiru]
            }]
        });
    });

    // ── Group 6: Conversation practice 45-49 ─────────────────────────────────
    const verbConvoPairs = [
        { q: '今日は何をしたいですか？', answer: '日本語を勉強したいです。', aqna: '日本語を読みたい', wrong1: '食べませんでした', wrong2: '行きません' },
        { q: '毎日何をしますか？', answer: '毎日日本語を勉強します。', aqna: '勉強します', wrong1: '食べたい', wrong2: '帰りました' },
        { q: '昨日は何をしましたか？', answer: '本を読みました。', aqna: '読みました', wrong1: '読みたい', wrong2: '読みながら' },
        { q: '週末は何をしますか？', answer: '友達と遊びます。', aqna: '遊びます', wrong1: '遊んで', wrong2: '遊びたい' },
        { q: '日本語を話すことができますか？', answer: 'はい、少し話すことができます。', aqna: '話すことができます', wrong1: '話します', wrong2: '話したい' },
    ];
    verbConvoPairs.forEach((pair, i) => {
        lessons.push({
            id: `verb-convo-${i}`,
            worldId: 'verbs-1',
            title: `Verb Conversation ${i + 1}`,
            type: 'kana' as const,
            xp: 260,
            content: [{
                type: 'grammar',
                title: `💬 Combining What You Know`,
                content: `Practice combining verb patterns in real conversation. Listen to the question and choose the correct verb form to respond.`,
                structure: [
                    { label: 'Question', color: 'bg-slate-100 text-slate-700', example: pair.q },
                    { label: 'Answer', color: 'bg-green-100 text-green-700', example: pair.answer },
                ],
                exampleSentence: { japanese: pair.q, romaji: '', english: '' },
            }],
            fillBlanks: [{
                id: `fvconv-${i}-1`,
                japanese: pair.answer,
                english: pair.answer,
                romaji: '',
                parts: ['_'],
                blanks: [{
                    position: 0, answer: pair.aqna, choices: [
                        { id: 'a', text: pair.aqna, romaji: '' },
                        { id: 'b', text: pair.wrong1, romaji: '' },
                        { id: 'c', text: pair.wrong2, romaji: '' },
                        { id: 'd', text: 'です', romaji: 'desu' }
                    ]
                }]
            }],
            sentences: [{
                id: `svconv-${i}-1`,
                english: pair.answer,
                japanese: pair.answer,
                romaji: '',
                words: [{ id: 'w1', text: pair.answer, meaning: pair.answer, romaji: '' }],
                solution: [pair.answer]
            }]
        });
    });

    return lessons;
};

const particleLesson: LessonData = {
    id: 'lesson-4',
    worldId: 'beginner-1',
    title: 'Lesson 4: Particle Power-Up',
    type: 'kana',
    xp: 250,
    content: [
        {
            type: 'grammar',
            title: ' は (Wa) — The Topic Spotlight',
            content: 'The "Wa" particle marks the TOPIC. It tells the listener: "As for this thing, here is what I want to say about it." It is like a spotlight on the subject.',
            structure: [
                { label: '私は (Watashi wa)', color: 'bg-blue-100 text-blue-700', example: 'As for me...' },
                { label: 'これは (Kore wa)', color: 'bg-indigo-100 text-indigo-700', example: 'As for this...' }
            ],
            exampleSentence: { japanese: '私はがくせいです。', romaji: 'Watashi wa gakusei desu.', english: 'As for me, I am a student.' }
        },
        {
            type: 'grammar',
            title: ' が (Ga) — The Specific Actor',
            content: 'The "Ga" particle marks the SUBJECT. It identifies EXACTLY who or what is doing the action. While "Wa" is the general topic, "Ga" is the specific actor.',
            structure: [
                { label: '犬がきた (Inu ga kita)', color: 'bg-amber-100 text-amber-700', example: 'The dog (specifically) came.' },
                { label: 'すきが (Suki ga...)', color: 'bg-rose-100 text-rose-700', example: '...is what I like.' }
            ],
            exampleSentence: { japanese: 'いぬがきた。', romaji: 'Inu ga kita.', english: 'The dog came.' }
        },
        {
            type: 'grammar',
            title: ' を (Wo) — The Object Receiver',
            content: 'The "Wo" (pronounced ‘o’) particle is the hammer. It marks the DIRECT OBJECT — the thing that is receiving the action of the verb.',
            structure: [
                { label: 'りんごを (Ringo o)', color: 'bg-red-100 text-red-700', example: 'Apple (receiver)' },
                { label: 'たべる (Taberu)', color: 'bg-green-100 text-green-700', example: 'To eat' }
            ],
            exampleSentence: { japanese: 'りんごをたべる。', romaji: 'Ringo o taberu.', english: 'Eat an apple.' }
        },
        {
            type: 'grammar',
            title: ' に (Ni) — The Target / Time',
            content: 'The "Ni" particle is an arrow. It points to a DESTINATION (where you are going) or a SPECIFIC TIME (when it happens).',
            structure: [
                { label: '東京に (Tokyo ni)', color: 'bg-indigo-100 text-indigo-700', example: "To Tokyo" },
                { label: '三時に (San-ji ni)', color: 'bg-amber-100 text-amber-700', example: 'At 3 o\'clock' }
            ],
            exampleSentence: { japanese: 'とうきょうにいく。', romaji: 'Toukyou ni iku.', english: 'Go to Tokyo.' }
        },
        {
            type: 'grammar',
            title: ' で (De) — The Scene of Action',
            content: 'The "De" particle marks the LOCATION where an action happens, or the TOOL you use to do it (like "by means of").',
            structure: [
                { label: 'バスで (Basu de)', color: 'bg-blue-100 text-blue-700', example: 'By bus' },
                { label: 'カフェで (Kafe de)', color: 'bg-orange-100 text-orange-700', example: 'At the cafe' }
            ],
            exampleSentence: { japanese: 'バスでいく。', romaji: 'Basu de iku.', english: 'Go by bus.' }
        },
        {
            type: 'grammar',
            title: ' の (No) — The Possession Link',
            content: 'The "No" particle connects two nouns. It usually shows POSSESSION, like an apostrophe ‘s’ in English.',
            structure: [
                { label: '私の (Watashi no)', color: 'bg-sakura-pink/20 text-sakura-pink', example: 'My (Me\'s)' },
                { label: 'ほん (Hon)', color: 'bg-emerald-100 text-emerald-700', example: 'Book' }
            ],
            exampleSentence: { japanese: 'わたしのほん。', romaji: 'Watashi no hon.', english: 'My book.' }
        }
    ],
    fillBlanks: [
        {
            id: 'fp-4-1', japanese: 'わたし_ほん。', english: 'My book.', romaji: 'Watashi no hon.',
            parts: ['わたし', '_', 'ほん。'],
            blanks: [{ position: 1, answer: 'の', choices: [{ id: 'a', text: 'の', romaji: 'no' }, { id: 'b', text: 'を', romaji: 'o' }, { id: 'c', text: 'に', romaji: 'ni' }, { id: 'd', text: 'は', romaji: 'wa' }] }]
        },
        {
            id: 'fp-4-2', japanese: 'りんご_たべる。', english: 'Eat an apple.', romaji: 'Ringo o taberu.',
            parts: ['りんご', '_', 'たべる。'],
            blanks: [{ position: 1, answer: 'を', choices: [{ id: 'a', text: 'を', romaji: 'o' }, { id: 'b', text: 'は', romaji: 'wa' }, { id: 'c', text: 'が', romaji: 'ga' }, { id: 'd', text: 'で', romaji: 'de' }] }]
        },
        {
            id: 'fp-4-3', japanese: 'バス_いく。', english: 'Go by bus.', romaji: 'Basu de iku.',
            parts: ['バス', '_', 'いく。'],
            blanks: [{ position: 1, answer: 'で', choices: [{ id: 'a', text: 'で', romaji: 'de' }, { id: 'b', text: 'に', romaji: 'ni' }, { id: 'c', text: 'を', romaji: 'o' }, { id: 'd', text: 'の', romaji: 'no' }] }]
        },
        {
            id: 'fp-4-4', japanese: 'すし_たべる。', english: 'Eat sushi.', romaji: 'Sushi o taberu.',
            parts: ['すし', '_', 'たべる。'],
            blanks: [{ position: 1, answer: 'を', choices: [{ id: 'a', text: 'を', romaji: 'o' }, { id: 'b', text: 'は', romaji: 'wa' }, { id: 'c', text: 'が', romaji: 'ga' }, { id: 'd', text: 'の', romaji: 'no' }] }]
        },
        {
            id: 'fp-4-5', japanese: 'がっこう_いく。', english: 'Go to school.', romaji: 'Gakkou ni iku.',
            parts: ['がっこう', '_', 'いく。'],
            blanks: [{ position: 1, answer: 'に', choices: [{ id: 'a', text: 'に', romaji: 'ni' }, { id: 'b', text: 'で', romaji: 'de' }, { id: 'c', text: 'を', romaji: 'o' }, { id: 'd', text: 'は', romaji: 'wa' }] }]
        }

    ],
    sentences: [
        {
            id: 'sp-4-1', english: 'I go to Tokyo.', japanese: 'わたしはとうきょうにいく。',
            romaji: 'Watashi wa Toukyou ni iku.',
            words: [
                { id: 'w1', text: 'わたし', meaning: 'I', romaji: 'watashi' },
                { id: 'w2', text: 'は', meaning: 'Topic', romaji: 'wa' },
                { id: 'w3', text: 'とうきょう', meaning: 'Tokyo', romaji: 'toukyou' },
                { id: 'w4', text: 'に', meaning: 'To', romaji: 'ni' },
                { id: 'w5', text: 'いく', meaning: 'Go', romaji: 'iku' }
            ],
            solution: ['わたし', 'は', 'とうきょう', 'に', 'いく']
        },
        {
            id: 'sp-4-2', english: 'Eat sushi.', japanese: 'すしをたべる。',
            romaji: 'Sushi o taberu.',
            words: [
                { id: 'w1', text: 'すし', meaning: 'Sushi', romaji: 'sushi' },
                { id: 'w2', text: 'を', meaning: 'Object', romaji: 'o' },
                { id: 'w3', text: 'たべる', meaning: 'Eat', romaji: 'taberu' }
            ],
            solution: ['すし', 'を', 'たべる']
        },
        {
            id: 'sp-4-3', english: 'Go to school.', japanese: 'がっこうにいく。',
            romaji: 'Gakkou ni iku.',
            words: [
                { id: 'w1', text: 'がっこう', meaning: 'School', romaji: 'gakkou' },
                { id: 'w2', text: 'に', meaning: 'To', romaji: 'ni' },
                { id: 'w3', text: 'いく', meaning: 'Go', romaji: 'iku' }
            ],
            solution: ['がっこう', 'に', 'いく']
        }

    ]
};

const buildProceduralCurriculum = (): LessonData[] => {
    const rawLessons: LessonData[] = [];

    // All regular lessons in order
    rawLessons.push(...kanaLessons);
    rawLessons.push(particleLesson);
    rawLessons.push(...katakanaLessons);
    rawLessons.push(checkpointLesson);
    rawLessons.push(...conversationLessons);
    rawLessons.push(...bossArcLessons);

    const verbLessons = generateVerbLessons();
    const grammarLessons = generateGrammarLessons();
    const vocabLessons = generateVocabLessons();
    const kanjiLessons = generateKanjiLessons();
    const masteryLessons = generateMasteryLessons(verbLessons, grammarLessons, vocabLessons, kanjiLessons);

    // Filter out any accidentally included adventure nodes from the raw pool
    const pureRegularLessons = rawLessons.filter(l => l.type !== 'adventure');

    const finalLessons: LessonData[] = [];
    let kanaVocabIndex = 0;
    let verbIndex = 0;
    let grammarIndex = 0;
    let vocabIndex = 0;
    let kanjiIndex = 0;
    let masteryIndex = 0;

    for (let w = 0; w < WORLDS.length; w++) {
        const worldId = WORLDS[w].id;

        for (let i = 0; i < 25; i++) {
            const isAdventure = (i + 1) % 5 === 0;
            const isBoss = (i + 1) === 25;

            if (isAdventure) {
                if (isBoss) {
                    finalLessons.push({
                        id: `boss-${worldId}`, worldId,
                        title: `⚔️ World ${w + 1} Boss`,
                        type: 'boss', xp: 1000, content: []
                    });
                } else {
                    finalLessons.push({
                        id: `adventure-${worldId}-${i}`, worldId,
                        title: `Wandering Merchant`,
                        type: 'adventure', xp: 500, content: []
                    });
                }
            } else {
                let lesson: LessonData | null = null;

                let pool: LessonData[] = [];
                let currentPoolIndex = 0; // This will hold the current index for the selected pool

                // Explicitly map world contents
                if (w < 3) {
                    // World 1, 2, 3: Pure Kana & Intro (3 worlds * 20 slots = 60 slots)
                    pool = pureRegularLessons;
                    currentPoolIndex = kanaVocabIndex;
                    kanaVocabIndex += 1; // Increment by 1 for each lesson, not by lessonSlots
                } else if (w < 5) {
                    // World 4, 5: The Way of the Verb (2 worlds * 20 slots = 40 slots)
                    pool = verbLessons;
                    currentPoolIndex = verbIndex;
                    verbIndex += 1;
                } else if (w < 7) {
                    // World 6, 7: Grammar Forge (2 worlds * 20 slots = 40 slots)
                    pool = grammarLessons;
                    currentPoolIndex = grammarIndex;
                    grammarIndex += 1;
                } else if (w < 9) {
                    // World 8, 9: Core Vocabulary (2 worlds * 20 slots = 40 slots)
                    pool = vocabLessons;
                    currentPoolIndex = vocabIndex;
                    vocabIndex += 1;
                } else if (w < 12) {
                    // World 10, 11, 12: Kanji Chronicles (3 worlds * 20 slots = 60 slots)
                    pool = kanjiLessons;
                    currentPoolIndex = kanjiIndex;
                    kanjiIndex += 1;
                } else {
                    // World 13, 14, 15: Mastery Gauntlet (3 worlds * 20 slots = 60 slots)
                    pool = masteryLessons;
                    currentPoolIndex = masteryIndex;
                    masteryIndex += 1;
                }

                if (currentPoolIndex < pool.length) {
                    lesson = pool[currentPoolIndex];
                }

                if (lesson) {
                    finalLessons.push({ ...lesson, worldId });
                } else {
                    // If we run out of specific topic content, either pad with extra review or pull from the general pool
                    finalLessons.push({
                        id: `filler-${worldId}-${i}`, worldId,
                        title: `Extra Review`, type: 'kana' as const, xp: 100, content: []
                    });
                }
            }
        }
    }

    // Update IDs to be sequential for the map
    return finalLessons.map((l, i) => ({ ...l, id: `lesson-${i + 1}`, originalId: l.id || `lesson-${i + 1}` }));
};

allLessons = buildProceduralCurriculum();

export const getLesson = (id: string): LessonData | undefined =>
    allLessons.find(l => l.id === id);

// Helper: get all fillBlanks for a world's verb lessons by worldId
const getVerbWorldPool = (): (FillBlankProblem | SentenceProblem)[] => {
    const verbLessons = generateVerbLessons();
    const pool: (FillBlankProblem | SentenceProblem)[] = [];
    verbLessons.forEach(l => {
        if (l.fillBlanks) pool.push(...l.fillBlanks);
        if (l.sentences) pool.push(...l.sentences);
    });
    return pool;
};

// Helper: get all fillBlanks for grammar world
const getGrammarWorldPool = (): (FillBlankProblem | SentenceProblem)[] => {
    const grammarLessons = generateGrammarLessons();
    const pool: (FillBlankProblem | SentenceProblem)[] = [];
    grammarLessons.forEach(l => {
        if (l.fillBlanks) pool.push(...l.fillBlanks);
        if (l.sentences) pool.push(...l.sentences);
    });
    return pool;
};

// Helper: get all fillBlanks for vocab world
const getVocabWorldPool = (): (FillBlankProblem | SentenceProblem)[] => {
    const vocabLessons = generateVocabLessons();
    const pool: (FillBlankProblem | SentenceProblem)[] = [];
    vocabLessons.forEach(l => {
        if (l.fillBlanks) pool.push(...l.fillBlanks);
        if (l.sentences) pool.push(...l.sentences);
    });
    return pool;
};

// Helper: get all fillBlanks for kanji world
const getKanjiWorldPool = (): (FillBlankProblem | SentenceProblem)[] => {
    const kanjiLessons = generateKanjiLessons();
    const pool: (FillBlankProblem | SentenceProblem)[] = [];
    kanjiLessons.forEach(l => {
        if (l.fillBlanks) pool.push(...l.fillBlanks);
        if (l.sentences) pool.push(...l.sentences);
    });
    return pool;
};

// Helper: get all fillBlanks for mastery world
const getMasteryWorldPool = (): (FillBlankProblem | SentenceProblem)[] => {
    // For mastery combat, we can just return everything since the Gauntlet is a mix of all worlds.
    const verbLessons = generateVerbLessons();
    const grammarLessons = generateGrammarLessons();
    const vocabLessons = generateVocabLessons();
    const kanjiLessons = generateKanjiLessons();

    const pool: (FillBlankProblem | SentenceProblem)[] = [];
    const all = [...verbLessons, ...grammarLessons, ...vocabLessons, ...kanjiLessons];
    all.forEach(l => {
        if (l.fillBlanks) pool.push(...l.fillBlanks);
        if (l.sentences) pool.push(...l.sentences);
    });
    return pool;
};

export const getProblemPoolForAdventure = (lessonId: string): (FillBlankProblem | SentenceProblem)[] => {
    let pool: (FillBlankProblem | SentenceProblem)[] = [];

    let start = 1;
    let end = 6;

    if (lessonId === 'adventure-2' || lessonId === 'lesson-13') {
        start = 7; end = 11;
    } else if (lessonId === 'adventure-3' || lessonId === 'lesson-19') {
        start = 12; end = 16;
    } else if (lessonId === 'adventure-4' || lessonId === 'lesson-26') {
        start = 17; end = 21;
    } else if (lessonId === 'adventure-5' || lessonId === 'lesson-33') {
        start = 22; end = 27;
    } else if (lessonId === 'adventure-v1' || lessonId === 'lesson-48') {
        start = 38; end = 47;
    } else if (lessonId === 'final-boss' || lessonId === 'lesson-37' || lessonId === 'lesson-59') {
        start = 1; end = 56;
    } else if (lessonId.includes('verb-adventure') || lessonId.includes('verb-boss')) {
        // Pull from verb world pool
        return getVerbWorldPool();
    } else if (lessonId.includes('grammar-')) {
        // Pull from grammar world pool
        return getGrammarWorldPool();
    } else if (lessonId.includes('vocab-')) {
        // Pull from vocab world pool
        return getVocabWorldPool();
    } else if (lessonId.includes('kanji-')) {
        // Pull from kanji world pool
        return getKanjiWorldPool();
    } else if (lessonId.includes('mastery-')) {
        // Pull from mastery world pool
        return getMasteryWorldPool();
    }

    for (let i = start; i <= end; i++) {
        pool.push(...getFillBlanks(i));
        pool.push(...getSentences(i));
    }

    if (pool.length === 0) {
        pool = [...getFillBlanks(1), ...getSentences(1)];
    }

    return pool;
};
