import type { LessonData, SentenceProblem } from './lessons';
import type { Kana } from './kana';
import type { FillBlankProblem } from '../components/games/FillInBlank';

// Helper to get ALL problems from previous worlds
const getAllProblems = (
    verb: LessonData[],
    grammar: LessonData[],
    vocab: LessonData[],
    kanji: LessonData[]
) => {
    const allFillBlanks: FillBlankProblem[] = [];
    const allSentences: SentenceProblem[] = [];

    [...verb, ...grammar, ...vocab, ...kanji].forEach(l => {
        if (l.fillBlanks) allFillBlanks.push(...l.fillBlanks);
        if (l.sentences) allSentences.push(...l.sentences);
    });

    return { allFillBlanks, allSentences };
};

const world6IntroSlides: Kana[] = [
    {
        char: '達人',
        romaji: 'tatsujin',
        type: 'katakana', // standard card
        mnemonic: 'MASTER GAUNTLET: Welcome to the final challenge. The training wheels come off now. No Romaji. No English. Just pure Japanese. Prove your mastery.',
        examples: []
    }
];

export const generateMasteryLessons = (
    verb: LessonData[],
    grammar: LessonData[],
    vocab: LessonData[],
    kanji: LessonData[]
): LessonData[] => {
    const lessons: LessonData[] = [];
    const { allFillBlanks, allSentences } = getAllProblems(verb, grammar, vocab, kanji);

    // Shuffle the master pools
    const shuffledFill = [...allFillBlanks].sort(() => 0.5 - Math.random());
    const shuffledSentences = [...allSentences].sort(() => 0.5 - Math.random());

    const TOTAL_LESSONS = 60;
    const PROBLEMS_PER_LESSON = 5; // 5 fills, 2 sentences per lesson
    const SENTENCES_PER_LESSON = 2;

    for (let i = 0; i < TOTAL_LESSONS; i++) {
        const hideRomaji = i >= 4; // Hide romaji from lesson 5 onwards
        const hideEnglish = i >= 14; // Hide English from lesson 15 onwards

        const introSlides = i === 0 ? world6IntroSlides : [];

        // Get subset for this lesson (use modulo to cycle if we run out of unique problems)
        const fillSubset = [];
        for (let j = 0; j < PROBLEMS_PER_LESSON; j++) {
            const idx = (i * PROBLEMS_PER_LESSON + j) % shuffledFill.length;
            fillSubset.push(shuffledFill[idx]);
        }

        const sentenceSubset = [];
        for (let j = 0; j < SENTENCES_PER_LESSON; j++) {
            const idx = (i * SENTENCES_PER_LESSON + j) % shuffledSentences.length;
            sentenceSubset.push(shuffledSentences[idx]);
        }

        lessons.push({
            id: `mastery-${i + 1}`,
            worldId: 'mastery-1',
            title: `Mastery Trial ${i + 1}`,
            type: 'kana',
            xp: 300,
            hideRomaji,
            hideEnglish,
            content: [
                ...introSlides,
                {
                    char: `試練 ${i + 1}`,
                    romaji: 'shiren',
                    type: 'katakana',
                    mnemonic: hideEnglish ? 'No English. No Romaji. Survive.' : (hideRomaji ? 'No Romaji. Rely on your Kana and Kanji.' : 'Prepare yourself.'),
                    examples: []
                }
            ],
            fillBlanks: fillSubset,
            sentences: sentenceSubset
        });
    }

    return lessons.map(l => ({ ...l, originalId: l.id }));
};
