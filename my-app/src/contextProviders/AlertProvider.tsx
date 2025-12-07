"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";

type AlertVariant1Type = {
  variant: "single button";
  btn1Text: string;
  onBtn1Click: VoidFunction;
  btn1ClassName?: string;
};

type AlertVariant2Type = {
  variant: "two buttons";
  btn1Text: string;
  btn1ClassName?: string;
  btn2ClassName?: string;
  onBtn1Click: VoidFunction;
  btn2Text: string;
  onBtn2Click: VoidFunction;
};

type UnionType = AlertVariant1Type | AlertVariant2Type;

type AlertOptions = UnionType & {
  onClose?: VoidFunction;
  title: string;
  description?: string;
};

type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
  closeAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);

  const showAlert = (opts: AlertOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
    if (options?.onClose) {
      options.onClose();
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      closeAlert();
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}

      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeAlert}
            className="absolute right-4 top-4 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {options?.title || "Are you sure?"}
            </AlertDialogTitle>
            {options?.description && (
              <AlertDialogDescription>
                {options.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter>
            {options?.variant === "single button" ? (
              <AlertDialogAction
                className={options?.btn1ClassName}
                onClick={() => {
                  options.onBtn1Click();
                  closeAlert();
                }}
              >
                {options.btn1Text}
              </AlertDialogAction>
            ) : options?.variant === "two buttons" ? (
              <>
                <AlertDialogAction
                  className={options?.btn1ClassName}
                  onClick={() => {
                    options.onBtn1Click();
                    closeAlert();
                  }}
                >
                  {options.btn1Text}
                </AlertDialogAction>

                <AlertDialogAction
                  className={options?.btn2ClassName}
                  onClick={() => {
                    options.onBtn2Click();
                    closeAlert();
                  }}
                >
                  {options.btn2Text}
                </AlertDialogAction>
              </>
            ) : null}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used inside AlertProvider");
  return context;
};
