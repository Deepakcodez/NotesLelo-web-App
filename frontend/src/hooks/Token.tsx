import { useState, useEffect } from "react";

export const useToken = () => {
  // Initialize token directly from localStorage
  const [token, setToken] = useState<string | null>(localStorage.getItem("useDataToken"));

  useEffect(() => {
    const storedToken = localStorage.getItem("useDataToken");
    // Update the token if it has changed
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const saveToken = (newToken: string) => {
    localStorage.setItem("useDataToken", newToken);
    setToken(newToken); // update state after saving the token
  };

  const removeToken = () => {
    localStorage.removeItem("useDataToken");
    setToken(null); // update state after removing the token
  };

  return { token, saveToken, removeToken };
};
