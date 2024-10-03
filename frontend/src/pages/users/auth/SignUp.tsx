import { Input } from "@/Components";
import { useState, ChangeEvent, FormEvent, FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../App.css";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-hot-toast";

interface InputState {
  // Define types for input state
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
    confirmPassword: "",
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

    // Form validation logic here
    if (name.trim() === "") {
      toast.error("Name is required");
    } else if (email.trim() === "") {
      toast.error("Email is required");
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email");
    } else if (password.trim() === "") {
      toast.error("Password is required");
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
    } else if (confirmPassword.trim() === "") {
      toast.error("Confirm password is required");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://notes-lelo-app-backend.vercel.app/api/v1/user/register",
          inputValue,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          navigate("/signIn");
          setInputValue({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          toast.success("Registration successful!"); // Notify user on successful registration
        } else {
          toast.error("Signup failed: " + response.data.message);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage); // Show error message from the server or a generic message
      } finally {
        setIsLoading(false);
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
        <h3 className="text-2xl font-bold mb-1 bg-transparent text-white">
          Create a new account
        </h3>
        <h5 className="text-xs text-gray-400 bg-transparent">
          To use Notes lelo, Please enter your details.
        </h5>
        <form className="bg-transparent" onSubmit={SignUpHandler}>
          {/* Name input using reusable Input component */}
          <Input
            label="Name"
            name="name"
            value={inputValue.name}
            onChange={onchangeHandler}
            placeholder="Enter your name"
            required
          />

          {/* Email input using reusable Input component */}
          <Input
            label="Email"
            name="email"
            value={inputValue.email}
            onChange={onchangeHandler}
            placeholder="Please enter a valid email"
            required
          />

          {/* Password input using reusable Input component */}
          <Input
            label="Password"
            name="password"
            type="password"
            value={inputValue.password}
            onChange={onchangeHandler}
            placeholder="Enter a strong password"
            required
          />

          {/* Confirm Password input using reusable Input component */}
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={inputValue.confirmPassword}
            onChange={onchangeHandler}
            placeholder="Confirm your password"
            required
          />

          {/* Submit button */}
          <button
            className="bg-blue-400 rounded-md h-[2rem] flex justify-center items-center py-1.5 w-full mt-3 hover:bg-blue-500"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader color="#ffffff" size={8} margin={2} />
            ) : (
              <h1 className="text-center w-full text-white">Submit</h1>
            )}
          </button>

          <h5 className="mt-3 font-thin text-gray-400">
            Already have an account?{" "}
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
