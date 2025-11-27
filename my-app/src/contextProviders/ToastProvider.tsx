"use client";

import { Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
