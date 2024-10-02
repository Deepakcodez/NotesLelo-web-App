import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../App.css";
import axios from "axios";

// Define types for input state
interface InputState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<InputState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const SignUpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = inputValue;

    if (name.trim() === "") {
      console.log('>>>>>>>>>>>fix with react toast')
    } else if (email.trim() === "") {
      console.log('>>>>>>>>>>>fix with react toast')

    } else if (!email.includes("@")) {
      console.log('>>>>>>>>>>>fix with react toast')

    } else if (password.trim() === "") {
      console.log('>>>>>>>>>>>fix with react toast')

    } else if (password.length < 6) {
      console.log('>>>>>>>>>>>fix with react toast')

    } else if (confirmPassword.trim() === "") {
      console.log('>>>>>>>>>>>fix with react toast')

    } else if (password !== confirmPassword) {
      console.log('>>>>>>>>>>>fix with react toast')

    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://notes-lelo-app-backend.vercel.app/api/v1/user/register",
          inputValue,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          navigate("/signIn");
          setInputValue({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          });
          setIsLoading(false);
        } else {
          console.error("Signup failed:", response.data.message);
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        const errorMessage = error.response?.data?.message || "An error occurred";
        console.log('>>>>>>>>>>>fix with react toast', errorMessage)

      }
    }
  };

  return (
    <>
      <div className="w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
        <h1 className="text-xl font-bold mb-6 bg-transparent text-white">
          📃Notes lelo
          <h1 className="text-xs font-thin">Social media for students</h1>
        </h1>
        <h3 className="text-2xl font-bold mb-1 bg-transparent text-white">create a new account</h3>
        <h5 className="text-xs text-gray-400 bg-transparent">
          To use Notes lelo, Please enter your details.
        </h5>
        <form className="bg-transparent" onSubmit={SignUpHandler}>
          {/* name input */}
          <label
            htmlFor="name"
            className="block text-left text-sm font-medium leading-6 text-white bg-transparent"
          >
            Name
          </label>
          <div className="mb-2">
            <div className="flex bg-transparent rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                name="name"
                value={inputValue.name}
                onChange={onchangeHandler}
                className="block flex-1 text-white border-0 bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="enter your name"
              />
            </div>
          </div>

          {/* email input */}
          <label
            htmlFor="email"
            className="block bg-transparent text-left text-sm font-medium leading-6 text-white"
          >
            Email
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={onchangeHandler}
                className="block flex-1 text-white border-0 bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="please enter valid email"
              />
            </div>
          </div>

          {/* password input */}
          <label
            htmlFor="password"
            className="block text-left bg-transparent text-sm font-medium leading-6 text-white"
          >
            Password
          </label>
          <div className="mb-2">
            <div className="flex rounded-md bg-transparent shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="password"
                name="password"
                value={inputValue.password}
                onChange={onchangeHandler}
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700 rounded-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="enter strong password"
              />
            </div>
          </div>

          {/* confirm password input */}
          <label
            htmlFor="confirmPassword"
            className="block text-left bg-transparent text-sm font-medium leading-6 text-white"
          >
            Confirm Password
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="password"
                name="confirmPassword"
                value={inputValue.confirmPassword}
                onChange={onchangeHandler}
                className="block flex-1 border-0 bg-transparent text-white py-1.5 pl-1 bg-gray-700 rounded-md placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Confirm your Password"
              />
            </div>
          </div>

          <button
            className="bg-blue-400 rounded-md h-[2rem] flex justify-normal items-center py-1.5 w-full mt-3 hover:bg-blue-500"
            type="submit"
          >
            {isLoading ? (
              <h1>Loading</h1>
            ) : (
              <h1 className="text-center w-full text-white">Submit</h1>
            )}
          </button>
          <h5 className="mt-3 font-thin text-gray-400">
            already have an account?{" "}
            <NavLink to="/signIn" className="text-blue-300">
              Sign in
            </NavLink>{" "}
          </h5>
        </form>
      </div>
      <div className="circle h-80 w-80 opacity-30 sm:opacity-50 rounded-full bg-blue-600 sm:bg-blue-600 absolute top-0 left-0 z-1 blur-3xl"></div>
      <div className="circle h-80 w-80 opacity-5 rounded-full sm:bg-red-400 absolute left-0 z-1 blur-3xl"></div>
    </>
  );
};

export default SignUp;
