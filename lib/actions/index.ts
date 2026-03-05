"use server";

import { revalidatePath } from "next/cache";
import {
    PackageTable,
    categoryTable,
    packageCategoryTable,
    itineraryTable,
    packageMediaTable,
    priceTitleTable,
    categoryFaqTable,
    formQueryTable
} from "@/db/package";
import {
    blogTable,
    blogCategoryTable,
    blogToCategoryTable
} from "@/db/blog";
import { eq, sql } from "drizzle-orm";
import {
    CategoryInput,
    PackageInput,
    PriceTitleInput,
    ItineraryInput,
    PackageMediaInput,
    CategoryFaqInput,
    FormQueryInput,
    BlogInput,
    BlogCategoryInput
} from "@/lib/validators";
import { db } from "@/drizzle";

// Categories
export async function getCategories() {
    return await db.select().from(categoryTable).orderBy(sql`${categoryTable.createdAt} DESC`);
}

export async function getCategoryById(id: number) {
    const [category] = await db.select().from(categoryTable).where(eq(categoryTable.id, id));
    return category || null;
}

export async function getCategoryBySlug(slug: string) {
    const [category] = await db.select().from(categoryTable).where(eq(categoryTable.slug, slug));
    return category || null;
}

export async function createCategory(data: CategoryInput) {
    const result = await db.insert(categoryTable).values({
        name: data.name,
        slug: data.slug,
    } as any).returning();
    revalidatePath("/admin/categories");
    return result[0];
}

export async function updateCategory(id: number, data: CategoryInput) {
    const result = await db
        .update(categoryTable)
        .set({
            name: data.name,
            slug: data.slug,
            updatedAt: new Date(),
        } as any)
        .where(eq(categoryTable.id, id))
        .returning();
    revalidatePath("/admin/categories");
    return result[0];
}

export async function deleteCategory(id: number) {
    await db.delete(categoryTable).where(eq(categoryTable.id, id));
    revalidatePath("/admin/categories");
}

// Packages
export async function getPackages() {
    return await db.select().from(PackageTable);
}

export async function getPackagesByCategoryId(categoryId: number) {
    const packageItems = await db
        .select({ package: PackageTable })
        .from(packageCategoryTable)
        .innerJoin(PackageTable, eq(packageCategoryTable.packageId, PackageTable.id))
        .where(eq(packageCategoryTable.categoryId, categoryId));

    const packages = await Promise.all(
        packageItems.map(async (item) => {
            const media = await db
                .select()
                .from(packageMediaTable)
                .where(eq(packageMediaTable.packageId, item.package.id));
            return {
                ...item.package,
                media,
            };
        })
    );

    return packages;
}

export async function getPackageById(id: number) {
    const [pkg] = await db.select().from(PackageTable).where(eq(PackageTable.id, id));

    if (!pkg) return null;

    const categories = await db
        .select({ categoryId: packageCategoryTable.categoryId })
        .from(packageCategoryTable)
        .where(eq(packageCategoryTable.packageId, id));

    return {
        ...pkg,
        categoryIds: categories.map((c) => c.categoryId),
    };
}

export async function getPackageBySlug(slug: string) {
    const [pkg] = await db.select().from(PackageTable).where(eq(PackageTable.slug, slug));

    if (!pkg) return null;

    const [categories, pricing, itinerary, media] = await Promise.all([
        db.select({ categoryId: packageCategoryTable.categoryId })
            .from(packageCategoryTable)
            .where(eq(packageCategoryTable.packageId, pkg.id)),
        db.select().from(priceTitleTable).where(eq(priceTitleTable.packageId, pkg.id)),
        db.select().from(itineraryTable).where(eq(itineraryTable.packageId, pkg.id)).orderBy(sql`${itineraryTable.day} ASC`),
        db.select().from(packageMediaTable).where(eq(packageMediaTable.packageId, pkg.id))
    ]);

    return {
        ...pkg,
        categoryIds: categories.map((c) => c.categoryId),
        pricing,
        itinerary,
        media
    };
}

