"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface TripItineraryProps {
    itinerary: {
        id: number;
        day: number;
        title: string;
        description: string;
    }[];
}

export function TripItinerary({ itinerary }: TripItineraryProps) {
    const [openItem, setOpenItem] = useState<string | undefined>(undefined);

    if (itinerary.length === 0) return null;

    return (
        <div className="mt-8">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">Trip Itinerary</h2>
            <Accordion
                type="single"
                collapsible
                className="w-full space-y-4"
                value={openItem}
                onValueChange={setOpenItem}
            >
                {itinerary.map((item) => (
                    <AccordionItem
                        key={item.id}
                        value={`item-${item.id}`}
                        className={cn("bg-gray-100 py-2 px-4 rounded-2xl border-none", openItem === `item-${item.id}` && "bg-primary/20")}
                    >
                        <AccordionTrigger className="hover:no-underline text-base cursor-pointer py-2">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700">
                            <div dangerouslySetInnerHTML={{ __html: item.description }} className="prose prose-sm max-w-none" />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
