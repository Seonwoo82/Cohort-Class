'use client'

import { motion } from 'framer-motion'

export function SocialProofSection() {
    return (
        <section id="reviews" className="py-24 bg-slate-50">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900">
                        이미 <span className="text-primary">100명 이상의 전문가</span>가 선택했습니다
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale">
                    {/* Logos styled as gray boxes with text for now, can be replaced with real logos */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        <span className="font-bold text-xl text-gray-500">TechCorp</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        <span className="font-bold text-xl text-gray-500">EduFuture</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        <span className="font-bold text-xl text-gray-500">GrowFast</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        <span className="font-bold text-xl text-gray-500">InnoLearn</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        <span className="font-bold text-xl text-gray-500">SkillUp</span>
                    </div>
                </div>

                <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-gray-600 mb-4">"강의 개설부터 결제까지 이렇게 쉬울 줄 몰랐습니다. 덕분에 강의 콘텐츠에만 집중할 수 있게 되었어요."</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">K</div>
                            <div>
                                <div className="font-bold text-gray-900">김철수</div>
                                <div className="text-sm text-gray-500">데이터 분석 강사</div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <p className="text-gray-600 mb-4">"수강생 관리 엑셀 지옥에서 해방되었습니다. 자동 알림 기능은 정말 최고입니다."</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-3">L</div>
                            <div>
                                <div className="font-bold text-gray-900">이영희</div>
                                <div className="text-sm text-gray-500">온라인 마케터</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
