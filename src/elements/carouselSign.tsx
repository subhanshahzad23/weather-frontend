import React, { useEffect, useState } from "react";

import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselSign: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3];

  const handlePrevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  const handleSliderClick = (index: number) => {
    setCurrentImage(index);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === images.length - 1 ? 0 : prevImage + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full" >
      <div className="flex justify-center items-center w-full h-full ">
        {/* <button
          className="absolute left-0 top-32 transform -translate-y-1/2 bg-gray-200 p-2 ml-2 rounded-full"
          onClick={handlePrevImage}
        >
          <ChevronLeft />{" "}
        </button> */}
        <img
          src={images[currentImage]}
          alt="Carousel Image"
          className=" object-cover rounded-l-lg h-full"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        {/* <button
          className="absolute right-0 top-32  transform -translate-y-1/2 bg-gray-200 p-2 mr-2 rounded-full"
          onClick={handleNextImage}
        >
          <ChevronRight />
        </button> */}
      </div>
      {/* <div className="flex justify-center mt-4 w-full h-1/6" >
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full focus:outline-none ${
              index === currentImage ? "revese-schemed" : "bg-gray-400"
            }`}
            onClick={() => handleSliderClick(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default CarouselSign;
