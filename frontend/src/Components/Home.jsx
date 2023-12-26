import { GroupCard } from "./shared/GroupCard"

const Home=()=> {


  return (
    <>
    <div className="pt-20 px-7    w-full   gap-10  grid justify-center overflow-y-scroll no-scrollbar  pb-[30rem]"
    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(5rem , 20rem))' }}

    >
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
      
      
    </div>
    </>
  )
}

export default Home