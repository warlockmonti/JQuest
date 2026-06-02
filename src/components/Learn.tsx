import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Kana } from '../data/kana';
import { type GrammarSlide, type KanjiLogicSlide } from '../data/lessons';
import { Button } from './ui/button';
import { useAudio } from '../hooks/useAudio';
import { Volume2, ArrowRight, BookOpen, Sparkles, Wand2 } from 'lucide-react';
import { cn } from '../lib/utils';

type LearnItem = Kana | GrammarSlide | KanjiLogicSlide;

interface LearnProps {
    items: LearnItem[];
    onComplete: () => void;
    onProgress?: (index: number, total: number) => void;
}

type Slide =
    | { type: 'kana'; data: Kana }
    | { type: 'example'; data: Kana }
    | { type: 'grammar'; data: GrammarSlide }
    | { type: 'kanji-logic'; data: KanjiLogicSlide };

export const Learn: React.FC<LearnProps> = ({ items, onComplete, onProgress }) => {
    const { play, hasAudio } = useAudio();

    // Transform items into slides (interleave examples)
    const slides = useMemo(() => {
        return items.flatMap((item) => {
            if (item.type === 'kanji-logic') {
                return [{ type: 'kanji-logic', data: item }] as Slide[];
            }
            if ('char' in item) {
                // It's Kana
                const s: Slide[] = [{ type: 'kana', data: item }];
                if (item.examples && item.examples.length > 0) {
                    item.examples.forEach(ex => {
                        // Create a temporary clone for each example card
                        s.push({ type: 'example', data: { ...item, examples: [ex] } });
                    });
                }
                return s;
            }
            // It's Grammar
            return [{ type: 'grammar', data: item }] as Slide[];
        });
    }, [items]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSlide = slides[currentIndex];

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handlePlayAudio = useCallback(() => {
        if (!currentSlide) return;
        if (currentSlide.type === 'kana') {
            play(currentSlide.data.char);
        } else if (currentSlide.type === 'example') {
            // Strip the "(romaji)" hint to get the pure Japanese text
            const word = currentSlide.data.examples?.[0]?.word.split('(')[0].trim();
            if (word) {
                // If the full compound word has audio, use it; otherwise fall back to the kana character
                if (hasAudio(word)) {
                    play(word);
                } else {
                    play(currentSlide.data.char);
                }
            }
        } else if (currentSlide.type === 'grammar') {
            play(currentSlide.data.exampleSentence.japanese);
        } else if (currentSlide.type === 'kanji-logic') {
            play(currentSlide.data.example.word);
        }
    }, [currentSlide, play, hasAudio]);

    // Keep a stable ref so the auto-play effect only fires once per slide change,
    // not again when handlePlayAudio re-creates due to currentSlide updating.
    const handlePlayAudioRef = React.useRef(handlePlayAudio);
    useEffect(() => { handlePlayAudioRef.current = handlePlayAudio; }, [handlePlayAudio]);

    // Notify parent of progress
    useEffect(() => {
        if (onProgress) onProgress(currentIndex, slides.length);
    }, [currentIndex, slides.length, onProgress]);

    // Auto-play audio when slide changes
    useEffect(() => {
        const timer = setTimeout(() => handlePlayAudioRef.current(), 500);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Helper to parse "Japanese Word (Romaji)"
    const parseExample = (text: string) => {
        const match = text.match(/^(.+?)\s*\((.+?)\)$/);
        if (match) {
            return { japanese: match[1], romaji: match[2] };
        }
        return { japanese: text, romaji: '' };
    };

    if (!currentSlide) return null;

    return (
        <div className="w-full max-w-xl mx-auto px-4 pt-2">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-deep-indigo">
                    {(currentSlide.type === 'kanji-logic' || currentSlide.type === 'grammar') ? 'Language Logic' : 'Learn'}
                </h2>
                <div className="flex items-center justify-center gap-2 text-slate-500 font-bold">
                    <span>Card {currentIndex + 1} of {slides.length}</span>
                    {currentSlide.type === 'grammar' && (
                        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">GRAMMAR</span>
                    )}
                    {currentSlide.type === 'kanji-logic' && (
                        <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-xs">LOGIC</span>
                    )}
                    {currentSlide.type === 'example' && (
                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs">EXAMPLE</span>
                    )}
                </div>
            </div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${currentIndex}-${currentSlide.type}`} // Unique key for animation
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="bg-white rounded-3xl p-8 border-b-[8px] border-slate-200 shadow-xl flex flex-col items-center min-h-[420px] justify-center"
                    >
                        {currentSlide.type === 'kana' && (
                            // --- KANA CARD ---
                            <>
                                <div
                                    className="bg-paper-white w-40 h-40 rounded-3xl flex items-center justify-center mb-6 cursor-pointer border-4 border-indigo-50 hover:border-sakura-pink transition-colors relative group"
                                    onClick={handlePlayAudio}
                                >
                                    <span className="text-8xl font-black text-deep-indigo font-jp">{currentSlide.data.char}</span>
                                    <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-sm text-deep-indigo opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Volume2 size={20} />
                                    </div>
                                </div>

                                <div className="text-center w-full space-y-4">
                                    <div>
                                        <h3 className="text-4xl font-bold text-deep-indigo mb-1">{currentSlide.data.romaji}</h3>
                                        <div className="h-1 w-16 bg-slate-100 mx-auto rounded-full" />
                                    </div>

                                    {currentSlide.data.mnemonic && (
                                        <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100">
                                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">Mnemonic Hint</span>
                                            <p className="text-lg text-deep-indigo font-medium leading-relaxed">
                                                {currentSlide.data.mnemonic}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {currentSlide.type === 'example' && (
                            // --- EXAMPLE CARD ---
                            <div className="flex flex-col items-center text-center w-full">
                                <div className="bg-green-100 p-3 rounded-full text-green-600 mb-6">
                                    <Sparkles size={32} />
                                </div>

                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Example Word</span>

                                <div
                                    className="bg-paper-white w-full py-12 rounded-3xl flex flex-col items-center justify-center mb-6 cursor-pointer border-4 border-green-50 hover:border-green-200 transition-colors relative group"
                                    onClick={handlePlayAudio}
                                >
                                    {(() => {
                                        const { japanese, romaji } = parseExample(currentSlide.data.examples![0].word);
                                        return (
                                            <>
                                                <span className="text-6xl font-black text-deep-indigo font-jp mb-2">{japanese}</span>
                                                <span className="text-xl font-bold text-slate-400">{romaji}</span>
                                                {currentSlide.data.examples![0].common && (
                                                    <span className="text-sm font-bold text-slate-400 mt-4 flex items-center gap-2">
                                                        Commonly written:
                                                        <span className="text-deep-indigo text-xl font-black font-jp">{currentSlide.data.examples![0].common}</span>
                                                    </span>
                                                )}
                                            </>
                                        );
                                    })()}
                                    <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-sm text-deep-indigo opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Volume2 size={24} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <ArrowRight className="text-slate-300" />
                                    <h3 className="text-3xl font-black text-green-600">{currentSlide.data.examples![0].meaning}</h3>
                                </div>
                            </div>
                        )}

                        {currentSlide.type === 'grammar' && (() => {
                            // Detect adventure/intro slides by emoji prefix in title
                            const isAdventure = /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2700}-\u{27BF}⚔️⚠️⚡🌑🔤🗺️🧩💡]/u.test(currentSlide.data.title);

                            return isAdventure ? (
                                // ─── ADVENTURE / INTRO GRAMMAR CARD ──────────────────────────
                                <div className="w-full text-left">
                                    {/* Dark dramatic header */}
                                    <div className="-mx-8 -mt-8 mb-6 px-8 pt-8 pb-6 rounded-t-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #818cf8 0%, transparent 60%), radial-gradient(circle at 80% 20%, #f472b6 0%, transparent 50%)' }} />
                                        <div className="relative">
                                            <div className="text-4xl mb-3 leading-none">
                                                {currentSlide.data.title.match(/^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2700}-\u{27BF}⚔️⚠️⚡🌑🔤🗺️🧩💡]{1,2})/u)?.[1] ?? '✨'}
                                            </div>
                                            <h3 className="text-xl font-black text-white leading-tight">
                                                {currentSlide.data.title.replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2700}-\u{27BF}⚔️⚠️⚡🌑🔤🗺️🧩💡\s]{1,4}/u, '').trim()}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-base text-slate-600 mb-6 leading-relaxed">
                                        {currentSlide.data.content}
                                    </p>

                                    {/* Structure blocks */}
                                    <div className={cn(
                                        "flex flex-wrap items-center justify-center gap-2 mb-6 w-full",
                                        currentSlide.data.structure.length <= 4 && "sm:flex-nowrap"
                                    )}>
                                        {currentSlide.data.structure.map((part, idx) => {
                                            const isCrowded = currentSlide.data.structure.length > 4;
                                            return (
                                                <React.Fragment key={idx}>
                                                    <div className={cn(
                                                        'rounded-xl text-center min-w-[75px] sm:min-w-[90px]',
                                                        isCrowded ? 'p-2' : 'p-3',
                                                        part.color
                                                    )}>
                                                        <div className={cn("font-black uppercase tracking-wider mb-1 leading-tight", isCrowded ? "text-[10px]" : "text-xs")}>{part.label}</div>
                                                        <div className={cn("font-semibold opacity-80 leading-tight", isCrowded ? "text-[10px]" : "text-xs")}>{part.example}</div>
                                                    </div>
                                                    {idx < currentSlide.data.structure.length - 1 && (
                                                        <ArrowRight className="text-slate-300 self-center shrink-0" size={isCrowded ? 12 : 16} />
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>

                                    {/* Spell (example sentence) */}
                                    <div
                                        className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-700/50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-400 transition-colors group"
                                        onClick={handlePlayAudio}
                                    >
                                        <div>
                                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">🔊 Spell — tap to hear</span>
                                            <p className="text-lg font-black text-white font-jp mb-0.5">
                                                {currentSlide.data.exampleSentence.japanese}
                                            </p>
                                            <p className="text-xs text-indigo-300">{currentSlide.data.exampleSentence.romaji}</p>
                                            <p className="text-xs text-slate-400 italic">{currentSlide.data.exampleSentence.english}</p>
                                        </div>
                                        <Volume2 className="text-indigo-600 group-hover:text-indigo-300 shrink-0 ml-3" size={20} />
                                    </div>
                                </div>
                            ) : (
                                // ─── REGULAR GRAMMAR CARD ──────────────────────────────────
                                <div className="w-full text-left">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                            <BookOpen size={32} />
                                        </div>
                                        <h3 className="text-2xl font-black text-deep-indigo">{currentSlide.data.title}</h3>
                                    </div>

                                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                        {currentSlide.data.content}
                                    </p>

                                    {/* Visual Map */}
                                    <div className={cn(
                                        "flex flex-wrap items-center justify-center w-full mb-8 gap-2",
                                        currentSlide.data.structure.length <= 4 && "sm:flex-nowrap"
                                    )}>
                                        {currentSlide.data.structure.map((part, idx) => {
                                            const isCrowded = currentSlide.data.structure.length > 4;
                                            const isUnlock = part.example.includes('Unlocked!');
                                            return (
                                                <React.Fragment key={idx}>
                                                    <div className={cn(
                                                        'rounded-xl text-center flex-1 min-w-[80px]',
                                                        isCrowded ? 'p-2' : 'p-4',
                                                        part.color
                                                    )}>
                                                        <div className={cn("font-bold uppercase tracking-wider opacity-70 mb-1 leading-tight", isCrowded ? "text-[10px]" : "text-xs")}>{part.label}</div>
                                                        <div className={cn("font-bold leading-tight", isCrowded ? "text-sm sm:text-base" : "text-lg")}>{part.example}</div>
                                                    </div>
                                                    {idx < currentSlide.data.structure.length - 1 && !isUnlock && (
                                                        <ArrowRight className="text-slate-300 shrink-0" size={isCrowded ? 14 : 24} />
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>

                                    {/* Listen Example */}
                                    <div
                                        className="bg-paper-white border-2 border-slate-100 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-sakura-pink transition-colors group"
                                        onClick={handlePlayAudio}
                                    >
                                        <div>
                                            <p className="text-xl font-bold text-deep-indigo font-jp mb-1 group-hover:text-sakura-pink transition-colors">
                                                {currentSlide.data.exampleSentence.japanese}
                                            </p>
                                            <p className="text-sm text-slate-400">{currentSlide.data.exampleSentence.romaji}</p>
                                        </div>
                                        <Volume2 className="text-slate-300 group-hover:text-sakura-pink" />
                                    </div>
                                </div>
                            );
                        })()}

                        {currentSlide.type === 'kanji-logic' && (
                            // --- KANJI LOGIC CARD ---
                            <div className="flex flex-col items-center text-center w-full">
                                <div className="bg-purple-100 p-4 rounded-full text-purple-600 mb-4">
                                    <Wand2 size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-deep-indigo mb-2">{currentSlide.data.title}</h3>
                                <p className="text-md text-slate-600 mb-6 px-4">{currentSlide.data.description}</p>

                                <div className="flex flex-wrap justify-center gap-4 mb-8">
                                    {currentSlide.data.parts.map((p, idx) => (
                                        <div key={idx} className={cn("px-4 py-3 rounded-xl min-w-[120px]", p.color)}>
                                            <div className="text-4xl font-jp font-bold mb-1">{p.kanji}</div>
                                            <div className="text-xs uppercase tracking-wider font-bold opacity-80">{p.meaning}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full flex items-center justify-center gap-4 mb-4">
                                    <div className="font-bold text-slate-400">=</div>
                                    <div className="bg-slate-100 p-4 rounded-2xl min-w-[140px]">
                                        <div className="text-5xl font-jp font-black text-indigo-900 mb-2">{currentSlide.data.kanji}</div>
                                        <div className="text-sm font-bold text-slate-500 uppercase">{currentSlide.data.meaning}</div>
                                    </div>
                                </div>
                                <div
                                    className="bg-paper-white w-full border-2 border-slate-100 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-purple-300 transition-colors group mt-4"
                                    onClick={handlePlayAudio}
                                >
                                    <div className="text-left">
                                        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">Example Spell</span>
                                        <p className="text-xl font-bold text-deep-indigo font-jp mb-1 group-hover:text-purple-600 transition-colors">
                                            {currentSlide.data.example.word}
                                        </p>
                                        <p className="text-sm text-slate-500">{currentSlide.data.example.romaji} - {currentSlide.data.example.meaning}</p>
                                    </div>
                                    <Volume2 className="text-slate-300 group-hover:text-purple-500" />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="absolute -bottom-16 left-0 w-full flex justify-between items-center px-2">
                    <div className="flex gap-1 h-2 max-w-[50%] overflow-hidden">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-full rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-gold' :
                                    idx < currentIndex ? 'w-2 bg-sakura-pink' : 'w-2 bg-slate-200'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {currentIndex > 0 && (
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={handleBack}
                                className="rounded-full px-5 border border-slate-200 text-slate-500 hover:text-deep-indigo"
                            >
                                ← Back
                            </Button>
                        )}
                        <Button onClick={handleNext} size="lg" className="rounded-full px-8 shadow-game-md hover:translate-y-[-2px] active:translate-y-0">
                            {currentIndex === slides.length - 1 ? 'Start Practice' : 'Next'} <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
