import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { LeadCollectionModal } from '@/components/landing/LeadCollectionModal'

export function CTASection() {
    return (
        <section className="py-24 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    지금 바로 당신의 지식 비즈니스를 시작하세요
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-10 max-w-[600px] mx-auto">
                    초기 비용 0원, 개발 지식 불필요. <br />
                    이미 100명 이상의 전문가들이 코호트 클래스와 함께 성장하고 있습니다.
                </p>
                <LeadCollectionModal triggerText="무료로 사이트 개설하기" variant="secondary" />
            </div>
        </section>
    )
}
