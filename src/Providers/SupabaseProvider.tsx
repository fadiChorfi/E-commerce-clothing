"use client";
import supabase from "@/supabase/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  session: any;
  signUpNewUser: (
    full_name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: any; error?: any }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: any; error?: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: undefined,
  signUpNewUser: async () => ({ success: false, error: null }),
  signIn: async () => ({ success: false, error: null }),
  signOut: async () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {


  const [session, setSession] = useState<any>(undefined);

  const signUpNewUser = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      alert(error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, signUpNewUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
