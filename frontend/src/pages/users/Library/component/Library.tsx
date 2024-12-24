import React from "react";

import Posts from "./Post";

export const Library: React.FC = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col  justify-center  items-center">
        <Posts />
      </div>
    </>
  );
};
