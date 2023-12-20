import { Outlet, useNavigate,useLocation } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location  = useLocation()
  const urlLocation = location.pathname
  const isAuthenticated = false;

  // Redirect if the user is authenticated
  if (isAuthenticated) {
    navigate("/");
    return null; // Return null to avoid rendering anything in this case
  }

  // Render the Outlet if the user is not authenticated
  return (
    <>
    <section className="flex flex-1 justify-center h-screen w-screen bgdark  items-center flex-col py-10">

      <Outlet />
    </section>
    {
      urlLocation==='/signUp'?

      <img src="/src/assets/boy.jpg"
       alt="boy img"
       className=" hidden xl:block h-screen  w-1/2 object-cover  bg-no-repeat"
        />:
        <img src="/src/assets/girl.jpg"
        alt="girl img"
        className=" hidden xl:block h-screen  w-1/2 object-cover  bg-no-repeat"
         />
    }
    

</>
  );
};

export default AuthLayout;
