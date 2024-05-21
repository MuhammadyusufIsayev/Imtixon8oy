'use client';
import React, { useState, useRef, useEffect } from "react";
import WhatchList from "../WhatchList";

const Header = () => {
  const [isWatchListVisible, setIsWatchListVisible] = useState(false);
  const watchListRef = useRef<any>(null);

  const toggleWatchList = () => {
    setIsWatchListVisible(!isWatchListVisible);
  };

  const handleClickOutside = (event:any) => {
    if (watchListRef.current && !watchListRef.current.contains(event.target)) {
      setIsWatchListVisible(false);
    }
  };

  useEffect(() => {
    if (isWatchListVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWatchListVisible]);

  return (
    <header className="bg-[#14161A] border-b border-[#101010] relative">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-[16px]">
          <h1 className="font-montserrat font-bold text-[20px] leading-[32px] tracking-[0.15px] text-[#87CEEB]">
            CRYPTOFOLIO
          </h1>
          <div className="flex gap-[34px]">
            <select className="font-montserrat font-[500] text-[14px] leading-[17px] tracking-[0.15px] bg-transparent text-white cursor-pointer">
              <option>USD</option>
              <option>EUR</option>
              <option>RUB</option>
            </select>
            <button 
              onClick={toggleWatchList}
              className="font-montserrat font-[500] text-[14px] leading-[17px] tracking-[0.15px] bg-[#87CEEB] py-[8px] px-[17px] rounded">
              WATCH LIST
            </button>
          </div>
        </nav>
      </div>
      <div ref={watchListRef} className={`${isWatchListVisible ? 'block' : 'hidden'} w-[500px] h-[calc(100vh-64px)] bg-[#515151] absolute top-[64px] right-0 z-10 overflow-auto`}>
        <WhatchList />
      </div>
    </header>
  );
};

export default Header;
