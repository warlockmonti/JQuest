export interface Kana {
    char: string;
    romaji: string;
    type: 'hiragana' | 'katakana';
    mnemonic?: string;
    examples?: {
        word: string;
        meaning: string;
        common?: string;
    }[];
}

export const hiragana: Kana[] = [
    // ─── Lesson 1: こんにちは (Hello!) ──────────────────────────────────────────
    {
        char: 'こ', romaji: 'ko', type: 'hiragana',
        mnemonic: 'Two Co-habiting snakes coiled together.',
        examples: [
            { word: 'こんにちは (konnichiwa)', meaning: 'Hello / Good afternoon' },
            { word: 'こえ (koe)', meaning: 'Voice' }
        ]
    },
    {
        char: 'ん', romaji: 'n', type: 'hiragana',
        mnemonic: 'An N-shaped stepping stone in a stream.',
        examples: [
            { word: 'こんにちは (konnichiwa)', meaning: 'Hello — the ん is silent nasal!' },
            { word: 'ほん (hon)', meaning: 'Book' }
        ]
    },
    {
        char: 'に', romaji: 'ni', type: 'hiragana',
        mnemonic: 'A kNee with a bandage on it.',
        examples: [
            { word: 'にほん (nihon)', meaning: 'Japan', common: '日本' },
            { word: 'にく (niku)', meaning: 'Meat', common: '肉' }
        ]
    },
    {
        char: 'ち', romaji: 'chi', type: 'hiragana',
        mnemonic: 'A Cheerleader waving her pom-poms up high.',
        examples: [
            { word: 'ちかてつ (chikatetsu)', meaning: 'Subway' },
            { word: 'ちず (chizu)', meaning: 'Map' }
        ]
    },

    // ─── Lesson 2: さようなら (Goodbye) ──────────────────────────────────────────
    {
        char: 'は', romaji: 'ha/wa', type: 'hiragana',
        mnemonic: 'A Ha-ha laughing mouth, wide open.',
        examples: [
            { word: 'はじめまして (hajimemashite)', meaning: 'Nice to meet you (first time)' },
            { word: 'はな (hana)', meaning: 'Flower / Nose' }
        ]
    },
    {
        char: 'わ', romaji: 'wa', type: 'hiragana',
        mnemonic: 'A Waffle with a syrup drizzle down the side.',
        examples: [
            { word: 'わたし (watashi)', meaning: 'I / Me', common: '私' },
            { word: 'わかる (wakaru)', meaning: 'To understand', common: '分かる' }
        ]
    },
    {
        char: 'さ', romaji: 'sa', type: 'hiragana',
        mnemonic: 'A Samurai sword crossed over a belt.',
        examples: [
            { word: 'さようなら (sayounara)', meaning: 'Goodbye' },
            { word: 'さくら (sakura)', meaning: 'Cherry blossom' }
        ]
    },
    {
        char: 'よ', romaji: 'yo', type: 'hiragana',
        mnemonic: 'A Yo-yo bobbing nicely on a string.',
        examples: [
            { word: 'よろしく (yoroshiku)', meaning: 'Nice to meet you / Best regards' },
            { word: 'よる (yoru)', meaning: 'Night' }
        ]
    },

    // ─── Lesson 3: おはようございます (Good Morning) ─────────────────────────────
    {
        char: 'な', romaji: 'na', type: 'hiragana',
        mnemonic: 'kNitting needles crossed over a ball of yarn.',
        examples: [
            { word: 'なまえ (namae)', meaning: 'Name', common: '名前' },
            { word: 'なつ (natsu)', meaning: 'Summer', common: '夏' }
        ]
    },
    {
        char: 'う', romaji: 'u', type: 'hiragana',
        mnemonic: 'A heavy weight pulling U straight down.',
        examples: [
            { word: 'うれしい (ureshii)', meaning: 'Happy / Glad' },
            { word: 'うみ (umi)', meaning: 'Sea', common: '海' }
        ]
    },
    {
        char: 'ら', romaji: 'ra', type: 'hiragana',
        mnemonic: 'A rabbit running with its long ears streaming behind.',
        examples: [
            { word: 'らいねん (rainen)', meaning: 'Next year' },
            { word: 'らく (raku)', meaning: 'Easy / Comfortable' }
        ]
    },
    {
        char: 'お', romaji: 'o', type: 'hiragana',
        mnemonic: 'An Onigiri (rice ball) sitting on a plate.',
        examples: [
            { word: 'おはよう (ohayou)', meaning: 'Good morning' },
            { word: 'おちゃ (ocha)', meaning: 'Green tea', common: 'お茶' }
        ]
    },

    // ─── Lesson 4: ありがとう (Thank You) ─────────────────────────────────────────
    {
        char: 'あ', romaji: 'a', type: 'hiragana',
        mnemonic: 'Looks like an Apple with a curvy stem.',
        examples: [
            { word: 'ありがとう (arigatou)', meaning: 'Thank you' },
            { word: 'あいさつ (aisatsu)', meaning: 'Greeting' }
        ]
    },
    {
        char: 'り', romaji: 'ri', type: 'hiragana',
        mnemonic: 'Two Reeds bending gracefully in the wind.',
        examples: [
            { word: 'りかい (rikai)', meaning: 'Understanding' },
            { word: 'りんご (ringo)', meaning: 'Apple' }
        ]
    },
    {
        char: 'と', romaji: 'to', type: 'hiragana',
        mnemonic: 'A Totem pole with a big spike on the side.',
        examples: [
            { word: 'ともだち (tomodachi)', meaning: 'Friend' },
            { word: 'とけい (tokei)', meaning: 'Clock' }
        ]
    },
    {
        char: 'が', romaji: 'ga', type: 'hiragana',
        mnemonic: 'か with extra energy — it shouts GA!',
        examples: [
            { word: 'がんばって (ganbatte)', meaning: 'Good luck / Do your best!' },
            { word: 'がっこう (gakkou)', meaning: 'School' }
        ]
    },

    // ─── Lesson 5: おげんきですか (Politeness) ───────────────────────────────────
    {
        char: 'い', romaji: 'i', type: 'hiragana',
        mnemonic: 'Two Eels swimming side by side in a stream.',
        examples: [
            { word: 'いいえ (iie)', meaning: 'No' },
            { word: 'いただきます (itadakimasu)', meaning: 'Bon appétit / I humbly receive' }
        ]
    },
    {
        char: 'え', romaji: 'e', type: 'hiragana',
        mnemonic: 'An energetic ninja frozen mid-sprint.',
        examples: [
            { word: 'えと (eto)', meaning: 'Umm / Let me think…' },
            { word: 'えき (eki)', meaning: 'Train station', common: '駅' }
        ]
    },
    {
        char: 'で', romaji: 'de', type: 'hiragana',
        mnemonic: 'て with extra rumble — now it says DE.',
        examples: [
            { word: 'でも (demo)', meaning: 'But / However' },
            { word: 'でんわ (denwa)', meaning: 'Telephone', common: '電話' }
        ]
    },
    {
        char: 'す', romaji: 'su', type: 'hiragana',
        mnemonic: 'A Sumo wrestler spinning in the ring.',
        examples: [
            { word: 'すみません (sumimasen)', meaning: 'Excuse me / I am sorry' },
            { word: 'すし (sushi)', meaning: 'Sushi', common: '寿司' }
        ]
    },

    // ─── Lesson 6: か, ご, げ, じ ───────────────────
    {
        char: 'か', romaji: 'ka', type: 'hiragana',
        mnemonic: 'Cutting a carrot with a knife — KA!',
        examples: [
            { word: 'かえる (kaeru)', meaning: 'To go home / Frog' },
            { word: 'かに (kani)', meaning: 'Crab' }
        ]
    },
    {
        char: 'ご', romaji: 'go', type: 'hiragana',
        mnemonic: 'こ with an extra mark — now it sounds like GO!',
        examples: [
            { word: 'ごめんなさい (gomennasai)', meaning: 'I am sorry' },
            { word: 'ごはん (gohan)', meaning: 'Rice / Meal' }
        ]
    },
    {
        char: 'げ', romaji: 'ge', type: 'hiragana',
        mnemonic: 'け with extra vibration — now it sounds like GE!',
        examples: [
            { word: 'げんき (genki)', meaning: 'Healthy / Energetic / Fine' },
            { word: 'げすいどう (gesuidou)', meaning: 'Sewage / Drain' }
        ]
    },
    {
        char: 'じ', romaji: 'ji', type: 'hiragana',
        mnemonic: 'し with a buzz mark — now it makes a ZHI sound.',
        examples: [
            { word: 'じかん (jikan)', meaning: 'Time' },
            { word: 'じしょ (jisho)', meaning: 'Dictionary' }
        ]
    },

    // ─── Lesson 7: め, ま, し, け ───────────────────────
    {
        char: 'め', romaji: 'me', type: 'hiragana',
        mnemonic: 'An eye (め = "me" in Japanese!).',
        examples: [
            { word: 'めがね (megane)', meaning: 'Glasses' },
            { word: 'めいわく (meiwaku)', meaning: 'Nuisance / Inconvenience' }
        ]
    },
    {
        char: 'ま', romaji: 'ma', type: 'hiragana',
        mnemonic: 'Mama hanging laundry on a line.',
        examples: [
            { word: 'まあまあ (maa maa)', meaning: 'So-so / Not bad' },
            { word: 'まど (mado)', meaning: 'Window', common: '窓' }
        ]
    },
    {
        char: 'し', romaji: 'shi', type: 'hiragana',
        mnemonic: 'A fishhook with a long curling tail.',
        examples: [
            { word: 'しつれい (shitsurei)', meaning: 'Excuse me / Rude' },
            { word: 'しごと (shigoto)', meaning: 'Work / Job', common: '仕事' }
        ]
    },
    {
        char: 'け', romaji: 'ke', type: 'hiragana',
        mnemonic: 'A Keg of beer with a tap sticking out.',
        examples: [
            { word: 'けっこうです (kekkou desu)', meaning: 'No, thank you / That will do' },
            { word: 'けむり (kemuri)', meaning: 'Smoke' }
        ]
    },

    // ─── Lesson 8: て, き, た, だ ─────────────────────────
    {
        char: 'て', romaji: 'te', type: 'hiragana',
        mnemonic: 'A Television antenna sitting on a rooftop.',
        examples: [
            { word: 'てがみ (tegami)', meaning: 'Letter (mail)', common: '手紙' },
            { word: 'てら (tera)', meaning: 'Temple', common: '寺' }
        ]
    },
    {
        char: 'き', romaji: 'ki', type: 'hiragana',
        mnemonic: 'A Key sticking out of a lock, ready to turn.',
        examples: [
            { word: 'きもち (kimochi)', meaning: 'Feeling / Mood' },
            { word: 'きつね (kitsune)', meaning: 'Fox' }
        ]
    },
    {
        char: 'た', romaji: 'ta', type: 'hiragana',
        mnemonic: 'A Taco with a flag on top.',
        examples: [
            { word: 'たべる (taberu)', meaning: 'To eat', common: '食べる' },
            { word: 'たのしい (tanoshii)', meaning: 'Fun / Enjoyable', common: '楽しい' }
        ]
    },
    {
        char: 'だ', romaji: 'da', type: 'hiragana',
        mnemonic: 'た with extra vibration — DA, like a drum beat!',
        examples: [
            { word: 'だいじょうぶ (daijoubu)', meaning: 'I am fine / It is okay' },
            { word: 'だれ (dare)', meaning: 'Who?' }
        ]
    },

    // ─── Lesson 9: つ, ず, ほ, も ──────────────────────────────────────
    {
        char: 'つ', romaji: 'tsu', type: 'hiragana',
        mnemonic: 'A Tsunami wave curling powerfully over.',
        examples: [
            { word: 'つかれました (tsukaremashita)', meaning: 'I am tired' },
            { word: 'つき (tsuki)', meaning: 'Moon', common: '月' }
        ]
    },
    {
        char: 'ず', romaji: 'zu', type: 'hiragana',
        mnemonic: 'す with a buzz — now it sounds like ZU.',
        examples: [
            { word: 'ずっと (zutto)', meaning: 'All along / Always' },
            { word: 'ずこう (zukou)', meaning: 'Art class' }
        ]
    },
    {
        char: 'ほ', romaji: 'ho', type: 'hiragana',
        mnemonic: 'Ho-ho-ho! Santa Claus with outstretched arms.',
        examples: [
            { word: 'ほんとう (hontou)', meaning: 'Truth / Really', common: '本当' },
            { word: 'ほし (hoshi)', meaning: 'Star', common: '星' }
        ]
    },
    {
        char: 'も', romaji: 'mo', type: 'hiragana',
        mnemonic: 'More! Two hooks fishing in a pond.',
        examples: [
            { word: 'わたしも (watashi mo)', meaning: 'Me too!' },
            { word: 'もち (mochi)', meaning: 'Rice cake' }
        ]
    },

    // ─── Lesson 10: く, や, み, ゆ ─────────────────────────────────
    {
        char: 'く', romaji: 'ku', type: 'hiragana',
        mnemonic: "A Cuckoo bird's open beak pointing right.",
        examples: [
            { word: 'ください (kudasai)', meaning: 'Please give me / Please do' },
            { word: 'くるま (kuruma)', meaning: 'Car', common: '車' }
        ]
    },
    {
        char: 'や', romaji: 'ya', type: 'hiragana',
        mnemonic: 'A Yacht sailing swiftly across the sea.',
        examples: [
            { word: 'おやすみ (oyasumi)', meaning: 'Good night' },
            { word: 'やさしい (yasashii)', meaning: 'Kind / Gentle' }
        ]
    },
    {
        char: 'み', romaji: 'mi', type: 'hiragana',
        mnemonic: 'Me, waving with two wiggling fingers!',
        examples: [
            { word: 'みんな (minna)', meaning: 'Everyone' },
            { word: 'みず (mizu)', meaning: 'Water' }
        ]
    },
    {
        char: 'ゆ', romaji: 'yu', type: 'hiragana',
        mnemonic: 'You-nicorn with a single swirly horn.',
        examples: [
            { word: 'ゆっくり (yukkuri)', meaning: 'Slowly / Take your time' },
            { word: 'ゆめ (yume)', meaning: 'Dream', common: '夢' }
        ]
    },

    // ─── Lesson 11: る, を, そ, せ ──────────────────────────────────
    {
        char: 'る', romaji: 'ru', type: 'hiragana',
        mnemonic: 'A Road curving off into the distant horizon.',
        examples: [
            { word: 'るす (rusu)', meaning: 'Absence from home' },
            { word: 'るーむ (ruumu)', meaning: 'Room (loanword)' }
        ]
    },
    {
        char: 'を', romaji: 'wo', type: 'hiragana',
        mnemonic: 'A Worrywart crossing their arms nervously.',
        examples: [
            { word: 'を (wo)', meaning: 'Object marker particle' },
            { word: 'おねがいをする (onegai wo suru)', meaning: 'To make a request' }
        ]
    },
    {
        char: 'そ', romaji: 'so', type: 'hiragana',
        mnemonic: 'A So-so squiggly S that goes up then down.',
        examples: [
            { word: 'そうですね (sou desu ne)', meaning: "That's right, isn't it!" },
            { word: 'そら (sora)', meaning: 'Sky', common: '空' }
        ]
    },
    {
        char: 'せ', romaji: 'se', type: 'hiragana',
        mnemonic: 'A person saying "Say!" with arms outstretched.',
        examples: [
            { word: 'せんせい (sensei)', meaning: 'Teacher', common: '先生' },
            { word: 'せなか (senaka)', meaning: 'Back (of body)', common: '背中' }
        ]
    },

    // ─── Lesson 12: ぞ, へ, の, ぬ ───────────────────────────────────────
    {
        char: 'ぞ', romaji: 'zo', type: 'hiragana',
        mnemonic: 'そ with a buzz — ZO, like a buzz-saw!',
        examples: [
            { word: 'どうぞよろしく (douzo yoroshiku)', meaning: 'Please treat me well' },
            { word: 'ぞう (zou)', meaning: 'Elephant' }
        ]
    },
    {
        char: 'へ', romaji: 'he', type: 'hiragana',
        mnemonic: 'A mountain peak — "Hey, look up here!"',
        examples: [
            { word: 'へや (heya)', meaning: 'Room', common: '部屋' },
            { word: 'へんじ (へんじ)', meaning: 'Reply / Response' }
        ]
    },
    {
        char: 'の', romaji: 'no', type: 'hiragana',
        mnemonic: 'A Knot tied in a piece of rope.',
        examples: [
            { word: 'なまえのかき (namae no kaki)', meaning: 'Writing of name (possessive の!)' },
            { word: 'のり (nori)', meaning: 'Seaweed' }
        ]
    },
    {
        char: 'ぬ', romaji: 'nu', type: 'hiragana',
        mnemonic: 'Noodles being swirled around a fork.',
        examples: [
            { word: 'ぬるい (nurui)', meaning: 'Lukewarm / Tepid' },
            { word: 'ぬの (nuno)', meaning: 'Cloth / Fabric', common: '布' }
        ]
    },

    // ─── Lesson 13: ひ, ろ, む, ふ ───────────────────────────────────────────
    {
        char: 'ひ', romaji: 'hi', type: 'hiragana',
        mnemonic: 'He smiles broadly with a wide grin.',
        examples: [
            { word: 'ひと (hito)', meaning: 'Person / People', common: '人' },
            { word: 'ひかり (hikari)', meaning: 'Light', common: '光' }
        ]
    },
    {
        char: 'ろ', romaji: 'ro', type: 'hiragana',
        mnemonic: 'A Rowing oar cutting through the water.',
        examples: [
            { word: 'ろく (roku)', meaning: 'Six' },
            { word: 'ろうか (rouka)', meaning: 'Hallway / Corridor' }
        ]
    },
    {
        char: 'む', romaji: 'mu', type: 'hiragana',
        mnemonic: "A Moo-ing cow's face looking at you!",
        examples: [
            { word: 'むり (muri)', meaning: 'Impossible / Impossible!', common: '無理' },
            { word: 'むし (mushi)', meaning: 'Bug / Insect', common: '虫' }
        ]
    },
    {
        char: 'ふ', romaji: 'fu', type: 'hiragana',
        mnemonic: 'Fuji mountain with wisps of cloud around it.',
        examples: [
            { word: 'ふつう (futsuu)', meaning: 'Ordinary / Usual / Fine' },
            { word: 'ふゆ (fuyu)', meaning: 'Winter' }
        ]
    },

    // ─── Lesson 14: ど, れ, ね, ぺ ───────────────────────────────────────
    {
        char: 'ど', romaji: 'do', type: 'hiragana',
        mnemonic: 'と with a buzz — DO, like a drum!',
        examples: [
            { word: 'どうぞ (douzo)', meaning: 'Please go ahead / Here you are' },
            { word: 'どこ (doko)', meaning: 'Where?' }
        ]
    },
    {
        char: 'れ', romaji: 're', type: 'hiragana',
        mnemonic: 'A Ray of sunlight breaking through a cloud.',
        examples: [
            { word: 'れんしゅう (renshuu)', meaning: 'Practice / Training' },
            { word: 'れい (rei)', meaning: 'Zero / Example / Bow' }
        ]
    },
    {
        char: 'ね', romaji: 'ne', type: 'hiragana',
        mnemonic: 'A cat curled up for a cozy Nap.',
        examples: [
            { word: 'ねがい (negai)', meaning: 'Wish / Request', common: '願い' },
            { word: 'ねこ (neko)', meaning: 'Cat', common: '猫' }
        ]
    },
    {
        char: 'ぺ', romaji: 'pe', type: 'hiragana',
        mnemonic: 'A half-circle with a dot — like a flower petal!',
        examples: [
            { word: 'ぺらぺら (pera pera)', meaning: 'Fluent / Chatterbox' },
            { word: 'ぺん (pen)', meaning: 'Pen' }
        ]
    },
    // ─── Missing Dakuon ───────────────────────────────────────────────────────
    {
        char: 'ぎ', romaji: 'gi', type: 'hiragana',
        mnemonic: 'き with a buzz — GI, like a guitar string!',
        examples: [{ word: 'ぎんこう (ginkou)', meaning: 'Bank' }, { word: 'かき (kagi)', meaning: 'Key' }]
    },
    {
        char: 'ぐ', romaji: 'gu', type: 'hiragana',
        mnemonic: 'く with energy — GU, like a growl!',
        examples: [{ word: 'ぐんま (gunma)', meaning: 'Gunma (prefecture)' }, { word: 'かぐ (kagu)', meaning: 'Furniture' }]
    },
    {
        char: 'ざ', romaji: 'za', type: 'hiragana',
        mnemonic: 'さ with a buzz — ZA, like a zigzag!',
        examples: [{ word: 'ざっし (zasshi)', meaning: 'Magazine' }, { word: 'ひざ (hiza)', meaning: 'Knee' }]
    },
    {
        char: 'ぜ', romaji: 'ze', type: 'hiragana',
        mnemonic: 'せ with energy — ZE, like a zealot!',
        examples: [{ word: 'ぜんぜん (zenzen)', meaning: 'Not at all' }, { word: 'かぜ (kaze)', meaning: 'Wind / Cold' }]
    },
    {
        char: 'ぢ', romaji: 'di', type: 'hiragana',
        mnemonic: 'ち with a buzz — JI/DI sound.',
        examples: [{ word: 'はなぢ (hanadi)', meaning: 'Nosebleed' }, { word: 'ちぢむ (chidimu)', meaning: 'To shrink' }]
    },
    {
        char: 'づ', romaji: 'du', type: 'hiragana',
        mnemonic: 'つ with energy — ZU/DU sound.',
        examples: [{ word: 'つづく (tsuduku)', meaning: 'To continue' }, { word: 'てづくり (tedukuri)', meaning: 'Handmade' }]
    },
    {
        char: 'ば', romaji: 'ba', type: 'hiragana',
        mnemonic: 'は with a buzz — BA, like a ball!',
        examples: [{ word: 'ばんごう (bangou)', meaning: 'Number' }, { word: 'そば (soba)', meaning: 'Soba noodles' }]
    },
    {
        char: 'び', romaji: 'bi', type: 'hiragana',
        mnemonic: 'ひ with energy — BI, like a bee!',
        examples: [{ word: 'びじゅつ (bijutsu)', meaning: 'Art' }, { word: 'てび (tebi)', meaning: 'TV (rare variant)' }]
    },
    {
        char: 'ぶ', romaji: 'bu', type: 'hiragana',
        mnemonic: 'ふ with a buzz — BU, like a boot!',
        examples: [{ word: 'ぶんか (bunka)', meaning: 'Culture' }, { word: 'あぶない (abunai)', meaning: 'Dangerous' }]
    },
    {
        char: 'べ', romaji: 'be', type: 'hiragana',
        mnemonic: 'へ with energy — BE, like a bell!',
        examples: [{ word: 'べんきょう (benkyou)', meaning: 'Study' }, { word: 'たべもの (tabemono)', meaning: 'Food' }]
    },
    {
        char: 'ぼ', romaji: 'bo', type: 'hiragana',
        mnemonic: 'ほ with a buzz — BO, like a boat!',
        examples: [{ word: 'ぼうし (boushi)', meaning: 'Hat' }, { word: 'たぼう (tabou)', meaning: 'Busy' }]
    },
    {
        char: 'ぱ', romaji: 'pa', type: 'hiragana',
        mnemonic: 'は with a pop — PA, like a party!',
        examples: [{ word: 'ぱん (pan)', meaning: 'Bread' }, { word: 'かっぱ (kappa)', meaning: 'Kappa (folklore)' }]
    },
    {
        char: 'ぴ', romaji: 'pi', type: 'hiragana',
        mnemonic: 'ひ with a pop — PI, like a pin!',
        examples: [{ word: 'ぴかぴか (pikapika)', meaning: 'Shiny' }, { word: 'えんぴつ (enpitsu)', meaning: 'Pencil' }]
    },
    {
        char: 'ぷ', romaji: 'pu', type: 'hiragana',
        mnemonic: 'ふ with a pop — PU, like a puff!',
        examples: [{ word: 'ぷんぷん (punpun)', meaning: 'Angry / Smelly' }, { word: 'てんぷら (tenpura)', meaning: 'Tempura' }]
    },
    {
        char: 'ぽ', romaji: 'po', type: 'hiragana',
        mnemonic: 'ほ with a pop — PO, like a post!',
        examples: [{ word: 'ぽすと (posuto)', meaning: 'Post box' }, { word: 'さんぽ (sanpo)', meaning: 'Walk / Stroll' }]
    },
    // ─── Yoon (Combo Sounds) ──────────────────────────────────────────────────
    { char: 'きゃ', romaji: 'kya', type: 'hiragana', mnemonic: 'ki + small ya', examples: [{ word: 'きゃく (kyaku)', meaning: 'Guest' }] },
    { char: 'きゅ', romaji: 'kyu', type: 'hiragana', mnemonic: 'ki + small yu', examples: [{ word: 'きゅうり (kyuuri)', meaning: 'Cucumber' }] },
    { char: 'きょ', romaji: 'kyo', type: 'hiragana', mnemonic: 'ki + small yo', examples: [{ word: 'きょう (kyou)', meaning: 'Today' }] },
    { char: 'しゃ', romaji: 'sha', type: 'hiragana', mnemonic: 'shi + small ya', examples: [{ word: 'しゃしん (shashin)', meaning: 'Photo' }] },
    { char: 'しゅ', romaji: 'shu', type: 'hiragana', mnemonic: 'shi + small yu', examples: [{ word: 'しゅくだい (shukudai)', meaning: 'Homework' }] },
    { char: 'しょ', romaji: 'sho', type: 'hiragana', mnemonic: 'shi + small yo', examples: [{ word: 'しょくどう (shokudou)', meaning: 'Dining hall' }] },
    { char: 'ちゃ', romaji: 'cha', type: 'hiragana', mnemonic: 'chi + small ya', examples: [{ word: 'おちゃ (ocha)', meaning: 'Tea' }] },
    { char: 'ちゅ', romaji: 'chu', type: 'hiragana', mnemonic: 'chi + small yu', examples: [{ word: 'ちゅうごく (chuugoku)', meaning: 'China' }] },
    { char: 'ちょ', romaji: 'cho', type: 'hiragana', mnemonic: 'chi + small yo', examples: [{ word: 'ちょこ (choko)', meaning: 'Chocolate' }] },
    { char: 'にゃ', romaji: 'nya', type: 'hiragana', mnemonic: 'ni + small ya', examples: [{ word: 'こんにゃく (konnyaku)', meaning: 'Konnyaku' }] },
    { char: 'にゅ', romaji: 'nyu', type: 'hiragana', mnemonic: 'ni + small yu', examples: [{ word: 'にゅうがく (nyuugaku)', meaning: 'Admission' }] },
    { char: 'にょ', romaji: 'nyo', type: 'hiragana', mnemonic: 'ni + small yo', examples: [{ word: 'にょろにょろ (nyoronyoro)', meaning: 'Wriggling' }] },
    { char: 'ひゃ', romaji: 'hya', type: 'hiragana', mnemonic: 'hi + small ya', examples: [{ word: 'ひゃく (hyaku)', meaning: 'Hundred' }] },
    { char: 'ひゅ', romaji: 'hyu', type: 'hiragana', mnemonic: 'hi + small yu', examples: [{ word: 'ひゅうひゅう (hyuuhyuu)', meaning: 'Whistling wind' }] },
    { char: 'ひょ', romaji: 'hyo', type: 'hiragana', mnemonic: 'hi + small yo', examples: [{ word: 'ひょう (hyou)', meaning: 'Leopard / Hail' }] },
    { char: 'みゃ', romaji: 'mya', type: 'hiragana', mnemonic: 'mi + small ya', examples: [{ word: 'みゃく (myaku)', meaning: 'Pulse' }] },
    { char: 'みゅ', romaji: 'myu', type: 'hiragana', mnemonic: 'mi + small yu', examples: [{ word: 'みゅーじあむ (myuujiamu)', meaning: 'Museum' }] },
    { char: 'みょ', romaji: 'myo', type: 'hiragana', mnemonic: 'mi + small yo', examples: [{ word: 'みょうじ (myouji)', meaning: 'Surname' }] },
    { char: 'りゃ', romaji: 'rya', type: 'hiragana', mnemonic: 'ri + small ya', examples: [{ word: 'りゃく (ryaku)', meaning: 'Abbreviation' }] },
    { char: 'りゅ', romaji: 'ryu', type: 'hiragana', mnemonic: 'ri + small yu', examples: [{ word: 'りゅう (ryuu)', meaning: 'Dragon' }] },
    { char: 'りょ', romaji: 'ryo', type: 'hiragana', mnemonic: 'ri + small yo', examples: [{ word: 'りょこう (ryokou)', meaning: 'Travel' }] },
    { char: 'ぎゃ', romaji: 'gya', type: 'hiragana', mnemonic: 'gi + small ya', examples: [{ word: 'ぎゃく (gyaku)', meaning: 'Reverse' }] },
    { char: 'ぎゅ', romaji: 'gyu', type: 'hiragana', mnemonic: 'gi + small yu', examples: [{ word: 'ぎゅうにゅう (gyuunyuu)', meaning: 'Milk' }] },
    { char: 'ぎょ', romaji: 'gyo', type: 'hiragana', mnemonic: 'gi + small yo', examples: [{ word: 'ぎょえ (gyoe)', meaning: 'Gasp!' }] },
    { char: 'じゃ', romaji: 'ja', type: 'hiragana', mnemonic: 'ji + small ya', examples: [{ word: 'じゃあ (jaa)', meaning: 'Well then' }] },
    { char: 'じゅ', romaji: 'ju', type: 'hiragana', mnemonic: 'ji + small yu', examples: [{ word: 'じゅん备 (junbi)', meaning: 'Preparation' }] },
    { char: 'じょ', romaji: 'jo', type: 'hiragana', mnemonic: 'ji + small yo', examples: [{ word: 'じょおう (joou)', meaning: 'Queen' }] },
    { char: 'ぢゃ', romaji: 'dya', type: 'hiragana', mnemonic: 'di + small ya', examples: [{ word: 'ぢゃ (dya)', meaning: 'Rare sound' }] },
    { char: 'ぢゅ', romaji: 'dyu', type: 'hiragana', mnemonic: 'di + small yu', examples: [{ word: 'ぢゅ (dyu)', meaning: 'Rare sound' }] },
    { char: 'ぢょ', romaji: 'dyo', type: 'hiragana', mnemonic: 'di + small yo', examples: [{ word: 'ぢょ (dyo)', meaning: 'Rare sound' }] },
    { char: 'びゃ', romaji: 'bya', type: 'hiragana', mnemonic: 'bi + small ya', examples: [{ word: 'びゃく (byaku)', meaning: 'White (rare)' }] },
    { char: 'びゅ', romaji: 'byu', type: 'hiragana', mnemonic: 'bi + small yu', examples: [{ word: 'びゅんびゅん (byunbyun)', meaning: 'Whizzing' }] },
    { char: 'びょ', romaji: 'byo', type: 'hiragana', mnemonic: 'bi + small yo', examples: [{ word: 'びょうき (byouki)', meaning: 'Illness' }] },
    { char: 'ぴゃ', romaji: 'pya', type: 'hiragana', mnemonic: 'pi + small ya', examples: [{ word: 'ぴゃく (pyaku)', meaning: 'Rare sound' }] },
    { char: 'ぴゅ', romaji: 'pyu', type: 'hiragana', mnemonic: 'pi + small yu', examples: [{ word: 'ぴゅあ (pyua)', meaning: 'Pure' }] },
    { char: 'ぴょ', romaji: 'pyo', type: 'hiragana', mnemonic: 'pi + small yo', examples: [{ word: 'ぴょんぴょん (pyonpyon)', meaning: 'Hopping' }] },
];

