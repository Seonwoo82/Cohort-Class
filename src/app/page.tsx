import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import { Menu } from 'lucide-react'

export const metadata: Metadata = {
  title: '버티컬러닝 - 1분만에 완성되는 나만의 강의 플랫폼',
  description: '버티컬러닝에서 쉽고 빠르게 나만의 강의 플랫폼을 만들어보세요.',
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          {/* Text Container */}
          <div className="flex flex-col gap-8 md:gap-16 w-full md:max-w-[571px]">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
              1분만에 완성되는<br />나만의 강의 플랫폼
            </h1>
            <Link href="/auth/login">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white text-lg md:text-2xl font-bold rounded-full px-6 py-3 md:px-8 md:py-4 self-start"
              >
                무료로 시작하기
              </Button>
            </Link>
          </div>

          {/* Main Image */}
          <div className="w-full md:flex-1 mt-8 md:mt-0">
            <div className="relative w-full aspect-[4/3] md:aspect-[4/3]">
              <Image 
                src="/images/main-image.png" 
                alt="강의 플랫폼 대시보드 미리보기" 
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                priority
                className="object-cover rounded-[20px] md:rounded-[40px] shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 