"use client";

import { useDropzone } from "react-dropzone";
import PickedImage from "./PickedImage";

type SingleImagePickerProps = {
  onChange: (url: File) => void;
  onRemove: VoidFunction;
  value: string | File;
  label: string;
  errorMsg?: string;
  id: string;
};

export default function SingleImagePicker({
  label,
  onChange,
  errorMsg,
  onRemove,
  id,
  value,
}: SingleImagePickerProps) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (files: File[]) => onChange(files?.[0]),
  });

  const isDropzoneHidden = !!value;

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
      {!!value && <PickedImage image={value} onDeleteClick={onRemove} />}

      {!isDropzoneHidden && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 text-center cursor-pointer rounded-md mt-2 transition-colors duration-200 
       `}
        >
          <input {...getInputProps()} />
          <p className={`text-lg`}>
            Drag & drop an image here, or click to select one
          </p>
        </div>
      )}

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
}
