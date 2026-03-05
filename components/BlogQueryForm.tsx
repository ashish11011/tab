"use client";

import { useState } from "react";
import { submitQuery } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BlogQueryFormProps {
    slug: string;
}

export function BlogQueryForm({ slug }: BlogQueryFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        const formData = new FormData(e.currentTarget);

        try {
            await submitQuery({
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                message: formData.get("message") as string,
                slug: `/blog/${slug}`,
            });

            setIsSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            setError(err.message || "Failed to submit query. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Have a Question?</h3>
            <p className="text-neutral-500 text-sm mb-6">
                Send us a message and our travel experts will get back to you shortly.
            </p>

            {isSuccess ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200">
                    <p className="font-medium">Thank you!</p>
                    <p className="text-sm mt-1">Your query has been submitted successfully.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    <div>
                        <Input
                            name="name"
                            placeholder="Your Name"
                            required
                            disabled={isLoading}
                            className="bg-white"
                        />
                    </div>
                    <div>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            required
                            disabled={isLoading}
                            className="bg-white"
                        />
                    </div>
                    <div>
                        <Input
                            name="phone"
                            type="tel"
                            placeholder="Phone Number"
                            required
                            disabled={isLoading}
                            className="bg-white"
                        />
                    </div>
                    <div>
                        <Textarea
                            name="message"
                            placeholder="How can we help you?"
                            required
                            disabled={isLoading}
                            className="min-h-[120px] bg-white resize-none"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit Query"}
                    </Button>
                </form>
            )}
        </div>
    );
}
