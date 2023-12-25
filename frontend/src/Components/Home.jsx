import { GroupCard } from "./shared/GroupCard"

const Home=()=> {


  return (
    <>
    <div className="pt-20 px-6 pb-[60rem]  w-full   gap-5 grid justify-center   "
    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(5rem , 20rem))' }}

    >
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