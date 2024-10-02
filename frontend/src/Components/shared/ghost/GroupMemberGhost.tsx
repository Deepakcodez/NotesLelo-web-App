import React, { FC, Fragment } from 'react';

export const GroupMemberGhost:FC = () => {
    const member = [1, 1, 1, 1, 1, 1, 1];

    return (
        <>
            {member.map((_, index) => (
                <Fragment key={`member_${index}`}>
                    <div className='bg-slate-600 h-[4rem]    mt-2 animate-pulse'>
                    
                    </div>
                </Fragment>
            ))}
        </>
    );
};
