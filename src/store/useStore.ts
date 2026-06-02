import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getLesson, WORLDS, allLessons } from '../data/lessons';
import { hiragana, katakana } from '../data/kana';

export interface UserState {
    xp: number;
    level: number;
    streak: number;
    completedLessons: string[];
    currentLessonId: string;

    // JSpellbook State
    learnedKana: { char: string; romaji: string; type?: 'hiragana' | 'katakana'; }[];
    learnedWords: { word: string; romaji: string; meaning: string; }[];
    learnedSentences: { japanese: string; romaji: string; english: string; }[];
    masteryRates: Record<string, number>;

    // RPG Progression
    gold: number;
    upgradedCards: Record<string, 'strike' | 'block'>;

    // New Features
    hearts: number;
    maxHearts: number;
    currentWorld: string;
    unlockedWorlds: string[];
    lastLoginDate: string | null;

    // Session State
    combo: number; // Current session streak of correct answers

    addXp: (amount: number) => void;
    spendXp: (amount: number) => boolean;
    completeLesson: (lessonId: string) => void;
    loseHeart: () => void;
    replenishHearts: () => void;
    resetWorldProgress: (worldId: string) => void;
    advanceWorld: () => void;
    checkStreak: () => void;
    incrementCombo: () => void;
    resetCombo: () => void;
    addGold: (amount: number) => void;
    spendGold: (amount: number) => boolean;
    upgradeCard: (cardId: string, type: 'strike' | 'block') => void;
    buyHearts: (costType: 'xp' | 'iap') => boolean;
    restoreLives: () => void;
    repairProgress: (validIds: string[]) => void;
    incrementMastery: (itemId: string) => void;
}

