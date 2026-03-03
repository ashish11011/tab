import React from "react";

const TripStats = () => {
    return (
        <div className=" mx-auto max-w-7xl w-full py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.map((item, idx) => {
                return (
                    <div key={idx} className=" flex flex-col items-center gap-4">
                        <img className=" size-10" src={item.icon} alt="" />
                        {item.body}
                    </div>
                );
            })}
            <div></div>
        </div>
    );
};

export default TripStats;

const data = [
    {
        icon: "/Instagram icon.svg",
        body: (
            <div className=" dm text-center font-bold sm:text-lg leading-6">
                <p>Community of</p>
                <p>5000+ On Instagram</p>
            </div>
        ),
    },
    {
        icon: "/Google icon.svg",
        body: (
            <div className=" dm text-center font-bold sm:text-lg leading-6">
                <p>400+</p>
                <p>Google Reviews</p>
            </div>
        ),
    },
    {
        icon: "/Itinerary icon.svg",
        body: (
            <div className=" dm text-center font-bold sm:text-lg leading-6">
                <p>500+</p>
                <p>Itineraries</p>
            </div>
        ),
    },
    {
        icon: "/Paylater icon.svg",
        body: (
            <div className=" dm text-center font-bold sm:text-lg leading-6">
                <p>Book Now &</p>
                <p>Pay Later</p>
            </div>
        ),
    },
];
