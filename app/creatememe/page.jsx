"use client";

import React, { useRef, useState } from "react";

const Creatememe = ({ searchParams }) => {
  const [img, setImg] = useState("");
  const text1 = useRef();
  const text2 = useRef();

  // Extracting URL and ID from searchParams prop
  const url = searchParams.url;
  const id = searchParams.id;

  const createMeme = async (event) => {
    event.preventDefault();

    const data = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${id}&username=atifhs&password=9cnAth*j2QR3*WP&text0=${text1.current?.value}&text1=${text2.current?.value}`,
      {
        method: "POST",
      }
    );
    const response = await data.json();
    setImg(response.data.url);
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Create Your Meme</h1>
      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-md">
        {url && (
          <img
            className="w-72 h-72 object-contain rounded-md border"
            src={url}
            alt="Meme template"
          />
        )}
        <form
          onSubmit={createMeme}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Enter top text"
            ref={text1}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Enter bottom text"
            ref={text2}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Create Meme
          </button>
        </form>
      </div>
      {img && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700">Your Meme:</h2>
          <img
            className="w-72 h-72 object-contain rounded-md border mt-4"
            src={img}
            alt="Generated meme"
          />
        </div>
      )}
    </div>
  );
};

export default Creatememe;
