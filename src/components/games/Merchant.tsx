import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Coins, Swords, Shield, X } from 'lucide-react';
import { useRPGStore } from '../../store/useRPGStore';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { useAudio } from '../../hooks/useAudio';

export const Merchant: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { hp, maxHp } = useRPGStore();
    const { gold, spendGold, learnedWords, upgradedCards, upgradeCard } = useStore();

    const [view, setView] = useState<'upgrade' | 'heal'>('upgrade');
    const [selectedWord, setSelectedWord] = useState<string | null>(null);

    const { playLevelUp, playError, playClick, playSuccess } = useAudio();

    // Pick 4 random learned words to offer for upgrade
    const [shopWords, setShopWords] = useState<any[]>([]);

    useEffect(() => {
        const availableWords = learnedWords.filter(w => !upgradedCards[w.word]);
        const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
        setShopWords(shuffled.slice(0, 4));
    }, [learnedWords, upgradedCards]);

    const upgradeCost = 50;

    const handleUpgrade = (word: string, type: 'strike' | 'block') => {
        if (spendGold(upgradeCost)) {
            upgradeCard(word, type);
            // Remove it from shop display
            setShopWords(prev => prev.filter(w => w.word !== word));
            setSelectedWord(null);
            playLevelUp();
        } else {
            playError();
        }
    };

    const handleHeal = () => {
        if (hp >= maxHp) {
            playError();
            return;
        }
        if (spendGold(20)) {
            useRPGStore.setState((s) => ({ hp: Math.min(s.maxHp, s.hp + 20) }));
            playSuccess();
        } else {
            playError();
        }
    };

    return (
        <div className="relative w-full h-[600px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 flex flex-col items-center">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-indigo-900/30" />

            <div className="relative z-10 w-full max-w-4xl p-8 flex flex-col items-center h-full">
                {/* Header */}
                <header className="w-full flex justify-between items-center mb-10 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center border border-orange-500/50">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white">THE TRAVELING MERCHANT</h1>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">"Buy power, live longer... maybe."</p>
                        </div>
                    </div>
                    <div className="bg-slate-800 px-4 py-2 rounded-2xl border-b-4 border-slate-950 flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xl font-black text-white">{gold}</span>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    {['upgrade', 'heal'].map((t) => (
                        <button
                            key={t}
                            onClick={() => { playClick(); setView(t as any); }}
                            className={cn(
                                "px-6 py-2 rounded-xl font-black text-xs uppercase transition-all border-b-4",
                                view === t ? "bg-indigo-600 text-white border-indigo-900" : "bg-slate-800 text-slate-400 border-slate-950"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="flex-1 w-full overflow-y-auto pr-2 scrollbar-hide mb-4">
                    <AnimatePresence mode="wait">
                        {view === 'upgrade' && (
                            <motion.div key="upgrade" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
                                <h2 className="text-center text-indigo-300 font-black mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
                                    Card Upgrades: {upgradeCost} Gold <span className="text-[10px] bg-amber-500/20 px-2 py-1 rounded text-amber-400 font-bold tracking-normal">(Costs 2 Energy in combat, extreme stats)</span>
                                </h2>

                                {shopWords.length === 0 ? (
                                    <div className="text-center text-slate-500 font-bold mt-10">No learned words available to upgrade! Complete lessons to unlock more.</div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {shopWords.map((word) => (
                                            <div
                                                key={word.word}
                                                className="group p-4 rounded-2xl bg-gradient-to-br border-b-4 transition-all flex flex-col items-center justify-between min-h-[160px] from-slate-700 to-slate-800 border-slate-950 hover:from-slate-600 hover:to-slate-700"
                                            >
                                                <div className="text-center mb-4">
                                                    <h3 className="text-3xl font-black text-white">{word.word}</h3>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{word.meaning}</p>
                                                </div>

                                                <button
                                                    onClick={() => setSelectedWord(word.word)}
                                                    disabled={gold < upgradeCost}
                                                    className={cn(
                                                        "w-full py-2 rounded-lg font-black text-xs uppercase transition-colors tracking-widest",
                                                        gold >= upgradeCost ? "bg-indigo-600 hover:bg-indigo-500 text-white" : "bg-slate-800 text-slate-500"
                                                    )}
                                                >
                                                    UPGRADE
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {view === 'heal' && (
                            <motion.div key="heal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full h-full flex items-center justify-center">
                                <div className="bg-slate-800/60 rounded-3xl p-8 border-b-4 border-slate-950 flex flex-col items-center text-center gap-6 max-w-sm">
                                    <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                                        <ShoppingCart className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white">Healing Potion</h3>
                                        <p className="text-sm text-slate-400 font-bold mt-2">Restores 20 HP.</p>
                                    </div>

                                    {/* Current HP Display */}
                                    <div className="w-full space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-300">
                                            <span>Current HP</span>
                                            <span className={hp >= maxHp ? "text-emerald-400" : "text-white"}>{hp} / {maxHp}</span>
                                        </div>
                                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                            <motion.div
                                                animate={{ width: `${(hp / maxHp) * 100}%` }}
                                                className="h-full bg-emerald-500"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleHeal}
                                        disabled={hp >= maxHp || gold < 20}
                                        className={cn(
                                            "w-full py-4 rounded-xl font-black text-sm border-b-4 transition-all active:translate-y-1 active:border-b-0",
                                            hp >= maxHp ? "bg-slate-700 text-slate-500 border-none"
                                                : gold < 20 ? "bg-slate-700 text-slate-500 border-slate-900"
                                                    : "bg-emerald-600 text-white border-emerald-900 hover:bg-emerald-500"
                                        )}
                                    >
                                        {hp >= maxHp ? "FULL HEALTH" : "20 GOLD"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="pt-4 flex justify-center mt-auto">
                    <button
                        onClick={() => { playClick(); onComplete(); }}
                        className="group flex items-center gap-4 bg-slate-800 hover:bg-slate-700 text-white font-black py-4 px-12 rounded-3xl border-b-8 border-slate-950 transition-all active:translate-y-2 active:border-b-0"
                    >
                        CONTINUE ADVENTURE
                        <X className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>

            {/* Path Selection Overlay */}
            <AnimatePresence>
                {selectedWord && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-8"
                    >
                        <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-8 max-w-lg w-full text-center relative pointer-events-auto">
                            <h2 className="text-3xl font-black text-white mb-2">{selectedWord}</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-8">Choose Upgrade Path</p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleUpgrade(selectedWord, 'strike')}
                                    className="flex-1 bg-gradient-to-b from-rose-500 to-rose-700 hover:from-rose-400 hover:to-rose-600 text-white rounded-2xl p-6 border-b-8 border-rose-900 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-4 shadow-xl"
                                >
                                    <div className="bg-rose-900/50 p-4 rounded-full">
                                        <Swords className="w-8 h-8 text-rose-200" />
                                    </div>
                                    <div className="font-black text-xl uppercase tracking-widest">Strike</div>
                                    <div className="text-rose-200 font-bold text-xs uppercase">Massive Damage</div>
                                </button>
                                <button
                                    onClick={() => handleUpgrade(selectedWord, 'block')}
                                    className="flex-1 bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white rounded-2xl p-6 border-b-8 border-blue-900 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-4 shadow-xl"
                                >
                                    <div className="bg-blue-900/50 p-4 rounded-full">
                                        <Shield className="w-8 h-8 text-blue-200" />
                                    </div>
                                    <div className="font-black text-xl uppercase tracking-widest">Block</div>
                                    <div className="text-blue-200 font-bold text-xs uppercase">Massive Defense</div>
                                </button>
                            </div>

                            <button
                                onClick={() => setSelectedWord(null)}
                                className="mt-8 text-slate-500 font-bold hover:text-slate-300 transition-colors uppercase tracking-widest text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
