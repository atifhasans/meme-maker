import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = async () => {
  const data = await fetch('https://api.imgflip.com/get_memes');
  const response = await data.json();

  return (
    <>
      <h1 className="text-center mt-5 mb-5 text-3xl font-medium">Meme Maker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 w-full max-w-7xl">
        {response.data.memes.map((item) => {
          return (
            <div key={item.id} className="flex flex-col items-center">
              <div className="relative w-48 h-48 border-[1px] border-black rounded-md shadow-sm shadow-gray hover:shadow-2xl overflow-hidden">
                <Image 
                  src={item.url} 
                  alt={item.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <button className="mt-2">
                <Link 
                  href={{
                    pathname: "creatememe",
                    query: {
                      url: item.url,
                      id: item.id,
                    },
                  }}
                >
                  Generate Meme
                </Link>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Page;
