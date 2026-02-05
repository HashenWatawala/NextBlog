"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import PostCard from "@/components/blog/PostCard";

const CATEGORIES = ["Technology", "Health", "Lifestyle"];

const BLOG_POSTS = [
    {
        id: 1,
        title: "Exploring the Future of Urban Development",
        description: "Dive into the latest trends in urban planning and design that are shaping our cities.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        date: "10/15/2023",
        readTime: "5 min read",
        category: "Technology",
    },
    {
        id: 2,
        title: "The Ultimate Guide to Healthy Eating",
        description: "Learn about the benefits of a balanced diet and how to incorporate nutritious foods into your meals.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
        date: "10/10/2023",
        readTime: "7 min read",
        category: "Health",
    },
    {
        id: 3,
        title: "Mindfulness and Mental Health: A Path to Peace",
        description: "Understand the impact of mindfulness practices on mental well-being and how to get started.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop",
        date: "10/05/2023",
        readTime: "6 min read",
        category: "Lifestyle",
    },
];

export default function BlogList() {
    const [activeCategory, setActiveCategory] = useState("Technology");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <Container className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            {/* Search Bar */}
            <div className="mb-10 max-w-2xl mx-auto">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search for articles..."
                        className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                </div>
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === category
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "bg-white text-gray-600 border border-gray-100 hover:border-blue-200 hover:bg-blue-50"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm min-w-[160px] justify-between">
                        Sort by Date
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {BLOG_POSTS.map((post) => (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        description={post.description}
                        image={post.image}
                        href={`/blog/${post.id}`}
                        date={post.date}
                        readTime={post.readTime}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pb-12">
                <button className="p-2 h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            className={`h-10 w-10 rounded-xl text-sm font-medium transition-all ${page === 1
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button className="flex items-center gap-1 px-4 h-10 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors group">
                    Next
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </Container>
    );
}
