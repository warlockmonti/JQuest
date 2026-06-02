import type { LessonData, KanjiLogicSlide, FillBlankProblem } from './lessons';

// Basic Kanji Data
const kanjiList = [
    // Numbers (1-10)
    { k: '一', m: 'One', on: 'イチ, イツ', kun: 'ひと, ひとつ', ex: '一つ (ひとつ) - one thing' },
    { k: '二', m: 'Two', on: 'ニ', kun: 'ふた, ふたつ', ex: '二つ (ふたつ) - two things' },
    { k: '三', m: 'Three', on: 'サン', kun: 'み, みっつ', ex: '三つ (みっつ) - three things' },
    { k: '四', m: 'Four', on: 'シ', kun: 'よ, よっつ, よん', ex: '四つ (よっつ) - four things' },
    { k: '五', m: 'Five', on: 'ゴ', kun: 'いつ, いつつ', ex: '五つ (いつつ) - five things' },
    { k: '六', m: 'Six', on: 'ロク', kun: 'む, むっつ, むい', ex: '六つ (むっつ) - six things' },
    { k: '七', m: 'Seven', on: 'シチ', kun: 'なな, ななつ, なの', ex: '七つ (ななつ) - seven things' },
    { k: '八', m: 'Eight', on: 'ハチ', kun: 'や, やっつ, よう', ex: '八つ (やっつ) - eight things' },
    { k: '九', m: 'Nine', on: 'キュウ, ク', kun: 'ここの, ここのつ', ex: '九つ (ここのつ) - nine things' },
    { k: '十', m: 'Ten', on: 'ジュウ', kun: 'とお, と', ex: '十 (とお) - ten things' },

    // Time & Days (11-20)
    { k: '日', m: 'Sun/Day', on: 'ニチ, ジツ', kun: 'ひ, か', ex: '日曜日 (にちようび) - Sunday' },
    { k: '月', m: 'Moon/Month', on: 'ゲツ, ガツ', kun: 'つき', ex: '月曜日 (げつようび) - Monday' },
    { k: '火', m: 'Fire', on: 'カ', kun: 'ひ, ほ', ex: '火曜日 (かようび) - Tuesday' },
    { k: '水', m: 'Water', on: 'スイ', kun: 'みず', ex: '水曜日 (すいようび) - Wednesday' },
    { k: '木', m: 'Tree/Wood', on: 'モク, ボク', kun: 'き, こ', ex: '木曜日 (もくようび) - Thursday' },
    { k: '金', m: 'Gold/Money', on: 'キン, コン', kun: 'かね, かな', ex: '金曜日 (きんようび) - Friday' },
    { k: '土', m: 'Soil/Earth', on: 'ド, ト', kun: 'つち', ex: '土曜日 (どようび) - Saturday' },
    { k: '年', m: 'Year', on: 'ネン', kun: 'とし', ex: '今年 (ことし) - this year' },
    { k: '時', m: 'Time/Hour', on: 'ジ', kun: 'とき', ex: '時計 (とけい) - clock' },
    { k: '分', m: 'Minute/Understand', on: 'ブン, フン, ブ', kun: 'わ.かる, わ.ける', ex: '半分 (はんぶん) - half' },

    // Body & People (21-30)
    { k: '人', m: 'Person', on: 'ジン, ニン', kun: 'ひと', ex: '日本人 (にほんじん) - Japanese person' },
    { k: '口', m: 'Mouth', on: 'コウ, ク', kun: 'くち', ex: '入口 (いりぐち) - entrance' },
    { k: '目', m: 'Eye', on: 'モク, ボク', kun: 'め, ま', ex: '目薬 (めぐすり) - eye drops' },
    { k: '耳', m: 'Ear', on: 'ジ', kun: 'みみ', ex: '耳 (みみ) - ear' },
    { k: '手', m: 'Hand', on: 'シュ', kun: 'て', ex: '手紙 (てがみ) - letter' },
    { k: '足', m: 'Leg/Foot', on: 'ソク', kun: 'あし, た.りる', ex: '足 (あし) - foot/leg' },
    { k: '男', m: 'Man', on: 'ダン, ナン', kun: 'おとこ', ex: '男の人 (おとこのひと) - man' },
    { k: '女', m: 'Woman', on: 'ジョ', kun: 'おんな, め', ex: '女の人 (おんなのひと) - woman' },
    { k: '子', m: 'Child', on: 'シ, ス', kun: 'こ', ex: '子供 (こども) - child' },
    { k: '私', m: 'I/Private', on: 'シ', kun: 'わたし, わたくし', ex: '私 (わたし) - I, myself' },

    // Nature & Directions (31-40)
    { k: '山', m: 'Mountain', on: 'サン', kun: 'やま', ex: '富士山 (ふじさん) - Mt. Fuji' },
    { k: '川', m: 'River', on: 'セン', kun: 'かわ', ex: '川 (かわ) - river' },
    { k: '空', m: 'Sky/Empty', on: 'クウ', kun: 'そら, あ.く', ex: '空気 (くうき) - air' },
    { k: '田', m: 'Rice Field', on: 'デン', kun: 'た', ex: '水田 (すいでん) - paddy field' },
    { k: '雨', m: 'Rain', on: 'ウ', kun: 'あめ, あま', ex: '大雨 (おおあめ) - heavy rain' },
    { k: '上', m: 'Up/Above', on: 'ジョウ', kun: 'うえ, あ.がる', ex: '上 (うえ) - up/above' },
    { k: '下', m: 'Down/Below', on: 'カ, ゲ', kun: 'した, さ.がる', ex: '下 (した) - down/below' },
    { k: '左', m: 'Left', on: 'サ', kun: 'ひだり', ex: '左 (ひだり) - left' },
    { k: '右', m: 'Right', on: 'ウ, ユウ', kun: 'みぎ', ex: '右 (みぎ) - right' },
    { k: '中', m: 'Middle/Inside', on: 'チュウ', kun: 'なか', ex: '中国 (ちゅうごく) - China' },

    // Common Nouns/Adjectives (41-48)
    { k: '本', m: 'Book/Origin', on: 'ホン', kun: 'もと', ex: '日本 (にほん) - Japan' },
    { k: '学', m: 'Study/Learning', on: 'ガク', kun: 'まな.ぶ', ex: '学生 (がくせい) - student' },
    { k: '生', m: 'Life/Birth', on: 'セイ, ショウ', kun: 'い.きる, う.まれる', ex: '先生 (せんせい) - teacher' },
    { k: '大', m: 'Big', on: 'ダイ, タイ', kun: 'おお.きい', ex: '大きい (おおきい) - big' },
    { k: '小', m: 'Small', on: 'ショウ', kun: 'ちい.さい, こ, お', ex: '小さい (ちいさい) - small' },
    { k: '何', m: 'What', on: 'カ', kun: 'なに, なん', ex: '何か (なにか) - something' },
    { k: '行', m: 'Go', on: 'コウ, ギョウ', kun: 'い.く, ゆ.く, おこな.う', ex: '行く (いく) - go' },
    { k: '見', m: 'See/Look', on: 'ケン', kun: 'み.る, み.える', ex: '見る (みる) - see' },
    { k: '名', m: 'Name', on: 'メイ, ミョウ', kun: 'な', ex: '名前 (なまえ) - name' },
    { k: '前', m: 'Before', on: 'ゼン', kun: 'まえ', ex: '午前 (ごぜん) - A.M.' },
    { k: '後', m: 'After', on: 'ゴ, コウ', kun: 'のち, うしろ, あと', ex: '午後 (ごご) - P.M.' },
    { k: '午', m: 'Noon', on: 'ゴ', ex: '正午 (しょうご) - noon' },
    { k: '気', m: 'Spirit/Air', on: 'キ, ケ', kun: 'いき', ex: '元気 (げんき) - healthy' },
    { k: '電', m: 'Electricity', on: 'デン', ex: '電車 (でんしゃ) - train' },
    { k: '車', m: 'Car/Vehicle', on: 'シャ', kun: 'くるま', ex: '車 (くるま) - car' },
    { k: '茶', m: 'Tea', on: 'チャ, サ', ex: 'お茶 (おちゃ) - tea' },
    { k: '飯', m: 'Meal/Rice', on: 'ハン', kun: 'めし', ex: 'ご飯 (ごはん) - meal' },
    { k: '友', m: 'Friend', on: 'ユウ', kun: 'とも', ex: '友達 (ともだち) - friend' },
    { k: '父', m: 'Father', on: 'フ', kun: 'ちち, とう', ex: 'お父さん (おとうさん) - father' },
    { k: '母', m: 'Mother', on: 'ボ', kun: 'はは, かあ', ex: 'お母さん (おかあさん) - mother' }
];

