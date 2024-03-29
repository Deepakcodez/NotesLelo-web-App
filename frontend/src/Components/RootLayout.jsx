import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import BottomBar from "./shared/BottomBar";
import { Loading } from "./shared/Loading";
import { createGroupContext } from "../Context";
import { CreateGroup } from "./pages/group/CreateGroup";
import { JoinGroup } from "./pages/group/JoinGroup";
import { DeleteGroup } from "./pages/group/DeleteGroup";
import { Demand } from "./pages/group/Demand";
import { UploadFile } from "./pages/group/UploadFile";
import { InviteUser } from "./pages/group/InviteUser";
import { LeftGroup } from "./pages/group/LeftGroup";

function RootLayout() {
 
  const [isLoading, setLoading] = useState(true);
  const [chatURL, setChatURL]  = useState(false)
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({}); //use for dynamic value change in sidebar
  const { isCreateGroup,isUploadPage,setUploadPage, showInviteForm, setInviteForm, setCreateGroup,clickedGroupId, setClickedGroupId ,groupDeleteOpt,setGroupDeleteOpt,joinGroup,setJoinGroup,setCurrentUser,demand, showLeftGroup} = useContext(createGroupContext);
  const currentURL = useLocation().pathname

 
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        let token = localStorage.getItem("useDataToken");
        // console.log('>>>>>>>>>>>', token);
        //from fetch send data in headers authorization:token to the /isVarify route  here i put a middleware called authenticate which verify the stored token in the browser to the secretkey
        const response = await fetch(
          "https://notes-lelo-app-backend.vercel.app/api/v1/user/isVarify",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          }
        );
        setLoading(false);
        const data = await response.json();
        // console.log(">>>>>>>>>>>data", data);
        setUserDetail(data.data);
        setCurrentUser(data.data)

        if (data.status == 401 || !data) {
          navigate("/signIn");
        }
      } catch (error) {
        console.error("Error in isAuthenticated:", error);
        setLoading(false);

        // Handle errors, such as redirecting to the login page
      }
    };

    isAuthenticated();
    if(currentURL=='/chat'){
      setChatURL(true)
    }
  
  }, [setChatURL,chatURL,navigate]);
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
        {showInviteForm && <InviteUser/>}
        {showLeftGroup && <LeftGroup/>}
        {isCreateGroup && <CreateGroup />}
        {joinGroup && <JoinGroup />}
        {groupDeleteOpt&&<DeleteGroup/>}
        {demand&&<Demand/>}
        {isUploadPage&&<UploadFile/>}
        
        <Navbar  userDetail={userDetail} />
        
        <div className={`  flex ${chatURL?"h-full md:h-[calc(100%-4.55rem)]":'h-[calc(100%-4.55rem)]'}   `}>
          
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
