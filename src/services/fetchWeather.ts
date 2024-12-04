import axios from "axios";
import sunnyIcon from "../icons/sunny.png";
import cloudyIcon from "../icons/cloudy.png";
import rainyIcon from "../icons/rainy.png";
import snowyIcon from "../icons/snowy.png";
import { backendURL } from "./backendURL";

export function getWeatherIcon(weatherCode: number): string {
  // console.log("weatherCode", weatherCode);
  switch (weatherCode) {
    case 0:
      return sunnyIcon;
    case 1:
    case 2:
    case 3:
      return cloudyIcon;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
    case 95:
    case 96:
    case 99:
      return rainyIcon;
    case 45:
    case 48:
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return snowyIcon;
    default:
      // console.log("default icon", weatherCode, "weatherCode");
      return cloudyIcon; // or a default icon if desired
  }
}
export const wmoWeatherCodes: any = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light",
  53: "Drizzle: Moderate",
  55: "Drizzle: Dense intensity",
  56: "Freezing Drizzle: Light",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight",
  63: "Rain: Moderate",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight",
  73: "Snow fall: Moderate",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight",
  81: "Rain showers: Moderate",
  82: "Rain showers: Violent",
  85: "Snow showers slight",
  86: "Snow showers heavy",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const URL = backendURL + "/api";

const getHourlyDataIndex = (hourly: any, selectedTime: string) => {
  const indexOfSelectedTime = hourly.time.findIndex((time: any) => {
    const hourlyTime = time.split("T")[1];

    return hourlyTime == selectedTime;
  });
  return indexOfSelectedTime;
};

export const fetchData = async (
  latitude: number,
  longitude: number,
  selectedValue: string,
  selectedTime: string
) => {
  try {
    const response = await axios.get(URL + "/weather", {
      params: {
        lat: latitude,
        lon: longitude,
        selectedValue: selectedValue,
      },
    });

    // console.log(response.data);

    const indexOfSelectedTime = getHourlyDataIndex(
      response.data.hourly,
      selectedTime
    );

    if (selectedValue !== "Latest") {
      var returnData;

      returnData = {
        weather: getWeatherIcon(
          response.data.hourly.weather_code[indexOfSelectedTime]
        ),
        temp: response.data.hourly.temperature_2m[indexOfSelectedTime],
      };

      // console.log(returnData);

      return returnData;
    } else {
      if (selectedTime == "00:00") {
        return {
          weather: getWeatherIcon(response.data.current_weather),
          temp: response.data.current_temperature,
          hourly: response.data.hourly,
        };
      } else {
        
        return {
          weather: getWeatherIcon(
            response.data.hourly.weather_code[indexOfSelectedTime]
          ),
          temp: response.data.hourly.temperature_2m[indexOfSelectedTime],
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      weather: sunnyIcon, // Default to sunny icon on error
      temp: 25, // Default temperature on error
    };
  }
};

export const fetchCityData = async (
  latitude: number,
  longitude: number,
  selectedValue: string,
  selectedTime: string
) => {
  try {
    const response = await axios.get(URL + "/cityDetails", {
      params: {
        lat: latitude,
        lon: longitude,
        selectedValue: selectedValue,
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
