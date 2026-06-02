import { create } from 'zustand';
import { type FillBlankProblem } from '../components/games/FillInBlank';
import { getFillBlanks, getProblemPoolForAdventure } from '../data/lessons';
import { useStore } from './useStore';

export interface RPGCard {
    id: string;
    name?: string;
    description?: string;
    prompt?: {
        id: string;
        japanese?: string;
        english?: string;
        romaji?: string;
        literal?: string;
        parts?: string[];
        blanks?: {
            position: number;
            answer: string;
            choices: { id: string; text: string; romaji?: string; meaning?: string }[];
        }[];
        words?: { id: string; text: string; meaning?: string; romaji?: string }[];
        solution?: string[];
    };
    text?: string;
    romaji?: string;
    meaning?: string;
    words?: { id: string; text: string; meaning?: string; romaji?: string }[];
    cost: number;
    value: number;
    type?: 'attack' | 'block' | 'skill';
    isCorrect?: boolean;
    isUpgraded?: boolean;
    upgradeLevel?: number;
    forcedType?: 'strike' | 'block';
}

export interface RPGEnemy {
    id: string;
    name: string;
    hp: number;
    maxHp: number;
    intent: 'attack' | 'defend' | 'buff' | 'debuff';
    intentValue: number;
    image: string;
    description: string;
    turnCount: number;
    isBoss?: boolean;
}

export interface RPGRelic {
    id: string;
    name: string;
    description: string;
    image: string;
}

interface RPGState {
    hp: number;
    maxHp: number;
    energy: number;
    maxEnergy: number;
    currentFloor: number;
    lessonId: string;

    // Combat State
    inCombat: boolean;
    combatStatus: 'idle' | 'playerTurn' | 'enemyTurn' | 'win' | 'lose';
    enemies: RPGEnemy[];
    block: number;
    enemyBlock: number;

    // Hand & Question State
    hand: RPGCard[];
    activeProblem: FillBlankProblem | null;
    problemPool: FillBlankProblem[];
    usedProblemIds: string[];

    // Deck
    deck: RPGCard[];
    upgradeCard: (cardId: string) => void;

    // Actions
    initCombat: (enemies: RPGEnemy[]) => void;
    nextQuestion: () => void;
    playCard: (cardId: string, chosenType: 'strike' | 'block') => 'correct' | 'incorrect' | 'cant_afford' | 'not_found';
    endTurn: () => void;
    enemyTurn: () => void;
    gainHp: (amount: number) => void;
    loseHp: (amount: number) => void;
    refillEnergy: () => void;
    setLessonId: (id: string) => void;
    levelUp: () => void;
}

