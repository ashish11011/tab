import { getBlogBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, User, CalendarDays } from "lucide-react";
import { BlogQueryForm } from "@/components/BlogQueryForm";

interface BlogDetailsProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogDetailsProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: "Blog Not Found | Travel Packages",
        };
    }

    return {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.description,
        keywords: blog.metaKeywords,
        openGraph: {
            title: blog.metaTitle || blog.title,
            description: blog.metaDescription || blog.description,
            images: blog.image ? [blog.image] : [],
        },
    };
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white pb-20">
            {/* Blog Hero/Header */}
            <div className="w-full bg-neutral-900 relative">
                {/* Background Image with Overlay */}
                {blog.image && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                    </div>
                )}

                <div className="max-w-4xl mx-auto px-4 pt-32 pb-20 relative z-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-blue-300 hover:text-white transition-colors mb-8 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to All Blogs
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tig bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center text-neutral-300 gap-6 text-sm">
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-blue-400" />
                            <span className="font-medium text-white mr-2">{blog.userName}</span>
                            <span className="hidden sm:inline">| {blog.userPosition}</span>
                        </div>
                        <div className="flex items-center">
                            <CalendarDays className="w-4 h-4 mr-2 text-blue-400" />
                            <span>{format(new Date(blog.createdAt!), "MMMM d, yyyy")}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content and Sidebar Area */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Main Blog Content */}
                    <div className="lg:col-span-2">
                        <div
                            className="prose prose-lg md:prose-xl max-w-none prose-blue prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* End of article marker */}
                        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-neutral-500">
                            <p className="mb-4 sm:mb-0">Thanks for reading!</p>
                            <div className="flex space-x-4">
                                {/* Optional social share placeholders */}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Form */}
                    <div className="w-full">
                        <BlogQueryForm slug={blog.slug} />
                    </div>
                </div>
            </div>
        </article>
    );
}
