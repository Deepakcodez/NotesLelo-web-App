import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createGroupContext } from "../../Context";
import Navbar from "../../Components/shared/Navbar";
import Sidebar from "../../Components/shared/Sidebar";
import BottomBar from "../../Components/shared/BottomBar";
import { CreateGroup, DeleteGroup, Demand, InviteUser, JoinGroup, LeftGroup, UploadFile } from "@/pages/users/Group";
import { Loading } from "../../Components/shared/Loading";
import { useAuth } from "@/hooks";

function RootUserLayout() {
  const [chatURL, setChatURL] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    isCreateGroup,
    isUploadPage,
    showInviteForm,
    groupDeleteOpt,
    joinGroup,
    demand,
    showLeftGroup,
  } = useContext<any>(createGroupContext);
  const currentURL = useLocation().pathname;
  const{userDetail, isLoading,isError} = useAuth();

  useEffect(() => {
    if (currentURL == "/chat") {
      setChatURL(true);
    }
    console.log('>>>>>>>>>>>user', userDetail)
  }, [setChatURL, chatURL, navigate, userDetail]);

  useEffect(() => {
    if (!isLoading && (!userDetail || isError)) {
      navigate("/signIn");
    }
  },[userDetail, isLoading, isError])

  if (isLoading) {
    return (
      <>
        <h1 className="flex flex-1 justify-center  w-screen bgdark  items-center flex-col py-10 text-white">
          <Loading />
        </h1>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h1 className="flex flex-1 justify-center  w-screen bgdark  items-center flex-col py-10 text-white">
          Something Went Wrong⚠️
        </h1>
      </>
    );
  }
  return (
    <>
      <div className="w-full h-full ">
        {showInviteForm && <InviteUser />}
        {showLeftGroup && <LeftGroup />}
        {isCreateGroup && <CreateGroup />}
        {joinGroup && <JoinGroup />}
        {groupDeleteOpt && <DeleteGroup />}
        {demand && <Demand />}
        {isUploadPage && <UploadFile />}

        <Navbar userDetail={userDetail} />

        <div
          className={`  flex ${chatURL
              ? "h-full md:h-[calc(100%-4.55rem)]"
              : "h-[calc(100%-4.55rem)]"
            }   `}
        >
          <Sidebar />

          <section className="  flex flex-1  w-full   ">
            <Outlet />
          </section>
        </div>
        <BottomBar />
      </div>
    </>
  );
}

export default RootUserLayout;
