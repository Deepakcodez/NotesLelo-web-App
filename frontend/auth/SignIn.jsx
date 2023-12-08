import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SignIn() {

  const navigate = useNavigate();


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
      alert("please enter email");
    } else if (!email.includes("@")) {
      alert("please enter valid email");
    } else if (password.trim() === "") {
      alert("please enter password");
    } else {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/user/login",inputValue);
        if( response.status === 200){
          localStorage.setItem("useDataToken", response.data.data.token);
          setInputValue({ email: "", password: "" });
          navigate("/")
        }
        console.log(">>>>>>>>>>>response: ", response.data);
        alert(response.data.message);
       
      } catch (error) {
        console.log(">>>>>>>>>>>Error:", error);
        alert(error.response.data.message)
        throw error.response? error.response.data: { message: "Network error" };
      }
    }
  };

  return (
    <>
      <div className=" w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
        <h1 className="text-xl font-bold mb-6">📃Notes lelo</h1>
        <h3 className="text-2xl font-bold mb-1"> Log in to your account</h3>
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
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={onchangeHandler}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="please enter valid email"
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
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="enter strong password"
              />
            </div>
          </div>

          <button
            className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 "
            onClick={loginHandler}
          >
            Login
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
    </>
  );
}

export default SignIn;
