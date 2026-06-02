import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useAudio } from '../hooks/useAudio';
import { BookOpen, X, Sparkles, LayoutGrid, List, Star, Volume2 } from 'lucide-react';
import { HiraganaChart } from './HiraganaChart';
import { KatakanaChart } from './KatakanaChart';
import { hiragana, katakana } from '../data/kana';

interface JSpellbookProps {
    isOpen: boolean;
    onClose: () => void;
}

const MasteryStars = ({ count }: { count: number }) => {
    const stars = count >= 5 ? 3 : count >= 3 ? 2 : count >= 1 ? 1 : 0;
    if (stars === 0) return null;
    return (
        <div className="flex gap-0.5 mt-1 opacity-80">
            {Array.from({ length: 3 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < stars ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} />
            ))}
        </div>
    );
};

export const JSpellbook: React.FC<JSpellbookProps> = ({ isOpen, onClose }) => {
    const { learnedKana, learnedWords, learnedSentences, masteryRates } = useStore();
    const { play } = useAudio();

    // Filter out words that are already present in the Discovery (Characters) section
    const displayWords = React.useMemo(() => {
        const charSet = new Set([...hiragana, ...katakana].map(k => k.char));
        return learnedWords.filter(w => !charSet.has(w.word));
    }, [learnedWords]);

    const [viewMode, setViewMode] = React.useState<'chart' | 'list'>('chart');
    const [activeSyllabary, setActiveSyllabary] = React.useState<'hiragana' | 'katakana'>('hiragana');

    // Filter learned kana based on the active syllabary
    const activeLearnedKana = React.useMemo(() => {
        return learnedKana.filter(k => (k.type || 'hiragana') === activeSyllabary);
    }, [learnedKana, activeSyllabary]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border-[6px] border-deep-indigo"
                    >
                        {/* Header */}
                        <div className="bg-deep-indigo text-white p-6 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-sakura-pink" />
                                <h2 className="text-3xl font-black tracking-tight font-jp">JSpellbook</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sakura-pink"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Content Body - 3 Columns */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-full">

                                {/* Characters Column (takes more space for the chart) */}
                                <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border-2 border-slate-200 flex flex-col min-h-[500px]">
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-indigo-100">
                                        <h3 className="text-2xl font-black text-deep-indigo flex items-center gap-2">
                                            <Sparkles className="w-6 h-6 text-sakura-pink" />
                                            Character Codex
                                            <span className="ml-2 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-bold">
                                                {learnedKana.length} Learned
                                            </span>
                                        </h3>

                                        <div className="flex bg-slate-100 p-1 rounded-xl items-center gap-2">
                                            <div className="flex bg-white/50 rounded-lg p-0.5">
                                                <button
                                                    onClick={() => setActiveSyllabary('hiragana')}
                                                    className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${activeSyllabary === 'hiragana' ? 'bg-deep-indigo text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                                >
                                                    あ Hiragana
                                                </button>
                                                <button
                                                    onClick={() => setActiveSyllabary('katakana')}
                                                    className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${activeSyllabary === 'katakana' ? 'bg-deep-indigo text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                                >
                                                    ア Katakana
                                                </button>
                                            </div>
                                            <div className="w-[2px] h-6 bg-slate-200"></div>
                                            <button
                                                onClick={() => setViewMode('chart')}
                                                className={`p-2 rounded-lg transition-all ${viewMode === 'chart' ? 'bg-white shadow-sm text-deep-indigo' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                <LayoutGrid className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setViewMode('list')}
                                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-deep-indigo' : 'text-slate-400 hover:text-slate-600'}`}
                                            >
                                                <List className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                        {viewMode === 'chart' ? (
                                            activeSyllabary === 'hiragana' ? <HiraganaChart /> : <KatakanaChart />
                                        ) : (
                                            activeLearnedKana.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                                        <BookOpen className="w-10 h-10 text-slate-200" />
                                                    </div>
                                                    <p className="text-slate-400 font-medium">No {activeSyllabary} characters learned yet.<br />Complete lessons to unlock.</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                                    {activeLearnedKana.map((kana, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            onClick={() => play(kana.char)}
                                                            className="aspect-square bg-indigo-50/50 rounded-2xl flex flex-col items-center justify-center border-b-4 border-indigo-100 p-2 hover:bg-indigo-50 transition-colors group cursor-pointer"
                                                        >
                                                            <span className="font-jp text-4xl font-bold text-deep-indigo group-hover:scale-110 transition-transform">{kana.char}</span>
                                                            <span className="text-xs text-sakura-pink font-mono font-bold mt-1 uppercase tracking-tighter">{kana.romaji}</span>
                                                            <MasteryStars count={masteryRates[kana.char] || 0} />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Words Column (takes 3 cols) */}
                                <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border-2 border-slate-200 flex flex-col h-[700px] lg:h-auto">
                                    <h3 className="text-xl font-black text-emerald-800 mb-4 pb-4 border-b-2 border-emerald-100 flex items-center gap-2">
                                        <span className="font-jp text-emerald-500 text-2xl">単</span> Words
                                        <span className="ml-auto text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">{displayWords.length}</span>
                                    </h3>
                                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 pb-4 custom-scrollbar">
                                        {displayWords.length === 0 ? (
                                            <p className="text-slate-400 text-sm font-medium py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">No words learned yet.</p>
                                        ) : (
                                            displayWords.map((word, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ x: 20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    onClick={() => play(word.word)}
                                                    className="bg-emerald-50/50 rounded-2xl flex flex-col border-b-4 border-emerald-100 p-4 hover:bg-emerald-50 transition-colors gap-1 border-2 border-transparent hover:border-emerald-100 cursor-pointer group"
                                                >
                                                    <div className="flex items-baseline justify-between gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-jp text-2xl font-bold text-emerald-900">{word.word}</span>
                                                            <MasteryStars count={masteryRates[word.word] || 0} />
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <Volume2 className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1" />
                                                            <span className="text-sm font-black text-emerald-700 text-right">{word.meaning}</span>
                                                        </div>
                                                    </div>
                                                    {word.romaji && <span className="text-xs text-emerald-600/70 font-mono font-black uppercase tracking-widest">{word.romaji}</span>}
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Sentences Column (takes 3 cols) */}
                                <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border-2 border-slate-200 flex flex-col h-[700px] lg:h-auto">
                                    <h3 className="text-xl font-black text-amber-800 mb-4 pb-4 border-b-2 border-amber-100 flex items-center gap-2">
                                        <span className="font-jp text-amber-500 text-2xl">文</span> Phrases
                                        <span className="ml-auto text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-bold">{learnedSentences.length}</span>
                                    </h3>
                                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4 custom-scrollbar">
                                        {learnedSentences.length === 0 ? (
                                            <p className="text-slate-400 text-sm font-medium py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">No phrases learned yet.</p>
                                        ) : (
                                            learnedSentences.map((sentence, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ x: 20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    onClick={() => play(sentence.japanese)}
                                                    className="bg-amber-50/50 rounded-2xl flex flex-col border-b-4 border-amber-100 p-5 gap-2 hover:bg-amber-50 transition-colors border-2 border-transparent hover:border-amber-100 cursor-pointer group"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <span className="font-jp text-xl font-bold text-amber-900 leading-snug">{sentence.japanese}</span>
                                                        <div className="flex flex-col items-end">
                                                            <Volume2 className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1" />
                                                            <MasteryStars count={masteryRates[sentence.japanese] || 0} />
                                                        </div>
                                                    </div>
                                                    {sentence.romaji && <span className="text-[11px] text-amber-600/80 font-mono font-black border-l-2 border-amber-200 pl-2 ">{sentence.romaji}</span>}
                                                    <div className="text-sm font-black text-amber-800 mt-2 bg-white/50 px-3 py-2 rounded-xl">
                                                        {sentence.english}
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
