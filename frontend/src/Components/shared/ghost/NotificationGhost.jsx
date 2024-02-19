import React, { Fragment } from 'react'

export const NotificationGhost = () => {
    const notificationData = [1, ]
    return (
        <>
            <div className=" w-full  ">
                <div className='header h-[2rem] w-full bg-slate-700/25 flex items-center px-3  '
                    style={{ borderBottom: "1px solid gray" }}
                >
                    <h1 className='text-white font-semibold'>Notification</h1>
                </div>

                <div className='h-[calc(100%-2rem)] w-full overflow-y-scroll no-scrollbar p-3  '>
                    <div className='h-auto w-full flex flex-col gap-4 '>


                        {
                            notificationData?.map((data, index) => <Fragment key={index}>
                                <div
                                    className='h-[6rem] w-full bg-gradient-to-br from-slate-900/25 to-slate-700/25 rounded-lg p-3 flex justify-between animate-pulse' style={{ borderTop: "1px solid #bcc6d1" }}>

                                </div>
                            </Fragment>)
                        }

                    </div>
                </div>

            </div>
        </>
    )
}
