import { useState, type ChangeEventHandler, type EventHandler } from "react";
import { BrowserRouter, Link } from "react-router-dom"

export const Auth = () => {
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="ml-3">
                    <div>
                        Already have an account?
                            <Link className="pl-1.5" to={"/signin"}>Login</Link>
                    </div>
                </div>
                <div>
                    <LablledInput label="username" placeholder="Ashish" onchange/>
                </div>
            </div>
        </div>
    </div>
}

interface LablledInputType{
    label : string;
    placeholder : string;
    onchange : (e : ChangeEventHandler<HTMLInputElement>) => void;
}

function LablledInput({label , placeholder , onchange} : LablledInputType){
    return <div>
            <label className="block mb-2.5 text-sm font-medium text-heading">{label}</label>
            <input onChange={onchange} type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
        </div>
}