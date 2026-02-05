"use client";

import Container from "@/components/layout/Container";
import { ChevronLeft, Calendar, Clock, User, Share2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
    coverImageUrl?: string;
    createdAt: any;
    author: {
        name: string;
        photoURL?: string;
    };
    readTime?: string;
    tags?: string[];
}

export default function BlogPost() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postsRef = collection(db, "posts");
                const q = query(postsRef, where("slug", "==", slug), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setPost({ id: doc.id, ...doc.data() } as Post);
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-gray-500 font-medium">Loading story...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4">
                <h1 className="text-4xl font-bold text-gray-900">Post not found</h1>
                <p className="text-gray-500 text-center max-w-md">The article you're looking for might have been moved or deleted.</p>
                <Link href="/blog" className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:scale-105 transition-all">
                    Return to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="bg-white min-h-screen pb-20">
            {/* Post Header */}
            <div className="bg-gray-50 pt-12 md:pt-20 pb-12 font-sans">
                <Container>
                    <div className="max-w-3xl mx-auto px-4">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-black transition-colors mb-8 group"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">
                                {post.category}
                            </span>

                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium font-sans">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                        {post.author.photoURL ? (
                                            <img src={post.author.photoURL} alt={post.author.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <User className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                    <span>{post.author.name}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently"}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime || "5 min read"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Hero Image */}
            {post.coverImageUrl && (
                <Container className="mt-[-40px] md:mt-[-60px]">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src={post.coverImageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </Container>
            )}

            {/* Content */}
            <Container className="py-12 md:py-20">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="prose prose-lg prose-gray max-w-none font-sans">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ ...props }) => <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6" {...props} />,
                                h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-5" {...props} />,
                                h3: ({ ...props }) => <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                                p: ({ ...props }) => <p className="text-gray-600 leading-relaxed mb-6" {...props} />,
                                blockquote: ({ ...props }) => <blockquote className="border-l-4 border-black pl-6 my-10 italic text-xl text-gray-900 font-medium" {...props} />,
                                ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600" {...props} />,
                                ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-600" {...props} />,
                                li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
                                a: ({ ...props }) => <a className="text-blue-600 hover:underline font-medium" {...props} />,
                                img: ({ ...props }) => <img {...props} className="rounded-2xl shadow-lg my-12 w-full" />,
                                code: ({ node, ...props }) => (
                                    <code className="bg-gray-100 dark:bg-zinc-800 rounded px-1.5 py-0.5 text-sm font-mono text-blue-600 dark:text-blue-400" {...props} />
                                ),
                                pre: ({ ...props }) => (
                                    <pre className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl overflow-x-auto my-8 text-sm leading-relaxed" {...props} />
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <hr className="border-gray-100 my-12" />

                    {/* Post Footer/Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-black hover:text-white transition-all">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex gap-2">
                            {post.tags?.map(tag => (
                                <span key={tag} className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            {/* Newsletter CTA */}
            <section className="bg-black py-16">
                <Container>
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Enjoyed this read?</h2>
                        <p className="text-gray-400 text-lg mb-8">Join 10k+ readers receiving weekly insights on tech and lifestyle.</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow h-14 px-6 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
                            />
                            <button className="h-14 px-8 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all font-sans">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </Container>
            </section>
        </article>
    );
}
