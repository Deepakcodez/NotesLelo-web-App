import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useToken } from "./Token";

export const useAuth = () => {
  const [userDetail, setUserDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { token } = useToken();

  // Memoize the authentication function to prevent unnecessary re-creations
  const isAuthenticated = useCallback(async () => {
    try {
      if (!token) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      const url = import.meta.env.VITE_BASE_URL as string;
      const response = await axios.get(
        `${url}/api/v1/user/isVarify`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      setUserDetail(response.data.data);
      setIsLoading(false);

      if (!response.data) {
        setIsError(true);
      }
    } catch (error: any) {
      console.error("Error in isAuthenticated:", error);
      setIsLoading(false);
      setIsError(true);
    }
  }, [token]); // Only recreate this function when `token` changes

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]); // Use the memoized `isAuthenticated`

  // Memoize the return values to prevent unnecessary re-renders
  return useMemo(
    () => ({ userDetail, isLoading, isError }),
    [userDetail, isLoading, isError]
  );
};
