import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

function Navbar() {
  const[isOpen,setOpen]=useState(true)
  // md:hidden
 
  return (
    <section className="top ">
      <div className=" flex justify-between gap-3 py-4 items-center px-3 bg-slate-600">
           
      <NavLink to={"/"} className="font-bold text-xl text-white ">
              
                <img src="/public/assets/logo.png" className="h-[2rem]"></img>
              {" "}
            </NavLink>        <section className="avatar">
           <div className="h-10 w-10 rounded-full bg-blue-300">

           </div>
        </section>
      </div>
    </section>
  );
}

export default Navbar;
