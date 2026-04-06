"use client"

"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";

export const Navbar = () => {
    return (
        <>
            {/* Desktop */}
            <div className="hidden md:flex justify-between px-6 py-4 max-w-7xl mx-auto w-full">
                {NAVBAR_LINKS.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="flex gap-1 items-center text-sm font-semibold"
                    >
                        {link.icon}
                        {link.title}
                    </Link>
                ))}
            </div>

            {/* Mobile */}
            <div className="p-4 flex justify-between items-center md:hidden">

                <Sheet>
                    <SheetTrigger asChild>
                        <Menu className="cursor-pointer" />
                    </SheetTrigger>

                    <SheetContent side="left" className="w-[250px] px-4 pt-12">
                        <div className="flex flex-col gap-6 mt-6">
                            {NAVBAR_LINKS.map((link) => (
                                <SheetClose asChild key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex gap-2 items-center text-sm font-medium"
                                    >
                                        {link.icon}
                                        {link.title}
                                    </Link>
                                </SheetClose>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="font-semibold">Logo</div>
                <div>
                    <Link href={""} >
                        <Phone />
                    </Link>
                </div>
            </div>
        </>
    );
};
const NAVBAR_LINKS = [
    {
        title: "Spiti Valley",
        href: "/category/spiti-valley",
        icon: <Image alt="cat-icon" height={20} width={20} className=" size-5" src={"/spiti.png"} />
    },
    {
        title: "International",
        href: "/category/international",
        icon: <Image alt="cat-icon" height={20} width={20} className=" size-5" src={"/international.png"} />
    },
    {
        title: "Group Tours",
        href: "/category/group-tours",
        icon: <Image alt="cat-icon" height={20} width={20} className=" size-5" src={"/group-tour.png"} />
    },
    {
        title: "Custom Trips",
        href: "/category/custom-trips",
        icon: <Image alt="cat-icon" height={20} width={20} className=" size-5" src={"/customised.png"} />
    },
    {
        title: "Weekend Escape",
        href: "/category/weekend-escape",
        icon: <Image alt="cat-icon" height={20} width={20} className=" size-5" src={"/weekend.png"} />
    },
    {
        title: "Dreamy Himachal",
        href: "/category/dreamy-himachal",
        icon: <Image alt="cat-icon" height={20} width={20} className=" size-5" src={"/upcomming.png"} />
    },
]
