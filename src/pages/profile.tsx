import React, { useEffect, useRef, useState } from "react";
import MapComponent from "../map/page";
import SegmentedControl from "../segmentedControl/segmentControl";
import SearchBox from "../components/searchComponent";
import Navbar from "../components/navbar";
import Carousel from "../elements/carousel";
import WeatherCard from "../elements/weatherTiles";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import WeatherCardNews from "../elements/weatherTilesNews";
import BlogTile from "../elements/BlogTile";
import { getAllBlogs } from "../services/data";
import { profile, sendPasswordResetEmail } from "../services/auth";
import Footer from "../components/footer";

export default function Profile() {
  const [sliderValue, setSliderValue] = useState("world");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedValue, setSelectedValue] = useState("Latest");
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [finalPropData, setFinalPropData] = useState({
    selectedLocation: "",
    latitude: 0,
    longitude: 0,
  });

  const [profileData, setProfileData] = useState<any>([]);

  const getProfileData = async () => {
    const user: any = JSON.parse(localStorage.getItem("user") as string);
    const response = await profile(user?.email || " ");
    setProfileData(response);
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div
      className="flex flex-col justify-between items-center bg-gray-300 "
      style={{ height: "100vh", width: "100vw", overflowX: "hidden" }}
    >
      <div className="w-full h-full">
        <Navbar
          setSelectedCountry={setSelectedCountry}
          setCoordinates={setCoordinates}
          setFinalPropData={setFinalPropData}
          selectedCountry={selectedCountry}
          coordinates={coordinates}
        />
        <div
          className="w-full h-full  md:pl-16 md:pr-16 xl:pl-40 xl:pr-40 2xl:pl-60 2xl:pr-60 "
          style={{
            minHeight: "100vh",
            height: "fit-content",
          }}
        >
          <div
            className="flex flex-col justify-start items-center  schemed w-full h-full poppins-semibold"
            style={{
              overflow: "hidden",
              minHeight: "100vh",
              height: "fit-content",
            }}
          >
            <h1 className="text-4xl mt-8 w-full pl-16">Profile</h1>
            <div className="w-full h-full flex flex-col justify-center items-center p-16 gap-8">
              <div className="flex flex-row justify-center items-start w-full h-full gap-4">
                <div className="flex flex-col justify-center items-center w-1/2 h-full">
                  <label className="text-2xl text-left w-full mb-4">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    className="w-1/2 h-12 border-2 border-gray-400 rounded-lg p-2 schemed text-left w-full"
                  />
                </div>
                <div className="flex flex-col justify-center items-center w-1/2 h-full">
                  <label className="text-2xl text-left w-full mb-4">
                    Email
                  </label>
                  <input
                    type="text"
                    value={profileData.email}
                    className="w-1/2 h-12 border-2 border-gray-400 rounded-lg p-2 schemed text-left w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col  justify-center items-start w-full h-full gap-4 mt-16">
                <h3 className="text-2xl text-left w-full mb-4">
                  Change Password
                </h3>
                <button
                  className="w-1/2 h-12 border-2 border-gray-400 rounded-lg p-2 reverse-schemed text-left "
                  onClick={async () => {
                    const response = await sendPasswordResetEmail(
                      profileData.email
                    );

                    if (response == true) {
                      alert("Password reset email sent successfully");
                    } else {
                      alert("Error sending password reset email");
                    }
                  }}
                >
                  Request Change Email
                </button>
              </div>
            </div>
            {/* <footer className="bottom-0 right-0 p-4">
        <a
          href="/"
          className="schemed"
          target="_blank"
          rel="noopener noreferrer"
        >
          Footer
        </a>
      </footer> */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
