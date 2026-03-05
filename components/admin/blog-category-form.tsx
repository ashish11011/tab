"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogCategorySchema, type BlogCategoryInput } from "@/lib/validators";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

interface BlogCategoryFormProps {
    initialData?: BlogCategoryInput;
    onSubmit: (data: BlogCategoryInput) => void;
    isLoading: boolean;
}

export function BlogCategoryForm({ initialData, onSubmit, isLoading }: BlogCategoryFormProps) {
    const form = useForm<BlogCategoryInput>({
        resolver: zodResolver(blogCategorySchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        }
    }, [initialData, form]);

    const name = form.watch("name");
    useEffect(() => {
        if (name && !initialData) {
            const slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            form.setValue("slug", slug);
        }
    }, [name, form, initialData]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Adventure Travel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input placeholder="adventure-travel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-3">SEO Details</h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="metaTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="SEO Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="SEO Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="metaKeywords"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Keywords</FormLabel>
                                    <FormControl>
                                        <Input placeholder="travel, blog, adventure" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
