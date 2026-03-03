"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQsAccordion() {
    return (
        <div className="max-w-5xl px-6 mx-auto py-12">
            <h2 className="font-playfair text-2xl font-medium mb-6 text-center">
                Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
                {FAQsData.map((item, idx) => (
                    <AccordionItem key={`faq-${idx}`} value={`item-${idx}`}>
                        <AccordionTrigger
                            className={
                                " cursor-pointer dm  text-gray-900  tracking-wide"
                            }
                        >
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent
                            className={"text-base dm tracking-wide leading-7 text-gray-600"}
                        >
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}


const FAQsData = [
    {
        question: "What types of corporate travel plans do you offer?",
        answer:
            "We offer a wide range of customizable travel plans for corporate needs including conferences, team-building retreats, incentive travel, leadership off-sites, and client entertainment trips. Whether you're planning a high-energy adventure or a relaxing getaway, our packages are designed to align with your company’s objectives, values, and budget. We also handle logistics such as flights, stays, meals, and local experiences to deliver a hassle-free experience.",
    },
    {
        question: "Can we customize our corporate travel package?",
        answer:
            "Absolutely! Our travel consultants work closely with you to understand your team’s preferences and requirements. You can personalize every aspect—from destination and accommodation type to activities, transport mode, and dining preferences. We also offer add-ons like branded merchandise, wellness sessions, and professional photographers to make your trip truly unique.",
    },
    {
        question: "How do I request a quote for a corporate trip?",
        answer:
            "Requesting a quote is easy. Simply fill out the inquiry form on our homepage with basic trip details like group size, destination preferences, travel dates, and special requests. Alternatively, you can contact our travel specialists via phone or email. Once we receive your request, we’ll send you a detailed proposal within 24 hours, including cost estimates, itinerary options, and package inclusions.",
    },
    {
        question: "Are travel and accommodation included in the plans?",
        answer:
            "Yes, all our corporate travel packages include end-to-end arrangements such as round-trip transportation (flights, buses, or private vehicles), quality accommodations, daily meals, and curated activities. You also have the flexibility to upgrade to premium services, book private venues, or arrange for special experiences like guided tours, gala dinners, or team workshops.",
    },
    {
        question: "Do you offer international corporate trips?",
        answer:
            "Yes, we organize both domestic and international corporate trips to a wide range of destinations including Southeast Asia, Europe, the Middle East, and more. Our international packages cover visa assistance, currency guidance, local transportation, travel insurance, and multilingual support to ensure a seamless experience across borders.",
    },
    {
        question: "How early should we book a corporate trip?",
        answer:
            "We recommend booking your corporate trip at least 4–6 weeks in advance to secure the best rates and availability—especially during peak travel seasons. For international or large-group travel, earlier planning (8–10 weeks ahead) allows us to better coordinate logistics, personalize experiences, and avoid last-minute surcharges or limitations.",
    },
    {
        question: "Is there a minimum group size required for a corporate trip?",
        answer:
            "Typically, our corporate travel packages are designed for groups of 10 or more. However, we understand the need for smaller team retreats or executive off-sites, and we’re happy to create tailored experiences for smaller groups upon request, with equally high attention to detail and service.",
    },
    {
        question: "Can you handle last-minute changes or cancellations?",
        answer:
            "We understand that plans can change unexpectedly. Our flexible rescheduling and cancellation policies are designed to support you in such situations. Depending on the vendor and destination, we’ll do our best to accommodate last-minute updates to the itinerary or assist with refunds, credits, or rebooking options as per the terms shared in your package agreement.",
    },
    {
        question: "Do you provide on-ground support during the trip?",
        answer:
            "Yes, we assign dedicated trip coordinators or local representatives who are available throughout your journey to manage logistics, handle queries, and ensure everything runs smoothly. From airport pickups to activity coordination, our on-ground team ensures you have a stress-free and enjoyable travel experience.",
    },
    {
        question: "How can we contact you for further assistance?",
        answer:
            "You can reach out to us anytime through the contact form on our website, call our support number listed in the footer, or email us at support@[yourdomain].com. Our travel specialists are available Monday to Saturday, 10 AM to 7 PM IST, and respond promptly to inquiries, quotes, or custom requests.",
    },
];
