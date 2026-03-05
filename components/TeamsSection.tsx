
// components/about/team-section.tsx (Client Component)
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const team = [
    { name: "Shobhit Gupta" },
    { name: "Samit Gupta" }
];

export default function TeamSection() {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="rounded-2xl text-center">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-semibold">{member.name}</h3>
                                    <p className="text-gray-500 text-sm mt-2">Team Member</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
