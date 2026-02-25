import React, { Suspense, lazy } from 'react'
import { Play, SkipBack, SkipForward, Pause, RefreshCw } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { cn } from '../../utils/cn'
import LabSkeleton from '../layout/LabSkeleton'

// Lazy load the VizPanel
const VizPanel = lazy(() => import('../layout/VizPanel'))

const VisualizationPanel: React.FC = () => {
    // Animation controls from store
    const isPlaying = useStore(state => state.isPlaying)
    const setPlaying = useStore(state => state.setPlaying)
    const currentStepIndex = useStore(state => state.currentStepIndex)
    const nextStep = useStore(state => state.nextStep)
    const prevStep = useStore(state => state.prevStep)
    const setStep = useStore(state => state.setStep)
    const playbackSpeed = useStore(state => state.playbackSpeed)
    const setSpeed = useStore(state => state.setSpeed)
    const currentProblem = useStore(state => state.currentProblem)
    const isBruteForce = useStore(state => state.isBruteForce)
    
    const steps = isBruteForce 
        ? currentProblem?.brute_force_steps 
        : currentProblem?.optimal_steps
    const totalSteps = steps?.length || 0

    return (
        <div className="h-full flex flex-col bg-[#240b33]">
            {/* Visualization Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Visualization
                </span>
                <div className="flex items-center gap-1">
                    <span className="text-[10px] text-white/40">
                        Step {currentStepIndex + 1} / {totalSteps}
                    </span>
                </div>
            </div>

            {/* Visualization Canvas */}
            <div className="flex-1 relative overflow-hidden bg-[#1b062b]">
                <Suspense fallback={<LabSkeleton />}>
                    <VizPanel />
                </Suspense>
            </div>

            {/* Animation Controls */}
            <div className="px-4 py-3 border-t border-white/5 bg-white/5">
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={prevStep}
                        disabled={currentStepIndex === 0}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <SkipBack size={16} className="text-white/70" />
                    </button>
                    
                    <button
                        onClick={() => setPlaying(!isPlaying)}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EC4186] to-[#EE544A] flex items-center justify-center hover:shadow-[0_0_15px_rgba(236,65,134,0.4)] transition-all"
                    >
                        {isPlaying ? (
                            <Pause size={16} fill="white" className="text-white" />
                        ) : (
                            <Play size={16} fill="white" className="text-white ml-0.5" />
                        )}
                    </button>
                    
                    <button
                        onClick={nextStep}
                        disabled={currentStepIndex === totalSteps - 1}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <SkipForward size={16} className="text-white/70" />
                    </button>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center justify-center gap-2 mt-3">
                    {[2000, 1000, 500, 250].map(speed => (
                        <button
                            key={speed}
                            onClick={() => setSpeed(speed)}
                            className={cn(
                                "px-2 py-1 rounded text-[10px] font-bold transition-all",
                                playbackSpeed === speed
                                    ? "bg-[#EC4186] text-white"
                                    : "bg-white/5 text-white/40 hover:text-white/70"
                            )}
                        >
                            {speed === 2000 ? '0.25x' : speed === 1000 ? '0.5x' : speed === 500 ? '1x' : '2x'}
                        </button>
                    ))}
                </div>

                {/* Restart Button */}
                <button
                    onClick={() => {
                        setStep(0)
                        setPlaying(false)
                    }}
                    className="mt-3 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                    <RefreshCw size={12} />
                    Restart
                </button>
            </div>
        </div>
    )
}

export default VisualizationPanel
