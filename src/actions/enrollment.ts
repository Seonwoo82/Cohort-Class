'use server'

import { createClient } from '@/lib/supabase/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function enrollInClass(userId: string, classId: string) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session || session.user.id !== userId) return { error: 'Unauthorized' }
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('enrollments')
    .insert([
      { user_id: userId, class_id: classId }
    ])
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  return { enrollment: data }
}

export async function getEnrollmentsByUser(userId: string) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session || session.user.id !== userId) return { error: 'Unauthorized' }
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      classes (*)
    `)
    .eq('user_id', userId)

  if (error) {
    return { error: error.message }
  }

  return { enrollments: data }
}

export async function getEnrollmentsByClass(classId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      users (*)
    `)
    .eq('class_id', classId)

  if (error) {
    return { error: error.message }
  }

  return { enrollments: data }
} 