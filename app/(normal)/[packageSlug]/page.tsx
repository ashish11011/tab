import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPackageBySlug } from "@/lib/actions";
import { HeaderGallaryMobile } from "@/components/package-details/header-gallery-mobile";
import { TripItinerary } from "@/components/package-details/trip-itinerary";
import { PackageEnquiryForm } from "@/components/package-details/package-enquiry-form";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


export async function generateStaticParams() {
    return [{ slug: 'spiti-valley-4d-5n' }]
}

export default async function PackagePage({ params }: PageProps<"/[packageSlug]">) {
    const { packageSlug } = await params;
    const pkg = await getPackageBySlug(packageSlug);

    if (!pkg) {
        return notFound();
    }

    return (
        <div className="lg:px-12 px-4 py-12">
            <HeaderGallary media={pkg.mainBannerImage} mobile={pkg.mainMobileBannerImage} />
            {/* <HeaderGallaryMobile images={pkg.media} /> */}

            <div className="grid grid-cols-1 md:grid-cols-6 mt-8 gap-6">
                <div className="space-y-6 col-span-6 md:col-span-4">
                    <TripAbout
                        name={pkg.name}
                        about={pkg.about}
                        itineraryUrl={pkg.itineraryUrl}
                    />
                    <TripItinerary itinerary={pkg.itinerary} />
                    <PackageIncludeExclude
                        included={pkg.included}
                        excluded={pkg.excluded}
                    />
                    {pkg.pricing && pkg.pricing.length > 0 && (
                        <PackageCosting pricing={pkg.pricing} />
                    )}
                    {pkg.media.length > 0 && <PackageGallary mediaImages={pkg.media} />}

                </div>

                <div className="col-span-6 h-full md:col-span-2 space-y-6">
                    <PackageEnquiryForm
                        price={pkg.price}
                        strikeThroughPrice={pkg.strikeThroughPrice}
                        slug={pkg.slug}
                    />
                </div>
            </div>
        </div>
    );
}

const HeaderGallary = ({ media, mobile }: { media: string, mobile: string }) => {
    if (media == null || media == undefined) return null;
    console.log(media)
    return (
        <div className="w-full h-auto object-contain">
            <img src={media} height={750} width={750} alt="banner-image" className=" hidden md:block w-full h-auto object-contain" />
            <img src={mobile} height={750} width={750} alt="banner-image" className=" md:hidden w-full h-auto object-contain" />
        </div>
    );
}

const TripAbout = ({ name, about, itineraryUrl }: { name: string; about: string; itineraryUrl: string }) => {
    return (
        <div className="space-y-4">
            <div className="flex md:flex-row  flex-col gap-3 justify-between items-start">
                <Heading text={`About ${name}`} />
                {itineraryUrl && (
                    <a href={itineraryUrl} target="_blank" className=" w-full sm:w-fit" rel="noopener noreferrer">
                        <Button className="rounded-full w-full cursor-pointer font-medium shadow-sm">
                            <Download className="size-4 mr-2" />
                            Download Itinerary
                        </Button>
                    </a>
                )}
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: about }}
                className="text-gray-800 text-sm prose prose-sm max-w-none"
            />
        </div>
    );
}

const PackageIncludeExclude = ({ included, excluded }: { included: string; excluded: string }) => {
    return (
        <div className="mt-8">
            <Heading text="Package Includes & Excludes" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="bg-gray-50/50 h-fit p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700">
                        <span className="mr-2">✓</span> Package Includes
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: included }}
                        className="text-sm prose prose-sm max-w-none prose-ul:list-disc"
                    />
                </div>
                <div className="bg-gray-50/50 h-fit p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-red-700">
                        <span className="mr-2">✕</span> Package Excludes
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: excluded }}
                        className="text-sm prose prose-sm max-w-none prose-ul:list-disc"
                    />
                </div>
            </div>
        </div>
    );
}

const PackagePriceCard = ({ price, strikeThroughPrice }: { price: number; strikeThroughPrice: number }) => {
    const discount = strikeThroughPrice - price;

    return (
        <Card className="shadow-sm border-gray-100 overflow-hidden">
            <CardHeader className="bg-gray-50/50 flex flex-col gap-1 pb-4">

            </CardHeader>
            <CardContent className="pt-4">
                <p className="text-xs text-center text-gray-500 mb-4">Price per person (Triple Sharing)</p>
                <div className="h-px bg-gray-100 mb-4" />
                <Button className="h-12 w-full text-lg font-semibold" size="lg">
                    Book Now
                </Button>
            </CardContent>
        </Card>
    );
}

const PackageCosting = ({ pricing }: { pricing: any[] }) => {
    return (
        <div className="mt-8">
            <Heading text="Detailed Pricing" />
            <div className="mt-6 border overflow-hidden rounded-2xl shadow-sm border-gray-200">
                <div className="grid grid-cols-7 bg-gray-50 text-center font-semibold text-gray-700">
                    <p className="py-4 px-4 col-span-4 border-r">Occupancy Mode</p>
                    <p className="py-4 px-4 col-span-3">Starting Price</p>
                </div>
                <div className="divide-y divide-gray-100">
                    {pricing.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-7 text-center hover:bg-gray-50/50 transition-colors">
                            <p className="py-4 px-4 col-span-4 border-r text-gray-800">{item.title}</p>
                            <p className="py-4 px-4 col-span-3 font-semibold text-primary">₹{item.price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const Heading = ({ text }: { text: string }) => {
    return (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">{text}</h2>
    );
}
const PackageGallary = ({ mediaImages }: { mediaImages: any[] }) => {
    return (
        <div>
            <Carousel>
                <CarouselContent>
                    {
                        mediaImages.map((mediaURL: any) => {
                            return <CarouselItem key={mediaURL.id} className="  min-w-96 md:min-w-none basis-1 md:basis-1/3">
                                <img className=" rounded-xs w-full h-auto min-h-52 border" src={mediaURL.mediaUrl} />
                            </CarouselItem>
                        })
                    }
                </CarouselContent>
                <CarouselNext className="right-4 z-10 bg-white" />
                <CarouselPrevious className="left-4 z-10 bg-white" />
            </Carousel>
        </div>
    )
}