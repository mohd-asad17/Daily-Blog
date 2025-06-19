import type { SignUpInput } from "@mohd-asad17/common"
import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const Auth = ({ type }: { type : "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
async function sendRequest() {
      try{
         const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
       const jwt = response.data;
       localStorage.setItem("token", jwt);
       navigate("/blogs");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      catch(e){
        // alert the user that request failed
      }
    }

    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold"> {type == "signup" ? "Create an account" : "Log in to your account"}</div>
                    <div className="text-slate-500 text-center">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                        {type === "signin" ? "Sign up" : "Sign in"}</Link>
                    </div>
                </div>
                <div className="pt-4">
               {type === "signup" ?  < LabelledInput label="Name" placeholder="Enter you name" onchange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}  /> : null}
                <LabelledInput label="email" placeholder="example@gmail.com" onchange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} />
                <LabelledInput label="password" type="password" placeholder="Enter your password" onchange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />
                <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 w-full mt-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface labelledInputType {
    label: string,
    placeholder: string,
    type?: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onchange, type }: labelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
        <input onChange={onchange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}