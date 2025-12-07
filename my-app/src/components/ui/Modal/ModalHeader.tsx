"use client";

import { ReactElement } from "react";
import { X } from "lucide-react";

type ModalType1 = { variant: "only-close-btn"; onClose: VoidFunction };

type ModalType2 = {
  variant: "with-title";
  title: string;
  onClose: VoidFunction;
};

type ModalType3 = { variant: "with-custom-title"; title: ReactElement };

type ModalHeaderProps = ModalType1 | ModalType2 | ModalType3;

export default function ModalHeader(props: ModalHeaderProps) {
  if (props.variant === "only-close-btn") {
    return (
      <div className="flex w-full justify-end">
        <button
          onClick={props.onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  if (props.variant === "with-title") {
    return (
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-semibold">{props.title}</h2>

        <button
          onClick={props.onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return <>{props.title}</>;
}
