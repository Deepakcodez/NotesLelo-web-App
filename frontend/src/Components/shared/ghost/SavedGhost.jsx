import React, { Fragment } from 'react'

export const SavedGhost = () => {
    const notesData = [ 1, 2, 3, 4 ,5, 4,4,42,2,2,2]
    return (
        <>
            <div className=" w-[100%]  ">
                <div className='header h-[2rem] w-[100%] bg-slate-700/25 flex items-center px-3   '
                    style={{ borderBottom: "1px solid gray" }}
                >
                    <h1 className='text-white font-semibold'>Saved Notes</h1>
                </div>

                {/* data  */}
                <div className='h-[calc(100%-2rem)] w-full overflow-y-scroll no-scrollbar px-7 pt-10 '>
                    <div className='h-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center '>


                        {
                            notesData?.map((notes, index) => <Fragment key={index}>


                                <div className='bg-slate-700/25 rounded-md animate-pulse' >
                                    <div className='h-[5rem] w-full   rounded-md font-bold flex justify-center items-center text-2xl'></div>
                                    <div className='px-2'>
                                        <div className='flex justify-between'>
                                        </div>
                                        <h1 className='mb-3 overflow-y-scroll no-scrollbar h-[3rem] w-full font-normal text-gray-700 dark:text-gray-400'>{notes.description}

                                        </h1>
                                    </div>
                                    <div className='footer flex justify-end px-3  py-2  text-white '>
                                    
                                    </div>
                                </div>
                            </Fragment>)
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
