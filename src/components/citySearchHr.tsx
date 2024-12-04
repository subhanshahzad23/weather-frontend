import { Droplets, Thermometer, Wind } from "lucide-react";
import { getWeatherIcon, wmoWeatherCodes } from "../services/fetchWeather";
import { HashLoader } from "react-spinners";
import WeatherChart from "./weatherChart";

export default function CitySearchHr(props: {
  response: any;
  selectedTime: any;
  setSelectedTime: any;
  detailCardIndex: any;
  setDetailCardIndex: any;
  selectedValue: any;
}) {
  const {
    response,
    selectedTime,
    setSelectedTime,
    detailCardIndex,
    selectedValue,
  } = props;
  if (
    (response && !response?.hourly?.temperature_2m) ||
    (response && response.daily  && selectedValue === "Latest" && response.daily.time[0].slice(0,10) !==  new Date().toISOString().slice(0,10)) ||
    (response && response.daily  && selectedValue === "Tommorow" && response.daily.time[0].slice(0,10) !==  new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0,10))
  ) {
    // console.log("time" , selectedValue === "Tommorow" && response.current.time.slice(0,10) !==  new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0,10));
    // console.log(response.current.time.slice(0,10) , new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0,10))
    // console.log("response", response);
    return (
      <div className="boxShadowClass w-full h-3/6 flex flex-row justify-center items-center p-4">
        <div className="w-11/12 h-5/6 flex flex-col justify-between items-center">
          <div
            className="w-full h-full p-2 flex flex-row justify-center items-center"
            style={{
              backgroundImage: "linear-gradient(to right, #213547, #426179)",
            }}
          >
            <HashLoader color={"#ffffff"} loading={true} size={150} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="boxShadowClass w-full min-h-11/12 flex flex-row justify-center items-center p-4">
      <div className="w-11/12 h-5/6 flex flex-col justify-between items-center">
        <div
          className="w-full h-5/6 p-2 flex flex-row justify-between items-center"
          style={{
            backgroundImage: "linear-gradient(to right, #213547, #426179)",
          }}
        >
          <div className="w-1/3 flex flex-row justify-center items-center text-4xl poppins-light text-white">
            {response && response.hourly.temperature_2m[detailCardIndex]}°C
          </div>
          {response && (
            <div className="w-1/3 flex flex-col justify-center gap-2 items-center ">
              <img
                src={
                  getWeatherIcon(
                    response.hourly.weather_code[detailCardIndex]
                  ) || ""
                }
                alt="weather-icon"
                className="w-24 h-24"
              />
              <p className="text-white poppins-light text-xl">
                {
                  wmoWeatherCodes[
                    parseInt(response.hourly.weather_code[detailCardIndex])
                  ]
                }
              </p>
            </div>
          )}
          <div className="w-1/3 flex flex-col justify-center items-center gap-4">
            <div className="flex flex-row justify-between items-center text-white text-xl">
              <Thermometer size={24} /> Min:{" "}
              {response && response.daily.temperature_2m_min[0]}°C / Max:{" "}
              {response && response.daily.temperature_2m_max[0]}°C
            </div>
            <div className="flex flex-row justify-between items-center text-white text-xl">
              <Wind size={24} className="mr-2" />{" "}
              {response && response.hourly.wind_speed_10m[detailCardIndex]} km/h
            </div>
            <div className="flex flex-row justify-between items-center text-white text-xl">
              <Droplets size={24} className="mr-2" />{" "}
              {response && response.hourly.relative_humidity_2m[detailCardIndex]} %
            </div>
          </div>
        </div>
        <div className="schemed ">
          {response && response.hourly.time[0].slice(8, 10)}/
          {response && response.hourly.time[0].slice(5, 7)} (GMT)
        </div>
        <div
          className="w-full h-64 flex flex-row justify-between items-center  p-2"
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          {response &&
            response.hourly.time.map((item: any, index: number) => {
              return (
                <div
                  className={`flex flex-col justify-between items-center w-60 h-40  border-white border-2 p-4 ${
                    detailCardIndex == index ? "schemed " : "reverse-schemed"
                  }`}
                  onClick={() => props.setDetailCardIndex(index)}
                >
                  {/* <div>
                  {item.slice(8, 10)}/{item.slice(5, 7)}
                </div> */}
                  <div className="poppins-light">{item.slice(11, 16)}</div>
                  <div>
                    <img
                      src={
                        getWeatherIcon(response.hourly.weather_code[index]) ||
                        ""
                      }
                      alt="weather-icon"
                      className="w-12 h-12"
                    />
                  </div>

                  <div>{response.hourly.temperature_2m[index]}°C</div>
                  <div>
                    {response.hourly.wind_speed_10m[index]}
                    <span className="poppins-light text-xs ml-1">km/h</span>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className="w-full h-64 flex flex-row justify-between items-center  p-2"
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          <WeatherChart response={response} />
        </div>
      </div>
    </div>
  );
}
