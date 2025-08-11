'use server'

import { createClient } from '@/lib/supabase/server'

export async function getCurrentUser() {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return { error: error.message }
    }

    return { user }
  } catch (err) {
    console.error('사용자 정보 조회 오류:', err)
    return { error: '사용자 정보를 조회하는 데 실패했습니다.' }
  }
}

export async function updateUserProfile(userId: string, profile: {
  full_name?: string
  avatar_url?: string
}) {
  const supabase = await createClient()
  
  try {
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
  } catch (err) {
    console.error('프로필 업데이트 오류:', err)
    return { error: '프로필 업데이트 중 오류가 발생했습니다.' }
  }
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
  
  try {
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
  } catch (err) {
    console.error('사용자 프로필 생성 오류:', err)
    return { error: '사용자 프로필 생성 중 오류가 발생했습니다.' }
  }
}

// 인증 오류 메시지 번역 함수
function translateAuthError(errorMessage: string): string {
  const errorMap: Record<string, string> = {
    'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
    'Email not confirmed': '이메일 확인이 완료되지 않았습니다. 받은편지함을 확인해주세요.',
    'Email already in use': '이미 사용 중인 이메일입니다.',
    'Password should be at least 6 characters': '비밀번호는 최소 6자 이상이어야 합니다.',
    'User already registered': '이미 등록된 사용자입니다.',
    // 추가 오류 메시지
  }
  
  return errorMap[errorMessage] || errorMessage
} 