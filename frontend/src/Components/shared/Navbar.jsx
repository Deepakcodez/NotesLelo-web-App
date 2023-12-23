import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { GoPlus } from "react-icons/go";


function Navbar(props) {
  const { name, email } = props.userDetail; //destructure the props(object) inner object calles userDetail
  // console.log('>>>>>>>>>>>name', name[0].toUpperCase())
  const [avatarSign, setAvatarSign] = useState();

  useEffect(() => {
    const firstCharacter = name ? name[0] : ""; // Check if name is defined
    const capitalAvatarcharacter =
      firstCharacter && firstCharacter.toUpperCase();
    console.log(">>>>>>>>>>>", capitalAvatarcharacter);
    setAvatarSign(capitalAvatarcharacter);
  }, [name]);

  return (
    <section className="top ">
      <div
      style={{}}
      className="flex justify-between gap-3 py-4 items-center px-3 bg-slate-800 border-b-[1px] border-slate-700">
        <NavLink to={"/"} className="font-bold text-xl text-white ">
          <img src="/src/assets/logo.png" className="h-[2rem]"></img>{" "}
        </NavLink>{" "}
        <section className="rightnav flex items-center gap-3 ">
          <GoPlus className="text-3xl text-white bg-slate-700 rounded-full p-[.2rem] hover:bg-slate-600"/>
          <div className="h-10 w-10 rounded-full bg-blue-300 items-center justify-center flex  text-white font-semibold text-2xl ">
            {avatarSign}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Navbar;
