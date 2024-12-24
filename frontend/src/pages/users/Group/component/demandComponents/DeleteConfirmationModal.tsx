import Lottie from "lottie-react"
import React from "react"
import loadingAnimation from "@assets/lading.json";
import { createGroupContext } from "@/Context";
import { deleteDemand } from "@/services";
import toast from "react-hot-toast";

const DeleteConfirmationModal:React.FC = () => {
    const {setIsShowDeleteDemand, demandId, setDemandId} = React.useContext<any>(createGroupContext)
  const [isLoadingBtn, setIsLoadingBtn] = React.useState<boolean>(false);
  
  const deleteDemandHandler = async () => {
    try {
        setIsLoadingBtn(true);
        await deleteDemand(demandId);
        setIsShowDeleteDemand(false);
        setDemandId("")
    } catch (error) {
        toast.error("Something went wrong")
    }
}

  return (
    <div className="wrapper h-screen w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
      <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">

        <h1 className="text-center text-white text-2xl font-bold">Are You Sure?</h1>
          <button
            type="submit"
            className="bg-red-500 rounded h-[2rem] flex justify-normal items-center py-1.5 w-full mt-3 hover:bg-red-400"
          >
            {isLoadingBtn ? (
              <Lottie className="h-[5rem] w-full" animationData={loadingAnimation} loop={true} />
            ) : (
              <h1 onClick={deleteDemandHandler} className="text-center w-full text-white">Remove</h1>
            )}
          </button>
          <button
            onClick={()=>setIsShowDeleteDemand(false)}
            type="button"
            className=" border-[1px] hover:bg-white hover:text-black border-white rounded md py-1.5 w-full mt-3 bg-white-500 text-white"
          >
            Cancel
          </button>
    
        
      </div>
    </div>
  )
}
export default DeleteConfirmationModal