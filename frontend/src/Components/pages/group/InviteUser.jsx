import React, { useContext } from 'react'
import { createGroupContext } from '../../../Context';

export const InviteUser = () => {
    const {  showInviteForm, setInviteForm} = useContext(createGroupContext);

  return (
    <>
    <div className="wrapper h-screen w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
      <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
        <form>
          <label
            htmlFor="title"
            className="block text-left  text-sm font-medium leading-6 text-white"
          >
            Email
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="text"
                name="id"
                placeholder="User email who want to join..."
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <button
         
           className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 hover:text-white ">
            Invite
          </button>
          <button
            className="bg-red-400 rounded md py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white  "
            onClick={()=>setInviteForm(false)}
          >
            Cancel
          </button>{" "}
        </form>
        <div className="h-[2rem]">
        {/* {
          warning&&
      <h1 className="warning text-slate-400">Group ID is required</h1>
        } */}

        </div>
      </div>
    </div>
  </>
  )
}
