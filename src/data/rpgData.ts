import type { RPGCard, RPGEnemy } from '../store/useRPGStore';
import { 
    PIXEL_KAPPA, PIXEL_TENGU, PIXEL_KITSUNE, PIXEL_ONI, PIXEL_RYU,
    PIXEL_NURIKABE, PIXEL_ROKUROKUBI, PIXEL_KASA_OBAKE, PIXEL_KUCHISAKE_ONNA,
    PIXEL_ZASHIKI_WARASHI, PIXEL_JUBOKKO, PIXEL_GASHADOKURO, PIXEL_YUKI_ONNA,
    PIXEL_YAMA_UBA, PIXEL_FUNAYUREI, PIXEL_YUREI
} from '../lib/pixelSprites';

export const starterDeck: RPGCard[] = [
    {
        id: 'c1',
        name: 'Strike (私)',
        description: 'Deal 6 damage.',
        cost: 1,
        type: 'attack',
        value: 6,
        upgradeLevel: 0,
        prompt: {
            id: 'p1',
            japanese: '青い空が見えます。',
            english: 'I can see the blue sky.',
            romaji: 'aoi sora ga miemasu.',
            literal: 'blue sky (subject) can-see.',
            parts: ['_', '空が見えます。'],
            blanks: [{
                position: 0,
                answer: '青い',
                choices: [
                    { id: 'a', text: '青い', romaji: 'aoi', meaning: 'blue' },
                    { id: 'b', text: '赤い', romaji: 'akai', meaning: 'red' },
                    { id: 'c', text: '白い', romaji: 'shiroi', meaning: 'white' },
                    { id: 'd', text: '黒い', romaji: 'kuroi', meaning: 'black' }
                ]
            }]
        }
    },
    {
        id: 'c2',
        name: 'Block (守る)',
        description: 'Gain 5 Block.',
        cost: 1,
        type: 'skill',
        value: 5,
        upgradeLevel: 0,
        prompt: {
            id: 'p2',
            japanese: '庭に猫がいます。',
            english: 'There is a cat in the garden.',
            romaji: 'niwa ni neko ga imasu.',
            literal: 'garden in cat (subject) exists.',
            parts: ['庭に', '_', 'がいます。'],
            blanks: [{
                position: 1,
                answer: '猫',
                choices: [
                    { id: 'a', text: '猫', romaji: 'neko', meaning: 'cat' },
                    { id: 'b', text: '犬', romaji: 'inu', meaning: 'dog' },
                    { id: 'c', text: 'とり', romaji: 'tori', meaning: 'bird' },
                    { id: 'd', text: 'さかな', romaji: 'sakana', meaning: 'fish' }
                ]
            }]
        }
    },
    {
        id: 'c3',
        name: 'Heavy Strike (強打)',
        description: 'Deal 10 damage.',
        cost: 2,
        type: 'attack',
        value: 10,
        upgradeLevel: 0,
        prompt: {
            id: 'p3',
            japanese: '山へ登りたいです。',
            english: 'I want to climb the mountain.',
            romaji: 'yama e noboritai desu.',
            literal: 'mountain to want-to-climb.',
            parts: ['_', 'へ登りたいです。'],
            blanks: [{
                position: 0,
                answer: '山',
                choices: [
                    { id: 'a', text: '山', romaji: 'yama', meaning: 'mountain' },
                    { id: 'b', text: '海', romaji: 'umi', meaning: 'sea' },
                    { id: 'c', text: '空', romaji: 'sora', meaning: 'sky' },
                    { id: 'd', text: '川', romaji: 'kawa', meaning: 'river' }
                ]
            }]
        }
    }
];

