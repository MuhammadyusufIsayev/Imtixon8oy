"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { parse } from "node-html-parser";
import { ApexOptions } from "apexcharts"; // Import the ApexOptions type

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Params {
  params: {
    id: string;
  };
}

interface CryptoDetailType {
  id: string;
  name: string;
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
}

interface PriceData {
  x: Date;
  y: number;
}

const CryptoDetail: React.FC<Params> = ({ params }) => {
  const { id } = params;
  const [cryptoDetail, setCryptoDetail] = useState<CryptoDetailType | null>(null);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CryptoDetailType = await response.json();
        setCryptoDetail(data);

        const priceResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
        );

        if (!priceResponse.ok) {
          throw new Error(`HTTP error! status: ${priceResponse.status}`);
        }

        const priceData = await priceResponse.json();
        const formattedPriceData: PriceData[] = priceData.prices.map((price: [number, number]) => ({
          x: new Date(price[0]),
          y: price[1],
        }));
        setPriceData(formattedPriceData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const limitDescription = (htmlString: string | undefined, wordLimit: number): string => {
    if (!htmlString) return "Description not available.";
    const root = parse(htmlString);
    const textContent = root.structuredText;
    const words = textContent.split(' ');
    const limitedWords = words.slice(0, wordLimit).join(' ');
    return limitedWords;
  };

  const limitedDescription = cryptoDetail?.description?.en
    ? limitDescription(cryptoDetail.description.en, 100)
    : "Description not available.";

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: '100%'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `$${value.toFixed(2)}`
      }
    },
    series: [{
      name: 'Price',
      data: priceData
    }]
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex p-[25px] bg-[#14161A] h-[93vh]">
          <div className="flex flex-col gap-[20px] w-1/3 border-r border-[#fff] pr-[25px]">
            <div className="flex flex-col items-center gap-[20px]">
              {cryptoDetail?.image.large && <img className="w-[200px]" src={cryptoDetail.image.large} alt={cryptoDetail.name} />}
              <h2 className="text-white text-[48px] font-bold">{cryptoDetail?.name}</h2>
            </div>
            <div className="text-white font-light" dangerouslySetInnerHTML={{ __html: limitedDescription }} />
            <p className="text-white font-bold text-[24px]">
              Rank: <span className="font-extralight">{cryptoDetail?.market_cap_rank}</span>
            </p>
            <p className="text-white font-bold text-[24px]">
              Current Price:{" "}
              <span className="font-extralight">$ {cryptoDetail?.market_data.current_price.usd}</span>
            </p>
            <p className="text-white font-bold text-[24px]">
              Market Cap:{" "}
              <span className="font-extralight">$ {cryptoDetail?.market_data.market_cap.usd}</span>
            </p>
          </div>
          <div className="chart w-2/3 p-[25px]">
            <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height="100%" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoDetail;
