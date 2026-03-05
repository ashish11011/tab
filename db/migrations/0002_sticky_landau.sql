ALTER TABLE "blog_categories" DROP CONSTRAINT "blog_categories_blog_id_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "blog_categories" DROP CONSTRAINT "blog_categories_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "blog_categories" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_categories" ADD COLUMN "meta_description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_categories" ADD COLUMN "meta_title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_categories" ADD COLUMN "meta_keywords" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_categories" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_categories" DROP COLUMN "blog_id";--> statement-breakpoint
ALTER TABLE "blog_categories" DROP COLUMN "category_id";--> statement-breakpoint
ALTER TABLE "blog_categories" ADD CONSTRAINT "blog_categories_slug_unique" UNIQUE("slug");