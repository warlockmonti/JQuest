import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, Lightbulb, Mic, MicOff } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { MascotPopup } from '../MascotPopup';
import { useSpeechRecognition, findBestMatch, fuzzyMatch } from '../../hooks/useSpeechRecognition';

export interface FillBlankProblem {
    id: string;
    japanese: string;
    english: string;
    blanks: {
        position: number;
        answer: string;
        choices: { id: string; text: string; romaji: string; meaning?: string; }[];
    }[];
    parts: string[];
    romaji?: string;
    literal?: string;
    emoji?: string;
}



const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

interface FillInBlankProps {
    problems: FillBlankProblem[];
    onComplete: () => void;
    onProgress?: (index: number, total: number) => void;
    onFail?: () => void;
    hideRomaji?: boolean;
    hideEnglish?: boolean;
}

type BlankStatus = 'idle' | 'correct' | 'wrong';

export const FillInBlank: React.FC<FillInBlankProps> = ({ problems, onComplete, onProgress, onFail, hideRomaji, hideEnglish }) => {
    const [problemIndex, setProblemIndex] = useState(0);
    const [blankIndex, setBlankIndex] = useState(0);
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [lastStatus, setLastStatus] = useState<BlankStatus>('idle');
    const [showFeedback, setShowFeedback] = useState(false);
    const [hintUsed, setHintUsed] = useState(false);
    const [hintCost, setHintCost] = useState(100);
    // Shake animation trigger
    const [shakeKey, setShakeKey] = useState(0);
    const { play, playClick, playSuccess } = useAudio();
    const { xp, spendXp, incrementCombo, resetCombo, incrementMastery } = useStore();

    // Speech Recognition
    const {
        isListening,
        transcript,
        interimTranscript,
        error: speechError,
        isSupported: speechSupported,
        startListening,
        stopListening,
        reset: resetSpeech,
    } = useSpeechRecognition();

    const problem = problems[problemIndex];

    // Notify parent of progress
    useEffect(() => {
        if (onProgress) onProgress(problemIndex, problems.length);
    }, [problemIndex, problems.length, onProgress]);

    useEffect(() => {
        setBlankIndex(0);
        setAnswers(new Array(problem.blanks.length).fill(null));
        setLastStatus('idle');
        setShowFeedback(false);
        setHintUsed(false);
        resetSpeech();
        const t = setTimeout(() => play(problem.japanese), 600);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [problemIndex, problem.japanese, play]);

    // Handle speech transcript — auto-select best matching choice
    const prevTranscriptRef = useRef('');
    useEffect(() => {
        if (!transcript || transcript === prevTranscriptRef.current || showFeedback) return;
        prevTranscriptRef.current = transcript;

        const correctAnswer = problem.blanks[blankIndex]?.answer;
        const currentChoices = problem.blanks[blankIndex]?.choices ?? [];
        const choiceTexts = currentChoices.map(c => c.text);

        // 1. If they spoke the entire correct sentence, auto-select the correct answer for this blank!
        if (fuzzyMatch(transcript, problem.japanese) && correctAnswer) {
            setTimeout(() => handleChoice(correctAnswer), 200);
            return;
        }

        // 2. Otherwise try to match just the specific word/character they said against the choices.
        const match = findBestMatch(transcript, choiceTexts);

        if (match) {
            setTimeout(() => handleChoice(match), 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transcript]);

    const handleChoice = (choiceText: string) => {
        if (showFeedback) return;
        const correctAnswer = problem.blanks[blankIndex].answer;
        const isCorrect = choiceText === correctAnswer;

        stopListening();
        resetSpeech();

        const newAnswers = [...answers];
        newAnswers[blankIndex] = choiceText;
        setAnswers(newAnswers);
        setLastStatus(isCorrect ? 'correct' : 'wrong');
        setShowFeedback(true);
        if (isCorrect) {
            playSuccess();
            setTimeout(() => play(choiceText), 600);
        } else {
            playClick();
            setShakeKey(k => k + 1);
        }

        if (isCorrect) {
            incrementCombo();
            incrementMastery(correctAnswer);
        } else {
            resetCombo();
            if (onFail) onFail();
        }

        setTimeout(() => {
            setShowFeedback(false);
            if (isCorrect) {
                setHintUsed(false);
                if (blankIndex < problem.blanks.length - 1) {
                    setBlankIndex(prev => prev + 1);
                    setLastStatus('idle');
                } else {
                    if (problemIndex < problems.length - 1) {
                        setProblemIndex(prev => prev + 1);
                    } else {
                        onComplete();
                    }
                }
            } else {
                setLastStatus('idle');
                setAnswers(prev => { const n = [...prev]; n[blankIndex] = null; return n; });
            }
        }, isCorrect ? 1100 : 1400);
    };

    const handleHint = () => {
        if (hintUsed || xp < hintCost) return;
        if (spendXp(hintCost)) {
            playClick();
            setHintUsed(true);
            setHintCost(prev => prev + 50);
        }
    };

    const renderSentence = () =>
        problem.parts.map((part: string, i: number) => {
            const blankIdx = problem.blanks.findIndex(b => b.position === i);
            if (blankIdx === -1) return <span key={i} className="font-jp text-3xl font-bold text-slate-800">{part}</span>;
            const filled = answers[blankIdx];
            const isCurrent = blankIdx === blankIndex;
            return (
                <span key={i} className={cn(
                    'inline-block min-w-[80px] text-center border-b-4 mx-1 px-2 pb-1 font-jp text-3xl font-bold transition-all',
                    filled ? (blankIdx < blankIndex ? 'border-green-400 text-green-600' : 'border-indigo-400 text-indigo-700')
                        : isCurrent ? 'border-sakura-pink text-transparent animate-pulse' : 'border-slate-300 text-transparent'
                )}>
                    {filled || '　　'}
                </span>
            );
        });

    const currentChoices = React.useMemo(() => {
        const choices = problem.blanks[blankIndex]?.choices ?? [];
        return shuffleArray(choices);
    }, [problem, blankIndex]);

    const correctAnswer = problem.blanks[blankIndex]?.answer;
    const canHint = !hintUsed && xp >= hintCost;
    const liveText = interimTranscript || transcript;

    return (
        <div className="w-full max-w-2xl mx-auto px-4 flex flex-col items-center gap-8">
            {/* Header */}
            <div className="text-center space-y-1 w-full">
                <div className="flex items-center justify-between text-sm font-bold text-slate-400 mb-1">
                    <span>Phrase {problemIndex + 1} / {problems.length}</span>
                    <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs">Fill in the blank</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-sakura-pink to-indigo-500"
                        animate={{ width: `${(problemIndex / problems.length) * 100}%` }} />
                </div>
            </div>

            {/* Sentence Card */}
            <motion.div
                key={shakeKey}
                animate={lastStatus === 'wrong' ? {
                    x: [0, -12, 12, -10, 10, -6, 6, 0],
                    transition: { duration: 0.5 }
                } : {}}
                className="w-full bg-white rounded-3xl shadow-xl border-b-[6px] border-slate-200 p-8 flex flex-col items-center gap-4"
            >
                <div className="flex items-center gap-3 flex-wrap justify-center">
                    <button onClick={() => play(problem.japanese)}
                        className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-2xl transition-colors">
                        <Volume2 className="w-5 h-5" /><span className="text-sm">Listen</span>
                    </button>

                    {/* Mic Button */}
                    {speechSupported && (
                        <button
                            onClick={isListening ? stopListening : startListening}
                            disabled={showFeedback}
                            aria-label={isListening ? 'Stop listening' : 'Speak your answer'}
                            className={cn(
                                'flex items-center gap-2 font-bold px-4 py-2 rounded-2xl transition-all border-2 relative',
                                isListening
                                    ? 'bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-200'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700'
                            )}
                        >
                            {isListening ? (
                                <>
                                    <span className="absolute inset-0 rounded-2xl animate-ping bg-rose-400 opacity-30 pointer-events-none" />
                                    <MicOff className="w-5 h-5" />
                                    <span className="text-sm">Listening…</span>
                                </>
                            ) : (
                                <>
                                    <Mic className="w-5 h-5" />
                                    <span className="text-sm">Cast Word</span>
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="text-5xl my-2 drop-shadow-md">{problem.emoji || '💬'}</div>
                <div className="flex flex-wrap items-end justify-center gap-1 min-h-[60px] py-0">
                    {renderSentence()}
                </div>
                {problem.romaji && !hideRomaji && <p className="text-slate-400 font-mono text-sm mt-2">{problem.romaji}</p>}
                {problem.literal && !hideRomaji && <p className="text-slate-400 text-sm italic">{problem.literal}</p>}
                {!hideEnglish && <p className="text-slate-500 font-medium text-lg italic">{problem.english}</p>}

                {/* Live Transcript Display */}
                <AnimatePresence>
                    {(isListening || liveText) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full mt-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl text-center"
                        >
                            <p className="text-xs text-purple-500 font-bold uppercase tracking-widest mb-1">Incantation heard:</p>
                            <p className={cn(
                                'font-jp text-lg font-bold',
                                interimTranscript ? 'text-purple-400 italic' : 'text-purple-700'
                            )}>
                                {liveText || '…'}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Speech error */}
                {speechError && (
                    <p className="text-xs text-red-500 font-medium mt-1">{speechError}</p>
                )}
            </motion.div>

            {/* Choices */}
            <div className="grid grid-cols-2 gap-4 w-full">
                {currentChoices.map((choice: any) => (
                    <motion.button key={choice.id}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.97 }}
                        onClick={() => handleChoice(choice.text)}
                        disabled={showFeedback}
                        className={cn(
                            'relative flex flex-col items-center gap-1 p-4 rounded-2xl border-b-4 font-bold transition-all shadow-sm',
                            'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50',
                            hintUsed && choice.text === correctAnswer && 'bg-yellow-50 border-yellow-400 text-yellow-700 ring-2 ring-yellow-300',
                            showFeedback && choice.text === correctAnswer && 'bg-green-50 border-green-400 text-green-700',
                            showFeedback && lastStatus === 'wrong' && choice.text !== correctAnswer && 'opacity-40',
                        )}>
                        <span className="font-jp text-2xl">{choice.text}</span>
                        {!hideRomaji && (
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-slate-400 font-mono">{choice.romaji}</span>
                                {choice.meaning && <span className="text-[10px] text-slate-400 italic line-clamp-1">{choice.meaning}</span>}
                            </div>
                        )}
                        {hintUsed && choice.text === correctAnswer && (
                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-black px-1.5 py-0.5 rounded-full">💡</span>
                        )}
                        {/* Correct pop animation */}
                        {showFeedback && lastStatus === 'correct' && choice.text === correctAnswer && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1"
                            >
                                <CheckCircle className="w-5 h-5" />
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Hint Button */}
            <div className="w-full flex justify-center">
                <button
                    onClick={handleHint}
                    disabled={!canHint || hintUsed}
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm border-2 transition-all',
                        hintUsed ? 'bg-yellow-50 border-yellow-300 text-yellow-600 cursor-default'
                            : canHint ? 'bg-white border-blue-200 text-blue-500 hover:bg-blue-50 hover:border-blue-400'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    )}>
                    <Lightbulb className="w-4 h-4" />
                    {hintUsed ? 'Hint used' : `Use Hint  −${hintCost} ⭐  (You have ${xp})`}
                </button>
            </div>

            {/* Feedback Banner */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={cn('fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl font-bold text-lg z-50',
                            lastStatus === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white')}>
                        {lastStatus === 'correct'
                            ? <><CheckCircle className="w-6 h-6" /> Spell Cast! ✨</>
                            : <><XCircle className="w-6 h-6" /> Incantation muddled. Try again!</>}
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Mascot Popups */}
            <MascotPopup feedback={showFeedback ? (lastStatus === 'wrong' ? 'incorrect' : 'correct') : null} />
        </div>
    );
};
