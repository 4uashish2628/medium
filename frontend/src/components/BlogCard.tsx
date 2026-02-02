import { useState } from "react"
import { Link } from "react-router-dom"

interface BlogCardProps {
    id: string
    authorname: string
    title: string
    content: string
    publishedate: string
}


export const BlogCard = ({
    id,
    authorname,
    title,
    content,
    publishedate
}: BlogCardProps) => {
    const [liked, setliked] = useState(false);
    return <Link to={`/blog/${id}`}>
        <div className="px-4 pt-2 pb-6 border-b border-slate-200 w-full max-w-2xl mx-auto">
            <div className="flex items-center">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorname} size="small" />
                </div>
                <div className="font-thin text-sm pl-2 pt-0.5 flex justify-center flex-col">
                    {authorname}
                </div>
            </div>
            <div className="text-lg font-semibold ">
                {title.slice(0, 55) + "..."}
            </div>
            <div className="font-thin text-sm">
                {content.slice(0, 170) + "..."}
            </div>
            <div className="flex justify-between items-center px-1 mt-2">
                <div className="flex items-center space-x-4 text-sm text-slate-600 font-thin">
                    <div>{publishedate}</div>
                    <button
                        aria-label="like"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setliked(!liked);
                        }}
                        className="flex items-center transition-transform active:scale-90"
                    >
                        <Heart liked={liked} />
                    </button>
                    <button aria-label="comments" className="flex items-center">
                        <Comments />
                    </button>
                </div>
                <div>
                    <button aria-label="more" className="p-1">
                        <More />
                    </button>
                </div>
            </div>
        </div>
    </Link>
}

export const Avatar = ({ name, size }: { name: string, size: "small" | "big" }) => {
    return <div className={`m-1 relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-9 h-9"} overflow-hidden bg-slate-200 rounded-full`}>
        <span className={`font-medium text-body ${size === "small" ? "text-xs" : "text-md"} `}>{name[0]}</span>
    </div>
}

function Heart({ liked }: { liked: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={liked ? "red" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            className={`size-4 transition-colors ${liked ? "text-red-500" : "text-slate-600"
                }`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
        </svg>
    );
}


function Comments() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clipRule="evenodd" />
        </svg>

    </div>
}

function More() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM15.375 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
        </svg>

    </div>
}