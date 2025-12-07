"use client";
import { FC, PropsWithChildren } from "react";
import ReactModal from "react-modal";

interface CustomModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  className?: string;
}

export const Modal: FC<CustomModalProps & PropsWithChildren> = ({
  isOpen,
  onClose,
  children,
  className = "custom-modal",
}) => {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      className={className}
      bodyOpenClassName={"overflow-hidden"}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(6px) saturate(150%)",
          WebkitBackdropFilter: "blur(6px) saturate(150%)",
        },
      }}
    >
      {children}
    </ReactModal>
  );
};
