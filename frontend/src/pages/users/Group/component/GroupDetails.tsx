import axios from "axios";
import React, { Fragment, useContext } from "react";
import useSWR from "swr";
import { MdCancel } from "react-icons/md";
import { createGroupContext } from "../../../../Context";
import { motion } from "framer-motion";
import { GroupMemberGhost } from "@/Components/shared/ghost/GroupMemberGhost";

interface Member {
  name: string;
  email: string;
}

export const GroupDetails: React.FC = () => {
  const token = localStorage.getItem("useDataToken") as string;
  const groupId = localStorage.getItem("groupId") as string;
  const { setGroupMembers } = useContext<any>(createGroupContext);
  const base_url = import.meta.env.VITE_BASE_URL as string;

  const { data, error } = useSWR<Member[]>(
    `http://localhost:8000/api/v1/group/members/${groupId}`,
    async (url: string) => {
      try {
        const resp = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        console.log(">>>>>>>>>>>member", resp.data.data);

        return resp.data.data;
      } catch (error) {
        console.log(">>>>>>>>>>>", error);
        return []; // Return an empty array in case of error
      }
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute shadow-md top-[1.5rem] right-5 rounded-lg border border-gray-400 h-[calc(100vh-7.15rem)] bg-slate-700 w-[70%] md:w-[30%]"
    >
      <div className="header flex px-3 justify-between items-center text-white bg-slate-800/25 font-semibold text-center py-2 text-lg border-b border-gray-500/50">
        <h1></h1>
        <h1>Members</h1>
        <motion.div whileTap={{ scale: 0.2 }}>
          <MdCancel
            className="text-2xl"
            onClick={() => setGroupMembers(false)}
          />
        </motion.div>
      </div>
      <div className="overflow-y-scroll no-scrollbar h-[calc(100vh-9.9rem)]">
        {data ? (
          data.map((item, index) => (
            <Fragment key={index}>
              <div className="hover:bg-slate-500/25 py-4 border-b-[1px] border-gray-100/25 mx-2">
                <h1 className="text-lg px-4 text-white font-semibold truncate">
                  {item.name}
                </h1>
                <h1 className="text-xs px-4 text-gray-200/50 truncate">
                  {item.email}
                </h1>
              </div>
            </Fragment>
          ))
        ) : (
          <GroupMemberGhost />
        )}
      </div>
    </motion.div>
  );
};
