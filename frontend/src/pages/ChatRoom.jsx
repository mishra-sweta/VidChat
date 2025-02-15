import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [permissionGranted, setPermissionGranted] = useState(
    localStorage.getItem("mediaPermission") === "granted"
  );
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    if (permissionGranted) {
      startVideo();
    }
  }, [permissionGranted]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      mediaStreamRef.current = stream; // Store stream reference
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // Prevent hearing own voice
      }
    } catch (error) {
      console.error("Error starting video:", error);
      alert("Failed to access camera/mic.");
    }
  };

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setPermissionGranted(true);
      localStorage.setItem("mediaPermission", "granted");
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Camera and microphone access is required to join the chat.");
    }
  };

  const toggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      console.log(mediaStreamRef.current);

      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold text-blue-600">Chat Room</h1>
      <p className="mt-2 text-lg">
        Room ID:{" "}
        <span className="font-mono text-lg text-gray-800">{roomId}</span>
      </p>

      {/* Video Preview Area */}
      <div className="mt-6 w-80 h-48 bg-gray-300 rounded-lg flex items-center justify-center relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full rounded-lg"
        ></video>
        {!permissionGranted && (
          <p className="absolute text-gray-700">Camera Preview</p>
        )}
      </div>

      {/* Permission Button */}
      {!permissionGranted && (
        <button
          onClick={requestPermissions}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition cursor-pointer"
        >
          Allow Camera & Mic
        </button>
      )}

      {/* Video & Audio Controls */}
      {permissionGranted && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={toggleVideo}
            className={`px-6 py-3 text-white rounded-lg shadow-md transition cursor-pointer ${
              videoEnabled
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {videoEnabled ? "Turn Off Video" : "Turn On Video"}
          </button>

          <button
            onClick={toggleAudio}
            className={`px-6 py-3 text-white rounded-lg shadow-md transition cursor-pointer ${
              audioEnabled
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {audioEnabled ? "Mute Mic" : "Unmute Mic"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
