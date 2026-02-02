import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogCardSkeleton } from "../components/BlogcardSkeleton";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar />
                {[1, 2, 3, 4, 5].map((i) => (
            <BlogCardSkeleton key={i} />
        ))}
    </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">{
            blogs.map(blog => <BlogCard id={blog.id} authorname={blog.author.name || "Anonymous"}title={blog.title} 
            content={blog.content}
            publishedate={new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })}/>)
            }</div>
        </div>
    </div>
}