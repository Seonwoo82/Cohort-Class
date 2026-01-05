'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export function ProblemSolutionSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                        왜 <span className="text-primary">코호트 클래스</span>인가요?
                    </h2>
                    <p className="text-lg text-gray-600">
                        기존 방식의 비효율을 완벽하게 개선했습니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Old Way */}
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-500 mb-6 flex items-center">
                            <span className="bg-gray-200 p-1 rounded-md mr-2">
                                <X className="h-5 w-5 text-gray-500" />
                            </span>
                            기존 방식
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start text-gray-500">
                                <X className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
                                <span>강의 사이트 제작에 수백만원 비용 발생</span>
                            </li>
                            <li className="flex items-start text-gray-500">
                                <X className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
                                <span>수강생 입금을 엑셀로 수동 관리</span>
                            </li>
                            <li className="flex items-start text-gray-500">
                                <X className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
                                <span>안내 메일, 리마인드 문자 일일이 발송</span>
                            </li>
                            <li className="flex items-start text-gray-500">
                                <X className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
                                <span>복잡한 PG사 가입 및 카드 심사 절차</span>
                            </li>
                        </ul>
                    </div>

                    {/* New Way (Cohort Class) */}
                    <motion.div
                        className="bg-blue-50/50 p-8 rounded-2xl border-2 border-primary/20 relative overflow-hidden"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute top-0 right-0 bg-primary/10 px-4 py-1 rounded-bl-xl text-primary font-bold text-sm">
                            RECOMMENDED
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="bg-primary/10 p-1 rounded-md mr-2">
                                <Check className="h-5 w-5 text-primary" />
                            </span>
                            코호트 클래스
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start text-gray-900 font-medium">
                                <Check className="h-5 w-5 mr-3 mt-0.5 text-primary shrink-0" />
                                <span>초기 비용 0원으로 즉시 시작</span>
                            </li>
                            <li className="flex items-start text-gray-900 font-medium">
                                <Check className="h-5 w-5 mr-3 mt-0.5 text-primary shrink-0" />
                                <span>대시보드에서 수강생/매출 자동 집계</span>
                            </li>
                            <li className="flex items-start text-gray-900 font-medium">
                                <Check className="h-5 w-5 mr-3 mt-0.5 text-primary shrink-0" />
                                <span>상황별 자동 알림 시스템 제공</span>
                            </li>
                            <li className="flex items-start text-gray-900 font-medium">
                                <Check className="h-5 w-5 mr-3 mt-0.5 text-primary shrink-0" />
                                <span>별도 심사 없이 즉시 카드 결제 연동</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
