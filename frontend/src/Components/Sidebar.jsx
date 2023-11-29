import {AiOutlineHome }from 'react-icons/ai'
import {GrDocumentNotes }from 'react-icons/gr'
export default function Sidebar() {
  return (
    <>
    {/* sidebar pannel  */}
    <div className="sidebarpannel w-fit min-h-screen max-h-screen bg-slate-100 p-3 pe-10 border-r-2 border-slate-200 ">
                 <ul className='flex items-center justify-center flex-col gap-10 pt-10 ps-5'>
                    <li className='flex items-center w-[100%] gap-8 '><AiOutlineHome className='text-2xl'/> <div className="home text-xl hidden sm:block ">Home</div> </li>
                    <li className='flex items-center  w-[100%] gap-8 '><GrDocumentNotes className='text-2xl'/> <div className="notes text-xl hidden sm:block ">Notes</div></li>
                    <li className='flex items-center  w-[100%] gap-8 '><GrDocumentNotes className='text-2xl'/> <div className="notes text-xl hidden sm:block ">Demo</div></li>
                    <li className='flex items-center  w-[100%] gap-8 '><GrDocumentNotes className='text-2xl'/> <div className="notes text-xl hidden sm:block ">Question paper</div></li>
                 </ul>
    </div>
    
    </>
  )
}
