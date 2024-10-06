import { createGroupContext } from "@/Context";
import { X } from "lucide-react"
import React from "react"


interface Props {
    demandId: string;
}
const DeleteDemandButton: React.FC<Props> = ({ demandId }) => {

    const { setIsShowDeleteDemand, setDemandId } = React.useContext<any>(createGroupContext)

    const onClickHandler = () => {
        setDemandId(demandId)
        setIsShowDeleteDemand(true)
    }


    return (
        <div onClick={onClickHandler} >
            <X color="white" size={15} />
        </div>
    )
}
export default DeleteDemandButton