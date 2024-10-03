import React from "react"
import {motion} from "framer-motion"
import { IoHandLeftOutline } from "react-icons/io5"

interface DemandButtonProps {
  setDemand: React.Dispatch<React.SetStateAction<boolean>>
}

const DemandButton:React.FC<DemandButtonProps> = ({setDemand}) => {
  return (
    <motion.div
    initial={{ x: 40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      type: "spring",
      delay: 0.3,
      duration: 1,
      stiffness: 300,
    }}
    className="demand absolute p-4 mt-[30rem] text-center text-xl rounded-full bg-lime-400 hover:bg-lime-500 shadow-md border-lime-600 border-2 self-end right-10 bottom-[2rem] md:bottom-[5rem]"
    onClick={() => setDemand(true)}
  >
    <IoHandLeftOutline />
  </motion.div>
  )
}
export default DemandButton