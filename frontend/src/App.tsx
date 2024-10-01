import { Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar"
// import Sidebar from "./Components/Sidebar"
import "./App.css";
import React from "react";
// import { createGroupContext } from "./Context";
// import { CreateGroup } from "./layouts/users/Group/component/CreateGroup";
import Home from "./Components/Home";
import { AuthLayout, SignIn, SignUp } from "./layouts/users/auth";
import RootLayout from "./Components/RootLayout";
import PageNotFound from "./Components/PageNotFound";
import YourNotes from "./Components/pages/YourNotes";
import Notification from "./Components/pages/Notification";
import Saved from "./Components/pages/Saved";
import Profile from "./Components/pages/Profile";
import { Library } from "lucide-react";
import { GroupChat, GroupDemand, Notes } from "./layouts/users/Group";

const App:React.FC=()=> {
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
          <Route element={<RootLayout />}>
            <Route  path="/" element={<Home />}></Route>
            <Route path="/yourNotes" element={<YourNotes />}></Route>
            <Route path="/notifications" element={<Notification />}></Route>
            <Route path="/savedNotes" element={<Saved />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/library" element={<Library />}></Route>
            <Route path="/group" element={<GroupChat/>}>
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
