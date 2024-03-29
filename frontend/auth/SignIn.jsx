import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from '../src/assets/lading.json';
import { Alert } from "../src/Components/shared/Alert";


function SignIn() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertmsg, setAlertmsg] = useState(null)
  const [alertType, setAlertType] = useState('')
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = inputValue;
    if (email.trim() === "") {
      setAlertmsg("Please Fill credentials")
      setAlertType("warning")
    } else if (!email.includes("@")) {
      setAlertmsg("Enter Valid Email  ")
      setAlertType("warning")
    } else if (password.trim() === "") {
      setAlertmsg("Enter Your Secret Password")
      setAlertType("warning")
    }
    else if(password.trim().length < 6){
      setAlertmsg("Password Character less than minimum")
      setAlertType("warning")
    }
    else {
      try {
        setIsLoading(true)
        const response = await axios.post("https://notes-lelo-app-backend.vercel.app/api/v1/user/login", inputValue,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
        if (response.status === 200) {
          localStorage.setItem("useDataToken", response.data.data.token);
          setInputValue({ email: "", password: "" });
          navigate("/")
        }
        setIsLoading(false)
        console.log(">>>>>>>>>>>response: ", response.data);

      } catch (error) {
        setIsLoading(false)
        // console.log(">>>>>>>>>>>Error:", error);
        // alert(error.response.data.message)
        setAlertmsg(error.response.data.message)
        setAlertType("error")
      

        throw error.response ? error.response.data : { message: "Network error" };
      }
    }
  };

  return (
    <>
      <div className=" w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
        <h1 className="text-xl font-bold mb-6 text-white">📃Notes lelo
          <h1 className="text-xs font-thin">Social media for students</h1>
        </h1>
        <h3 className="text-2xl font-bold mb-1 text-white"> Log in to your account</h3>
        <h5 className="text-xs text-gray-400">
          Welcome back, Please enter your details.
        </h5>
        <form>
          {/* email inout */}
          <label
            htmlFor="username"
            className="block text-left text-sm font-medium leading-6 text-white"
          >
            Email
          </label>
          <div className="mb-2">
            <div className="flex  rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={onchangeHandler}
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="please enter email"
              />
            </div>
          </div>

          {/* password input  */}
          <label
            htmlFor="username"
            className="block text-left text-sm font-medium leading-6 text-white"
          >
            Password
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="password"
                name="password"
                value={inputValue.password}
                onChange={onchangeHandler}
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="enter  password"
              />
            </div>
          </div>

          <button
            className="bg-blue-400 rounded h-[2rem] flex justify-normal items-center  py-1.5 w-full mt-3 hover:bg-blue-500 "
            onClick={loginHandler}
          >
            {isLoading ? (
              <Lottie className='h-[5rem] w-full ' animationData={loadingAnimation} loop={true} />
            ) : (
              <h1 className="text-center w-full text-white">Login</h1>
            )}
          </button>
          <h5 className="mt-3 font-thin text-gray-400">
            haven&apos;t any account ?{" "}
            <NavLink to="/signUp" className="text-blue-300">
              Create an account
            </NavLink>{" "}
          </h5>
        </form>
      </div>
      <div className="circle h-80 w-80 opacity-30  sm:opacity-50 rounded-full bg-blue-600 sm:bg-blue-600 absolute top-0 left-0 z-1  blur-3xl "></div>
      <div className="circle h-80 w-80 opacity-5   rounded-full  sm:bg-red-400 absolute  left-0 z-1  blur-3xl "></div>

      {
        alertmsg &&

        <Alert msg={alertmsg }  type={alertType} setmsg={setAlertmsg} />
      }
    </>
  );
}

export default SignIn;
