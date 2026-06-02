import type { LessonData, FillBlankProblem, SentenceProblem } from './lessons';
import type { Kana } from './kana';
import { core2000Words } from './core2000';

const world4IntroSlides: Kana[] = [
    {
        char: '語彙',
        romaji: 'goi',
        type: 'katakana', // using katakana type for standard display card
        mnemonic: 'Welcome to World 4: Core 2000 Vocabulary! You will master the foundations of spoken Japanese here.',
        examples: []
    }
];

// Helper to get random distractors
const getDistractors = (answerWord: string, count: number) => {
    const distractors = core2000Words.filter(w => w.word !== answerWord);
    const shuffled = distractors.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const generateVocabLessons = (): LessonData[] => {
    const lessons: LessonData[] = [];
    const WORDS_PER_LESSON = 4;

    // We have 200 words total, so exactly 50 lessons.
    for (let i = 0; i < 50; i++) {
        const startIndex = i * WORDS_PER_LESSON;
        const lessonWords = core2000Words.slice(startIndex, startIndex + WORDS_PER_LESSON);

        // If we run out of words for some reason
        if (lessonWords.length === 0) break;

        const introSlides = i === 0 ? world4IntroSlides : [];

        // Generate content slides
        const content: Kana[] = [
            ...introSlides,
            ...lessonWords.map(w => ({
                char: w.word,
                romaji: w.reading,
                type: 'katakana' as const,
                mnemonic: `Meaning: ${w.meaning}`,
                examples: w.sentence ? [{ word: w.sentence, meaning: w.sentence_meaning }] : []
            }))
        ];

        // Generate Fill In Blanks
        const fillBlanks: FillBlankProblem[] = lessonWords.map((w, idx) => {
            const dists = getDistractors(w.word, 3);
            return {
                id: `v-f-${i}-${idx}`,
                japanese: w.word,
                english: w.meaning,
                romaji: w.reading,
                parts: ['_'],
                blanks: [{
                    position: 0,
                    answer: w.word,
                    choices: [
                        { id: 'c1', text: w.word, romaji: w.reading, meaning: w.meaning },
                        { id: 'c2', text: dists[0].word, romaji: dists[0].reading, meaning: dists[0].meaning },
                        { id: 'c3', text: dists[1].word, romaji: dists[1].reading, meaning: dists[1].meaning },
                        { id: 'c4', text: dists[2].word, romaji: dists[2].reading, meaning: dists[2].meaning }
                    ].sort(() => 0.5 - Math.random()) // Shuffle choices
                }]
            };
        });

        // Generate Sentences (if the word has one)
        const sentences: SentenceProblem[] = lessonWords
            .filter(w => w.sentence && w.sentence_meaning)
            .map((w, idx) => {
                // simple split by space for the reading line since it's pre-segmented
                // e.g. "それ は とっても いい はなし だ"
                const sentenceWords = w.sentence_reading.split(' ').map((rw, ri) => ({
                    id: `vw-${i}-${idx}-${ri}`,
                    text: rw, // using romaji/kana split format from the db as text blocks
                    meaning: '',
                    romaji: ''
                }));

                return {
                    id: `v-s-${i}-${idx}`,
                    english: w.sentence_meaning,
                    japanese: w.sentence,
                    romaji: w.sentence_reading.replace(/ /g, ''), // remove spaces for full romaji line
                    words: sentenceWords,
                    solution: w.sentence_reading.split(' ')
                };
            });

        lessons.push({
            id: `vocab-${i + 1}`,
            worldId: 'vocab-1',
            title: `Core 2000 Vocabulary ${i + 1}`,
            type: 'kana',
            xp: 200,
            content,
            fillBlanks,
            sentences
        });
    }

    // Replace the final lesson with an adventure/boss if we want, or add one
    lessons.push({
        id: 'vocab-boss',
        worldId: 'vocab-1',
        title: '⚔️ Core 2000 Boss Gauntlet',
        type: 'adventure',
        xp: 1000,
        content: []
    });

    return lessons.map(l => ({ ...l, originalId: l.id }));
};
