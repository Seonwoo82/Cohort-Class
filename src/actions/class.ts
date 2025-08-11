'use server'

import { createClient } from '@/lib/supabase/server'
import type { Database } from "@/types/supabase"

type ClassType = Database["public"]["Tables"]["class"]["Row"]

export async function getClasses() {
  const supabase = await createClient()
  const { data: classes, error } = await supabase.from('class').select('*')
  
  if (error) {
    return { error: error.message }
  }
  
  return { classes }
}

export async function getClassById(id: string) {
  const supabase = await createClient()
  const { data: classData, error } = await supabase
    .from('class')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    return { error: error.message }
  }
  
  return { classData }
}

export async function getRelatedClasses(lecturer: string, currentClassId: string) {
  const supabase = await createClient()
  const { data: relatedClasses, error } = await supabase
    .from('class')
    .select('*')
    .eq('lecturer', lecturer)
    .neq('id', currentClassId)
    .limit(2)
  
  if (error) {
    return { error: error.message }
  }
  
  return { relatedClasses }
}

export async function enrollInClass(studentId: string, classId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('enrollment')
    .insert([
      { student_id: studentId, class_id: classId }
    ])
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // 수강 인원 업데이트
  const { data: classData } = await supabase
    .from('class')
    .select('students_total')
    .eq('id', classId)
    .single()
    
  if (classData) {
    const newTotal = (classData.students_total || 0) + 1
    await supabase
      .from('class')
      .update({ students_total: newTotal })
      .eq('id', classId)
  }

  return { enrollment: data }
}

export async function checkEnrollment(userId: string, classId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('enrollment')
    .select('*')
    .eq('student_id', userId)
    .eq('class_id', classId)
    .single()
  
  if (error && error.code !== 'PGRST116') {
    return { error: error.message }
  }
  
  return { isEnrolled: !!data }
}

export async function closeClass(classId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('class')
    .update({ students_max: 0 })
    .eq('id', classId)
    
  if (error) {
    return { error: error.message }
  }
  
  return { success: true }
}

export async function updateClass(
  classId: string, 
  classData: {
    title?: string
    price?: number
    start_date?: string
    end_date?: string
    lecturer?: string
    students_max?: number
    thumbnail_img?: string
    detail_img?: string
    detail_text?: string
  }
) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('class')
    .update(classData)
    .eq('id', classId)
    
  if (error) {
    return { error: error.message }
  }
  
  return { success: true }
} 