export const useStore = create<UserState>()(
    persist(
        (set, get) => ({
            xp: 0,
            level: 1,
            streak: 0,
            combo: 0,
            completedLessons: [],
            currentLessonId: 'lesson-1',

            learnedKana: [],
            learnedWords: [],
            learnedSentences: [],
            masteryRates: {},
            gold: 0,
            upgradedCards: {},

            hearts: 3,
            maxHearts: 3,
            currentWorld: 'world-1',
            unlockedWorlds: ['world-1'],
            lastLoginDate: null,

            addXp: (amount) => set((state) => {
                const newXp = state.xp + amount;
                const newLevel = Math.floor(newXp / 1000) + 1;
                return { xp: newXp, level: newLevel };
            }),

            spendXp: (amount) => {
                const current = get().xp;
                if (current < amount) return false;
                set((state) => ({ xp: state.xp - amount }));
                return true;
            },

            completeLesson: (lessonId) => set((state) => {
                const isNewCompletion = !state.completedLessons.includes(lessonId);
                const completed = isNewCompletion
                    ? [...state.completedLessons, lessonId]
                    : state.completedLessons;

                let newKana = [...state.learnedKana];
                let newWords = [...state.learnedWords];
                let newSentences = [...state.learnedSentences];

                const isRedundant = (word: string) => {
                    return hiragana.some(k => k.char === word) || katakana.some(k => k.char === word);
                };

                if (isNewCompletion) {
                    try {
                        // Extract items dynamically from the lesson
                        const lesson = getLesson(lessonId);

                        if (lesson && Array.isArray(lesson.content)) {
                            lesson.content.forEach((item: any) => {
                                if ('char' in item) {
                                    if (!newKana.find(k => k.char === item.char)) newKana.push({ char: item.char, romaji: item.romaji, type: item.type || 'hiragana' });
                                } else if (item.type === 'grammar' && item.exampleSentence) {
                                    if (!newSentences.find(s => s.japanese === item.exampleSentence?.japanese)) {
                                        newSentences.push({
                                            japanese: item.exampleSentence.japanese,
                                            romaji: item.exampleSentence.romaji || '',
                                            english: item.exampleSentence.english
                                        });
                                    }
                                } else if (item.type === 'kanji-logic' && item.example) {
                                    if (!newWords.find(w => w.word === item.example.word) && !isRedundant(item.example.word)) {
                                        newWords.push({ word: item.example.word, romaji: item.example.romaji, meaning: item.example.meaning });
                                    }
                                }
                            });

                            // explicitly unlock 'は' upon completing lesson 1 since it's taught in the grammar slide
                            if (lessonId === 'lesson-1') {
                                if (!newKana.find(k => k.char === 'は')) {
                                    newKana.push({ char: 'は', romaji: 'ha/wa', type: 'hiragana' });
                                }
                            }
                        }

                        if (lesson && lesson.fillBlanks) {
                            lesson.fillBlanks.forEach((prob: any) => {
                                if (prob.japanese && !newSentences.find(s => s.japanese === prob.japanese)) {
                                    newSentences.push({ japanese: prob.japanese, romaji: prob.romaji || '', english: prob.english });
                                }
                                prob.blanks?.forEach((b: any) => {
                                    b.choices?.forEach((c: any) => {
                                        if (c.meaning && !newWords.find(w => w.word === c.text) && !isRedundant(c.text)) {
                                            newWords.push({ word: c.text, romaji: c.romaji || '', meaning: c.meaning });
                                        }
                                    });
                                });
                            });
                        }

                        if (lesson && lesson.sentences) {
                            lesson.sentences.forEach((prob: any) => {
                                if (prob.japanese && !newSentences.find(s => s.japanese === prob.japanese)) {
                                    newSentences.push({ japanese: prob.japanese, romaji: prob.romaji || '', english: prob.english });
                                }
                                prob.words?.forEach((w: any) => {
                                    if (w.meaning && !newWords.find(x => x.word === w.text) && !isRedundant(w.text)) {
                                        newWords.push({ word: w.text, romaji: w.romaji || '', meaning: w.meaning });
                                    }
                                });
                            });
                        }
                        if (lesson && !Array.isArray(lesson.content) && (lesson.content as any).exchanges) {
                            const scenario = lesson.content as any;
                            scenario.exchanges.forEach((exchange: any) => {
                                if (exchange.npcQuery && !newSentences.find(s => s.japanese === exchange.npcQuery.text)) {
                                    newSentences.push({
                                        japanese: exchange.npcQuery.text,
                                        romaji: exchange.npcQuery.romaji || '',
                                        english: exchange.npcQuery.english
                                    });
                                }
                                exchange.options?.forEach((opt: any) => {
                                    if (opt.meaning && !newWords.find(w => w.word === opt.text) && !isRedundant(opt.text)) {
                                        newWords.push({ word: opt.text, romaji: opt.romaji || '', meaning: opt.meaning });
                                    } else if (!newSentences.find(s => s.japanese === opt.text)) {
                                        // If it doesn't have a meaning, it's likely a sentence choice
                                        newSentences.push({
                                            japanese: opt.text,
                                            romaji: opt.romaji || '',
                                            english: opt.english || ''
                                        });
                                    }
                                });
                            });
                        }
                    } catch (err) {
                        console.error("Failed to extract lesson data for Spellbook", err);
                    }
                }

                // Naive auto-advance: next lesson ID
                // In a real app we'd check world bounds
                const nextIdNum = parseInt(lessonId.split('-')[1]) + 1;
                return {
                    completedLessons: completed,
                    currentLessonId: `lesson-${nextIdNum}`,
                    learnedKana: newKana,
                    learnedWords: newWords,
                    learnedSentences: newSentences
                };
            }),

            loseHeart: () => set((state) => {
                const newHearts = Math.max(0, state.hearts - 1);
                return { hearts: newHearts };
            }),

            replenishHearts: () => set((state) => ({ hearts: state.maxHearts })),

            incrementCombo: () => set((state) => {
                const newCombo = state.combo + 1;
                // Every 10 correct answers -> +100 XP
                if (newCombo > 0 && newCombo % 10 === 0) {
                    const newXp = state.xp + 100;
                    return { combo: newCombo, xp: newXp };
                }
                return { combo: newCombo };
            }),

            resetCombo: () => set(() => ({ combo: 0 })),

            addGold: (amount) => set((state) => ({ gold: state.gold + amount })),

            spendGold: (amount) => {
                const current = get().gold;
                if (current < amount) return false;
                set((state) => ({ gold: state.gold - amount }));
                return true;
            },

            upgradeCard: (cardId, type) => set((state) => ({
                upgradedCards: {
                    ...state.upgradedCards,
                    [cardId]: type
                }
            })),

            buyHearts: (type) => {
                if (type === 'xp') {
                    const { xp, maxHearts } = get();
                    if (xp >= 5000) {
                        set({ xp: xp - 5000, hearts: maxHearts });
                        return true;
                    }
                    return false;
                }
                // Mock IAP - always succeeds
                set((state) => ({ hearts: state.maxHearts }));
                return true;
            },

            // Alias for restoreLives
            restoreLives: () => set((state) => ({ hearts: state.maxHearts })),

            resetWorldProgress: (worldId) => set(() => {
                const worldLessons = allLessons.filter(l => l.worldId === worldId);
                const startingLessonId = worldLessons.length > 0 ? worldLessons[0].id : 'lesson-1';
                return {
                    xp: 0,
                    level: 1,
                    streak: 0,
                    combo: 0,
                    hearts: 3,
                    completedLessons: [],
                    currentLessonId: startingLessonId,
                    currentWorld: worldId,
                    unlockedWorlds: [worldId],
                    learnedKana: [],
                    learnedWords: [],
                    learnedSentences: [],
                    masteryRates: {},
                };
            }),

            advanceWorld: () => set((state) => {
                const currentIndex = WORLDS.findIndex(w => w.id === state.currentWorld);
                if (currentIndex >= 0 && currentIndex < WORLDS.length - 1) {
                    const nextWorld = WORLDS[currentIndex + 1].id as UserState['currentWorld'];
                    const newUnlocked = state.unlockedWorlds.includes(nextWorld)
                        ? state.unlockedWorlds
                        : [...state.unlockedWorlds, nextWorld];
                    return {
                        currentWorld: nextWorld,
                        unlockedWorlds: newUnlocked,
                        hearts: state.maxHearts
                    };
                }
                return { hearts: state.maxHearts };
            }),

            checkStreak: () => {
                const today = new Date().toDateString();
                const lastLogin = get().lastLoginDate;

                if (lastLogin !== today) {
                    set((state) => ({
                        streak: state.streak + 1,
                        lastLoginDate: today
                    }));
                }
            },

            repairProgress: (validIds) => set((state) => {
                let currentId = state.currentLessonId;
                if (!validIds.includes(currentId)) {
                    const firstUncompleted = validIds.find(id => !state.completedLessons.includes(id));
                    currentId = firstUncompleted || validIds[0] || 'lesson-1';
                }

                const hearts = typeof state.hearts === 'number' ? state.hearts : 3;
                const maxHearts = typeof state.maxHearts === 'number' ? state.maxHearts : 3;

                // Validate that the persisted world actually exists in the current curriculum
                const isValidWorld = WORLDS.some(w => w.id === state.currentWorld);
                const newWorldId = isValidWorld ? state.currentWorld : 'world-1';
                const newUnlocked = isValidWorld ? state.unlockedWorlds : ['world-1'];

                // Reconstruct learned arrays based purely on valid completed lessons
                let newKana: any[] = [];
                let newWords: any[] = [];
                let newSentences: any[] = [];

                const isRedundant = (word: string) => {
                    return hiragana.some(k => k.char === word) || katakana.some(k => k.char === word);
                };

                const validCompleted = state.completedLessons.filter(id => validIds.includes(id));

                validCompleted.forEach(lessonId => {
                    const lesson = getLesson(lessonId);
                    if (!lesson) return;

                    if (Array.isArray(lesson.content)) {
                        lesson.content.forEach((item: any) => {
                            if ('char' in item) {
                                if (!newKana.find(k => k.char === item.char)) newKana.push({ char: item.char, romaji: item.romaji, type: item.type || 'hiragana' });
                            } else if (item.type === 'grammar' && item.exampleSentence) {
                                if (!newSentences.find(s => s.japanese === item.exampleSentence.japanese)) {
                                    newSentences.push({ japanese: item.exampleSentence.japanese, romaji: item.exampleSentence.romaji, english: item.exampleSentence.english });
                                }
                            } else if (item.type === 'kanji-logic' && item.example) {
                                if (!newWords.find(w => w.word === item.example.word) && !isRedundant(item.example.word)) {
                                    newWords.push({ word: item.example.word, romaji: item.example.romaji, meaning: item.example.meaning });
                                }
                            }
                        });
                    }

                    if (lesson.fillBlanks) {
                        lesson.fillBlanks.forEach((prob: any) => {
                            if (prob.japanese && !newSentences.find(s => s.japanese === prob.japanese)) {
                                newSentences.push({ japanese: prob.japanese, romaji: prob.romaji || '', english: prob.english });
                            }
                            prob.blanks?.forEach((b: any) => {
                                b.choices?.forEach((c: any) => {
                                    if (c.meaning && !newWords.find(w => w.word === c.text) && !isRedundant(c.text)) {
                                        newWords.push({ word: c.text, romaji: c.romaji || '', meaning: c.meaning });
                                    }
                                });
                            });
                        });
                    }

                    if (lesson.sentences) {
                        lesson.sentences.forEach((prob: any) => {
                            if (prob.japanese && !newSentences.find(s => s.japanese === prob.japanese)) {
                                newSentences.push({ japanese: prob.japanese, romaji: prob.romaji || '', english: prob.english });
                            }
                            prob.words?.forEach((w: any) => {
                                if (w.meaning && !newWords.find(x => x.word === w.text) && !isRedundant(w.text)) {
                                    newWords.push({ word: w.text, romaji: w.romaji || '', meaning: w.meaning });
                                }
                            });
                        });
                    }

                    if (!Array.isArray(lesson.content) && (lesson.content as any).exchanges) {
                        const scenario = lesson.content as any;
                        scenario.exchanges.forEach((exchange: any) => {
                            if (exchange.npcQuery && !newSentences.find(s => s.japanese === exchange.npcQuery.text)) {
                                newSentences.push({
                                    japanese: exchange.npcQuery.text,
                                    romaji: exchange.npcQuery.romaji || '',
                                    english: exchange.npcQuery.english
                                });
                            }
                            exchange.options?.forEach((opt: any) => {
                                if (opt.meaning && !newWords.find(w => w.word === opt.text) && !isRedundant(opt.text)) {
                                    newWords.push({ word: opt.text, romaji: opt.romaji || '', meaning: opt.meaning });
                                } else if (!newSentences.find(s => s.japanese === opt.text)) {
                                    newSentences.push({
                                        japanese: opt.text,
                                        romaji: opt.romaji || '',
                                        english: opt.english || ''
                                    });
                                }
                            });
                        });
                    }
                });

                return {
                    currentLessonId: currentId,
                    hearts: Math.min(hearts, maxHearts),
                    maxHearts: maxHearts,
                    currentWorld: newWorldId,
                    unlockedWorlds: newUnlocked,
                    completedLessons: validCompleted,
                    learnedKana: newKana,
                    learnedWords: newWords,
                    learnedSentences: newSentences
                };
            }),

            incrementMastery: (itemId) => set((state) => ({
                masteryRates: {
                    ...state.masteryRates,
                    [itemId]: (state.masteryRates[itemId] || 0) + 1
                }
            }))
        }),
        {
            name: 'jquest-tutor-storage',
        }
    )
);
