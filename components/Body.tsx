'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const Body = () => {
  // const [submittedURL] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [text, setText] = useState('');
  const [color1, setColor1] = useState('#000000'); // Default color black
  const [color2, setColor2] = useState('#FFFFFF'); // Default color white

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle the form submission logic here
  };

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full mt-10">
        <h1 className="text-3xl font-bold mb-10 text-center">Generate a Video</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 items-start">
          <input 
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <input 
            type="text"
            placeholder="Enter subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <textarea 
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <div className="flex items-center gap-2">
            <input 
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-6 h-6 border rounded"
            />
            <span>{color1}</span>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-6 h-6 border rounded"
            />
            <span>{color2}</span>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 float-left">
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
