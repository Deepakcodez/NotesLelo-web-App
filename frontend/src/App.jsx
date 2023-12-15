import { Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar"
// import Sidebar from "./Components/Sidebar"
import Home from "./Components/Home";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AuthLayout from "../auth/AuthLayout";
import RootLayout from "./Components/RootLayout";
import './App.css'
import PageNotFound from "./Components/PageNotFound";
import YourNotes from "./Components/pages/YourNotes";
import Notification from "./Components/pages/Notification";
import Saved from "./Components/pages/Saved";
import Profile from "./Components/pages/Profile";

function App() {
  return (
    <>
      <main className="flex h-screen ">
        <Routes>
          {/* public routes  */}

          <Route element={<AuthLayout />}>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
          </Route>



          {/* private routes  */}
          <Route element={<RootLayout/>}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/yourNotes" element={<YourNotes/>}></Route>
          <Route path="/notifications" element={<Notification/>}></Route>
          <Route path="/savedNotes" element={<Saved/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
