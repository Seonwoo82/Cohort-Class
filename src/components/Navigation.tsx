'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Bell, Menu, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { LogoutButton } from './login/logout-button'

// User 타입 정의
// type User = {
//   id: string
//   email?: string
//   name?: string
// }

export default function Navigation() {
  // const [user, setUser] = useState<User | null>(null)
  // const [error, setError] = useState<string | null>(null)

  const { user, signOut: useAuthSignOut, isLoading } = useAuth()

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { user, error } = await getCurrentUser()
  //     if (error) {
  //       setError(error)
  //     } else if (user) {
  //       setUser(user as User)
  //     }
  //   }
  //   fetchUser()
  // }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      {user ? (
        <div className="container flex h-16 items-center justify-between py-4">
          {/* 좌측: 로고 */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-primary">
              <span className="flex items-center gap-2">
                <Image src="/logo.svg" alt="버티컬러닝" width={140} height={56} />
              </span>
            </Link>
          </div>
          {/* 중앙: 메뉴 */}
          <nav className="hidden md:flex gap-8 text-base font-semibold">
            <Link href="/" className="hover:text-primary transition-colors">무료특강</Link>
            <Link href="/premium" className="hover:text-primary transition-colors">프리미엄 강의</Link>
            <Link href="/my-page" className="hover:text-primary transition-colors">나의 강의실</Link>
            <Link href="/instructor" className="hover:text-primary transition-colors">강사 지원</Link>
          </nav>
          {/* 우측: 알림, 마이페이지, 사이트 관리 */}
          <div className="flex items-center gap-3">
            <>
              <Button variant="ghost" size="icon" aria-label="알림">
                <Bell className="h-5 w-5" />
              </Button>
              <Link href="/my-page">
                <Button variant="ghost" size="icon" aria-label="마이페이지">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/admin/class-list">
                <Button variant="outline" size="sm" className="font-bold">사이트 관리</Button>
              </Link>
              {!isLoading && (
                <LogoutButton />
              )}
            </>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-6">
          <div>
            <Link href="/">
              <Image src="/images/cohortclass-logo.svg" alt="버티컬러닝 로고" width={120} height={30} priority />
            </Link>
          </div>
          <div className="hidden md:flex gap-9 items-center">
            <nav className="flex items-center gap-9">
              <Link href="#features" className="font-bold text-black text-base hover:text-primary transition-colors">
                주요 기능
              </Link>
              <Link href="#services" className="font-bold text-black text-base hover:text-primary transition-colors">
                서비스
              </Link>
              <Link href="#pricing" className="font-bold text-black text-base hover:text-primary transition-colors">
                가격안내
              </Link>
              <Link href="#support" className="font-bold text-black text-base hover:text-primary transition-colors">
                고객지원
              </Link>
            </nav>
            <Link href="/auth/login">
              <Button
                className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6 py-3"
              >
                무료로 시작하기
              </Button>
            </Link>
          </div>
          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="메뉴 열기">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
} 