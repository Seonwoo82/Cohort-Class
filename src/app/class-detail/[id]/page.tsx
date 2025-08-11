import { getClassById, getRelatedClasses } from '@/actions/class'
import { getCurrentUser } from '@/app/auth/actions'
import ClassDetailClient from '@/app/class-detail/[id]/ClassDetailClient'

export default async function ClassDetailPage({ params }: { params: { id: string } }) {
  const { classData, error: classError } = await getClassById(params.id)
  
  if (classError) {
    return <div className="container mx-auto p-8">클래스 정보를 불러올 수 없습니다: {classError}</div>
  }

  if (!classData) {
    return <div className="container mx-auto p-8">클래스를 찾을 수 없습니다.</div>
  }

  const { user, error: userError } = await getCurrentUser()
  
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