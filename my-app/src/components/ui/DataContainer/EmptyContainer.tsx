import { Inbox } from "lucide-react";
import { FC } from "react";

interface EmptyContainerProps {
  emptyMsg?: string;
}

export const EmptyContainer: FC<EmptyContainerProps> = ({
  emptyMsg = "No data available.",
}) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center py-12">
      <Inbox className="w-10 h-10 mb-4 opacity-50" />
      <p className="text-lg font-medium">{emptyMsg}</p>
    </div>
  );
};
