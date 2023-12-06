import { Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar"
// import Sidebar from "./Components/Sidebar"
import Home from "./Components/Home";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AuthLayout from "../auth/AuthLayout";
import RootLayout from "./Components/RootLayout";
import './App.css'

function App() {
  return (
    <>
      <main className="flex h-screen w-screen">
        <Routes>
          {/* public routes  */}

          <Route element={<AuthLayout />}>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
          </Route>



          {/* private routes  */}
          <Route element={<RootLayout/>}>
          <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
