import React from "react";

const CompaniesLogos = () => {
    return (
        <div className=" w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
            <p className=" border rounded-full py-1 px-4 w-fit mx-auto dm font-semibold tracking-wide text-neutral-700 border-gray-100 shadow-sm text-sm shadow-gray-200">
                We have been working with
            </p>
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
                {data.map((item, idx) => {
                    return (
                        <img
                            className=" m-auto w-40 h-auto max-h-16 object-contain"
                            key={idx}
                            src={item}
                            alt=""
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CompaniesLogos;

const data = [
    "/logos/aiesec.svg",
    "/logos/kanoria-college-logo.png",
    "/logos/pidilite.png",
    "/logos/Xaviers-Jaipur-Logo.png",
];
