export interface VerbMasteryData {
    verb: string;
    reading: string;
    meaning: string;
    commonKanji?: string;
    conjugations: {
        past: { jp: string; romaji: string; meaning: string };
        negative: { jp: string; romaji: string; meaning: string };
        teForm: { jp: string; romaji: string; meaning: string };
        politePast: { jp: string; romaji: string; meaning: string };
        politePresent: { jp: string; romaji: string; meaning: string };
    };
    subtlety: {
        label: string;
        standard: { jp: string; romaji: string; note: string };
        casual: { jp: string; romaji: string; note: string };
        colloquial?: { jp: string; romaji: string; note: string };
    };
    context: {
        label: string;
        form: { jp: string; romaji: string; note: string };
    };
}

export const masteryVerbs: VerbMasteryData[] = [
    {
        verb: '分かる',
        reading: 'わかる',
        meaning: 'to understand',
        commonKanji: '分',
        conjugations: {
            past: { jp: '分かった', romaji: 'Wakatta', meaning: 'I understood / Got it' },
            negative: { jp: '分からない', romaji: 'Wakaranai', meaning: "I don't understand" },
            teForm: { jp: '分かって', romaji: 'Wakatte', meaning: '-te form (connecting/request)' },
            politePast: { jp: '分かりました', romaji: 'Wakarimashita', meaning: 'I understood (polite)' },
            politePresent: { jp: '分かります', romaji: 'Wakarimasu', meaning: 'I understand (polite)' },
        },
        subtlety: {
            label: 'Negative Variations',
            standard: { jp: '分からない', romaji: 'Wakaranai', note: 'Standard negative' },
            casual: { jp: 'わかんない', romaji: 'Wakanai', note: 'Casual, slightly slangy spoken version' },
            colloquial: { jp: 'わからん', romaji: 'Wakaran', note: 'Rougher colloquial/dialect version' },
        },
        context: {
            label: 'Annoyance / Presence',
            form: { jp: 'わかってる', romaji: 'Wakatteru', note: 'I already know! (can imply annoyance)' },
        }
    },
    {
        verb: '食べる',
        reading: 'たべる',
        meaning: 'to eat',
        commonKanji: '食',
        conjugations: {
            past: { jp: '食べた', romaji: 'Tabeta', meaning: 'I ate' },
            negative: { jp: '食べない', romaji: 'Tabenai', meaning: "I don't eat" },
            teForm: { jp: '食べて', romaji: 'Tabete', meaning: 'Eat and... / Please eat' },
            politePast: { jp: '食べました', romaji: 'Tabemashita', meaning: 'I ate (polite)' },
            politePresent: { jp: '食べます', romaji: 'Tabemasu', meaning: 'I eat (polite)' },
        },
        subtlety: {
            label: 'Casual Eating',
            standard: { jp: '食べない', romaji: 'Tabenai', note: 'Standard negative' },
            casual: { jp: '食べん', romaji: 'Taben', note: 'Quick refusal/rough' },
            colloquial: { jp: '食う', romaji: 'Kuu', note: 'Rough/Masculine dictionary form' },
        },
        context: {
            label: 'Currently Eating',
            form: { jp: '食べてる', romaji: 'Tabeteru', note: 'I am eating right now' },
        }
    },
    {
        verb: '飲む',
        reading: 'のむ',
        meaning: 'to drink',
        commonKanji: '飲',
        conjugations: {
            past: { jp: '飲んだ', romaji: 'Nonda', meaning: 'I drank' },
            negative: { jp: '飲まない', romaji: 'Nomanai', meaning: "I don't drink" },
            teForm: { jp: '飲んで', romaji: 'Nonde', meaning: 'Drink and... / Please drink' },
            politePast: { jp: '飲みました', romaji: 'Nomimashita', meaning: 'I drank (polite)' },
            politePresent: { jp: '飲みます', romaji: 'Nomimasu', meaning: 'I drink (polite)' },
        },
        subtlety: {
            label: 'Negative Variations',
            standard: { jp: '飲まない', romaji: 'Nomanai', note: 'Standard negative' },
            casual: { jp: '飲まん', romaji: 'Noman', note: 'Colloquial refusal' },
            colloquial: { jp: '飲み干す', romaji: 'Nomihosu', note: 'To drink dry/drain' },
        },
        context: {
            label: 'Invitation',
            form: { jp: '飲もう', romaji: 'Nomou', note: "Let's drink! (Casual invitation)" },
        }
    },
    {
        verb: '行く',
        reading: 'いく',
        meaning: 'to go',
        commonKanji: '行',
        conjugations: {
            past: { jp: '行った', romaji: 'Itta', meaning: 'I went' },
            negative: { jp: '行かない', romaji: 'Ikanai', meaning: "I don't go" },
            teForm: { jp: '行って', romaji: 'Itte', meaning: 'Go and... / Please go' },
            politePast: { jp: '行きました', romaji: 'Ikimashita', meaning: 'I went (polite)' },
            politePresent: { jp: '行きます', romaji: 'Ikimasu', meaning: 'I go (polite)' },
        },
        subtlety: {
            label: 'Spoken Nuances',
            standard: { jp: '行かない', romaji: 'Ikanai', note: 'Standard negative' },
            casual: { jp: '行かん', romaji: 'Ikan', note: 'Rougher/Dialect "not going"' },
            colloquial: { jp: '行っちゃう', romaji: 'Icchau', note: 'To end up going / Accidentally go' },
        },
        context: {
            label: 'Departure',
            form: { jp: '行ってくる', romaji: 'Itte-kuru', note: 'I am going (and coming back)' },
        }
    },
    {
        verb: '来る',
        reading: 'くる',
        meaning: 'to come',
        commonKanji: '来',
        conjugations: {
            past: { jp: '来た', romaji: 'Kita', meaning: 'I came' },
            negative: { jp: '来ない', romaji: 'Konai', meaning: "I don't come" },
            teForm: { jp: '来ても', romaji: 'Kitemo', meaning: 'Even if I come' },
            politePast: { jp: '来ました', romaji: 'Kimashita', meaning: 'I came (polite)' },
            politePresent: { jp: '来ます', romaji: 'Kimasu', meaning: 'I come (polite)' },
        },
        subtlety: {
            label: 'Negative Variations',
            standard: { jp: '来ない', romaji: 'Konai', note: 'Standard negative (KO-nai)' },
            casual: { jp: '来ん', romaji: 'Kon', note: 'Colloquial (KO-n)' },
            colloquial: { jp: '来やがった', romaji: 'Kiyagatta', note: 'Showed up (rude/aggressive)' },
        },
        context: {
            label: 'Presence',
            form: { jp: '来てる', romaji: 'Kiteru', note: "I am here / They have come" },
        }
    },
    {
        verb: '帰る',
        reading: 'かえる',
        meaning: 'to return (home)',
        commonKanji: '帰',
        conjugations: {
            past: { jp: '帰った', romaji: 'Kaetta', meaning: 'I returned' },
            negative: { jp: '帰らない', romaji: 'Kaeranai', meaning: "I don't return" },
            teForm: { jp: '帰って', romaji: 'Kaette', meaning: 'Return and... / Please return' },
            politePast: { jp: '帰りました', romaji: 'Kaerimashita', meaning: 'I returned (polite)' },
            politePresent: { jp: '帰ります', romaji: 'Kaerimasu', meaning: 'I return (polite)' },
        },
        subtlety: {
            label: 'Leaving Nuances',
            standard: { jp: '帰らない', romaji: 'Kaeranai', note: 'Standard negative' },
            casual: { jp: '帰んない', romaji: 'Kaennai', note: 'Slurred spoken version' },
            colloquial: { jp: '帰れ', romaji: 'Kaere', note: 'Go home! (Imperative/Rude)' },
        },
        context: {
            label: 'Going Home',
            form: { jp: '帰りたい', romaji: 'Kaeritai', note: 'I want to go home' },
        }
    },
    {
        verb: '話す',
        reading: 'はなす',
        meaning: 'to speak',
        commonKanji: '話',
        conjugations: {
            past: { jp: '話した', romaji: 'Hanashita', meaning: 'I spoke' },
            negative: { jp: '話さない', romaji: 'Hanasanai', meaning: "I don't speak" },
            teForm: { jp: '話して', romaji: 'Hanashite', meaning: 'Speak and... / Please speak' },
            politePast: { jp: '話しました', romaji: 'Hanashimashita', meaning: 'I spoke (polite)' },
            politePresent: { jp: '話します', romaji: 'Hanashimasu', meaning: 'I speak (polite)' },
        },
        subtlety: {
            label: 'Conversation',
            standard: { jp: '話さない', romaji: 'Hanasanai', note: 'Standard negative' },
            casual: { jp: '話さん', romaji: 'Hanasan', note: 'Colloquial refusal' },
            colloquial: { jp: '話し合う', romaji: 'Hanashiau', note: 'To discuss with each other' },
        },
        context: {
            label: 'Ongoing',
            form: { jp: '話してる', romaji: 'Hanashiteru', note: 'I am talking' },
        }
    },
    {
        verb: '読む',
        reading: 'よむ',
        meaning: 'to read',
        commonKanji: '読',
        conjugations: {
            past: { jp: '読んだ', romaji: 'Yonda', meaning: 'I read' },
            negative: { jp: '読まない', romaji: 'Yomanai', meaning: "I don't read" },
            teForm: { jp: '読んで', romaji: 'Yonde', meaning: 'Read and... / Please read' },
            politePast: { jp: '読みました', romaji: 'Yomimashita', meaning: 'I read (polite)' },
            politePresent: { jp: '読みます', romaji: 'Yomimasu', meaning: 'I read (polite)' },
        },
        subtlety: {
            label: 'Negative Variations',
            standard: { jp: '読まない', romaji: 'Yomanai', note: 'Standard negative' },
            casual: { jp: '読めん', romaji: 'Yomen', note: 'I cannot read (colloquial)' },
            colloquial: { jp: '読み飽きた', romaji: 'Yomiakita', note: 'Tired of reading' },
        },
        context: {
            label: 'Ability',
            form: { jp: '読める', romaji: 'Yomeru', note: 'I can read' },
        }
    },
    {
        verb: '書く',
        reading: 'かく',
        meaning: 'to write',
        commonKanji: '書',
        conjugations: {
            past: { jp: '書いた', romaji: 'Kaita', meaning: 'I wrote' },
            negative: { jp: '書かない', romaji: 'Kakanai', meaning: "I don't write" },
            teForm: { jp: '書いて', romaji: 'Kaite', meaning: 'Write and... / Please write' },
            politePast: { jp: '書きました', romaji: 'Kakimashita', meaning: 'I wrote (polite)' },
            politePresent: { jp: '書きます', romaji: 'Kakimasu', meaning: 'I write (polite)' },
        },
        subtlety: {
            label: 'Writing Styles',
            standard: { jp: '書かない', romaji: 'Kakanai', note: 'Standard negative' },
            casual: { jp: '書かん', romaji: 'Kakan', note: 'Colloquial refusal' },
            colloquial: { jp: '書き殴る', romaji: 'Kakinaguru', note: 'To scribble/dash off' },
        },
        context: {
            label: 'Instruction',
            form: { jp: '書いてください', romaji: 'Kaite-kudasai', note: 'Please write' },
        }
    },
    {
        verb: '聞く',
        reading: 'きく',
        meaning: 'to listen / ask',
        commonKanji: '聞',
        conjugations: {
            past: { jp: '聞いた', romaji: 'Kiita', meaning: 'I heard / asked' },
            negative: { jp: '聞かない', romaji: 'Kikanai', meaning: "I don't listen" },
            teForm: { jp: '聞いて', romaji: 'Kiite', meaning: 'Listen and... / Please listen' },
            politePast: { jp: '聞きました', romaji: 'Kikimashita', meaning: 'I heard (polite)' },
            politePresent: { jp: '聞きます', romaji: 'Kikimasu', meaning: 'I hear (polite)' },
        },
        subtlety: {
            label: 'Inquiry',
            standard: { jp: '聞かない', romaji: 'Kikanai', note: 'Standard negative' },
            casual: { jp: '聞いてない', romaji: 'Kiitenai', note: 'I did not hear that! / I was not told' },
            colloquial: { jp: '聞き流す', romaji: 'Kikinagasu', note: 'To ignore/let go in one ear' },
        },
        context: {
            label: 'Attention',
            form: { jp: '聞いてる？', romaji: 'Kiiteru?', note: 'Are you listening?' },
        }
    },
    {
        verb: '見る',
        reading: 'みる',
        meaning: 'to see / watch',
        commonKanji: '見',
        conjugations: {
            past: { jp: '見た', romaji: 'Mita', meaning: 'I saw' },
            negative: { jp: '見ない', romaji: 'Minai', meaning: "I don't see" },
            teForm: { jp: '見て', romaji: 'Mite', meaning: 'Look and... / Please look' },
            politePast: { jp: '見ました', romaji: 'Mimashita', meaning: 'I saw (polite)' },
            politePresent: { jp: '見ます', romaji: 'Mimasu', meaning: 'I see (polite)' },
        },
        subtlety: {
            label: 'Watching',
            standard: { jp: '見ない', romaji: 'Minai', note: 'Standard negative' },
            casual: { jp: '見ん', romaji: 'Min', note: 'Colloquial refusal' },
            colloquial: { jp: '見ての通り', romaji: 'Mite-no-toori', note: 'As you can see...' },
        },
        context: {
            label: 'Observation',
            form: { jp: '見てる', romaji: 'Miteru', note: 'I am watching' },
        }
    },
    {
        verb: '寝る',
        reading: 'ねる',
        meaning: 'to sleep',
        commonKanji: '寝',
        conjugations: {
            past: { jp: '寝た', romaji: 'Neta', meaning: 'I slept' },
            negative: { jp: '寝ない', romaji: 'Nenai', meaning: "I don't sleep" },
            teForm: { jp: '寝て', romaji: 'Nete', meaning: 'Sleep and... / Go sleep' },
            politePast: { jp: '寝ました', romaji: 'Nemashita', meaning: 'I slept (polite)' },
            politePresent: { jp: '寝ます', romaji: 'Nemasu', meaning: 'I sleep (polite)' },
        },
        subtlety: {
            label: 'Waking issues',
            standard: { jp: '寝ない', romaji: 'Nenai', note: 'Standard negative' },
            casual: { jp: '寝ん', romaji: 'Nen', note: 'Colloquial refusal' },
            colloquial: { jp: '寝坊', romaji: 'Nebou', note: 'Oversleeping (noun/verb)' },
        },
        context: {
            label: 'Desire',
            form: { jp: '寝たい', romaji: 'Netai', note: 'I want to sleep' },
        }
    },
    {
        verb: '起きる',
        reading: 'おきる',
        meaning: 'to wake up',
        commonKanji: '起',
        conjugations: {
            past: { jp: '起きた', romaji: 'Okita', meaning: 'I woke up' },
            negative: { jp: '起きない', romaji: 'Okinai', meaning: "I don't wake up" },
            teForm: { jp: '起きて', romaji: 'Okite', meaning: 'Wake up and... / Wake up!' },
            politePast: { jp: '起きました', romaji: 'Okimashita', meaning: 'I woke up (polite)' },
            politePresent: { jp: '起きます', romaji: 'Okimasu', meaning: 'I wake up (polite)' },
        },
        subtlety: {
            label: 'State',
            standard: { jp: '起きない', romaji: 'Okinai', note: 'Standard negative' },
            casual: { jp: '起きん', romaji: 'Okin', note: 'Colloquial refusal' },
            colloquial: { jp: '起きてる', romaji: 'Okiteru', note: 'I am awake (already)' },
        },
        context: {
            label: 'Emergency',
            form: { jp: '何かが起きた', romaji: 'Nanika ga okita', note: 'Something happened (secondary meaning)' },
        }
    },
    {
        verb: '会う',
        reading: 'あう',
        meaning: 'to meet',
        commonKanji: '会',
        conjugations: {
            past: { jp: '会った', romaji: 'Atta', meaning: 'I met' },
            negative: { jp: '会わない', romaji: 'Awanai', meaning: "I don't meet" },
            teForm: { jp: '会って', romaji: 'Atte', meaning: 'Meet and... / Please meet' },
            politePast: { jp: '会いました', romaji: 'Aimashita', meaning: 'I met (polite)' },
            politePresent: { jp: '会います', romaji: 'Aimasu', meaning: 'I meet (polite)' },
        },
        subtlety: {
            label: 'Social',
            standard: { jp: '会わない', romaji: 'Awanai', note: 'Standard negative' },
            casual: { jp: '会わん', romaji: 'Awan', note: 'Colloquial refusal' },
            colloquial: { jp: '会いに行く', romaji: 'Ai-ni-iku', note: 'To go see someone' },
        },
        context: {
            label: 'Desire',
            form: { jp: '会いたい', romaji: 'Aitai', note: 'I want to see/meet you' },
        }
    },
    {
        verb: '買う',
        reading: 'かう',
        meaning: 'to buy',
        commonKanji: '買',
        conjugations: {
            past: { jp: '買った', romaji: 'Katta', meaning: 'I bought' },
            negative: { jp: '買わない', romaji: 'Kawanai', meaning: "I don't buy" },
            teForm: { jp: '買って', romaji: 'Katte', meaning: 'Buy and... / Please buy' },
            politePast: { jp: '買いました', romaji: 'Kaimashita', meaning: 'I bought (polite)' },
            politePresent: { jp: '買います', romaji: 'Kaimasu', meaning: 'I buy (polite)' },
        },
        subtlety: {
            label: 'Shopping',
            standard: { jp: '買わない', romaji: 'Kawanai', note: 'Standard negative' },
            casual: { jp: '買わん', romaji: 'Kawan', note: 'Colloquial refusal' },
            colloquial: { jp: '買い物', romaji: 'Kaimono', note: 'Shopping (noun)' },
        },
        context: {
            label: 'Possession',
            form: { jp: '買い占める', romaji: 'Kaishimeru', note: 'To buy up everything' },
        }
    },
    {
        verb: '遊ぶ',
        reading: 'あそぶ',
        meaning: 'to play / hang out',
        commonKanji: '遊',
        conjugations: {
            past: { jp: '遊んだ', romaji: 'Asonda', meaning: 'I played' },
            negative: { jp: '遊ばない', romaji: 'Asobanai', meaning: "I don't play" },
            teForm: { jp: '遊んで', romaji: 'Asonde', meaning: 'Play and... / Play with me' },
            politePast: { jp: '遊びました', romaji: 'Asobimashita', meaning: 'I played (polite)' },
            politePresent: { jp: '遊びます', romaji: 'Asobimasu', meaning: 'I play (polite)' },
        },
        subtlety: {
            label: 'Social Fun',
            standard: { jp: '遊ばない', romaji: 'Asobanai', note: 'Standard negative' },
            casual: { jp: '遊ばん', romaji: 'Asoban', note: 'Colloquial refusal' },
            colloquial: { jp: '遊びまわる', romaji: 'Asobimawaru', note: 'To play around everywhere' },
        },
        context: {
            label: 'Status',
            form: { jp: '遊んでる', romaji: 'Asonderu', note: 'He is playing / He is slacking off' },
        }
    },
    {
        verb: '休む',
        reading: 'やすむ',
        meaning: 'to rest / take a day off',
        commonKanji: '休',
        conjugations: {
            past: { jp: '休んだ', romaji: 'Yasunda', meaning: 'I rested' },
            negative: { jp: '休まない', romaji: 'Yasumanai', meaning: "I don't rest" },
            teForm: { jp: '休んで', romaji: 'Yasunde', meaning: 'Rest and... / Please rest' },
            politePast: { jp: '休みました', romaji: 'Yasumimashita', meaning: 'I rested (polite)' },
            politePresent: { jp: '休みます', romaji: 'Yasumimasu', meaning: 'I rest (polite)' },
        },
        subtlety: {
            label: 'Absence',
            standard: { jp: '休まない', romaji: 'Yasumanai', note: 'Standard negative' },
            casual: { jp: '休まん', romaji: 'Yasuman', note: 'Colloquial refusal' },
            colloquial: { jp: '休み', romaji: 'Yasumi', note: 'Break / Holiday / Day off' },
        },
        context: {
            label: 'Polite Request',
            form: { jp: 'お休みください', romaji: 'O-yasumi-kudasai', note: 'Please have a rest' },
        }
    },
    {
        verb: '待つ',
        reading: 'まつ',
        meaning: 'to wait',
        commonKanji: '待',
        conjugations: {
            past: { jp: '待った', romaji: 'Matta', meaning: 'I waited' },
            negative: { jp: '待たない', romaji: 'Matanai', meaning: "I don't wait" },
            teForm: { jp: '待って', romaji: 'Matte', meaning: 'Wait! / Wait and...' },
            politePast: { jp: '待ちました', romaji: 'Machimashita', meaning: 'I waited (polite)' },
            politePresent: { jp: '待ちます', romaji: 'Machimasu', meaning: 'I wait (polite)' },
        },
        subtlety: {
            label: 'Urgency',
            standard: { jp: '待たない', romaji: 'Matanai', note: 'Standard negative' },
            casual: { jp: '待たん', romaji: 'Matan', note: 'Colloquial refusal' },
            colloquial: { jp: 'ちょっと待って', romaji: 'Chotto matte', note: 'Wait a second! (Very common)' },
        },
        context: {
            label: 'Expectation',
            form: { jp: '待ってる', romaji: 'Matteru', note: 'I am waiting' },
        }
    },
    {
        verb: '持つ',
        reading: 'もつ',
        meaning: 'to hold / carry / possess',
        commonKanji: '持',
        conjugations: {
            past: { jp: '持った', romaji: 'Motta', meaning: 'I held' },
            negative: { jp: '持たない', romaji: 'Motanai', meaning: "I don't hold" },
            teForm: { jp: '持って', romaji: 'Motte', meaning: 'Hold and... / Please hold' },
            politePast: { jp: '持ちました', romaji: 'Mochimashita', meaning: 'I held (polite)' },
            politePresent: { jp: '持ちます', romaji: 'Mochimasu', meaning: 'I hold (polite)' },
        },
        subtlety: {
            label: 'Possession',
            standard: { jp: '持たない', romaji: 'Motanai', note: 'Standard negative' },
            casual: { jp: '持ってない', romaji: 'Mottenai', note: 'I do not have it' },
            colloquial: { jp: '金持ち', romaji: 'Kanemochi', note: 'Rich person (Money-holder)' },
        },
        context: {
            label: 'Departure',
            form: { jp: '持っていく', romaji: 'Motte-iku', note: 'To take (something) along' },
        }
    },
    {
        verb: 'する',
        reading: 'する',
        meaning: 'to do',
        commonKanji: '為',
        conjugations: {
            past: { jp: 'した', romaji: 'Shita', meaning: 'I did' },
            negative: { jp: 'しない', romaji: 'Shinai', meaning: "I don't do" },
            teForm: { jp: 'して', romaji: 'Shite', meaning: 'Do and... / Please do' },
            politePast: { jp: 'しました', romaji: 'Shimashita', meaning: 'I did (polite)' },
            politePresent: { jp: 'します', romaji: 'Shimasu', meaning: 'I do (polite)' },
        },
        subtlety: {
            label: 'Doing variations',
            standard: { jp: 'しない', romaji: 'Shinai', note: 'Standard negative' },
            casual: { jp: 'しん', romaji: 'Shin', note: 'Rare colloquial (dialectal)' },
            colloquial: { jp: 'しよう', romaji: 'Shiyou', note: "Let's do it!" },
        },
        context: {
            label: 'Request',
            form: { jp: 'してほしい', romaji: 'Shite-hoshii', note: 'I want you to do it' },
        }
    },
    {
        verb: 'ある',
        reading: 'ある',
        meaning: 'to exist / have (inanimate)',
        commonKanji: '有',
        conjugations: {
            past: { jp: 'あった', romaji: 'Atta', meaning: 'It existed / It was' },
            negative: { jp: 'ない', romaji: 'Nai', meaning: 'It does not exist (Irregular!)' },
            teForm: { jp: 'あって', romaji: 'Atte', meaning: 'Exist and...' },
            politePast: { jp: 'ありました', romaji: 'Arimashita', meaning: 'It existed (polite)' },
            politePresent: { jp: 'あります', romaji: 'Arimasu', meaning: 'It exists (polite)' },
        },
        subtlety: {
            label: 'Presence',
            standard: { jp: 'ない', romaji: 'Nai', note: 'Standard negative (Total replacement)' },
            casual: { jp: 'ねぇ', romaji: 'Nee', note: 'Slangy "there isn\'t"' },
            colloquial: { jp: 'あんなあ', romaji: 'Annaa', note: 'You see... (Intro filler)' },
        },
        context: {
            label: 'Secondary',
            form: { jp: '～てある', romaji: '...te aru', note: 'Has been done (Resulting state)' },
        }
    },
    {
        verb: 'いる',
        reading: 'いる',
        meaning: 'to exist / be (living)',
        commonKanji: '居',
        conjugations: {
            past: { jp: 'いた', romaji: 'Ita', meaning: 'I was' },
            negative: { jp: 'いない', romaji: 'Inai', meaning: 'I am not' },
            teForm: { jp: 'いて', romaji: 'Ite', meaning: 'Stay and... / Please stay' },
            politePast: { jp: 'いました', romaji: 'Imashita', meaning: 'I was (polite)' },
            politePresent: { jp: 'います', romaji: 'Imasu', meaning: 'I am (polite)' },
        },
        subtlety: {
            label: 'Living Presence',
            standard: { jp: 'いない', romaji: 'Inai', note: 'Standard negative' },
            casual: { jp: 'いん', romaji: 'In', note: 'Colloquial refusal' },
            colloquial: { jp: 'いなさい', romaji: 'Inasai', note: 'Be/Stay there! (Command)' },
        },
        context: {
            label: 'Ongoing state',
            form: { jp: '～ている', romaji: '...te iru', note: 'Is currently (doing something)' },
        }
    },
    {
        verb: '言う',
        reading: 'いう',
        meaning: 'to say',
        commonKanji: '言',
        conjugations: {
            past: { jp: '言った', romaji: 'Itta', meaning: 'I said' },
            negative: { jp: '言わない', romaji: 'Iwanai', meaning: "I don't say" },
            teForm: { jp: '言って', romaji: 'Itte', meaning: 'Say and... / Please say' },
            politePast: { jp: '言いました', romaji: 'Iimashita', meaning: 'I said (polite)' },
            politePresent: { jp: '言います', romaji: 'Iimasu', meaning: 'I say (polite)' },
        },
        subtlety: {
            label: 'Speech Variations',
            standard: { jp: '言わない', romaji: 'Iwanai', note: 'Standard negative' },
            casual: { jp: '言わん', romaji: 'Iwan', note: 'Colloquial "not saying"' },
            colloquial: { jp: '言っちゃえ', romaji: 'Icchae', note: 'Go ahead and say it!' },
        },
        context: {
            label: 'Quotation',
            form: { jp: '～と言う', romaji: '...to iu', note: 'Is called / Says that...' },
        }
    },
    {
        verb: '思う',
        reading: 'おもう',
        meaning: 'to think',
        commonKanji: '思',
        conjugations: {
            past: { jp: '思った', romaji: 'Omotta', meaning: 'I thought' },
            negative: { jp: '思わない', romaji: 'Omowanai', meaning: "I don't think" },
            teForm: { jp: '思って', romaji: 'Omotte', meaning: 'Think and...' },
            politePast: { jp: '思いました', romaji: 'Omoimashita', meaning: 'I thought (polite)' },
            politePresent: { jp: '思います', romaji: 'Omoimasu', meaning: 'I think (polite)' },
        },
        subtlety: {
            label: 'Opinion',
            standard: { jp: '思わない', romaji: 'Omowanai', note: 'Standard negative' },
            casual: { jp: '思わん', romaji: 'Omowan', note: 'Colloquial "don\'t think so"' },
            colloquial: { jp: '思わず', romaji: 'Omowazu', note: 'Unintentionally / Spontaneously' },
        },
        context: {
            label: 'Opinion marking',
            form: { jp: '～と思う', romaji: '...to omou', note: 'I think that...' },
        }
    },
    {
        verb: '作る',
        reading: 'つくる',
        meaning: 'to make / create',
        commonKanji: '作',
        conjugations: {
            past: { jp: '作った', romaji: 'Tsukutta', meaning: 'I made' },
            negative: { jp: '作らない', romaji: 'Tsukuranai', meaning: "I don't make" },
            teForm: { jp: '作って', romaji: 'Tsukutte', meaning: 'Make and... / Please make' },
            politePast: { jp: '作りました', romaji: 'Tsukurimashita', meaning: 'I made (polite)' },
            politePresent: { jp: '作ります', romaji: 'Tsukurimasu', meaning: 'I make (polite)' },
        },
        subtlety: {
            label: 'Creation',
            standard: { jp: '作らない', romaji: 'Tsukuranai', note: 'Standard negative' },
            casual: { jp: '作らん', romaji: 'Tsukuran', note: 'Colloquial refusal' },
            colloquial: { jp: '作り直す', romaji: 'Tsukurinaosu', note: 'To remake / redo' },
        },
        context: {
            label: 'Recipe',
            form: { jp: '作り方', romaji: 'Tsukurikata', note: 'How to make / Recipe' },
        }
    }
];
