"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface CanvasVideoProps {
  src: string;
  type?: string;
  className?: string;
}

export default function CanvasVideo({
  src,
  type = "video/webm",
  className = "",
}: CanvasVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    video.play();

    const draw = () => {
      if (video && !video.paused && !video.ended) {
        const videoRatio = video.videoWidth / video.videoHeight;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > videoRatio) {
          // El canvas es más "ancho" que el video → recorto arriba/abajo
          drawWidth = canvas.width;
          drawHeight = canvas.width / videoRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          // El canvas es más "alto" que el video → recorto izquierda/derecha
          drawHeight = canvas.height;
          drawWidth = canvas.height * videoRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
      }
      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={`${styles.canvas} ${className}`} />
      <video ref={videoRef} muted playsInline loop style={{ display: "none" }}>
        <source src={src} type={type} />
      </video>
    </>
  );
}
