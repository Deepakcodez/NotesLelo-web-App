
import { GroupCard } from "./shared/GroupCard"


const Home = () => {


    return (
      <>

        <div className="pt-20 px-[1rem] md:px-[6rem]  justify-center   w-full     overflow-y-scroll no-scrollbar  pb-[30rem] h-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 "
         

        >
          <GroupCard  />



        </div>
      </>
    )
  }

export default Home