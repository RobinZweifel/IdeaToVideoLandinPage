'use client';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const Body = () => {
  const [videoIdea, setVideoIdea] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoError, setVideoError] = useState('');

  const checkVideoStatus = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8080/video-status/${requestId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.url) { 
        setVideoUrl(result.url);
        setLoading(false);
        setVideoError('');
      } else if (result.status === 'Processing') {
        setTimeout(() => checkVideoStatus(requestId), 5000);
      } else {
        setLoading(false);
        setVideoError('Unexpected response from server.');
      }
    } catch (error) {
      setLoading(false);
      setVideoError('Error checking video status.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVideoUrl('');
    setLoading(true);
    setVideoError('');

    if (videoIdea.trim() === '') {
      alert('Please enter a video idea');
      setLoading(false);
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
      checkVideoStatus(result.requestId);
    } catch (error) {
      setLoading(false);
      setVideoError('Failed to submit video generation request.');
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full p-4">
      <div className="w-full max-w-6xl mt-10">
        <h1 className="text-3xl font-bold mb-10 text-center">Generate a Video</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input 
            type="text"
            placeholder="Video Idea"
            value={videoIdea}
            onChange={(e) => setVideoIdea(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
        {loading && <p className="text-center mt-4">Generating video, please wait...</p>}
        {videoError && <p className="text-red-500 text-center mt-4">{videoError}</p>}
        {videoUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Generated Video</h2>
            <div className="flex justify-center">
              <video width="640" height="480" controls className="mx-auto">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <a href={videoUrl} download="generatedVideo.mp4" className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
              Download Video
            </a>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
