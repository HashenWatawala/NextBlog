"use client";

import { useState } from "react";
import { Search, Tag as TagIcon, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import Link from "next/link";

const TAGS = [
    { name: "Technology", count: 12, color: "bg-blue-100 text-blue-600" },
    { name: "Health", count: 8, color: "bg-green-100 text-green-600" },
    { name: "Lifestyle", count: 15, color: "bg-purple-100 text-purple-600" },
    { name: "Design", count: 10, color: "bg-pink-100 text-pink-600" },
    { name: "Business", count: 6, color: "bg-indigo-100 text-indigo-600" },
    { name: "Education", count: 9, color: "bg-yellow-100 text-yellow-600" },
    { name: "Marketing", count: 7, color: "bg-orange-100 text-orange-600" },
    { name: "Travel", count: 11, color: "bg-cyan-100 text-cyan-600" },
];

export default function TagsList() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTags = TAGS.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-black py-16 md:py-24">
                <Container>
                    <div className="max-w-3xl px-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                            Browse by Topic
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            Explore our collection of articles across various categories. Find the insights that matter most to you.
                        </p>
                    </div>
                </Container>
            </div>

            <Container className="py-12 md:py-20 px-4">
                {/* Search Bar */}
                <div className="mb-12 max-w-xl mx-auto lg:mx-0">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="w-full h-12 md:h-14 pl-12 pr-6 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-black transition-colors" />
                    </div>
                </div>

                {/* Tags Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTags.map((tag) => (
                        <Link
                            key={tag.name}
                            href={`/tags/${tag.name.toLowerCase()}`}
                            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${tag.color}`}>
                                    <TagIcon className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                    {tag.count} Posts
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors">
                                {tag.name}
                            </h3>

                            <div className="flex items-center text-xs font-bold text-gray-500 group-hover:text-black transition-colors">
                                View Articles
                                <ArrowRight className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredTags.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No topics found matching your search.</p>
                    </div>
                )}
            </Container>
        </div>
    );
}
