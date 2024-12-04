import React from "react";
import { useNavigate } from "react-router";
interface WeatherCardProps {
  _id?: string;
  title: string;
  date: string;
  imageSrc: string;
}

const WeatherCardNews: React.FC<WeatherCardProps> = ({
  _id,
  title,
  date,
  imageSrc,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-lg m-2 w-1/3"
      onClick={() => {
        navigate(`/news-detail/${_id}`)
      }}
    >
      <img src={imageSrc} alt="Weather" className="w-full h-40 object-cover cursor-pointer" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default WeatherCardNews;
