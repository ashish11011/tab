"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface HeaderGallaryMobileProps {
    images: { mediaUrl: string }[];
}

export function HeaderGallaryMobile({ images }: HeaderGallaryMobileProps) {
    const plugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true })
    );

    if (images.length === 0) return null;

    return (
        <Carousel className="w-full aspect-square overflow-hidden md:hidden" opts={{ loop: true }} plugins={[plugin.current]}>
            <CarouselContent>
                {images.map((img, index) => (
                    <CarouselItem key={index}>
                        <img src={img.mediaUrl} alt={`Gallery item ${index + 1}`} className="w-full h-full object-cover" />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
