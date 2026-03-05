import Link from "next/link";


export const Footer = () => {

    return (
        <footer className="w-full py-8 text-white overflow-hidden bg-primary md:px-16 ">

            {/* Content */}
            <div className="  px-4 md:px-8 py-6   gap-12 relative z-10">

                {/* Logo Section */}
                <div className="col-span-2 space-y-4">
                    <img
                        className="w-40 h-auto object-contain"
                        src="/logo.png"
                        alt="logo"
                    />
                </div>

                <div className=" mt-12">
                    <p className=" text-xl font-bold">{FOOTER_LINKS[0].title}</p>
                    <ul className=" grid grid-cols-2 md:grid-cols-5 mt-4">
                        {FOOTER_LINKS[0].links.map((link) => (
                            <li className=" w-fit  md:font-medium hover:underline mt-3" key={link.title}>
                                <Link href={link.href}>{link.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <hr className=" my-6 md:my-12" />

                <div className=" grid grid-cols-1 md:grid-cols-4 gap-12 ">
                    <div className=" md:mt-12 md:col-span-2">
                        <p className=" text-xl font-bold">Address</p>
                        <p className=" mt-4">Lorem ipsum dolor sit.</p>
                        <p>Lorem ipsum dolor sit. Lorem ipsum dolor sit.</p>
                    </div>
                    <div className=" md:mt-12">
                        <p className=" text-xl font-bold">{FOOTER_LINKS[1].title}</p>
                        <ul className="  mt-4">
                            {FOOTER_LINKS[1].links.map((link) => (
                                <li className=" w-fit font-medium hover:underline mt-3" key={link.title}>
                                    <Link href={link.href}>{link.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className=" md:mt-12">
                        <p className=" text-xl font-bold">{FOOTER_LINKS[2].title}</p>
                        <ul className="  mt-4">
                            {FOOTER_LINKS[2].links.map((link) => (
                                <li className=" w-fit font-medium hover:underline mt-3" key={link.title}>
                                    <Link href={link.href}>{link.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>


        </footer>
    );
};

const FOOTER_LINKS = [
    {
        title: "Top trips",
        links: [
            {
                title: "Spiti Valley package",
                href: "/spiti-valley"
            },
            {
                title: "Himachal package",
                href: "/himachal"
            },
            {
                title: "Udaipur package",
                href: "/udaipur"
            },
            {
                title: "Jaipur package",
                href: "/jaipur"
            },
            {
                title: "Spiti Valley packaes",
                href: "/spiti-valley"
            },
            {
                title: "Himachal packaes",
                href: "/himachal"
            },
            {
                title: "Udaipur packaes",
                href: "/udaipur"
            },
            {
                title: "Jaipur packaes",
                href: "/jaipur"
            },
            {
                title: "Spiti Valley packages",
                href: "/spiti-valley"
            },
            {
                title: "Himachal packages",
                href: "/himachal"
            },
            {
                title: "Udaipur packages",
                href: "/udaipur"
            },
            {
                title: "Jaipur packages",
                href: "/jaipur"
            },
        ]
    },
    {
        title: "Quick links",
        links: [
            {
                title: "Home",
                href: "/"
            },
            {
                title: "Contact Us",
                href: "/contact-us"
            },
            {
                title: "About Us",
                href: "/about-us"
            },
            {
                title: "Reviews",
                href: "/reviews"
            }
        ]
    },
    {
        title: "Talk To Us",
        links: [
            {
                title: "📞 (+91) 8287636079",
                href: "/spiti-valley"
            },
            {
                title: "📬 info@captureatrip.com",
                href: "/himachal"
            },
            {
                title: "W (+91) 9310660016",
                href: "/himachal"
            }
        ]
    }
]