import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import React from "react";

const DomesticTrip = () => {
    return (
        <div className="relative max-w-7xl w-full  mx-auto px-4 md:px-6 py-6">
            <img
                src="./banswara.png"
                className=" hidden md:block rounded-xl object-cover object-center w-full h-80"
                alt=""
            />
            <TripHeading />
            <TripHeadingMobile />
            <ListTrips />
        </div>
    );
};

export default DomesticTrip;

function TripHeading() {
    return (
        <div className=" hidden md:flex flex-col absolute  top-14 left-12">
            <h2 className=" text-white   drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] font-semibold text-3xl">
                Places You’ll Love
            </h2>
            <p className=" text-white dm text-lg  drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] font-medium">
                Carefully curated destinations designed for every kind of traveler.
            </p>
        </div>
    );
}

function TripHeadingMobile() {
    return (
        <div className=" flex md:hidden flex-col  ">
            <h2 className=" text-black  font-semibold text-3xl">
                Places You’ll Love
            </h2>
            <p className=" text-black dm text-lg  font-medium">
                Carefully curated destinations designed for every kind of traveler.
            </p>
        </div>
    );
}

function ListTrips() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full md:px-6 mt-8 md:-mt-16 "
        >
            <CarouselContent>
                {tripData.map((item, index) => (
                    <CarouselItem key={index} className=" basis-1/2 md:basis-1/3 lg:basis-1/5">
                        <Link href={`/category/${item.url}`}>
                            <div className="h-60 w-full border-2 border-white  rounded-xl overflow-hidden relative group cursor-pointer">
                                {/* image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-110"
                                />

                                {/* overlay */}
                                <div className="absolute bottom-0 left-0 w-full text-center p-2 pb-3 bg-linear-to-b from-transparent to-black/90 text-white">
                                    <h4 className="font-medium   text-xl">{item.title}</h4>
                                    {/* <p className="text-gray-100 dm">Starting at: {item.price}</p> */}
                                </div>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className=" left-1 md:left-6 -translate-x-1/2" />
            <CarouselNext className=" right-1 md:right-6 translate-x-1/2" />
        </Carousel>
    );
}

const tripData = [
    {
        title: "Leh Ladakh",
        price: "Rs. 21,999",
        image: "/trip/ladakh.webp",
        url: "ladakh"
    },
    {
        title: "Spiti",
        price: "Rs. 17,999",
        image: "/trip/spiti.webp",
        url: "spiti-valley"
    },
    {
        title: "Meghalaya",
        price: "Rs. 21,499",
        image: "/trip/meghalaya.webp",
        url: "maghalaya"
    },
    {
        title: "Kerala",
        price: "Rs. 12,499",
        image: "/trip/kerala.webp",
        url: "kerala"
    },
    {
        title: "Himachal",
        price: "Rs. 8,999",
        image: "/trip/himachal.webp",
        url: "himachal"
    },
    {
        title: "Kashmir",
        price: "Rs. 24,999",
        image: "/trip/kashmir-romantic-02.webp",
        url: "kashmir"
    },
    {
        title: "Rajasthan",
        price: "Rs. 11,999",
        image: "/trip/rajasthan.webp",
        url: "rajasthan"
    },
    {
        title: "Uttrakhandh",
        price: "Rs. 9,999",
        image: "/trip/uttarakhand.webp",
        url: "uttrakhandh"
    },
    {
        title: "Andaman",
        price: "Rs. 29,999",
        image: "/trip/andaman.webp",
        url: "andaman"
    },
];
