"use client";

import { useEffect, useRef, useState } from "react";

const Camera = () => {
const videoRef = useRef<HTMLVideoElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);
const [isCameraReady, setIsCameraReady] = useState(false);
const [ws, setWs] = useState<WebSocket | null>(null); // WebSocket bağlantısı için state

useEffect(() => {
  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraReady(true);
      }
    } catch (err) {
      console.error("Kamera erişimi reddedildi:", err);
    }
  };

  enableCamera();

  const socket = new WebSocket("wss://825f-78-182-158-130.ngrok-free.app/ws/rollcall");

  socket.onopen = () => {
    console.log("WebSocket bağlantısı kuruldu");
    setWs(socket);
  };

  socket.onerror = (error) => {
    console.error("WebSocket hata:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket bağlantısı kapandı");
  };

  return () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  };
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    if (!canvasRef.current || !videoRef.current || !isCameraReady || !ws) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL("image/png");

    if (dataUrl) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(dataUrl);
      }
    }
  }, 2000);

  return () => clearInterval(interval);
}, [isCameraReady, ws]);

return (
  <div className="">
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{ width: "auto", height: "auto", display: isCameraReady ? "block" : "none" }}
    />
    
    <canvas ref={canvasRef} style={{ display: "none" }} />
  </div>
);
};

export default Camera;