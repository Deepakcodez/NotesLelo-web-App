import {RxHamburgerMenu} from 'react-icons/rx'
function Navbar() {
  return (
    <>
    <div className="navbar h-[4rem] max-w-full min-w-full bg-white flex justify-between px-5 items-center border-b-2 border-slate-200 shadow-sm ">
        <div className="leftnav flex  items-center gap-2">
            <RxHamburgerMenu 
            className='text-2xl hover:bg-slate-200 ease-in duration-200 h-12 w-12 rounded-full p-[.7rem] '
            />
            <div className="logo text-green-600 font-bold">NotesLelo</div>
        </div>
        <div className="rightnav flex items-center">
            <div className="avatar bg-slate-400 h-10 w-10 rounded-full"></div>
        </div>
    </div>
    
    </>
  )
}

export default Navbar