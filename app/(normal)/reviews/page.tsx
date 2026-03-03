"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import REVIEW_DATA from "@/public/google_reviews.json"
import { useState } from "react";
export default function Reviews() {
    const [showAll, setShowAll] = useState(false);
    return (
        <div className=" md:my-12">
            <h1 className=" text-2xl font-bold mb-6 w-full text-center py-12">Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 px-4 md:px-12">
                {REVIEW_DATA.slice(0, showAll ? REVIEW_DATA.length : 12).map((review) => (
                    <Card key={review.name}>
                        <CardHeader className=" flex justify-between gap-1">
                            <div>
                                <h2 className=" text-lg font-medium">{review.name}</h2>

                                <div>
                                    {
                                        Array.from({ length: Number(review.rating.slice(6, 7)) }).map((_, index) => (
                                            <span key={index}>⭐</span>
                                        ))
                                    }
                                </div>

                            </div>
                            <p className=" text-sm">{review.time}</p>
                        </CardHeader>
                        <CardContent>
                            <Description text={review.text} />
                            <div className=" mt-4 grid grid-cols-3 gap-2">
                                {
                                    review.images.map((image) => (
                                        <img className="  w-full h-auto" key={image} src={image} alt="" />
                                    ))
                                }
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {!showAll && <Button className=" mx-auto block my-12" onClick={() => setShowAll(!showAll)}>
                Show More
            </Button>}
        </div>
    );
}

const Description = ({ text }: { text: string | null }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            {isExpanded ? text : text?.slice(0, 150) + (text && text?.length > 150 ? "... " : "")}
            <button className=" text-blue-600" onClick={() => setIsExpanded(!isExpanded)}>
                {text && text?.length > 150 && !isExpanded && "read more"}
            </button>
        </>
    )
}