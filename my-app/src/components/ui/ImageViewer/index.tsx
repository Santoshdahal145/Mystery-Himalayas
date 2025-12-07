"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Minus,
  RefreshCw,
  Download,
  Maximize,
} from "lucide-react";
import { createPortal } from "react-dom";

interface ImageViewerProps {
  visible: boolean;
  onClose: () => void;
  images: string[];
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  visible,
  onClose,
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentImage = images[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setRotation(0);
    setImageLoaded(false);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
    setImageLoaded(false);
  }, [images.length]);

  const handleClose = () => {
    setIsFullscreen(false);
    setZoom(1);
    setRotation(0);
    onClose();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!visible) return;
      switch (e.key) {
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "Escape":
          handleClose();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "r":
        case "R":
          handleRotate();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [visible, goToNext, goToPrevious, handleClose]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      setImageLoaded(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.25));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `image-${currentIndex + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const resetTransforms = () => {
    setZoom(1);
    setRotation(0);
  };
  const handleImageLoad = () => setImageLoaded(true);

  if (!visible || !images.length) return null;

  return createPortal(
    <div
      className={`fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 ${
        isFullscreen ? "p-0" : "p-4"
      }`}
    >
      {/* Top Toolbar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-white">
          <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            disabled={zoom <= 0.25}
          >
            <Minus size={20} />
          </button>
          <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            disabled={zoom >= 3}
          >
            <Plus size={20} />
          </button>
          <button
            onClick={handleRotate}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
          >
            <RefreshCw size={20} />
          </button>
          <button
            onClick={handleDownload}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
          >
            <Download size={20} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
          >
            <Maximize size={20} />
          </button>
          <button
            onClick={handleClose}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image */}
      <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        <div
          className="relative max-w-full max-h-full"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            cursor: zoom > 1 ? "move" : "default",
            transition: "transform 0.3s ease",
          }}
          onClick={resetTransforms}
        >
          <Image
            src={currentImage}
            alt={`Image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className={`max-w-full max-h-full object-contain ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              maxWidth: isFullscreen ? "100vw" : "90vw",
              maxHeight: isFullscreen ? "100vh" : "80vh",
            }}
            onLoad={handleImageLoad}
            onError={() => setImageLoaded(true)}
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setZoom(1);
                setRotation(0);
                setImageLoaded(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};
