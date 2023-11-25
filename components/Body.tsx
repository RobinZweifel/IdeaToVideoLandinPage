'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const Body = () => {
  const [videoIdea, setVideoIdea] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const checkVideoStatus = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8080/video-status/${requestId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.url) {
        setVideoUrl(result.url);
      } else {
        setTimeout(() => checkVideoStatus(requestId), 5000); // Poll every 5 seconds
      }
    } catch (error) {
      console.error('Error checking video status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (videoIdea.trim() === '') {
      alert('Please enter a video idea');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: videoIdea }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      checkVideoStatus(result.requestId); // Begin checking for video status
    } catch (error) {
      console.error('Error in submitting video idea:', error);
      alert('Failed to submit video generation request');
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full mt-10">
        <h1 className="text-3xl font-bold mb-10 text-center">Generate a Video</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 items-start">
          <input 
            type="text"
            placeholder="Video Idea"
            value={videoIdea}
            onChange={(e) => setVideoIdea(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 float-left">
            Submit
          </button>
        </form>
        {videoUrl && (
          <div>
            <video width="320" height="240" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <br />
            <a href={videoUrl} download="generatedVideo.mp4">Download Video</a>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
