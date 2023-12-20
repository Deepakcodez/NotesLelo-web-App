import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <>
      <h1 className="flex flex-1 justify-center h-screen w-screen bgdark  items-center flex-col py-10">
        <img
          className="h-80"
          src="/public/assets/404.png"
          alt="page not found"
        />
      </h1>
    </>
  );
}

export default PageNotFound;
