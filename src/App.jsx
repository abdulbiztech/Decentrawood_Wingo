import { useState } from "react";

import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import MyContextState from "./components/Context/MyContextState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <MyContextState>
        <Header />
        <Dashboard />
      </MyContextState>
    </>
  );
}

export default App;
