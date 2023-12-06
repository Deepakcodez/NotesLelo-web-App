import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <>
      <div className=" w-[90%] sm:w-[30rem] text-center">
        <h1 className="text-xl font-bold mb-6">📃Notes lelo</h1>
        <h3 className="text-2xl font-bold mb-1"> Log in to your account</h3>
        <h5 className="text-xs text-gray-400">
          Welcome back, Please enter your details.
        </h5>
        <form action="">
         

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
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="enter strong password"
              />
            </div>
          </div>

          <button className="bg-blue-400 rounded md py-1.5 w-full mt-3 ">
            Login
          </button>
          <h5 className="mt-3 font-thin text-gray-400">
             haven&apos;t any account ?{" "}
            <Link to="/signUp" className="text-blue-300">
              Create an account
            </Link>{" "}
          </h5>
        </form>
      </div>
    </>
  );
}

export default SignIn;
