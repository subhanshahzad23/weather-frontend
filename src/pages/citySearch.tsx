import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactDOM from "react-dom/client";

import "../index.css";
import Navbar from "../components/navbar.tsx";
import CitySearchBody from "../components/citySearchBody.tsx";

import { useParams } from "react-router-dom";

export default function CitySearch() {
  const params = useParams();

  return (
    <div
      className="flex flex-col justify-between items-center bg-gray-300 "
      style={{ height: "100vh", width: "100vw", overflowX: "hidden" }}
    >
      {
        <CitySearchBody
          latitude={params.latitude}
          longitude={params.longitude}
        />
      }
    </div>
  );
}
