import PackageCard from "@/components/PackageCard"
import { getPackagesByCategoryId } from "@/lib/actions"

export const Packages = async ({ catId }: any) => {
    const packages = await getPackagesByCategoryId(catId)
    return (
        <div className=" mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.length > 0 ? (
                packages.map((pkg: any) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500 py-12">No packages found for this category.</p>
            )}
        </div>
    )
}