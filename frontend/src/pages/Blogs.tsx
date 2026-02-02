import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            loading...
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