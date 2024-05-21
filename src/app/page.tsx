"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoEyeSharp } from "react-icons/io5";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const Home: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [watchList, setWatchList] = useState<Crypto[]>([]);
  const itemsPerPage: number = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("watchList");
    setWatchList(saved ? JSON.parse(saved) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const chunkArray = (array: any[], size: number): any[][] => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedData = chunkArray(cryptoData, 4);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleWatchList = (crypto: Crypto) => {
    if (watchList.some((item) => item.id === crypto.id)) {
      setWatchList(watchList.filter((item) => item.id !== crypto.id));
    } else {
      setWatchList([...watchList, crypto]);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cryptoData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cryptoData.length / itemsPerPage);

  return (
    <div>
      <section className="bg-hero-bg h-[400px]">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center text-white h-[400px]">
            <h1 className="font-montserrat font-bold text-[60px] leading-[72px] tracking-[-0.5px] text-[#87CEEB]">
              CRYPTOFOLIO WATCH LIST
            </h1>
            <p className="font-montserrat font-[500] text-[14px] text-[#A9A9A9] tracking-widest">
              Get All The Info Regarding Your Favorite Crypto Currency
            </p>
            <div className="w-full h-[180px] mt-8">
              <Swiper className="mySwiper" modules={[]}>
                {chunkedData.length > 0 ? (
                  chunkedData.map((chunk, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex items-center justify-center h-[180px] gap-[220px]">
                        {chunk.map((crypto, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center gap-[5px]"
                          >
                            <img
                              className="w-[80px]"
                              src={crypto.image}
                              alt={crypto.name}
                            />
                            <p className="text-[16px] text-[#0ECB81]">
                              <span className="text-white">
                                {crypto.symbol.toUpperCase()}
                              </span>{" "}
                              {crypto.price_change_percentage_24h > 0 ? "+" : ""}
                              {crypto.price_change_percentage_24h.toFixed(2)}%
                            </p>
                            <p className="text-[20px]">
                              $ {crypto.current_price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="flex flex-col items-center">
                      <p>Loading...</p>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#14161A] pb-[50px] pt-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-center w-full gap-[20px]">
            <h2 className="text-white text-[34px]">
              Cryptocurrency Prices by Market Cap
            </h2>
            <input
              className="w-full bg-transparent border-[1px] border-[#A9A9A9] rounded-md outline-none p-[14px] text-white"
              type="text"
              placeholder="Search For a Crypto Currency.."
            />
            <table className="w-full">
              <thead className="bg-[#87CEEB]">
                <tr className="h-[55px] px-[20px] rounded flex items-center justify-between w-full">
                  <th className="text-start pl-4 w-[200px]">Coin</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">24h Change</th>
                  <th className="text-end pr-4">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((crypto, index) => (
                  <tr
                    className="text-white h-[90px] border-b border-[#515151] cursor-pointer flex items-center justify-between w-full"
                    key={index}
                  >
                    <Link href={`/${crypto.id}`} className="flex items-center gap-[15px] h-[90px] pl-4 w-[200px]">
                      <img
                        className="w-[50px]"
                        src={crypto.image}
                        alt={crypto.name}
                      />
                      <p className="flex flex-col">
                        {crypto.symbol.toUpperCase()}{" "}
                        <span className="text-[#A9A9A9]">{crypto.name}</span>{" "}
                      </p>
                    </Link>
                    <td className="text-end flex justify-end">
                      $ {crypto.current_price.toFixed(2)}
                    </td>
                    <td
                      className={`text-end items-center gap-2 flex justify-end ${
                        crypto.price_change_percentage_24h > 0
                          ? "text-[#0ECB81]"
                          : "text-[#FF0000]"
                      }`}
                    >
                      <IoEyeSharp
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: watchList.some((item) => item.id === crypto.id)
                            ? "#0ECB81"
                            : "white",
                        }}
                        onClick={() => handleToggleWatchList(crypto)}
                      />
                      {crypto.price_change_percentage_24h > 0 ? "+" : ""}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="text-end pr-4 flex">
                      $ {crypto.market_cap}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index + 1)}
                  className={`px-4 py-2 mx-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-[#87CEEB]"
                      : "bg-transparent text-[#A9A9A9]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
