import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    return { error: error.message }
  }

  redirect('/')
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    return { error: error.message }
  }

  return { user }
}

export async function updateUserProfile(userId: string, profile: {
  full_name?: string
  avatar_url?: string
}) {
  const supabase = await createClient()
  
  // Update auth.users metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: profile
  })

  if (authError) {
    return { error: authError.message }
  }

  // Update public.users profile
  const { error: profileError } = await supabase
    .from('users')
    .upsert({
      id: userId,
      ...profile,
      updated_at: new Date().toISOString()
    })

  if (profileError) {
    return { error: profileError.message }
  }

  return { success: true }
}

export async function createUserProfile(user: {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('users')
    .upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name,
      avatar_url: user.user_metadata?.avatar_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
} 