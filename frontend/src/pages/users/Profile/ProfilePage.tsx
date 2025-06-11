import React, { Suspense } from "react";
import { Profile } from "./component";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<h1>Something went wrong🐥</h1>}>
        <Profile />
      </Suspense>
    </>
  );
};
export default ProfilePage;
