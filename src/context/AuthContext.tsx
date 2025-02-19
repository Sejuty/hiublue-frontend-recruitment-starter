"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [rememberedEmail, setRememberedEmail] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<void> => {
    try {
      const response = await fetch("https://dummy-1.hiublue.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { token, user } = await response.json();

      const tokenExpiration = rememberMe ? 7 : 1;
      Cookies.set("token", token, {
        expires: tokenExpiration,
        secure: true,
        sameSite: "strict",
      });

      if (rememberMe) {
        Cookies.set("rememberedEmail", email, {
          expires: 30,
          secure: true,
          sameSite: "strict",
        });
        setRememberedEmail(email);
      } else {
        Cookies.remove("rememberedEmail");
        setRememberedEmail(null);
      }
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  
  useEffect(() => {
    const savedEmail = Cookies.get("rememberedEmail");
    if (savedEmail) {
      setRememberedEmail(savedEmail);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        rememberedEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
