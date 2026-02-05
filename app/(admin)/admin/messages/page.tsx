'use client';

import { useEffect, useState } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { Mail, Trash2, Calendar, User, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactMessage {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    subject: string;
    message: string;
    createdAt: number;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const messagesRef = ref(rtdb, 'contactMessages');

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList = Object.entries(data).map(([key, value]: [string, any]) => ({
                    id: key,
                    ...value
                })).sort((a, b) => b.createdAt - a.createdAt);
                setMessages(messageList);
            } else {
                setMessages([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const deleteMessage = async (id: string) => {
        if (confirm('Are you sure you want to delete this message?')) {
            try {
                await remove(ref(rtdb, `contactMessages/${id}`));
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message.');
            }
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Messages</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage inquiries from your contact form.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium">
                    {messages.length} Total Messages
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-zinc-500">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="p-12 text-center text-zinc-500">
                        <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No messages found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {messages.map((msg) => (
                            <div key={msg.id} className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50">
                                <div
                                    className="p-4 md:p-6 cursor-pointer flex items-start gap-4"
                                    onClick={() => toggleExpand(msg.id)}
                                >
                                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                                        <User className="w-5 h-5 text-zinc-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                                {msg.firstName} {msg.lastName}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs text-zinc-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteMessage(msg.id);
                                                    }}
                                                    className="p-1 text-zinc-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 line-clamp-1">
                                            {msg.subject}
                                        </p>
                                        <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${expandedId === msg.id ? '' : 'line-clamp-1'}`}>
                                            {msg.message}
                                        </p>
                                    </div>
                                    <div className="shrink-0 mt-1">
                                        {expandedId === msg.id ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedId === msg.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30"
                                        >
                                            <div className="p-6 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Email Address</label>
                                                        <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">{msg.email}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Date Received</label>
                                                        <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">
                                                            {new Date(msg.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Subject</label>
                                                    <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">{msg.subject}</p>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Message Content</label>
                                                    <div className="mt-2 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                                        {msg.message}
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <a
                                                        href={`mailto:${msg.email}`}
                                                        className="px-4 py-2 bg-black dark:bg-white dark:text-black text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                        Reply via Email
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
