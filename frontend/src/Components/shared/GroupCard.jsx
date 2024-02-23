import axios from "axios";
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { createGroupContext } from "../../Context";
import { HomePageGhost } from "./ghost/HomePageGhost";
import { motion } from 'framer-motion'
import useSWR  from 'swr'



export const GroupCard = ({ fetching, refrenceBox }) => {
  const navigate = useNavigate();
  const userIdRefs = useRef([]);
  const [enlargeIcon, setEnlargeIcon] = useState(null);
  const [groups, setGroups] = useState([]);
  const token = localStorage.getItem("useDataToken");

  
  const { data, error} = useSWR('https://notes-lelo-app-backend.vercel.app/api/v1/group/all',
    async (url) => {
      try {
        const resp = await axios(url, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        console.log('>>>>>>>>>>>', resp.data.Groups)
        if (!resp.data.data) {
          fetching(true)
        }
        return resp.data.Groups

      } catch (error) {
        console.log('>>>>>>>>>>>', error)
      }
     
    }
  )


  const copyIdHandler = (event, index) => {
    try {
      event.stopPropagation();
      setEnlargeIcon(index);
      setTimeout(() => {
        setEnlargeIcon(null);
      }, 100);
      const textToCopy = userIdRefs.current[index].value;
      navigator.clipboard.writeText(textToCopy);
      console.log("Text successfully copied to clipboard:", textToCopy);
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };

  const cardClickHandler = async (groupId) => {
    navigate("/group/demand");
    localStorage.setItem("groupId", groupId);
  };

  if (error) {
    console.log("Error fetching data:", error);
    return <div className="text-white font-semibold text-lg">Error fetching data. Please try again later.🤖</div>;
  }

  if (!data ) {
    return <HomePageGhost />;
  }

  else {
    return (
      <>
        {data?.map((group, index) => (
          <Fragment key={index}>
            <motion.div
              drag
              dragConstraints={refrenceBox}
              whileDrag={{ scale: 1.2 }}
              dragElastic={.1}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                //  ease: "linear",
                type: "spring",
                stiffness: 150,
                duration: .2,
                delay: (index * 0.3)
              }}
              onClick={() => cardClickHandler(group._id)}
              value={group._id}
              className="card bg-slate-500/75 h-40 min-w-[auto] rounded-md shadow-lg border-[1px] border-t-slate-300 hover:border-t-slate-100 border-slate-400/50 hover:shadow-2xl hover:bg-slate-600 hover:scale-[1.009] outline-slate-200/5 outline-1 outline-offset-4 outline"
            >
              <div className="border-b-[1px] pt-2 rounded-t-md border-b-slate-400/70 bg-slate-700">
                <h1 className="groupName px-4 font-bold text-white">
                  {group.title.toUpperCase()}
                </h1>
                <div className="flex items-center justify-between px-4 pb-2">
                  <input
                    type="text"
                    value={group._id}
                    ref={(el) => (userIdRefs.current[index] = el)}
                    disabled={true}
                    className="groupID text-slate-500 text-sm bg-transparent"
                  />
                  <IoCopy
                    className={`text-orange-200 hover:text-orange-300 ${enlargeIcon === index ? 'text-xl' : 'text-lg'
                      } `}
                    onClick={(event) => copyIdHandler(event, index)}
                  />
                </div>
              </div>
              <h1 className="p-2 text-slate-200">{group.description}</h1>
            </motion.div>
          </Fragment>
        ))}
      </>
    );
  }
}