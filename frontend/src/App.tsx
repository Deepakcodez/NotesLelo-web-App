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
import { GroupChat, GroupDemand, Notes } from "./layouts/users/Group";
import { Savedpage } from "./layouts/users/Saved";
import { NotificationPage } from "./layouts/users/Notification";
import { ProfilePage } from "./layouts/users/Profile";
import { LibraryPage } from "./layouts/users/Library";
import YourNotesPage from "./layouts/users/YourNotes/YourNotesPage";

const App: React.FC = () => {
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
            <Route path="/" element={<Home />}></Route>
            <Route path="/yourNotes" element={<YourNotesPage />}></Route>
            <Route path="/notifications" element={<NotificationPage />}></Route>
            <Route path="/savedNotes" element={<Savedpage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/library" element={<LibraryPage />}></Route>
            <Route path="/group" element={<GroupChat />}>
              <Route path="demand" element={<GroupDemand />} />
              <Route path="notes" element={<Notes />} />
            </Route>

            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
