import Link from "next/link"
import Container from "@/components/layout/Container"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] border-b bg-cover bg-center flex items-center"
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
      <Container className="py-12">
        <main>
          <h2 className="text-2xl font-bold mb-4">Most Popular Posts</h2>
          <p className="text-gray-600 pb-4">
            Most Popular Posts
          </p>
          <div className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

            {/* Left Image */}
            <div className="md:w-1/3 overflow-hidden">
              <img
                src="/images/Most-popular.jpg"
                alt="Popular post"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Right Content */}
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <span className="text-sm text-blue-600 font-semibold">
                  Most Popular
                </span>

                <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                  How to Build a Modern Blog with Next.js & Tailwind
                </h3>

                <p className="mt-3 text-gray-600 line-clamp-3">
                  Learn how to create a fast, modern, and scalable blogging platform
                  using Next.js, Tailwind CSS, and best UI practices.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  📅 Aug 12, 2025 · 5 min read
                </span>

                <Link
                  href="/blog/modern-blog"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* Card 1 */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="overflow-hidden">
                  <img
                    src="/images/post-1.jpg"
                    alt="Latest post"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <span className="text-sm text-blue-600 font-semibold">
                    Latest
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                    Mastering Tailwind CSS in 2025
                  </h3>

                  <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    Learn advanced Tailwind CSS techniques to build beautiful,
                    responsive, and scalable UIs faster than ever.
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>📅 Aug 20, 2025</span>
                    <Link href="/blog/tailwind-2025" className="text-blue-600 font-medium hover:underline">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="overflow-hidden">
                  <img
                    src="/images/post-2.jpg"
                    alt="Latest post"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <span className="text-sm text-blue-600 font-semibold">
                    Latest
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                    Next.js App Router Explained
                  </h3>

                  <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    Understand the new App Router in Next.js with real-world examples
                    and best practices.
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>📅 Aug 18, 2025</span>
                    <Link href="/blog/nextjs-router" className="text-blue-600 font-medium hover:underline">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="overflow-hidden">
                  <img
                    src="/images/post-3.jpg"
                    alt="Latest post"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <span className="text-sm text-blue-600 font-semibold">
                    Latest
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                    Blogging SEO Tips That Actually Work
                  </h3>

                  <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    Boost your blog traffic with proven SEO strategies designed
                    specifically for content creators.
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>📅 Aug 15, 2025</span>
                    <Link href="/blog/seo-tips" className="text-blue-600 font-medium hover:underline">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Container>
    </>
  )
}
