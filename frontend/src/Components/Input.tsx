import cn from "@/utils/cn";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, required = false, className, ...props }) => {
    return (
        <div className="w-full flex flex-col">
            <label className="block text-left text-sm font-medium leading-6 text-white">
                {label}
                {required && <span className="text-lg font-bold">*</span>}
            </label>

            <div className="mb-2">

                <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                        className={cn("block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6", className)}
                        {...props}
                    />
                </div>
            </div>
        </div>
    );
};

export default Input;
