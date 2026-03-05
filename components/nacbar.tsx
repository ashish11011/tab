import Link from "next/link";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Phone, Search } from "lucide-react";
import { Button } from "./ui/button";

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
                <Button className=" font-semibold text-sm rounded-full">Login</Button>
            </div>
        </div>
    );
}
export const Navbar = () => {
    return (
        <div className=" hidden md:flex justify-between px-6 py-4 max-w-7xl mx-auto w-full">
            {
                NAVBAR_LINKS.map((link) => (
                    <Link className=" flex gap-1 items-center text-sm font-semibold" key={link.href} href={link.href}>
                        {link.icon}
                        {link.title}
                    </Link>
                ))
            }
        </div>
    )
}

const NAVBAR_LINKS = [
    {
        title: "Spiti Valley",
        href: "/category/spiti-valley",
        icon: <img className=" size-5" src={"./spiti.png"} />
    },
    {
        title: "International",
        href: "/category/international",
        icon: <img className=" size-5" src={"./international.png"} />
    },
    {
        title: "Group Tours",
        href: "/category/group-tours",
        icon: <img className=" size-5" src={"./group-tour.png"} />
    },
    {
        title: "Custom Trips",
        href: "/category/custom-trips",
        icon: <img className=" size-5" src={"./customised.png"} />
    },
    {
        title: "Weekend Escape",
        href: "/category/weekend-escape",
        icon: <img className=" size-5" src={"./weekend.png"} />
    },
    {
        title: "Upcoming",
        href: "/category/upcoming",
        icon: <img className=" size-5" src={"./upcomming.png"} />
    },
]
