import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createGroupContext } from "../Context";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import BottomBar from "./shared/BottomBar";
import { CreateGroup, DeleteGroup, Demand, InviteUser, JoinGroup, LeftGroup, UploadFile } from "@/layouts/users/Group";
import { Loading } from "./shared/Loading";
import axios from "axios";

function RootLayout() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [chatURL, setChatURL] = useState<boolean>(false);
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState<any>({}); //use for dynamic value change in sidebar
  const {
    isCreateGroup,
    isUploadPage,
    setUploadPage,
    showInviteForm,
    setInviteForm,
    setCreateGroup,
    clickedGroupId,
    setClickedGroupId,
    groupDeleteOpt,
    setGroupDeleteOpt,
    joinGroup,
    setJoinGroup,
    setCurrentUser,
    demand,
    showLeftGroup,
  } = useContext<any>(createGroupContext);
  const currentURL = useLocation().pathname;

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        let token = localStorage.getItem("useDataToken");
        // console.log('>>>>>>>>>>>', token);
        //from fetch send data in headers authorization:token to the /isVarify route  here i put a middleware called authenticate which verify the stored token in the browser to the secretkey
        const response = await axios.get(
          "https://notes-lelo-app-backend.vercel.app/api/v1/user/isVarify",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          }
        );
        setLoading(false);
        // console.log(">>>>>>>>>>>data", data);
        setUserDetail(response.data);
        setCurrentUser(response.data);

        if (response.status == 401 || !response) {
          navigate("/signIn");
        }
      } catch (error) {
        console.error("Error in isAuthenticated:", error);
        setLoading(false);

        // Handle errors, such as redirecting to the login page
      }
    };

    isAuthenticated();
    if (currentURL == "/chat") {
      setChatURL(true);
    }
  }, [setChatURL, chatURL, navigate]);
  if (isLoading) {
    return (
      <>
        <h1 className="flex flex-1 justify-center  w-screen bgdark  items-center flex-col py-10 text-white">
          <Loading />
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
          className={`  flex ${
            chatURL
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

export default RootLayout;
