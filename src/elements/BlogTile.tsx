import React from "react";
import { useNavigate } from "react-router";
interface BlogTileProps {
  _id?: string;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  news?: boolean;
}

const BlogTile: React.FC<BlogTileProps> = ({
  _id,
  title,
  date,
  imageSrc,
  description,
  news,
}) => {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-full flex flex-row border border-gray-300 rounded-lg overflow-hidden shadow-lg m-2 h-60  ">
      <img
        src={imageSrc}
        alt="Weather"
        className="w-80 h-full object-cover cursor-pointer "
        onClick={() => {
          if (news) navigate(`/news-detail/${_id}`);
          else navigate(`/blog-detail/${_id}`);
        }}
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 poppins-semibold">
            {title.slice(0, 100)}
          </h3>
          <p className="text-md text-gray-500">{description.slice(0, 100)}...</p>
        </div>

        <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogTile;
