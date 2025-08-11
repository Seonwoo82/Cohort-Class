'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { updateClass } from '@/actions/class'

// 클래스 타입 정의
type Class = {
  id: string
  title: string
  price: number
  start_date: string
  end_date: string
  rating: number
  likes: number
  thumbnail_img: string
  detail_img: string
  detail_text: string
  lecturer: string
  students_total: number
  students_max: number
  manager_id: string
}

type UpdateClassFormProps = {
  classData: Class
  classId: string
}

export default function UpdateClassForm({ classData, classId }: UpdateClassFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(classData.title)
  const [price, setPrice] = useState(classData.price)
  const [startDate, setStartDate] = useState(formatDateForInput(classData.start_date))
  const [endDate, setEndDate] = useState(formatDateForInput(classData.end_date))
  const [lecturer, setLecturer] = useState(classData.lecturer)
  const [studentsMax, setStudentsMax] = useState(classData.students_max)
  const [thumbnailImg, setThumbnailImg] = useState(classData.thumbnail_img || '')
  const [detailImg, setDetailImg] = useState(classData.detail_img || '')
  const [detailText, setDetailText] = useState(classData.detail_text || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // 날짜 포맷 변환 함수 (ISO 문자열 -> input 요소용 문자열)
  function formatDateForInput(dateString: string) {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      // YYYY-MM-DDTHH:MM 형식으로 변환
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    } catch (e) {
      return ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      // 날짜 문자열을 ISO 형식으로 변환
      const formattedStartDate = new Date(startDate).toISOString()
      const formattedEndDate = new Date(endDate).toISOString()
      
      const updatedClassData = {
        title,
        price: Number(price),
        start_date: formattedStartDate, 
        end_date: formattedEndDate,
        lecturer,
        students_max: Number(studentsMax),
        thumbnail_img: thumbnailImg,
        detail_img: detailImg,
        detail_text: detailText
      }
      
      const { error } = await updateClass(classId, updatedClassData)
      
      if (error) {
        setError(error)
        setIsLoading(false)
        return
      }
      
      setSuccessMessage('클래스가 성공적으로 업데이트되었습니다.')
      setTimeout(() => {
        router.push(`/class-detail/${classId}`)
      }, 1500)
    } catch (err) {
      setError('클래스 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push(`/class-detail/${classId}`)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* 왼쪽 섹션: 폼 */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-12">
            <Image 
              src="/images/cohortclass-logo.svg" 
              alt="버티컬러닝 로고" 
              width={120} 
              height={40}
              priority
            />
          </div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
              <div className="w-16 h-1 bg-blue-300 rounded"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">클래스 수정</h1>
          </div>
          
          {successMessage && (
            <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6 text-center">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">클래스 제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="클래스 제목을 입력해주세요"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">가격</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="가격을 입력해주세요 (무료인 경우 0)"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">강사명</label>
              <input
                type="text"
                value={lecturer}
                onChange={(e) => setLecturer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="강사 이름을 입력해주세요"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">최대 수강생 수</label>
              <input
                type="number"
                value={studentsMax}
                onChange={(e) => setStudentsMax(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="최대 수강생 수를 입력해주세요"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">썸네일 이미지 URL</label>
              <input
                type="text"
                value={thumbnailImg}
                onChange={(e) => setThumbnailImg(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="썸네일 이미지 URL을 입력해주세요"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상세 이미지 URL</label>
              <input
                type="text"
                value={detailImg}
                onChange={(e) => setDetailImg(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="상세 이미지 URL을 입력해주세요"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명</label>
              <textarea
                value={detailText}
                onChange={(e) => setDetailText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="클래스에 대한 상세 설명을 입력해주세요"
                rows={5}
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
              >
                클래스로 돌아가기
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isLoading ? '저장 중...' : '변경사항 저장'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* 오른쪽 섹션: 설명 & 일러스트레이션 */}
      <div className="w-full md:w-1/2 bg-blue-100 flex flex-col items-center justify-center p-8 md:p-16">
        <div className="max-w-lg text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            클래스 정보를 수정합니다
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            클래스 정보를 입력하고 저장 버튼을 눌러주세요
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="font-bold text-gray-800 mb-2">클래스 ID</h3>
            <p className="text-gray-600 mb-4">{classId}</p>
            
            <h3 className="font-bold text-gray-800 mb-2">현재 수강생</h3>
            <p className="text-gray-600">{classData.students_total || 0}명</p>
          </div>
        </div>
        
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/images/main-image.png"
            alt="클래스 관리 일러스트레이션"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
} 