"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Creatememe = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const text1 = useRef();
  const text2 = useRef();

  const searchParams = useSearchParams();
  const url = searchParams?.get("url");
  const id = searchParams?.get("id");

  const createMeme = async (event) => {
    event.preventDefault();

    if (!id) {
      setError("Invalid meme template ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.imgflip.com/caption_image?template_id=${id}&username=atifhs&password=9cnAth*j2QR3*WP&text0=${text1.current?.value}&text1=${text2.current?.value}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (data.success) {
        setImg(data.data.url);
      } else {
        setError("Failed to generate meme. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while generating the meme.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url || !id) {
      setError("Missing URL or ID in search parameters.");
    }
  }, [url, id]);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Create Your Meme</h1>
      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-md">
        {url ? (
          <img
            className="w-72 h-72 object-contain rounded-md border"
            src={url}
            alt="Meme template"
          />
        ) : (
          <p className="text-red-500 font-medium">Invalid or missing meme template URL.</p>
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
            disabled={loading}
            className={`px-4 py-2 text-white rounded-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Generating..." : "Create Meme"}
          </button>
        </form>
      </div>
      {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
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
