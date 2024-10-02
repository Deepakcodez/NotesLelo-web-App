import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { createGroupContext } from "../../../../Context";
import axios from "axios";
import { IoHandLeftOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useSWR from "swr";
import Lottie from "lottie-react";
import loaderBook from "../../../../assets/loaderbook.json";



export const GroupDemand: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const groupId = localStorage.getItem("groupId") as string;
  const [newDemands, setNewDemands] = useState<any[]>([]);

  const { demand, setDemand, currentUser } = useContext<any>(createGroupContext);

  useEffect(() => {
    // Scroll to the bottom of the messages when they change
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newDemands]); // Ensure this runs when new demands are added

  const { data, error } = useSWR<any[]>(
    `https://notes-lelo-app-backend.vercel.app/api/v1/demand/demands/${groupId}`,
    async (url: string) => {
      try {
        const resp = await axios.get(url);
        console.log(">>>>>>>>>>>", resp.data.data);
        return resp.data.data;
      } catch (error) {
        console.log(">>>>>>>>>>>", error);
        throw error; // Rethrow error to SWR
      }
    }
  );

  useEffect(() =>{
    if (data) {
      console.log('>>>>>>>>>>>data', data) }
  },[data])

  if (error) {
    console.log("Error fetching data:", error);
    return (
      <div className="text-white p-5 font-semibold text-lg">
        Error fetching data. Please try again later.🤖  
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[80vh] w-full justify-center items-center">
        <Lottie className="h-[5rem]" animationData={loaderBook} loop={true} />
      </div>
    );
  }

  return (
    <>
      <div
        className="demandContent flex flex-col gap-5 overflow-y-scroll no-scrollbar w-full h-[calc(100vh-10.15rem)] py-3 pt-[3rem] px-6"
      >
        {data?.map((dmd, index) => (
          <Fragment key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                ease: "linear",
                duration: 0.2,
                delay: index * 0.3,
              }}
              ref={scrollRef}
              className={`${
                dmd.from === currentUser._id
                  ? "self-end"
                  : "self-start"
              } min-h-[10rem] max-h-[20rem] w-[90%] sm:w-[70%] md:w-[40%] bg-slate-600 rounded-lg px-1 border-gray-200`}
              style={{
                borderTop: "1rem solid orange",
                borderBottom: "1px solid white",
              }}
            >
              <div className="flex justify-between">
                <h1 className="sender text-orange-300">
                  {dmd.user?.name.toUpperCase()}
                </h1>
                <div className="text-white/25">
                  {new Date(dmd.demand.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="messageArea h-[80%] overflow-y-scroll text-2xl font-bold text-white p-5 overflow-auto no-scrollbar">
                {dmd?.demand?.message || "Something wrong"}
              </div>
            </motion.div>
          </Fragment>
        ))}


        
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
      </div>
    </>
  );
};
