"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    Layers,
    MessageSquare,
    Settings,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Packages",
        href: "/admin/packages",
        icon: Package,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: Layers,
    },
    {
        title: "Queries",
        href: "/admin/queries",
        icon: MessageSquare,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-slate-50 border-r w-64">
            <div className="p-6">
                <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-slate-200 hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                        {pathname === item.href && (
                            <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </Button>
            </div>
        </div>
    );
}
