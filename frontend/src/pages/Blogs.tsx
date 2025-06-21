import { Appbar } from "../component/Appbar"
import { Blogcard } from "../component/Blogcard"
 import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if(loading){
        <div>loading ...</div>
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center ">
                <div className=" max-w-xl ">
                     {blogs.map(blog =>
            <Blogcard
              key={blog.id}
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