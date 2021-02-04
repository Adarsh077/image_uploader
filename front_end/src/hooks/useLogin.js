import { useState, useEffect } from "react";

const useLogin = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return { token };
};

export default useLogin;
