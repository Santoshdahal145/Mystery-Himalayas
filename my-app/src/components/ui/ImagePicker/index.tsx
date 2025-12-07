"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

type SingleImagePickerProps = {
  type: "single";
  onChange: (url: string | null) => void;
  initialFiles?: string | null;
  label: string;
  id: string;
  errorMsg: string;
};

type MultipleImagePickerProps = {
  type: "multiple";
  onChange: (urls: string[]) => void;
  initialFiles?: string[];
  label: string;
  id: string;
  errorMsg?: string;
};

type ImagePickerProps = SingleImagePickerProps | MultipleImagePickerProps;

export const ImagePicker: React.FC<ImagePickerProps> = ({
  type,
  onChange,
  initialFiles,
  label,
  id,
  errorMsg,
}) => {
  // Initialize selectedFiles based on type and initialFiles
  const [selectedFiles, setSelectedFiles] = useState<string[]>(() => {
    if (type === "single") {
      return initialFiles ? [initialFiles] : [];
    } else {
      return initialFiles || [];
    }
  });

  // Effect to handle initialFiles changes
  useEffect(() => {
    if (type === "single") {
      setSelectedFiles(initialFiles ? [initialFiles] : []);
    } else {
      setSelectedFiles((initialFiles as string[]) || []);
    }
  }, [initialFiles, type]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: type === "multiple",
    accept: {
      "image/*": [],
    },
    maxFiles: type === "multiple" ? 5 : 1,
    onDrop: (acceptedFiles) => {
      if (type === "single") {
        const newFile = acceptedFiles[0];
        const fileUrl = newFile ? URL.createObjectURL(newFile) : null;
        setSelectedFiles(fileUrl ? [fileUrl] : []);
        onChange(fileUrl);
      } else {
        const updatedUrls = [
          ...selectedFiles,
          ...acceptedFiles.map((file) => URL.createObjectURL(file)),
        ].slice(0, 5);
        setSelectedFiles(updatedUrls);
        onChange(updatedUrls);
      }
    },
  });

  const handleDeleteFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    if (type === "single") {
      onChange(updatedFiles.length > 0 ? updatedFiles[0] : null);
    } else {
      onChange(updatedFiles);
    }
  };

  const renderFilePreviews = () => {
    return selectedFiles.map((url, index) => (
      <div
        key={index}
        className="relative flex flex-col items-center justify-center border p-4 rounded-md shadow-sm mb-2 gap-2
                    border-gray-200 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    transition-colors duration-200"
      >
        <Image
          src={url}
          alt={`Preview ${index}`}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div
          className="absolute top-2 right-2 bg-red-700 dark:bg-red-500 p-1 rounded-full cursor-pointer"
          onClick={() => handleDeleteFile(index)}
        >
          <X className="text-white transition-colors duration-200" />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-full">
          {`Image ${index + 1}`}
        </p>
      </div>
    ));
  };

  const isDropzoneHidden = type === "single" && selectedFiles.length > 0;
  const maxFilesReached = type === "multiple" && selectedFiles.length >= 5;

  return (
    <div className="space-y-4">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">{renderFilePreviews()}</div>
      )}

      {!isDropzoneHidden && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 text-center cursor-pointer rounded-md mt-2 transition-colors duration-200 
            ${
              maxFilesReached
                ? "border-gray-400 bg-gray-100 dark:bg-gray-800 dark:border-gray-600"
                : "border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800"
            }`}
        >
          <input {...getInputProps()} disabled={maxFilesReached} />
          <p
            className={`text-lg ${
              maxFilesReached
                ? "text-gray-500 dark:text-gray-400"
                : "text-blue-500 dark:text-blue-300"
            }`}
          >
            {type === "single"
              ? "Drag & drop an image here, or click to select one"
              : maxFilesReached
              ? "Maximum of 5 images reached"
              : `Drag & drop images here, or click to select (${selectedFiles.length}/5)`}
          </p>
        </div>
      )}

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
};
