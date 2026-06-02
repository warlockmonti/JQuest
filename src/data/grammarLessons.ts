import type { LessonData, GrammarSlide, FillBlankProblem, SentenceProblem } from './lessons';

// I-Adjectives (1-6)
const iAdjectives = [
    { dict: '大きい', kana: 'おおきい', romaji: 'ookii', english: 'big' },
    { dict: '小さい', kana: 'ちいさい', romaji: 'chiisai', english: 'small' },
    { dict: '良い', kana: 'いい', romaji: 'ii', english: 'good' },
    { dict: '悪い', kana: 'わるい', romaji: 'warui', english: 'bad' },
    { dict: '暑い', kana: 'あつい', romaji: 'atsui', english: 'hot' },
    { dict: '寒い', kana: 'さむい', romaji: 'samui', english: 'cold' },
];

// Na-Adjectives (7-12)
const naAdjectives = [
    { dict: '静か', kana: 'しずか', romaji: 'shizuka', english: 'quiet' },
    { dict: '賑やか', kana: 'にぎやか', romaji: 'nigiyaka', english: 'lively' },
    { dict: '綺麗', kana: 'きれい', romaji: 'kirei', english: 'beautiful / clean' },
    { dict: '便利', kana: 'べんり', romaji: 'benri', english: 'convenient' },
    { dict: '暇', kana: 'ひま', romaji: 'hima', english: 'free (time)' },
    { dict: '変', kana: 'へん', romaji: 'hen', english: 'strange' },
];

const world3IntroSlides: GrammarSlide[] = [
    {
        type: 'grammar',
        title: '🔥 Welcome to The Grammar Forge',
        content: 'In World 3, you will learn how to describe the world. Words that describe things are called adjectives. In Japanese, there are two types of adjectives: い-Adjectives and な-Adjectives. You will learn how they behave differently!',
        structure: [
            { label: '大きい (ookii)', color: 'bg-red-100 text-red-700', example: 'big (i-adjective)' },
            { label: '静か (shizuka)', color: 'bg-blue-100 text-blue-700', example: 'quiet (na-adjective)' },
        ],
        exampleSentence: { japanese: '大きい犬です。', romaji: 'Ookii inu desu.', english: 'It is a big dog.' },
    }
];

