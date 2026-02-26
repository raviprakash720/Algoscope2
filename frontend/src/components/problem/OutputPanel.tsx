import React from 'react'
import { Play, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { cn } from '../../utils/cn'

interface OutputPanelProps {
    onRunCode: () => void
}

const OutputPanel: React.FC<OutputPanelProps> = ({ onRunCode }) => {
    const codeExecution = useStore(state => state.codeExecution)
    const { output, isError, isCorrect, isExecuting, testResults } = codeExecution

    return (
        <div className="flex flex-col gap-4">
            {/* Run Button */}
            <button
                onClick={onRunCode}
                disabled={isExecuting}
                className={cn(
                    "w-full py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                    isExecuting
                        ? "bg-white/10 text-white/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white hover:shadow-[0_0_20px_rgba(236,65,134,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                )}
            >
                {isExecuting ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Running...
                    </>
                ) : (
                    <>
                        <Play size={18} fill="currentColor" />
                        Run Code
                    </>
                )}
            </button>

            {/* Status Badge - Hackathon Demo */}
            {isCorrect !== null && (
                <div className={cn(
                    "w-full py-3 px-4 rounded-xl font-bold text-center text-sm uppercase tracking-wider transition-all",
                    isCorrect
                        ? "bg-green-500/20 border border-green-500/40 text-green-300"
                        : "bg-red-500/20 border border-red-500/40 text-red-300"
                )}>
                    {isCorrect ? "✔ Correct Solution" : "✘ Wrong Solution"}
                </div>
            )}

            {/* Output Display */}
            {output && (
                <div
                    className={cn(
                        "p-4 rounded-xl border font-mono text-sm",
                        isError
                            ? "bg-red-500/10 border-red-500/30 text-red-200"
                            : isCorrect
                                ? "bg-green-500/10 border-green-500/30 text-green-200"
                                : "bg-white/5 border-white/10 text-white/80"
                    )}
                >
                    <div className="flex items-center gap-2 mb-2">
                        {isError ? (
                            <XCircle size={16} className="text-red-400" />
                        ) : isCorrect ? (
                            <CheckCircle size={16} className="text-green-400" />
                        ) : null}
                        <span className={cn(
                            "font-bold uppercase tracking-wider text-xs",
                            isError ? "text-red-400" : isCorrect ? "text-green-400" : "text-white/60"
                        )}>
                            {isExecuting ? 'Running...' : isError ? 'Error' : isCorrect ? 'Success' : 'Output'}
                        </span>
                    </div>
                    <pre className="whitespace-pre-wrap break-words">{output}</pre>
                </div>
            )}

            {/* Test Results */}
            {testResults.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Test Results</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                        {testResults.map((result, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-3 rounded-lg border text-xs font-mono",
                                    result.passed
                                        ? "bg-green-500/5 border-green-500/20"
                                        : "bg-red-500/5 border-red-500/20"
                                )}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    {result.passed ? (
                                        <CheckCircle size={12} className="text-green-400" />
                                    ) : (
                                        <XCircle size={12} className="text-red-400" />
                                    )}
                                    <span className={result.passed ? "text-green-400" : "text-red-400"}>
                                        Test {index + 1}
                                    </span>
                                </div>
                                <div className="text-white/60 space-y-1">
                                    <div>Input: {JSON.stringify(result.input)}</div>
                                    <div>Expected: {JSON.stringify(result.expected)}</div>
                                    <div>Actual: {JSON.stringify(result.actual)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default OutputPanel
