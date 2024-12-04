import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";

// Register the required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

interface WeatherData {
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
  };
}

const WeatherChartDay: React.FC<{ response: WeatherData }> = ({ response }) => {
  // Extract the data for the chart
  const labels = response.daily.time.map((item) => item.slice(0, 10));
  const tempMin = response.daily.temperature_2m_min;
  const tempMax = response.daily.temperature_2m_max;

  // Prepare the data for the chart
  const data = {
    labels,
    datasets: [
      {
        label: "Min Temperature (°C)",
        data: tempMin,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: "Max Temperature (°C)",
        data: tempMax,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderWidth: 1,
        tension: 0.5,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChartDay;
