import { MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PackageCard({ pkg }: { pkg?: any }) {
    if (!pkg) {
        return (
            <Link href="/package" className=" w-full max-w-sm bg-white ">
                {/* Image Section */}
                <div className="relative rounded-xl overflow-hidden">
                    <img
                        src="/trip/ladakh.webp"
                        alt="Ladakh Tour"
                        className="h-52 w-full object-cover"
                    />
                    {/* Badge */}
                    <div className="absolute font-semibold text-sm top-3 right-3 bg-white text-primary px-3 py-1 rounded-full ">
                        <span> Rs. 7,999</span>
                        &nbsp;
                        <span className="text-xs text-gray-400 line-through">
                            9,999
                        </span>
                    </div>
                </div>
                {/* Content */}
                <div className="py-4 space-y-2">
                    <p className="text-xs text-gray-500">⏳ 7 nights / 8 days</p>
                    <h3 className="text-lg font-medium leading-snug">Ladakh Apricot Blossom Tour Package</h3>
                    <p className=" bg-linear-to-b from-primary/20 to-transparent px-2 py-1 rounded-md text-sm flex gap-1 items-center text-gray-500">
                        <MapPin size={16} /> Spiti vally
                    </p>
                    <p className="text-sm text-gray-500">📅 Apr 3, Apr 11</p>
                    <div className="  pt-2 flex w-full gap-2">
                        <Button variant={"outline"} className=" hidden sm:flex border-primary text-primary">
                            <Phone size={18} />
                        </Button>
                        <Button className=" text-lg font-semibold flex-1 ">Request Callback</Button>
                    </div>
                </div>
            </Link>
        );
    }

    const { name, price, strikeThroughPrice, slug, location, mainBannerImage } = pkg;

    return (
        <Link href={`/${slug}`} className=" w-full max-w-sm bg-white block">
            {/* Image Section */}
            <div className="relative rounded-xl overflow-hidden">
                <img
                    src={mainBannerImage || (pkg.media?.[0]?.mediaUrl) || "/trip/ladakh.webp"}
                    alt={name}
                    className="h-52 w-full object-cover"
                />

                {/* Badge */}
                <div className="absolute font-semibold text-sm top-3 right-3 bg-white text-primary px-3 py-1 rounded-full ">
                    <span> Rs. {price?.toLocaleString()}</span>
                    &nbsp;
                    {strikeThroughPrice > price && (
                        <span className="text-xs text-gray-400 line-through">
                            {strikeThroughPrice?.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="py-4 space-y-2">
                {/* Duration - placeholder if not in schema */}
                <p className="text-xs text-gray-500">
                    ⏳ Package Details
                </p>
                {/* Title */}
                <h3 className="text-lg font-medium leading-snug">
                    {name}
                </h3>

                {/* Location */}
                <p className=" bg-linear-to-b from-primary/20 to-transparent px-2 py-1 rounded-md text-sm flex gap-1 items-center text-gray-500 w-fit">
                    <MapPin size={16} /> {location}
                </p>

                <div className="  pt-2 flex w-full gap-2">
                    <Button variant={"outline"} className=" hidden sm:flex border-primary text-primary">
                        <Phone size={18} />
                    </Button>
                    <Button className=" text-lg font-semibold flex-1 ">Request Callback</Button>
                </div>
            </div>
        </Link>
    );
}