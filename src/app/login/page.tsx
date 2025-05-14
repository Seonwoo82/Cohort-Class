import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: '로그인 - 버티컬러닝',
  description: '버티컬러닝에 로그인하세요',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="버티컬러닝"
            width={200}
            height={50}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            로그인
          </h2>
        </div>
        <LoginForm />
        <div className="text-center text-sm">
          <span className="text-gray-500">아직 계정이 없으신가요?</span>{' '}
          <Link href="/signup" className="text-blue-600 hover:text-blue-500">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  )
} 