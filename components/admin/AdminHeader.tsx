'use client';

import { Bell, Menu, Search, User } from 'lucide-react';

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hidden"
                >
                    <Menu size={20} />
                </button>

                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-64 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                    <Search size={18} className="text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder-zinc-400 text-zinc-700 dark:text-zinc-200"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 relative">
                    <Bell size={20} className="text-zinc-600 dark:text-zinc-400" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                </button>

                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>

                <div className="flex items-center gap-3 pl-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <User size={18} />
                    </div>
                    <div className="hidden md:block text-sm">
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">Admin User</p>
                        <p className="text-xs text-zinc-500">admin@nextblog.com</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
