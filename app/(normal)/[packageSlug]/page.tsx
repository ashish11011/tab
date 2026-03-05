import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPackageBySlug } from "@/lib/actions";
import { HeaderGallaryMobile } from "@/components/package-details/header-gallery-mobile";
import { TripItinerary } from "@/components/package-details/trip-itinerary";
import { PackageEnquiryForm } from "@/components/package-details/package-enquiry-form";

interface PackagePageProps {
    params: Promise<{ packageSlug: string }>;
}

export default async function PackagePage({ params }: PackagePageProps) {
    const { packageSlug } = await params;
    const pkg = await getPackageBySlug(packageSlug);

    if (!pkg) {
        return notFound();
    }

    return (
        <div className="lg:px-12 px-4 py-12">
            <HeaderGallary media={pkg.media} />
            <HeaderGallaryMobile images={pkg.media} />

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
                </div>

                <div className="col-span-6 md:col-span-2 space-y-6">
                    <PackagePriceCard
                        price={pkg.price}
                        strikeThroughPrice={pkg.strikeThroughPrice}
                    />
                    <PackageEnquiryForm slug={pkg.slug} />
                </div>
            </div>
        </div>
    );
}

const HeaderGallary = ({ media }: { media: any[] }) => {
    if (media.length === 0) return null;

    // Use current images or placeholders if not enough
    const displayImages = [...media];
    while (displayImages.length < 5) {
        displayImages.push(displayImages[0]);
    }

    return (
        <div className="hidden md:grid aspect-22/7 w-full grid-cols-2 gap-3 overflow-hidden rounded-2xl">
            <img src={displayImages[0].mediaUrl} alt="header main" className="aspect-22/16 w-full h-full object-cover" />
            <div className="grid grid-cols-1 aspect-22/14 grid-rows-2 gap-3">
                <div className="grid grid-cols-2 overflow-hidden gap-3">
                    <img src={displayImages[1].mediaUrl} alt="gallery" className="w-full h-full object-cover" />
                    <img src={displayImages[2].mediaUrl} alt="gallery" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-2 overflow-hidden gap-3">
                    <img src={displayImages[3].mediaUrl} alt="gallery" className="w-full h-full object-cover" />
                    <img src={displayImages[4].mediaUrl} alt="gallery" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}

const TripAbout = ({ name, about, itineraryUrl }: { name: string; about: string; itineraryUrl: string }) => {
    return (
        <div className="space-y-4">
            <div className="flex md:flex-row flex-col gap-3 justify-between items-start">
                <Heading text={`About ${name}`} />
                {itineraryUrl && (
                    <a href={itineraryUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="rounded-full cursor-pointer font-medium shadow-sm">
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
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700">
                        <span className="mr-2">✓</span> Package Includes
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: included }}
                        className="text-sm prose prose-sm max-w-none prose-ul:list-disc"
                    />
                </div>
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
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
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">₹{price.toLocaleString()}</span>
                    {strikeThroughPrice > price && (
                        <span className="text-gray-400 line-through text-lg">₹{strikeThroughPrice.toLocaleString()}</span>
                    )}
                </div>
                {discount > 0 && (
                    <div className="text-sm font-medium text-green-600">Save ₹{discount.toLocaleString()}!</div>
                )}
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