'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: string; // e.g., 'bg-blue-500'
}

export default function StatCard({ label, value, icon: Icon, trend, trendUp, color = 'bg-blue-600' }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</p>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-white`}>
                    <Icon size={24} className={`text-${color.replace('bg-', '')}`} style={{ color: 'inherit' }} />
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={`font-medium ${trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {trend}
                    </span>
                    <span className="text-zinc-400 ml-2">from last month</span>
                </div>
            )}
        </motion.div>
    );
}
