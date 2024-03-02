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
import { Library } from "./Components/pages/Library";
import { useContext } from "react";
import { createGroupContext } from "./Context";
import { CreateGroup } from "./Components/pages/group/CreateGroup";
import { GroupChat } from "./Components/pages/group/GroupChat";
import {  GroupDemand } from "./Components/pages/group/GroupDemand";
import { Notes } from "./Components/pages/group/Notes";

function App() {

  return (
    <>
      <main className=" main flex h-screen ">
        <Routes>
          {/* public routes  */}

          <Route element={<AuthLayout />}>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
          </Route>



          {/* private routes  */}
          <Route element={<RootLayout/>}>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/yourNotes" element={<YourNotes/>}></Route>
          <Route path="/notifications" element={<Notification/>}></Route>
          <Route path="/savedNotes" element={<Saved/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/library" element={<Library/>}></Route>
          <Route path="/group" element={<GroupChat />}>
            <Route path="demand" element={<GroupDemand />} />
            <Route path="notes" element={<Notes />} />
          </Route>

          <Route path="*" element={<PageNotFound/>}></Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
