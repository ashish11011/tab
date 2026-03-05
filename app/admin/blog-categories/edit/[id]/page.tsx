"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogCategoryById, updateBlogCategory } from "@/lib/actions";
import { BlogCategoryForm } from "@/components/admin/blog-category-form";
import { BlogCategoryInput } from "@/lib/validators";
import { toast } from "sonner";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditBlogCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<any>(null);

    useEffect(() => {
        if (id) {
            getBlogCategoryById(id).then((data) => {
                if (data) {
                    setCategory(data);
                } else {
                    toast.error("Category not found");
                    router.push("/admin/blog-categories");
                }
                setLoading(false);
            });
        }
    }, [id, router]);

    const handleSubmit = async (data: BlogCategoryInput) => {
        setSubmitting(true);
        try {
            await updateBlogCategory(id, data);
            toast.success("Blog category updated successfully");
            router.push("/admin/blog-categories");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update blog category");
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
                    <h1 className="text-3xl font-bold">Edit Blog Category</h1>
                    <p className="text-muted-foreground">Update blog category and SEO settings</p>
                </div>
            </div>

            <div className="max-w-2xl bg-white p-6 border rounded-lg shadow-sm">
                <BlogCategoryForm initialData={category} onSubmit={handleSubmit} isLoading={submitting} />
            </div>
        </div>
    );
}
