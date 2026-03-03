"use client"
import PackageCard from "@/components/PackageCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Page() {
    return (
        <div className=" py-12 md:px-16 px-4">
            <h1 className=" text-3xl font-bold">Category</h1>
            <p className=" text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos deleniti repellat cumque amet, sed nesciunt. Nisi voluptates incidunt iure recusandae?</p>
            <div className=" mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <PackageCard key={index} />
                    ))
                }
            </div>
            <CategoryFaqs />
        </div>
    )
}


const SPITI_VALLY_FAQS = [
    {
        question: "1. What is the best time to visit Spiti Valley?",
        answer: "The best time to visit Spiti Valley depends on the type of experience you are looking for. The most popular months are from May to September when the weather is relatively pleasant and most roads, including the Manali–Kaza route, are open. During this period, temperatures range between 10°C to 25°C during the day, making it ideal for sightseeing, road trips, and trekking. From October onwards, temperatures drop significantly and heavy snowfall begins, especially from December to March. Winter visits are suitable only for experienced travelers who are comfortable with extreme cold and limited accessibility. If you want clear skies, accessible roads, and vibrant landscapes, summer is the safest and most convenient choice."
    },
    {
        question: "2. How can I reach Spiti Valley?",
        answer: "Spiti Valley can be reached by road through two main routes. The first route is via Manali, which usually opens around late May or June after the snow is cleared from high mountain passes like Rohtang and Kunzum. The second route is via Shimla, which remains accessible for a longer period and is generally considered more reliable. The nearest airport is in Bhuntar near Kullu, and the nearest major railway station is in Kalka or Chandigarh. From there, travelers typically hire a taxi or take a bus. Self-driving cars and bikes are also popular options, but the terrain is challenging and requires careful planning and vehicle preparation."
    },
    {
        question: "3. Is Spiti Valley safe for travelers?",
        answer: "Spiti Valley is generally safe for travelers, including solo travelers and small groups. The local community is welcoming and helpful, and crime rates are extremely low. However, safety concerns in Spiti are mostly related to natural conditions rather than people. The roads are narrow, mountainous, and sometimes prone to landslides or sudden weather changes. Medical facilities are limited, especially in remote villages, so carrying a basic medical kit and essential medications is important. It is also advisable to acclimatize properly to avoid altitude sickness. With proper preparation, cautious driving, and weather awareness, Spiti Valley can be a safe and memorable destination."
    },
    {
        question: "4. Do I need a permit to visit Spiti Valley?",
        answer: "Indian citizens do not require a special permit to visit most parts of Spiti Valley. However, certain restricted areas near the Indo-Tibetan border, such as Chitkul or Shipki La, may require permits. Foreign nationals may need an Inner Line Permit for specific border regions, which can usually be obtained from the District Magistrate’s office or online portals depending on current regulations. It is always recommended to check the latest government guidelines before planning your trip, as rules can change. Carrying valid government-issued identification at all times is essential, especially when crossing check posts along the way."
    },
    {
        question: "5. What kind of accommodation options are available in Spiti Valley?",
        answer: "Accommodation options in Spiti Valley range from budget guesthouses and homestays to mid-range hotels and boutique stays, primarily in towns like Kaza, Tabo, and Key. Homestays are particularly popular because they offer an authentic cultural experience and home-cooked local meals. During peak tourist season, it is advisable to book in advance as rooms can fill up quickly. In smaller villages, facilities may be basic, with limited electricity and heating options. Luxury hotels are limited, and travelers should not expect high-end amenities in remote areas. Choosing accommodation in Spiti is more about comfort, warmth, and hospitality rather than luxury."
    },
    {
        question: "6. Is Spiti Valley suitable for family trips?",
        answer: "Spiti Valley can be suitable for family trips, but it requires thoughtful planning. The high altitude, rough roads, and limited medical facilities may not be ideal for elderly travelers or very young children. Families should plan shorter driving distances per day to avoid fatigue and allow proper acclimatization. Choosing comfortable accommodations in central locations like Kaza can make the trip smoother. It is also important to carry necessary medications, warm clothing, and emergency supplies. If planned carefully with sufficient rest days and gradual altitude gain, a family trip to Spiti can be an enriching and unforgettable experience."
    },
    {
        question: "7. What should I pack for a Spiti Valley trip?",
        answer: "Packing properly for Spiti Valley is crucial due to its unpredictable weather and high altitude conditions. Warm layered clothing is essential even during summer months, as nights can be very cold. Carry thermal wear, a heavy jacket, gloves, woolen socks, and a cap. Comfortable trekking shoes are important for exploring monasteries and villages. Sunscreen, sunglasses, and lip balm are necessary because the sun at high altitude can be harsh. A basic medical kit, power bank, torch, reusable water bottle, and personal hygiene items should also be included. Since ATMs and pharmacies are limited, carrying sufficient cash and necessary supplies is highly recommended."
    },
    {
        question: "8. What are the must-visit places in Spiti Valley?",
        answer: "Spiti Valley is home to several breathtaking attractions that reflect its natural beauty and cultural heritage. Popular places include the Key Monastery, which is the largest monastery in Spiti, and Chandratal Lake, known for its stunning crescent shape and crystal-clear waters. Tabo Monastery, often called the Ajanta of the Himalayas, is famous for its ancient murals. The village of Kibber offers scenic views and wildlife spotting opportunities. Hikkim, home to one of the world’s highest post offices, is another unique stop. Each location provides a combination of dramatic landscapes, spiritual ambiance, and unforgettable mountain views."
    },
    {
        question: "9. How many days are enough for a Spiti Valley trip?",
        answer: "A minimum of 7 to 10 days is recommended to explore Spiti Valley comfortably without rushing. This duration allows proper acclimatization and enough time to visit major attractions such as Kaza, Key Monastery, Tabo, Chandratal Lake, and nearby villages. If you are traveling via both Shimla and Manali routes, you may need 10 to 12 days to complete the circuit leisurely. Shorter trips can be exhausting due to long travel hours on mountainous roads. Planning buffer days for weather changes or road closures is also advisable. A well-paced itinerary ensures that you enjoy the journey rather than feeling rushed."
    }
];

const CategoryFaqs = () => {
    return (
        <>
            <h1 className=" text-3xl mt-12 font-bold text-center">Frequently asked questions </h1>
            <Accordion
                className=" max-w-7xl mt-6 mx-auto"
                type="single"
                collapsible
            >
                {SPITI_VALLY_FAQS.map((data) => {
                    return (
                        <AccordionItem value={data.question}>
                            <AccordionTrigger>
                                {data.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                {data.answer}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </>
    )
}