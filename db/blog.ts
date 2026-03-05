import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const blogTable = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    metaDescription: text("meta_description").notNull(),
    metaTitle: text("meta_title").notNull(),
    metaKeywords: text("meta_keywords").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    content: text("content").notNull(),
    image: text("image").notNull(),
    userName: text("user_name").notNull(),
    userPosition: text("user_position").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogCategoryTable = pgTable("blog_categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    metaDescription: text("meta_description").notNull(),
    metaTitle: text("meta_title").notNull(),
    metaKeywords: text("meta_keywords").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogToCategoryTable = pgTable("blog_category_map", {
    id: serial("id").primaryKey(),
    blogId: integer("blog_id").notNull().references(() => blogTable.id),
    categoryId: integer("category_id").notNull().references(() => blogCategoryTable.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});