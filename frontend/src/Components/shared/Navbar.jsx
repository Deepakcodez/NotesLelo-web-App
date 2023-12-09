import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <section className="top md:hidden">
      <div className=" flex justify-between gap-3 py-4 items-center px-3 bg-slate-600">
        <NavLink  to={"/"} className="font-bold text-xl text-white"> 📃NotesLelo</NavLink>
        <section className="avatar">
           <div className="h-10 w-10 rounded-full bg-blue-300">

           </div>
        </section>
      </div>
    </section>
  );
}

export default Navbar;
