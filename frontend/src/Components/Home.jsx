import { useContext, useRef, useState } from "react";
import { GroupCard } from "./shared/GroupCard";
import Spline from '@splinetool/react-spline';
import { createGroupContext } from "../Context";

const Home = () => {
  const { setCreateGroup } = useContext(createGroupContext);
  const [isfetching, setFetching] = useState(false);
 

  const fetchingCheck = (state) => {
    setFetching(state);
  };

  return (
    <div  className={`${isfetching ? "h-full w-full bg-slate-800/25 flex justify-center" : "pt-20 px-[1rem] md:px-[6rem] justify-center w-full overflow-y-scroll no-scrollbar pb-[30rem] h-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"}`}>
      {isfetching ? (
        <div className="h-full w-full relative flex justify-center ">
          <Spline className="pb-[9rem] md:pb-[0rem] " scene="https://prod.spline.design/yUsMpAgC4jEsWpfa/scene.splinecode" />
          <button 
            className="text-white shadow-md absolute bottom-[8rem] lg:bottom-[7rem] bg-blue-400 hover:bg-blue-500 px-3 py-1 border-blue-600 border rounded-lg "   
            onClick={() => setCreateGroup(true)} 
          >
            Create Group
          </button>
        </div>      ) : (
        <GroupCard fetching={fetchingCheck}  />
      )}
     
    </div>
  );
};

export default Home;