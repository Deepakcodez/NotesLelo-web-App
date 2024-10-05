import { deleteDemand } from "@/services"
import { X } from "lucide-react"
import React from "react"
import toast from "react-hot-toast";


interface Props {
    demandId: string;
}
const DeleteDemand: React.FC<Props> = ({ demandId }) => {

    const deleteDemandHandler = async () => {
        try {
            await deleteDemand(demandId);
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div onClick={deleteDemandHandler} >
            <X color="white" size={15} />
        </div>
    )
}
export default DeleteDemand