import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { Cherry } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAudio } from '../hooks/useAudio';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const completedLessons = useStore(state => state.completedLessons);
    const hasProgress = completedLessons.length > 0;
    const { play } = useAudio();

    const handleStart = () => {
        play('Welcome to JQuest Japanese Tutor');
        navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-deep-indigo text-white overflow-hidden relative">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-sakura-pink/20 animate-pulse">
                    <Cherry size={120} />
                </div>
                <div className="absolute bottom-20 right-20 text-sakura-pink/20 animate-bounce duration-[3000ms]">
                    <Cherry size={80} />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.8, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-0 z-0 pointer-events-none group"
            >
                {/* Magical Aura / Electric Border */}
                <div className="absolute inset-0 bg-sakura-pink/20 blur-3xl animate-pulse rounded-full scale-150" />

                <div className="relative">
                    {/* Electric Sparks (Decorative) */}
                    <div className="absolute inset-0 border-4 border-sakura-pink/30 rounded-full animate-[ping_3s_infinite] opacity-50 scale-110" />
                    <div className="absolute inset-0 border-2 border-white/40 rounded-full animate-[ping_2s_infinite] opacity-30" />

                    {/* Floating Cherry Blossoms around the character */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-sakura-pink/60"
                            animate={{
                                y: [0, -20, 0],
                                x: [0, Math.sin(i) * 20, 0],
                                rotate: [0, 360],
                                opacity: [0.4, 0.8, 0.4]
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                top: `${20 + i * 15}%`,
                                left: `${10 + i * 20}%`
                            }}
                        >
                            <Cherry size={16 + i * 4} />
                        </motion.div>
                    ))}

                    <img
                        src="/assets/protagonist_sprite_Jquest.png"
                        alt="Protagonist"
                        className="w-32 md:w-48 lg:w-64 drop-shadow-[0_0_30px_rgba(255,158,158,0.5)] relative z-10"
                    />

                    {/* Energy Border Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-sakura-pink/10 to-transparent mix-blend-overlay animate-pulse" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center space-y-8 p-6"
            >
                <div className="flex flex-col items-center gap-4">
                    {/* JQuest Logo Branding */}
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-deep-indigo shadow-2xl shrink-0 border border-white/10">
                            <span className="text-sakura-pink font-black text-3xl leading-none font-jp">日</span>
                        </div>
                        <div className="flex flex-col items-start leading-none">
                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter drop-shadow-2xl flex items-baseline">
                                <span className="text-sakura-pink">J</span>
                                <span className="text-white">Quest</span>
                            </h1>
                            <span className="text-lg md:text-2xl font-bold text-slate-400 tracking-[0.3em] uppercase mt-2">Japanese Tutor</span>
                        </div>
                    </div>
                </div>

                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light pt-4">
                    Master Japanese through an epic journey.
                    <br />
                    Gamified lessons, <span className="text-sakura-pink font-bold">immersive audio</span>, and real progress.
                </p>

                <div className="pt-8">
                    <Button
                        onClick={handleStart}
                        size="lg"
                        className="bg-sakura-pink text-deep-indigo hover:bg-white hover:text-deep-indigo border-none text-xl px-12 py-8 rounded-2xl shadow-[0_0_40px_rgba(255,183,178,0.6)]"
                    >
                        {hasProgress ? 'Continue Journey' : 'Start Your Journey'}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};
