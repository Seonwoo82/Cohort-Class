import { createClient } from '@/lib/supabase/server'

export async function enrollInClass(userId: string, classId: string) {
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