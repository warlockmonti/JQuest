import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CompetenceModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonTitle?: string;
}

const SPARKLE_COUNT = 30;

export const CompetenceModal: React.FC<CompetenceModalProps> = ({ isOpen, onClose, lessonTitle }) => {
    useEffect(() => {
        if (!isOpen) return;
        // Celebration confetti when modal opens
        const timer = setTimeout(() => {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.5 },
                colors: ['#a855f7', '#ec4899', '#6366f1', '#f59e0b', '#10b981'],
            });
        }, 400);
        return () => clearTimeout(timer);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="competence-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 30 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        className="relative w-full max-w-lg bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-900/50"
                    >
                        {/* Animated magical border shimmer */}
                        <div className="absolute inset-0 rounded-3xl pointer-events-none">
                            <div className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 animate-pulse" />
                        </div>

                        {/* Floating sparkle particles */}
                        {Array.from({ length: SPARKLE_COUNT }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-purple-300 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                                    y: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                            />
                        ))}

                        <div className="relative z-10 p-8 sm:p-10 flex flex-col items-center gap-6">
                            {/* Top Badge */}
                            <motion.div
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                                className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl px-5 py-2 text-xs font-black uppercase tracking-widest text-white shadow-lg"
                            >
                                ✨ The Sorcerer's Syllabary
                            </motion.div>

                            {/* Mascot */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative"
                            >
                                <img
                                    src="/mascots/bunny_5.png"
                                    alt="Magic Bunny"
                                    className="w-32 h-32 object-contain drop-shadow-2xl"
                                    onError={(e) => {
                                        // Fallback emoji if image not found
                                        const parent = (e.target as HTMLImageElement).parentElement;
                                        if (parent) parent.innerHTML = '<div class="text-7xl">🧙</div>';
                                    }}
                                />
                                {/* Glow behind mascot */}
                                <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-2xl -z-10 scale-150" />
                            </motion.div>

                            {/* Lesson Complete Badge */}
                            {lessonTitle && (
                                <div className="text-purple-300 text-sm font-bold tracking-wider text-center opacity-80">
                                    First Incantation Mastered:<br />
                                    <span className="text-white font-black text-base">{lessonTitle}</span>
                                </div>
                            )}

                            {/* Main Quote */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-center space-y-4"
                            >
                                <p className="text-lg font-bold text-purple-200 leading-relaxed">
                                    "Welcome, apprentice of the verbal arts. You have taken your first step."
                                </p>
                                <p className="text-base text-slate-300 leading-relaxed">
                                    Each symbol you master, each word you claim, is a spark of power.
                                    In this world, <span className="text-amber-300 font-bold">knowledge is magic</span>,
                                    and words are the incantations that shape reality.
                                </p>
                                <p className="text-base text-slate-300 leading-relaxed">
                                    The path to mastery is a loop of{' '}
                                    <span className="text-purple-300 font-bold">competence and confidence</span>.
                                    By understanding one simple sentence, you forge the confidence to learn the next.
                                </p>
                                <p className="text-base text-indigo-200 leading-relaxed font-semibold">
                                    This is how a single spark grows into a raging inferno.
                                </p>
                                <p className="text-sm text-slate-400 leading-relaxed italic">
                                    Continue on your quest. Forge your power, one word at a time.
                                </p>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={onClose}
                                className="w-full max-w-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-lg py-4 px-8 rounded-2xl border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1 shadow-lg transition-all"
                            >
                                Begin My Quest ⚡
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
