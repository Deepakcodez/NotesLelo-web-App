import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import BottomBar from "./shared/BottomBar";
import { Loading } from "./shared/Loading";
import { createGroupContext } from "../Context";
import { CreateGroup } from "./pages/CreateGroup";
import { JoinGroup } from "./pages/JoinGroup";

function RootLayout() {
 
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({}); //use for dynamiv value change in sidebar
  const { isCreateGroup, setCreateGroup,clickedGroupId, setClickedGroupId } = useContext(createGroupContext);
  const { joinGroup, setJoinGroup } = useContext(createGroupContext);
  const currentURL = useLocation().pathname
  if(currentURL !== "/chat"){
  localStorage.setItem("groupId","")
  }
  if(currentURL == "/chat"){
    localStorage.setItem("groupId",clickedGroupId)
  }
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        let token = localStorage.getItem("useDataToken");
        // console.log('>>>>>>>>>>>', token);
        //from fetch send data in headers authorization:token to the /isVarify route  here i put a middleware called authenticate which verify the stored token in the browser to the secretkey
        const response = await fetch(
          "http://localhost:8000/api/v1/user/isVarify",
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
  }, []);
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
        {isCreateGroup && <CreateGroup />}
        {joinGroup && <JoinGroup />}
        
        <Navbar  userDetail={userDetail} />
        
        <div className="flex h-[calc(100%-4.55rem)] bg-oange-300 ">
          
              <Sidebar />

              <section className="  flex flex-1  w-full  ">
                <Outlet />
              </section>
        </div>
        <BottomBar />
      </div>
    </>
  );
}

export default RootLayout;
