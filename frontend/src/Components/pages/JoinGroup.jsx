import { useContext, useState } from "react";
import { createGroupContext } from "../../Context";
import axios from "axios";

export const JoinGroup = () => {

    const {JoinGroup,setJoinGroup } = useContext(createGroupContext);

    const [Id , setId] = useState({"id":""});
    const token = localStorage.getItem("useDataToken");

    const inputHandler = (e) => {
      const { name, value } = e.target;
      setId({
        ...Id,
        [name]: value,
      });
    };

    const joinHandler=async(e)=>{
      e.preventDefault()

      try {
        const resp = await axios.post('http://localhost:8000/api/v1/group/join',Id,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
            withCredentials: true,
          },
        }
        )

      } catch (error) {
        console.log('>>>>>>>>>>>', error)
      }

    }

  return (
    <>
      <div className="wrapper h-[111.5%] w-full absolute z-50 bg-slate-900/75 flex items-center justify-center">
        <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
          <form>
            <label
              htmlFor="title"
              className="block text-left text-sm font-medium leading-6 text-white"
            >
              Group ID
            </label>
            <div className="mb-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  name="id"
                  value={Id.id}
                  onChange={inputHandler}
                  placeholder="Enter Group ID"
                  className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
            onClick={joinHandler}
             className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 hover:text-white ">
              Join
            </button>
            <button
              className="bg-red-400 rounded md py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white  "
              onClick={() => setJoinGroup(false)}
            >
              Cancel
            </button>{" "}
          </form>
        </div>
      </div>
    </>
  );
};
