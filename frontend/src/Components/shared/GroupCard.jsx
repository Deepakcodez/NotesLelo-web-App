import axios from "axios";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { createGroupContext } from "../../Context";

export const GroupCard = () => {
  const navigate = useNavigate();
  const { isCreateGroup, setCreateGroup } = useContext(createGroupContext);

  const userIdRefs = useRef([]);
  const [enlargeIcon, setEnlargeIcon] = useState(null);
  const [groups, setGroups] = useState([]);
  const token = localStorage.getItem("useDataToken");

  useEffect(() => {
    const fetchingAllGroup = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/group/all",
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        setGroups(response.data.Groups);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchingAllGroup();
  }, [isCreateGroup]);

  const copyIdHandler = (index) => {
    try {
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
    console.log('Clicked on Group ID:', groupId);

    navigate("/group/demand");
    localStorage.setItem("groupId", groupId);
  };

  return (
    <>
      {groups.map((group, index) => (
        <Fragment key={index}>
          <div
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
                  className={`text-orange-200 hover:text-orange-300 ${
                    enlargeIcon === index ? "text-xl" : "text-lg"
                  } `}
                  onClick={() => copyIdHandler(index)}
                />
              </div>
            </div>
            <h1 className="p-2 text-slate-200">{group.description}</h1>
          </div>
        </Fragment>
      ))}
    </>
  );
};
