import { Appbar } from "../component/Appbar"
import { Blogcard } from "../component/Blogcard"
import { BlogSkeleton } from "../component/BlogSkeleton";
 import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if(loading){
        <div>
            <Appbar />
        <div className="flex justify-center">
            <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            </div>
            </div>
        </div>
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center ">
                <div    >
                     {blogs.map(blog =>
            <Blogcard
            id={blog.id}
              title={blog.title}
              description={blog.description}
              publishedDate={"2nd Feb 2024"}
              authorName={blog.author.name || "Anonymous"}
            />)}
                </div>
            </div>
        </div>
    );
}