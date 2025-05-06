"use client";

import { useEffect, useRef, useState } from "react";
import { sendImage } from "@/utils/sendImage";

const Camera = () => {
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("kamera isteği atıldı")
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Kamera erişimi reddedildi:", err);
      }
    };

    enableCamera();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!canvasRef.current || !videoRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");

      sendImage(dataUrl);
      // setCurrentPhoto(dataUrl);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    // <div className="flex gap-10">
      <div>
        <video ref={videoRef} autoPlay playsInline />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    //   <div>
    //     <div style={{ flex: 0.5, display: 'flex', justifyContent: 'center' }}>
    //       {currentPhoto && <img src={currentPhoto} alt="Captured" style={{ width: '100%', height: 'auto' }} />}
    //     </div>
    //   </div>
    // </div>
    
  );
};

export default Camera;
