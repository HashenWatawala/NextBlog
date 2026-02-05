"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { Loader2, Calendar, Clock } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  coverImageUrl?: string;
  createdAt: any;
  category: string;
  readTime?: string;
  slug: string;
  status: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      limit(10) // Fetch a few more to filter published
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Post))
        .filter(post => post.status === "published")
        .slice(0, 4); // We only need 4 for the home page

      setPosts(fetchedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching homepage posts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const featuredPost = posts[0];
  const latestPosts = posts.slice(1, 4);

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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-gray-500 font-medium">Loading amazing stories...</p>
            </div>
          ) : (
            <>
              {featuredPost && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Featured Post</h2>
                  <div className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* Left Image */}
                    <div className="md:w-1/3 overflow-hidden">
                      <img
                        src={featuredPost.coverImageUrl || "/images/Most-popular.jpg"}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Right Content */}
                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-sm text-blue-600 font-semibold">
                          {featuredPost.category}
                        </span>

                        <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                          {featuredPost.title}
                        </h3>

                        <p className="mt-3 text-gray-600 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.createdAt?.seconds ? new Date(featuredPost.createdAt.seconds * 1000).toLocaleDateString() : "Just now"} · {featuredPost.readTime || "5 min read"}
                        </span>

                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="text-sm font-semibold text-blue-600 hover:underline"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {latestPosts.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {latestPosts.map((post) => (
                      <div key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="overflow-hidden">
                          <img
                            src={post.coverImageUrl || "/images/post-1.jpg"}
                            alt={post.title}
                            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="p-5">
                          <span className="text-sm text-blue-600 font-semibold">
                            {post.category}
                          </span>

                          <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                            {post.title}
                          </h3>

                          <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Just now"}
                            </span>
                            <Link href={`/blog/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                              Read →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </Container>
    </>
  )
}
