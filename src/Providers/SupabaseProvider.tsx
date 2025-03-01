"use client"
import { createClient } from "@supabase/supabase-js"
import { type ReactNode, createContext, useContext, useEffect, useState } from "react"
import type { Session, User, AuthError } from "@supabase/supabase-js"

// Assuming you have a client setup like this
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

type AuthContextType = {
  session: Session | null
  user: User | null
  signUpNewUser: (
    full_name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; data?: Session | null; error?: AuthError | null }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; data?: Session | null; error?: AuthError | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signUpNewUser: async () => ({ success: false, error: null }),
  signIn: async () => ({ success: false, error: null }),
  signOut: async () => {},
})

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const signUpNewUser = async (fullName: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      alert(error.message)
      return { success: false, error }
    }

    return { success: true, data: data.session }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data: data.session }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error.message)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, user, signUpNewUser, signIn, signOut }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

