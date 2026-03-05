import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-10 space-y-8">

            {/* Heading */}
            <div className="space-y-3">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-4 w-[420px] max-w-full" />
            </div>

            {/* Card */}
            <div className="max-w-xl">
                <div className="border rounded-xl p-4 space-y-4">

                    {/* Image */}
                    <div className="relative">
                        <Skeleton className="h-[220px] w-full rounded-lg" />

                        {/* Price badge */}
                        <Skeleton className="absolute top-3 right-3 h-7 w-20 rounded-full" />
                    </div>

                    {/* Package details */}
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-6 w-60" />
                        <Skeleton className="h-5 w-32 rounded-full" />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-10 flex-1 rounded-lg" />
                    </div>

                </div>
            </div>

        </div>
    );
}