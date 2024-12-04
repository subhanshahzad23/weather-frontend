import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register the required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface WeatherChartProps {
  response: {
    hourly: {
      time: string[];
      temperature_2m: number[];
    };
  };
}

const WeatherChart: React.FC<WeatherChartProps> = ({ response }) => {
  const labels = response.hourly.time.map((item) => item.slice(11, 16));
  const temperatures = response.hourly.temperature_2m;

  // Calculate the minimum temperature and set y-axis minimum value
  const minTemperature = Math.min(...temperatures);
  const yMin = minTemperature - minTemperature * 0.02;

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 1,
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        beginAtZero: false,
        min: yMin,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );

};

export default WeatherChart;
