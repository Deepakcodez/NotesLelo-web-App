import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoCopy } from "react-icons/io5";

export const GroupCard = () => {
  const userIdRefs = useRef([]);
  const [enlargeIcon, setEnlargeIcon] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchingAllGroup = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/group/all");
        console.log(">>>>>>>>>>>", response.data.Groups);
        setGroups(response.data.Groups);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchingAllGroup();
  }, []); // Use an empty dependency array to run the effect only once

  const copyIdHandler = (index) => {
    try {
      setEnlargeIcon(index);
      setTimeout(() => {
        setEnlargeIcon(null);
        // console.log("Icon size reset");
      }, 100);
      const textToCopy = userIdRefs.current[index].value;
      navigator.clipboard.writeText(textToCopy);
      console.log("Text successfully copied to clipboard:", textToCopy);
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };

  return (
    <>
      {groups.map((group, index) => (
        <div
          key={group.id} // Add a unique key for each mapped element
          className="card bg-slate-500/75 h-40  min-w-[auto] rounded-md shadow-lg border-[1px] border-t-slate-300 hover:border-t-slate-100 border-slate-400/50 hover:shadow-2xl hover:bg-slate-600 hover:scale-[1.009] outline-slate-200/5 outline-1 outline-offset-4 outline"
        >
          <div className=" border-b-[1px] pt-2 rounded-t-md border-b-slate-400/70 bg-slate-700">
            <h1 className="groupName px-4 font-bold text-white">
              {group.title}
            </h1>

            <div className="flex  items-center justify-between px-4 pb-2">
              <input
                type="text"
                value={group._id} // Assuming 'id' is the property you want to display
                ref={(el) => (userIdRefs.current[index] = el)}
                disabled={true}
                className="groupID text-slate-500 text-sm bg-transparent"
              />
              <IoCopy
                className={`text-orange-200   hover:text-orange-300 ${
                  enlargeIcon === index ? "text-xl" : "text-lg"
                } `}
                onClick={() => copyIdHandler(index)}
              />
            </div>
          </div>
          <h1 className="p-2  text-slate-200">
            {group.description}
          </h1>
        </div>
      ))}
    </>
  );
};
