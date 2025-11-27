import { AxiosError } from "axios";
import { axiosInstance } from "./apiHelpers";
import { toast } from "sonner";

export type MethodType =
  | "get"
  | "post"
  | "delete"
  | "patch"
  | "put"
  | "head"
  | "options";

export type ConfigType = {
  url: string;
  method: MethodType;
  data?: unknown;
  params?: {
    page?: number;
    limit?: number;
    [key: string]: unknown;
  };
  config?: {
    showToast?: boolean;
  };
};

export const requestAPI = async <T>(
  config: ConfigType
): Promise<T | undefined> => {
  console.log(axiosInstance);
  try {
    const result = await axiosInstance(config);
    return result?.data?.data || result?.data || result;
  } catch (error: unknown) {
    // Handle network errors
    if (error instanceof AxiosError) {
      if (!error.response) {
        toast.error("Network Error:Please check your internet connection!");
        throw new Error("Network Error");
      }
      // Handle HTTP errors
      const status = error.response.status;
      let message = "";

      if (status === 401) {
        console.log("ERROR--------401");
      } else if (status >= 400 && status < 500) {
        message =
          error.response.data.message || error.message || "Client Error";
      } else if (status >= 500) {
        message =
          error.response.data.message || error.message || "Server Error";
      }

      // Show alert if showToast is true
      if (config?.config?.showToast) {
        toast.error(message);
      }

      // Rethrow the error
      throw new Error(message || "On request something went wrong.");
    }
  }
};
