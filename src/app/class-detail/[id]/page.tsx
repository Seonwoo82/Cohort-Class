import { getClassById, getRelatedClasses } from '@/actions/class'

export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import ClassDetailClient from '@/app/class-detail/[id]/ClassDetailClient'

export default async function ClassDetailPage({ params }: { params: { id: string } }) {
  const { classData, error: classError } = await getClassById(params.id)

  if (classError) {
    return <div className="container mx-auto p-8">클래스 정보를 불러올 수 없습니다: {classError}</div>
  }

  if (!classData) {
    return <div className="container mx-auto p-8">클래스를 찾을 수 없습니다.</div>
  }

  const session = await auth.api.getSession({
    headers: headers()
  })

  // Adapt BetterAuth user to the type expected by ClassDetailClient
  // Defaulting role to 'student' since we haven't implemented roles in DB yet
  const user = session?.user ? {
    ...session.user,
    role: 'student' as const
  } : null

  // 관련 클래스 정보 가져오기 (동일한 강사의 다른 클래스)
  const { relatedClasses = [] } = await getRelatedClasses(classData.lecturer, params.id)

  return (
    <ClassDetailClient
      classData={classData}
      user={user}
      relatedClasses={relatedClasses}
      classId={params.id}
    />
  )
}
