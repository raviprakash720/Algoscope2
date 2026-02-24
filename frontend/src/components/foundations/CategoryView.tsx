import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Layers, ArrowRight, Star } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { FoundationCategory, FoundationModule } from '../../types/foundation'
import { getPatternInfo } from '../../data/patternHierarchy'

interface CategoryViewProps {
    category: FoundationCategory
}

const CategoryView: React.FC<CategoryViewProps> = ({ category }) => {
    const navigate = useNavigate()
    const patternStats = useStore(state => state.patternStats)

    const getMasteryColor = (confidence: number) => {
        if (confidence >= 80) return 'text-[#EC4186] bg-[#EC4186]/10 border-[#EC4186]/20'
        if (confidence >= 50) return 'text-[#EE544A] bg-[#EE544A]/10 border-[#EE544A]/20'
        if (confidence >= 20) return 'text-white/40 bg-white/5 border-white/10'
        return 'text-white/20 bg-white/5 border-white/10'
    }

    return (
        <motion.div
            key="category-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {category.modules.map((module: FoundationModule, idx: number) => {
                    const stats = patternStats[module.id]
                    const confidence = stats?.confidence || 0
                    const masteryStyle = getMasteryColor(confidence)

                    // Get sub-pattern count from hierarchy
                    const patternInfo = getPatternInfo(module.id)
                    const subPatternCount = patternInfo?.subPatterns.length || 0

                    return (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="glass-card p-6 rounded-2xl border border-white/5 hover:border-[#EC4186]/20 transition-all cursor-pointer group flex flex-col h-full bg-white/[0.02]"
                            onClick={() => navigate(`/foundations/${category.id}/${module.id}`)}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest ${masteryStyle}`}>
                                    {module.difficulty}
                                </span>
                                {subPatternCount > 0 && (
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 text-white/40">
                                        <Layers size={10} />
                                        <span className="text-[10px] font-mono">{subPatternCount} Sub-patterns</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#EC4186] transition-colors tracking-tight">
                                    {module.title}
                                </h3>
                                <p className="text-sm text-white/40 mb-6 line-clamp-3 font-light leading-relaxed">
                                    {module.description}
                                </p>
                            </div>

                            <div className="mt-auto space-y-4 pt-4 border-t border-white/5 relative">
                                {/* Mastery Bar */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-mono uppercase text-white/20">
                                        <span>Mastery</span>
                                        <span className={confidence > 0 ? "text-[#EC4186]" : ""}>{confidence}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${confidence > 0 ? 'bg-[#EC4186]' : 'bg-transparent'}`}
                                            style={{ width: `${confidence}%` }}
                                        />
                                    </div>

                                    {/* Breakdown (Visible on Hover) */}
                                    <div className="absolute top-full left-0 w-full pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                        <div className="bg-[#21092b] border border-[#EC4186]/20 rounded-xl p-3 shadow-[0_10px_40px_-10px_rgba(236,65,134,0.3)]">
                                            <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-widest text-white/40">
                                                <div className="flex justify-between">
                                                    <span>Drills</span>
                                                    <span className="text-white">{stats?.drillScore || 0}%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Visual</span>
                                                    <span className="text-white">{stats?.visualizerScore || 0}%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Recog</span>
                                                    <span className="text-white">{stats?.recognitionScore || 0}%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Edge</span>
                                                    <span className="text-white">{stats?.edgeCaseScore || 0}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-white/20 group-hover:text-white/40 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Star size={12} className={confidence >= 100 ? "text-[#EE544A] fill-[#EE544A]" : ""} />
                                    </div>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}

export default CategoryView
