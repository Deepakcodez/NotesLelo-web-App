import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <section className=' sidebar hidden  md:block  '>
         <div className=" flex  h-full gap-3 py-4 flex-col px-3 bg-slate-600">
        <NavLink  to={"/"} className="font-bold text-xl text-white"> 📃NotesLelo</NavLink>
        <section className="avatar">
           <div className="h-10 w-10 rounded-full bg-blue-300"></div>
        </section>
      </div>
    </section>

    )
}

export default Sidebar