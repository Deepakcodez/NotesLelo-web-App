import { Fragment } from "react"
import { SlOptionsVertical } from "react-icons/sl";

export const GroupChat = () => {

  return (
    <Fragment>
        <div className="containet h-[calc(100%-4rem)] md:h-full w-full  flex flex-col justify-between">
            <div className="navbar bg-slate-500      w-full h-[5rem] flex items-center ">
                <ul className="flex h-full items-center justify-between px-5 w-full">
                    <li className="font-bold text-xl">Btech ECE/CSE</li>
                    <li><SlOptionsVertical/></li>
                </ul>
            </div>
            <div className="tpyingArea bg-slate-300 h-[4rem]">

            </div>
        </div>
    </Fragment>
  )
}
