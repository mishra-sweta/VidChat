import React from "react";
import { useNavigate } from "react-router-dom";

// Function to generate a random 7-character string
const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 9); // 7-letter unique ID
};

function Home() {
  const navigate = useNavigate();

  const startMeeting = () => {
    const roomId = generateRoomId(); // Generate unique room ID
    navigate(`/chat/${roomId}`); // Navigate to ChatRoom page with ID
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-5xl font-bold text-blue-600">Welcome to VidChat</h1>
      <p className="mt-4 text-lg text-gray-700">
        Connect, collaborate, and celebrate from anywhere with VidChat
      </p>
      <button
        onClick={startMeeting}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
      >
        Start a Meeting
      </button>
    </div>
  );
}

export default Home;
