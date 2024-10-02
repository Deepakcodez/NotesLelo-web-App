import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "./Token";

export const useAuth = () => {
  const [userDetail, setUserDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const[isError,setIsError] = useState<boolean>(false)
  const {token} = useToken();


  const isAuthenticated = async () => {
    try {
      if (!token) {
        console.log('>>>>>>>>>>>no token', token)
        setIsError(true)
        setIsLoading(false)
        return;
      }
      const response = await axios.get(
        "https://notes-lelo-app-backend.vercel.app/api/v1/user/isVarify",
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
          setIsError(true)
      }
    } catch (error:any) {
      console.error("Error in isAuthenticated:", error);
      setIsLoading(false);
      setIsError(true)
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, [token]);

  return { userDetail, isLoading, isError };
};
