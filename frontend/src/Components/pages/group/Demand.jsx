import React, { useContext, useState } from 'react';
import { createGroupContext } from '../../../Context';
import axios from 'axios';

export const Demand = () => {
    const { setDemand } = useContext(createGroupContext);
    const [warning, setWarning] = useState(false);
    const [textInput, setTextInput] = useState("")
    const groupId = localStorage.getItem('groupId')
    const token = localStorage.getItem("useDataToken")
    console.log('>>>>>>>>>>>', groupId,token)

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (!textInput.trim()) {
            setWarning(true);
            return;
        }
        const resp = await axios.post(
            'http://localhost:8000/api/v1/demand/post',
            {
                textInput,
                groupId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            }
        );

        if(resp.data.status == 200){

            setDemand(false)
            
        }

       


    };

    const textAreaHandler = (e) => {
        e.preventDefault();
        setTextInput(e.target.value)
    }

    return (
        <>
            <div className='absolute z-[500] h-screen w-full flex items-center justify-center bg-slate-900/75'>
                <div className="w-[70%] bg-slate-700 px-5 py-5 rounded-lg shadow-lg border-[1px] border-slate-600 md:w-[30rem]">
                    <form onSubmit={handleSubmit}>
                        {/* Demand*/}
                        <div className="mb-2">
                            <label
                                htmlFor="title"
                                className="block text-left text-sm font-medium leading-6 text-white"
                            >
                                <h1> Enter Topic Name (Describe)</h1>
                            </label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                {/* Add input for group name */}
                                <textarea
                                    type="text"
                                    name="title"
                                    value={textInput}
                                    onChange={(e) => { textAreaHandler(e) }}
                                    className="block min-h-[3rem] max-h-[8rem] flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>



                        <button
                            type="submit"
                            className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 hover:text-white"
                        >
                            Post
                        </button>
                        <button

                            onClick={() => setDemand(false)}
                            className="bg-red-400 rounded md py-1.5 w-full mt-3 hover:bg-red-500 hover:text-white"
                        >
                            Cancel
                        </button>
                    </form>

                    <div className="h-[2rem]">
                        {warning && (
                            <h1 className="warning text-slate-400">There is not any demand</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
