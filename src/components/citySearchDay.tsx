import { Droplets, Thermometer, Wind } from "lucide-react";
import { getWeatherIcon, wmoWeatherCodes } from "../services/fetchWeather";
import cloudyIcon from "../icons/cloudy.png";
import { DotLoader, HashLoader } from "react-spinners";
import WeatherChartDay from "./weatherChartDay";

export default function CitySearchDay(props: {
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
  // console.log("response", response);

  if (
    response.current ||
    (selectedValue === "7days" && response.daily.time.length !== 8) ||
    (selectedValue === "15days" && response.daily.time.length !== 16)
  ) {
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

  const getHourlyDataIndex = () => {
    const hourlyData = response.hourly;
    const dayDate = response.daily.time[detailCardIndex];

    const indexOfSelectedTime = hourlyData.time.findIndex(
      (time: string | any[]) => {
        // console.log(time.slice(0, 10), dayDate, time.slice(11, 16), selectedTime);
        return (
          time.slice(0, 10) === dayDate && time.slice(11, 16) === selectedTime
        );
      }
    );
    // console.log("getHourlyDataIndex", indexOfSelectedTime);
    return indexOfSelectedTime;
  };

  const hourlyDataIndex = getHourlyDataIndex();
  // console.log("hourlyDataIndex", hourlyDataIndex);

  return (
    <div className="boxShadowClass w-full min-h-11/12 flex flex-row justify-center items-center p-4">
      <div className="w-10/12 h-5/6 flex flex-col justify-between items-center">
        <div
          className="w-full h-4/6 p-2 flex flex-row justify-between items-center"
          style={{
            backgroundImage: "linear-gradient(to right, #213547, #426179)",
          }}
        >
          {response && (
            <div className="w-1/3 flex flex-row justify-center items-center text-4xl poppins-light text-white">
              {response.hourly.temperature_2m[hourlyDataIndex]}°C
            </div>
          )}
          {response && (
            <div className="w-1/3 flex flex-col justify-center gap-2 items-center ">
              <img
                src={getWeatherIcon(
                  response.hourly.weather_code[hourlyDataIndex]
                )}
                alt="weather-icon"
                className="w-24 h-24"
              />
              <p className="text-white poppins-light text-xl">
                {
                  wmoWeatherCodes[
                    parseInt(response.hourly.weather_code[hourlyDataIndex])
                  ]
                }
              </p>
            </div>
          )}
          {response && (
            <div className="w-1/3 flex flex-col justify-center items-center gap-4">
              {/* <div className="flex flex-row justify-between items-center text-white text-xl">
                <Thermometer size={24} /> 
                {response && response.daily.temperature_2m_min[0]}°C 
              </div> */}
              <div className="flex flex-row justify-between items-center text-white text-xl">
                <Wind size={24} className="mr-2" />{" "}
                {response && response.hourly.wind_speed_10m[hourlyDataIndex]}
                <span className="poppins-extralight text-xs ml-1">km/h</span>
              </div>
              <div className="flex flex-row justify-between items-center text-white text-xl">
                <Droplets size={24} className="mr-2" />{" "}
                {response &&
                  response.hourly.relative_humidity_2m[hourlyDataIndex]}{" "}
                %
              </div>
            </div>
          )}
        </div>
        {/* <div className="schemed ">
          {response && response.hourly.time[0].slice(8, 10)}/
          {response && response.hourly.time[0].slice(5, 7)} (GMT)
        </div> */}
        <div
          className="w-full h-64 flex flex-row justify-between items-center  p-2"
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          {response &&
            response.daily.time.map((item: any, index: number) => {
              return (
                <div
                  className={`flex flex-col justify-between items-center w-60 h-40  border-white border-2 p-3 ${
                    detailCardIndex == index ? "schemed" : "reverse-schemed"
                  } `}
                  style={{
                    minWidth: "150px",
                  }}
                  onClick={() => props.setDetailCardIndex(index)}
                >
                  <div>
                    {item.slice(8, 10)}/{item.slice(5, 7)}
                  </div>
                  <div className="poppins-extralight">{item.slice(11, 16)}</div>
                  <div>
                    <img
                      src={
                        getWeatherIcon(response.daily.weather_code[index]) || ""
                      }
                      alt="weather-icon"
                      className="w-12 h-12"
                    />
                  </div>

                  <div className="poppins-regular text-xs">
                    {response.daily.temperature_2m_min[index]}°C /{" "}
                    {response.daily.temperature_2m_max[index]}°C{" "}
                  </div>
                  <div className="poppins-regular text-xs">
                    {response.daily.wind_speed_10m_min[index]} /{" "}
                    {response.daily.wind_speed_10m_max[index]}
                    <span className="poppins-light  text-xs ml-1">km/h</span>
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
          <WeatherChartDay response={response} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/12 ">
        <button className={`schemed time-button text-justify mb-2 focused`}>
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
  );
}
