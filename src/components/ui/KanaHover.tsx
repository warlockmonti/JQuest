import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Kana } from '../../data/kana';
import { useAudio } from '../../hooks/useAudio';

interface KanaHoverProps {
    char: string;
    kanaData?: Kana; // Optional, if we have the full data object
    children: React.ReactNode;
}

export const KanaHover: React.FC<KanaHoverProps> = ({ char, kanaData, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { play } = useAudio();

    const handleMouseEnter = () => {
        setIsHovered(true);
        // Optional: play audio on hover? might be annoying. Let's stick to click for audio usually, 
        // but maybe a subtle sound or just visual for now.
    };

    return (
        <div
            className="relative inline-block cursor-help group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => play(char)}
        >
            <span className="border-b-2 border-dashed border-sakura-pink/50 group-hover:border-sakura-pink transition-colors">
                {children}
            </span>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-max max-w-[200px]"
                    >
                        <div className="bg-deep-indigo text-white p-3 rounded-xl shadow-xl border-2 border-indigo-dark text-center relative">
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-8 border-transparent border-t-deep-indigo" />

                            <div className="text-lg font-bold text-gold mb-1">
                                {kanaData?.romaji || '?'}
                            </div>
                            {kanaData?.examples?.[0] && (
                                <div className="text-xs text-slate-300 border-t border-slate-600 pt-1 mt-1">
                                    {kanaData.examples[0].word}
                                    <br />
                                    <span className="text-sakura-pink">{kanaData.examples[0].meaning}</span>
                                </div>
                            )}
                            {!kanaData && <div className="text-xs text-slate-300">Click to listen</div>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
