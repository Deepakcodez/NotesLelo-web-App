import { Input } from "@/Components";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-hot-toast";

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
      toast.error("Email is required");
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email");
    } else if (password.trim() === "") {
      toast.error("Password is required");
    } else if (password.trim().length < 6) {
      toast.error("Password should be at least 6 characters");
    } else {
      try {
        setIsLoading(true);
        const base_url = import.meta.env.VITE_BASE_URL as string;

        const response = await axios.post(
          `http://localhost:8000/api/v1/user/login`,
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
          toast.success("Login successful!"); // Notify user on successful login
        }

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        if (error.response?.data?.message) {
          toast.error(`Error: ${error.response?.data?.message}`);
        } else {
          toast.error("Login error");
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
        <form onSubmit={loginHandler}>
          {/* Email Input */}
          <Input
            label="Email"
            type="text"
            name="email"
            value={inputValue.email}
            onChange={onchangeHandler}
            placeholder="Please enter email"
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            value={inputValue.password}
            onChange={onchangeHandler}
            placeholder="Enter password"
          />

          {/* Login Button */}
          <button
            className="bg-blue-400 rounded h-[2rem] flex justify-center items-center py-1.5 w-full mt-3 hover:bg-blue-500"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader color="#ffffff" size={8} margin={2} />
            ) : (
              <h1 className="text-center w-full text-white">Login</h1>
            )}
          </button>

          <h5 className="mt-3 font-thin text-gray-400">
            Don't have an account?{" "}
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
};
