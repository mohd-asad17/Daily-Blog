import { Appbar } from "../component/Appbar"
import { Blogcard } from "../component/Blogcard"

export const Blogs = () =>{
    return <div>
        <Appbar />
       <div className="flex justify-center ">
  <div className=" max-w-xl ">
        <Blogcard authorName={"Mohd Asad"}
        title={"going to the gym "}
        content={"Today is the saturday and it is weekend so at the evening i am going to gym with the friends"}
        publishedDate="20 june 2025"
        />
         <Blogcard authorName={"Mohd Asad"}
        title={"going to the gym "}
        content={"Today is the saturday and it is weekend so at the evening i am going to gym with the friends"}
        publishedDate="20 june 2025"
        />
         <Blogcard authorName={"Mohd Asad"}
        title={"going to the gym "}
        content={"Today is the saturday and it is weekend so at the evening i am going to gym with the friends"}
        publishedDate="20 june 2025"
        />
    </div>
     </div>
    </div>
   
}