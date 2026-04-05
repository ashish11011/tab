import Link from "next/link";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Phone, Search } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export const Ribbon = () => {
    return (
        <div className=" h-10 flex items-center justify-center bg-primary text-center">
            <h1 className="text-secondary text-sm font-medium">Ladakh Spiti Early Bird – Save up to ₹3,000 🎉</h1>
        </div>
    );
};

export const Header = () => {
    return (
        <div className=" hidden md:grid items-center px-6 py-3 w-full  grid-cols-3 gap-4">
            <Link href="/">
                <img
                    className="w-auto h-12 object-contain"
                    src="/logo.png"
                    alt="logo"
                />
            </Link>
            <InputGroup className=" w-72 mx-auto rounded-full" >
                <InputGroupInput placeholder="Search your trip..." />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>

            </InputGroup>
            <div className=" flex gap-4 justify-end">
                <div className=" flex gap-2 items-center">
                    <Phone size={16} />
                    <p className=" text-sm font-semibold">+91 9876543210</p>
                </div>
            </div>
        </div>
    );
}

