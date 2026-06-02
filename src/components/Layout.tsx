import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Heart, Star, Zap, RotateCcw, BookOpen } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { JSpellbook } from './JSpellbook';
import { useBilling } from '../hooks/useBilling';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { xp, hearts, combo, resetWorldProgress, buyHearts, replenishHearts } = useStore();
    const location = useLocation();
    const isLanding = location.pathname === '/';
    const [showConfirm, setShowConfirm] = useState(false);
    const [showHeartMenu, setShowHeartMenu] = useState(false);
    const [showSpellbook, setShowSpellbook] = useState(false);

    // ── Google Play Billing ──────────────────────────────────────────────────
    // onSuccess fires after the purchase is approved AND consumed by the plugin.
    const { purchaseHearts } = useBilling({
        onSuccess: () => {
            replenishHearts();     // set hearts back to maxHearts in the store
            setShowHeartMenu(false);
        },
    });
    // ────────────────────────────────────────────────────────────────────────

    if (isLanding) return <>{children}</>;

    const handleReset = () => {
        resetWorldProgress('beginner-1');
        setShowConfirm(false);
    };

    const handleBuyHearts = (type: 'xp' | 'iap') => {
        if (type === 'iap') {
            // Launch real Google Play Billing flow.
            // purchaseHearts() is async; success is handled inside useBilling via onSuccess.
            purchaseHearts();
            return;
        }
        // XP purchase path — synchronous, store-driven.
        if (buyHearts(type)) {
            setShowHeartMenu(false);
        }
        // If false, not enough XP — button is disabled so this branch shouldn't fire.
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-deep-indigo selection:bg-sakura-pink/30">
            <header className="sticky top-0 z-50 border-b-2 border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    {/* Brand + Reset */}
                    <div className="flex items-center gap-3">
                        <Link to={location.pathname === '/dashboard' ? '/' : '/dashboard'} className="group flex items-center gap-2 hover:opacity-90 transition-opacity">
                            {/* Torii-style mark */}
                            <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-deep-indigo shadow-sm shrink-0">
                                <span className="text-sakura-pink font-black text-xs leading-none font-jp">日</span>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-black text-lg tracking-tight">
                                    <span className="text-sakura-pink">J</span><span className="text-deep-indigo">Quest</span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Japanese Tutor</span>
                            </div>
                        </Link>

                        <button
                            onClick={() => setShowConfirm(true)}
                            className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-red-400 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-2.5 py-1 rounded-full transition-all"
                            title="Reset all progress"
                        >
                            <RotateCcw className="w-3 h-3" />
                            Reset Journey
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 sm:gap-6 relative">
                        {/* JSpellbook Toggle */}
                        <button
                            onClick={() => setShowSpellbook(true)}
                            className="flex items-center gap-1.5 font-bold px-2 py-1 rounded-full transition-colors text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
                            title="Open JSpellbook"
                        >
                            <BookOpen className="h-5 w-5 fill-current" />
                            <span className="hidden sm:inline-block">Spellbook</span>
                        </button>

                        {/* Streak / Combo */}
                        <div className="flex items-center gap-1.5 text-gold font-bold" title="Session Combo">
                            <Zap className={`h-5 w-5 fill-current ${combo > 9 ? 'animate-pulse text-yellow-400 drop-shadow-md' : ''}`} />
                            <span>{combo}</span>
                        </div>

                        {/* XP */}
                        <div className="flex items-center gap-1.5 text-blue-500 font-bold">
                            <Star className="h-5 w-5 fill-current" />
                            <span>{xp}</span>
                        </div>

                        {/* Hearts */}
                        <div className="relative">
                            <button
                                onClick={() => setShowHeartMenu(!showHeartMenu)}
                                className="flex items-center gap-1.5 text-red-500 font-bold hover:bg-red-50 px-2 py-1 rounded-full transition-colors"
                            >
                                <Heart className={`h-5 w-5 fill-current ${hearts === 0 ? 'animate-bounce' : ''}`} />
                                <span>{hearts}</span>
                            </button>

                            {/* Heart Purchase Menu */}
                            {showHeartMenu && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-4 z-50 text-slate-800">
                                    <h3 className="font-black text-lg text-center mb-3 text-red-500">Refill Hearts?</h3>

                                    <button
                                        onClick={() => handleBuyHearts('xp')}
                                        disabled={xp < 5000 || hearts === 3}
                                        className="w-full mb-3 flex flex-col items-center bg-blue-50 border-2 border-blue-100 hover:bg-blue-100 hover:border-blue-300 active:translate-y-0.5 rounded-xl p-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="flex items-center gap-1 font-bold text-blue-600">
                                            <Star className="w-4 h-4 fill-current" /> 5000 XP
                                        </div>
                                        <span className="text-xs text-blue-400 font-bold">Refill Full</span>
                                    </button>

                                    <button
                                        onClick={() => handleBuyHearts('iap')}
                                        disabled={hearts === 3}
                                        className="w-full flex flex-col items-center bg-green-50 border-2 border-green-100 hover:bg-green-100 hover:border-green-300 active:translate-y-0.5 rounded-xl p-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="font-bold text-green-600">$0.99</span>
                                        <span className="text-xs text-green-500 font-bold">Buy Full Refill</span>
                                    </button>

                                    <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                                        <button onClick={() => setShowHeartMenu(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
                {children}
            </main>

            {/* Confirm Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl border-b-4 border-slate-200 p-8 max-w-sm w-full mx-4 text-center space-y-5">
                        <div className="text-5xl">⚠️</div>
                        <h2 className="text-2xl font-black text-deep-indigo">Reset Journey?</h2>
                        <p className="text-slate-500 font-medium">This will clear all your progress, XP, and hearts. This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 py-3 rounded-2xl bg-red-500 border-b-4 border-red-700 font-bold text-white hover:bg-red-400 active:translate-y-1 active:border-b-0 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* JSpellbook Modal */}
            <JSpellbook
                isOpen={showSpellbook}
                onClose={() => setShowSpellbook(false)}
            />
        </div>
    );
};
