"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/lib/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { CategoryInput } from "@/lib/validators";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddCategoryPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (data: CategoryInput) => {
        setSubmitting(true);
        try {
            const result = await createCategory(data);
            toast.success("Category basic info saved");
            router.push(`/admin/categories/edit/${result.id}?tab=faqs`);
        } catch (error) {
            toast.error("Failed to create category");
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
                    <h1 className="text-3xl font-bold">Add New Category</h1>
                    <p className="text-muted-foreground">Create a fresh travel category</p>
                </div>
            </div>

            <div className="max-w-2xl bg-white p-6 border rounded-lg shadow-sm">
                <CategoryForm onSubmit={handleSubmit} isLoading={submitting} />
            </div>
        </div>
    );
}
