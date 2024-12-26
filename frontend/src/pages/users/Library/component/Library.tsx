import React  from "react";

import Posts from "./Post";
import { Upload } from "lucide-react";
import { UploadPublicPost } from "./UploadPost";

export const Library: React.FC = () => {
  const [isUploadForm, setUploadForm] = React.useState(false);
  return (
    <>
      <div className=" relative h-full w-full flex flex-col  justify-center  items-center overflow-hidden">
        {
          isUploadForm &&
          <UploadPublicPost  setShowForm={setUploadForm}/>
        }
        <div
          onClick={() => setUploadForm(true)}
          className="absolute z-40  md:bottom-12 bottom-24  right-12 bg-blue-500 hover:bg-blue-600 rounded-full p-2 border border-blue-400 ">
          <Upload />
        </div>
        <Posts />
      </div>
    </>
  );
};
