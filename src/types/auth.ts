import type { User, Session } from '@supabase/supabase-js'

export type AuthResult = {
  user?: User | null
  error?: string
  redirectTo?: string
  success?: boolean
}

export type AuthState = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
} 