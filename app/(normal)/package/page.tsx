"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formQuerySchema, type FormQueryInput } from "@/lib/validators";
import { submitQuery } from "@/lib/actions";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function PackagePage() {
    return (
        <div className="  lg:px-12 px-4 py-12">
            <HeaderGallary />
            <div className=" grid grid-cols-1 md:grid-cols-6 mt-8 gap-6">
                <div className=" space-y-6 col-span-6 md:col-span-4 " >
                    <TripAbout />
                    <TripItinary />
                    <PackageIncludeExclude />
                    <PackageCosting />
                </div>
                <div className=" col-span-6 md:col-span-2 space-y-6">
                    <PackagePriceEnquiry />
                    <PackageEnquiry />
                </div>
            </div>
        </div>
    );
}

const HeaderGallary = () => {

    return (
        <div>
            <div className=" hidden md:grid aspect-22/7 w-full grid-cols-2 gap-3 overflow-hidden">
                <img src="/trip/spiti.webp" alt="header" className="aspect-22/16 w-full  h-full  object-cover" />
                <div className=" grid grid-cols-1 aspect-22/14 grid-rows-2 gap-3">
                    <div className="grid grid-cols-2 overflow-hidden gap-3">
                        <img src="/trip/spiti.webp" alt="header" className="w-full h-full object-cover" />
                        <img src="/trip/spiti.webp" alt="header" className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-2 overflow-hidden gap-3">
                        <img src="/trip/spiti.webp" alt="header" className="w-full h-full object-cover" />
                        <img src="/trip/spiti.webp" alt="header" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            <HeaderGallaryMobile />
        </div>
    );
}

const TripAbout = () => {
    return (
        <div className=" space-y-3">
            <div className=" flex md:flex-row flex-col gap-3 justify-between">
                <Heading text="About Spiti Vally Trip" />
                <Button className=" rounded-full cursor-pointer font-medium ">
                    <Download />
                    <p>
                        Downloard Itinary
                    </p>
                </Button>
            </div>
            <p className=" text-gray-800 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus corrupti accusantium quibusdam, fuga quo molestias vero inventore nemo officia soluta!</p>
        </div>
    );
}

const HeaderGallaryMobile = () => {
    const plugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true })
    )

    return (
        <Carousel className=" w-full aspect-square overflow-hidden md:hidden" opts={{ loop: true }} plugins={[plugin.current]}>
            <CarouselContent>
                <CarouselItem>
                    <img src="/trip/spiti.webp" alt="header" className="w-full h-full object-cover" />
                </CarouselItem>
                <CarouselItem>
                    <img src="/trip/spiti.webp" alt="header" className="w-full h-full object-cover" />
                </CarouselItem>
                <CarouselItem>
                    <img src="/trip/spiti.webp" alt="header" className="w-full h-full object-cover" />
                </CarouselItem>
            </CarouselContent>

        </Carousel>
    );
}

