"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFaqSchema, type CategoryFaqInput } from "@/lib/validators";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

const faqListSchema = z.object({
    faqs: z.array(categoryFaqSchema)
});

type FaqListInput = z.infer<typeof faqListSchema>;

interface CategoryFaqFormProps {
    categoryId: number;
    initialData?: CategoryFaqInput[];
    onSubmit: (data: CategoryFaqInput[]) => void;
    isLoading: boolean;
}

export function CategoryFaqForm({ categoryId, initialData, onSubmit, isLoading }: CategoryFaqFormProps) {
    const form = useForm<FaqListInput>({
        resolver: zodResolver(faqListSchema),
        defaultValues: {
            faqs: initialData?.length ? initialData : [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "faqs",
    });

    const handleSubmit = (data: FaqListInput) => {
        onSubmit(data.faqs.map(f => ({ ...f, categoryId })));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Category FAQs</CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => append({ question: "", answer: "" })}
                        >
                            <Plus className="h-4 w-4" /> Add FAQ
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-6 border rounded-xl relative bg-white shadow-sm space-y-4 group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive h-8 w-8"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 font-semibold text-primary mb-2">
                                    <HelpCircle className="h-5 w-5" />
                                    <span>FAQ #{index + 1}</span>
                                </div>
                                <FormField
                                    control={form.control}
                                    name={`faqs.${index}.question`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question</FormLabel>
                                            <FormControl>
                                                <Input placeholder="What is the best time to visit?" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`faqs.${index}.answer`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Answer</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="The best time to visit is during..." className="min-h-[100px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        {fields.length === 0 && (
                            <div className="py-10 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-slate-50/50">
                                <HelpCircle className="h-10 w-10 mb-2 opacity-20" />
                                <p>No FAQs added yet.</p>
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={() => append({ question: "", answer: "" })}
                                >
                                    Add your first FAQ
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save FAQs"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
