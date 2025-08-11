import { getClassById } from '@/actions/class'
import UpdateClassForm from '@/app/admin/update-class/[id]/UpdateClassForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '클래스 수정 - 버티컬러닝',
  description: '클래스 정보를 수정합니다.',
}

export default async function UpdateClassPage({ params }: { params: { id: string } }) {
  const { classData, error: classError } = await getClassById(params.id)
  
  if (classError) {
    return <div className="container mx-auto p-8">클래스 정보를 불러올 수 없습니다: {classError}</div>
  }

  if (!classData) {
    return <div className="container mx-auto p-8">클래스를 찾을 수 없습니다.</div>
  }

  return (
    <UpdateClassForm 
      classData={classData} 
      classId={params.id}
    />
  )
} 