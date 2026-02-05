'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, TrendingDown, Zap } from 'lucide-react';

interface Stats {
    winRate: number;
    salesCycle: number;
    progress: number;
}

export default function SalesEnablementTile() {
    const [stats, setStats] = useState<Stats>({
        winRate: 39,
        salesCycle: 28,
        progress: 66,
    });

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const updateStats = () => {
            setStats({
                winRate: 38 + Math.random() * 2,
                salesCycle: 27 + Math.random() * 2,
                progress: 20 + Math.random() * 60,
            });
            const nextUpdate = 3000 + Math.random() * 2000;
            timeoutId = setTimeout(updateStats, nextUpdate);
        };

        timeoutId = setTimeout(updateStats, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    const workflowGridStyle: React.CSSProperties = {
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '24px 24px',
    };

    const panelVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div 
                className="relative aspect-square w-full max-w-[600px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
                style={workflowGridStyle}
            >
                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 500 500">
                    <motion.path
                        d="M100,100 Q250,250 400,100"
                        fill="none"
                        stroke="#13a4ec"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M100,400 Q250,250 400,400"
                        fill="none"
                        stroke="#13a4ec"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                    />
                    <path d="M50,250 L450,250" fill="none" stroke="#13a4ec" strokeDasharray="4 4" strokeWidth="1" />
                </svg>

                {/* Center Node */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <motion.div
                        className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-primary/30 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, boxShadow: "0 0 40px rgba(19, 164, 236, 0.3)" }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Win Rate Boost</p>
                        <h3 className="text-white text-6xl font-black">+{stats.winRate.toFixed(1)}%</h3>
                        <div className="mt-4 flex justify-center items-center gap-1">
                            <Zap className="text-primary w-4 h-4" />
                            <span className="text-slate-400 text-xs font-medium uppercase tracking-tighter">Automated Playbook Active</span>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Panels */}
                <motion.div
                    className="absolute top-12 left-8 w-32 aspect-square bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/5 p-3 flex flex-col justify-between"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.8 }}
                >
                    <FileText className="text-primary w-5 h-5" />
                    <p className="text-[10px] text-slate-300 font-bold">Case Study v4</p>
                    <div className="h-1 w-full bg-slate-700 rounded-full">
                        <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-12 right-8 w-40 h-24 bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/5 p-4"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}
                >
                    <p className="text-xs text-slate-400 font-medium mb-1">Sales Cycle</p>
                    <p className="text-white text-2xl font-bold">-{stats.salesCycle.toFixed(0)}%</p>
                    <div className="flex items-center gap-1 text-[#fa5f38]">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">OPTIMIZED</span>
                    </div>
                </motion.div>

                {/* Gradient Velocity Curve */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background-dark/80 to-transparent">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 100">
                        <defs>
                            <linearGradient id="curveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                        <motion.path d="M0,80 C100,80 150,20 250,40 C350,60 400,0 500,20 L500,100 L0,100 Z" fill="url(#curveGradient)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            transition={{ duration: 1, delay: 1.2 }}
                        />
                        <motion.path
                            d="M0,80 C100,80 150,20 250,40 C350,60 400,0 500,20"
                            fill="none"
                            stroke="url(#curveGradient)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}