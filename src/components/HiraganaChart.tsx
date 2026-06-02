import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useAudio } from '../hooks/useAudio';

interface KanaGridItem {
    char: string;
    romaji: string;
}

const SEION: (KanaGridItem | null)[][] = [
    [{ char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' }],
    [{ char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' }],
    [{ char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' }],
    [{ char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' }],
    [{ char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' }],
    [{ char: 'は', romaji: 'ha/wa' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' }],
    [{ char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' }],
    [{ char: 'や', romaji: 'ya' }, null, { char: 'ゆ', romaji: 'yu' }, null, { char: 'よ', romaji: 'yo' }],
    [{ char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' }],
    [{ char: 'わ', romaji: 'wa' }, null, null, null, { char: 'を', romaji: 'wo' }],
    [{ char: 'ん', romaji: 'n' }, null, null, null, null],
];

const DAKUON: (KanaGridItem | null)[][] = [
    [{ char: 'が', romaji: 'ga' }, { char: 'ぎ', romaji: 'gi' }, { char: 'ぐ', romaji: 'gu' }, { char: 'げ', romaji: 'ge' }, { char: 'ご', romaji: 'go' }],
    [{ char: 'ざ', romaji: 'za' }, { char: 'じ', romaji: 'ji' }, { char: 'ず', romaji: 'zu' }, { char: 'ぜ', romaji: 'ze' }, { char: 'ぞ', romaji: 'zo' }],
    [{ char: 'だ', romaji: 'da' }, { char: 'ぢ', romaji: 'di' }, { char: 'づ', romaji: 'du' }, { char: 'で', romaji: 'de' }, { char: 'ど', romaji: 'do' }],
    [{ char: 'ば', romaji: 'ba' }, { char: 'び', romaji: 'bi' }, { char: 'ぶ', romaji: 'bu' }, { char: 'べ', romaji: 'be' }, { char: 'ぼ', romaji: 'bo' }],
    [{ char: 'ぱ', romaji: 'pa' }, { char: 'ぴ', romaji: 'pi' }, { char: 'ぷ', romaji: 'pu' }, { char: 'ぺ', romaji: 'pe' }, { char: 'ぽ', romaji: 'po' }],
];

const YOON: (KanaGridItem | null)[][] = [
    [{ char: 'きゃ', romaji: 'kya' }, { char: 'きゅ', romaji: 'kyu' }, { char: 'きょ', romaji: 'kyo' }],
    [{ char: 'しゃ', romaji: 'sha' }, { char: 'しゅ', romaji: 'shu' }, { char: 'しょ', romaji: 'sho' }],
    [{ char: 'ちゃ', romaji: 'cha' }, { char: 'ちゅ', romaji: 'chu' }, { char: 'ちょ', romaji: 'cho' }],
    [{ char: 'にゃ', romaji: 'nya' }, { char: 'にゅ', romaji: 'nyu' }, { char: 'にょ', romaji: 'nyo' }],
    [{ char: 'ひゃ', romaji: 'hya' }, { char: 'ひゅ', romaji: 'hyu' }, { char: 'ひょ', romaji: 'hyo' }],
    [{ char: 'みゃ', romaji: 'mya' }, { char: 'みゅ', romaji: 'myu' }, { char: 'みょ', romaji: 'myo' }],
    [{ char: 'りゃ', romaji: 'rya' }, { char: 'りゅ', romaji: 'ryu' }, { char: 'りょ', romaji: 'ryo' }],
    [{ char: 'ぎゃ', romaji: 'gya' }, { char: 'ぎゅ', romaji: 'gyu' }, { char: 'ぎょ', romaji: 'gyo' }],
    [{ char: 'じゃ', romaji: 'jya' }, { char: 'じゅ', romaji: 'jyu' }, { char: 'じょ', romaji: 'jyo' }],
    [{ char: 'ぢゃ', romaji: 'dya' }, { char: 'ぢゅ', romaji: 'dyu' }, { char: 'ぢょ', romaji: 'dyo' }],
    [{ char: 'びゃ', romaji: 'bya' }, { char: 'びゅ', romaji: 'byu' }, { char: 'びょ', romaji: 'byo' }],
    [{ char: 'ぴゃ', romaji: 'pya' }, { char: 'ぴゅ', romaji: 'pyu' }, { char: 'ぴょ', romaji: 'pyo' }],
];

export const HiraganaChart: React.FC = () => {
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
                <p className="text-slate-500 font-medium italic">Unlocked: {learnedChars.length} / 107</p>
            </div>
        </div>
    );
};
