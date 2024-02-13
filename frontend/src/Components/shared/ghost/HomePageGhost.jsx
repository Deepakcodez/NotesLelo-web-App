import React, { Fragment } from 'react';

export const HomePageGhost = () => {
    const groups = [1, 2, 3, 4, 5, 6];
    return (
        <Fragment>
            {groups.map((data, index) => (
                <div
                    key={index}
                    className="card bg-slate-500/75 h-40 min-w-[auto] rounded-md animate-pulse"
                >
                   
                </div>
            ))}
        </Fragment>
    );
};
