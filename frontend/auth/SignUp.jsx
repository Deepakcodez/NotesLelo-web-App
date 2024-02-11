import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../src/App.css";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from '../src/assets/lading.json';
function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const SignUpHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = inputValue;
    if (name.trim() === "") {
      alert("please enter name");
    } else if (email.trim() === "") {
      alert("please enter email");
    } else if (!email.includes("@")) {
      alert("please enter valid email");
    } else if (password.trim() === "") {
      alert("please enter password");
    } else if (password.length < 6) {
      alert("password must be 6 character");
    } else if (confirmPassword.trim() === "") {
      alert("please confirm password");
    } else if (password !== confirmPassword) {
      alert("confirm password doesn't match");
    } else {
      try {
        setIsLoading(true)
        const response = await axios.post('https://notes-lelo-app-backend.vercel.app/api/v1/user/register', inputValue, { headers: { 'Content-Type': 'application/json' } })
        if (response.status === 200) {
          console.log(response.data);
          navigate('/signIn')
          setInputValue({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          })
          setIsLoading(false)

        } else {
          console.error('Signup failed:', response.data.message);
          // Display an error message to the user
          setIsLoading(false)
        }

      } catch (error) {
        console.log('>>>>>>>>>>>', error.response.data.message)
        setIsLoading(false)
        alert(error.response.data.message)
      }

    }
  };

  return (
    <>
      <div className=" w-[90%] sm:w-[30rem] text-center bg-transparent relative z-40">
        <h1 className="text-xl font-bold mb-6 bg-transparent text-white">📃Notes lelo</h1>
        <h3 className="text-2xl font-bold mb-1 bg-transparent text-white">
          {" "}
          create a new account
        </h3>
        <h5 className="text-xs text-gray-400 bg-transparent">
          To use Notes lelo, Please enter your details.
        </h5>
        <form className="bg-transparent">
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
                name="name"
                value={inputValue.name}
                onChange={onchangeHandler}
                className="block flex-1 text-white border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                name="email"
                value={inputValue.email}
                onChange={onchangeHandler}
                className="block flex-1 text-white border-0 bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                name="password"
                value={inputValue.password}
                onChange={onchangeHandler}
                className="block flex-1 border-0 text-white bg-transparent py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                name="confirmPassword"
                value={inputValue.confirmPassword}
                onChange={onchangeHandler}
                className="block flex-1 border-0 bg-transparent text-white py-1.5 pl-1 bg-gray-700   rounded-md text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Confirm your Password"
              />
            </div>
          </div>

          <button
            className="bg-blue-400 rounded-md  h-[2rem] flex justify-normal items-center  py-1.5 w-full mt-3 hover:bg-blue-500 "
            onClick={SignUpHandler}
          >
            {isLoading ? (
              <Lottie className='h-[5rem] w-full ' animationData={loadingAnimation} loop={true} />
            ) : (
              <h1 className="text-center w-full text-white">Submit</h1>
            )}
          </button>
          <h5 className="mt-3 font-thin text-gray-400">
            already have an account ?{" "}
            <NavLink to="/signIn" className="text-blue-300">
              Sign in
            </NavLink>{" "}
          </h5>
        </form>
      </div>
      <div className="circle h-80 w-80 opacity-30  sm:opacity-50 rounded-full bg-blue-600 sm:bg-blue-600 absolute top-0 left-0 z-1  blur-3xl "></div>
      <div className="circle h-80 w-80 opacity-5   rounded-full  sm:bg-red-400 absolute  left-0 z-1  blur-3xl "></div>
    </>
  );
}

export default SignUp;
