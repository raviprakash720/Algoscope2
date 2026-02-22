import { ProblemStatement } from './ProblemStatement'
import { MentalModelStatsCard } from './MentalModelStatsCard'
import { MentalModelPrincipleCard } from './MentalModelPrincipleCard'
import { TwoPointerComparison } from './engines/TwoPointers/visual/TwoPointerComparison'
import { SlidingWindowComparison } from './engines/SlidingWindowEngine/visual/SlidingWindowComparison'
import { FoundationModule } from '../../types/foundation'
import problemsData from '../../data/problems.json'
import { useNavigate } from 'react-router-dom'
import { FlaskConical, ArrowRight } from 'lucide-react'

interface Props {
    moduleId?: string
    module: FoundationModule
    activeSubPatternId: string | null
    setActiveSubPatternId: (id: string | null) => void
}

export const MentalModelTab: React.FC<Props> = ({ moduleId, module, activeSubPatternId }) => {
    const navigate = useNavigate()
    const mentalModel = module.mentalModel
    const problems = (module as any).relatedProblems ? (problemsData as any[]).filter(p => (module as any).relatedProblems.includes(p.id)) : []

    if (!mentalModel) return null

    const renderSimulation = () => {
        if (moduleId === 'two_pointers') {
            return <TwoPointerComparison subPatternId={activeSubPatternId || 'two_sum_sorted'} />
        }
        if (moduleId === 'sliding_window') {
            return <SlidingWindowComparison />
        }
        // Add more patterns as they are implemented
        return (
            <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
                <p className="text-white/40 italic">Interactive simulation coming soon for {module.title}</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* SECTION A: Context & Efficiency */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {mentalModel.problemStatement && (
                    <ProblemStatement
                        definition={mentalModel.problemStatement.definition}
                        returnValue={mentalModel.problemStatement.returnValue}
                        constraints={mentalModel.problemStatement.constraints}
                    />
                )}
                {mentalModel.efficiencyComparison && (
                    <MentalModelStatsCard
                        bruteForce={mentalModel.efficiencyComparison.bruteForce}
                        optimal={mentalModel.efficiencyComparison.optimal}
                        gain={mentalModel.efficiencyComparison.gain}
                    />
                )}
            </div>

            {/* SECTION B: Interactive Simulation */}
            <div className="space-y-8">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Patterns in Motion</h2>
                    <p className="text-white/50 leading-relaxed">
                        Experiment with custom inputs and compare how the {module.title} strategy
                        outperforms brute-force scans in real-time.
                    </p>
                </div>
                {renderSimulation()}
            </div>

            {/* SECTION C: Concept Principle Card */}
            <div className="pt-16 border-t border-white/10">
                <div className="mb-10 text-center">
                    <span className="text-xs font-bold text-accent-blue uppercase tracking-[0.2em]">The Insight</span>
                    <h3 className="text-2xl font-bold text-white mt-2">Core Pattern Philosophy</h3>
                </div>
                <MentalModelPrincipleCard
                    analogy={mentalModel.analogy}
                    coreInsight={mentalModel.coreInsight}
                    realWorldExample={mentalModel.realWorldExample}
                />
            </div>

            {/* SECTION D: Training Grounds (Related Problems) */}
            {problems.length > 0 && (
                <div className="pt-16 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-10">
                        <FlaskConical className="text-accent-blue" size={24} />
                        <div>
                            <h3 className="text-2xl font-bold text-white">Laboratory Grounds</h3>
                            <p className="text-white/40 text-sm">Practice this pattern with production-grade challenges.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {problems.map(prob => (
                            <button
                                key={prob.id}
                                onClick={() => navigate(`/problem/${prob.slug}`)}
                                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-accent-blue/30 transition-all text-left flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Problem #{prob.id}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${prob.difficulty === 'Easy' ? 'text-green-400 border-green-400/20 bg-green-400/5' :
                                                prob.difficulty === 'Medium' ? 'text-orange-400 border-orange-400/20 bg-orange-400/5' :
                                                    'text-red-400 border-red-400/20 bg-red-400/5'
                                            }`}>
                                            {prob.difficulty}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">{prob.title}</h4>
                                    <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">{prob.problem_statement}</p>
                                </div>
                                <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest">Enter Laboratory</span>
                                    <ArrowRight size={14} className="text-accent-blue -translate-x-2 group-hover:translate-x-0 transition-transform" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

