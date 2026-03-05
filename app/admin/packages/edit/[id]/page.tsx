"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
    getPackageById,
    updatePackage,
    getPricingByPackageId,
    savePricing,
    getItineraryByPackageId,
    saveItinerary,
    getMediaByPackageId,
    saveMedia
} from "@/lib/actions";
import { PackageForm } from "@/components/admin/package-form";
import { PricingForm } from "@/components/admin/pricing-form";
import { ItineraryForm } from "@/components/admin/itinerary-form";
import { MediaForm } from "@/components/admin/media-form";
import { PackageInput, PriceTitleInput, ItineraryInput, PackageMediaInput } from "@/lib/validators";
import { toast } from "sonner";
import { ChevronLeft, Info, DollarSign, Calendar, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditPackagePage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = Number(params.id);
    const currentTab = searchParams.get("tab") || "basic";

    const [initialData, setInitialData] = useState<any>(null);
    const [pricingData, setPricingData] = useState<PriceTitleInput[]>([]);
    const [itineraryData, setItineraryData] = useState<ItineraryInput[]>([]);
    const [mediaData, setMediaData] = useState<PackageMediaInput[]>([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            Promise.all([
                getPackageById(id),
                getPricingByPackageId(id),
                getItineraryByPackageId(id),
                getMediaByPackageId(id)
            ]).then(([pkg, pricing, itinerary, media]) => {
                if (pkg) {
                    setInitialData(pkg);
                    setPricingData(pricing);
                    setItineraryData(itinerary);
                    setMediaData(media as PackageMediaInput[]);
                } else {
                    toast.error("Package not found");
                    router.push("/admin/packages");
                }
                setLoading(false);
            }).catch(err => {
                toast.error("Failed to load package details");
                setLoading(false);
            });
        }
    }, [id, router]);

    const handleTabChange = (value: string) => {
        router.push(`/admin/packages/edit/${id}?tab=${value}`);
    };

    const handleBasicSubmit = async (data: PackageInput) => {
        setSubmitting(true);
        try {
            await updatePackage(id, data);
            toast.success("Basic information updated");
        } catch (error) {
            toast.error("Failed to update basic information");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePricingSubmit = async (data: PriceTitleInput[]) => {
        setSubmitting(true);
        try {
            await savePricing(id, data);
            toast.success("Pricing updated successfully");
            setPricingData(data);
        } catch (error) {
            toast.error("Failed to update pricing");
        } finally {
            setSubmitting(false);
        }
    };

    const handleItinerarySubmit = async (data: ItineraryInput[]) => {
        setSubmitting(true);
        try {
            await saveItinerary(id, data);
            toast.success("Itinerary updated successfully");
            setItineraryData(data);
        } catch (error) {
            toast.error("Failed to update itinerary");
        } finally {
            setSubmitting(false);
        }
    };

    const handleMediaSubmit = async (data: PackageMediaInput[]) => {
        setSubmitting(true);
        try {
            await saveMedia(id, data);
            toast.success("Media updated successfully");
            setMediaData(data);
        } catch (error) {
            toast.error("Failed to update media");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <Skeleton className="h-[600px] w-full" />
            </div>
        );
    }
    return <></>
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push("/admin/packages")}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Edit Package</h1>
                    <p className="text-muted-foreground">Managing: {initialData?.name}</p>
                </div>
            </div>

            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                    <TabsTrigger value="basic" className="gap-2">
                        <Info className="h-4 w-4" /> Basic
                    </TabsTrigger>
                    <TabsTrigger value="pricing" className="gap-2">
                        <DollarSign className="h-4 w-4" /> Pricing
                    </TabsTrigger>
                    <TabsTrigger value="itinerary" className="gap-2">
                        <Calendar className="h-4 w-4" /> Itinerary
                    </TabsTrigger>
                    <TabsTrigger value="media" className="gap-2">
                        <ImageIcon className="h-4 w-4" /> Media
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="basic">
                        <PackageForm initialData={initialData} onSubmit={handleBasicSubmit} isLoading={submitting} />
                    </TabsContent>

                    <TabsContent value="pricing">
                        <PricingForm packageId={id} initialData={pricingData} onSubmit={handlePricingSubmit} isLoading={submitting} />
                    </TabsContent>

                    <TabsContent value="itinerary">
                        <ItineraryForm packageId={id} initialData={itineraryData} onSubmit={handleItinerarySubmit} isLoading={submitting} />
                    </TabsContent>

                    <TabsContent value="media">
                        <MediaForm packageId={id} initialData={mediaData} onSubmit={handleMediaSubmit} isLoading={submitting} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