export async function createPackage(data: PackageInput) {
    const { categoryIds, ...packageData } = data;

    const result = await db.insert(PackageTable).values({
        ...packageData,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as any).returning();

    const packageId = result[0].id;

    if (categoryIds.length > 0) {
        await db.insert(packageCategoryTable).values(
            categoryIds.map((categoryId) => ({
                packageId,
                categoryId,
            } as any))
        );
    }

    revalidatePath("/admin/packages");
    return result[0];
}

export async function updatePackage(id: number, data: PackageInput) {
    const { categoryIds, ...packageData } = data;

    await db
        .update(PackageTable)
        .set({
            ...packageData,
            updatedAt: new Date(),
        } as any)
        .where(eq(PackageTable.id, id));

    // Update categories: delete existing and insert new
    await db.delete(packageCategoryTable).where(eq(packageCategoryTable.packageId, id));

    if (categoryIds.length > 0) {
        await db.insert(packageCategoryTable).values(
            categoryIds.map((categoryId) => ({
                packageId: id,
                categoryId,
            } as any))
        );
    }

    revalidatePath("/admin/packages");
    revalidatePath(`/admin/packages/edit/${id}`);
}

export async function deletePackage(id: number) {
    await db.delete(packageCategoryTable).where(eq(packageCategoryTable.packageId, id));
    await db.delete(itineraryTable).where(eq(itineraryTable.packageId, id));
    await db.delete(packageMediaTable).where(eq(packageMediaTable.packageId, id));
    await db.delete(PackageTable).where(eq(PackageTable.id, id));
    revalidatePath("/admin/packages");
}

// Queries
export async function getQueries() {
    return await db.select().from(formQueryTable).orderBy(sql`${formQueryTable.createdAt} DESC`);
}

// Pricing Titles
export async function getPricingByPackageId(packageId: number) {
    return await db.select().from(priceTitleTable).where(eq(priceTitleTable.packageId, packageId));
}

export async function savePricing(packageId: number, data: PriceTitleInput[]) {
    await db.delete(priceTitleTable).where(eq(priceTitleTable.packageId, packageId));
    if (data.length > 0) {
        await db.insert(priceTitleTable).values(
            data.map((item) => ({ ...item, packageId } as any))
        );
    }
    revalidatePath(`/admin/packages/edit/${packageId}`);
}

// Itinerary
export async function getItineraryByPackageId(packageId: number) {
    return await db.select().from(itineraryTable).where(eq(itineraryTable.packageId, packageId)).orderBy(sql`${itineraryTable.day} ASC`);
}

export async function saveItinerary(packageId: number, data: ItineraryInput[]) {
    await db.delete(itineraryTable).where(eq(itineraryTable.packageId, packageId));
    if (data.length > 0) {
        await db.insert(itineraryTable).values(
            data.map((item) => ({ ...item, packageId } as any))
        );
    }
    revalidatePath(`/admin/packages/edit/${packageId}`);
}

// Media
export async function getMediaByPackageId(packageId: number) {
    return await db.select().from(packageMediaTable).where(eq(packageMediaTable.packageId, packageId));
}

export async function saveMedia(packageId: number, data: PackageMediaInput[]) {
    await db.delete(packageMediaTable).where(eq(packageMediaTable.packageId, packageId));
    if (data.length > 0) {
        await db.insert(packageMediaTable).values(
            data.map((item) => ({ ...item, packageId } as any))
        );
    }
    revalidatePath(`/admin/packages/edit/${packageId}`);
}

// Category FAQs
export async function getFaqsByCategoryId(categoryId: number) {
    return await db.select().from(categoryFaqTable).where(eq(categoryFaqTable.categoryId, categoryId)).orderBy(sql`${categoryFaqTable.id} ASC`);
}

export async function saveCategoryFaqs(categoryId: number, data: CategoryFaqInput[]) {
    await db.delete(categoryFaqTable).where(eq(categoryFaqTable.categoryId, categoryId));
    if (data.length > 0) {
        await db.insert(categoryFaqTable).values(
            data.map((item) => ({ ...item, categoryId } as any))
        );
    }
    revalidatePath(`/admin/categories`);
}

export async function submitQuery(data: FormQueryInput) {
    const result = await db.insert(formQueryTable).values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        slug: data.slug,
    } as any).returning();
    revalidatePath("/admin/queries");
    return result[0];
}

