import { GroupCard } from "./shared/GroupCard"

const Home=()=> {


  return (
    <>
    <div className="pt-20 px-[.5rem] md:px-[6rem]  justify-center md:justify-start   w-full   gap-10  grid  overflow-y-scroll no-scrollbar  pb-[30rem]"
    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(5rem , 20rem))' }}

    >
      <GroupCard/>
    
      
      
    </div>
    </>
  )
}

export default Home