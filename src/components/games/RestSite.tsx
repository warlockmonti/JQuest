import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Hammer, HeartPulse, Sparkles, ChevronRight, ArrowUpCircle } from 'lucide-react';
import { useRPGStore } from '../../store/useRPGStore';
import { cn } from '../../lib/utils';

export const RestSite: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { maxHp, deck, gainHp, upgradeCard } = useRPGStore();
    const [view, setView] = useState<'options' | 'forge' | 'done'>('options');

    const handleRest = () => {
        const healAmount = Math.floor(maxHp * 0.3);
        gainHp(healAmount);
        setView('done');
    };

    const handleForge = (cardId: string) => {
        upgradeCard(cardId);
        setView('done');
    };

    return (
        <div className="relative w-full h-[600px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 flex flex-col items-center">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-indigo-900/40" />

            <div className="relative z-10 w-full max-w-4xl p-8 flex flex-col items-center h-full">
                {/* Header */}
                <header className="text-center mb-12">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 text-orange-500 mb-4 border-2 border-orange-500/50"
                    >
                        <Flame className="w-10 h-10 fill-orange-500" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white tracking-widest">REST SITE</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mt-2">The fire crackles warmly...</p>
                </header>

                <AnimatePresence mode="wait">
                    {view === 'options' && (
                        <motion.div
                            key="options"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex gap-8 w-full max-w-2xl"
                        >
                            <button
                                onClick={handleRest}
                                className="flex-1 group bg-slate-800/80 hover:bg-slate-700 p-8 rounded-[2rem] border-b-8 border-slate-950 transition-all flex flex-col items-center text-center gap-4"
                            >
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <HeartPulse className="w-10 h-10 text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white">REST</h3>
                                    <p className="text-slate-400 text-sm font-bold mt-1">Heal 30% HP</p>
                                    <p className="text-emerald-400 font-black mt-2">+{Math.floor(maxHp * 0.3)} HP</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setView('forge')}
                                className="flex-1 group bg-slate-800/80 hover:bg-slate-700 p-8 rounded-[2rem] border-b-8 border-slate-950 transition-all flex flex-col items-center text-center gap-4"
                            >
                                <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Hammer className="w-10 h-10 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white">FORGE</h3>
                                    <p className="text-slate-400 text-sm font-bold mt-1">Upgrade a card</p>
                                    <p className="text-amber-400 font-black mt-2">Improve Value/Cost</p>
                                </div>
                            </button>
                        </motion.div>
                    )}

                    {view === 'forge' && (
                        <motion.div
                            key="forge"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full"
                        >
                            <h2 className="text-center text-xl font-black text-slate-300 mb-6 flex items-center justify-center gap-2">
                                <Hammer className="w-5 h-5" /> CHOOSE A CARD TO UPGRADE
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[280px] overflow-y-auto px-4 py-2 scrollbar-hide">
                                {deck.map((card) => (
                                    <button
                                        key={card.id}
                                        onClick={() => handleForge(card.id)}
                                        className={cn(
                                            "relative group p-4 rounded-2xl border-b-4 flex flex-col items-center gap-2 transition-all",
                                            card.type === 'attack' ? "bg-rose-900/40 border-rose-950 text-rose-200 hover:bg-rose-800/60"
                                                : "bg-blue-900/40 border-blue-950 text-blue-200 hover:bg-blue-800/60"
                                        )}
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-black">{card.name}</span>
                                            <span className="text-[10px] opacity-70">Lv.{card.upgradeLevel}</span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                                            <ArrowUpCircle className="w-3 h-3 text-emerald-400" />
                                            <span className="text-xs font-black">UPGRADE</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setView('options')}
                                className="mt-6 mx-auto block text-slate-500 hover:text-white font-bold transition-colors"
                            >
                                Back
                            </button>
                        </motion.div>
                    )}

                    {view === 'done' && (
                        <motion.div
                            key="done"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <div className="text-center">
                                <motion.div
                                    initial={{ y: 20 }} animate={{ y: 0 }}
                                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-500 mb-6 border-2 border-emerald-500/50"
                                >
                                    <Sparkles className="w-12 h-12" />
                                </motion.div>
                                <h2 className="text-3xl font-black text-white">REJUVENATED!</h2>
                                <p className="text-slate-400 font-bold mt-2">You feel ready for the path ahead.</p>
                            </div>

                            <button
                                onClick={onComplete}
                                className="group flex items-center gap-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-12 rounded-3xl border-b-8 border-indigo-950 transition-all active:translate-y-2 active:border-b-0 shadow-2xl"
                            >
                                LEAVE CAMP
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