export async function deleteQuery(id: number) {
    await db.delete(formQueryTable).where(eq(formQueryTable.id, id));
    revalidatePath("/admin/queries");
}

// Blogs
export async function getBlogs() {
    return await db.select().from(blogTable).orderBy(sql`${blogTable.createdAt} DESC`);
}

export async function getBlogById(id: number) {
    const [blog] = await db.select().from(blogTable).where(eq(blogTable.id, id));
    if (!blog) return null;

    const categories = await db
        .select({ categoryId: blogToCategoryTable.categoryId })
        .from(blogToCategoryTable)
        .where(eq(blogToCategoryTable.blogId, id));

    return {
        ...blog,
        categoryIds: categories.map((c) => c.categoryId),
    };
}

export async function getBlogBySlug(slug: string) {
    const [blog] = await db.select().from(blogTable).where(eq(blogTable.slug, slug));
    if (!blog) return null;

    const categories = await db
        .select({ categoryId: blogToCategoryTable.categoryId })
        .from(blogToCategoryTable)
        .where(eq(blogToCategoryTable.blogId, blog.id));

    return {
        ...blog,
        categoryIds: categories.map((c) => c.categoryId),
    };
}

export async function createBlog(data: BlogInput) {
    const { categoryIds, ...blogData } = data;

    const result = await db.insert(blogTable).values({
        ...blogData,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as any).returning();

    const blogId = result[0].id;
    console.log(blogId)
    console.log(JSON.stringify(categoryIds))

    if (categoryIds.length > 0) {
        await db.insert(blogToCategoryTable).values(
            categoryIds.map((categoryId) => ({
                blogId,
                categoryId,
            } as any))
        );
    }

    revalidatePath("/admin/blogs");
    return result[0];
}

export async function updateBlog(id: number, data: BlogInput) {
    const { categoryIds, ...blogData } = data;

    await db
        .update(blogTable)
        .set({
            ...blogData,
            updatedAt: new Date(),
        } as any)
        .where(eq(blogTable.id, id));

    // Update categories: delete existing and insert new
    await db.delete(blogToCategoryTable).where(eq(blogToCategoryTable.blogId, id));

    if (categoryIds.length > 0) {
        await db.insert(blogToCategoryTable).values(
            categoryIds.map((categoryId) => ({
                blogId: id,
                categoryId,
            } as any))
        );
    }

    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/edit/${id}`);
}

export async function deleteBlog(id: number) {
    await db.delete(blogToCategoryTable).where(eq(blogToCategoryTable.blogId, id));
    await db.delete(blogTable).where(eq(blogTable.id, id));
    revalidatePath("/admin/blogs");
}

// Blog Categories
export async function getBlogCategories() {
    return await db.select().from(blogCategoryTable).orderBy(sql`${blogCategoryTable.createdAt} DESC`);
}

export async function getBlogCategoryById(id: number) {
    const [category] = await db.select().from(blogCategoryTable).where(eq(blogCategoryTable.id, id));
    return category || null;
}

export async function createBlogCategory(data: BlogCategoryInput) {
    const result = await db.insert(blogCategoryTable).values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as any).returning();
    revalidatePath("/admin/blog-categories");
    return result[0];
}

export async function updateBlogCategory(id: number, data: BlogCategoryInput) {
    const result = await db
        .update(blogCategoryTable)
        .set({
            ...data,
            updatedAt: new Date(),
        } as any)
        .where(eq(blogCategoryTable.id, id))
        .returning();
    revalidatePath("/admin/blog-categories");
    return result[0];
}

export async function deleteBlogCategory(id: number) {
    await db.delete(blogToCategoryTable).where(eq(blogToCategoryTable.categoryId, id));
    await db.delete(blogCategoryTable).where(eq(blogCategoryTable.id, id));
    revalidatePath("/admin/blog-categories");
}
