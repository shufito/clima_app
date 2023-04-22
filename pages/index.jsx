import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { MdLocationOn, MdLocationOff } from "react-icons/md";
import InfoClima from "../components/InfoClima.jsx";

export default function Home() {
  const API_KEY = "f0367477e5f44cfe05e56fd865d2bed3";
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState([]);
  const [erro, setErro] = useState(null);

  const handleClickSearch = async () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search},BR&appid=${API_KEY}`
      )
      .then((resposta) => {
        console.log(resposta.data);
        setInfo(resposta.data);
        setErro(null);
      })
      .catch((erro) => {
        console.log("Ocorreu um erro: ", erro);
        setInfo(false);
        setErro(true);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[#0F131F] ">
        <div className="relative bg-slate-300 px-8 py-6 overflow-hidden rounded-2xl">
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

          {info.main && <InfoClima data={info} />}
        </div>
      </div>
    </>
  );
}
