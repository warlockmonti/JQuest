import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Swords, Coins, Map as MapIcon, Skull,
    Star, ChevronRight, ShoppingBag, Heart, Coffee
} from 'lucide-react';
import { useRPGStore, type RPGEnemy } from '../store/useRPGStore';
import { yokaiEnemies } from '../data/rpgData';
import { RPGCombat } from '../components/games/RPGCombat';
import { RestSite } from '../components/games/RestSite';
import { Merchant } from '../components/games/Merchant';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';

type NodeType = 'combat' | 'rest' | 'shop' | 'boss';
type GameState = 'start' | 'map' | 'encounter-flash' | 'combat' | 'transition' | 'rest' | 'shop' | 'win' | 'lose' | 'gameover';

interface MapNode {
    id: string;
    type: NodeType;
    floor: number;
    connections: string[];
}

// ── Encounter Flash Screen ─────────────────────────────────────────────────────
const EncounterFlash: React.FC<{
    isBoss: boolean;
    enemyName: string;
    enemyImage: string;
    onDone: () => void;
}> = ({ isBoss, enemyName, enemyImage, onDone }) => {
    useEffect(() => {
        const timer = setTimeout(onDone, 1800);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
            {/* Scan-line overlay */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.12)_2px,rgba(0,0,0,0.12)_4px)] pointer-events-none" />

            {/* Horizontal sweep line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={cn('w-screen h-[3px] absolute top-1/2 -translate-y-1/2', isBoss ? 'bg-rose-500' : 'bg-purple-500')}
                style={{ originX: 0.5 }}
            />

            {/* Enemy sprite reveal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.25, type: 'spring', damping: 12 }}
                className="relative"
            >
                {/* Glow halo */}
                <div className={cn(
                    'absolute inset-0 rounded-full blur-3xl opacity-50',
                    isBoss ? 'bg-rose-500' : 'bg-purple-500'
                )} />
                <motion.img
                    src={enemyImage}
                    alt={enemyName}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="relative w-52 h-52 object-contain retro-sprite drop-shadow-2xl"
                />
            </motion.div>

            {/* Text block */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring', damping: 14 }}
                className="text-center px-8 mt-6"
            >
                <motion.p
                    initial={{ letterSpacing: '0.8em', opacity: 0 }}
                    animate={{ letterSpacing: '0.25em', opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className={cn('text-xs font-black uppercase tracking-[0.3em] mb-3', isBoss ? 'text-rose-400' : 'text-purple-400')}
                >
                    {isBoss ? '⚠️  Boss Encounter' : '👾  Yokai Appears!'}
                </motion.p>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, type: 'spring', damping: 12 }}
                    className={cn('text-5xl md:text-6xl font-black tracking-tighter uppercase', isBoss ? 'text-rose-400' : 'text-white')}
                >
                    {enemyName}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-slate-400 font-bold text-sm mt-3 uppercase tracking-widest"
                >
                    Prepare for battle...
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

// ── Victory Transition Screen ──────────────────────────────────────────────────
const TransitionScreen: React.FC<{
    floorJustCompleted: number;
    goldEarned: number;
    isBossFloor: boolean;
    onDone: () => void;
}> = ({ floorJustCompleted, goldEarned, isBossFloor, onDone }) => {
    const [prog, setProg] = useState(0);
    const called = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProg(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    if (!called.current) { called.current = true; setTimeout(onDone, 200); }
                    return 100;
                }
                return p + 4;
            });
        }, 80);
        return () => clearInterval(interval);
    }, [onDone]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] flex items-center justify-center bg-slate-950 p-8"
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 16, delay: 0.1 }}
                className="w-full max-w-sm bg-slate-900 border-2 border-slate-700 rounded-[2.5rem] p-8 text-center shadow-2xl"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12, delay: 0.25 }}
                    className={cn(
                        'w-20 h-20 rounded-[1.5rem] mx-auto mb-6 flex items-center justify-center text-4xl shadow-xl',
                        isBossFloor ? 'bg-gradient-to-br from-yellow-500 to-amber-600' : 'bg-gradient-to-br from-purple-600 to-indigo-700'
                    )}
                >
                    {isBossFloor ? '🏆' : '⚔️'}
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-3xl font-black text-white tracking-tighter mb-1"
                >
                    {isBossFloor ? 'Boss Defeated!' : `Floor ${floorJustCompleted} Clear!`}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-8"
                >
                    {isBossFloor ? 'Victory awaits...' : 'Advancing...'}
                </motion.p>

                {/* Rewards */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3 mb-8"
                >
                    <div className="flex justify-between items-center bg-slate-800 rounded-2xl p-4 border border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="bg-amber-500/20 p-2 rounded-lg"><Coins className="w-5 h-5 text-amber-400" /></div>
                            <span className="text-white font-black">Gold</span>
                        </div>
                        <span className="text-amber-400 font-black text-lg">+{goldEarned}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800 rounded-2xl p-4 border border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-500/20 p-2 rounded-lg"><Star className="w-5 h-5 text-indigo-400" /></div>
                            <span className="text-white font-black">XP</span>
                        </div>
                        <span className="text-indigo-400 font-black text-lg">+50</span>
                    </div>
                </motion.div>

                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className={cn('h-full rounded-full transition-all', isBossFloor ? 'bg-yellow-400' : 'bg-purple-500')}
                        style={{ width: `${prog}%` }}
                    />
                </div>
                <p className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-widest">
                    {isBossFloor ? 'Loading final victory...' : 'Loading next encounter...'}
                </p>
                <button
                    onClick={() => { if (!called.current) { called.current = true; onDone(); } }}
                    className="mt-6 flex items-center gap-2 text-slate-500 hover:text-white font-bold text-sm mx-auto transition-colors"
                >
                    Continue <ChevronRight className="w-4 h-4" />
                </button>
            </motion.div>
        </motion.div>
    );
};

