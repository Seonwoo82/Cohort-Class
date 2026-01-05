'use client'

import { createContext, ReactNode, useContext } from 'react'
import { authClient } from '@/lib/auth-client'



export type User = typeof authClient.$Infer.Session.user
export type Session = typeof authClient.$Infer.Session.session

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => { },
  refreshSession: async () => { },
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = authClient.useSession()

  const user = data?.user || null
  const session = data?.session || null

  const refreshSession = async () => {
    // BetterAuth handles session refresh automatically usually, 
    // but we can force fetch session if needed via useSession hook re-execution or client method.
    // For now, this might be a no-op or just strictly unavailable in the same way.
  }

  const signOut = async () => {
    await authClient.signOut()
  }

  const value = {
    user,
    session,
    isLoading: isPending,
    signOut,
    refreshSession,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)