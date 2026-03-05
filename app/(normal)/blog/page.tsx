import { getBlogs } from "@/lib/actions";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
    title: "Blog | Travel Packages",
    description: "Read our latest travel blogs, tips, and destination guides.",
};

export default async function BlogListPage() {
    const blogs = await getBlogs();

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Hero Section */}
            <div className="bg-blue-600 py-20 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Travel Blog</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto px-4 text-blue-100">
                    Discover travel tips, destination guides, and inspiring stories from our experts.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-16">
                {blogs.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No blogs published yet.</p>
                        <p className="mt-2">Check back soon for inspiring travel content!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Link
                                href={`/blog/${blog.slug}`}
                                key={blog.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-60 overflow-hidden bg-neutral-200">
                                    {blog.image ? (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                            No Image Available
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                                        <span>{format(new Date(blog.createdAt!), "MMM d, yyyy")}</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {blog.title}
                                    </h2>

                                    <p className="text-gray-600 line-clamp-3 mb-6 grow">
                                        {blog.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{blog.userName}</p>
                                                <p className="text-xs text-gray-500">{blog.userPosition}</p>
                                            </div>
                                        </div>
                                        <span className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-block">
                                            Read More →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
