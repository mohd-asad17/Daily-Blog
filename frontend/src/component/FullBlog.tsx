import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Blogcard"


export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div >
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className=" col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        post on 2nd dec 2023
                    </div>
                    <div className="pt-4">
                        {blog.description}
                    </div>
                </div>
                <div className="bg-emerald-400 col-span-4">
                    <div className="text-slate-600 text-lg">
                    Author
                    </div>
                    <div className="flex">
                        <div className="pr-4 flex flex-col justify-center">
                        <Avatar size="big" name={blog.author.name || "Anonymous"} /> 
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous "}
                            </div>

                            <div className="pt-2 text-slate-400">
                                Random catch phrase about the author's ability to grab the user's
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
}