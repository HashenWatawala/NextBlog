import AppNavbar from "@/components/layout/Navbar"
import Link from "next/link"


export default function HomePage() {
    return (
        <>
            <AppNavbar />

            {/* Hero Section */}
            <section
  className="relative min-h-screen border-b bg-cover bg-center flex items-center"
  style={{
    backgroundImage: "url('/images/Hero-section.jpg')",
  }}
>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Write. Share. Inspire.
                    </h1>

                    <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
                        NextBlog is a modern blogging platform where ideas turn into impact.
                        Share your thoughts, explore stories, and grow your audience.
                    </p>

                    <div className="mt-10 flex justify-center gap-4">
                        <Link
                            href="/blog"
                            className="rounded-md bg-white px-6 py-3 text-black font-medium hover:bg-gray-200 transition"
                        >
                            Read Blogs
                        </Link>

                        <Link
                            href="/contact"
                            className="rounded-md border border-white px-6 py-3 font-medium hover:bg-white hover:text-black transition"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
                <p className="text-gray-600">
                    Coming soon…
                </p>
            </main>
        </>
    )
}
