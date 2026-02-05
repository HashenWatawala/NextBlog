'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

export function Navbar({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <nav className={clsx(
            "sticky top-0 z-50 px-4 py-3 bg-white border-b border-gray-200",
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
    const { user, userData, loading } = useAuth()

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

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

                    <div className="w-px h-5 bg-gray-200 mx-2" />

                    {!loading && (
                        user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/admin/dashboard" className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <UserIcon size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {userData?.name || user.displayName || 'Member'}
                                        </span>
                                        <span className="text-[10px] text-gray-500">Dashboard</span>
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/admin/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                                    Login
                                </Link>
                                <Link href="/admin/signup" className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                                    Sign Up
                                </Link>
                            </div>
                        )
                    )}
                </NavbarSection>
            </div>

            {/* Mobile menu */}
            {open && (
                <NavbarSection className="mt-4 flex flex-col gap-4 md:hidden border-t pt-4">
                    <NavbarItem href="/" current>Home</NavbarItem>
                    <NavbarItem href="/blog">Blog</NavbarItem>
                    <NavbarItem href="/tags">Tags</NavbarItem>
                    <NavbarItem href="/about">About</NavbarItem>
                    <NavbarItem href="/contact">Contact</NavbarItem>

                    {!loading && (
                        user ? (
                            <div className="flex flex-col gap-4 pt-2">
                                <Link href="/admin/dashboard" className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <UserIcon size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900">{userData?.name || user.displayName || 'Member'}</span>
                                        <span className="text-xs text-gray-500">View Dashboard</span>
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-2 text-sm text-red-600 font-medium"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 pt-2">
                                <Link href="/admin/login" className="w-full text-center py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg">
                                    Login
                                </Link>
                                <Link href="/admin/signup" className="w-full text-center py-2 bg-black text-white rounded-lg text-sm font-medium">
                                    Sign Up
                                </Link>
                            </div>
                        )
                    )}
                </NavbarSection>
            )}
        </Navbar>
    )
}
