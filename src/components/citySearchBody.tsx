import React, { useEffect, useRef, useState } from "react";
import MapComponent from "../map/page";
import SegmentedControl from "../segmentedControl/segmentControl";
import SearchBox from "./searchComponent";
import {
  fetchCityData,
  getWeatherIcon,
  wmoWeatherCodes,
} from "../services/fetchWeather";
import { ChevronUp, Thermometer, Wind } from "lucide-react";
import CitySearchHr from "./citySearchHr";
import CitySearchDay from "./citySearchDay";
import { HashLoader } from "react-spinners";
import Navbar from "./navbar";
import Carousel from "../elements/carousel";
import WeatherCard from "../elements/weatherTiles";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import WeatherCardNews from "../elements/weatherTilesNews";
import { getAllBlogs, getAllNews } from "../services/data";
import Footer from "./footer";
export default function CitySearchBody(props: {
  latitude: any;
  longitude: any;
}) {
  const [sliderValue, setSliderValue] = useState("world");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedValue, setSelectedValue] = useState("Latest");
  const [selectedTime, setSelectedTime] = useState("00:00");

  const [coordinates, setCoordinates] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
  });

  const [detailCardIndex, setDetailCardIndex] = useState(0);

  const [finalPropData, setFinalPropData] = useState({
    selectedLocation: "",
    latitude: 0,
    longitude: 0,
  });

  const [response, setResponse] = useState<any>();

  const fetchCityDataFuntion = async () => {
    const response = await fetchCityData(
      finalPropData.latitude,
      finalPropData.longitude,
      selectedValue,
      selectedTime
    );
    // console.log(response.cityDetails);
    setResponse(response.cityDetails);
  };

  useEffect(() => {
    fetchCityDataFuntion();
    // console.log(finalPropData);
  }, [finalPropData]);

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
    <div className="w-full h-full ">
      <Navbar
        setSelectedCountry={setSelectedCountry}
        setCoordinates={setCoordinates}
        setFinalPropData={setFinalPropData}
        selectedCountry={selectedCountry}
        coordinates={coordinates}
      />
      <div
        className="w-full h-full  md:pl-16 md:pr-16 xl:pl-40 xl:pr-40 2xl:pl-60 2xl:pr-60  "
        style={{
          height: "fit-content",
        }}
      >
        <div
          className="flex flex-col justify-between items-center  schemed w-full h-full poppins-semibold "
          style={{ overflow: "hidden" }}
        >
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between items-center w-full h-80 p-16 mt-8 gap-4">
              <div className="w-full h-80 ">
                <Carousel />
              </div>
              {/* <div className="w-1/3 h-80">
                {weatherData.map((data: any, index) => (
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
                  callback={async (val) => {
                     await fetchCityDataFuntion();
                    setSelectedValue(val);

                    val === "Latest"
                      ? setSelectedTime("00:00")
                      : setSelectedTime("01:00");
                    setFinalPropData({
                      selectedLocation: selectedCountry,
                      latitude: coordinates.latitude,
                      longitude: coordinates.longitude,
                    });
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
                    {/* <input
                  type="text"
                  placeholder="Enter Country Name"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className=" bg-gray-200 border-2 rounded-lg p-2 mr-2 font-semibold w-9/12"
                /> */}
                    <div className="w-9/12">
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
            {response ? (
              selectedValue == "Latest" || selectedValue == "Tommorow" ? (
                <CitySearchHr
                  response={response}
                  detailCardIndex={detailCardIndex}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  setDetailCardIndex={setDetailCardIndex}
                  selectedValue={selectedValue}
                />
              ) : (
                //   <div></div>
                <CitySearchDay
                  response={response}
                  detailCardIndex={detailCardIndex}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  setDetailCardIndex={setDetailCardIndex}
                  selectedValue={selectedValue}
                />
              )
            ) : (
              <div className="boxShadowClass w-full h-3/6 flex flex-row justify-center items-center p-4">
                <div className="w-11/12 h-5/6 flex flex-col justify-between items-center">
                  <div
                    className="w-full h-full p-2 flex flex-row justify-center items-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #213547, #426179)",
                    }}
                  >
                    <HashLoader color={"#ffffff"} loading={true} size={150} />
                  </div>
                </div>
              </div>
            )}
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
