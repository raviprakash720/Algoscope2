import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { API_BASE } from '../config/api'

interface Mistake {
    _id: string
    userId: string
    problemId: number
    pattern: string
    mistakeType: 'wrong_output' | 'runtime_error'
    createdAt: string
}

const MistakeDashboard: React.FC = () => {
    const [mistakes, setMistakes] = useState<Mistake[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMistakes = async () => {
            try {
                const userId = localStorage.getItem('algoScope_userId') || 'test_user_1'
                const response = await fetch(
                    `${API_BASE}/api/mistakes/${userId}`
                )
                
                if (!response.ok) {
                    throw new Error('Failed to fetch mistakes')
                }
                
                const data = await response.json()
                setMistakes(data)
            } catch (err) {
                setError('Failed to load mistakes')
                console.error('Error fetching mistakes:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchMistakes()
    }, [])

    // Group mistakes by pattern
    const mistakesByPattern = mistakes.reduce((acc, mistake) => {
        if (!acc[mistake.pattern]) {
            acc[mistake.pattern] = []
        }
        acc[mistake.pattern].push(mistake)
        return acc
    }, {} as Record<string, Mistake[]>)

    // Count mistakes by type
    const mistakeTypeCounts = mistakes.reduce((acc, mistake) => {
        acc[mistake.mistakeType] = (acc[mistake.mistakeType] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#21092b]">
                <div className="text-white">Loading mistakes...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#21092b]">
                <div className="text-red-400">{error}</div>
            </div>
        )
    }

    return (
        <div className="h-screen flex flex-col bg-[#21092b] text-white font-outfit overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#21092b]/80 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Link
                        to="/problems"
                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                    >
                        <ChevronLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-white">My Mistakes</h1>
                        <p className="text-xs text-white/40">Track and learn from your errors</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#240b33] border border-white/5 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-2">
                                Total Mistakes
                            </h3>
                            <div className="text-3xl font-bold text-[#EC4186]">
                                {mistakes.length}
                            </div>
                        </div>
                        
                        <div className="bg-[#240b33] border border-white/5 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-2">
                                Wrong Output
                            </h3>
                            <div className="text-3xl font-bold text-yellow-400">
                                {mistakeTypeCounts.wrong_output || 0}
                            </div>
                        </div>
                        
                        <div className="bg-[#240b33] border border-white/5 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-2">
                                Runtime Errors
                            </h3>
                            <div className="text-3xl font-bold text-red-400">
                                {mistakeTypeCounts.runtime_error || 0}
                            </div>
                        </div>
                    </div>

                    {/* Mistakes by Pattern */}
                    <div className="bg-[#240b33] border border-white/5 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Mistakes by Pattern</h2>
                        <div className="space-y-4">
                            {Object.entries(mistakesByPattern).map(([pattern, patternMistakes]) => (
                                <div key={pattern} className="border-l-4 border-[#EC4186] pl-4">
                                    <h3 className="font-bold text-white mb-2">{pattern}</h3>
                                    <p className="text-sm text-white/60">
                                        {patternMistakes.length} mistake{patternMistakes.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Mistakes */}
                    <div className="bg-[#240b33] border border-white/5 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Recent Mistakes</h2>
                        {mistakes.length === 0 ? (
                            <div className="text-center py-8 text-white/40">
                                <p>No mistakes recorded yet.</p>
                                <p className="text-sm mt-2">Start solving problems to track your progress!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {mistakes.slice(0, 10).map((mistake) => (
                                    <div 
                                        key={mistake._id} 
                                        className="bg-white/5 rounded-lg p-4 border border-white/5"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-medium text-white">
                                                    Problem #{mistake.problemId}
                                                </div>
                                                <div className="text-sm text-white/60 mt-1">
                                                    Pattern: {mistake.pattern}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
                                                    mistake.mistakeType === 'wrong_output' 
                                                        ? 'bg-yellow-500/20 text-yellow-400' 
                                                        : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                    {mistake.mistakeType === 'wrong_output' ? 'Wrong Output' : 'Runtime Error'}
                                                </span>
                                                <div className="text-xs text-white/40 mt-1">
                                                    {new Date(mistake.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MistakeDashboard