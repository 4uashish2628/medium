import type { Blogs } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog} : {blog : Blogs}) => {
    const publishedate= new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })

    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="max-w-2xl min-w-2xl pt-10">
                <div className="text-3xl font-extrabold py-4">
                {blog?.title}
                </div>
                <div className="flex items-center py-3">
                    <div className="flex items-center border-r">
                        <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        <div className="pl-2 pr-4 text-slate-400">
                            {blog.author.name}
                        </div>
                    </div>
                    <div className="px-6">
                        {publishedate}
                    </div>
                </div> 
                <div className="border-b py-3 pt-4 text-slate-600">
                    {blog.content}
                </div> 
            </div>
        </div>
    </div>
}