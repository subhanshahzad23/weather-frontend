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
import { getAllNews } from "../services/data";
import Footer from "../components/footer";

export default function News() {
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

  const [NewsData, setNewsData] = useState([]);

  const getNewsData = async () => {
    try {
      const response = await getAllNews();
      console.log(response);
      setNewsData(response);
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  };

  useEffect(() => {
    getNewsData();
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
            <h1 className="text-4xl mt-8 w-full pl-16">News</h1>
            <div className="w-full h-full flex flex-col justify-center items-center p-16">
              {NewsData.map((blog:any, index:any) => {
                return (
                  <BlogTile
                    _id={blog._id}
                    key={index}
                    title={blog.title}
                    date={blog.createdAt}
                    description={blog.description}
                    imageSrc={blog.imagesrc}
                    news={true}
                  />
                );
              })}
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
