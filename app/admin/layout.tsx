import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <aside className="hidden md:flex h-screen sticky top-0">
                <AdminSidebar />
            </aside>
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b flex items-center px-6 bg-white shrink-0">
                    <h2 className="text-sm font-medium text-muted-foreground">Admin Panel</h2>
                </header>
                <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    );
}
