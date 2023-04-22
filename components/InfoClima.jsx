import React from "react";
import Image from "next/image";
import { FaWater, FaWind } from "react-icons/fa";
const InfoClima = ({ data }) => {
  return (
    <div className="">
      <div className="text-center mt-6">
        <div className="flex items-center justify-center mt-8 ">
          <Image
            src={`./img/${data.weather[0].icon}.png`}
            alt="/"
            width="100"
            height="100"
          />
        </div>
        <p className="relativo text-[#0F131F] text-6xl font-bold -ml-2">
          {parseInt(data.main.temp-273.15)}
          <span className="absolute text-2xl ml-2">°C</span>
        </p>
        <p className="text-[#0F131F] text-2xl font-medium capitalize">
          {data.weather[0].description}
        </p>
      </div>
      <div className="flex items-center justify-around mt-8">
        <div className="flex items-center gap-3 justify-start">
          <FaWater className="text-[#0F131F] font-medium text-2xl" />
          <div className="">
            <span>{data.main.humidity}%</span>
            <p>Umidade</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <FaWind className="text-[#0F131F] font-medium text-2xl" />
          <div className="">
            <span>{data.wind.speed} m/s</span>
            <p>Vento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoClima;
