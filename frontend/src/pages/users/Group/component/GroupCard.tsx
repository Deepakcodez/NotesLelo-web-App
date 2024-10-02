import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import { HomePageGhost } from "../../../../Components/shared/ghost/HomePageGhost";

interface Group {
  _id: string;
  title: string;
  description: string;
}

interface GroupCardProps {
  fetching: (isEmpty: boolean) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ fetching }) => {
  const navigate = useNavigate();
  const userIdRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [enlargeIcon, setEnlargeIcon] = useState<number | null>(null);
  const token = localStorage.getItem("useDataToken") || "";

  // Fetch groups using SWR
  const { data, error } = useSWR<Group[]>('https://notes-lelo-app-backend.vercel.app/api/v1/group/all', async (url: any) => {
    try {
      const resp = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (resp.data.Groups.length === 0) {
        fetching(true); // Notify that fetching returned an empty list
      }
      return resp.data.Groups;
    } catch (err) {
      console.error("Error fetching groups:", err);
      throw err;
    }
  });

  const copyIdHandler = (event: React.MouseEvent, index: number) => {
    try {
      event.stopPropagation();
      setEnlargeIcon(index);
      setTimeout(() => {
        setEnlargeIcon(null);
      }, 100);

      const textToCopy = userIdRefs.current[index]?.value || "";
      navigator.clipboard.writeText(textToCopy);
      console.log("Text successfully copied to clipboard:", textToCopy);
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };

  const cardClickHandler = (groupId: string) => {
    navigate("/group/demand");
    localStorage.setItem("groupId", groupId);
  };

  if (error) {
    console.log("Error fetching data:", error);
    return <div className="text-white font-semibold text-lg">Error fetching data. Please try again later.🤖</div>;
  }

  if (!data) {
    return <HomePageGhost />;
  }

  return (
    <>
      {data.map((group, index) => (
        <Fragment key={group._id}>
          <div
            onClick={() => cardClickHandler(group._id)}
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
                  disabled
                  className="groupID text-slate-500 text-sm bg-transparent"
                />
                <IoCopy
                  className={`text-orange-200 hover:text-orange-300 ${enlargeIcon === index ? 'text-xl' : 'text-lg'}`}
                  onClick={(event) => copyIdHandler(event, index)}
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
