"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Container from "@/components/layout/Container";
import PostCard from "@/components/blog/PostCard";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

const CATEGORIES = ["All", "Technology", "Health", "Lifestyle", "Design", "Development"];

interface Post {
    id: string;
    title: string;
    excerpt?: string;
    coverImageUrl?: string;
    createdAt: any;
    category: string;
    readTime?: string;
    slug: string;
}

export default function BlogList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const postsRef = collection(db, "posts");
        // Simplified query: sort by date only to avoid composite index requirement
        const q = query(
            postsRef,
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Post[];
            setPosts(fetchedPosts);
            setLoading(false);
            setError(null);
        }, (err) => {
            console.error("Error fetching posts:", err);
            setError("Failed to load posts. Please check your Firestore indexes or connection.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filteredPosts = posts.filter(post => {
        const isPublished = (post as any).status === "published";
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
        return isPublished && matchesCategory && matchesSearch;
    });

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

            {/* Error Message */}
            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Loading amazing stories...</p>
                </div>
            ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            description={post.excerpt || "No description available."}
                            image={post.coverImageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
                            href={`/blog/${post.slug}`}
                            date={post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Just now"}
                            readTime={post.readTime || "5 min read"}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
                </div>
            )}

            {/* Pagination (Simplified for now) */}
            {filteredPosts.length > 0 && (
                <div className="flex justify-center items-center gap-2 pb-12">
                    <button className="p-2 h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-2">
                        <button className="h-10 w-10 rounded-xl text-sm font-medium bg-blue-600 text-white shadow-lg shadow-blue-200">
                            1
                        </button>
                    </div>
                    <button className="flex items-center gap-1 px-4 h-10 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors group">
                        Next
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            )}
        </Container>
    );
}