export const useRPGStore = create<RPGState>((set, get) => ({
    hp: 50,
    maxHp: 50,
    energy: 3,
    maxEnergy: 3,
    currentFloor: 1,
    lessonId: 'adventure-1',

    hand: [],
    deck: [],
    activeProblem: null,
    problemPool: [],
    usedProblemIds: [],

    inCombat: false,
    combatStatus: 'idle',
    enemies: [],
    block: 0,
    enemyBlock: 0,

    setLessonId: (id) => set({ lessonId: id }),

    initCombat: (enemies) => {
        const { lessonId } = get();
        let rawPool;
        const lessonMatch = lessonId.match(/^lesson-(\d+)$/);
        if (lessonMatch) {
            const lessonNum = parseInt(lessonMatch[1], 10);
            rawPool = getFillBlanks(lessonNum);
        } else {
            rawPool = getProblemPoolForAdventure(lessonId);
        }

        const fillBlankPool = rawPool.filter(p => 'blanks' in p) as FillBlankProblem[];
        // Fallback: if pool is empty, use lesson 1
        const safePool = fillBlankPool.length > 0 ? fillBlankPool : getFillBlanks(1).filter(p => 'blanks' in p) as FillBlankProblem[];

        const initialEnemies = enemies.map(e => ({
            ...e,
            hp: e.maxHp,   // Always start enemy at full HP
            turnCount: 0,
            intentValue: e.isBoss
                ? Math.floor(Math.random() * 11) + 10
                : Math.floor(Math.random() * 8) + 5
        }));

        set({
            inCombat: true,
            combatStatus: 'playerTurn',
            enemies: initialEnemies,
            hand: [],
            activeProblem: null,
            energy: get().maxEnergy,
            block: 0,
            enemyBlock: 0,
            problemPool: safePool,
            usedProblemIds: []
        });
        get().nextQuestion();
    },

    nextQuestion: () => {
        const state = get();
        const pool = state.problemPool;
        if (pool.length === 0) return;

        let available = pool.filter(p => !state.usedProblemIds.includes(p.id));
        if (available.length === 0) {
            set({ usedProblemIds: [] });
            available = pool;
        }

        const problem = available[Math.floor(Math.random() * available.length)];
        const blank = problem.blanks[0];

        // Ensure we have 5 choices. We take the correct answer + up to 4 distractors.
        const allChoices = [...blank.choices];
        // If there are less than 5 choices, we could pull random distractors from other problems
        while (allChoices.length < 5) {
            const randomProblem = pool[Math.floor(Math.random() * pool.length)];
            const randomBlank = randomProblem.blanks[0];
            const randomChoice = randomBlank.choices[Math.floor(Math.random() * randomBlank.choices.length)];
            if (!allChoices.find(c => c.text === randomChoice.text)) {
                allChoices.push(randomChoice);
            }
        }

        // Pick Exactly 5 (1 correct, 4 distractors)
        const correctChoice = allChoices.find(c => c.text === blank.answer);
        const distractors = allChoices.filter(c => c.text !== blank.answer).sort(() => Math.random() - 0.5).slice(0, 4);

        const selectedChoices = [correctChoice!, ...distractors].sort(() => Math.random() - 0.5);

        const { upgradedCards } = useStore.getState();

        const newHand: RPGCard[] = selectedChoices.map(choice => {
            // "remembers which cards they upgraded... and if it was upgraded, it is still upgraded when it appears"
            // The unique identifier for a card we can store is its text since that represents the vocabulary word.
            const upgradeData = upgradedCards[choice.text];
            const isUpgraded = !!upgradeData;

            return {
                id: choice.id + '-' + Math.random().toString(36).substr(2, 5),
                text: choice.text,
                romaji: choice.romaji,
                meaning: choice.meaning,
                isCorrect: choice.text === blank.answer,
                isUpgraded,
                cost: isUpgraded ? 2 : 1, // Base cards cost 1 energy, upgraded cost 2
                value: isUpgraded ? Math.floor(Math.random() * 6) + 15 : Math.floor(Math.random() * 6) + 5, // Normal 5-10, Upgraded 15-20
                forcedType: upgradeData // 'strike' or 'block'
            };
        });

        set({
            activeProblem: problem,
            hand: newHand,
            usedProblemIds: [...state.usedProblemIds, problem.id]
        });
    },

    playCard: (cardId, chosenType) => {
        const state = get();
        if (state.combatStatus === 'win' || state.combatStatus === 'lose') return 'not_found';
        const card = state.hand.find(c => c.id === cardId);
        if (!card) return 'not_found';
        if (state.energy < card.cost) return 'cant_afford';

        set({ energy: state.energy - card.cost });

        if (card.isCorrect) {
            const type = card.forcedType || chosenType;
            if (type === 'strike') {
                const newEnemies = state.enemies.map((e, idx) => {
                    if (idx !== 0 || e.hp <= 0) return e;
                    const damage = Math.max(0, card.value - state.enemyBlock);
                    return { ...e, hp: Math.max(0, e.hp - damage) };
                });
                const allDead = newEnemies.every(e => e.hp <= 0);
                set({
                    enemies: newEnemies,
                    enemyBlock: allDead ? 0 : state.enemyBlock,
                    combatStatus: allDead ? 'win' : state.combatStatus
                });
                if (allDead) return 'correct';
            } else if (type === 'block') {
                set({ block: state.block + card.value });
            }
            // Next question only if still alive and have energy
            const afterEnergy = state.energy - card.cost;
            if (afterEnergy > 0) {
                get().nextQuestion();
            } else {
                set({ hand: [] });
            }
            return 'correct';
        } else {
            set({ hand: state.hand.filter(c => c.id !== cardId) });
            return 'incorrect';
        }
    },

    endTurn: () => {
        set({ combatStatus: 'enemyTurn' });
        setTimeout(() => get().enemyTurn(), 1000);
    },

    enemyTurn: () => {
        const state = get();
        const { enemies, hp, block } = state;

        // Guard: only proceed if we're actually in the enemyTurn phase
        if (state.combatStatus !== 'enemyTurn') return;

        // If ALL enemies are already dead (shouldn't reach here, but guard)
        if (enemies.length === 0 || enemies.every(e => e.hp <= 0)) {
            set({ combatStatus: 'win' });
            return;
        }

        let currentHp = hp;
        let currentBlock = block;

        const newEnemies = enemies.map(enemy => {
            if (enemy.hp <= 0) return enemy;

            if (enemy.intent === 'attack') {
                const damage = Math.max(0, enemy.intentValue - currentBlock);
                currentBlock = Math.max(0, currentBlock - enemy.intentValue);
                currentHp = Math.max(0, currentHp - damage);
            }

            const nextTurnCount = enemy.turnCount + 1;
            const cyclePos = nextTurnCount % 3;
            const nextIntent = (cyclePos === 2 ? 'defend' : 'attack') as 'attack' | 'defend';
            const nextValue = enemy.isBoss
                ? Math.floor(Math.random() * 11) + 10
                : Math.floor(Math.random() * 8) + 5;

            return {
                ...enemy,
                turnCount: nextTurnCount,
                intent: nextIntent,
                intentValue: nextValue
            };
        });

        const newStatus = currentHp <= 0 ? 'lose' : 'playerTurn';
        set({
            hp: currentHp,
            enemies: newEnemies,
            combatStatus: newStatus,
            energy: get().maxEnergy,
            block: 0,
        });

        if (currentHp > 0) get().nextQuestion();
    },

    upgradeCard: (cardId) => set((state) => ({
        deck: state.deck.map(c => c.id === cardId
            ? { ...c, upgradeLevel: (c.upgradeLevel ?? 0) + 1, isUpgraded: true }
            : c)
    })),
    gainHp: (amount) => set((state) => ({ hp: Math.min(state.maxHp, state.hp + amount) })),
    loseHp: (amount) => set((state) => ({ hp: Math.max(0, state.hp - amount) })),
    levelUp: () => set((state) => {
        const newMax = state.maxHp + 5;
        return {
            maxHp: newMax,
            hp: newMax
        };
    }),
    refillEnergy: () => set((state) => ({ energy: state.maxEnergy })),
}));
