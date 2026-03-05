"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formQuerySchema, type FormQueryInput } from "@/lib/validators";
import { submitQuery } from "@/lib/actions";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

export const LeadPopupForm = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
    const pathname = usePathname();
    const slug = pathname === "/" ? "home" : pathname.split("/").pop() || "home";

    const form = useForm<FormQueryInput>({
        resolver: zodResolver(formQuerySchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            slug: slug === "home" ? "/" : `/${slug}`,
        },
    });

    const onSubmit = async (data: FormQueryInput) => {
        try {
            await submitQuery(data);
            toast.success("Query submitted successfully!");
            form.reset();
            setOpen(false);
        } catch (error) {
            toast.error("Failed to submit query. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className=" flex gap-1 items-center"><p>Excited for your new adventure?</p> <img src="/excited.png" alt="header" className="size-6 object-cover" /></DialogTitle>
                    <DialogDescription>We have the best price for you</DialogDescription>
                </DialogHeader>
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
                                        <Textarea placeholder="Enter your message" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className=" h-12 w-full text-xl font-semibold" type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}