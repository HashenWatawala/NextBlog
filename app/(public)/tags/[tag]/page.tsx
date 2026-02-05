"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, Loader2, Tag as TagIcon } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PostCard from "@/components/blog/PostCard";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface Post {
    id: string;
    title: string;
    excerpt?: string;
    coverImageUrl?: string;
    createdAt: any;
    category: string;
    readTime?: string;
    slug: string;
    tags?: string[];
    status: string;
}

export default function TagPage() {
    const params = useParams();
    const tagSlug = decodeURIComponent(params.tag as string).toLowerCase();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() } as Post))
                .filter(post =>
                    post.status === "published" &&
                    post.tags?.some(t => t.toLowerCase() === tagSlug)
                );
            setPosts(fetchedPosts);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching tag posts:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [tagSlug]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 pt-12 md:pt-20 pb-12">
                <Container>
                    <div className="max-w-4xl px-4 mx-auto">
                        <Link
                            href="/tags"
                            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-black transition-colors mb-8 group"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" />
                            All Topics
                        </Link>

                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                                <TagIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                                    #{tagSlug.charAt(0).toUpperCase() + tagSlug.slice(1)}
                                </h1>
                                <p className="text-gray-500 mt-2 font-medium">
                                    Exploring stories and insights tagged with {tagSlug}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            <p className="text-gray-500 font-medium">Finding relevant stories...</p>
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
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
                        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="inline-flex p-6 bg-gray-50 text-gray-400 rounded-full mb-6">
                                <TagIcon className="w-12 h-12" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h2>
                            <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                There aren't any articles tagged with "{tagSlug}" yet. Check back later!
                            </p>
                            <Link href="/blog" className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:scale-105 transition-all">
                                Browse All Posts
                            </Link>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
