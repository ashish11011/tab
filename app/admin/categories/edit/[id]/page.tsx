"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
    getCategoryById,
    updateCategory,
    getFaqsByCategoryId,
    saveCategoryFaqs
} from "@/lib/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { CategoryFaqForm } from "@/components/admin/category-faq-form";
import { CategoryInput, CategoryFaqInput } from "@/lib/validators";
import { toast } from "sonner";
import { ChevronLeft, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = Number(params.id);
    const currentTab = searchParams.get("tab") || "basic";

    const [initialData, setInitialData] = useState<any>(null);
    const [faqData, setFaqData] = useState<CategoryFaqInput[]>([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            Promise.all([
                getCategoryById(id),
                getFaqsByCategoryId(id)
            ]).then(([category, faqs]) => {
                if (category) {
                    setInitialData(category);
                    setFaqData(faqs);
                } else {
                    toast.error("Category not found");
                    router.push("/admin/categories");
                }
                setLoading(false);
            }).catch(err => {
                toast.error("Failed to load category details");
                setLoading(false);
            });
        }
    }, [id, router]);

    const handleTabChange = (value: string) => {
        router.push(`/admin/categories/edit/${id}?tab=${value}`);
    };

    const handleBasicSubmit = async (data: CategoryInput) => {
        setSubmitting(true);
        try {
            await updateCategory(id, data);
            toast.success("Category updated successfully");
        } catch (error) {
            toast.error("Failed to update category");
        } finally {
            setSubmitting(false);
        }
    };

    const handleFaqSubmit = async (data: CategoryFaqInput[]) => {
        setSubmitting(true);
        try {
            await saveCategoryFaqs(id, data);
            toast.success("FAQs updated successfully");
            setFaqData(data);
        } catch (error) {
            toast.error("Failed to update FAQs");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }
    return <></>
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push("/admin/categories")}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Edit Category</h1>
                    <p className="text-muted-foreground">Managing: {initialData?.name}</p>
                </div>
            </div>

            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="basic" className="gap-2">
                        <Info className="h-4 w-4" /> Basic Info
                    </TabsTrigger>
                    <TabsTrigger value="faqs" className="gap-2">
                        <HelpCircle className="h-4 w-4" /> FAQs
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="basic">
                        <div className="max-w-2xl bg-white p-6 border rounded-lg shadow-sm">
                            <CategoryForm initialData={initialData} onSubmit={handleBasicSubmit} isLoading={submitting} />
                        </div>
                    </TabsContent>

                    <TabsContent value="faqs">
                        <CategoryFaqForm categoryId={id} initialData={faqData} onSubmit={handleFaqSubmit} isLoading={submitting} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
