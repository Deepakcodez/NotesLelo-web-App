import React, { Fragment } from 'react';

export const GroupMemberGhost = () => {
    const member = [1, 1, 1, 1, 1, 1, 1];

    return (
        <>
            {member.map((data, index) => (
                <Fragment key={index}>
                    <div className='bg-slate-600 h-[4rem]    mt-2 animate-pulse'>
                    
                    </div>
                </Fragment>
            ))}
        </>
    );
};