export const cardPool: RPGCard[] = [
    {
        id: 'c4',
        name: 'Quick Strike',
        description: 'Deal 5 damage.',
        cost: 1,
        type: 'attack',
        value: 5,
        upgradeLevel: 0,
        prompt: {
            id: 'p4',
            japanese: '速く行きます。',
            english: 'I will go fast.',
            romaji: 'hayaku ikimasu.',
            literal: 'fast go.',
            parts: ['速く', '_', '。'],
            blanks: [{
                position: 1,
                answer: '行きます',
                choices: [
                    { id: 'a', text: '行きます', romaji: 'ikimasu', meaning: 'go' },
                    { id: 'b', text: '来ます', romaji: 'kimasu', meaning: 'come' },
                    { id: 'c', text: '食べます', romaji: 'tabemasu', meaning: 'eat' },
                    { id: 'd', text: '寝ます', romaji: 'nemasu', meaning: 'sleep' }
                ]
            }]
        }
    },
    {
        id: 'c5',
        name: 'Zen Guard',
        description: 'Gain 8 Block.',
        cost: 2,
        type: 'skill',
        value: 8,
        upgradeLevel: 0,
        prompt: {
            id: 'p5',
            japanese: '今日は静かです。',
            english: 'It is quiet today.',
            romaji: 'kyou wa shizuka desu.',
            literal: 'today (topic) quiet is.',
            parts: ['今日は', '_', 'です。'],
            blanks: [{
                position: 1,
                answer: '静か',
                choices: [
                    { id: 'a', text: '静か', romaji: 'shizuka', meaning: 'quiet' },
                    { id: 'b', text: 'にぎやか', romaji: 'nigiyaka', meaning: 'lively' },
                    { id: 'c', text: 'きれい', romaji: 'kirei', meaning: 'beautiful/clean' },
                    { id: 'd', text: 'ひま', romaji: 'hima', meaning: 'free time' }
                ]
            }]
        }
    },
    {
        id: 'c6',
        name: 'Soul Strike',
        description: 'Deal 15 damage.',
        cost: 3,
        type: 'attack',
        value: 15,
        upgradeLevel: 0,
        prompt: {
            id: 'p6',
            japanese: '日本語を話します。',
            english: 'I speak Japanese.',
            romaji: 'nihongo o hanashimasu.',
            literal: 'Japanese (object) speak.',
            parts: ['_', 'を話します。'],
            blanks: [{
                position: 0,
                answer: '日本語',
                choices: [
                    { id: 'a', text: '日本語', romaji: 'nihongo', meaning: 'Japanese' },
                    { id: 'b', text: '英語', romaji: 'eigo', meaning: 'English' },
                    { id: 'c', text: '中国語', romaji: 'chuugokugo', meaning: 'Chinese' },
                    { id: 'd', text: '韓国語', romaji: 'kankokugo', meaning: 'Korean' }
                ]
            }]
        }
    },
    {
        id: 'c7',
        name: 'Mastery Strike',
        description: 'Deal 20 damage.',
        cost: 3,
        type: 'attack',
        value: 20,
        upgradeLevel: 0,
        prompt: {
            id: 's1',
            english: 'I eat sushi and drink water.',
            japanese: '私はすしを食べて水を飲みます。',
            romaji: 'watashi wa sushi o tabete mizu o nomimasu.',
            literal: 'I (topic) sushi eat-and water (object) drink.',
            words: [
                { id: '1', text: '私は', meaning: 'I', romaji: 'watashi wa' },
                { id: '2', text: 'すしを', meaning: 'sushi', romaji: 'sushi o' },
                { id: '3', text: '食べて', meaning: 'eat (and)', romaji: 'tabete' },
                { id: '4', text: '水を', meaning: 'water', romaji: 'mizu o' },
                { id: '5', text: '飲みます', meaning: 'drink', romaji: 'nomimasu' }
            ],
            solution: ['私は', 'すしを', '食べて', '水を', '飲みます']
        }
    },
    {
        id: 'c8',
        name: 'Katana Slash',
        description: 'Deal 12 damage.',
        cost: 2,
        type: 'attack',
        value: 12,
        upgradeLevel: 0,
        prompt: {
            id: 'p8',
            japanese: '刀で切ります。',
            english: 'I cut with a katana.',
            romaji: 'katana de kirimasu.',
            literal: 'katana with cut.',
            parts: ['_', 'で切ります。'],
            blanks: [{ position: 0, answer: '刀', choices: [{ id: 'a', text: '刀', romaji: 'katana' }, { id: 'b', text: '剣', romaji: 'ken' }] }]
        }
    },
    {
        id: 'c9',
        name: 'Karate Punch',
        description: 'Deal 7 damage.',
        cost: 1,
        type: 'attack',
        value: 7,
        upgradeLevel: 0,
        prompt: {
            id: 'p9',
            japanese: '空手ですね。',
            english: 'It is Karate, right?',
            romaji: 'karate desu ne.',
            literal: 'karate is right?',
            parts: ['_', 'ですね。'],
            blanks: [{ position: 0, answer: '空手', choices: [{ id: 'a', text: '空手', romaji: 'karate' }, { id: 'b', text: '柔道', romaji: 'juudou' }] }]
        }
    },
    {
        id: 'c10',
        name: 'Paper Screen',
        description: 'Gain 4 Block.',
        cost: 0,
        type: 'skill',
        value: 4,
        upgradeLevel: 0,
        prompt: {
            id: 'p10',
            japanese: '障子を閉めます。',
            english: 'I close the shoji.',
            romaji: 'shouji o shimemasu.',
            literal: 'shoji (object) close.',
            parts: ['_', 'を閉めます。'],
            blanks: [{ position: 0, answer: '障子', choices: [{ id: 'a', text: '障子', romaji: 'shouji' }, { id: 'b', text: '窓', romaji: 'mado' }] }]
        }
    },
    {
        id: 'c11',
        name: 'Shinto Shield',
        description: 'Gain 12 Block.',
        cost: 2,
        type: 'skill',
        value: 12,
        upgradeLevel: 0,
        prompt: {
            id: 'p11',
            japanese: '神社を守ります。',
            english: 'I protect the shrine.',
            romaji: 'jinja o mamorimasu.',
            literal: 'shrine (object) protect.',
            parts: ['_', 'を守ります。'],
            blanks: [{ position: 0, answer: '神社', choices: [{ id: 'a', text: '神社', romaji: 'jinja' }, { id: 'b', text: '寺', romaji: 'tera' }] }]
        }
    },
    {
        id: 'c12',
        name: 'Haiku Muse',
        description: 'Deal 10 damage.',
        cost: 1,
        type: 'attack',
        value: 10,
        upgradeLevel: 0,
        prompt: {
            id: 'p12',
            japanese: '俳句を読みます。',
            english: 'I read a haiku.',
            romaji: 'haiku o yomimasu.',
            literal: 'haiku (object) read.',
            parts: ['_', 'を読みます。'],
            blanks: [{ position: 0, answer: '俳句', choices: [{ id: 'a', text: '俳句', romaji: 'haiku' }, { id: 'b', text: '和歌', romaji: 'waka' }] }]
        }
    },
    {
        id: 'c13',
        name: 'Kitsune Fire',
        description: 'Deal 15 damage.',
        cost: 2,
        type: 'attack',
        value: 15,
        upgradeLevel: 0,
        prompt: {
            id: 'p13',
            japanese: '狐火が見えます。',
            english: 'I see kitsunebi.',
            romaji: 'kitsunebi ga miemasu.',
            literal: 'foxfire (subject) can-see.',
            parts: ['_', 'が見えます。'],
            blanks: [{ position: 0, answer: '狐火', choices: [{ id: 'a', text: '狐火', romaji: 'kitsunebi' }, { id: 'b', text: '焚火', romaji: 'takibi' }] }]
        }
    },
    {
        id: 'c14',
        name: 'Fireball Jutsu',
        description: 'Deal 22 damage.',
        cost: 3,
        type: 'attack',
        value: 22,
        upgradeLevel: 0,
        prompt: {
            id: 'p14',
            japanese: '火遁、豪火球の術！',
            english: 'Fire Style: Fireball Jutsu!',
            romaji: 'katon, goukakyuu no jutsu!',
            literal: 'fire release, fireball (possessive) technique!',
            parts: ['火遁、', '_', 'の術！'],
            blanks: [{ position: 1, answer: '豪火球', choices: [{ id: 'a', text: '豪火球', romaji: 'goukakyuu' }, { id: 'b', text: '水龍', romaji: 'suiryuu' }] }]
        }
    },
    {
        id: 'b1',
        name: 'Light Strike',
        description: 'Deal 4 damage.',
        cost: 1,
        type: 'attack',
        value: 4,
        upgradeLevel: 0,
        prompt: {
            id: 'p-b1',
            japanese: 'りんごを食べます。',
            english: 'I eat an apple.',
            romaji: 'ringo o tabemasu.',
            literal: 'apple (object) eat.',
            parts: ['_', 'を食べます。'],
            blanks: [{ position: 0, answer: 'りんご', choices: [{ id: 'a', text: 'りんご', romaji: 'ringo' }, { id: 'b', text: 'みかん', romaji: 'mikan' }] }]
        }
    },
    {
        id: 'b2',
        name: 'Minor Ward',
        description: 'Gain 3 Block.',
        cost: 0,
        type: 'skill',
        value: 3,
        upgradeLevel: 0,
        prompt: {
            id: 'p-b2',
            japanese: '本を読みます。',
            english: 'I read a book.',
            romaji: 'hon o yomimasu.',
            literal: 'book (object) read.',
            parts: ['_', 'を読みます。'],
            blanks: [{ position: 0, answer: '本', choices: [{ id: 'a', text: '本', romaji: 'hon' }, { id: 'b', text: '雑誌', romaji: 'zasshi' }] }]
        }
    }
];

