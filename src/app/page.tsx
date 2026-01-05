import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { ProblemSolutionSection } from '@/components/landing/ProblemSolutionSection'
import { SocialProofSection } from '@/components/landing/SocialProofSection'
import { CTASection } from '@/components/landing/CTASection'

export const metadata: Metadata = {
  title: '코호트 클래스 - 1분 만에 시작하는 나만의 지식 비즈니스',
  description: '개발 지식 없이도 누구나 쉽게 강의 사이트를 개설하고 수익화할 수 있습니다. 100명 이상의 전문가가 선택한 코호트 클래스.',
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <ProblemSolutionSection />
      <SocialProofSection />
      <CTASection />
    </main>
  )
}