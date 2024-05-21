import React, { useEffect, useState } from 'react';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const WhatchList: React.FC = () => {
  const [watchList, setWatchList] = useState<Crypto[]>([]);

  useEffect(() => {
    const savedWatchList = localStorage.getItem('watchList');
    if (savedWatchList) {
      setWatchList(JSON.parse(savedWatchList));
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center p-[32px]'>
      <h2 className='text-[30px] text-white'>WATCHLIST</h2>
      <div className='mt-4'>
        {watchList.length > 0 ? (
          <ul className='space-y-4'>
            {watchList.map((crypto) => (
              <li key={crypto.id} className='flex items-center gap-4 p-4 bg-gray-800 rounded-md'>
                <img src={crypto.image} alt={crypto.name} className='w-12' />
                <div>
                  <p className='text-white text-lg'>{crypto.name} ({crypto.symbol.toUpperCase()})</p>
                  <p className='text-green-400'>${crypto.current_price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-white'>Your watch list is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WhatchList;
