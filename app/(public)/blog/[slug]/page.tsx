"use client";

import Container from "@/components/layout/Container";
import { ChevronLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";

export default function BlogPost() {
    return (
        <article className="bg-white min-h-screen pb-20">
            {/* Post Header */}
            <div className="bg-gray-50 pt-12 md:pt-20 pb-12">
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
                                Technology
                            </span>

                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Exploring the Future of Urban Development: How AI and Green Tech are Shaping Tomorrow
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" alt="Author" className="w-full h-full object-cover" />
                                    </div>
                                    <span>Alex Rivera</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Oct 15, 2023</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>5 min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Hero Image */}
            <Container className="mt-[-40px] md:mt-[-60px]">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                            alt="Urban development"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </Container>

            {/* Content */}
            <Container className="py-12 md:py-20">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="prose prose-lg prose-gray max-w-none">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium mb-8">
                            As we look toward the midpoint of the 21st century, our cities are undergoing a radical transformation. From self-sustaining ecosystems to AI-managed traffic flows, the future of urban life is being rewritten in real-time.
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">The Rise of Smart Infrastructure</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Urban planning is no longer just about where to place buildings or roads. It's about data. Sensors embedded in the very fabric of our cities are feeding information into neural networks that optimize everything from waste management to energy consumption.
                        </p>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            Imagine a city where streetlights only brighten when they detect movement, where traffic jams are liquidated before they even form, and where every square meter of public space is utilized to its maximum potential. This isn't science fiction—it's already happening in cities like Singapore and Copenhagen.
                        </p>

                        <blockquote className="border-l-4 border-black pl-6 my-10 italic text-xl text-gray-900 font-medium">
                            "The city of the future is not a place you inhabit; it's a living system that understands and adapts to your needs."
                        </blockquote>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">Green is the New Tech</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            The integration of nature into urban environments is the second major pillar of this transition. Vertical forests and sky-gardens are not just aesthetic choices; they are active components of a city's air filtration and temperature management systems.
                        </p>

                        <p className="text-gray-600 leading-relaxed mb-12">
                            By reducing the "heat island" effect, these green structures are cutting energy costs and improving the mental well-being of millions. As we continue to urbanize, the challenge will be to maintain this balance between technological advancement and ecological preservation.
                        </p>
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
                            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">#SmartCities</span>
                            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">#UrbanFuture</span>
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
                                className="flex-grow h-14 px-6 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                            />
                            <button className="h-14 px-8 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </Container>
            </section>
        </article>
    );
}
