import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ConversationScenario, type ConversationChoice } from '../../data/lessons';
import { useAudio } from '../../hooks/useAudio';
import { Volume2, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { KanaHover } from '../ui/KanaHover';

interface ConversationGameProps {
    scenario: ConversationScenario;
    onComplete: () => void;
    hideEnglish?: boolean;
}

export const ConversationGame: React.FC<ConversationGameProps> = ({ scenario, onComplete, hideEnglish }) => {
    const [step, setStep] = useState(0);
    const [history, setHistory] = useState<any[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const { play, playClick, playSuccess } = useAudio();
    const scrollRef = useRef<HTMLDivElement>(null);

    const currentExchange = scenario.exchanges[step];

    useEffect(() => {
        // Play NPC audio when step changes
        if (currentExchange) {
            const timer = setTimeout(() => {
                play(currentExchange.npcQuery.text);
                playClick();
                setHistory(prev => [...prev, { ...currentExchange.npcQuery, type: 'npc' }]);
                setShowOptions(true);
            }, 600);
            return () => clearTimeout(timer);
        } else if (step >= scenario.exchanges.length) {
            onComplete();
        }
    }, [step, scenario, play, onComplete]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, feedback]);

    const handleOptionSelect = (option: ConversationChoice) => {
        play(option.text);

        // Add user response to history
        setHistory(prev => [...prev, { ...option, type: 'user' }]);
        setShowOptions(false);

        if (option.isCorrect) {
            playSuccess();
            setFeedback({ text: option.feedback, type: 'success' });
            setTimeout(() => {
                setFeedback(null);
                setStep(prev => prev + 1);
            }, 2000);
        } else {
            playClick();
            setFeedback({ text: option.feedback, type: 'error' });
            // Allow retry? or fail? For now, let's just show feedback and let them try again (mock retry logic)
            // Ideally we'd remove the 'user' msg from history or keep it as a mistake.
            // Let's just create a slight delay then show options again.
            setTimeout(() => {
                setFeedback(null);
                setShowOptions(true);
                // Remove the incorrect attempt from visual history to clean up
                setHistory(prev => prev.slice(0, -1));
            }, 2000);
        }
    };

    if (!currentExchange) return null;

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200">
            {/* Header */}
            <div className="bg-deep-indigo text-white p-4 flex items-center space-x-3 shadow-md z-10">
                <div className="relative">
                    <img src={scenario.npcAvatar} alt={scenario.npcName} className="w-12 h-12 rounded-full border-2 border-white bg-indigo-200" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-deep-indigo" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">{scenario.npcName}</h3>
                    <p className="text-xs text-indigo-300">Online</p>
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className={cn("flex-1 p-4 overflow-y-auto space-y-4 bg-pattern scroll-smooth", scenario.background)}
            >
                <div className="text-center text-xs text-slate-400 my-4 uppercase tracking-widest font-bold">
                    Today
                </div>

                {/* Intro */}
                {step === 0 && history.length === 0 && (
                    <div className="text-center text-sm text-slate-500 bg-white/80 p-2 rounded-lg mx-auto w-max mb-4 shadow-sm border border-slate-100">
                        {scenario.intro}
                    </div>
                )}

                <AnimatePresence initial={false}>
                    {history.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "flex w-full",
                                msg.type === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[80%] p-4 rounded-2xl shadow-sm border relative",
                                msg.type === 'user'
                                    ? "bg-sakura-pink text-white rounded-tr-none border-sakura-dark"
                                    : "bg-white text-deep-indigo rounded-tl-none border-slate-200"
                            )}>
                                <div className="font-bold text-lg leading-relaxed">
                                    <KanaHover char={msg.text} kanaData={{ char: msg.text, romaji: '', type: 'hiragana', examples: [{ word: msg.text, meaning: msg.english }] }}>
                                        {msg.text}
                                    </KanaHover>
                                </div>
                                <div className={cn("text-xs mt-1", msg.type === 'user' ? "text-sakura-200" : "text-slate-400")}>
                                    {/* Optional english subtitle */}
                                </div>

                                {msg.type === 'npc' && (
                                    <button
                                        onClick={() => play(msg.text)}
                                        className="absolute -right-8 top-2 text-slate-400 hover:text-deep-indigo p-1"
                                    >
                                        <Volume2 size={16} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                            "mx-auto px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2",
                            feedback.type === 'success' ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
                        )}
                    >
                        {feedback.text}
                    </motion.div>
                )}
            </div>

            {/* Input Area (Choices) */}
            <div className="p-4 bg-white border-t-2 border-slate-100">
                <AnimatePresence mode="wait">
                    {showOptions ? (
                        <div className="grid gap-2">
                            {currentExchange.options.map((opt) => (
                                <motion.button
                                    key={opt.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={() => handleOptionSelect(opt)}
                                    className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-sakura-pink hover:bg-sakura-pink/5 hover:scale-[1.01] transition-all flex items-center justify-between group active:scale-[0.99]"
                                >
                                    <div>
                                        <span className="font-bold text-deep-indigo group-hover:text-sakura-pink block text-lg">{opt.text}</span>
                                        {!hideEnglish && <span className="text-xs text-slate-400">{opt.english}</span>}
                                    </div>
                                    <MessageSquare size={18} className="text-slate-300 group-hover:text-sakura-pink" />
                                </motion.button>
                            ))}
                        </div>
                    ) : (
                        <div className="h-16 flex items-center justify-center text-slate-400 italic text-sm">
                            {feedback ? (feedback.type === 'success' ? 'Great job!' : 'Try again...') : 'Thinking...'}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
