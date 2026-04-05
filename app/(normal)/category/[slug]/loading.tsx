import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-10 space-y-8">

            {/* Heading */}
            <div className="space-y-3">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-4 w-[420px] max-w-full" />
            </div>

        </div >
    );
}