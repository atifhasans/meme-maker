import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = async () => {
  // Fetch meme data
  const data = await fetch('https://api.imgflip.com/get_memes');
  const response = await data.json();

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-center mt-8 mb-12 text-4xl font-bold text-gray-800">
        Meme Maker
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 w-full max-w-7xl mx-auto">
        {response.data.memes.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-48 h-48 border border-gray-200 rounded-md overflow-hidden">
              <Image
                src={item.url}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              {item.name}
            </h3>
            <Link
              href={{
                pathname: '/creatememe',
                query: {
                  url: item.url,
                  id: item.id,
                },
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Generate Meme
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
