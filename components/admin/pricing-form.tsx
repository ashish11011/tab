"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priceTitleSchema, type PriceTitleInput } from "@/lib/validators";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";

const pricingListSchema = z.object({
    pricing: z.array(priceTitleSchema)
});

type PricingListInput = z.infer<typeof pricingListSchema>;

interface PricingFormProps {
    packageId: number;
    initialData?: PriceTitleInput[];
    onSubmit: (data: PriceTitleInput[]) => void;
    isLoading: boolean;
}

export function PricingForm({ packageId, initialData, onSubmit, isLoading }: PricingFormProps) {
    const form = useForm<PricingListInput>({
        resolver: zodResolver(pricingListSchema),
        defaultValues: {
            pricing: initialData?.length ? initialData : [{ packageId, title: "", price: 0, strikeThroughPrice: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "pricing",
    });

    const handleSubmit = (data: PricingListInput) => {
        onSubmit(data.pricing);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Pricing Slabs</CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => append({ packageId, title: "", price: 0, strikeThroughPrice: 0 })}
                        >
                            <Plus className="h-4 w-4" /> Add Slab
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg relative bg-white">
                                <FormField
                                    control={form.control}
                                    name={`pricing.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Standard / Premium / Deluxe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`pricing.${index}.price`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-end gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`pricing.${index}.strikeThroughPrice`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Strike Price</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Pricing"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
