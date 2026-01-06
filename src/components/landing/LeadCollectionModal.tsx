'use client'

import { useState, useRef, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea' // Assuming textarea is available or use Input
import { submitLead } from '@/actions/lead'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

// Submit Button Component locally
function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mt-4" disabled={pending}>
            {pending ? '제출 중...' : '무료 상담 신청하기'}
        </Button>
    )
}

export function LeadCollectionModal({
    triggerText = "무료로 시작하기",
    variant = "primary",
    className = "",
    children
}: {
    triggerText?: string
    variant?: "primary" | "secondary"
    className?: string
    children?: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const [state, formAction] = useFormState(submitLead, {})
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success) {
            // Do not close immediately, show success message
        }
    }, [state])

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (!newOpen && state.success) {
            // Reset form on close if needed, but state is immutable here easily. 
            // Just keep it simple.
        }
    }

    // Trigger Button Style - Use children if provided, otherwise default buttons
    const triggerContent = children ? children : (
        variant === "primary" ? (
            <Button size="lg" className={`text-lg px-8 py-6 rounded-full font-bold shadow-lg hover:shadow-xl transition-all h-auto ${className}`}>
                {triggerText}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        ) : (
            <Button size="lg" variant="secondary" className={`text-lg px-8 py-6 rounded-full font-bold shadow-lg hover:shadow-xl transition-all h-auto ${className}`}>
                {triggerText}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        )
    )

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {triggerContent}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white text-black p-0 overflow-hidden rounded-2xl">
                {state.success ? (
                    <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">신청이 완료되었습니다!</h3>
                        <p className="text-gray-600">
                            담당자가 확인 후 빠르게 연락드리겠습니다.<br />
                            조금만 기다려주세요.
                        </p>
                        <Button className="w-full mt-6" onClick={() => setOpen(false)}>
                            닫기
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="p-6 pb-2">
                            <DialogTitle className="text-xl font-bold">강의 개설 무료 상담 신청</DialogTitle>
                            <DialogDescription className="text-gray-500 mt-1">
                                간단한 정보를 입력해주시면 담당자가 <strong>1:1 맞춤 상담</strong>을 도와드립니다.
                            </DialogDescription>
                        </DialogHeader>

                        <form action={formAction} className="p-6 pt-0 space-y-4" ref={formRef}>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">이름 <span className="text-red-500">*</span></Label>
                                <Input id="name" name="name" placeholder="홍길동" required className="bg-gray-50 border-gray-200" />
                                {state.fieldErrors?.name && <p className="text-red-500 text-xs">{state.fieldErrors.name[0]}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">연락처 <span className="text-red-500">*</span></Label>
                                <Input id="phone" name="phone" placeholder="010-1234-5678" required className="bg-gray-50 border-gray-200" />
                                {state.fieldErrors?.phone && <p className="text-red-500 text-xs">{state.fieldErrors.phone[0]}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">이메일 <span className="text-red-500">*</span></Label>
                                <Input id="email" name="email" type="email" placeholder="example@gmail.com" required className="bg-gray-50 border-gray-200" />
                                {state.fieldErrors?.email && <p className="text-red-500 text-xs">{state.fieldErrors.email[0]}</p>}
                            </div>

                            <div className="space-y-2 pt-2 border-t mt-2">
                                <p className="text-sm text-gray-500 font-medium mb-2">추가 정보 (선택 사항)</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="course_title" className="text-xs text-gray-500">강의 주제/제목</Label>
                                        <Input id="course_title" name="course_title" placeholder="예: 스마트스토어 창업" className="bg-gray-50 border-gray-200 h-9" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="expected_price" className="text-xs text-gray-500">예상 강의료</Label>
                                        <Input id="expected_price" name="expected_price" placeholder="예: 30만원 / 무료" className="bg-gray-50 border-gray-200 h-9" />
                                    </div>
                                </div>
                                <div className="space-y-1 mt-2">
                                    <Label htmlFor="expected_students" className="text-xs text-gray-500">예상 수강생 수</Label>
                                    <Input id="expected_students" name="expected_students" placeholder="예: 30명, 50명 등" className="bg-gray-50 border-gray-200 h-9" />
                                </div>
                            </div>

                            {state.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}

                            <SubmitButton />

                            <p className="text-xs text-gray-400 text-center mt-2">
                                제출 시 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
                            </p>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
