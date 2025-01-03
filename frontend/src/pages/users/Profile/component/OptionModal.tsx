import { createGroupContext } from "@/Context";
import axios from "axios";
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom";

interface OptionModalProps {
    setProfileOptionModal: React.Dispatch<React.SetStateAction<boolean>>;
    popupRef: React.RefObject<HTMLDivElement>
}

const OptionModal: React.FC<OptionModalProps> = ({ setProfileOptionModal, popupRef }) => {
    const navigate = useNavigate();

    const logout = async () => {
        const { currentUser } = useContext<any>(createGroupContext);
        const base_url = import.meta.env.VITE_BASE_URL as string;


        try {
            localStorage.removeItem("useDataToken");
            const resp = await axios.get(`http://localhost:8000/api/v1/user/logout/${currentUser?._id}`);
            setProfileOptionModal(false);
            navigate("/signIn");
        } catch (error) {
            console.log(error);
        } finally {
            setProfileOptionModal(false);
            navigate("/signIn");
            localStorage.removeItem("useDataToken");

        }
    };

    const signup = () => {
        setProfileOptionModal(false);
        navigate("/signUp");
    };

    return (
        <div
            ref={popupRef}
            className="popup absolute z-30 bg-slate-700 text-white shadow-lg py-1 w-[10rem] top-12 right-12 rounded-sm md:w-[12rem]"
        >
            <ul className="flex flex-col items-center">
                <li className="hover:bg-slate-600 w-full cursor-pointer py-3 ps-4">
                    <h1 onClick={signup}>New Account</h1>
                </li>
                <li className="hover:bg-slate-600 w-full cursor-pointer py-3 ps-4">
                    <h1 onClick={logout}>Logout</h1>
                </li>
            </ul>
        </div>
    )
}
export default OptionModal