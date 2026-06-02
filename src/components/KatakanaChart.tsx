import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useAudio } from '../hooks/useAudio';

interface KanaGridItem {
    char: string;
    romaji: string;
}

const SEION: (KanaGridItem | null)[][] = [
    [{ char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' }],
    [{ char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' }],
    [{ char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' }],
    [{ char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' }],
    [{ char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' }],
    [{ char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' }],
    [{ char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' }],
    [{ char: 'ヤ', romaji: 'ya' }, null, { char: 'ユ', romaji: 'yu' }, null, { char: 'ヨ', romaji: 'yo' }],
    [{ char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' }],
    [{ char: 'ワ', romaji: 'wa' }, null, null, null, { char: 'ヲ', romaji: 'wo' }],
    [{ char: 'ン', romaji: 'n' }, null, null, null, null],
];

const DAKUON: (KanaGridItem | null)[][] = [
    [{ char: 'ガ', romaji: 'ga' }, { char: 'ギ', romaji: 'gi' }, { char: 'グ', romaji: 'gu' }, { char: 'ゲ', romaji: 'ge' }, { char: 'ゴ', romaji: 'go' }],
    [{ char: 'ザ', romaji: 'za' }, { char: 'ジ', romaji: 'ji' }, { char: 'ズ', romaji: 'zu' }, { char: 'ゼ', romaji: 'ze' }, { char: 'ゾ', romaji: 'zo' }],
    [{ char: 'ダ', romaji: 'da' }, { char: 'ヂ', romaji: 'di' }, { char: 'ヅ', romaji: 'du' }, { char: 'デ', romaji: 'de' }, { char: 'ド', romaji: 'do' }],
    [{ char: 'バ', romaji: 'ba' }, { char: 'ビ', romaji: 'bi' }, { char: 'ブ', romaji: 'bu' }, { char: 'ベ', romaji: 'be' }, { char: 'ボ', romaji: 'bo' }],
    [{ char: 'パ', romaji: 'pa' }, { char: 'ピ', romaji: 'pi' }, { char: 'プ', romaji: 'pu' }, { char: 'ペ', romaji: 'pe' }, { char: 'ポ', romaji: 'po' }],
];

const YOON: (KanaGridItem | null)[][] = [
    [{ char: 'キャ', romaji: 'kya' }, { char: 'キュ', romaji: 'kyu' }, { char: 'キョ', romaji: 'kyo' }],
    [{ char: 'シャ', romaji: 'sha' }, { char: 'シュ', romaji: 'shu' }, { char: 'ショ', romaji: 'sho' }],
    [{ char: 'チャ', romaji: 'cha' }, { char: 'チュ', romaji: 'chu' }, { char: 'チョ', romaji: 'cho' }],
    [{ char: 'ニャ', romaji: 'nya' }, { char: 'ニュ', romaji: 'nyu' }, { char: 'ニョ', romaji: 'nyo' }],
    [{ char: 'ヒャ', romaji: 'hya' }, { char: 'ヒュ', romaji: 'hyu' }, { char: 'ヒョ', romaji: 'hyo' }],
    [{ char: 'ミャ', romaji: 'mya' }, { char: 'ミュ', romaji: 'myu' }, { char: 'ミョ', romaji: 'myo' }],
    [{ char: 'リャ', romaji: 'rya' }, { char: 'リュ', romaji: 'ryu' }, { char: 'リョ', romaji: 'ryo' }],
    [{ char: 'ギャ', romaji: 'gya' }, { char: 'ギュ', romaji: 'gyu' }, { char: 'ギョ', romaji: 'gyo' }],
    [{ char: 'ジャ', romaji: 'jya' }, { char: 'ジュ', romaji: 'jyu' }, { char: 'ジョ', romaji: 'jyo' }],
    [{ char: 'ヂャ', romaji: 'dya' }, { char: 'ヂュ', romaji: 'dyu' }, { char: 'ヂョ', romaji: 'dyo' }],
    [{ char: 'ビャ', romaji: 'bya' }, { char: 'ビュ', romaji: 'byu' }, { char: 'ビョ', romaji: 'byo' }],
    [{ char: 'ピャ', romaji: 'pya' }, { char: 'ピュ', romaji: 'pyu' }, { char: 'ピョ', romaji: 'pyo' }],
];

export const KatakanaChart: React.FC = () => {
    const { learnedKana } = useStore();
    const { play } = useAudio();
    const learnedChars = learnedKana.map(k => k.char);

    const renderCell = (item: KanaGridItem | null, isYoon = false) => {
        if (!item) return <div key={Math.random()} className="aspect-square" />;

        const isLearned = learnedChars.includes(item.char);

        return (
            <motion.div
                key={item.char}
                initial={false}
                animate={{ scale: isLearned ? 1 : 0.95 }}
                onClick={() => isLearned && play(item.char)}
                className={`
                    flex flex-col items-center justify-center rounded-xl transition-all duration-300 border-2
                    ${isLearned
                        ? 'bg-white border-deep-indigo shadow-md hover:scale-110 active:scale-95 z-10 cursor-pointer'
                        : 'bg-slate-100 border-slate-200 opacity-40 grayscale cursor-default'
                    }
                    ${isYoon ? 'aspect-[1.5/1] py-1' : 'aspect-square'}
                `}
            >
                <span className={`font-jp font-black ${isYoon ? 'text-xl' : 'text-2xl'} ${isLearned ? 'text-deep-indigo' : 'text-slate-400'}`}>
                    {item.char}
                </span>
                <span className={`text-[10px] font-bold font-mono uppercase ${isLearned ? 'text-sakura-pink' : 'text-slate-300'}`}>
                    {item.romaji}
                </span>
            </motion.div>
        );
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Seion Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-deep-indigo text-white flex items-center justify-center font-bold">1</span>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Standard Sounds <span className="text-slate-400 text-sm font-medium">(Seion)</span></h3>
                </div>
                <div className="grid grid-cols-5 gap-2 bg-indigo-50/30 p-4 rounded-3xl border-2 border-dashed border-indigo-100/50">
                    {SEION.flatMap(row => row).map(item => renderCell(item))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dakuon Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">2</span>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Voiced Sounds <span className="text-slate-400 text-sm font-medium">(Dakuon)</span></h3>
                    </div>
                    <div className="grid grid-cols-5 gap-2 bg-emerald-50/30 p-4 rounded-3xl border-2 border-dashed border-emerald-100/50">
                        {DAKUON.flatMap(row => row).map(item => renderCell(item))}
                    </div>
                </div>

                {/* Yoon Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">3</span>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Combo Sounds <span className="text-slate-400 text-sm font-medium">(Yoon)</span></h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 bg-amber-50/30 p-4 rounded-3xl border-2 border-dashed border-amber-100/50">
                        {YOON.flatMap(row => row).map(item => renderCell(item, true))}
                    </div>
                </div>
            </div>

            <div className="text-center py-4">
                <p className="text-slate-500 font-medium italic">Unlocked: {learnedChars.filter(char => SEION.flatMap(r => r).concat(DAKUON.flatMap(r => r)).concat(YOON.flatMap(r => r)).some(i => i?.char === char)).length} / 107</p>
            </div>
        </div>
    );
};