export const generateGrammarLessons = (): LessonData[] => {
    const lessons: LessonData[] = [];

    // Group 1: I-Adjectives (1-6)
    iAdjectives.forEach((adj, i) => {
        const introSlides = i === 0 ? world3IntroSlides : [];
        lessons.push({
            id: `grammar-iadj-${i}`,
            worldId: 'grammar-1',
            title: `い-Adjectives: ${adj.dict} (${adj.english})`,
            type: 'kana',
            xp: 200,
            content: [
                ...introSlides,
                {
                    type: 'grammar',
                    title: `✨ い-Adjective: ${adj.dict} (${adj.english})`,
                    content: `い-adjectives end in the Hiragana character い (i). You can drop 'desu' in casual speech, but keep it for politeness.`,
                    structure: [
                        { label: `${adj.dict}です`, color: 'bg-green-100 text-green-700', example: `It is ${adj.english} (polite)` },
                        { label: `${adj.dict}犬`, color: 'bg-blue-100 text-blue-700', example: `${adj.english} dog` },
                    ],
                    exampleSentence: { japanese: `それは${adj.dict}です。`, romaji: `Sore wa ${adj.romaji} desu.`, english: `That is ${adj.english}.` }
                }
            ],
            fillBlanks: [
                {
                    id: `g-iadj-${i}-1`,
                    japanese: `これは${adj.dict}です。`,
                    english: `This is ${adj.english}.`,
                    romaji: `kore wa ${adj.romaji} desu.`,
                    parts: ['これは', '_', 'です。'],
                    blanks: [{
                        position: 0,
                        answer: adj.dict,
                        choices: [
                            { id: `c1`, text: adj.dict, romaji: adj.romaji },
                            { id: `c2`, text: 'です', romaji: 'desu' },
                            { id: `c3`, text: '犬', romaji: 'inu' },
                            { id: `c4`, text: 'ねこ', romaji: 'neko' }
                        ]
                    }]
                } as FillBlankProblem
            ],
            sentences: [
                {
                    id: `s-iadj-${i}-1`,
                    english: `This is ${adj.english}.`,
                    japanese: `これは${adj.dict}です。`,
                    romaji: `kore wa ${adj.romaji} desu.`,
                    words: [
                        { id: 'w1', text: 'これ', meaning: 'this', romaji: 'kore' },
                        { id: 'w2', text: 'は', meaning: 'topic marker', romaji: 'wa' },
                        { id: 'w3', text: adj.dict, meaning: adj.english, romaji: adj.romaji },
                        { id: 'w4', text: 'です', meaning: 'is', romaji: 'desu' },
                    ],
                    solution: ['これ', 'は', adj.dict, 'です']
                } as SentenceProblem
            ]
        });
    });

    // Group 2: Na-Adjectives (7-12)
    naAdjectives.forEach((adj, i) => {
        const introSlides = i === 0 ? [{
            type: 'grammar' as const,
            title: '✨ な-Adjectives',
            content: 'な-Adjectives do NOT end in い (usually). When modifying a noun directly, you MUST attach "な" (na) to them!',
            structure: [
                { label: '静かです', color: 'bg-purple-100 text-purple-700', example: 'It is quiet' },
                { label: '静かな犬', color: 'bg-pink-100 text-pink-700', example: 'A quiet dog (needs な!)' },
            ],
            exampleSentence: { japanese: '静かです。', romaji: 'Shizuka desu.', english: 'It is quiet.' }
        }] : [];

        lessons.push({
            id: `grammar-naadj-${i}`,
            worldId: 'grammar-1',
            title: `な-Adjectives: ${adj.dict} (${adj.english})`,
            type: 'kana',
            xp: 200,
            content: [
                ...introSlides,
                {
                    type: 'grammar',
                    title: `✨ な-Adjective: ${adj.dict}`,
                    content: `${adj.english}`,
                    structure: [
                        { label: `${adj.dict}です`, color: 'bg-green-100 text-green-700', example: `It is ${adj.english}` },
                        { label: `${adj.dict}な人`, color: 'bg-blue-100 text-blue-700', example: `${adj.english} person` },
                    ],
                    exampleSentence: { japanese: `ここは${adj.dict}です。`, romaji: `Koko wa ${adj.romaji} desu.`, english: `It is ${adj.english} here.` }
                }
            ],
            fillBlanks: [
                {
                    id: `g-naadj-${i}-1`,
                    japanese: `ここは${adj.dict}です。`,
                    english: `It is ${adj.english} here.`,
                    romaji: `koko wa ${adj.romaji} desu.`,
                    parts: ['ここは', '_', 'です。'],
                    blanks: [{
                        position: 0,
                        answer: adj.dict,
                        choices: [
                            { id: `c1`, text: adj.dict, romaji: adj.romaji },
                            { id: `c2`, text: 'な', romaji: 'na' },
                            { id: `c3`, text: 'ます', romaji: 'masu' },
                            { id: `c4`, text: 'ねこ', romaji: 'neko' }
                        ]
                    }]
                } as FillBlankProblem
            ],
            sentences: [
                {
                    id: `s-naadj-${i}-1`,
                    english: `It is ${adj.english}.`,
                    japanese: `${adj.dict}です。`,
                    romaji: `${adj.romaji} desu.`,
                    words: [
                        { id: 'w1', text: adj.dict, meaning: adj.english, romaji: adj.romaji },
                        { id: 'w2', text: 'です', meaning: 'is', romaji: 'desu' },
                        { id: 'w3', text: 'な', meaning: 'na', romaji: 'na' },
                    ],
                    solution: [adj.dict, 'です']
                } as SentenceProblem
            ]
        });
    });

    // Group 3: Adjective Conjugation (Past / Negative) (13-18)
    const conjugations = [
        { title: 'い-adj Negative', rule: 'Drop い, add くないです (kunai desu)', ex: '大きいです → 大きくないです (Not big)' },
        { title: 'い-adj Past', rule: 'Drop い, add かったです (katta desu)', ex: '大きいです → 大きかったです (Was big)' },
        { title: 'い-adj Past Neg', rule: 'Drop い, add くなかったです (kunakatta desu)', ex: '大きいです → 大きくなかったです (Was not big)' },
        { title: 'な-adj Negative', rule: 'Add じゃないです (janai desu) instead of です', ex: '静かです → 静かじゃないです (Not quiet)' },
        { title: 'な-adj Past', rule: 'Add でした (deshita) instead of です', ex: '静かです → 静かでした (Was quiet)' },
        { title: 'な-adj Past Neg', rule: 'Add じゃなかったです (janakatta desu)', ex: '静かです → 静かじゃなかったです (Was not quiet)' },
    ];

    conjugations.forEach((conj, i) => {
        lessons.push({
            id: `grammar-conj-${i}`,
            worldId: 'grammar-1',
            title: `Conjugation: ${conj.title}`,
            type: 'kana',
            xp: 220,
            content: [{
                type: 'grammar',
                title: `🔄 ${conj.title}`,
                content: conj.rule,
                structure: [{ label: 'Example', color: 'bg-yellow-100 text-yellow-700', example: conj.ex }],
                exampleSentence: { japanese: conj.ex.split('→ ')[1].split('(')[0].trim(), romaji: '---', english: conj.ex.match(/\((.*?)\)/)?.[1] || 'Example' }
            }],
            fillBlanks: [
                {
                    id: `g-conj-${i}-1`,
                    japanese: conj.ex.split('→ ')[1].split('(')[0].trim() + '。',
                    english: conj.ex.match(/\((.*?)\)/)?.[1] || 'Example',
                    romaji: '---',
                    parts: ['_'],
                    blanks: [{
                        position: 0,
                        answer: conj.ex.split('→ ')[1].split('(')[0].trim(),
                        choices: [
                            { id: `c1`, text: conj.ex.split('→ ')[1].split('(')[0].trim(), romaji: '---' },
                            { id: `c2`, text: '大きくない', romaji: 'ookikunai' },
                            { id: `c3`, text: '大きくなかったです', romaji: 'ookikunakatta desu' },
                            { id: `c4`, text: '静かじゃないです', romaji: 'shizuka janai desu' }
                        ]
                    }]
                } as FillBlankProblem
            ],
            sentences: []
        });
    });

    // Group 4: Comparisons (19-24)
    const comparisons = [
        { p: 'より', mean: 'A is more [adj] than B', ex: '犬は猫より大きいです。', e: 'Dogs are bigger than cats.' },
        { p: 'のほうが', mean: 'A is more [adj]', ex: '犬のほうが大きいです。', e: 'Dogs are bigger.' },
        { p: '一番', mean: 'Number one / The most', ex: '犬が一番大きいです。', e: 'Dogs are the biggest.' },
        { p: '同じ', mean: 'Same', ex: 'AとBは同じです。', e: 'A and B are the same.' },
        { p: 'くらい', mean: 'About the same (as big as)', ex: 'AはBくらい大きいです。', e: 'A is about as big as B.' },
        { p: 'どちら', mean: 'Which one (between two)?', ex: 'どちらが大きいですか。', e: 'Which one is bigger?' },
    ];

    comparisons.forEach((comp, i) => {
        lessons.push({
            id: `grammar-comp-${i}`,
            worldId: 'grammar-1',
            title: `Comparison: ${comp.p}`,
            type: 'kana',
            xp: 250,
            content: [{
                type: 'grammar',
                title: `⚖️ ${comp.p}`,
                content: comp.mean,
                structure: [{ label: comp.ex, color: 'bg-blue-100 text-blue-700', example: comp.e }],
                exampleSentence: { japanese: comp.ex, romaji: '---', english: comp.e }
            }],
            fillBlanks: [
                {
                    id: `g-comp-${i}-1`,
                    japanese: comp.ex,
                    english: comp.e,
                    romaji: '---',
                    parts: ['_'],
                    blanks: [{
                        position: 0,
                        answer: comp.ex,
                        choices: [
                            { id: `c1`, text: comp.ex, romaji: '---' },
                            { id: `c2`, text: 'より', romaji: 'yori' },
                            { id: `c3`, text: '一番', romaji: 'ichiban' },
                            { id: `c4`, text: 'のほうが', romaji: 'no hou ga' }
                        ]
                    }]
                } as FillBlankProblem
            ],
            sentences: []
        });
    });

    // Group 5: Question Words (25-30)
    const questions = [
        { q: 'だれ', m: 'Who' }, { q: 'どこ', m: 'Where' }, { q: 'なに', m: 'What' },
        { q: 'いつ', m: 'When' }, { q: 'どう', m: 'How' }, { q: 'どんな', m: 'What kind of' }
    ];

    questions.forEach((q, i) => {
        lessons.push({
            id: `grammar-q-${i}`,
            worldId: 'grammar-1',
            title: `Question Word: ${q.q}`,
            type: 'kana',
            xp: 200,
            content: [{
                type: 'grammar',
                title: `❓ ${q.q} (${q.m})`,
                content: `Use ${q.q} when you want to ask '${q.m}'.`,
                structure: [],
                exampleSentence: { japanese: `${q.q}ですか？`, romaji: `${q.q} desu ka?`, english: `${q.m} is it?` }
            }],
            fillBlanks: [
                {
                    id: `g-q-${i}-1`,
                    japanese: `${q.q}ですか？`,
                    english: `${q.m} is it?`,
                    romaji: '---',
                    parts: ['_'],
                    blanks: [{
                        position: 0,
                        answer: `${q.q}ですか？`,
                        choices: [
                            { id: `c1`, text: `${q.q}ですか？`, romaji: '---' },
                            { id: `c2`, text: 'だれですか？', romaji: 'dare desu ka?' },
                            { id: `c3`, text: 'どこですか？', romaji: 'doko desu ka?' },
                            { id: `c4`, text: 'なにですか？', romaji: 'nani desu ka?' }
                        ]
                    }]
                } as FillBlankProblem
            ],
            sentences: []
        });
    });

    // Group 6: Counters (31-36)
    const counters = ['一つ (Hitotsu - generic)', '二つ (Futatsu)', '三つ (Mittsu)', '一人 (Hitori - people)', '一本 (Ippon - long items)', '一枚 (Ichimai - flat items)'];
    counters.forEach((cnt, i) => {
        lessons.push({
            id: `grammar-cnt-${i}`,
            worldId: 'grammar-1',
            title: `Counter: ${cnt.split(' ')[0]}`,
            type: 'kana',
            xp: 200,
            content: [{
                type: 'grammar',
                title: `🔢 Counter: ${cnt}`,
                content: `Japanese requires special 'counter' words depending on the shape or type of object being counted.`,
                structure: [],
                exampleSentence: { japanese: `${cnt.split(' ')[0]}ください。`, romaji: '---', english: `Please give me ${cnt.split(' ')[0]}.` }
            }],
            fillBlanks: [
                {
                    id: `g-cnt-${i}-1`,
                    japanese: `${cnt.split(' ')[0]}ください。`,
                    english: `Please give me ${cnt.split(' ')[0]}.`,
                    romaji: '---',
                    parts: ['_'],
                    blanks: [{
                        position: 0,
                        answer: `${cnt.split(' ')[0]}ください。`,
                        choices: [
                            { id: `c1`, text: `${cnt.split(' ')[0]}ください。`, romaji: '---' },
                            { id: `c2`, text: '一つください。', romaji: 'hitotsu kudasai' },
                            { id: `c3`, text: '二つください。', romaji: 'futatsu kudasai' },
                            { id: `c4`, text: '一人です。', romaji: 'hitori desu' }
                        ]
                    }]
                } as FillBlankProblem
            ],
            sentences: []
        });
    });

    // Group 7: Permissions (37-42)
    const permissions = ['てもいいですか (May I?)', 'てはいけません (You must not)', 'なければなりません (Must)', 'なくてもいいです (Don\'t have to)'];
    permissions.forEach((perm, i) => {
        lessons.push({
            id: `grammar-perm-${i}`,
            worldId: 'grammar-1',
            title: `Rules: ${perm.split(' ')[0]}`,
            type: 'kana',
            xp: 250,
            content: [{
                type: 'grammar',
                title: `📜 Rules & Permissions`,
                content: `Pattern: ${perm}`,
                structure: [],
                exampleSentence: { japanese: `し${perm.split('(')[0].trim()}`, romaji: '---', english: `I ${perm.match(/\((.*?)\)/)?.[1] || 'Rule'} do it.` }
            }],
            fillBlanks: [
                {
                    id: `g-perm-${i}-1`,
                    japanese: `し${perm.split('(')[0].trim()}`,
                    english: `I ${perm.match(/\((.*?)\)/)?.[1] || 'Rule'} do it.`,
                    romaji: '---',
                    parts: ['_'],
                    blanks: [{
                        position: 0,
                        answer: `し${perm.split('(')[0].trim()}`,
                        choices: [
                            { id: 'c1', text: `し${perm.split('(')[0].trim()}`, romaji: '---' },
                            { id: 'c2', text: 'だめ', romaji: 'dame' },
                            { id: 'c3', text: 'いいです', romaji: 'ii desu' },
                            { id: 'c4', text: 'はい', romaji: 'hai' }
                        ]
                    }]
                } as FillBlankProblem
            ],
            sentences: []
        });
    });

    // Fill the rest to 50 with Reasons & reviews
    const reasons = ['から (Because)', 'ので (Since/Because)', 'なぜなら (Because)', 'だから (Therefore)', 'しかし (However)', 'でも (But)'];
    reasons.forEach((rsn, i) => {
        lessons.push({
            id: `grammar-rsn-${i}`,
            worldId: 'grammar-1',
            title: `Conjunction: ${rsn.split(' ')[0]}`,
            type: 'kana',
            xp: 220,
            content: [{
                type: 'grammar',
                title: `🔗 Conjunctions`,
                content: `Using ${rsn}`,
                structure: [],
                exampleSentence: { japanese: `${rsn.split(' ')[0]}`, romaji: '---', english: `${rsn.match(/\((.*?)\)/)?.[1] || 'Rule'}` }
            }],
            fillBlanks: [
                {
                    id: `g-rsn-${i}-1`,
                    japanese: `${rsn.split(' ')[0]}`,
                    english: `${rsn.match(/\((.*?)\)/)?.[1] || 'Rule'}`,
                    romaji: '---',
                    parts: ['_'],
                    blanks: [{
                        position: 0,
                        answer: `${rsn.split(' ')[0]}`,
                        choices: [
                            { id: 'c1', text: `${rsn.split(' ')[0]}`, romaji: '---' },
                            { id: 'c2', text: 'から', romaji: 'kara' },
                            { id: 'c3', text: 'ので', romaji: 'node' },
                            { id: 'c4', text: 'でも', romaji: 'demo' }
                        ]
                    }]
                } as FillBlankProblem
            ],
            sentences: []
        });
    });

    // Boss Lesson
    lessons.push({
        id: 'grammar-boss',
        worldId: 'grammar-1',
        title: '⚔️ Grammar Forge Boss',
        type: 'adventure',
        xp: 1000,
        content: []
    });

    // Ensure 50 lessons total, padding with extra reviews if needed
    while (lessons.length < 50) {
        lessons.splice(lessons.length - 1, 0, {
            id: `grammar-review-${lessons.length}`,
            worldId: 'grammar-1',
            title: `Grammar Review ${lessons.length - 48}`,
            type: 'adventure',
            xp: 500,
            content: []
        });
    }

    return lessons.map((l, i) => ({ ...l, id: `lesson-g-${i + 1}`, originalId: l.id }));
};
