'use client';

import Link from 'next/link'
import { Twitter, Github, Linkedin, ArrowRight } from 'lucide-react'
import Container from './Container'

const FOOTER_LINKS = {
    Categories: [
        { label: "Technology", href: "/blog?category=technology" },
        { label: "Design", href: "/blog?category=design" },
        { label: "Productivity", href: "/blog?category=productivity" },
        { label: "Lifestyle", href: "/blog?category=lifestyle" },
    ],
    Support: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="font-bold text-xl tracking-tight">
                            NextBlog
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            A modern platform for thinkers and creators. Share your stories,
                            build your audience, and inspire the world.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                                <Github size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                                <Linkedin size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                        <div key={title} className="flex flex-col gap-6">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900">
                                {title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-500 hover:text-black transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Section */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900">
                            Newsletter
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Subscribe to receive the latest stories and updates.
                        </p>
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
                            />
                            <button
                                className="absolute right-2 top-2 p-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                                aria-label="Subscribe"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} NextBlog. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600">Privacy</Link>
                        <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600">Terms</Link>
                        <Link href="/cookies" className="text-xs text-gray-400 hover:text-gray-600">Cookies</Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
