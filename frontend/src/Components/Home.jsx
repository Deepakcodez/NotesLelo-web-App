import { useContext, useState } from "react";
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
    <div className={` ${isfetching ? "h-full w-full bg-slate-800/25 flex justify-center items-center " : "pt-20 px-[1rem] md:px-[6rem] justify-center w-full overflow-y-scroll no-scrollbar pb-[30rem] h-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"}`}>
      <GroupCard fetching={fetchingCheck} />
      {isfetching && 
        <div className="h-full w-full relative flex justify-center">
          <Spline scene="https://prod.spline.design/yUsMpAgC4jEsWpfa/scene.splinecode" />
          <button 
            className="text-white absolute bottom-[3rem] lg:bottom-[7rem] bg-blue-400 px-3 py-1 border-blue-600 border rounded-lg "   
            onClick={() => setCreateGroup(true)} 
          >
            Create Group
          </button>
        </div>
      }
    </div>
  );
};

export default Home;
