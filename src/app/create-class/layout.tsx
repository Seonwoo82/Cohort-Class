import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '사이트 개설하기 - 버티컬러닝',
  description: '나만의 온라인 비즈니스 사이트, 라이브클래스를 개설해보세요',
}

export default function CreateClassLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 