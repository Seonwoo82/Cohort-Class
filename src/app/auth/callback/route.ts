import { createClient } from '@/lib/supabase/server'
import { createUserProfile } from '@/actions/auth'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get user data after successful authentication
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Create or update user profile
        const { error: profileError } = await createUserProfile(user)
        
        if (profileError) {
          console.error('Error creating user profile:', profileError)
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
} 