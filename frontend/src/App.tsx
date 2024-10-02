import React from "react";
import "./App.css";
import { Router } from "./routes";


const App: React.FC = () => {
  return (
    <>
      <main className=" main flex h-screen ">
        <Router />
      </main>
    </>
  );
}

export default App;
