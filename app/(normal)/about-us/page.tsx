// app/about/page.tsx (Server Component)

import TeamSection from "@/components/TeamsSection";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
    return (
        <div className="w-full">
            <AboutHero />
            <CompanySection />
            <FounderSection />
            <TeamSection />
        </div>
    );
}


// components/about/about-hero.tsx (Server Component)
function AboutHero() {
    return (
        <section className="w-full py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">About The Adventure Bag Club</h1>
                <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
                    A travel community built for explorers who believe that the best
                    journeys are the ones shared with like-minded people.
                </p>
            </div>
        </section>
    );
}


// components/about/company-section.tsx (Server Component)

function CompanySection() {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8">About TAB</h2>

                <Card className="rounded-2xl">
                    <CardContent className="p-8 text-gray-700 leading-relaxed space-y-4">
                        <p>
                            The Adventure Bag Club is a youth-driven travel community built
                            for explorers who believe that the best journeys are the ones
                            shared with like-minded people. What began as a passion to bring
                            people together through travel has grown into a trusted
                            experiential travel platform organising curated group trips
                            across some of India’s most exciting destinations — from the
                            Himalayas to the beaches of Goa.
                        </p>

                        <p>
                            At The Adventure Bag Club, we focus on creating experiences that
                            go beyond typical sightseeing through thoughtfully designed
                            itineraries, strong on-ground management, and a vibrant community
                            of travellers.
                        </p>

                        <p>
                            Having already hosted 6000+ travellers, earned consistent 5 star
                            reviews, and successfully operated groups of more than 200
                            travellers on a single departure, we are steadily building a
                            travel ecosystem where adventure, community, and unforgettable
                            experiences come together.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}


// components/about/founder-section.tsx (Server Component)

function FounderSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8">About The Founder</h2>

                <Card className="rounded-2xl">
                    <CardContent className="p-8 text-gray-700 leading-relaxed space-y-4">
                        <p>
                            Shobhit Gupta, the founder of The Adventure Bag Club, built the
                            community from a simple belief — that travel has the power to
                            bring people together and shape perspectives.
                        </p>

                        <p>
                            While his academic journey in law trained him to think
                            structurally and critically, his passion for exploration led him
                            toward building experiences that go beyond conventional travel.
                        </p>

                        <p>
                            Early in his journey, Shobhit worked on a sustainable development
                            project in the deep Himalayas in Tabo Village. This experience
                            helped him understand mountain communities and the importance of
                            responsible travel.
                        </p>

                        <p>
                            A year later he had the opportunity to meet His Holiness the 14th
                            Dalai Lama (Tenzin Gyatso), an interaction that deeply influenced
                            his outlook on leadership, community, and meaningful travel.
                        </p>

                        <p>
                            Today he leads The Adventure Bag Club with a vision of building a
                            travel community where journeys are defined not only by
                            destinations but by shared experiences, connections, and the
                            spirit of adventure.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}