// ── Map Node Icon helper ────────────────────────────────────────────────────────
const NodeIcon: React.FC<{ type: NodeType }> = ({ type }) => {
    if (type === 'boss') return <Skull className="w-11 h-11 text-rose-300" />;
    if (type === 'shop') return <ShoppingBag className="w-10 h-10 text-yellow-300" />;
    if (type === 'rest') return <Coffee className="w-10 h-10 text-green-300" />;
    return <Swords className="w-10 h-10" />;
};

const NODE_LABELS: Record<NodeType, string> = {
    combat: 'Battle',
    shop: 'Shop',
    rest: 'Rest',
    boss: 'Boss',
};

const NODE_COLORS: Record<NodeType, { active: string; border: string }> = {
    combat: { active: 'bg-purple-600', border: 'border-purple-900' },
    shop: { active: 'bg-yellow-600', border: 'border-yellow-900' },
    rest: { active: 'bg-emerald-700', border: 'border-emerald-950' },
    boss: { active: 'bg-rose-700', border: 'border-rose-950' },
};

// ── Main RPGPage ───────────────────────────────────────────────────────────────
export const RPGPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const lessonId = (location.state as any)?.lessonId || 'adventure-1';

    const { hp, maxHp, currentFloor, initCombat, setLessonId, inCombat } = useRPGStore();
    const { loseHeart, hearts, maxHearts, completeLesson, advanceWorld, gold } = useStore();

    const [gameState, setGameState] = useState<GameState>('start');
    const [gameMap, setGameMap] = useState<MapNode[]>([]);

    // ▼ KEY FIX: store the fully-resolved enemy once so flash + combat use the same one
    const [selectedEnemy, setSelectedEnemy] = useState<RPGEnemy | null>(null);
    const [pendingNodeType, setPendingNodeType] = useState<NodeType>('combat');
    const [transitionMeta, setTransitionMeta] = useState({ goldEarned: 0, isBossFloor: false });
    const heartDeducted = useRef(false);

    // Map: shop → boss  (2 nodes)
    const generateMap = () => {
        const sequence: NodeType[] = ['shop', 'boss'];
        const nodes: MapNode[] = sequence.map((type, i) => ({
            id: `node-${i + 1}`,
            type,
            floor: i + 1,
            connections: i < sequence.length - 1 ? [`node-${i + 2}`] : [],
        }));
        setGameMap(nodes);
    };

    const startRun = () => {
        setLessonId(lessonId);
        heartDeducted.current = false;
        useRPGStore.setState({
            hp: 50, maxHp: 50, energy: 3, maxEnergy: 3,
            currentFloor: 1, inCombat: false,
        });
        generateMap();
        setGameState('map');
    };

    // Check if we're coming from a lesson-triggered combat
    useEffect(() => {
        if (inCombat) {
            setGameState('combat');
        }
    }, [inCombat]);

    // ── Pick enemy once, show flash, then enter combat with same enemy
    const handleNodeVisit = (node: MapNode) => {
        if (node.floor !== currentFloor) return;

        if (node.type === 'combat' || node.type === 'boss') {
            // Bosses: HP > 60. Regular yokai: HP <= 60
            const bossPool = yokaiEnemies.filter(e => (e.maxHp > 60) || e.isBoss);
            const regularPool = yokaiEnemies.filter(e => (e.maxHp <= 60) && !e.isBoss);
            const pool = node.type === 'boss'
                ? (bossPool.length > 0 ? bossPool : yokaiEnemies)
                : (regularPool.length > 0 ? regularPool : yokaiEnemies);
            const enemy = pool[Math.floor(Math.random() * pool.length)];
            // Force isBoss flag on boss node enemies
            const resolvedEnemy = node.type === 'boss' ? { ...enemy, isBoss: true } : { ...enemy, isBoss: false };

            if (resolvedEnemy) {
                setSelectedEnemy(resolvedEnemy);
                setPendingNodeType(node.type);
                setGameState('encounter-flash');
            }
        } else if (node.type === 'shop') {
            setGameState('shop');
        } else if (node.type === 'rest') {
            setGameState('rest');
        }
    };

    // ── Flash done → start combat with the SAME enemy that was shown
    const handleEncounterFlashDone = useCallback(() => {
        if (!selectedEnemy) return;
        // HP is NOT reset here — it persists throughout the run
        initCombat([{ ...selectedEnemy, id: `e-${Date.now()}` }]);
        setGameState('combat');
    }, [selectedEnemy, initCombat]);

    // ── Combat / rest won
    const handleEncounterComplete = () => {
        if (gameMap.length === 0) {
            // It's a lesson combat encounter
            completeLesson(lessonId);
            useRPGStore.setState({ inCombat: false });
            navigate('/dashboard');
            return;
        }

        const isBossFloor = gameMap.find(n => n.floor === currentFloor)?.type === 'boss';
        const goldEarned = isBossFloor ? 30 : 15;
        useStore.getState().addGold(goldEarned);
        setTransitionMeta({ goldEarned, isBossFloor: isBossFloor ?? false });
        setGameState('transition');
    };

    // ── Shop exit: advance floor and return to map
    const handleShopExit = () => {
        useRPGStore.setState({ currentFloor: currentFloor + 1 });
        setGameState('map');
    };

    const handleTransitionDone = () => {
        if (transitionMeta.isBossFloor) {
            useRPGStore.getState().levelUp();
            setGameState('win');
        } else {
            useRPGStore.setState({ currentFloor: currentFloor + 1 });
            setGameState('map');
        }
    };

    // ── Death: deduct 1 heart once
    useEffect(() => {
        if (hp <= 0 && gameState !== 'lose' && gameState !== 'gameover' && gameState !== 'start') {
            if (!heartDeducted.current) {
                heartDeducted.current = true;
                loseHeart();
            }
            // After losing a heart, if hearts hits 0 (or was already 0), it's game over
            const remainingHearts = useStore.getState().hearts;
            if (remainingHearts === 0) {
                setGameState('gameover');
            } else {
                setGameState('lose');
            }
        }
    }, [hp, gameState, loseHeart]);

    const totalNodes = gameMap.length;

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex flex-col items-center overflow-x-hidden">
            {/* ── HUD ── */}
            <header className="w-full max-w-2xl flex justify-between items-center mb-8 bg-slate-900/60 p-4 rounded-3xl border border-slate-800 backdrop-blur-md sticky top-4 z-50">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold"
                >
                    <ArrowLeft className="w-5 h-5" /> Quit
                </button>
                <div className="flex items-center gap-4">
                    {/* HP */}
                    <div className="flex items-center gap-2">
                        <span className="text-red-500 font-black text-sm uppercase tracking-tighter">HP</span>
                        <div className="relative w-20 h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                            <motion.div
                                animate={{ width: `${(hp / maxHp) * 100}%` }}
                                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                        <span className="font-black text-sm">{hp}<span className="text-slate-500">/{maxHp}</span></span>
                    </div>
                    {/* Gold */}
                    <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-black">{gold}</span>
                    </div>
                    {/* Floor */}
                    <div className="bg-purple-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {currentFloor}/{totalNodes || 3}
                    </div>
                </div>
            </header>

            <main className="w-full max-w-5xl flex-1 flex flex-col items-center">
                <AnimatePresence mode="wait">

                    {/* ── Start Screen ── */}
                    {gameState === 'start' && (
                        <motion.div
                            key="start"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center text-center max-w-2xl mt-12"
                        >
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                className="w-32 h-32 bg-purple-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-8 shadow-purple-500/30"
                            >
                                <Swords className="w-16 h-16 text-white" />
                            </motion.div>
                            <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">Adventure Challenge</h1>
                            <p className="text-xl text-slate-400 font-bold mb-12">
                                Defeat Yokai, visit the Merchant, and vanquish the Boss.<br />
                                <span className="text-purple-400">Use your Japanese to survive!</span>
                            </p>
                            <div className="flex gap-4 mb-12 text-sm">
                                {[
                                    { icon: <ShoppingBag className="w-5 h-5" />, label: 'Shop', sub: 'buy cards', color: 'yellow' },
                                    { icon: <Skull className="w-5 h-5" />, label: 'Boss', sub: 'final trial', color: 'purple' },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 bg-slate-900 rounded-2xl p-4 border border-slate-800 flex-1">
                                        <div className={`text-${item.color}-400`}>{item.icon}</div>
                                        <span className="font-black text-white text-xs uppercase">{item.label}</span>
                                        <span className="text-slate-500 text-xs">{item.sub}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={startRun}
                                className="bg-white text-slate-950 text-2xl font-black py-5 px-16 rounded-[2rem] hover:scale-105 transition-transform shadow-[0_0_50px_rgba(168,85,247,0.4)] active:scale-95 border-b-8 border-slate-300"
                            >
                                BEGIN ADVENTURE
                            </button>
                        </motion.div>
                    )}

                    {/* ── Map Screen ── */}
                    {gameState === 'map' && (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full flex flex-col items-center"
                        >
                            <div className="mb-10 text-center">
                                <h2 className="text-3xl font-black flex items-center justify-center gap-3">
                                    <MapIcon className="w-8 h-8 text-purple-500" /> BATTLE PATH
                                </h2>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-2">Choose your next encounter</p>
                            </div>

                            <div className="relative flex flex-col items-center gap-16 w-full max-w-md pb-20">
                                {[...gameMap].reverse().map((node, i) => {
                                    const isCurrent = node.floor === currentFloor;
                                    const isPast = node.floor < currentFloor;
                                    const colors = NODE_COLORS[node.type];
                                    return (
                                        <div key={node.id} className="relative flex flex-col items-center">
                                            {/* Connector */}
                                            {i < gameMap.length - 1 && (
                                                <div className={cn(
                                                    'absolute -bottom-16 left-1/2 -translate-x-1/2 w-1 h-16 border-l-4 border-dashed z-0',
                                                    isPast ? 'border-purple-500' : 'border-slate-800'
                                                )} />
                                            )}

                                            <motion.button
                                                onClick={() => handleNodeVisit(node)}
                                                disabled={!isCurrent}
                                                whileHover={isCurrent ? { scale: 1.08 } : {}}
                                                whileTap={isCurrent ? { scale: 0.95 } : {}}
                                                animate={isCurrent ? {
                                                    boxShadow: [
                                                        '0 0 20px rgba(168,85,247,0)',
                                                        '0 0 35px rgba(168,85,247,0.5)',
                                                        '0 0 20px rgba(168,85,247,0)',
                                                    ],
                                                } : {}}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className={cn(
                                                    'w-28 h-28 rounded-[2rem] flex flex-col items-center justify-center gap-2 border-b-[8px] transition-all shadow-xl relative overflow-hidden',
                                                    isCurrent
                                                        ? `${colors.active} ${colors.border} cursor-pointer`
                                                        : isPast
                                                            ? 'bg-slate-800 border-slate-950 opacity-40 grayscale cursor-default'
                                                            : 'bg-slate-900 border-slate-950 opacity-50 cursor-default'
                                                )}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                                                <NodeIcon type={node.type} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                                                    {NODE_LABELS[node.type]}
                                                </span>

                                                {isCurrent && (
                                                    <motion.div
                                                        layoutId="current-marker"
                                                        className="absolute -right-2 -top-2 bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-1 rounded-lg shadow-lg z-10"
                                                    >
                                                        NOW
                                                    </motion.div>
                                                )}
                                                {isPast && (
                                                    <div className="absolute inset-0 flex items-center justify-center text-3xl">✔</div>
                                                )}
                                            </motion.button>

                                            <p className={cn('mt-3 text-xs font-black uppercase tracking-widest', isCurrent ? 'text-purple-400' : 'text-slate-600')}>
                                                {node.type === 'boss' ? '⚡ Final Boss' : `Stop ${node.floor}`}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Encounter Flash ── */}
                    {gameState === 'encounter-flash' && selectedEnemy && (
                        <motion.div key="flash" className="w-full">
                            <EncounterFlash
                                isBoss={pendingNodeType === 'boss'}
                                enemyName={selectedEnemy.name}
                                enemyImage={selectedEnemy.image}
                                onDone={handleEncounterFlashDone}
                            />
                        </motion.div>
                    )}

                    {/* ── Combat ── */}
                    {gameState === 'combat' && (
                        <motion.div
                            key="combat"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <RPGCombat onComplete={handleEncounterComplete} />
                        </motion.div>
                    )}

                    {/* ── Transition ── */}
                    {gameState === 'transition' && (
                        <motion.div key="transition" className="w-full">
                            <TransitionScreen
                                floorJustCompleted={currentFloor}
                                goldEarned={transitionMeta.goldEarned}
                                isBossFloor={transitionMeta.isBossFloor}
                                onDone={handleTransitionDone}
                            />
                        </motion.div>
                    )}

                    {/* ── Rest ── */}
                    {gameState === 'rest' && (
                        <motion.div key="rest" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                            <RestSite onComplete={handleEncounterComplete} />
                        </motion.div>
                    )}

                    {/* ── Shop ── Shop returns to map; does NOT advance floor ── */}
                    {gameState === 'shop' && (
                        <motion.div key="shop" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                            <Merchant onComplete={handleShopExit} />
                        </motion.div>
                    )}

                    {/* ── Win Screen ── */}
                    {gameState === 'win' && (
                        <motion.div
                            key="win"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center mt-10 flex flex-col items-center max-w-lg w-full"
                        >
                            <motion.div
                                animate={{ y: [0, -14, 0] }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                                className="text-8xl mb-6"
                            >
                                🏆
                            </motion.div>
                            <h1 className="text-7xl font-black text-yellow-500 mb-3 tracking-tighter uppercase">VICTORY!</h1>
                            <p className="text-xl text-slate-400 font-bold mb-8 italic">
                                You have conquered this world. A new path awaits!
                            </p>

                            {/* Stats */}
                            <div className="flex gap-4 mb-10 w-full justify-center">
                                {[
                                    { label: 'Defeated', value: '2', icon: '⚔️' },
                                    { label: 'XP Earned', value: '+200', icon: '⭐' },
                                    { label: 'Gold', value: `+${gold}`, icon: '💰' },
                                ].map((s, i) => (
                                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center flex-1">
                                        <div className="text-2xl">{s.icon}</div>
                                        <div className="font-black text-lg text-white">{s.value}</div>
                                        <div className="text-slate-500 text-xs uppercase tracking-widest">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    completeLesson(lessonId);
                                    advanceWorld();
                                    navigate('/dashboard');
                                }}
                                className="bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 text-xl font-black py-5 px-14 rounded-[2rem] border-b-8 border-amber-700 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                            >
                                CONTINUE JOURNEY →
                            </button>
                        </motion.div>
                    )}

                    {/* ── Lose Screen (Remaining Hearts > 0) ── */}
                    {gameState === 'lose' && (
                        <motion.div
                            key="lose"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center mt-10 flex flex-col items-center max-w-lg w-full"
                        >
                            <motion.div
                                animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                                className="text-8xl mb-6"
                            >
                                💀
                            </motion.div>
                            <h1 className="text-7xl font-black text-rose-600 mb-3 uppercase tracking-tighter">Fallen...</h1>
                            <p className="text-xl text-slate-400 font-bold mb-6 italic">
                                The Yokai were too strong this time.
                            </p>

                            {/* Heart penalty display */}
                            <div className="bg-slate-900 border-2 border-rose-800 rounded-3xl p-6 mb-8 w-full max-w-xs">
                                <p className="text-rose-400 font-black uppercase tracking-widest text-sm mb-4">Hearts Lost: -1</p>
                                <div className="flex gap-2 justify-center">
                                    {Array.from({ length: maxHearts }).map((_, i) => (
                                        <Heart
                                            key={i}
                                            className={cn(
                                                'w-8 h-8',
                                                i < hearts ? 'text-rose-500 fill-rose-500' : 'text-slate-700 fill-slate-700'
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-400 text-sm font-bold mt-3">
                                    {hearts} heart{hearts !== 1 ? 's' : ''} remaining
                                </p>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-slate-800 text-white text-lg font-bold py-4 px-10 rounded-3xl border-b-4 border-slate-700 hover:bg-slate-700 transition-colors shadow-lg"
                                >
                                    RETURN TO MAP
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* ── Game Over Screen (0 Hearts) ── */}
                    {gameState === 'gameover' && (
                        <motion.div
                            key="gameover"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center mt-10 flex flex-col items-center max-w-lg w-full"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                className="text-9xl mb-6 grayscale"
                            >
                                🪦
                            </motion.div>
                            <h1 className="text-7xl font-black text-slate-600 mb-3 uppercase tracking-tighter">GAME OVER</h1>
                            <p className="text-xl text-slate-400 font-bold mb-8 italic">
                                You have exhausted all your energy.<br />Your journey here begins anew.
                            </p>

                            <button
                                onClick={() => {
                                    useStore.getState().resetWorldProgress(useStore.getState().currentWorld);
                                    navigate('/dashboard');
                                }}
                                className="bg-rose-700 text-white text-xl font-black py-5 px-14 rounded-[2rem] border-b-8 border-rose-950 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                            >
                                RESTART JOURNEY ↺
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
};
