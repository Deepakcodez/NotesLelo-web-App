import { GroupCard } from "./shared/GroupCard"

const Home=()=> {


  return (
    <>
    <div className="pt-20 px-6 pb-[60rem]  md:pb-0 w-full  flex gap-5 flex-wrap   ">
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
    </div>
    </>
  )
}

export default Home