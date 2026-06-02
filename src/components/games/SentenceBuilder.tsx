import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { useAudio } from '../../hooks/useAudio';
import { RotateCcw, Lightbulb, Mic, MicOff } from 'lucide-react';
import { type SentenceProblem } from '../../data/lessons';
import { useStore } from '../../store/useStore';
import { MascotPopup } from '../MascotPopup';
import { useSpeechRecognition, fuzzyMatch } from '../../hooks/useSpeechRecognition';
import { cn } from '../../lib/utils';

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

interface SentenceBuilderProps {
    problem: SentenceProblem;
    onComplete: () => void;
    onFail?: () => void;
    hideRomaji?: boolean;
    hideEnglish?: boolean;
}



export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ problem, onComplete, onFail, hideRomaji, hideEnglish }) => {
    const [selectedWords, setSelectedWords] = useState<typeof problem.words>([]);
    const [availableWords, setAvailableWords] = useState(problem.words);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [mascotFeedback, setMascotFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [hintUsed, setHintUsed] = useState(false);
    const [hintCost, setHintCost] = useState(100);
    const { play, playClick, playSuccess } = useAudio();
    const { xp, spendXp, incrementCombo, resetCombo, incrementMastery } = useStore();

    // Speech recognition
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

    useEffect(() => {
        setAvailableWords(shuffleArray(problem.words));
        setSelectedWords([]);
        setIsIncorrect(false);
        setHintUsed(false);
        resetSpeech();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [problem]);

    // Handle speech transcript — compare against full sentence
    const prevTranscriptRef = useRef('');
    useEffect(() => {
        if (!transcript || transcript === prevTranscriptRef.current) return;
        prevTranscriptRef.current = transcript;

        // Check if the full transcript matches the sentence
        const isMatch = fuzzyMatch(transcript, problem.japanese);
        if (isMatch) {
            stopListening();
            resetSpeech();
            // Auto-submit the correct answer
            autoFillCorrectAnswer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transcript]);

    const autoFillCorrectAnswer = () => {
        // Fill in words in solution order
        const solutionWords = problem.solution.map(sol =>
            problem.words.find(w => w.text === sol)
        ).filter(Boolean) as typeof problem.words;
        setSelectedWords(solutionWords);
        setAvailableWords([]);
    };

    const handleHint = () => {
        if (hintUsed || xp < hintCost) return;
        const nextPos = selectedWords.length;
        const nextCorrectText = problem.solution[nextPos];
        if (!nextCorrectText) return;
        const nextWord = availableWords.find(w => w.text === nextCorrectText);
        if (!nextWord) return;

        if (spendXp(hintCost)) {
            playClick();
            setHintUsed(true);
            setHintCost(prev => prev + 50);
            handleWordSelect(nextWord);
        }
    };

    const handleWordSelect = (word: typeof problem.words[0]) => {
        setIsIncorrect(false);
        play(word.text);
        setAvailableWords(prev => prev.filter(w => w.id !== word.id));
        setSelectedWords(prev => [...prev, word]);
    };

    const handleWordRemove = (word: typeof problem.words[0]) => {
        setIsIncorrect(false);
        playClick();
        setSelectedWords(prev => prev.filter(w => w.id !== word.id));
        setAvailableWords(prev => [...prev, word]);
    };

    const checkAnswer = async () => {
        const currentSentence = selectedWords.map(w => w.text);
        const isCorrect = currentSentence.length === problem.solution.length &&
            currentSentence.every((val, index) => val === problem.solution[index]);

        if (isCorrect) {
            playSuccess();
            setMascotFeedback('correct');
            await play(problem.japanese);
            await new Promise(r => setTimeout(r, 500));
            await play(problem.japanese, 0.6);
            await new Promise(r => setTimeout(r, 1000));
            setMascotFeedback(null);
            incrementCombo();
            incrementMastery(problem.japanese);
            onComplete();
        } else {
            setIsIncorrect(true);
            setMascotFeedback('incorrect');
            if (onFail) onFail();
            resetCombo();
            setTimeout(() => {
                setIsIncorrect(false);
                setMascotFeedback(null);
                setSelectedWords([]);
                setAvailableWords(problem.words);
            }, 1000);
        }
    };

    const liveText = interimTranscript || transcript;

    return (
        <div className="w-full max-w-2xl mx-auto px-4 overflow-hidden">
            <h2 className="text-3xl font-black text-center mb-8 text-deep-indigo tracking-tight">Translate this</h2>

            <AnimatePresence mode="wait">
                <motion.div
                    key={problem.english}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full"
                >
                    <div className="bg-white rounded-3xl p-8 border-b-[6px] border-slate-200 shadow-sm mb-6 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100" />
                        <span className="text-6xl mb-4 drop-shadow-md block leading-none">{problem.emoji || '💬'}</span>
                        <div className="flex flex-col items-center gap-1">
                            {problem.japanese && <p className="font-jp text-3xl font-bold text-slate-800 mb-2">{problem.japanese}</p>}
                            {problem.romaji && !hideRomaji && <p className="text-slate-400 font-mono text-sm">{problem.romaji}</p>}
                            {problem.literal && !hideRomaji && <p className="text-slate-400 text-sm italic">{problem.literal}</p>}
                            {!hideEnglish && <p className="text-2xl text-slate-700 font-bold text-center">"{problem.english}"</p>}
                        </div>

                        {/* Speak button row */}
                        {speechSupported && (
                            <div className="mt-4">
                                <button
                                    onClick={isListening ? stopListening : startListening}
                                    aria-label={isListening ? 'Stop speaking' : 'Speak the sentence'}
                                    className={cn(
                                        'flex items-center gap-2 font-bold px-5 py-2 rounded-2xl transition-all border-2 relative text-sm',
                                        isListening
                                            ? 'bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-200'
                                            : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                                    )}
                                >
                                    {isListening ? (
                                        <>
                                            <span className="absolute inset-0 rounded-2xl animate-ping bg-rose-400 opacity-30 pointer-events-none" />
                                            <MicOff className="w-4 h-4" />Listening…
                                        </>
                                    ) : (
                                        <><Mic className="w-4 h-4" />Speak Your Incantation</>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Live Transcript */}
                        <AnimatePresence>
                            {(isListening || liveText) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 w-full px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl text-center"
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
                        {speechError && <p className="text-xs text-red-500 font-medium mt-2">{speechError}</p>}
                    </div>

                    {/* Answer Area */}
                    <div className="min-h-[100px] bg-slate-200/50 rounded-2xl border-2 border-dashed border-slate-300 mb-8 flex flex-wrap gap-3 items-center justify-center p-4">
                        <AnimatePresence>
                            {selectedWords.map((word) => (
                                <motion.button
                                    key={word.id}
                                    layoutId={word.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    onClick={() => handleWordRemove(word)}
                                    className="bg-white border-b-4 border-slate-200 text-deep-indigo px-5 py-2 rounded-xl flex flex-col items-center gap-0 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all active:translate-y-0 active:border-b-0 active:mt-1 group"
                                >
                                    <span className="text-xl font-bold">{word.text}</span>
                                    {!hideRomaji && <span className="text-[10px] text-slate-400 font-mono leading-none">{word.romaji}</span>}
                                    {!hideRomaji && word.meaning && <span className="text-[10px] text-slate-400 italic leading-none">{word.meaning}</span>}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                        {selectedWords.length === 0 && (
                            <span className="text-slate-400 font-medium select-none">Tap words to build sentence</span>
                        )}
                    </div>

                    {/* Word Bank */}
                    <div className="flex flex-wrap gap-3 justify-center mb-12">
                        <AnimatePresence>
                            {availableWords.map((word) => (
                                <motion.button
                                    key={word.id}
                                    layoutId={word.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    onClick={() => handleWordSelect(word)}
                                    className="bg-white border-b-4 border-slate-200 text-deep-indigo px-5 py-2 rounded-xl flex flex-col items-center gap-0 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all active:translate-y-0 active:border-b-0 active:mt-1"
                                >
                                    <span className="text-xl font-bold">{word.text}</span>
                                    {!hideRomaji && <span className="text-[10px] text-slate-400 font-mono leading-none">{word.romaji}</span>}
                                    {!hideRomaji && word.meaning && <span className="text-[10px] text-slate-400 italic leading-none">{word.meaning}</span>}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="flex gap-4 w-full max-w-sm mx-auto">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setSelectedWords([]);
                                setAvailableWords(problem.words);
                            }}
                            className="h-14 w-14 rounded-2xl bg-slate-200 text-slate-500 hover:bg-slate-300"
                        >
                            <RotateCcw className="h-6 w-6" />
                        </Button>

                        <Button
                            onClick={checkAnswer}
                            disabled={selectedWords.length === 0}
                            variant={'default'}
                            className={`flex-1 h-14 text-xl rounded-2xl shadow-lg border-b-4 active:border-b-0 active:translate-y-1 ${isIncorrect ? 'bg-red-500 border-red-700 hover:bg-red-600' : 'bg-indigo-600 border-indigo-800 hover:bg-indigo-500'}`}
                        >
                            {isIncorrect ? 'Try Again' : 'CHECK ANSWER'}
                        </Button>
                    </div>

                    {/* Hint */}
                    <div className="w-full flex justify-center">
                        <button
                            onClick={handleHint}
                            disabled={hintUsed || xp < hintCost}
                            className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm border-2 transition-all ${hintUsed ? 'bg-yellow-50 border-yellow-300 text-yellow-600 cursor-default'
                                : xp >= hintCost ? 'bg-white border-blue-200 text-blue-500 hover:bg-blue-50 hover:border-blue-400'
                                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            <Lightbulb className="w-4 h-4" />
                            {hintUsed ? '💡 Hint used — next word placed!' : `Use Hint  −${hintCost} ⭐  (You have ${xp})`}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isIncorrect && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-6 p-4 bg-red-100/50 border-2 border-red-200 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 max-w-sm mx-auto"
                            >
                                Incantation muddled. Try again!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            <MascotPopup feedback={mascotFeedback} />
        </div>
    );
};
