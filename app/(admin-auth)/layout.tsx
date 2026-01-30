export default function AdminAuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-center p-4">
            {children}
        </div>
    );
}
