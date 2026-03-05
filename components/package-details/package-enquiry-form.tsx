"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formQuerySchema, type FormQueryInput } from "@/lib/validators";
import { submitQuery } from "@/lib/actions";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface PackageEnquiryFormProps {
    slug: string;
}

export function PackageEnquiryForm({ slug }: PackageEnquiryFormProps) {
    const form = useForm<FormQueryInput>({
        resolver: zodResolver(formQuerySchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            slug: slug,
        },
    });

    const onSubmit = async (data: FormQueryInput) => {
        try {
            await submitQuery(data);
            toast.success("Query submitted successfully!");
            form.reset();
        } catch (error) {
            toast.error("Failed to submit query. Please try again.");
        }
    };

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-xl">Inquire about this package</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your message" className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="h-12 w-full mt-2 text-lg font-semibold" type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Submitting..." : "Submit Inquiry"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
