import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../component/FullBlog";
import { Spinner } from "../component/Spinner";
import { Appbar } from "../component/Appbar";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });
    if (loading || !blog) {
        return <div>
            <Appbar />
            <div className="flex justify-center flex-col h-screen">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>;
        </div>

    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}