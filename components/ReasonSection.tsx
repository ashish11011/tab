export default function ReasonsSection() {
    const reasons = [
        {
            title: "No Third-Party Mess",
            description:
                "100% in-house operations for all trips - no middlemen, no hidden fees, and no fishy claims. Everything is managed by our own experienced team!",
            icon: "/WSA/no-mess.png",
        },
        {
            title: "Transparency & Security",
            description:
                "Real-time monitoring of all trips by our ground team. All routes and weather conditions are continuously updated for a safe and seamless experience.",
            icon: "/WSA/transparency.png",
        },
        {
            title: "Like-Minded Co-Travelers",
            description:
                "Multi-step traveler filtering to make sure you share the journey with people like you - no awkward trips, only fuss-free vibes!",
            icon: "/WSA/like-minded.png",
        },
        {
            title: "One-Stop Hassle-Free Experience",
            description:
                "Comfortable stays, trained drivers, hospitable staff, and friendly trip leaders - all put together so you can simply relax and enjoy.",
            icon: "/WSA/one-stop.png",
        },
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <h2 className="text-center text-2xl md:text-4xl font-bold text-green-900 mb-10">
                Here’s What Truly Sets Us Apart
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 px-4 max-w-7xl mx-auto">
                {reasons.map((reason, i) => (
                    <div
                        key={i}
                        className="flex mx-auto max-w-md flex-col items-center text-center p-4"
                    >
                        <img src={reason.icon} alt={reason.title} className="h-28 mb-4" />
                        <h3 className=" text-lg md:text-xl font-semibold text-green-900 mb-2">
                            {reason.title}
                        </h3>
                        <p className=" text-sm md:text-base text-neutral-700 ">
                            {reason.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
