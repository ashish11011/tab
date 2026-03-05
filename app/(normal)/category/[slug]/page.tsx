import { notFound } from "next/navigation";
import { getCategoryBySlug, getPackagesByCategoryId, getFaqsByCategoryId } from "@/lib/actions";
import PackageCard from "@/components/PackageCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return notFound();
    }

    const [packages, faqs] = await Promise.all([
        getPackagesByCategoryId(category.id),
        getFaqsByCategoryId(category.id)
    ]);

    return (
        <div className=" py-12 md:px-16 px-4">
            <h1 className=" text-3xl font-bold">{category.name}</h1>
            <p className=" text-gray-600 mt-2">
                Explore our curated selection of packages for {category.name}.
                Discover unforgettable journeys and unique experiences.
            </p>
            <div className=" mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.length > 0 ? (
                    packages.map((pkg: any) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 py-12">No packages found for this category.</p>
                )}
            </div>

            {faqs.length > 0 && <CategoryFaqs faqs={faqs} />}
        </div>
    );
}

const CategoryFaqs = ({ faqs }: { faqs: any[] }) => {
    return (
        <div className="mt-16">
            <h1 className=" text-3xl font-bold text-center">Frequently asked questions </h1>
            <Accordion
                className=" max-w-7xl mt-6 mx-auto"
                type="single"
                collapsible
            >
                {faqs.map((data, index) => {
                    return (
                        <AccordionItem key={index} value={data.question}>
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
        </div>
    )
}