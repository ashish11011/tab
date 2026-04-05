import { getCategoryBySlug } from "@/lib/actions";
import { Suspense } from "react";
import { Packages } from "./packages";
import { CategoryFaqs } from "./catFaqs";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 60;

export async function generateStaticParams() {
    return [{ slug: 'spiti-valley-4d-5n' }]
}

export default async function Page({ params }: PageProps<"/category/[slug]">) {
    const { slug } = await params;
    if (!slug) {
        return <div>No Package found</div>
    }
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return <div>No Package found</div>
    }

    return (
        <div className=" py-12 md:px-16 px-4">
            <h1 className=" text-3xl font-bold">{category.name}</h1>
            <p className=" text-gray-600 mt-2">
                Explore our curated selection of packages for {category.name}.
                Discover unforgettable journeys and unique experiences.
            </p>

            <Suspense fallback={<PackageSkleton />} >
                <Packages catId={category.id} />
            </Suspense>
            <Suspense fallback={<CatFaqsSkleton />}>
                <CategoryFaqs catId={category.id} />
            </Suspense>
        </div>
    );
}


const PackageSkleton = () => {
    return (
        <div className=" mt-20 w-fit grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-[220px] w-[220px] rounded-lg" />
            <Skeleton className="h-[220px] w-[220px] rounded-lg" />
        </div>
    )
}

const CatFaqsSkleton = () => {
    return (
        <div className=" mt-20  flex flex-col gap-4">
            <Skeleton className="h-[20px] w-[90px] rounded-lg" />
            <Skeleton className="h-[20px] w-[220px] rounded-lg" />
        </div>
    )
}


