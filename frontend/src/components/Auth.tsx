import type { SignupType } from "@ashish2628/common";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({type} : {type : "signin" | "signup"}) => {
    const navigate = useNavigate();
    const [postinput, setpostinput] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    })

    async function sendreq(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup" ? "signup" : "signin" }` , postinput);
            const jwt = response.data.token;
            console.log(response.data);
            localStorage.setItem("token" , jwt);
            navigate("/blogs");
        }catch(e){
            alert("error while signing up");
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        {type === "signup" ? "Create an account" : "--Welcome Back--"}
                    </div>
                    <div className="ml-3 text-slate-400">
                        <div>
                            {type === "signin" ? "Dont have an Account?" : "Already have an account?"}
                            <Link className="pl-1.5 underline" to={type === "signup"? "/signin" : "/signup"}>
                            {type === "signup" ? "Sign in" : "Sign up"}</Link>
                        </div>
                    </div>
                </div>
                <div className="pt-3">
                    {type === "signup" ? <LablledInput label="Name" placeholder="Ashish Singh" onchange={(e) => {
                        setpostinput({
                            ...postinput,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LablledInput label="Username" placeholder="Ashish@gmail.com" onchange={(e) => {
                        setpostinput({
                            ...postinput,
                            email: e.target.value
                        })
                    }} />
                    <LablledInput label="Password" type="password" placeholder="123456" onchange={(e) => {
                        setpostinput({
                            ...postinput,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendreq} className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 box-border border border-transparent focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none">{type === "signin" ? "Signin": "Signup"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LablledInputType {
    label: string;
    placeholder: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LablledInput({ label, placeholder, onchange, type }: LablledInputType) {
    return <div>
        <label className="block mb-2.5 text-sm font-semibold text-heading pt-4">{label}</label>
        <input onChange={onchange} type={type || "text"} id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
    </div>
}