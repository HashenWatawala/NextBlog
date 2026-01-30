'use client';

import DashboardStats from '@/components/admin/DashboardStats';
import { motion } from 'motion/react';
import { MoreHorizontal } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Dashboard</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium text-sm">
                        Export Data
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-lg shadow-blue-600/20">
                        Create New Post
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <DashboardStats />

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area (Placeholder) */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Analytics Overview</h2>
                        <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400">
                        Chart Placeholder
                    </div>
                </div>

                {/* Recent Posts / Activity */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6">Recent Posts</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">How to build a blog with Next.js</h4>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                                        <span>2 mins ago</span>
                                        <span>•</span>
                                        <span className="text-blue-600">Published</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-2 mt-2 text-sm text-blue-600 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                            View All Posts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
