import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Kana } from '../../data/kana';
import { useAudio } from '../../hooks/useAudio';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { Check, Lightbulb } from 'lucide-react';

interface Card {
    id: string;
    content: string;
    type: 'char' | 'romaji';
    kanaRef: Kana;
    isFlipped: boolean;
    isMatched: boolean;
}

interface CharacterMatchProps {
    items: Kana[];
    onComplete: () => void;
    onProgress?: (matched: number, total: number) => void;
}



export const CharacterMatch: React.FC<CharacterMatchProps> = ({ items, onComplete, onProgress }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [isLocked, setIsLocked] = useState(false);
    const [hintUsed, setHintUsed] = useState(false);
    const [hintCost, setHintCost] = useState(100);
    const { play, playClick, playSuccess } = useAudio();
    const { xp, spendXp, incrementCombo, resetCombo, incrementMastery } = useStore();

    const matchedCount = React.useMemo(() => cards.filter(c => c.isMatched).length / 2, [cards]);

    useEffect(() => {
        if (onProgress) onProgress(matchedCount, items.length);
    }, [matchedCount, items.length, onProgress]);

    useEffect(() => {
        const gameCards: Card[] = [];
        items.forEach((item) => {
            gameCards.push({
                id: `${item.char}-char`,
                content: item.char,
                type: 'char',
                kanaRef: item,
                isFlipped: false,
                isMatched: false,
            });
            gameCards.push({
                id: `${item.char}-romaji`,
                content: item.romaji,
                type: 'romaji',
                kanaRef: item,
                isFlipped: false,
                isMatched: false,
            });
        });
        setCards(gameCards.sort(() => Math.random() - 0.5));
    }, [items]);

    const handleCardClick = (clickedCard: Card) => {
        if (isLocked || clickedCard.isFlipped || clickedCard.isMatched) return;

        if (clickedCard.type === 'char') {
            play(clickedCard.content);
        }

        const newCards = cards.map(c =>
            c.id === clickedCard.id ? { ...c, isFlipped: true } : c
        );
        setCards(newCards);

        const newSelected = [...selectedCards, clickedCard];
        setSelectedCards(newSelected);

        if (newSelected.length === 2) {
            checkForMatch(newSelected, newCards);
        }
    };

    const checkForMatch = (selection: Card[], currentCards: Card[]) => {
        setIsLocked(true);
        const [first, second] = selection;
        const isMatch = first.kanaRef.char === second.kanaRef.char && first.id !== second.id;

        setTimeout(() => {
            setCards(prev => prev.map(c => {
                if (c.id === first.id || c.id === second.id) {
                    return isMatch
                        ? { ...c, isMatched: true, isFlipped: true }
                        : { ...c, isFlipped: false };
                }
                return c;
            }));

            setSelectedCards([]);

            if (isMatch) {
                incrementCombo();
                incrementMastery(first.kanaRef.char);
                playClick();
                setIsLocked(false);
            } else {
                resetCombo();
                setIsLocked(false);
            }

            const allMatched = currentCards.every(c =>
                (c.id === first.id || c.id === second.id) ? isMatch : c.isMatched
            );

            if (isMatch && allMatched) {
                playSuccess();
                setTimeout(onComplete, 1000);
            }
        }, 1000);
    };

    const handleHint = () => {
        if (hintUsed || isLocked || xp < hintCost) return;

        const unmatched = cards.filter(c => !c.isMatched);
        if (unmatched.length === 0) return;
        const first = unmatched[0];
        const partner = unmatched.find(c => c.kanaRef.char === first.kanaRef.char && c.id !== first.id);
        if (!partner) return;

        if (!spendXp(hintCost)) return;

        // Clear any currently selected cards to prevent state bugs
        setSelectedCards([]);

        playClick();
        setHintUsed(true);
        setHintCost(prev => prev + 50);
        setIsLocked(true);

        // Flip hint pair briefly, and ensure any previously flipped unmatched cards are unflipped
        setCards(prev => prev.map(c =>
            c.id === first.id || c.id === partner.id
                ? { ...c, isFlipped: true }
                : { ...c, isFlipped: c.isMatched ? c.isFlipped : false }
        ));

        setTimeout(() => {
            setCards(prev => prev.map(c =>
                c.id === first.id || c.id === partner.id ? { ...c, isFlipped: false } : c
            ));
            setIsLocked(false);
            setHintUsed(false);
        }, 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-6 rounded-3xl border-2 border-slate-200 shadow-xl">
            <h2 className="text-3xl font-black text-center mb-8 text-deep-indigo tracking-tight">
                Match the Characters
            </h2>
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
                <AnimatePresence>
                    {cards.map((card) => (
                        <motion.button
                            key={card.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={!card.isFlipped && !card.isMatched ? { y: -4 } : {}}
                            whileTap={!card.isFlipped && !card.isMatched ? { y: 2 } : {}}
                            onClick={() => handleCardClick(card)}
                            className={cn(
                                "aspect-square rounded-2xl flex items-center justify-center text-3xl font-bold transition-all relative overflow-hidden",
                                "border-b-[6px]", // 3D effect thickness
                                card.isMatched
                                    ? "bg-transparent border-transparent shadow-none"
                                    : card.isFlipped
                                        ? "bg-white border-slate-200 text-deep-indigo shadow-sm"
                                        : "bg-indigo-50 border-indigo-200 text-transparent hover:border-indigo-300"
                            )}
                        >
                            {/* Card Back Pattern */}
                            {!card.isFlipped && !card.isMatched && (
                                <div className="absolute inset-0 bg-sakura-pink opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                            )}

                            {/* Card Content */}
                            {(card.isFlipped || card.isMatched) && (
                                <span className={cn(
                                    card.isMatched ? "text-slate-300" : "text-deep-indigo",
                                    card.type === 'char' && "font-jp"
                                )}>
                                    {card.isMatched ? <Check className="w-10 h-10 text-success" /> : card.content}
                                </span>
                            )}

                            {/* Question Mark for back */}
                            {!card.isFlipped && !card.isMatched && (
                                <span className="text-indigo-200 text-4xl">?</span>
                            )}
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            {/* Hint button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleHint}
                    disabled={hintUsed || isLocked || xp < hintCost}
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm border-2 transition-all',
                        hintUsed ? 'bg-yellow-50 border-yellow-300 text-yellow-600 cursor-default'
                            : xp >= hintCost ? 'bg-white border-blue-200 text-blue-500 hover:bg-blue-50 hover:border-blue-400'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    )}
                >
                    <Lightbulb className="w-4 h-4" />
                    {hintUsed ? '💡 Hint active!' : `Use Hint  −${hintCost} ⭐  (You have ${xp})`}
                </button>
            </div>
        </div>
    );
};
