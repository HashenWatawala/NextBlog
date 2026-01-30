'use client';

import { useState } from 'react';
import { ChevronLeft, Save, Send } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import PostEditor from '@/components/admin/PostEditor';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        const generatedSlug = newTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        setSlug(generatedSlug);
    };

    return (
        <div className="max-w-5xl mx-auto pb-10">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/posts"
                        className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Create New Post</h1>
                        <p className="text-sm text-zinc-500">Drafting a new amazing story</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium">
                        <Save size={18} />
                        <span>Save Draft</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/20">
                        <Send size={18} />
                        <span>Publish</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title & Slug */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Post Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Enter an engaging title..."
                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg font-medium"
                            />
                        </div>

                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Slug (URL)
                            </label>
                            <div className="flex items-center">
                                <span className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-r-0 border-zinc-200 dark:border-zinc-800 rounded-l-xl text-zinc-500 text-sm">
                                    /blog/
                                </span>
                                <input
                                    type="text"
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-r-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm text-zinc-600 dark:text-zinc-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="bg-white dark:bg-zinc-900 p-1 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <PostEditor content={content} onChange={setContent} />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Cover Image */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">Cover Image</h3>
                        <ImageUpload onImageSelected={(file) => setCoverImage(file)} />
                    </div>

                    {/* Metadata / Categories */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4">Post Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Category
                                </label>
                                <select className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
                                    <option>Technology</option>
                                    <option>Design</option>
                                    <option>Development</option>
                                    <option>Lifestyle</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    placeholder="Add tags separated by comma..."
                                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 resize-none text-sm"
                                    placeholder="Short description for SEO..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
