import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BoyImage, GirlImage } from "@/constant/imagePath";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlLocation = location.pathname;
  const isAuthenticated = false; // Replace this with your actual authentication logic

  // Redirect if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Render the Outlet if the user is not authenticated
  return (
    <>
      <section className="flex flex-1 justify-center h-screen w-screen bgdark items-center flex-col py-10">
        <Outlet />
      </section>
      {urlLocation === "/signUp" ? (
        <img
          src={BoyImage}
          alt="boy img"
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        />
      ) : (
        <img
          src={GirlImage}
          alt="girl img"
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        />
      )}
    </>
  );
};

export default AuthLayout;
