import moment from "moment"
import React, { useContext } from "react"
import LikeDislikeButons from "./LikeDislikeButons"
import { motion } from "framer-motion"
import { createGroupContext } from "@/Context"
import DeleteDemandButton from "./DeleteDmdBrn"

interface Props {
  data: any;
}
const DemandCard: React.FC<Props> = ({ data }) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const { demand, currentUser } = useContext<any>(createGroupContext);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, demand]);

  return (
    <>
      {data?.map((dmd: any, index: number) => (
        <React.Fragment key={index}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: "linear",
              duration: 0.2,
              delay: index * 0.3,
            }}
            ref={scrollRef}
            className={`${dmd.demand.from === currentUser._id
              ? "self-end"
              : "self-start"
              } min-h-[10rem]  h-auto  w-[90%] sm:w-[70%] md:w-[40%] bg-slate-600 rounded-lg px-1 border-gray-200`}
            style={{
              borderTop: "1rem solid orange",
              borderBottom: "1px solid white",
            }}
          >
            <div className="flex justify-between">
              <h1 className="sender text-orange-300 text-xs">
                {dmd.user?.name.toUpperCase()}
              </h1>
              <div className="text-white/25 text-xs">
                {moment(dmd.demand.createdAt).format('MMMM Do YYYY, h:mm a')}
              </div>
            </div>
            <div className="messageArea h-[70%] overflow-y-scroll text-xl font-semibold text-white p-5 overflow-auto no-scrollbar">
              {dmd?.demand?.message || "Something wrong"}
            </div>
            <div className="flex justify-between items-center ">
              <LikeDislikeButons dmd={dmd} />
              {
                dmd.demand.from === currentUser._id &&
                <DeleteDemandButton demandId={dmd.demand._id} />
              }

            </div>

          </motion.div>
        </React.Fragment>
      ))}
    </>
  )
}
export default DemandCard