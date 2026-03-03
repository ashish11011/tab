"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itinerarySchema, type ItineraryInput } from "@/lib/validators";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

const itineraryListSchema = z.object({
    itinerary: z.array(itinerarySchema)
});

type ItineraryListInput = z.infer<typeof itineraryListSchema>;

interface ItineraryFormProps {
    packageId: number;
    initialData?: ItineraryInput[];
    onSubmit: (data: ItineraryInput[]) => void;
    isLoading: boolean;
}

export function ItineraryForm({ packageId, initialData, onSubmit, isLoading }: ItineraryFormProps) {
    const form = useForm<ItineraryListInput>({
        resolver: zodResolver(itineraryListSchema),
        defaultValues: {
            itinerary: initialData?.length ? initialData : [{ packageId, day: 1, title: "", description: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "itinerary",
    });

    const handleSubmit = (data: ItineraryListInput) => {
        onSubmit(data.itinerary);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Day-wise Itinerary</CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => append({ packageId, day: fields.length + 1, title: "", description: "" })}
                        >
                            <Plus className="h-4 w-4" /> Add Day
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-6 border rounded-xl relative bg-white shadow-sm space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 font-semibold text-primary">
                                        <Calendar className="h-5 w-5" />
                                        <span>Day {form.watch(`itinerary.${index}.day`)}</span>
                                    </div>
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
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`itinerary.${index}.day`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Day #</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`itinerary.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-5">
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Arrival and Check-in" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name={`itinerary.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Details about the day's activities..." className="min-h-[100px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Itinerary"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
