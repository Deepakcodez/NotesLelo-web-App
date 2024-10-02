import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

interface InputValue {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputValue>({
    email: "",
    password: "",
  });

  // Handler for input field changes
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for login form submission
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = inputValue;

    // Basic validation
    if (email.trim() === "") {
      console.log('>>>>>>>>>>> email')
    } else if (!email.includes("@")) {
      console.log('>>>>>>>>>>> enter valid email')

    } else if (password.trim() === "") {
      console.log('>>>>>>>>>>> enter valid email')

    } else if (password.trim().length < 6) {
      console.log('>>>>>>>>>>> enter valid email')

    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://notes-lelo-app-backend.vercel.app/api/v1/user/login",
          inputValue,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          localStorage.setItem("useDataToken", response.data.data.token);
          setInputValue({ email: "", password: "" });
          navigate("/");
        }

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        if (error.response?.data?.message) {
          console.log('>>>>>>>>>>> error',error.response?.data?.message)

        } else {
          console.log('>>>>>>>>>>> error')

        }
      }
    }
  };

  return (
    <>
      <div className="w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
        <h1 className="text-xl font-bold mb-6 text-white">
          📃Notes lelo
          <h1 className="text-xs font-thin">Social media for students</h1>
        </h1>
        <h3 className="text-2xl font-bold mb-1 text-white">
          Log in to your account
        </h3>
        <h5 className="text-xs text-gray-400">
          Welcome back, Please enter your details.
        </h5>
        <form>
          {/* Email Input */}
          <label
            htmlFor="email"
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
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="please enter email"
              />
            </div>
          </div>

          {/* Password Input */}
          <label
            htmlFor="password"
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
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="enter password"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            className="bg-blue-400 rounded h-[2rem] flex justify-normal items-center py-1.5 w-full mt-3 hover:bg-blue-500"
            onClick={loginHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <h1 className="text-center w-full text-white">Login</h1>
            )}
          </button>

          <h5 className="mt-3 font-thin text-gray-400">
            haven't any account?{" "}
            <NavLink to="/signUp" className="text-blue-300">
              Create an account
            </NavLink>
          </h5>
        </form>
      </div>

      <div className="circle h-80 w-80 opacity-30 sm:opacity-50 rounded-full bg-blue-600 sm:bg-blue-600 absolute top-0 left-0 z-1 blur-3xl"></div>
      <div className="circle h-80 w-80 opacity-5 rounded-full sm:bg-red-400 absolute left-0 z-1 blur-3xl"></div>

    </>
  );
}

