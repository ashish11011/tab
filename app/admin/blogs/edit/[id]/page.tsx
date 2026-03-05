"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogById, updateBlog } from "@/lib/actions";
import { BlogForm } from "@/components/admin/blog-form";
import { BlogInput } from "@/lib/validators";
import { toast } from "sonner";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<any>(null);

    useEffect(() => {
        if (id) {
            getBlogById(id).then((data) => {
                if (data) {
                    setBlog(data);
                } else {
                    toast.error("Blog not found");
                    router.push("/admin/blogs");
                }
                setLoading(false);
            });
        }
    }, [id, router]);

    const handleSubmit = async (data: BlogInput) => {
        setSubmitting(true);
        try {
            await updateBlog(id, data);
            toast.success("Blog updated successfully");
            router.push("/admin/blogs");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update blog");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Edit Blog</h1>
                    <p className="text-muted-foreground">Update your blog post content</p>
                </div>
            </div>

            <BlogForm initialData={blog} onSubmit={handleSubmit} isLoading={submitting} />
        </div>
    );
}
