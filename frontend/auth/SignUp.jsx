import React from "react";
import { Link } from "react-router-dom";
import '../src/App.css'

function SignUp() {
  return (
    <>
      <div className=" w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
        <h1 className="text-xl font-bold mb-6 bg-transparent">📃Notes lelo</h1>
        <h3 className="text-2xl font-bold mb-1 bg-transparent"> create a new account</h3>
        <h5 className="text-xs text-gray-400 bg-transparent">
          To use Notes lelo, Please enter your details.
        </h5>
        <form action="" className="bg-transparent">
          {/* name input  */}
          <label
            htmlFor="username"
            className="block text-left text-sm font-medium leading-6 text-white bg-transparent"
          >
            Name
          </label>
          <div className="mb-2">
            <div className="flex bg-transparent rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="text"
                className="block flex-1  border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="enter your name"
              />
            </div>
          </div>

          {/* email inout */}
          <label
            htmlFor="username"
            className="block bg-transparent text-left text-sm font-medium leading-6 text-white"
          >
            Email
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="text"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="please enter valid email"
              />
            </div>
          </div>

          {/* password input  */}
          <label
            htmlFor="username"
            className="block text-left bg-transparent text-sm font-medium leading-6 text-white"
          >
            Password
          </label>
          <div className="mb-2">
            <div className="flex rounded-md bg-transparent shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="password"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="enter strong password"
              />
            </div>
          </div>

          {/* password input */}

          <label
            htmlFor="username"
            className="block text-left bg-transparent text-sm font-medium leading-6 text-white"
          >
            Confirm Password
          </label>
          <div className="mb-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="password"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Confirm your Password"
              />
            </div>
          </div>

          <button className="bg-blue-400 rounded md py-1.5 w-full mt-3 hover:bg-blue-500 ">
            Sign Up
          </button>
          <h5 className="mt-3 font-thin text-gray-400">
            already have an account ?{" "}
            <Link to="/signIn" className="text-blue-300">
              Sign in
            </Link>{" "}
          </h5>
        </form>
      </div>
        <div className="circle h-80 w-80 opacity-30  sm:opacity-50 rounded-full bg-blue-600 sm:bg-blue-600 absolute top-0 left-0 z-1  blur-3xl "></div>
        <div className="circle h-80 w-80 opacity-5   rounded-full  sm:bg-red-400 absolute  left-0 z-1  blur-3xl "></div>
    </>
  );
}

export default SignUp;