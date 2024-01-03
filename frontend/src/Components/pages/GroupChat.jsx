import { Fragment, useContext, useEffect, useState } from "react"
import { SlOptionsVertical } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const GroupChat = () => {

  const token = localStorage.getItem("useDataToken");
  const id = localStorage.getItem("groupId")
const navigate = useNavigate()
const [groupData,setGroupData] = useState({
  "title" : "",
  "description": ""
})
  
   const fetchData = async()=>{
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/group/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log("Group data:", response);
      setGroupData({"title":response.data.data.title})
    } catch (error) {

      console.log("Error fetching data:", error);
      navigate("/")
    }
  };
   
  useEffect(() => {
    if (!id) {
      // If groupId is not present, navigate to the root path
      navigate("/");
    } else {
      fetchData();
    }
  }, [id, navigate]);
  


  return (
    <Fragment>
        <div className="containet h-[calc(100%-4rem)] md:h-full w-full  flex flex-col justify-between">
            <div className="navbar bg-slate-500      w-full h-[3rem] flex items-center ">
                <ul className="flex h-full items-center justify-between px-5 w-full">
                    <li className="font-bold text-xl">{groupData.title}</li>
                    <li><SlOptionsVertical/></li>
                </ul>
            </div>
            <div className="tpyingArea bg-slate-300 h-[3rem] flex items-center gap-2">
              <GoPlus
              className="text-3xl"
              />
                     <input type="text" placeholder="enter message"
                     className="w-[80%] h-[1.8rem] px-2 rounded-md"
                     />
                     <IoMdSend
                     className="text-3xl"
                     />
            </div>
        </div>
    </Fragment>
  )
}
