import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getFaqsByCategoryId } from "@/lib/actions"

export const CategoryFaqs = async ({ catId }: { catId: number }) => {
    const faqs = await getFaqsByCategoryId(catId)
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