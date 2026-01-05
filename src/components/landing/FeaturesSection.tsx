'use client'

import { motion } from 'framer-motion'
import { Rocket, LayoutDashboard, Mail, Users, Zap, ShieldCheck } from 'lucide-react'

const features = [
    {
        icon: <Rocket className="h-8 w-8 text-primary" />,
        title: "1분 만에 사이트 개설",
        description: "복잡한 코딩 없이 클릭 몇 번으로 나만의 전문적인 교육 사이트를 만들 수 있습니다."
    },
    {
        icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
        title: "올인원 대시보드",
        description: "수강생 현황, 매출, 클래스 관리를 한 눈에 파악할 수 있는 직관적인 대시보드를 제공합니다."
    },
    {
        icon: <Mail className="h-8 w-8 text-primary" />,
        title: "자동화된 알림",
        description: "수강 신청 완료, 수업 시작 알림 등 번거로운 이메일 발송을 자동으로 처리해드립니다."
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "체계적인 수강생 관리",
        description: "기수별(Cohort) 운영에 최적화된 관리 도구로 수강생들의 참여율을 높이세요."
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "즉시 수익화",
        description: "PG사 심사 없이 바로 결제를 받을 수 있는 시스템이 연동되어 있습니다."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "안정적인 서버",
        description: "트래픽이 몰려도 걱정 없는 클라우드 인프라로 365일 안정적인 서비스를 보장합니다."
    }
]

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        강의 운영의 모든 고민을<br />
                        <span className="text-primary">한 번에 해결해드립니다</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-[700px] mx-auto">
                        더 이상 엑셀과 수동 이메일에 시간을 낭비하지 마세요. 오직 콘텐츠에만 집중하세요.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
