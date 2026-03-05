"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, type BlogInput } from "@/lib/validators";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { getBlogCategories } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "./image-upload";
import { RichTextEditor } from "./rich-text-editor";

interface BlogFormProps {
    initialData?: any;
    onSubmit: (data: BlogInput) => void;
    isLoading: boolean;
}

export function BlogForm({ initialData, onSubmit, isLoading }: BlogFormProps) {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        getBlogCategories().then(setCategories);
    }, []);

    const form = useForm<BlogInput>({
        resolver: zodResolver(blogSchema),
        defaultValues: initialData || {
            title: "",
            slug: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
            description: "",
            content: "",
            image: "",
            userName: "",
            userPosition: "",
            categoryIds: [],
        },
    });

    const title = form.watch("title");
    useEffect(() => {
        if (title && !initialData) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            form.setValue("slug", slug);
        }
    }, [title, form, initialData]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Blog Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Exploring the Hidden Gems of Spiti" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="exploring-hidden-gems-spiti" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Featured Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            label="Blog Image"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="A brief overview to entice readers..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Author Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userPosition"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author Position</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Travel Expert" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Content & SEO</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blog Content</FormLabel>
                                    <FormControl>
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Write your blog post here..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium">SEO Details</h3>
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
                                            <Input placeholder="travel, adventure, spiti" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        <FormField
                            control={form.control}
                            name="categoryIds"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Categories</FormLabel>
                                        <FormDescription>
                                            Select categories for this blog.
                                        </FormDescription>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {categories.map((category: any) => (
                                            <FormField
                                                key={category.id}
                                                control={form.control}
                                                name="categoryIds"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={category.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(category.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, category.id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== category.id
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal cursor-pointer">
                                                                {category.name}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : initialData ? "Update Blog" : "Create Blog"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
