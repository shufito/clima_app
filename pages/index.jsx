import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaSearch, FaWater, FaWind } from "react-icons/fa";
import { MdLocationOn, MdLocationOff } from "react-icons/md";

export default function Home() {
  const API_KEY = "f0367477e5f44cfe05e56fd865d2bed3";
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState([]);
  const [erro, setErro] = useState(null);
  const [height, setHeight] = useState({});
  const [fadeIn, setFadeIn] = useState({ opacity: 0, scale: 0 });

  const handleClickSearch = async () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search},BR&appid=${API_KEY}`
      )
      .then((resposta) => {
        console.log(resposta.data);
        setFadeIn({ opacity: 0, scale: 0 });
        setInfo(resposta.data);
        setErro(null);
        setHeight({ height: 380 });
        setFadeIn({ opacity: 100, scale: 1 });
      })
      .catch((erro) => {
        console.log("Ocorreu um erro: ", erro);
        setFadeIn({ opacity: 0, scale: 0 });
        setInfo(false);
        setErro(true);
        setHeight({ height: 200 });
      });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[#0F131F] ">
        <div
          className="flex flex-col justify-center relative bg-slate-300 px-8 py-6 overflow-hidden rounded-2xl mx-4 lg:mx-0 h-16 transition-all duration-500"
          style={height}
        >
          <div className="flex items-center justify-center w-full h-min">
            <MdLocationOn className="text-[#0F131F] text-3xl font-bold" />
            <input
              className="text-[#0F131F] bg-slate-300 font-medium text-xl w-4/5 uppercase outline-none placeholder:text-lg placeholder:text-[#0F131F]"
              type="text"
              placeholder="Sua Cidade"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleClickSearch}>
              <FaSearch className="text-[#0F131F] font-normal text-lg" />
            </button>
          </div>

          <div
            className={`${
              erro ? "opacity-100 scale-100" : "hidden opacity-0 scale-0"
            } text-center mt-8 px-4 py-3`}
          >
            <div className="flex items-center justify-center">
              <MdLocationOff className="text-[#0F131F] text-6xl font-bold" />
            </div>

            <p className="relativo text-[#0F131F] text-lg font-medium">
              Cidade não encontrada!
            </p>
          </div>

          {info.main && (
            <div>
              <div className="text-center mt-6 transition-all duration-500 delay-1000"
              style={fadeIn}>
                <div className="flex items-center justify-center mt-8 ">
                  <Image
                    src={`./img/${info.weather[0]?.icon}.png`}
                    alt="/"
                    width="100"
                    height="100"
                  />
                </div>
                <p className="relativo text-[#0F131F] text-6xl font-bold -ml-2">
                  {parseInt(info.main?.temp - 273.15)}
                  <span className="absolute text-2xl ml-2">°C</span>
                </p>
                <p className="text-[#0F131F] text-2xl font-medium capitalize">
                  {info.weather[0]?.description}
                </p>
              </div>
              <div className="flex items-center justify-around mt-8">
                <div className="flex items-center gap-3 justify-start">
                  <FaWater className="text-[#0F131F] font-medium text-2xl" />
                  <div className="">
                    <span>{info.main?.humidity}%</span>
                    <p>Umidade</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <FaWind className="text-[#0F131F] font-medium text-2xl" />
                  <div className="">
                    <span>{info.wind?.speed} m/s</span>
                    <p>Vento</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
