CREATE TABLE "packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"strike_through_price" integer NOT NULL,
	"description" text NOT NULL,
	"main_banner_image" text NOT NULL,
	"main_mobile_banner_image" text NOT NULL,
	"itinerary_url" text NOT NULL,
	"itinerary_image" text NOT NULL,
	"slug" text NOT NULL,
	"pickup" text NOT NULL,
	"dropoff" text NOT NULL,
	"location" text NOT NULL,
	"about" text NOT NULL,
	"included" text NOT NULL,
	"excluded" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "category_faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "form_query" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"message" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "itinerary" (
	"id" serial PRIMARY KEY NOT NULL,
	"package_id" integer NOT NULL,
	"day" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "package_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"package_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "package_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"package_id" integer NOT NULL,
	"media_url" text NOT NULL,
	"type" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "price_title" (
	"id" serial PRIMARY KEY NOT NULL,
	"package_id" integer NOT NULL,
	"title" text NOT NULL,
	"price" integer NOT NULL,
	"strike_through_price" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
