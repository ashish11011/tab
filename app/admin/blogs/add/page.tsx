"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/lib/actions";
import { BlogForm } from "@/components/admin/blog-form";
import { BlogInput } from "@/lib/validators";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddBlogPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (data: BlogInput) => {
        setSubmitting(true);
        try {
            await createBlog(data);
            toast.success("Blog created successfully");
            router.push("/admin/blogs");
            router.refresh();
        } catch (error) {
            console.error("error submitting blog", error);
            toast.error("Failed to create blog");
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
                    <h1 className="text-3xl font-bold">Add New Blog</h1>
                    <p className="text-muted-foreground">Share a new travel story or guide</p>
                </div>
            </div>

            <BlogForm onSubmit={handleSubmit} isLoading={submitting} />
        </div>
    );
}
