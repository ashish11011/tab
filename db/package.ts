import { pgTable, text, integer, timestamp, serial } from "drizzle-orm/pg-core";

export const PackageTable = pgTable("packages", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    strikeThroughPrice: integer("strike_through_price").notNull(),
    description: text("description").notNull(),
    mainBannerImage: text("main_banner_image").notNull(),
    mainMobileBannerImage: text("main_mobile_banner_image").notNull(),
    itineraryUrl: text("itinerary_url").notNull(),
    itineraryImage: text("itinerary_image").notNull(),

    slug: text("slug").notNull().unique(),
    pickup: text("pickup").notNull(),
    dropoff: text("dropoff").notNull(),
    location: text("location").notNull(),
    about: text("about").notNull(),
    included: text("included").notNull(),
    excluded: text("excluded").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const priceTitleTable = pgTable("price_title", {
    id: serial("id").primaryKey(),
    packageId: integer("package_id").notNull(),
    title: text("title").notNull(),
    price: integer("price").notNull(),
    strikeThroughPrice: integer("strike_through_price").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const itineraryTable = pgTable("itinerary", {
    id: serial("id").primaryKey(),
    packageId: integer("package_id").notNull(),
    day: integer("day").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const categoryTable = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const packageCategoryTable = pgTable("package_categories", {
    id: serial("id").primaryKey(),
    packageId: integer("package_id").notNull(),
    categoryId: integer("category_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const packageMediaTable = pgTable("package_media", {
    id: serial("id").primaryKey(),
    packageId: integer("package_id").notNull(),
    mediaUrl: text("media_url").notNull(),
    type: text("type").notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const categoryFaqTable = pgTable("category_faqs", {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const formQueryTable = pgTable("form_query", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    message: text("message").notNull(),
    slug: text("slug").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});