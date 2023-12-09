import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import BottomBar from "./shared/BottomBar";

function RootLayout() {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        console.log(">>>>>>>>>>>data", data);
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
        <h1 className="flex flex-1 justify-center h-screen w-screen bgdark  items-center flex-col py-10">
          Loading.........
        </h1>
      </>
    );
  }
  return (
    <>
      <div className="w-full  md:flex">
        <Navbar />
        <Sidebar />
    

      <section className=" flex flex-1 h-full ">
        <Outlet />
      </section>
      <BottomBar/>
      </div>
    </>
  );
}

export default RootLayout;
