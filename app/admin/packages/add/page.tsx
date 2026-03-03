"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPackage } from "@/lib/actions";
import { PackageForm } from "@/components/admin/package-form";
import { PackageInput } from "@/lib/validators";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddPackagePage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (data: PackageInput) => {
        setSubmitting(true);
        try {
            const result = await createPackage(data);
            toast.success("Package basic info saved");
            router.push(`/admin/packages/edit/${result.id}?tab=pricing`);
        } catch (error) {
            toast.error("Failed to create package");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Add New Package</h1>
                    <p className="text-muted-foreground">Create a fresh travel experience</p>
                </div>
            </div>

            <PackageForm onSubmit={handleSubmit} isLoading={submitting} />
        </div>
    );
}