export const generateKanjiLessons = (): LessonData[] => {
    const lessons: LessonData[] = [];

    kanjiList.forEach((kData, i) => {
        const kanjiWord = kData.ex.split(' ')[0]; // e.g., "一つ"
        const kanjiRomaji = kData.ex.match(/\((.*?)\)/)?.[1] || kanjiWord; // e.g., "ひとつ"
        const kanjiMeaning = kData.ex.split('- ')[1] || kData.m; // e.g., "one thing"

        const introSlides: KanjiLogicSlide[] = i === 0 ? [{
            type: 'kanji-logic',
            title: 'Welcome to Kanji Chronicles',
            kanji: '漢字',
            meaning: 'Chinese Characters',
            description: 'Kanji represent meanings and concepts, unlike Hiragana/Katakana which represent sounds. Most Kanji have Chinese readings (On-yomi) and Japanese readings (Kun-yomi).',
            parts: [],
            reading: { on: 'カンジ', kun: '' },
            example: { word: '漢字', romaji: 'kanji', meaning: 'Chinese Characters' }
        }] : [];

        lessons.push({
            id: `kanji-${i}`,
            worldId: 'kanji-1',
            title: `Kanji: ${kData.k} (${kData.m})`,
            type: 'kana',
            xp: 250,
            content: [
                ...introSlides,
                {
                    type: 'kanji-logic',
                    title: `Kanji: ${kData.k}`,
                    kanji: kData.k,
                    meaning: kData.m,
                    description: `Learn the kanji for "${kData.m}".`,
                    parts: [], // Would normally have radical breakdowns here
                    reading: { on: kData.on, kun: kData.kun },
                    example: { word: kanjiWord, romaji: kanjiRomaji, meaning: kanjiMeaning }
                }
            ],
            fillBlanks: [
                {
                    id: `k-f-${i}-1`,
                    japanese: kanjiWord,
                    english: kanjiMeaning,
                    romaji: kanjiRomaji,
                    parts: ['_'],
                    blanks: [{
                        position: 0,
                        answer: kanjiWord,
                        choices: [
                            { id: 'c1', text: kanjiWord, romaji: kanjiRomaji },
                            { id: 'c2', text: kanjiList[(i + 1) % kanjiList.length].k, romaji: '---' },
                            { id: 'c3', text: kanjiList[(i + 2) % kanjiList.length].k, romaji: '---' },
                            { id: 'c4', text: kanjiList[(i + 3) % kanjiList.length].k, romaji: '---' }
                        ].sort(() => 0.5 - Math.random()) // Shuffle choices
                    }]
                } as FillBlankProblem
            ],
            sentences: []
        });
    });

    // We have 48 individual kanji. Let's add 2 review/boss lessons to reach 50.
    lessons.push({
        id: 'kanji-review-1',
        worldId: 'kanji-1',
        title: 'Kanji Review',
        type: 'adventure',
        xp: 500,
        content: []
    });

    lessons.push({
        id: 'kanji-boss',
        worldId: 'kanji-1',
        title: '⚔️ Kanji Boss Gauntlet',
        type: 'adventure',
        xp: 1000,
        content: []
    });

    return lessons.map((l, i) => ({ ...l, id: `lesson-k-${i + 1}`, originalId: l.id }));
};
