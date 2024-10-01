import React, { useContext, useState } from 'react';
import { createGroupContext } from '../../../Context';
import axios from 'axios';

export const InviteUser = () => {
    const { showInviteForm, setInviteForm, currentUser } = useContext(createGroupContext);
    const [emailValue, setEmailValue] = useState({ email: "" });
    const [warningMsg, setWarningMsg] = useState("");
    const token = localStorage.getItem("useDataToken");
    const groupId = localStorage.getItem("groupId")
    const [loading, setLoading] = useState(false);
    const changeHandler = (e) => {
        setEmailValue({ email: e.target.value });
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const invite = async (e) => {
        e.preventDefault();
        const { email } = emailValue;
        try {
            if (email.trim() === "") {
                setWarningMsg("No Email provided");
            } else if (!isValidEmail(email)) {
                setWarningMsg("Invalid Email format");
            } else {
                setLoading(true); // Set loading to true before making the request
                const response = await axios.post(
                    "https://notes-lelo-app-backend.vercel.app/api/v1/group/invite",
                    { email: emailValue.email, groupId },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            token: token,
                            withCredentials: true,
                        },
                    }
                );
                console.log('Response:', response.data); // Handle response from backend
            }
        } catch (error) {
            console.log('Error:', error); // Handle error
        } finally {
            setLoading(false); // Set loading to false after the request completes
            setInviteForm(false)
        }
    }


    return (
        <>
            {showInviteForm && (
                <div className="wrapper h-screen w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
                    <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
                        <form>
                            <label htmlFor="title" className="block text-left text-sm font-medium leading-6 text-white">Email</label>
                            <div className="mb-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        name="email"
                                        value={emailValue.email}
                                        onChange={changeHandler}
                                        placeholder="User email who wants to join..."
                                        className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <button onClick={invite} className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 hover:text-white">
                                {loading ? "Sending..." : "Invite"}
                            </button>

                            <button className="bg-red-400 rounded md py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white" onClick={() => setInviteForm(false)}>Cancel</button>{" "}
                        </form>
                        <div className="h-[2rem]">
                            {warningMsg && <h1 className="warning text-slate-400">Warning: {warningMsg}</h1>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InviteUser;
