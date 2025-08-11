'use client'

import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

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
  signOut: async () => {},
  refreshSession: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // 사용자 세션 새로고침
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('세션 조회 오류:', error.message)
        return
      }

      setSession(data.session)
      setUser(data.session?.user || null)
    } catch (error) {
      console.error('세션 새로고침 오류:', error)
    }
  }

  // 로그아웃 함수
  const signOut = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('로그아웃 오류:', error.message)
        return
      }

      setUser(null)
      setSession(null)
      router.push('/login')
    } catch (error) {
      console.error('로그아웃 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 초기 세션 로드 및 인증 상태 변경 감지
  useEffect(() => {
    setIsLoading(true)

    // 초기 세션 로드
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('초기 세션 로드 오류:', error.message)
          return
        }

        setSession(data.session)
        setUser(data.session?.user || null)
      } catch (error) {
        console.error('인증 초기화 오류:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user || null)
        setIsLoading(false)
      }
    )

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const value = {
    user,
    session,
    isLoading,
    signOut,
    refreshSession,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 