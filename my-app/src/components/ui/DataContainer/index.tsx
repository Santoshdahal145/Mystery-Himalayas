import { ReactNode } from "react";
import { EmptyContainer } from "./EmptyContainer";
import { ErrorContainer } from "./ErrorContainer";
import { Loader } from "./Loader";

interface DataContainerProps<T extends Record<string, any>> {
  data: T[];
  renderItem: (item: T, index: number, data: T[]) => ReactNode;
  error?: string;
  loading?: boolean;
  refetch?: () => void;
  loadingMsg?: string;
  containerClassName?: string;
  isFetchingNextPage?: boolean;
  emptyContainerComponent?: ReactNode;
}

export const DataContainer = <T extends Record<string, any>>({
  data,
  renderItem,
  error,
  loading = false,
  refetch,
  loadingMsg = "Loading...",
  containerClassName = "",
  isFetchingNextPage,
  emptyContainerComponent,
}: DataContainerProps<T>) => {
  if (loading) return <Loader loading={loading} msg={loadingMsg} />;
  if (error)
    return (
      <ErrorContainer
        errorMsg={error}
        refetchFunction={() => {
          refetch?.();
        }}
      />
    );

  if (!data?.length) {
    if (emptyContainerComponent) {
      return <>{emptyContainerComponent}</>;
    } else {
      return <EmptyContainer />;
    }
  }

  return (
    <>
      <div className={containerClassName}>
        {data.map((item, index) => renderItem(item, index, data))}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading More...
          </span>
        </div>
      )}
    </>
  );
};