export const katakana: Kana[] = [
    // â”€â”€â”€ Vowels: ã‚¢, ã‚¤, ã‚¦, ã‚¨, ã‚ª â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ã‚¢', romaji: 'a', type: 'katakana', mnemonic: 'An Axe hacking into a tree â€” pointy A!', examples: [{ word: 'ã‚¢ã‚¤ã‚¹ (aisu)', meaning: 'Ice cream' }, { word: 'ã‚¢ãƒ•ãƒªã‚« (Afurika)', meaning: 'Africa' }] },
    { char: 'ã‚¤', romaji: 'i', type: 'katakana', mnemonic: 'An Eagle â€” two strokes like a diving bird.', examples: [{ word: 'ã‚¤ãƒ³ã‚¯ (inku)', meaning: 'Ink' }, { word: 'ã‚¤ãƒ³ãƒ‰ (indo)', meaning: 'India' }] },
    { char: 'ã‚¦', romaji: 'u', type: 'katakana', mnemonic: 'An Umbrella seen closed from the side.', examples: [{ word: 'ã‚¦ã‚¨ãƒ¼ã‚¿ãƒ¼ (ueetaa)', meaning: 'Waiter' }, { word: 'ã‚¦ã‚¤ã‚¹ã‚­ãƒ¼ (uisukii)', meaning: 'Whisky' }] },
    { char: 'ã‚¨', romaji: 'e', type: 'katakana', mnemonic: 'An Elevator shaft â€” three horizontal lines.', examples: [{ word: 'ã‚¨ãƒ¬ãƒ™ãƒ¼ã‚¿ãƒ¼ (erebeetaa)', meaning: 'Elevator' }, { word: 'ã‚¨ã‚¢ã‚³ãƒ³ (eakon)', meaning: 'Air conditioner' }] },
    { char: 'ã‚ª', romaji: 'o', type: 'katakana', mnemonic: 'An Opera singer with outstretched arms.', examples: [{ word: 'ã‚ªãƒ¬ãƒ³ã‚¸ (orenji)', meaning: 'Orange' }, { word: 'ã‚ªãƒ¼ãƒˆãƒã‚¤ (ootobai)', meaning: 'Motorcycle' }] },

    // â”€â”€â”€ K-row: ã‚«, ã‚­, ã‚¯, ã‚±, ã‚³ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ã‚«', romaji: 'ka', type: 'katakana', mnemonic: 'A Katana sword â€” sharp and angular.', examples: [{ word: 'ã‚«ãƒ¡ãƒ© (kamera)', meaning: 'Camera' }, { word: 'ã‚«ãƒŠãƒ€ (Kanada)', meaning: 'Canada' }] },
    { char: 'ã‚­', romaji: 'ki', type: 'katakana', mnemonic: 'A Key with two notches cut into it.', examples: [{ word: 'ã‚­ãƒ­ (kiro)', meaning: 'Kilo' }, { word: 'ã‚­ãƒƒãƒãƒ³ (kicchin)', meaning: 'Kitchen' }] },
    { char: 'ã‚¯', romaji: 'ku', type: 'katakana', mnemonic: "A Cook's hat viewed from the side â€” pointed top.", examples: [{ word: 'ã‚¯ãƒ©ã‚¹ (kurasu)', meaning: 'Class' }, { word: 'ã‚¯ãƒªãƒ‹ãƒƒã‚¯ (kurinikku)', meaning: 'Clinic' }] },
    { char: 'ã‚±', romaji: 'ke', type: 'katakana', mnemonic: 'A bent Kettle spout â€” curves then drips.', examples: [{ word: 'ã‚±ãƒ¼ã‚­ (keeki)', meaning: 'Cake' }, { word: 'ã‚±ãƒ¼ã‚¿ã‚¤ (keetai)', meaning: 'Mobile phone' }] },
    { char: 'ã‚³', romaji: 'ko', type: 'katakana', mnemonic: 'Two Corners of a square box.', examples: [{ word: 'ã‚³ãƒ¼ãƒ’ãƒ¼ (koohii)', meaning: 'Coffee' }, { word: 'ã‚³ãƒ³ãƒ“ãƒ‹ (konbini)', meaning: 'Convenience store' }] },

    // â”€â”€â”€ S-row: ã‚µ, ã‚·, ã‚¹, ã‚», ã‚½ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ã‚µ', romaji: 'sa', type: 'katakana', mnemonic: 'A Saxophone with its tall angular neck.', examples: [{ word: 'ã‚µãƒ¼ãƒ“ã‚¹ (saabisu)', meaning: 'Service' }, { word: 'ã‚µãƒ©ãƒ€ (sarada)', meaning: 'Salad' }] },
    { char: 'ã‚·', romaji: 'shi', type: 'katakana', mnemonic: 'She smiles â€” three dots curve upwards like a grin.', examples: [{ word: 'ã‚·ãƒ£ãƒ„ (shatsu)', meaning: 'Shirt' }, { word: 'ã‚·ãƒãƒž (shinema)', meaning: 'Cinema' }] },
    { char: 'ã‚¹', romaji: 'su', type: 'katakana', mnemonic: 'A Scooter with a handlebar sticking out.', examples: [{ word: 'ã‚¹ãƒ¼ãƒ‘ãƒ¼ (suupaa)', meaning: 'Supermarket' }, { word: 'ã‚¹ãƒãƒ¼ãƒ„ (supootsu)', meaning: 'Sports' }] },
    { char: 'ã‚»', romaji: 'se', type: 'katakana', mnemonic: 'A person saying "Say!" in a stiff angular pose.', examples: [{ word: 'ã‚»ãƒ¼ãƒ« (seeru)', meaning: 'Sale' }, { word: 'ã‚»ãƒ¼ã‚¿ãƒ¼ (seetaa)', meaning: 'Sweater' }] },
    { char: 'ã‚½', romaji: 'so', type: 'katakana', mnemonic: 'A needle plunging So-straight downward.', examples: [{ word: 'ã‚½ãƒ•ã‚¡ (sofa)', meaning: 'Sofa' }, { word: 'ã‚½ãƒ¼ã‚¹ (soosu)', meaning: 'Sauce' }] },

    // â”€â”€â”€ T-row: ã‚¿, ãƒ, ãƒ„, ãƒ†, ãƒˆ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ã‚¿', romaji: 'ta', type: 'katakana', mnemonic: 'A Taco getting bitten â€” open flap at top.', examples: [{ word: 'ã‚¿ã‚¯ã‚·ãƒ¼ (takushii)', meaning: 'Taxi' }, { word: 'ã‚¿ã‚ªãƒ« (taoru)', meaning: 'Towel' }] },
    { char: 'ãƒ', romaji: 'chi', type: 'katakana', mnemonic: 'A Cheerleader tossing her baton high into the air.', examples: [{ word: 'ãƒã‚±ãƒƒãƒˆ (chiketto)', meaning: 'Ticket' }, { word: 'ãƒãƒ¼ãƒ  (chiimu)', meaning: 'Team' }] },
    { char: 'ãƒ„', romaji: 'tsu', type: 'katakana', mnemonic: 'A Tsunami â€” three dots sweep sharply down.', examples: [{ word: 'ãƒ„ã‚¢ãƒ¼ (tsuaa)', meaning: 'Tour' }, { word: 'ãƒ„ãƒ¼ãƒ« (tsuuru)', meaning: 'Tool' }] },
    { char: 'ãƒ†', romaji: 'te', type: 'katakana', mnemonic: 'A Television antenna rising from a flat rooftop.', examples: [{ word: 'ãƒ†ãƒ¬ãƒ“ (terebi)', meaning: 'Television' }, { word: 'ãƒ†ã‚¹ãƒˆ (tesuto)', meaning: 'Test' }] },
    { char: 'ãƒˆ', romaji: 'to', type: 'katakana', mnemonic: 'A wooden Totem pole with a sharp stake at top.', examples: [{ word: 'ãƒˆã‚¤ãƒ¬ (toire)', meaning: 'Toilet' }, { word: 'ãƒˆãƒžãƒˆ (tomato)', meaning: 'Tomato' }] },

    // â”€â”€â”€ N-row: ãƒŠ, ãƒ‹, ãƒŒ, ãƒ, ãƒŽ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ãƒŠ', romaji: 'na', type: 'katakana', mnemonic: 'kNitting needles crossed â€” a plus sign!', examples: [{ word: 'ãƒŠã‚¤ãƒ• (naifu)', meaning: 'Knife' }, { word: 'ãƒŠãƒ³ãƒãƒ¼ (nanbaa)', meaning: 'Number' }] },
    { char: 'ãƒ‹', romaji: 'ni', type: 'katakana', mnemonic: 'Two horizontal Needles â€” NI, NI!', examples: [{ word: 'ãƒ‹ãƒ¥ãƒ¼ã‚¹ (nyuusu)', meaning: 'News' }, { word: 'ãƒ‹ãƒƒãƒˆ (nitto)', meaning: 'Knit sweater' }] },
    { char: 'ãƒŒ', romaji: 'nu', type: 'katakana', mnemonic: 'Noodles swirling around a fork.', examples: [{ word: 'ãƒŒãƒ¼ãƒ‰ (nuudo)', meaning: 'Nude art' }, { word: 'ãƒŒãƒ¼ãƒˆãƒªã‚¢ (nootoria)', meaning: 'Nutria' }] },
    { char: 'ãƒ', romaji: 'ne', type: 'katakana', mnemonic: 'A Necklace hanging from a nail on the wall.', examples: [{ word: 'ãƒã‚¯ã‚¿ã‚¤ (nekutai)', meaning: 'Necktie' }, { word: 'ãƒãƒƒãƒˆ (netto)', meaning: 'Net / Internet' }] },
    { char: 'ãƒŽ', romaji: 'no', type: 'katakana', mnemonic: 'A single diagonal slash â€” NOthing but a line!', examples: [{ word: 'ãƒŽãƒ¼ãƒˆ (nooto)', meaning: 'Notebook' }, { word: 'ãƒŽãƒƒã‚¯ (nokku)', meaning: 'Knock' }] },

    // â”€â”€â”€ H-row: ãƒ, ãƒ’, ãƒ•, ãƒ˜, ãƒ› â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ãƒ', romaji: 'ha', type: 'katakana', mnemonic: 'HA! Two people laughing with arms spread wide.', examples: [{ word: 'ãƒãƒ³ãƒãƒ¼ã‚¬ãƒ¼ (hanbaagaa)', meaning: 'Hamburger' }, { word: 'ãƒãƒ  (hamu)', meaning: 'Ham' }] },
    { char: 'ãƒ’', romaji: 'hi', type: 'katakana', mnemonic: 'He smiles â€” a hill or heel shape.', examples: [{ word: 'ãƒ’ãƒ¼ãƒ­ãƒ¼ (hiiroo)', meaning: 'Hero' }, { word: 'ãƒ’ãƒ³ãƒˆ (hinto)', meaning: 'Hint' }] },
    { char: 'ãƒ•', romaji: 'fu', type: 'katakana', mnemonic: 'Fuji mountain â€” a single curved peak from the sea.', examples: [{ word: 'ãƒ•ãƒ©ãƒ³ã‚¹ (Furansu)', meaning: 'France' }, { word: 'ãƒ•ã‚©ãƒ¼ã‚¯ (fooku)', meaning: 'Fork' }] },
    { char: 'ãƒ˜', romaji: 'he', type: 'katakana', mnemonic: 'A mountain peak â€” HEY, look up here!', examples: [{ word: 'ãƒ˜ã‚¢ãƒ¼ (heaa)', meaning: 'Hair' }, { word: 'ãƒ˜ãƒ«ãƒ¡ãƒƒãƒˆ (herumetto)', meaning: 'Helmet' }] },
    { char: 'ãƒ›', romaji: 'ho', type: 'katakana', mnemonic: "Ho-ho-ho! Santa's scaffold ladder.", examples: [{ word: 'ãƒ›ãƒ†ãƒ« (hoteru)', meaning: 'Hotel' }, { word: 'ãƒ›ãƒ¼ãƒ« (hooru)', meaning: 'Hall' }] },

    // â”€â”€â”€ M-row: ãƒž, ãƒŸ, ãƒ , ãƒ¡, ãƒ¢ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ãƒž', romaji: 'ma', type: 'katakana', mnemonic: 'MAma hangs out the laundry on a line.', examples: [{ word: 'ãƒžãƒ³ã‚·ãƒ§ãƒ³ (manshon)', meaning: 'Apartment building' }, { word: 'ãƒžãƒƒãƒ— (mappu)', meaning: 'Map' }] },
    { char: 'ãƒŸ', romaji: 'mi', type: 'katakana', mnemonic: 'ME, waving with three fingers!', examples: [{ word: 'ãƒŸãƒ«ã‚¯ (miruku)', meaning: 'Milk' }, { word: 'ãƒŸãƒ¥ãƒ¼ã‚¸ãƒƒã‚¯ (myuujikku)', meaning: 'Music' }] },
    { char: 'ãƒ ', romaji: 'mu', type: 'katakana', mnemonic: 'A cow going MOO â€” angular bovine profile.', examples: [{ word: 'ãƒ ãƒ¼ãƒ‰ (muudo)', meaning: 'Mood' }, { word: 'ãƒ ãƒ¼ãƒ“ãƒ¼ (muubii)', meaning: 'Movie' }] },
    { char: 'ãƒ¡', romaji: 'me', type: 'katakana', mnemonic: 'An X-mark â€” cross it out, MEmo it!', examples: [{ word: 'ãƒ¡ãƒ¼ãƒ« (meeru)', meaning: 'Email / Mail' }, { word: 'ãƒ¡ãƒ‹ãƒ¥ãƒ¼ (menyuu)', meaning: 'Menu' }] },
    { char: 'ãƒ¢', romaji: 'mo', type: 'katakana', mnemonic: 'MOre! Two fishing hooks dangling from a rod.', examples: [{ word: 'ãƒ¢ãƒ‡ãƒ« (moderu)', meaning: 'Model' }, { word: 'ãƒ¢ãƒ¼ã‚¿ãƒ¼ (mootaa)', meaning: 'Motor' }] },

    // â”€â”€â”€ Y-row: ãƒ¤, ãƒ¦, ãƒ¨ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ãƒ¤', romaji: 'ya', type: 'katakana', mnemonic: 'A Yacht with a tall mast sailing right.', examples: [{ word: 'ãƒ¤ãƒ¼ãƒ‰ (yaado)', meaning: 'Yard (unit)' }, { word: 'ãƒ¤ã‚· (yashi)', meaning: 'Palm tree' }] },
    { char: 'ãƒ¦', romaji: 'yu', type: 'katakana', mnemonic: "You'nicorn â€” a horn rising from a flat base.", examples: [{ word: 'ãƒ¦ãƒ‹ãƒ•ã‚©ãƒ¼ãƒ  (yunifoomu)', meaning: 'Uniform' }, { word: 'ãƒ¦ãƒ¼ãƒ¢ã‚¢ (yuumoa)', meaning: 'Humor' }] },
    { char: 'ãƒ¨', romaji: 'yo', type: 'katakana', mnemonic: 'A Yo-yo on three pegs â€” YO!', examples: [{ word: 'ãƒ¨ãƒ¼ã‚°ãƒ«ãƒˆ (yooguruto)', meaning: 'Yogurt' }, { word: 'ãƒ¨ãƒ¼ãƒ­ãƒƒãƒ‘ (yooroppa)', meaning: 'Europe' }] },

    // â”€â”€â”€ R-row: ãƒ©, ãƒª, ãƒ«, ãƒ¬, ãƒ­ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ãƒ©', romaji: 'ra', type: 'katakana', mnemonic: "A Rabbit's open mouth â€” RA!", examples: [{ word: 'ãƒ©ãƒ¼ãƒ¡ãƒ³ (raamen)', meaning: 'Ramen' }, { word: 'ãƒ©ã‚¸ã‚ª (rajio)', meaning: 'Radio' }] },
    { char: 'ãƒª', romaji: 'ri', type: 'katakana', mnemonic: 'Two parallel Rivers flowing side by side.', examples: [{ word: 'ãƒªã‚¹ãƒˆ (risuto)', meaning: 'List' }, { word: 'ãƒªãƒ¢ã‚³ãƒ³ (rimokon)', meaning: 'Remote control' }] },
    { char: 'ãƒ«', romaji: 'ru', type: 'katakana', mnemonic: 'A Road that curves then exits sharply downward.', examples: [{ word: 'ãƒ«ãƒ¼ãƒ  (ruumu)', meaning: 'Room' }, { word: 'ãƒ«ãƒ¼ãƒ« (ruuru)', meaning: 'Rule' }] },
    { char: 'ãƒ¬', romaji: 're', type: 'katakana', mnemonic: 'A Ray of light â€” a sharp swooping angle.', examples: [{ word: 'ãƒ¬ã‚¹ãƒˆãƒ©ãƒ³ (resutoran)', meaning: 'Restaurant' }, { word: 'ãƒ¬ãƒƒã‚¹ãƒ³ (ressun)', meaning: 'Lesson' }] },
    { char: 'ãƒ­', romaji: 'ro', type: 'katakana', mnemonic: 'A Robot head â€” a square with empty eyes.', examples: [{ word: 'ãƒ­ãƒƒã‚¯ (rokku)', meaning: 'Rock music' }, { word: 'ãƒ­ãƒœãƒƒãƒˆ (robotto)', meaning: 'Robot' }] },

    // â”€â”€â”€ W-row & N: ãƒ¯, ãƒ², ãƒ³ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ãƒ¯', romaji: 'wa', type: 'katakana', mnemonic: 'A Waffle with a single syrup drip on one side.', examples: [{ word: 'ãƒ¯ã‚¤ãƒ³ (wain)', meaning: 'Wine' }, { word: 'ãƒ¯ã‚¤ãƒ¤ãƒ¼ (waiyaa)', meaning: 'Wire' }] },
    { char: 'ãƒ²', romaji: 'wo', type: 'katakana', mnemonic: 'The object-marker â€” rare in modern katakana.', examples: [{ word: 'ãƒ² (wo)', meaning: 'Object particle (rare)' }] },
    { char: 'ãƒ³', romaji: 'n', type: 'katakana', mnemonic: 'A slanted check mark â€” a quick nasal N sound.', examples: [{ word: 'ãƒ‘ãƒ³ (pan)', meaning: 'Bread' }, { word: 'ãƒšãƒ³ (pen)', meaning: 'Pen' }] },

    // â”€â”€â”€ Dakuon (voiced) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ã‚¬', romaji: 'ga', type: 'katakana', mnemonic: 'ã‚« with dakuten â€” GA!', examples: [{ word: 'ã‚¬ãƒ©ã‚¹ (garasu)', meaning: 'Glass (material)' }] },
    { char: 'ã‚®', romaji: 'gi', type: 'katakana', mnemonic: 'ã‚­ with buzz â€” GI!', examples: [{ word: 'ã‚®ã‚¿ãƒ¼ (gitaa)', meaning: 'Guitar' }] },
    { char: 'ã‚°', romaji: 'gu', type: 'katakana', mnemonic: 'ã‚¯ with energy â€” GU!', examples: [{ word: 'ã‚°ãƒ«ãƒ¼ãƒ— (guruupu)', meaning: 'Group' }] },
    { char: 'ã‚²', romaji: 'ge', type: 'katakana', mnemonic: 'ã‚± with buzz â€” GE!', examples: [{ word: 'ã‚²ãƒ¼ãƒ  (geemu)', meaning: 'Game' }] },
    { char: 'ã‚´', romaji: 'go', type: 'katakana', mnemonic: 'ã‚³ with rumble â€” GO!', examples: [{ word: 'ã‚´ãƒ«ãƒ• (gorufu)', meaning: 'Golf' }] },
    { char: 'ã‚¶', romaji: 'za', type: 'katakana', mnemonic: 'ã‚µ with buzz â€” ZA!', examples: [{ word: 'ã‚¶ã‚¤ãƒ« (zairu)', meaning: 'Climbing rope (Ger. loanword)' }] },
    { char: 'ã‚¸', romaji: 'ji', type: 'katakana', mnemonic: 'ã‚· with buzz â€” JI!', examples: [{ word: 'ã‚¸ãƒ¥ãƒ¼ã‚¹ (juusu)', meaning: 'Juice' }] },
    { char: 'ã‚º', romaji: 'zu', type: 'katakana', mnemonic: 'ã‚¹ with buzz â€” ZU!', examples: [{ word: 'ã‚ºãƒœãƒ³ (zubon)', meaning: 'Trousers' }] },
    { char: 'ã‚¼', romaji: 'ze', type: 'katakana', mnemonic: 'ã‚» with buzz â€” ZE!', examples: [{ word: 'ã‚¼ãƒ­ (zero)', meaning: 'Zero' }] },
    { char: 'ã‚¾', romaji: 'zo', type: 'katakana', mnemonic: 'ã‚½ with buzz â€” ZO!', examples: [{ word: 'ã‚¾ãƒ¼ãƒ³ (zoon)', meaning: 'Zone' }] },
    { char: 'ãƒ€', romaji: 'da', type: 'katakana', mnemonic: 'ã‚¿ with buzz â€” DA!', examples: [{ word: 'ãƒ€ãƒ³ã‚¹ (dansu)', meaning: 'Dance' }] },
    { char: 'ãƒ‡', romaji: 'de', type: 'katakana', mnemonic: 'ãƒ† with buzz â€” DE!', examples: [{ word: 'ãƒ‡ã‚¹ã‚¯ (desuku)', meaning: 'Desk' }] },
    { char: 'ãƒ‰', romaji: 'do', type: 'katakana', mnemonic: 'ãƒˆ with buzz â€” DO!', examples: [{ word: 'ãƒ‰ã‚¢ (doa)', meaning: 'Door' }] },
    { char: 'ãƒ', romaji: 'ba', type: 'katakana', mnemonic: 'ãƒ with buzz â€” BA!', examples: [{ word: 'ãƒã‚¹ (basu)', meaning: 'Bus' }] },
    { char: 'ãƒ“', romaji: 'bi', type: 'katakana', mnemonic: 'ãƒ’ with buzz â€” BI!', examples: [{ word: 'ãƒ“ãƒ¼ãƒ« (biiru)', meaning: 'Beer' }] },
    { char: 'ãƒ–', romaji: 'bu', type: 'katakana', mnemonic: 'ãƒ• with buzz â€” BU!', examples: [{ word: 'ãƒ–ãƒ©ã‚¦ã‚¹ (burausu)', meaning: 'Blouse' }] },
    { char: 'ãƒ™', romaji: 'be', type: 'katakana', mnemonic: 'ãƒ˜ with buzz â€” BE!', examples: [{ word: 'ãƒ™ãƒƒãƒ‰ (beddo)', meaning: 'Bed' }] },
    { char: 'ãƒœ', romaji: 'bo', type: 'katakana', mnemonic: 'ãƒ› with buzz â€” BO!', examples: [{ word: 'ãƒœãƒ¼ãƒ« (booru)', meaning: 'Ball' }] },

    // â”€â”€â”€ Handakuten (semi-voiced P-sounds) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ãƒ‘', romaji: 'pa', type: 'katakana', mnemonic: 'ãƒ with a pop â€” PA!', examples: [{ word: 'ãƒ‘ãƒ³ (pan)', meaning: 'Bread' }, { word: 'ãƒ‘ãƒ¼ãƒ†ã‚£ãƒ¼ (paatii)', meaning: 'Party' }] },
    { char: 'ãƒ”', romaji: 'pi', type: 'katakana', mnemonic: 'ãƒ’ with a pop â€” PI!', examples: [{ word: 'ãƒ”ã‚¢ãƒŽ (piano)', meaning: 'Piano' }, { word: 'ãƒ”ã‚¶ (piza)', meaning: 'Pizza' }] },
    { char: 'ãƒ—', romaji: 'pu', type: 'katakana', mnemonic: 'ãƒ• with a pop â€” PU!', examples: [{ word: 'ãƒ—ãƒ¼ãƒ« (puuru)', meaning: 'Pool' }, { word: 'ãƒ—ãƒªãƒ³ (purin)', meaning: 'Pudding / Flan' }] },
    { char: 'ãƒš', romaji: 'pe', type: 'katakana', mnemonic: 'ãƒ˜ with a pop â€” PE!', examples: [{ word: 'ãƒšãƒ³ (pen)', meaning: 'Pen' }, { word: 'ãƒšãƒƒãƒˆ (petto)', meaning: 'Pet' }] },
    { char: 'ãƒ', romaji: 'po', type: 'katakana', mnemonic: 'ãƒ› with a pop â€” PO!', examples: [{ word: 'ãƒã‚¹ãƒˆ (posuto)', meaning: 'Post box' }, { word: 'ãƒãƒƒãƒ— (poppu)', meaning: 'Pop (music)' }] },

    // â”€â”€â”€ Yoon (Combo sounds) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    { char: 'ã‚­ãƒ£', romaji: 'kya', type: 'katakana', mnemonic: 'ã‚­ + small ãƒ£', examples: [{ word: 'ã‚­ãƒ£ãƒ³ãƒ— (kyanpu)', meaning: 'Camping' }] },
    { char: 'ã‚­ãƒ¥', romaji: 'kyu', type: 'katakana', mnemonic: 'ã‚­ + small ãƒ¥', examples: [{ word: 'ã‚­ãƒ¥ãƒ¼ (kyuu)', meaning: 'Queue / Cue' }] },
    { char: 'ã‚­ãƒ§', romaji: 'kyo', type: 'katakana', mnemonic: 'ã‚­ + small ãƒ§', examples: [{ word: 'ã‚­ãƒ§ãƒ³ (kyon)', meaning: 'Barking deer' }] },
    { char: 'ã‚·ãƒ£', romaji: 'sha', type: 'katakana', mnemonic: 'ã‚· + small ãƒ£', examples: [{ word: 'ã‚·ãƒ£ãƒ¯ãƒ¼ (shawaa)', meaning: 'Shower' }] },
    { char: 'ã‚·ãƒ¥', romaji: 'shu', type: 'katakana', mnemonic: 'ã‚· + small ãƒ¥', examples: [{ word: 'ã‚·ãƒ¥ãƒ¼ãƒˆ (shuuto)', meaning: 'Shoot (sports)' }] },
    { char: 'ã‚·ãƒ§', romaji: 'sho', type: 'katakana', mnemonic: 'ã‚· + small ãƒ§', examples: [{ word: 'ã‚·ãƒ§ãƒƒãƒ”ãƒ³ã‚° (shoppingu)', meaning: 'Shopping' }] },
    { char: 'ãƒãƒ£', romaji: 'cha', type: 'katakana', mnemonic: 'ãƒ + small ãƒ£', examples: [{ word: 'ãƒãƒ£ãƒ³ã‚¹ (chansu)', meaning: 'Chance' }] },
    { char: 'ãƒãƒ¥', romaji: 'chu', type: 'katakana', mnemonic: 'ãƒ + small ãƒ¥', examples: [{ word: 'ãƒãƒ¥ãƒ¼ãƒªãƒƒãƒ— (chuurippu)', meaning: 'Tulip' }] },
    { char: 'ãƒãƒ§', romaji: 'cho', type: 'katakana', mnemonic: 'ãƒ + small ãƒ§', examples: [{ word: 'ãƒãƒ§ã‚³ãƒ¬ãƒ¼ãƒˆ (chokoreeto)', meaning: 'Chocolate' }] },
    { char: 'ãƒ‹ãƒ£', romaji: 'nya', type: 'katakana', mnemonic: 'ãƒ‹ + small ãƒ£', examples: [{ word: 'ãƒ‹ãƒ£ãƒ¼ãƒ‹ãƒ£ãƒ¼ (nyaa nyaa)', meaning: 'Cat meow' }] },
    { char: 'ãƒ‹ãƒ¥', romaji: 'nyu', type: 'katakana', mnemonic: 'ãƒ‹ + small ãƒ¥', examples: [{ word: 'ãƒ‹ãƒ¥ãƒ¼ãƒ¨ãƒ¼ã‚¯ (nyuu yooku)', meaning: 'New York' }] },
    { char: 'ãƒ‹ãƒ§', romaji: 'nyo', type: 'katakana', mnemonic: 'ãƒ‹ + small ãƒ§', examples: [{ word: 'ãƒ‹ãƒ§ãƒ­ (nyoro)', meaning: 'Wriggling' }] },
    { char: 'ãƒ’ãƒ£', romaji: 'hya', type: 'katakana', mnemonic: 'ãƒ’ + small ãƒ£', examples: [{ word: 'ãƒ’ãƒ£ãƒƒãƒ›ãƒ¼ (hyahhoo)', meaning: 'Yeehaw!' }] },
    { char: 'ãƒ’ãƒ¥', romaji: 'hyu', type: 'katakana', mnemonic: 'ãƒ’ + small ãƒ¥', examples: [{ word: 'ãƒ’ãƒ¥ãƒ¼ (hyuu)', meaning: 'Whistling wind' }] },
    { char: 'ãƒ’ãƒ§', romaji: 'hyo', type: 'katakana', mnemonic: 'ãƒ’ + small ãƒ§', examples: [{ word: 'ãƒ’ãƒ§ã‚¦ (hyou)', meaning: 'Leopard / Hail' }] },
    { char: 'ãƒŸãƒ£', romaji: 'mya', type: 'katakana', mnemonic: 'ãƒŸ + small ãƒ£', examples: [{ word: 'ãƒŸãƒ£ãƒ³ãƒžãƒ¼ (Myanmaa)', meaning: 'Myanmar' }] },
    { char: 'ãƒŸãƒ¥', romaji: 'myu', type: 'katakana', mnemonic: 'ãƒŸ + small ãƒ¥', examples: [{ word: 'ãƒŸãƒ¥ãƒ¼ã‚¸ã‚«ãƒ« (myuujikaru)', meaning: 'Musical' }] },
    { char: 'ãƒŸãƒ§', romaji: 'myo', type: 'katakana', mnemonic: 'ãƒŸ + small ãƒ§', examples: [{ word: 'ãƒŸãƒ§ã‚¦ã‚¬ (myouga)', meaning: 'Myoga ginger' }] },
    { char: 'ãƒªãƒ£', romaji: 'rya', type: 'katakana', mnemonic: 'ãƒª + small ãƒ£', examples: [{ word: 'ãƒªãƒ£ãƒž (ryama)', meaning: 'Llama' }] },
    { char: 'ãƒªãƒ¥', romaji: 'ryu', type: 'katakana', mnemonic: 'ãƒª + small ãƒ¥', examples: [{ word: 'ãƒªãƒ¥ãƒƒã‚¯ (ryukku)', meaning: 'Rucksack / Backpack' }] },
    { char: 'ãƒªãƒ§', romaji: 'ryo', type: 'katakana', mnemonic: 'ãƒª + small ãƒ§', examples: [{ word: 'ãƒªãƒ§ã‚¦ (ryou)', meaning: 'Quantity / Hostel' }] },
    { char: 'ã‚®ãƒ£', romaji: 'gya', type: 'katakana', mnemonic: 'ã‚® + small ãƒ£', examples: [{ word: 'ã‚®ãƒ£ãƒ³ã‚° (gyangu)', meaning: 'Gang' }] },
    { char: 'ã‚®ãƒ¥', romaji: 'gyu', type: 'katakana', mnemonic: 'ã‚® + small ãƒ¥', examples: [{ word: 'ã‚®ãƒ¥ãƒƒã¨ (gyutto)', meaning: 'Tightly / Firmly' }] },
    { char: 'ã‚®ãƒ§', romaji: 'gyo', type: 'katakana', mnemonic: 'ã‚® + small ãƒ§', examples: [{ word: 'ã‚®ãƒ§ãƒ¼ã‚¶ (gyooza)', meaning: 'Gyoza dumplings' }] },
    { char: 'ã‚¸ãƒ£', romaji: 'ja', type: 'katakana', mnemonic: 'ã‚¸ + small ãƒ£', examples: [{ word: 'ã‚¸ãƒ£ã‚º (jazu)', meaning: 'Jazz' }] },
    { char: 'ã‚¸ãƒ¥', romaji: 'ju', type: 'katakana', mnemonic: 'ã‚¸ + small ãƒ¥', examples: [{ word: 'ã‚¸ãƒ¥ãƒ¼ã‚¹ (juusu)', meaning: 'Juice' }] },
    { char: 'ã‚¸ãƒ§', romaji: 'jo', type: 'katakana', mnemonic: 'ã‚¸ + small ãƒ§', examples: [{ word: 'ã‚¸ãƒ§ã‚®ãƒ³ã‚° (jogingu)', meaning: 'Jogging' }] },
    { char: 'ãƒ“ãƒ£', romaji: 'bya', type: 'katakana', mnemonic: 'ãƒ“ + small ãƒ£', examples: [{ word: 'ãƒ“ãƒ£ã‚¯ (byaku)', meaning: 'White (archaic)' }] },
    { char: 'ãƒ“ãƒ¥', romaji: 'byu', type: 'katakana', mnemonic: 'ãƒ“ + small ãƒ¥', examples: [{ word: 'ãƒ“ãƒ¥ãƒƒãƒ•ã‚§ (byuffe)', meaning: 'Buffet' }] },
    { char: 'ãƒ“ãƒ§', romaji: 'byo', type: 'katakana', mnemonic: 'ãƒ“ + small ãƒ§', examples: [{ word: 'ãƒ“ãƒ§ãƒ¼ãƒ³ (byoon)', meaning: 'Boing! (spring sound)' }] },
    { char: 'ãƒ”ãƒ£', romaji: 'pya', type: 'katakana', mnemonic: 'ãƒ” + small ãƒ£', examples: [{ word: 'ãƒ”ãƒ£ãƒ¼ (pyaa)', meaning: 'Eeek! (exclamation)' }] },
    { char: 'ãƒ”ãƒ¥', romaji: 'pyu', type: 'katakana', mnemonic: 'ãƒ” + small ãƒ¥', examples: [{ word: 'ãƒ”ãƒ¥ãƒ¼ãƒž (pyuuma)', meaning: 'Puma' }] },
    { char: 'ãƒ”ãƒ§', romaji: 'pyo', type: 'katakana', mnemonic: 'ãƒ” + small ãƒ§', examples: [{ word: 'ãƒ”ãƒ§ãƒ³ãƒ”ãƒ§ãƒ³ (pyonpyon)', meaning: 'Hopping along' }] },
];

export const getLessonContent = (lessonId: string) => {
    const lessonIndex = parseInt(lessonId.split('-')[1]) - 1;
    const itemsPerLesson = 4;
    const start = lessonIndex * itemsPerLesson;

    if (start >= hiragana.length) return [];
    return hiragana.slice(start, start + itemsPerLesson);
};
