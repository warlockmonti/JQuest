import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Swords, ChevronRight, Lock, Coins } from 'lucide-react';
import { useRPGStore, type RPGCard } from '../../store/useRPGStore';
import { cn } from '../../lib/utils';
import { useAudio } from '../../hooks/useAudio';
import { useStore } from '../../store/useStore';
import { PIXEL_PLAYER } from '../../lib/pixelSprites';

export const RPGCombat: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const {
        hp, maxHp, energy, maxEnergy,
        hand, activeProblem, combatStatus, enemies, block,
        playCard, endTurn, refillEnergy,
        currentFloor, loseHp
    } = useRPGStore();

    const { xp, spendXp } = useStore();

    const [activeCard, setActiveCard] = useState<RPGCard | null>(null);
    const [isAnimatingStrike, setIsAnimatingStrike] = useState(false);
    const { play, playError, playGoldEarned, playSuccess } = useAudio();

    // Reset combat on mount for testing
    useEffect(() => {
    }, []);

    const handleCardClick = (card: RPGCard) => {
        if (combatStatus !== 'playerTurn' || energy < card.cost) return;

        if (card.forcedType) {
            // Already auto-assigned from an upgrade
            executePlay(card, card.forcedType);
        } else {
            setActiveCard(card);
        }
    };

    const executePlay = (card: RPGCard, type: 'strike' | 'block') => {
        setActiveCard(null);

        const result = playCard(card.id, type);

        if (result === 'correct') {
            play('correct');
            playSuccess();
            useStore.getState().addXp(5);

            // Trigger Animation
            if (type === 'strike') {
                setIsAnimatingStrike(true);
                setTimeout(() => setIsAnimatingStrike(false), 500);
            } else if (type === 'block') {
                setTimeout(() => { }, 800);
            }

            // If we won during this state update, the store will reflect it
            const allDead = useRPGStore.getState().enemies.every(e => e.hp <= 0);
            if (allDead) {
                setTimeout(() => {
                    const reward = currentFloor === 2 ? 20 : 10;
                    useStore.getState().addGold(reward);
                    playGoldEarned();
                }, 600);
            }
        } else if (result === 'incorrect') {
            playError();
            loseHp(10);
        }
    };

    return (
        <div className="relative w-full h-[850px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 flex flex-col">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-slate-900 pointer-events-none" />

            {/* 1. Arena Zone (Combatants & Questions) */}
            <div className="relative flex-1 flex flex-col justify-center px-4 pt-8">
                <div className="flex items-center justify-between gap-2 max-w-6xl mx-auto w-full">
                    {/* Player Side */}
                    <div className="flex flex-col items-center gap-4 flex-shrink-0">
                        <motion.div
                            animate={
                                isAnimatingStrike ? { x: [0, 50, 0] } :
                                    combatStatus === 'enemyTurn' ? { x: [0, -10, 0] } : { x: 0 }
                            }
                            className="relative w-20 h-20 bg-indigo-500 rounded-2xl border-4 border-indigo-400 shadow-lg flex items-center justify-center overflow-hidden"
                        >
                            <img src={PIXEL_PLAYER} alt="player" className="w-full h-full object-contain retro-sprite" />
                            <AnimatePresence>
                                {block > 0 && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        key="player-block"
                                        className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-lg px-2 py-1 flex items-center gap-1 font-bold shadow-md z-10"
                                    >
                                        <Shield className="w-4 h-4" /> {block}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="w-24 space-y-1">
                            <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                                <motion.div
                                    animate={{ width: `${(hp / maxHp) * 100}%` }}
                                    className="h-full bg-red-500"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">
                                <span>HP</span>
                                <span>{hp}</span>
                            </div>
                        </div>

                        {/* Energy Indicator Mini */}
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-indigo-400 shadow-lg flex items-center justify-center relative">
                                <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                                <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-indigo-400">
                                    {energy}
                                </span>
                            </div>
                            <span className="text-[8px] font-black text-indigo-300 uppercase">{energy}/{maxEnergy}</span>
                        </div>
                    </div>

                    {/* Central Question */}
                    <div className="flex-1 flex flex-col items-center gap-4 z-10 max-w-md">
                        {activeProblem && combatStatus === 'playerTurn' && (
                            <div className="w-full bg-indigo-950/90 backdrop-blur-md px-4 py-4 rounded-3xl border-2 border-indigo-500 shadow-2xl text-center relative">
                                <h3 className="text-white font-black text-2xl mb-1 leading-tight">
                                    {activeProblem.japanese ? activeProblem.japanese.replace(new RegExp(activeProblem.blanks[0].answer, 'g'), '___') : activeProblem.english}
                                </h3>
                                {activeProblem.romaji && (
                                    <p className="text-slate-300 font-mono text-xs mb-2">
                                        {activeProblem.romaji.replace(new RegExp(activeProblem.blanks[0].choices.find(c => c.text === activeProblem.blanks[0].answer)?.romaji || activeProblem.blanks[0].answer, 'gi'), '___')}
                                    </p>
                                )}
                                {activeProblem.english && activeProblem.japanese && (
                                    <p className="text-indigo-200 font-bold text-sm">
                                        {activeProblem.english}
                                    </p>
                                )}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[9px] font-black px-3 py-0.5 rounded-full uppercase tracking-widest shadow-lg">
                                    Yokai's Question
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-2xl border-2 border-slate-700/50 flex flex-col items-center shadow-lg">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Intent</span>
                            <div className="flex items-center gap-2">
                                {enemies[0] && (
                                    <>
                                        {enemies[0].intent === 'attack' ? (
                                            <Swords className="w-4 h-4 text-rose-500" />
                                        ) : (
                                            <Shield className="w-4 h-4 text-blue-500" />
                                        )}
                                        <span className="text-white font-black text-sm uppercase">
                                            {enemies[0].intent === 'attack' ? 'Strike' : 'Shield'}
                                        </span>
                                        <span className="text-slate-400 font-bold text-xs">{enemies[0].intentValue}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Enemy Side */}
                    <div className="flex flex-col items-center gap-4 flex-shrink-0">
                        {enemies.map((enemy) => (
                            <div key={enemy.id} className="flex flex-col items-center gap-2">
                                <AnimatePresence>
                                    {enemy.hp > 0 ? (
                                        <motion.div
                                            initial={{ scale: 0, x: 0 }}
                                            animate={{
                                                scale: 1,
                                                x: combatStatus === 'enemyTurn' ? [0, -50, 0] : 0
                                            }}
                                            transition={{ x: { duration: 0.5, ease: "easeOut" } }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            className="relative"
                                        >
                                            <motion.div
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                                                className="w-40 h-40 bg-rose-900/40 rounded-3xl border-4 border-rose-800 shadow-2xl flex items-center justify-center overflow-hidden"
                                            >
                                                <img
                                                    src={enemy.image}
                                                    alt={enemy.name}
                                                    className="w-full h-full object-contain p-2 retro-sprite drop-shadow-lg scale-[1.5]"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                                <div className="w-24 space-y-1">
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                                        <motion.div
                                            animate={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                                            className="h-full bg-rose-500"
                                        />
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 text-center leading-tight px-1">
                                        {enemy.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Action Zone (Buttons) */}
            <div className="h-24 bg-slate-900/50 backdrop-blur-sm border-t border-b border-slate-800 flex items-center justify-between px-8 z-20">
                <button
                    onClick={() => {
                        if (energy < maxEnergy && spendXp(50)) {
                            refillEnergy();
                            play('levelup');
                        }
                    }}
                    disabled={energy === maxEnergy || xp < 50}
                    className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-2xl border-b-4 border-slate-950 transition-all active:translate-y-1 active:border-b-0"
                >
                    <div className="bg-amber-500/20 p-1.5 rounded-lg">
                        <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="font-black text-xs uppercase italic tracking-widest text-amber-400">Refill Mana</span>
                        <span className="text-[10px] font-bold text-slate-500">50 XP</span>
                    </div>
                </button>

                <button
                    onClick={endTurn}
                    disabled={combatStatus !== 'playerTurn'}
                    className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-3 rounded-2xl border-b-4 border-indigo-900 transition-all active:translate-y-1 active:border-b-0"
                >
                    <span className="font-black tracking-widest uppercase italic text-sm">End Turn</span>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* 3. Hand Zone (Cards) */}
            <div className="h-[280px] w-full px-4 overflow-x-auto pb-8 z-50 scrollbar-default -mt-12">
                <div className="flex items-end justify-start md:justify-center gap-3 min-w-max px-8 h-full">
                    <AnimatePresence>
                        {hand.map((card, i) => (
                            <motion.button
                                key={card.id}
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1, x: (i - hand.length / 2) * 10, rotate: (i - hand.length / 2) * 2 }}
                                whileHover={{ y: -20, scale: 1.05, zIndex: 100 }}
                                onClick={() => handleCardClick(card)}
                                disabled={energy < card.cost}
                                className={cn(
                                    "flex-shrink-0 w-36 h-48 rounded-xl p-3 flex flex-col items-center justify-between transition-all border-b-4 shadow-xl select-none",
                                    card.isUpgraded ? "bg-gradient-to-br from-amber-400 to-amber-600 border-amber-800"
                                        : "bg-gradient-to-br from-slate-600 to-slate-800 border-slate-950",
                                    card.forcedType === 'strike' && "from-rose-500 to-rose-700 border-rose-900",
                                    card.forcedType === 'block' && "from-blue-500 to-blue-700 border-blue-900",
                                    energy < card.cost && "grayscale contrast-125 brightness-50 cursor-not-allowed border-none"
                                )}
                            >
                                <div className="w-full flex justify-between items-start">
                                    <span className="bg-slate-900/60 text-white rounded-lg px-2 text-xs font-black">{card.cost}</span>
                                    {card.isUpgraded && <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />}
                                    {card.forcedType === 'strike' && <Swords className="w-4 h-4 text-white/50" />}
                                    {card.forcedType === 'block' && <Shield className="w-4 h-4 text-white/50" />}
                                </div>

                                <div className="text-center w-full">
                                    <h4 className="text-xl font-black text-white leading-tight break-words">{card.text}</h4>
                                    {card.meaning && <p className="text-[10px] text-white/80 font-bold mt-1 uppercase tracking-widest">{card.meaning}</p>}
                                    <p className="text-[12px] font-black text-yellow-300 mt-2 bg-black/20 rounded mx-auto w-fit px-2 py-0.5">Value: {card.value}</p>
                                </div>

                                <div className="w-full bg-white/20 rounded-lg py-1 px-2 flex items-center justify-center">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{card.forcedType ? card.forcedType : 'Answer Card'}</span>
                                </div>

                                {energy < card.cost && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                                        <Lock className="w-8 h-8 text-white/50" />
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Type Selection Overlay (Strike or Block) */}
            <AnimatePresence>
                {activeCard && !activeCard.forcedType && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-8 backdrop-blur-md bg-slate-950/80"
                    >
                        <div className="w-full max-w-lg bg-slate-900 rounded-3xl p-8 shadow-2xl border-t-8 border-indigo-500 text-center relative overflow-hidden">
                            <h2 className="text-2xl font-black text-white mb-2">How will you play this?</h2>
                            <p className="text-slate-400 font-bold mb-8">Choose to Strike the enemy or Guard yourself.</p>

                            <div className="flex gap-6 justify-center">
                                <button
                                    onClick={() => executePlay(activeCard, 'strike')}
                                    className="flex-1 bg-gradient-to-b from-rose-500 to-rose-700 hover:from-rose-400 hover:to-rose-600 text-white rounded-2xl p-6 border-b-8 border-rose-900 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-4 shadow-xl group"
                                >
                                    <div className="bg-rose-900/50 p-4 rounded-full group-hover:scale-110 transition-transform">
                                        <Swords className="w-10 h-10 text-rose-200" />
                                    </div>
                                    <div>
                                        <div className="font-black text-xl uppercase tracking-widest">Strike</div>
                                        <div className="text-rose-200 font-bold text-sm">Deal {activeCard.value} Dmg</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => executePlay(activeCard, 'block')}
                                    className="flex-1 bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white rounded-2xl p-6 border-b-8 border-blue-900 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-4 shadow-xl group"
                                >
                                    <div className="bg-blue-900/50 p-4 rounded-full group-hover:scale-110 transition-transform">
                                        <Shield className="w-10 h-10 text-blue-200" />
                                    </div>
                                    <div>
                                        <div className="font-black text-xl uppercase tracking-widest">Block</div>
                                        <div className="text-blue-200 font-bold text-sm">Gain {activeCard.value} Def</div>
                                    </div>
                                </button>
                            </div>

                            <button
                                onClick={() => setActiveCard(null)}
                                className="mt-8 text-slate-500 font-bold hover:text-slate-300 transition-colors uppercase tracking-widest text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Win/Loss Banners */}
            {combatStatus === 'win' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-[300] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="bg-white/10 border-2 border-yellow-500/50 rounded-[3rem] p-12 shadow-[0_0_50px_rgba(234,179,8,0.2)] max-w-sm w-full"
                    >
                        <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                            <Swords className="w-12 h-12 text-white" />
                        </div>

                        <h1 className="text-5xl font-black text-white mb-2 tracking-tighter uppercase">Victory!</h1>
                        <p className="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-8">Encounter Complete</p>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between items-center bg-white/5 rounded-2xl p-4 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="bg-amber-500/20 p-2 rounded-lg">
                                        <Coins className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <span className="text-white font-black">Gold Found</span>
                                </div>
                                <span className="text-amber-500 font-black">+{currentFloor === 2 ? 20 : 10}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 rounded-2xl p-4 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-500/20 p-2 rounded-lg">
                                        <Zap className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <span className="text-white font-black">XP Gained</span>
                                </div>
                                <span className="text-indigo-500 font-black">+5 / choice</span>
                            </div>
                        </div>

                        <button
                            onClick={onComplete}
                            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-black py-5 rounded-2xl border-b-8 border-indigo-900 transition-all active:translate-y-2 active:border-b-0 shadow-2xl uppercase tracking-widest"
                        >
                            Continue Adventure
                        </button>
                    </motion.div>
                </motion.div>
            )}

            {/* Incorrect Answer Banner */}
            <AnimatePresence>
                {combatStatus === 'playerTurn' && (
                    <motion.div
                    // We could show a transient red flash if they get it wrong. But `loseHp` handles visual damage.
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
