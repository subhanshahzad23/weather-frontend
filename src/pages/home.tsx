import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import "../index.css";
import Navbar from "../components/navbar.tsx";
import Body from "../components/body.tsx";
import Login from "../auth/login.tsx";
import Signup from "../auth/signup.tsx";
import { authenticate } from "../services/auth.ts";

export default function Home() {

 

  return (
    <div
      className="flex flex-col justify-between items-center bg-gray-300 "
      style={{ height: "100vh", width: "100vw", overflowX: "hidden" }}
    >
      

      <Body />
    </div>
  );
}
