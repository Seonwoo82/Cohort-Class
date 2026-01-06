'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const LeadSchema = z.object({
    name: z.string().min(1, "이름을 입력해주세요."),
    phone: z.string().min(1, "연락처를 입력해주세요."),
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
    course_title: z.string().optional(),
    expected_price: z.string().optional(),
    expected_students: z.string().optional(),
})

export type LeadFormState = {
    success?: boolean
    error?: string
    fieldErrors?: {
        [key: string]: string[]
    }
}

export async function submitLead(prevState: LeadFormState, formData: FormData): Promise<LeadFormState> {
    const rawData = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        course_title: formData.get('course_title') as string,
        expected_price: formData.get('expected_price') as string,
        expected_students: formData.get('expected_students') as string,
    }

    // Validate data
    const validatedFields = LeadSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            error: '입력 내용을 확인해주세요.',
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const supabase = await createClient()

    try {
        const { error } = await supabase
            .from('instructor_leads')
            .insert([rawData])

        if (error) {
            console.error('Supabase Insert Error:', error)
            return { error: '데이터 저장 중 오류가 발생했습니다.' }
        }

        return { success: true }
    } catch (err) {
        console.error('Server Action Error:', err)
        return { error: '서버 오류가 발생했습니다.' }
    }
}
