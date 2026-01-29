'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'
import { Menu, X } from 'lucide-react' // icons

export function Navbar({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <nav className={clsx(
            "px-4 py-3 bg-white border-b border-gray-200",
            className
        )}>
            {children}
        </nav>
    )
}

export function NavbarSection({ children, className }: { children: ReactNode, className?: string }) {
    return <div className={clsx(className)}>{children}</div>
}

export function NavbarItem({ href, current, children }: { href: string, current?: boolean, children: ReactNode }) {
    return (
        <Link
            href={href}
            className={clsx(
                "text-sm font-medium transition-colors",
                current ? "text-black" : "text-gray-500 hover:text-gray-900"
            )}
        >
            {children}
        </Link>
    )
}

export default function AppNavbar() {
    const [open, setOpen] = useState(false)

    return (
        <Navbar>
            {/* Top bar */}
            <div className="flex items-center justify-between">
                <Link href="/" className="font-bold text-lg">
                    NextBlog
                </Link>

                {/* Mobile toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop menu */}
                <NavbarSection className="hidden md:flex items-center gap-6">
                    <NavbarItem href="/" current>Home</NavbarItem>
                    <NavbarItem href="/blog">Blog</NavbarItem>
                    <NavbarItem href="/tags">Tags</NavbarItem>
                    <NavbarItem href="/about">About</NavbarItem>
                    <NavbarItem href="/contact">Contact</NavbarItem>
                </NavbarSection>
            </div>

            {/* Mobile menu */}
            {open && (
                <NavbarSection className="mt-4 flex flex-col gap-4 md:hidden">
                    <NavbarItem href="/" current>Home</NavbarItem>
                    <NavbarItem href="/blog">Blog</NavbarItem>
                    <NavbarItem href="/tags">Tags</NavbarItem>
                    <NavbarItem href="/about">About</NavbarItem>
                    <NavbarItem href="/contact">Contact</NavbarItem>
                </NavbarSection>
            )}
        </Navbar>
    )
}
