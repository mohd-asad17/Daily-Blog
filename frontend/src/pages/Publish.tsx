import { useState, type ChangeEvent } from "react";
import { Appbar } from "../component/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8 ">
            <div className="max-w-screen-lg w-full">
                <textarea onChange={(e) => {
                    setTitle(e.target.value);
                }} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg  focus:outline-none " placeholder="Title"></textarea>
                <TextEditor onChange={(e) => {
                    setDescription(e.target.value);
                }} />
                <button onClick={async () => {
                   const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title, description
                    },{
                        headers:{
                             Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    navigate(`/blog/${response.data.id}`);
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}

function TextEditor({onChange} : {onChange : (e : ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div>
            <div className="w-full mb-4 ">
                <div className="flex items-center justify-between  ">
                    <div className="py-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className="pl-2 block w-full px-0 text-sm text-gray-800 bg-white focus:outline-none " placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
            </div>
        </div>

    );
}