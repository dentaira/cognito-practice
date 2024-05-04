import { Amplify } from "aws-amplify";
// fetchAuthSessionの使い所は？
import {
  getCurrentUser,
  signUp,
  confirmSignUp,
  signIn,
  signOut,
} from "aws-amplify/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import Auth from "../aws-config/auth";

Amplify.configure({
  Auth: {
    Cognito: Auth,
  },
});

interface UseAuth {
  isLoading: boolean;
  isAuthenticated: boolean;
  username: string;
  signUp: (username: string, password: string) => Promise<Result>;
  confirmSignUp: (verificationCode: string) => Promise<Result>;
  signIn: (username: string, password: string) => Promise<Result>;
  signOut: () => void;
}

interface Result {
  success: boolean;
  message: string;
}

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then((result) => {
        setUsername(result.username);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setUsername("");
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  const signUpFunc = async (username: string, password: string) => {
    try {
      await signUp({ username, password });
      setUsername(username);
      setPassword(password);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "認証に失敗しました。",
      };
    }
  };

  const confirmSignUpFunc = async (confirmationCode: string) => {
    try {
      await confirmSignUp({ username, confirmationCode });
      const result = await signInFunc(username, password);
      setPassword("");
      return result;
    } catch (error) {
      return {
        success: false,
        message: "認証に失敗しました。",
      };
    }
  };

  const signInFunc = async (username: string, password: string) => {
    try {
      await signIn({ username, password });
      setUsername(username);
      setIsAuthenticated(true);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "認証に失敗しました。",
      };
    }
  };

  const signOutFunc = async () => {
    try {
      await signOut();
      setUsername("");
      setIsAuthenticated(false);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "ログアウトに失敗しました。",
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    username,
    signUp: signUpFunc,
    confirmSignUp: confirmSignUpFunc,
    signIn: signInFunc,
    signOut: signOutFunc,
  };
};
