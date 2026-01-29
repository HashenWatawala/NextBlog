import AppNavbar from "@/components/layout/Navbar";

export default function HomePage() {
    return (
        <>
            <AppNavbar />

            <main className="p-6">
                <h1 className="text-2xl font-bold">Welcome to NextBlog</h1>
            </main>
        </>
    );
}

