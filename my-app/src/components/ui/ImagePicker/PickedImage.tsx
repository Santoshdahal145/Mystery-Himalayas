"use client";

import { X, Eye } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageViewer } from "../ImageViewer";
import { useState } from "react";

interface PickedImageProps {
  image: File | string;
  onDeleteClick: VoidFunction;
}

export default function PickedImage({
  image,
  onDeleteClick,
}: PickedImageProps) {
  const imgSRC = typeof image === "string" ? image : URL.createObjectURL(image);
  const [imgVisible, setImgVisible] = useState(false);

  return (
    <>
      {imgVisible && (
        <ImageViewer
          images={[imgSRC]}
          onClose={() => setImgVisible(false)}
          visible={imgVisible}
        />
      )}

      <div
        className="relative w-40 border p-4 rounded-md shadow-sm mb-2 gap-2
                      border-gray-200 bg-white transition-colors duration-200"
      >
        <div className="relative w-24 h-24">
          <Image
            src={imgSRC}
            alt="Preview"
            fill
            className="w-24 h-24 object-cover rounded-md"
          />

          {/* Centered view button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-0 m-auto p-1 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={() => setImgVisible(true)}
          >
            <Eye className="h-8 w-8" />
          </Button>
        </div>

        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 p-1"
          onClick={onDeleteClick}
        >
          <X className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    </>
  );
}
