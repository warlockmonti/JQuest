import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MascotFeedback = 'correct' | 'incorrect' | null;

interface MascotPopupProps {
    feedback: MascotFeedback;
}

// Map poses to states
// BUNNY:
// 1: Confused/Angry
// 2: Confused
// 3: Crying
// 4: Reading crystal ball (Neutral/Concentrating)
// 5: Happy jump/Spell
// 6: Angry/Casting
const BUNNY_POSES = {
    correct: [4, 5, 6], // Happy/Excited/Concentrating
    incorrect: [1, 2, 3] // Confused, crying
};

// CAT:
// 1: Neutral/Smug
// 2: Reading book (Confused?)
// 3: Happy/Proud with stars
// 4: Sad/Confused with sweat drop/question marks
// 5: (Same as 3, just without bg)
// 6: (Same as 4, just without bg)
const CAT_POSES = {
    correct: [3, 5], // Proud/Happy
    incorrect: [4, 6] // Confused/Sad
};

export const MascotPopup: React.FC<MascotPopupProps> = ({ feedback }) => {
    const [bunnyPose, setBunnyPose] = useState<number>(5);
    const [catPose, setCatPose] = useState<number>(1);

    // Pick random poses when feedback changes to a valid state
    useEffect(() => {
        if (feedback === 'correct') {
            setBunnyPose(BUNNY_POSES.correct[Math.floor(Math.random() * BUNNY_POSES.correct.length)]);
            setCatPose(CAT_POSES.correct[Math.floor(Math.random() * CAT_POSES.correct.length)]);
        } else if (feedback === 'incorrect') {
            setBunnyPose(BUNNY_POSES.incorrect[Math.floor(Math.random() * BUNNY_POSES.incorrect.length)]);
            setCatPose(CAT_POSES.incorrect[Math.floor(Math.random() * CAT_POSES.incorrect.length)]);
        }
    }, [feedback]);

    return (
        <AnimatePresence>
            {feedback && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-end justify-between px-4 pb-24 overflow-hidden">
                    {/* LEFT: BUNNY */}
                    <motion.div
                        initial={{ x: -250, opacity: 0, scale: 0.8, rotate: -15 }}
                        animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ x: -250, opacity: 0, scale: 0.8, rotate: -15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="relative">
                            {/* Eye backgrounds (behind the transparent eyes of the PNG) */}
                            <div className="absolute top-[38%] left-[32%] w-[12%] h-[12%] bg-white rounded-sm z-0" />
                            <div className="absolute top-[38%] left-[52%] w-[12%] h-[12%] bg-white rounded-sm z-0" />
                            <img
                                src={`/mascots/bunny_${bunnyPose}.png`}
                                alt="Magic Bunny"
                                className="w-48 h-48 object-contain drop-shadow-2xl relative z-10"
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT: CAT */}
                    <motion.div
                        initial={{ x: 250, opacity: 0, scale: 0.8, rotate: 15 }}
                        animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ x: 250, opacity: 0, scale: 0.8, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="relative">
                            {/* Eye backgrounds (behind the transparent eyes of the PNG) */}
                            <div className="absolute top-[38%] left-[32%] w-[12%] h-[12%] bg-white rounded-sm z-0" />
                            <div className="absolute top-[38%] left-[52%] w-[12%] h-[12%] bg-white rounded-sm z-0" />
                            <img
                                src={`/mascots/cat_${catPose}.png`}
                                alt="Wizard Cat"
                                className="w-48 h-48 object-contain drop-shadow-2xl relative z-10"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
