'use server'

import { createClient } from '@/lib/supabase/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function uploadFile(file: File, path: string) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) return { error: 'Unauthorized' }
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from('public')
    .upload(path, file)

  if (error) {
    return { error: error.message }
  }

  // Get public URL for the uploaded file
  const { data: { publicUrl } } = supabase.storage
    .from('public')
    .getPublicUrl(data.path)

  return { url: publicUrl }
}

export async function deleteFile(path: string) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) return { error: 'Unauthorized' }
  const supabase = await createClient()

  const { error } = await supabase.storage
    .from('public')
    .remove([path])

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updateFile(file: File, oldPath: string, newPath: string) {
  const supabase = await createClient()

  // Delete old file if it exists
  await deleteFile(oldPath)

  // Upload new file
  return await uploadFile(file, newPath)
} 