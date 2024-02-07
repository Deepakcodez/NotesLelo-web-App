import React, { useContext, useState } from 'react'
import { createGroupContext } from '../../../Context';

export const InviteUser = () => {
    const {  showInviteForm, setInviteForm} = useContext(createGroupContext);
    const [emailValue, setEmailValue] = useState({email:""});
    const [warning, setWarning] = useState("")
    const [ warningMsg, setWarningmsg] = useState("")
    

         
    const changeHandler=(e)=>{
        console.log(e.target.value);
        setEmailValue({email:e.target.value})
        
    }

    // Function to check if email has a valid format
const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

   const invite=(e)=>{
    e.preventDefault()
    const { email } = emailValue;
    if (email.trim() === "") {
        setWarningmsg("No Email provided");
      } else if (!email.includes("@")) {
        setWarningmsg("Invalid Email");
      } else if (!isValidEmail(email)) {
        setWarningmsg("Invalid Email format");
    }
      else{
        //seding email to backend
        alert("data sent")
      }
   }


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
                name="email"
                value={emailValue.email}
                onChange={changeHandler}
                placeholder="User email who want to join..."
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <button
           onClick={invite}
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
        {
          warning&&
      <h1 className="warning text-slate-400">Something wrong!</h1>
        }

        </div>
      </div>
    </div>
  </>
  )
}
