'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CreateClassPage() {
  const [serviceName, setServiceName] = useState('')
  const [siteAddress, setSiteAddress] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // 여기에 사이트 생성 API 호출 로직 구현
      // const response = await fetch('/api/create-site', {...})

      // 성공 시 대시보드로 리디렉션
      router.push('/dashboard')
    } catch (err) {
      setError('사이트 생성 중 오류가 발생했습니다. 다시 시도해주세요.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-2xl font-bold text-gray-900">사이트 개설하기</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">서비스명</label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="회사명 또는 서비스명을 입력해 주세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">내 라이브클래스 주소</label>
              <div className="flex">
                <input
                  type="text"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder=""
                  required
                />
                <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md">
                  .cohortclass.com
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">추천인 코드 (선택)</label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="추천인으로부터 받은 코드를 입력해 주세요"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isLoading ? '사이트 생성중...' : '사이트 만들기'}
            </button>
          </form>
        </div>
      </div>

      {/* 오른쪽 섹션: 설명 & 일러스트레이션 */}
      <div className="w-full md:w-1/2 bg-blue-100 flex flex-col items-center justify-center p-8 md:p-16">
        <div className="max-w-lg text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            모든 지식을 비즈니스로 바꿔보세요
          </h2>
          <p className="text-xl text-gray-700">
            나만의 온라인 비즈니스 사이트, 코호트클래스
          </p>
        </div>

        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/images/professional-education-business.png"
            alt="비즈니스 일러스트레이션"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
} 