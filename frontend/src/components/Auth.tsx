import type { SignupType } from "@ashish2628/common";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const navigate = useNavigate();
    const [postinput, setpostinput] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setloading] = useState(false);

    async function sendreq() {
        try {
            setloading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postinput);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            alert("error while signing up");
        } finally {
            setloading(false);
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
                            <Link className="pl-1.5 underline" to={type === "signup" ? "/signin" : "/signup"}>
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
                    <LoadingButton loading={loading}
                        text = {(type === "signin") ? "Signin": "Signup"}
                        loadingText = {(type === "signin") ? "Signing in...": "Signing up..."}
                        onClick={sendreq}/>
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

type LoadingButtonProps = {
  loading: boolean;
  text: string;
  loadingText: string;
  onClick: () => void;
};


export const LoadingButton = ({ loading, text , loadingText , onClick } : LoadingButtonProps) => {
    return <button
        onClick={onClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 mt-5 bg-black text-white"
    >
        {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        )}
        {loading ? loadingText : text}
    </button>
}