import React from 'react';
import { useNavigate } from 'react-router';

interface WeatherCardProps {
    _id?: string;
    title: string;
    date: string;
    imageSrc: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ _id , title, date, imageSrc }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row border border-gray-300 rounded-lg overflow-hidden shadow-lg m-2 h-20  " onClick={()=>{
            navigate(`/blog-detail/${_id}`)
        }}>
            <img src={imageSrc} alt="Weather" className="w-40 h-full object-cover cursor-pointer " />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{title.slice(0,20)}</h3>
                <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default WeatherCard;
