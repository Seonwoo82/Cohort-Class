'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-16">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <motion.div
                        className="flex-1 text-center lg:text-left space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                            모든 지식을 비즈니스로,<br />
                            <span className="text-primary">1분 만에 시작하는</span><br />
                            나만의 코호트 클래스
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
                            개발자도, 엑셀도 필요 없습니다. 원클릭으로 사이트를 개설하고 자동화된 수강생 관리를 경험해보세요.
                        </p>
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <Link href="/auth/login">
                                <Button size="lg" className="text-lg px-8 py-6 rounded-full font-bold shadow-lg hover:shadow-xl transition-all h-auto">
                                    무료로 시작하기
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1 relative w-full h-[300px] md:h-[400px] lg:h-[500px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="relative w-full h-full">
                            {/* Main Illustration */}
                            <Image
                                src="/images/landing-page-hero.png"
                                alt="Professional Education Business"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
