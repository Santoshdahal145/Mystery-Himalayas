import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { Button } from "../button";

interface ErrorContainerProps {
  refetchFunction?: () => void;
  errorMsg: string;
}

export const ErrorContainer: FC<ErrorContainerProps> = ({
  errorMsg,
  refetchFunction,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center py-12">
      <AlertCircle className="w-10 h-10 mb-4 text-red-500 dark:text-red-400" />
      <p className="text-lg font-semibold mb-2">{errorMsg}</p>
      {refetchFunction && <Button name="Retry" onClick={refetchFunction} />}
    </div>
  );
};
