import { useEffect, useState } from "react"
import  axios  from "axios";
import { BACKEND_URL } from "../config";

export interface Blogs{
    "id": string,
    "title": string,
    "content": string,
    "published": true | false,
    "publishedAt": string,
    "authorId": string,
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blogs | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlog(response.data.blog);
      } catch (err) {
        console.error("Failed to fetch blog", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
    else setLoading(false);
  }, [id]);

  return { loading, blog };
};

export const useBlogs = () => {
    const [loading , setloading] = useState(true);
    const [blogs , setblogs] = useState<Blogs[]>([]);

    useEffect (()=>{
        const fetchblogs = async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers : {
                   Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setblogs(response.data.blogs);
            setloading(false);
        }
        fetchblogs()
    },[])
    return {
        loading, 
        blogs
    }
}