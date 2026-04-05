import { getPackagesByCategoryId } from "@/lib/actions";
import PackageCard from "./PackageCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default async function PackageCrousel() {
    const packages = await getPackagesByCategoryId(12);

    return (
        <div className=" max-w-7xl px-4 mx-auto">
            <div >
                <h2 className=" text-2xl font-semibold">Popular Packages</h2>
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full md:px-6 mt-8 "
            >
                <CarouselContent>
                    {packages.map((pkg, index) => (
                        <CarouselItem key={index} className=" basis-[300px] sm:basis-1/2 md:basis-[372px] ">
                            <PackageCard pkg={pkg} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className=" left-0 -translate-x-1/2" />
                <CarouselNext className=" right-0 translate-x-1/2" />
            </Carousel>
        </div>
    );
}