"use client";

import { motion } from "motion/react"
import { MapPin, Plane, CreditCard, Map, Bus } from "lucide-react";

const steps = [
    {
        title: "Pick your destination",
        description:
            "Choose from our exciting trips to Manali and other incredible locations across India, perfect for colleges and companies alike.",
        icon: MapPin,
    },
    {
        title: "Reserve your seat",
        description:
            "Book your trip easily - our streamlined process lets you secure spots for your entire group in a few clicks.",
        icon: Bus,
    },
    {
        title: "Confirm Payment",
        description:
            "Quick, transparent payment options with all costs upfront, so you can plan your trip worry‑free.",
        icon: CreditCard,
    },
    {
        title: "Enjoy the trip!",
        description:
            "Set off on your adventure with our experienced team captains who’ll ensure a safe, fun, and memorable trip.",
        icon: Map,
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-16 px-4">
            <div className="text-center mb-8 max-w-lg mx-auto">
                <h2 className="text-3xl font-semibold tracking-wide mb-2">
                    How TAB works
                </h2>
                <p className="text-neutral-700 font-medium dm">
                    Don’t wait until tomorrow, discover your adventure now and feel the
                    sensation of closeness to nature around you.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  max-w-7xl mx-auto">
                {steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={i}
                            whileHover={{
                                scale: 1.03,
                                rotate: -1,
                                y: -4,
                                boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={`relative p-6 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer ${i === 1 ? "bg-teal-500 text-white border-teal-500" : ""
                                }`}
                        >
                            <div
                                className={`w-12 h-12 mb-4 flex items-center justify-center rounded-lg ${i === 1
                                    ? "bg-white text-teal-500"
                                    : "bg-white text-neutral-800"
                                    }`}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium mb-2">{step.title}</h3>
                            <p
                                className={`  dm ${i === 1 ? "text-white/90" : "text-neutral-600"
                                    }`}
                            >
                                {step.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
