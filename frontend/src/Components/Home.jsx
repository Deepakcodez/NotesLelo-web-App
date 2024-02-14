
import { useEffect, useState } from "react"
import { GroupCard } from "./shared/GroupCard"


const Home = () => {
const [isfetching , setFetching] = useState(false)
    


     const  fetchingCheck=(state)=>{
      setFetching(state);
      console.log('>>>>>>>>>>>',isfetching)

     }



    return (
      <>
 <div className={` ${isfetching ? "h-full w-full bg-slate-800 flex justify-center items-center "   : "pt-20 px-[1rem] md:px-[6rem] justify-center w-full overflow-y-scroll no-scrollbar pb-[30rem] h-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"}`}>
        
        <GroupCard fetching={fetchingCheck} />
        {
          isfetching&& 
          <>
          <div className="">

           <h1 className="text-white">nothing to show</h1>
          </div>
          </>
        }
      </div>
      </>
    )
  }

export default Home