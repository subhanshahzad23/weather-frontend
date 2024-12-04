import React, { useEffect, useRef, useState } from "react";
import MapComponent from "../map/page";
import SegmentedControl from "../segmentedControl/segmentControl";
import SearchBox from "./searchComponent";
import Navbar from "./navbar";
import Carousel from "../elements/carousel";
import WeatherCard from "../elements/weatherTiles";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import WeatherCardNews from "../elements/weatherTilesNews";
import { getAllBlogs, getAllNews } from "../services/data";
import Footer from "./footer";

export default function Body() {
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

  const [weatherData, setWeatherData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const getWeatherData = async () => {
    try {
      const response = await getAllBlogs();
      setWeatherData(response.slice(0, 3));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const getNewsData = async () => {
    try {
      const response = await getAllNews();
      setNewsData(response.slice(0, 3));
    } catch (error) {
      console.error("Error fetching news data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getWeatherData();
    getNewsData();
  }, []);

  return (
    <div className="w-full h-full">
      <Navbar
        setSelectedCountry={setSelectedCountry}
        setCoordinates={setCoordinates}
        setFinalPropData={setFinalPropData}
        selectedCountry={selectedCountry}
        coordinates={coordinates}
      />
      <div
        className="w-full h-full  md:pl-16 md:pr-16 xl:pl-40 xl:pr-40 2xl:pl-60 2xl:pr-60"
        style={{
          height: "fit-content",
        }}
      >
        <div
          className="flex flex-col justify-between items-center  schemed w-full h-full poppins-semibold"
          style={{ overflow: "hidden" }}
        >
          <div className="w-full h-full flex flex-col justify-center items-center ">
            <div className="flex flex-row justify-between items-center w-full h-80 p-16 mt-8 gap-4">
              <div className="w-full h-80 ">
                <Carousel />
              </div>
              {/* <div className="w-1/3 h-80">
                {weatherData.map((data :any, index) => (
                  <WeatherCard
                    _id={data._id}
                    key={index}
                    title={data.title}
                    date={data.createdAt}
                    imageSrc={data.imagesrc}
                  />
                ))}
              </div> */}
            </div>
            <div className="flex flex-row justify-between items-center  w-full h-24 p-16 poppins-semibold">
              <div className=" max-w-4/12 flex flex-row justify-between items-start">
                <SegmentedControl
                  name="group-1"
                  callback={(val) => {
                    console.log(val);
                    setSelectedValue(val);

                    val === "Latest"
                      ? setSelectedTime("00:00")
                      : setSelectedTime("01:00");
                  }}
                  controlRef={useRef() as React.RefObject<HTMLDivElement>}
                  segments={[
                    {
                      label: "Latest",
                      value: "Latest",
                      ref: useRef() as React.RefObject<HTMLDivElement>,
                    },
                    {
                      label: "Tommorow",
                      value: "Tommorow",
                      ref: useRef() as React.RefObject<HTMLDivElement>,
                    },
                    {
                      label: "7 Days",
                      value: "7days",
                      ref: useRef() as React.RefObject<HTMLDivElement>,
                    },
                    {
                      label: "15 Days",
                      value: "15days",
                      ref: useRef() as React.RefObject<HTMLDivElement>,
                    },
                  ]}
                />{" "}
              </div>
              <div className="  max-w-6/12">
                <div className="flex flex-col w-full h-full">
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <input
                      type="number"
                      placeholder="Enter Latitude"
                      value={coordinates.latitude || ""}
                      onChange={(e) =>
                        setCoordinates({
                          ...coordinates,
                          latitude: parseFloat(e.target.value),
                        })
                      }
                      className=" bg-gray-200 border-2 rounded-lg p-2  font-semibold w-1/2"
                    />
                    <input
                      type="number"
                      placeholder="Enter Longitude"
                      value={coordinates.longitude || ""}
                      onChange={(e) =>
                        setCoordinates({
                          ...coordinates,
                          longitude: parseFloat(e.target.value),
                        })
                      }
                      className=" bg-gray-200 border-2 rounded-lg p-2  font-semibold w-1/2"
                    />
                  </div>
                  <p className="w-full text-center p-2 mr-2">-or-</p>

                  <div className="w-full flex flex-row justify-between gap-4 items-center ">
                    <div className="w-9/12 ">
                      <SearchBox
                        setSelectedCountry={setSelectedCountry}
                        setCoordinates={setCoordinates}
                      />
                    </div>
                    <button
                      className="reverse-schemed p-2 w-fit"
                      onClick={() => {
                        setFinalPropData({
                          selectedLocation: selectedCountry,
                          latitude: coordinates.latitude,
                          longitude: coordinates.longitude,
                        });
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxShadowClass w-full min-h-11/12 flex flex-row justify-center items-center p-4">
              <div className="w-10/12 h-5/6">
                <MapComponent
                  selectedLocation={finalPropData.selectedLocation}
                  latitude={finalPropData.latitude}
                  longitude={finalPropData.longitude}
                  view={sliderValue}
                  selectedValue={selectedValue}
                  selectedTime={selectedTime}
                />
              </div>
              <div className="flex flex-col justify-center items-center w-1/12 ">
                <button
                  className={`schemed time-button text-justify mb-2 focused`}
                >
                  GMT
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">00:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "01:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("01:00")}
                >
                  01:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">02:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "03:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("03:00")}
                >
                  03:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">04:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "05:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("05:00")}
                >
                  05:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">06:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "07:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("07:00")}
                >
                  07:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">08:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "09:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("09:00")}
                >
                  09:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">10:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "11:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("11:00")}
                >
                  11:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">12:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "13:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("13:00")}
                >
                  13:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">14:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "15:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("15:00")}
                >
                  15:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">16:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "17:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("17:00")}
                >
                  17:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">18:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "19:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("19:00")}
                >
                  19:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">20:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "21:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("21:00")}
                >
                  21:00
                </button>
                {/* <button className="schemed time-button text-justify mb-2  ">22:00</button> */}
                <button
                  className={`schemed time-button text-justify mb-2 ${
                    selectedTime === "23:00" ? "focused" : ""
                  }`}
                  onClick={() => setSelectedTime("23:00")}
                >
                  23:00
                </button>
              </div>
            </div>
            {/* <div className="flex flex-row justify-between items-center w-full h-80 p-16 mt-8 mb-8 gap-4">
              {newsData.map((data: any, index) => (
                <WeatherCardNews
                  _id={data._id}
                  key={index}
                  title={data.title}
                  date={data.createdAt}
                  imageSrc={data.imagesrc}
                />
              ))}
            </div> */}
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
  );
}
