import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required").regex(/^\S*$/, "Slug should not contain spaces"),
});

export const packageSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    price: z.number().min(0),
    strikeThroughPrice: z.number().min(0),
    description: z.string().min(1),
    mainBannerImage: z.string().url(),
    mainMobileBannerImage: z.string().url(),
    itineraryUrl: z.string().url(),
    itineraryImage: z.string().url(),
    slug: z.string().min(1, "Slug is required").regex(/^\S*$/, "Slug should not contain spaces"),
    pickup: z.string().min(1),
    dropoff: z.string().min(1),
    location: z.string().min(1),
    about: z.string().min(1),
    included: z.string().min(1),
    excluded: z.string().min(1),
    categoryIds: z.array(z.number()).min(1, "At least one category is required"),
});

export const priceTitleSchema = z.object({
    id: z.number().optional(),
    packageId: z.number(),
    title: z.string().min(1, "Title is required"),
    price: z.number().min(0),
    strikeThroughPrice: z.number().min(0),
});

export const itinerarySchema = z.object({
    id: z.number().optional(),
    packageId: z.number(),
    day: z.number().min(1),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
});

export const packageMediaSchema = z.object({
    id: z.number().optional(),
    packageId: z.number(),
    mediaUrl: z.string().url(),
    type: z.enum(["image", "video"]),
});

export const categoryFaqSchema = z.object({
    id: z.number().optional(),
    categoryId: z.number().optional(),
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
});

export const formQuerySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    message: z.string().min(1, "Message is required"),
    slug: z.string().min(1, "Slug is required"),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type PackageInput = z.infer<typeof packageSchema>;
export type PriceTitleInput = z.infer<typeof priceTitleSchema>;
export type ItineraryInput = z.infer<typeof itinerarySchema>;
export type PackageMediaInput = z.infer<typeof packageMediaSchema>;
export type CategoryFaqInput = z.infer<typeof categoryFaqSchema>;
export type FormQueryInput = z.infer<typeof formQuerySchema>;
