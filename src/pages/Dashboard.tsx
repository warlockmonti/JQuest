import React, { useEffect, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { Check, Lock, Star, Flag, Skull, Heart, Swords } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { allLessons, WORLDS, type LessonData } from '../data/lessons';
import { useAudio } from '../hooks/useAudio';

const LessonNode = ({
    status,
    type,
    title,
    onClick
}: {
    id: string;
    index: number;
    status: 'locked' | 'current' | 'completed';
    type?: 'normal' | 'checkpoint' | 'boss' | 'kana' | 'conversation' | 'adventure';
    title: string;
    onClick: () => void
}) => {
    const isSpecial = type === 'adventure' || type === 'boss';
    const { playClick } = useAudio();

    return (
        <motion.div
            whileHover={status !== 'locked' ? { scale: 1.05, y: -5 } : {}}
            whileTap={status !== 'locked' ? { scale: 0.95, y: 0 } : {}}
            className="relative z-10"
        >
            {/* 3D Button implementation */}
            <div
                onClick={() => {
                    if (status !== 'locked') {
                        playClick();
                        onClick();
                    }
                }}
                className={cn(
                    "rounded-[2rem] flex items-center justify-center text-4xl shadow-xl transition-all cursor-pointer relative border-b-[8px] active:border-b-0 active:translate-y-[8px]",
                    type === 'boss' ? "w-32 h-32 rounded-[2.5rem]" : "w-24 h-24", // Boss is bigger
                    status === 'completed' && "bg-gold border-gold-dark text-white ring-4 ring-white",
                    status === 'current' && "bg-sakura-pink border-sakura-dark text-white ring-4 ring-white animate-pulse-slow",
                    status === 'locked' && "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed",
                    type === 'checkpoint' && status !== 'locked' && "bg-indigo-500 border-indigo-700",
                    isSpecial && status !== 'locked' && "bg-purple-600 border-purple-900 shadow-purple-200",
                    type === 'boss' && status !== 'locked' && "bg-purple-800 border-purple-950 scale-110"
                )}
            >
                {status === 'completed' && <Check className="w-10 h-10 stroke-[4]" />}

                {status !== 'completed' && (
                    <>
                        {type === 'boss' && <Skull className={cn("w-14 h-14", status === 'locked' ? "opacity-20" : "text-white")} />}
                        {type === 'adventure' && <Swords className={cn("w-10 h-10", status === 'locked' ? "opacity-20" : "text-white")} />}
                        {type === 'checkpoint' && <Flag className={cn("w-10 h-10", status === 'locked' ? "opacity-20" : "text-white")} />}
                        {(type === 'normal' || type === 'kana' || type === 'conversation') && (status === 'current' ? <Star className="w-10 h-10 fill-white" /> : <Star className="w-10 h-10 opacity-50" />)}
                    </>
                )}

                {status === 'locked' && <Lock className="absolute w-8 h-8 opacity-50 text-slate-500" />}

                {/* Floating Label */}
                {status === 'current' && (
                    <div className="absolute -top-16 bg-white text-deep-indigo text-sm font-black py-2 px-4 rounded-xl border-b-4 border-slate-200 shadow-lg whitespace-nowrap animate-bounce z-20">
                        START
                        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-4 border-b-4 border-slate-200 rotate-45 rounded-sm"></div>
                    </div>
                )}
            </div>

            {/* Node Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center z-10 pointer-events-none">
                <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                    status === 'locked' ? "text-slate-400 bg-slate-200/80" : "text-white bg-slate-800 shadow-lg border border-slate-700"
                )}>
                    {type === 'checkpoint' ? "Adv Mode: Combat Checkpoint" : type === 'adventure' ? "Adv Mode: Encounter" : title.split(':')[0]}
                </span>
            </div>
        </motion.div>
    );
};

export const Dashboard: React.FC = () => {
    const { currentLessonId, completedLessons, hearts, currentWorld, unlockedWorlds, repairProgress } = useStore();
    const navigate = useNavigate();

    // Repair progress on mount to handle curriculum changes
    const validIds = useMemo(() => allLessons.map(l => l.id), []);
    useEffect(() => {
        repairProgress(validIds);
    }, [repairProgress, validIds]);

    // Configuration
    const VERTICAL_SPACING = 140;
    const AMPLITUDE = 70;
    const VIRTUAL_WIDTH = 400;
    const CENTER_X = VIRTUAL_WIDTH / 2;

    // Filter lessons to only show ones from unlocked worlds
    const lessons = allLessons.filter(l => unlockedWorlds.includes(l.worldId));

    // Calculate Coordinates (Virtual Space 0-400)
    const coords = lessons.map((_, i) => {
        const x = CENTER_X + Math.sin(i * 0.5) * AMPLITUDE;
        const y = i * VERTICAL_SPACING + 100;
        return { x, y };
    });

    // Generate Path
    const generatePath = () => {
        if (coords.length === 0) return '';
        let d = `M ${coords[0].x} ${coords[0].y}`;

        for (let i = 0; i < coords.length - 1; i++) {
            const p1 = coords[i];
            const p2 = coords[i + 1];
            const cp1y = p1.y + VERTICAL_SPACING / 2;
            const cp2y = p2.y - VERTICAL_SPACING / 2;
            d += ` C ${p1.x} ${cp1y}, ${p2.x} ${cp2y}, ${p2.x} ${p2.y}`;
        }
        return d;
    };

    const getStatus = (id: string) => {
        if (completedLessons.includes(id)) return 'completed';
        if (id === currentLessonId) return 'current';
        return 'locked';
    };

    const handleLessonClick = (lesson: LessonData) => {
        if (lesson.type === 'adventure' || lesson.type === 'boss') {
            navigate('/rpg', { state: { lessonId: lesson.id } });
        } else {
            navigate(`/lesson/${lesson.id}`);
        }
    };

    const totalHeight = coords.length > 0 ? coords[coords.length - 1].y + 200 : 500;

    const worldObj = WORLDS.find(w => w.id === currentWorld) || WORLDS[0];

    return (
        <div className="flex flex-col items-center w-full overflow-hidden bg-slate-50 min-h-screen">
            {/* World Header */}
            <div className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm flex flex-col justify-between px-6">
                <div className="flex justify-between items-center w-full mb-3">
                    <div>
                        <h2 className="text-xl font-black text-deep-indigo uppercase tracking-wider">{worldObj.title}</h2>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">{worldObj.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        <span className="text-xl font-black text-slate-700">{hearts}</span>
                    </div>
                </div>
                {/* Mastery Progress Bar */}
                <div className="w-full">
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                        <span>Mastery Progress</span>
                        <span>{Math.round((completedLessons.length / allLessons.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-gold h-full rounded-full transition-all duration-1000"
                            style={{ width: `${(completedLessons.length / allLessons.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-md relative mt-8" style={{ height: totalHeight }}>
                {/* SVG Path */}
                <svg
                    className="absolute top-0 left-0 w-full h-full -z-0 pointer-events-none overflow-visible"
                    viewBox={`0 0 ${VIRTUAL_WIDTH} ${totalHeight}`}
                    preserveAspectRatio="none"
                >
                    <path
                        d={generatePath()}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="16 16"
                        className="opacity-60"
                    />
                </svg>

                {coords.map((pos, idx) => {
                    const lesson = lessons[idx];
                    if (!lesson) return null;
                    const status = getStatus(lesson.id);
                    // Use % based left positioning to match SVG scaling
                    const leftPercent = (pos.x / VIRTUAL_WIDTH) * 100;

                    return (
                        <div
                            key={lesson.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center ${status === 'current' ? 'z-20' : 'z-10'}`}
                            style={{
                                top: pos.y,
                                left: `${leftPercent}%`
                            }}
                        >
                            <LessonNode
                                id={lesson.id}
                                index={idx}
                                status={status}
                                type={lesson.type}
                                title={lesson.title}
                                onClick={() => handleLessonClick(lesson)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Legend for Checkpoints */}
            <div className="fixed bottom-4 right-4 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 text-xs text-slate-500 hidden sm:block z-50">
                <div className="flex items-center gap-2 mb-1">
                    <Flag className="w-4 h-4 text-indigo-500" /> Checkpoint
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <Swords className="w-4 h-4 text-purple-600" /> Adventure
                </div>
                <div className="flex items-center gap-2">
                    <Skull className="w-4 h-4 text-purple-800" /> Mastery Test
                </div>
            </div>
        </div>
    );
};
