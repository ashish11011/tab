"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { packageMediaSchema, type PackageMediaInput } from "@/lib/validators";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Film } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import { z } from "zod";

const mediaListSchema = z.object({
    media: z.array(packageMediaSchema)
});

type MediaListInput = z.infer<typeof mediaListSchema>;

interface MediaFormProps {
    packageId: number;
    initialData?: PackageMediaInput[];
    onSubmit: (data: PackageMediaInput[]) => void;
    isLoading: boolean;
}

export function MediaForm({ packageId, initialData, onSubmit, isLoading }: MediaFormProps) {
    const form = useForm<MediaListInput>({
        resolver: zodResolver(mediaListSchema),
        defaultValues: {
            media: initialData?.length ? initialData : [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "media",
    });

    const handleSubmit = (data: MediaListInput) => {
        onSubmit(data.media);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Package Media</CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => append({ packageId, mediaUrl: "", type: "image" })}
                        >
                            <Plus className="h-4 w-4" /> Add Media
                        </Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 border rounded-lg bg-white space-y-4 relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <FormField
                                    control={form.control}
                                    name={`media.${index}.type`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Media Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="image">Image</SelectItem>
                                                    <SelectItem value="video">Video</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`media.${index}.mediaUrl`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Media File</FormLabel>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label={`Media ${index + 1}`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        {fields.length === 0 && (
                            <div className="col-span-2 py-10 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-slate-50/50">
                                <Film className="h-10 w-10 mb-2 opacity-20" />
                                <p>No additional media added yet.</p>
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={() => append({ packageId, mediaUrl: "", type: "image" })}
                                >
                                    Add your first image or video
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Media"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
