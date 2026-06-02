import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useRPGStore } from '../store/useRPGStore';
import { getLesson, type ConversationScenario, type LessonData } from '../data/lessons';
import { type Kana } from '../data/kana';
import { Button } from '../components/ui/button';
import { CharacterMatch } from '../components/games/CharacterMatch';
import { SentenceBuilder } from '../components/games/SentenceBuilder';
import { ConversationGame } from '../components/games/ConversationGame';
import { FillInBlank } from '../components/games/FillInBlank';
import { Learn } from '../components/Learn';
import { CompetenceModal } from '../components/CompetenceModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Heart, Skull, Flag, BookOpen } from 'lucide-react';
import { JSpellbook } from '../components/JSpellbook';
import confetti from 'canvas-confetti';

// Stage order: learn → fillblank → char → sentence → complete
type Stage = 'learn' | 'fillblank' | 'char' | 'sentence' | 'conversation' | 'complete';

export const Lesson: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addXp, hearts, loseHeart, resetWorldProgress, completeLesson } = useStore();
    const { setLessonId, initCombat } = useRPGStore();

    const [lessonData, setLessonData] = useState<LessonData | null>(null);
    const [stage, setStage] = useState<Stage>('learn');
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [stageProgress, setStageProgress] = useState(0);
    const [showCompetenceModal, setShowCompetenceModal] = useState(false);
    const [showSpellbook, setShowSpellbook] = useState(false);

    useEffect(() => {
        if (!id) return;
        const data = getLesson(id);
        if (data) {
            setLessonData(data);
            if (data.type === 'conversation' || data.type === 'boss') {
                setStage('conversation');
            } else if (data.type === 'checkpoint') {
                setStage('fillblank');
            } else {
                setStage('learn');
            }
        }
    }, [id]);

    const finishLesson = () => {
        if (!id) return;
        completeLesson(id);
        addXp(lessonData?.xp ?? 50);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        // Show the Competence & Confidence modal only after lesson-1 and only once
        if (id === 'lesson-1') {
            const seen = localStorage.getItem('jquest-competence-modal-seen');
            if (!seen) {
                setShowCompetenceModal(true);
            }
        }
    };

    const handleSentenceFail = () => {
        if (lessonData?.type === 'checkpoint' || lessonData?.type === 'boss') {
            loseHeart();
            if (hearts <= 1) {
                if (lessonData?.worldId) resetWorldProgress(lessonData.worldId);
                navigate('/dashboard');
            }
        }
    };

    const handleSentenceComplete = () => {
        const problems = lessonData?.sentences ?? [];
        if (sentenceIndex < problems.length - 1) {
            setSentenceIndex(p => p + 1);
        } else {
            // Delay showing success screen
            setTimeout(() => {
                setStage('complete');
                finishLesson();
            }, 1000);
        }
    };

    const kanaItems = React.useMemo(() => (lessonData && Array.isArray(lessonData.content)) ? lessonData.content : [], [lessonData]);
    const kanaOnly = React.useMemo(() => kanaItems.filter(k => 'char' in k) as Kana[], [kanaItems]);
    const convScenario = React.useMemo(() => (lessonData && !Array.isArray(lessonData.content)) ? lessonData.content as ConversationScenario : null, [lessonData]);
    const fillProblems = React.useMemo(() => lessonData?.fillBlanks ?? [], [lessonData]);
    const sentenceProblems = React.useMemo(() => lessonData?.sentences ?? [], [lessonData]);

    const activeStages = React.useMemo(() => {
        if (!lessonData) return [];
        if (lessonData.type === 'conversation' || lessonData.type === 'boss') return ['conversation'];
        if (lessonData.type === 'checkpoint') return ['fillblank', 'sentence'];

        const stages: Stage[] = [];
        if (kanaItems.length > 0) stages.push('learn');
        if (fillProblems.length > 0) stages.push('fillblank');
        if (kanaOnly.length > 0) stages.push('char');
        if (sentenceProblems.length > 0) stages.push('sentence');
        return stages;
    }, [lessonData, kanaItems, fillProblems, kanaOnly, sentenceProblems]);

    const progress = React.useMemo(() => {
        if (stage === 'complete') return 100;
        if (!activeStages.length) return 0;

        const stageIndex = activeStages.indexOf(stage);
        if (stageIndex === -1) return 0;

        const stageWeight = 100 / (activeStages.length);
        const baseProgress = stageIndex * stageWeight;

        let subProgress = 0;
        if (stage === 'sentence') {
            subProgress = ((sentenceIndex + 1) / (sentenceProblems.length || 1)) * stageWeight;
        } else {
            subProgress = stageProgress * stageWeight;
        }

        return Math.min(98, baseProgress + subProgress);
    }, [stage, activeStages, sentenceIndex, sentenceProblems.length, stageProgress]);

    if (!lessonData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mx-auto" />
                    <p className="text-slate-500 font-bold">Loading lesson…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/30 flex flex-col">
            <CompetenceModal
                isOpen={showCompetenceModal}
                lessonTitle={lessonData?.title}
                onClose={() => {
                    localStorage.setItem('jquest-competence-modal-seen', '1');
                    setShowCompetenceModal(false);
                }}
            />
            {/* Header */}
            <header className="p-4 flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft className="h-6 w-6 text-slate-400" />
                </Button>

                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="font-black text-slate-700 text-sm">{hearts}</span>
                </div>

                <button
                    onClick={() => setShowSpellbook(true)}
                    className="flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-full transition-colors text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 bg-white border border-slate-100 shadow-sm ml-auto"
                    title="Open JSpellbook"
                >
                    <BookOpen className="h-4 w-4 fill-current" />
                    <span className="text-xs">Spellbook</span>
                </button>

                <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden max-w-md">
                    <motion.div
                        className="h-full bg-gradient-to-r from-sakura-pink to-indigo-500 rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Stage label */}
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">
                    {stage === 'learn' ? 'Learn' : stage === 'fillblank' ? 'Practice' : stage === 'char' ? 'Match' : stage === 'sentence' ? 'Build' : stage === 'conversation' ? 'Speak' : '✓ Done'}
                </span>

                <JSpellbook
                    isOpen={showSpellbook}
                    onClose={() => setShowSpellbook(false)}
                />
            </header>

            <main className="flex-1 flex flex-col items-center justify-start pt-6 p-4 overflow-hidden">
                <AnimatePresence mode="wait">

                    {/* ── COMPLETE ── */}
                    {stage === 'complete' && (
                        <motion.div key="complete"
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                            className="text-center space-y-6 max-w-sm w-full"
                        >
                            {lessonData.type === 'boss' ? <Skull className="w-24 h-24 text-red-500 mx-auto animate-bounce" />
                                : lessonData.type === 'checkpoint' ? <Flag className="w-24 h-24 text-indigo-500 mx-auto" />
                                    : <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />}
                            <div className="space-y-1">
                                {lessonData.type !== 'boss' && lessonData.type !== 'checkpoint' && (
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Adventure Mode</span>
                                )}
                                <h2 className="text-4xl font-black text-deep-indigo">
                                    {lessonData.type === 'boss' ? '⚔️ BOSS DEFEATED!' :
                                        lessonData.type === 'checkpoint' ? '🛡️ COMBAT CHECKPOINT' :
                                            `Lesson ${id?.split('-')[1] || ''}`}
                                </h2>
                            </div>
                            <p className="text-xl text-slate-500 font-bold">+{lessonData.xp} XP</p>
                            <Button size="lg" onClick={() => {
                                if (id) {
                                    setLessonId(id);
                                    import('../data/rpgData').then(({ yokaiEnemies }) => {
                                        const randomEnemy = yokaiEnemies[Math.floor(Math.random() * yokaiEnemies.length)];
                                        initCombat([randomEnemy]);
                                        navigate('/rpg');
                                    });
                                }
                            }} className="w-full text-xl py-6 rounded-2xl shadow-lg border-b-4 border-indigo-700">
                                Enter Combat Encounter →
                            </Button>
                        </motion.div>
                    )}

                    {/* ── LEARN ── */}
                    {stage === 'learn' && lessonData.type === 'kana' && (
                        <motion.div key="learn" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="w-full flex justify-center">
                            <Learn
                                items={kanaItems as any[]}
                                onProgress={(idx, total) => setStageProgress(idx / total)}
                                onComplete={() => {
                                    addXp(10);
                                    setStageProgress(0);
                                    if (fillProblems.length > 0) {
                                        setStage('fillblank');
                                    } else if (kanaOnly.length > 0) {
                                        setStage('char');
                                    } else if (sentenceProblems.length > 0) {
                                        setStage('sentence');
                                    } else {
                                        setStage('complete');
                                        finishLesson();
                                    }
                                }}
                            />
                        </motion.div>
                    )}

                    {/* ── FILL IN THE BLANK ── */}
                    {stage === 'fillblank' && fillProblems.length > 0 && (
                        <motion.div key="fillblank" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="w-full flex justify-center">
                            <FillInBlank
                                problems={fillProblems}
                                hideRomaji={lessonData.hideRomaji}
                                hideEnglish={lessonData.hideEnglish}
                                onProgress={(idx, total) => setStageProgress(idx / total)}
                                onComplete={() => {
                                    addXp(15);
                                    setStageProgress(0);
                                    if (lessonData.type !== 'checkpoint' && kanaOnly.length > 0) {
                                        setStage('char');
                                    } else if (sentenceProblems.length > 0) {
                                        setStage('sentence');
                                    } else {
                                        setStage('complete');
                                        finishLesson();
                                    }
                                }}
                            />
                        </motion.div>
                    )}

                    {/* ── CHARACTER MATCH ── */}
                    {stage === 'char' && kanaOnly.length > 0 && (
                        <motion.div key="char" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="w-full flex justify-center">
                            <CharacterMatch
                                items={kanaOnly}
                                onProgress={(matched, total) => setStageProgress(matched / total)}
                                onComplete={() => {
                                    addXp(20);
                                    setStageProgress(0);
                                    if (sentenceProblems.length > 0) {
                                        setStage('sentence');
                                    } else {
                                        setStage('complete');
                                        finishLesson();
                                    }
                                }}
                            />
                        </motion.div>
                    )}

                    {/* ── SENTENCE BUILD ── */}
                    {stage === 'sentence' && sentenceProblems.length > 0 && (
                        <motion.div key="sentence-builder" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="w-full flex justify-center">
                            <SentenceBuilder
                                problem={sentenceProblems[sentenceIndex]}
                                hideRomaji={lessonData.hideRomaji}
                                hideEnglish={lessonData.hideEnglish}
                                onComplete={handleSentenceComplete}
                                onFail={handleSentenceFail}
                            />
                        </motion.div>
                    )}

                    {/* ── CONVERSATION ── */}
                    {stage === 'conversation' && convScenario && (
                        <motion.div key="conversation" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="w-full flex justify-center">
                            <ConversationGame
                                scenario={convScenario}
                                hideEnglish={lessonData.hideEnglish}
                                onComplete={() => {
                                    if (sentenceProblems.length > 0) {
                                        setStage('sentence');
                                    } else {
                                        setStage('complete');
                                        finishLesson();
                                    }
                                }}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
};
