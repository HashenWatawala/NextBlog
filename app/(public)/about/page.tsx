"use client";

import Container from "@/components/layout/Container";
import { Users, Target, Rocket } from "lucide-react";

export default function About() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                        alt="Office workspace"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

                <Container className="relative z-10">
                    <div className="max-w-2xl text-white px-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                            Our Story, Our Mission
                        </h1>
                        <p className="text-lg md:text-xl text-blue-50/90 leading-relaxed">
                            We're a team of passionate writers and creators dedicated to sharing insights that empower the next generation of digital pioneers.
                        </p>
                    </div>
                </Container>
            </div>

            <Container className="py-16 md:py-24 px-4">
                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How it all started</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                            Founded in 2023, NextBlog began as a simple project to document our journey through the rapidly evolving world of technology and lifestyle. What started as a small personal blog quickly grew into a community-driven platform.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            Today, we serve thousands of readers every month, providing deep dives into urban development, wellness strategies, and the latest in digital culture. Our goal remains the same: to deliver high-quality, actionable content that makes a difference.
                        </p>
                    </div>
                    <div className="relative order-1 lg:order-2">
                        <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Our team collaborating"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-black text-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl hidden sm:block">
                            <span className="text-3xl md:text-4xl font-bold block mb-1">10k+</span>
                            <span className="text-blue-100 text-xs md:text-sm font-medium">Monthly Readers</span>
                        </div>
                    </div>
                </div>

                {/* Values/Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-100 transition-all hover:border-blue-100 hover:bg-blue-50/30 group">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all">
                            <Target className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Focused Quality</h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                            We prioritize depth over breadth. Every article is meticulously researched to ensure you get the best information possible.
                        </p>
                    </div>

                    <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-100 transition-all hover:border-blue-100 hover:bg-blue-50/30 group">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all">
                            <Users className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Community Focused</h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                            Our readers are at the heart of everything we do. We build features and create content based on your feedback and needs.
                        </p>
                    </div>

                    <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-100 transition-all hover:border-blue-100 hover:bg-blue-50/30 group">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all">
                            <Rocket className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Constant Innovation</h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                            The digital landscape changes daily. We're committed to evolving our platform and content to stay ahead of the curve.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
