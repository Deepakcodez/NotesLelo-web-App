import React from "react";
import "./App.css";
import { Router } from "./routes";
import { Toaster  } from 'react-hot-toast';


const App: React.FC = () => {
  return (
    <>
      <main className=" main flex  h-screen ">
        <Router />
        <Toaster
          position="bottom-right"
          toastOptions={{
          // Define default options
            className:'p-4 bg-slate-700 text-white',
            duration: 5000,
          
        }}
        />
      </main>
    </>
  );
}

export default App;
