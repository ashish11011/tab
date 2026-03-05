"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogCategory } from "@/lib/actions";
import { BlogCategoryForm } from "@/components/admin/blog-category-form";
import { BlogCategoryInput } from "@/lib/validators";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddBlogCategoryPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (data: BlogCategoryInput) => {
        setSubmitting(true);
        try {
            await createBlogCategory(data);
            toast.success("Blog category created successfully");
            router.push("/admin/blog-categories");
            router.refresh();
        } catch (error) {
            toast.error("Failed to create blog category");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Add Blog Category</h1>
                    <p className="text-muted-foreground">Create a category for blog organization</p>
                </div>
            </div>

            <div className="max-w-2xl bg-white p-6 border rounded-lg shadow-sm">
                <BlogCategoryForm onSubmit={handleSubmit} isLoading={submitting} />
            </div>
        </div>
    );
}
