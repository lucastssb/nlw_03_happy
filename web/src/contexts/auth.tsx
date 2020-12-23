import React, { createContext, FormEvent, useState, useEffect } from "react";

import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(event: FormEvent, email: string, password: string, remember: boolean): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!user || (!!sessionStorage.getItem('token_happy_temp') || !! localStorage.getItem('token_happy')));
  },[isSignedIn, user])

  async function signIn(event: FormEvent, email: string, password: string, remember: boolean) {
    event.preventDefault();


    const response = await api.post("auth/login", {
      email: email,
      password: password,
    });

    if(remember) {
      localStorage.setItem('token_happy', response.data.token);
    }else {
      sessionStorage.setItem('token_happy_temp', response.data.token);
    }

    setUser(response.data.user);
  };

  function signOut() {
    setUser(null);
    localStorage.removeItem('token_happy');
    sessionStorage.removeItem('token_happy_temp');
  }

  return (
    <AuthContext.Provider value={{ signed: isSignedIn, user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