const TripItinary = () => {
    const [openItem, setOpenItem] = useState<string | undefined>(undefined);
    useEffect(() => {
        console.log(openItem)
    }, [openItem])
    return (
        <div>
            <Heading text="Trip Itinary" />
            <Accordion
                type="single"
                collapsible
                defaultValue="shipping"
                className="w-full mt-4 space-y-4"
                value={openItem}
                onValueChange={setOpenItem}
            >
                <AccordionItem value="item-1" className={cn(" bg-gray-100 py-2 px-4 rounded-2xl", openItem === "item-1" && "bg-primary/20")}>
                    <AccordionTrigger className=" hover:no-underline text-base cursor-pointer"> Day 1 :  Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, hic aspernatur! At suscipit deleniti, blanditiis voluptates earum tenetur eligendi ut.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                {/* <AccordionItem value="item-2" className={cn(" bg-gray-100 py-2 px-4 rounded-2xl", openItem === "item-2" && "bg-primary/20")}> */}
                <AccordionItem value="item-2" className={cn(" bg-gray-100 py-2 px-4 rounded-2xl", openItem === "item-2" && "0")}>
                    <AccordionTrigger className=" hover:no-underline text-base cursor-pointer">Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, hic aspernatur! At suscipit deleniti, blanditiis voluptates earum tenetur eligendi ut.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

const PackageIncludeExclude = () => {
    return (
        <div>
            <Heading text="Package Include & Exclude" />
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <PackageInclude />
                <PackageExclude />
            </div>
        </div>
    );
}

const PackageInclude = () => {
    return (
        <div>
            <h1 className=" text-lg font-medium">Package Include</h1>
            <div className=" mt-4 space-y-2">
                <p className=" text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus corrupti accusantium quibusdam, fuga quo molestias vero inventore nemo officia soluta!</p>
                <p className=" text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus corrupti accusantium quibusdam, fuga quo molestias vero inventore nemo officia soluta!</p>
                <p className=" text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus corrupti accusantium quibusdam, fuga quo molestias vero inventore nemo officia soluta!</p>
            </div>
        </div>
    );
}

const PackageExclude = () => {
    return (
        <div>
            <h1 className=" text-lg font-medium">Package Exclude</h1>
            <div className=" mt-4 space-y-2">
                <p className=" text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus corrupti accusantium quibusdam, fuga quo molestias vero inventore nemo officia soluta!</p>
                <p className=" text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus corrupti accusantium quibusdam, fuga quo molestias vero inventore nemo officia soluta!</p>
                <p className=" text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus corrupti accusantium quibusdam, fuga quo molestias vero inventore nemo officia soluta!</p>
            </div>
        </div>
    );
}

const PackagePriceEnquiry = () => {
    return (
        <Card>
            <CardHeader className="  flex justify-between gap-1">
                <div className=" flex items-center gap-2">
                    <span className=" text-2xl font-semibold">Rs. 5,999</span>
                    <span className=" line-through">Rs. 5,999</span>
                </div>
                <div className=" text-sm text-green-600">Discount Rs. 2999</div>
            </CardHeader>
            <CardContent className="pt-0">
                <hr className=" mb-4" />

                <Button className=" h-12 w-full mt-3 text-lg font-semibold cursor-pointer" type="submit">Get Enquiry</Button>
            </CardContent>
        </Card>
    );
}

const PackageEnquiry = () => {
    const pathname = usePathname();
    const slug = pathname.split("/").pop() || "package";

    const form = useForm<FormQueryInput>({
        resolver: zodResolver(formQuerySchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            slug: slug,
        },
    });

    const onSubmit = async (data: FormQueryInput) => {
        try {
            await submitQuery(data);
            toast.success("Query submitted successfully!");
            form.reset();
        } catch (error) {
            toast.error("Failed to submit query. Please try again.");
        }
    };

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Inquire about this package</CardTitle>
            </CardHeader>
            <CardContent className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your message" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className=" h-12 w-full mt-3 text-lg font-semibold cursor-pointer" type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

const PackageCosting = () => {
    return (
        <div>
            <Heading text="Package Costing" />
            <div className=" mt-4 border overflow-hidden rounded-xl">
                <div className=" divide-x grid grid-cols-7 border-b text-center">
                    <p className="py-3 px-4 text-2xl font-semibold col-span-4">Mode</p>
                    <p className="py-3 px-4 text-2xl font-semibold col-span-3">Price</p>
                </div>
                <div className=" border-b divide-x grid grid-cols-7 text-center">
                    <p className="py-3 px-4 mibold col-span-4">Triple Sharing / Tempo Traveller</p>
                    <p className="py-3 px-4 font-medium col-span-3">Rs. 4,999</p>
                </div>
                <div className=" border-b divide-x grid grid-cols-7 text-center">
                    <p className="py-3 px-4 mibold col-span-4">Triple Sharing / Tempo Traveller</p>
                    <p className="py-3 px-4 font-medium col-span-3">Rs. 4,999</p>
                </div>
                <div className=" divide-x grid grid-cols-7 text-center">
                    <p className="py-3 px-4 mibold col-span-4">Triple Sharing / Tempo Traveller</p>
                    <p className="py-3 px-4 font-medium col-span-3">Rs. 4,999</p>
                </div>
            </div>
        </div>
    );
}

const Heading = ({ text }: { text: string }) => {
    return (
        <h1 className=" text-2xl md:text-3xl font-medium">{text}</h1>
    );
}