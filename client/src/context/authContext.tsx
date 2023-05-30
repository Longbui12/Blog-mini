import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  children: JSX.Element;
};
interface user {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface AuthContextValue {
  currentUser: user | null;
  login: (inputs: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  const [currentUser, setCurrentUser] = useState<user | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const login = async (inputs: any) => {
    const res = await axios.post(
      "http://localhost:4004/api/auth/login",
      inputs
    );
    setCurrentUser(res.data);
    console.log(setCurrentUser);
  };

  const logout = async () => {
    await axios.post("http://localhost:4004/api/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