export const yokaiEnemies: RPGEnemy[] = [
    {
        id: 'kappa',
        name: 'Kappa (河童)',
        hp: 15,
        maxHp: 15,
        image: PIXEL_KAPPA,
        intent: 'attack',
        intentValue: 3,
        turnCount: 0,
        description: 'A water imp. It looks like it wants your cucumber!'
    },
    {
        id: 'tengu',
        name: 'Tengu (天狗)',
        hp: 15,
        maxHp: 15,
        image: PIXEL_TENGU,
        intent: 'attack',
        intentValue: 4,
        turnCount: 0,
        description: 'A mountain spirit with a long nose.'
    },
    {
        id: 'kitsune',
        name: 'Kitsune (狐)',
        hp: 15,
        maxHp: 15,
        image: PIXEL_KITSUNE,
        intent: 'debuff',
        intentValue: 2,
        turnCount: 0,
        description: 'A tricky fox spirit.'
    },
    {
        id: 'oni',
        name: 'Oni (鬼)',
        hp: 30,
        maxHp: 30,
        image: PIXEL_ONI,
        intent: 'attack',
        intentValue: 12,
        turnCount: 0,
        isBoss: true,
        description: 'A powerful red ogre. Watch out for its club!'
    },
    {
        id: 'ryu',
        name: 'Ryu (竜)',
        hp: 30,
        maxHp: 30,
        image: PIXEL_RYU,
        intent: 'attack',
        intentValue: 15,
        turnCount: 0,
        isBoss: true,
        description: 'A legendary dragon protecting the peak.'
    },
    // NEW YOKAI ENEMIES
    {
        id: 'nurikabe',
        name: 'Nurikabe (塗壁)',
        hp: 20,
        maxHp: 20,
        image: PIXEL_NURIKABE,
        intent: 'defend',
        intentValue: 8,
        turnCount: 0,
        description: 'An invisible wall spirit that blocks your path.'
    },
    {
        id: 'rokurokubi',
        name: 'Rokurokubi (ろくろ首)',
        hp: 18,
        maxHp: 18,
        image: PIXEL_ROKUROKUBI,
        intent: 'attack',
        intentValue: 5,
        turnCount: 0,
        description: 'A woman with an impossibly long neck.'
    },
    {
        id: 'kasa_obake',
        name: 'Kasa-obake (傘おばけ)',
        hp: 16,
        maxHp: 16,
        image: PIXEL_KASA_OBAKE,
        intent: 'attack',
        intentValue: 4,
        turnCount: 0,
        description: 'A living umbrella with one eye and a long tongue.'
    },
    {
        id: 'kuchisake_onna',
        name: 'Kuchisake-onna (口裂け女)',
        hp: 25,
        maxHp: 25,
        image: PIXEL_KUCHISAKE_ONNA,
        intent: 'attack',
        intentValue: 8,
        turnCount: 0,
        description: 'A ghostly woman with a slit mouth who asks if you find her beautiful.'
    },
    {
        id: 'zashiki_warashi',
        name: 'Zashiki-warashi (座敷童子)',
        hp: 14,
        maxHp: 14,
        image: PIXEL_ZASHIKI_WARASHI,
        intent: 'debuff',
        intentValue: 3,
        turnCount: 0,
        description: 'A mischievous house spirit that brings both fortune and trouble.'
    },
    {
        id: 'jubokko',
        name: 'Jubokko (樹伯母子)',
        hp: 22,
        maxHp: 22,
        image: PIXEL_JUBOKKO,
        intent: 'attack',
        intentValue: 6,
        turnCount: 0,
        description: 'A tree demon that feeds on the blood of travelers.'
    },
    {
        id: 'gashadokuro',
        name: 'Gashadokuro (餓者髑髏)',
        hp: 40,
        maxHp: 40,
        image: PIXEL_GASHADOKURO,
        intent: 'attack',
        intentValue: 14,
        turnCount: 0,
        isBoss: true,
        description: 'A giant skeleton made from the bones of starved people.'
    },
    {
        id: 'yuki_onna',
        name: 'Yuki-onna (雪女)',
        hp: 20,
        maxHp: 20,
        image: PIXEL_YUKI_ONNA,
        intent: 'attack',
        intentValue: 7,
        turnCount: 0,
        description: 'A beautiful snow spirit who freezes her victims.'
    },
    {
        id: 'yama_uba',
        name: 'Yama-uba (山姥)',
        hp: 28,
        maxHp: 28,
        image: PIXEL_YAMA_UBA,
        intent: 'attack',
        intentValue: 10,
        turnCount: 0,
        isBoss: true,
        description: 'A mountain witch with long hair and a terrifying face.'
    },
    {
        id: 'funayurei',
        name: 'Funayūrei (船幽霊)',
        hp: 18,
        maxHp: 18,
        image: PIXEL_FUNAYUREI,
        intent: 'attack',
        intentValue: 5,
        turnCount: 0,
        description: 'A ghostly sailor who appears on stormy nights.'
    },
    {
        id: 'yurei',
        name: 'Yūrei (幽霊)',
        hp: 24,
        maxHp: 24,
        image: PIXEL_YUREI,
        intent: 'debuff',
        intentValue: 4,
        turnCount: 0,
        description: 'A traditional Japanese ghost with long black hair and white kimono.'
    }
];

export const initialEnemies: RPGEnemy[] = [
    {
        id: 'e1',
        name: 'Forest Slime',
        hp: 40,
        maxHp: 40,
        intent: 'attack',
        intentValue: 6,
        turnCount: 0,
        image: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=slime',
        description: 'A basic forest creature.'
    },
    {
        id: 'e2',
        name: 'Red Goblin',
        hp: 55,
        maxHp: 55,
        intent: 'attack',
        intentValue: 9,
        turnCount: 0,
        image: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=goblin',
        description: 'A mischievous red goblin.'
    },
    {
        id: 'e3',
        name: 'Ancient Mask',
        hp: 70,
        maxHp: 70,
        intent: 'buff',
        intentValue: 8,
        turnCount: 0,
        isBoss: true,
        image: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=mask',
        description: 'A floating mask with mystical powers.'
    }
];
