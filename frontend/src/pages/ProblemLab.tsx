import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import LabSkeleton from '../components/layout/LabSkeleton'
import CodeEditor from '../components/problem/CodeEditor'
import OutputPanel from '../components/problem/OutputPanel'
import VisualizationPanel from '../components/problem/VisualizationPanel'
import { ChevronLeft, Eye, RotateCcw } from 'lucide-react'

const ProblemLab: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const currentProblem = useStore(state => state.currentProblem)
    const fetchProblemBySlug = useStore(state => state.fetchProblemBySlug)
    const isEngineInitialized = useStore(state => state.isEngineInitialized)
    const resetState = useStore(state => state.resetState)
    const error = useStore(state => state.error)
    const executeCode = useStore(state => state.executeCode)
    const resetCodeExecution = useStore(state => state.resetCodeExecution)
    const refreshSteps = useStore(state => state.refreshSteps)
    const setCustomInput = useStore(state => state.setCustomInput)
    const setCustomTarget = useStore(state => state.setCustomTarget)
    const [showVisualizer, setShowVisualizer] = useState(false)
    
    // Custom input refs for stable access
    const input1Ref = useRef<HTMLInputElement>(null)
    const input2Ref = useRef<HTMLInputElement>(null)
    
    // Animation playback state
    const isPlaying = useStore(state => state.isPlaying)
    const currentStepIndex = useStore(state => state.currentStepIndex)
    const setStep = useStore(state => state.setStep)
    const setPlaying = useStore(state => state.setPlaying)
    const playbackSpeed = useStore(state => state.playbackSpeed)
    const isBruteForce = useStore(state => state.isBruteForce)
    
    const steps = isBruteForce 
        ? currentProblem?.brute_force_steps 
        : currentProblem?.optimal_steps
    const totalSteps = steps?.length || 0
    
    // Animation playback effect
    useEffect(() => {
        if (!isPlaying) return
        const interval = setInterval(() => {
            if (currentStepIndex < totalSteps - 1) {
                setStep(currentStepIndex + 1)
            } else {
                setPlaying(false)
            }
        }, playbackSpeed)
        return () => clearInterval(interval)
    }, [isPlaying, playbackSpeed, currentStepIndex, totalSteps, setStep, setPlaying])
    
    // Visualizer is always enabled - no state needed

    useEffect(() => {
        if (slug) {
            fetchProblemBySlug(slug)
            resetCodeExecution()
        }
        return () => resetState()
    }, [slug, fetchProblemBySlug, resetState, resetCodeExecution])

    // Generate test cases based on problem examples
    const testCases = useMemo(() => {
        if (!currentProblem?.examples) return []
        
        return currentProblem.examples.map(example => {
            const inputStr = example.input
            
            // Two Sum pattern: nums = [...], target = N
            const twoSumMatch = inputStr.match(/nums\s*=\s*(\[.+?\])\s*,\s*target\s*=\s*(-?\d+)/)
            if (twoSumMatch) {
                return {
                    input: [JSON.parse(twoSumMatch[1]), parseInt(twoSumMatch[2])],
                    expected: JSON.parse(example.output)
                }
            }
            
            // Array + target pattern: [...], target
            const arrayTargetMatch = inputStr.match(/^\s*(\[.+?\])\s*,\s*(\d+)\s*$/)
            if (arrayTargetMatch) {
                return {
                    input: [JSON.parse(arrayTargetMatch[1]), parseInt(arrayTargetMatch[2])],
                    expected: JSON.parse(example.output)
                }
            }
            
            // Single array input
            const arrayMatch = inputStr.match(/^\s*(\[.+?\])\s*$/)
            if (arrayMatch) {
                return {
                    input: JSON.parse(arrayMatch[1]),
                    expected: JSON.parse(example.output)
                }
            }
            
            // String input
            const stringMatch = inputStr.match(/["'](.+?)["']/)
            if (stringMatch) {
                return {
                    input: stringMatch[1],
                    expected: JSON.parse(example.output)
                }
            }
            
            return { input: inputStr, expected: example.output }
        })
    }, [currentProblem])
    
    const isCorrect = useStore(state => state.codeExecution.isCorrect)
    
    // Initialize custom input values when problem loads
    useEffect(() => {
        if (currentProblem) {
            setCustomInput(currentProblem.input_settings?.input1.placeholder || '')
            setCustomTarget(currentProblem.input_settings?.input2?.placeholder || '')
            if (input1Ref.current) {
                input1Ref.current.value = currentProblem.input_settings?.input1.placeholder || ''
            }
            if (input2Ref.current) {
                input2Ref.current.value = currentProblem.input_settings?.input2?.placeholder || ''
            }
        }
    }, [currentProblem, setCustomInput, setCustomTarget])

    const handleRunCode = () => {
        if (testCases.length > 0) {
            executeCode(testCases)
        }
    }
    
    const handleApplyChanges = () => {
        // Update store with custom input values
        if (input1Ref.current) {
            setCustomInput(input1Ref.current.value)
        }
        if (input2Ref.current) {
            setCustomTarget(input2Ref.current.value)
        }
        
        // Re-run validation with new inputs
        if (testCases.length > 0) {
            executeCode(testCases)
        }
        
        // Refresh visualization steps to use new input data
        refreshSteps()
        
        // Reset animation state
        setStep(0)
        setPlaying(false)
    }

    if (error) return <Navigate to="/problems" replace />
    if (!currentProblem || !isEngineInitialized) return <LabSkeleton />

    const formattedId = String(currentProblem.id).padStart(3, '0')

    return (
        <div className="h-screen flex flex-col bg-[#21092b] text-white font-outfit overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#21092b]/80 backdrop-blur-md z-20">
                <div className="flex items-center gap-4">
                    <Link
                        to="/problems"
                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                    >
                        <ChevronLeft size={18} />
                    </Link>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-black text-[#EC4186] px-1.5 py-0.5 bg-[#EC4186]/10 rounded">
                                #{formattedId}
                            </span>
                            <h1 className="text-sm font-bold text-white">{currentProblem.title}</h1>
                        </div>
                        <span className="text-[10px] text-white/40">{currentProblem.difficulty} • {currentProblem.primaryPattern}</span>
                    </div>
                </div>
            </header>

            {/* Main Layout: 30% - 70% */}
            <div className="flex-1 grid grid-cols-[30%_70%] min-h-0">
                {/* Left Panel: Problem Statement */}
                <aside className="h-full bg-[#240b33] border-r border-white/5 overflow-y-auto custom-scrollbar">
                    <div className="p-6">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                            Problem Statement
                        </h2>
                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                                {currentProblem.problem_statement}
                            </p>
                        </div>

                        {/* Constraints */}
                        {currentProblem.constraints && currentProblem.constraints.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                                    Constraints
                                </h3>
                                <ul className="space-y-2">
                                    {currentProblem.constraints.map((constraint, idx) => (
                                        <li key={idx} className="text-white/60 text-xs flex items-start gap-2">
                                            <span className="text-[#EC4186] mt-1">•</span>
                                            <code className="bg-white/5 px-1.5 py-0.5 rounded">{constraint}</code>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Complexity - Only shows when solved */}
                        {isCorrect && currentProblem.complexity && (
                            <div className="mt-6">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                                    Complexity
                                </h3>
                                <div className="rounded-lg p-3 border bg-green-500/10 border-green-500/30 transition-all duration-500">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-white/50">Time</span>
                                            <code className="text-xs font-mono text-green-400">
                                                {currentProblem.time_complexity || currentProblem.complexity?.optimal?.time || 'O(n)'}
                                            </code>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-white/50">Space</span>
                                            <code className="text-xs font-mono text-green-400">
                                                {currentProblem.space_complexity || currentProblem.complexity?.optimal?.space || 'O(n)'}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-green-500/20 text-[10px] text-green-400 text-center">
                                        ✓ Solution Accepted
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Custom Input */}
                        <div className="mt-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                                Custom Input
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] text-white/50 block mb-1">
                                        {currentProblem.input_settings?.input1.label || 'Input'}
                                    </label>
                                    <input
                                        ref={input1Ref}
                                        type="text"
                                        defaultValue={currentProblem.input_settings?.input1.placeholder || ''}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC4186]/50"
                                        placeholder={currentProblem.input_settings?.input1.placeholder || 'Enter input...'}
                                    />
                                </div>
                                {currentProblem.input_settings?.input2 && (
                                    <div>
                                        <label className="text-[10px] text-white/50 block mb-1">
                                            {currentProblem.input_settings.input2.label}
                                        </label>
                                        <input
                                            ref={input2Ref}
                                            type="text"
                                            defaultValue={currentProblem.input_settings.input2.placeholder}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC4186]/50"
                                            placeholder={currentProblem.input_settings.input2.placeholder}
                                        />
                                    </div>
                                )}
                                <button
                                    onClick={handleApplyChanges}
                                    className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white text-xs font-bold rounded-lg hover:shadow-[0_0_15px_rgba(236,65,134,0.4)] transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw size={14} />
                                    Apply Changes
                                </button>
                            </div>
                        </div>

                        {/* Examples */}
                        {currentProblem.examples && currentProblem.examples.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                                    Examples
                                </h3>
                                <div className="space-y-3">
                                    {currentProblem.examples.map((example, idx) => (
                                        <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/5">
                                            <div className="text-[10px] text-white/30 mb-2">Example {idx + 1}</div>
                                            <div className="text-xs text-white/70 space-y-1">
                                                <div><span className="text-white/40">Input:</span> {example.input}</div>
                                                <div><span className="text-white/40">Output:</span> {example.output}</div>
                                                {example.explanation && (
                                                    <div className="text-white/50 mt-2">{example.explanation}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Center Panel: Code Editor OR Visualization */}
                <main className="h-full flex flex-col bg-[#1b062b] border-r border-white/5 relative">
                    {!showVisualizer ? (
                        // Show Code Editor
                        <>
                            <div className="flex-1 min-h-0 p-4">
                                <div className="h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="text-xs font-bold uppercase tracking-wider text-white/40">
                                            Code Editor
                                        </h2>
                                        <span className="text-[10px] text-white/30">JavaScript</span>
                                    </div>
                                    <div className="flex-1 min-h-0">
                                        <CodeEditor height="100%" />
                                    </div>
                                </div>
                            </div>

                            {/* Output Panel */}
                            <div className="h-auto max-h-[35%] border-t border-white/5 bg-[#240b33] p-4 overflow-y-auto custom-scrollbar">
                                <OutputPanel onRunCode={handleRunCode} />
                            </div>

                            {/* Visualizer Toggle Button - Always Enabled and Visible */}
                            <button
                                onClick={() => setShowVisualizer(true)}
                                className="absolute bottom-6 right-6 px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white hover:shadow-[0_0_20px_rgba(236,65,134,0.4)] hover:scale-105 z-20"
                            >
                                <Eye size={18} />
                                Show Visualizer
                            </button>
                        </>
                    ) : (
                        // Show Visualization
                        <div className="h-full flex flex-col">
                            {/* Back Button Header */}
                            <div className="h-14 border-b border-white/5 flex items-center px-4 bg-white/5">
                                <button
                                    onClick={() => setShowVisualizer(false)}
                                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                    <span className="text-sm font-medium">Back to Editor</span>
                                </button>
                                <span className="ml-auto text-xs font-bold uppercase tracking-wider text-white/40">
                                    Visualization
                                </span>
                            </div>
                            
                            {/* Visualization Content */}
                            <div className="flex-1 overflow-hidden">
                                <VisualizationPanel 
                                    key={`${currentProblem?.slug}-${isBruteForce ? 'brute' : 'optimal'}-${currentStepIndex}`}
                                />
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default ProblemLab
