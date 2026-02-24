import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Filter, ChevronDown, X, Grid, List as ListIcon } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { PATTERN_HIERARCHY } from '../data/patternHierarchy'

export default function ProblemList() {
    const {
        problems,
        isLoading,
        fetchAllProblems
    } = useStore()

    const [searchParams] = useSearchParams()
    const urlPattern = searchParams.get('pattern')

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set())
    const [selectedLevels, setSelectedLevels] = useState<Set<string>>(new Set())
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [viewMode, setViewMode] = useState<'list' | 'pattern'>(urlPattern ? 'pattern' : 'list')

    useEffect(() => {
        fetchAllProblems()
    }, [fetchAllProblems])

    useEffect(() => {
        if (urlPattern) {
            setViewMode('pattern')
        }
    }, [urlPattern])

    const levels = ['Easy', 'Medium', 'Hard']

    // Available topics from hierarchy
    const availableTopics = useMemo(() => {
        const topics: { key: string; title: string }[] = []
        Object.values(PATTERN_HIERARCHY).forEach(group => {
            Object.entries(group.patterns).forEach(([key, pattern]) => {
                topics.push({ key, title: pattern.title })
            })
        })
        return topics
    }, [])

    // Pattern View: Group patterns from hierarchy with dynamic counts
    const allPatternGroups = useMemo(() =>
        Object.entries(PATTERN_HIERARCHY).flatMap(([_, levelGroup]) =>
            Object.entries(levelGroup.patterns).map(([patternKey, pattern]) => {
                // Dynamic count for this pattern: check primary, algorithmType, tags, and secondaryPatterns
                const count = problems.filter(p => {
                    const topicTitle = pattern.title.toLowerCase()
                    const prim = p.primaryPattern?.toLowerCase() || ''
                    const algo = (p.algorithmType as string)?.toLowerCase() || ''
                    const tags = p.tags.map(t => t.toLowerCase())
                    const secondary = (p.secondaryPatterns || []).map(s => s.toLowerCase())

                    return prim.includes(topicTitle) ||
                        algo.includes(topicTitle) ||
                        tags.some(tag => tag.includes(topicTitle)) ||
                        secondary.some(sec => sec.includes(topicTitle))
                }).length

                return {
                    key: patternKey,
                    title: pattern.title,
                    level: levelGroup.title,
                    count,
                    subPatterns: pattern.subPatterns || []
                }
            })
        ), [problems])

    const filteredProblems = useMemo(() => {
        return problems.filter(p => {
            const matchesSearch =
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toString().includes(searchQuery) ||
                (p.primaryPattern && p.primaryPattern.toLowerCase().includes(searchQuery.toLowerCase())) ||
                p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesTopic = selectedTopics.size === 0 || Array.from(selectedTopics).some(topicId => {
                const topicTitle = availableTopics.find(t => t.key === topicId)?.title?.toLowerCase() || topicId.toLowerCase()
                const prim = p.primaryPattern?.toLowerCase() || ''
                const algo = (p.algorithmType as string)?.toLowerCase() || ''
                const tags = p.tags.map(t => t.toLowerCase())
                const secondary = (p.secondaryPatterns || []).map(s => s.toLowerCase())

                return prim.includes(topicTitle) ||
                    algo.includes(topicTitle) ||
                    tags.some(tag => tag.includes(topicTitle)) ||
                    secondary.some(sec => sec.includes(topicTitle)) ||
                    (topicId === 'two_pointers' && (prim.includes('pointer') || algo.includes('pointer'))) ||
                    (topicId === 'graph' && (prim.includes('graph') || algo.includes('graph') || tags.includes('graph')))
            })

            const matchesLevel = selectedLevels.size === 0 || selectedLevels.has(p.difficulty)

            return matchesSearch && matchesTopic && matchesLevel
        })
    }, [problems, searchQuery, selectedTopics, selectedLevels, availableTopics])

    const toggleTopic = (topicId: string) => {
        const newTopics = new Set(selectedTopics)
        if (newTopics.has(topicId)) newTopics.delete(topicId)
        else newTopics.add(topicId)
        setSelectedTopics(newTopics)
    }

    const toggleLevel = (level: string) => {
        const newLevels = new Set(selectedLevels)
        if (newLevels.has(level)) newLevels.delete(level)
        else newLevels.add(level)
        setSelectedLevels(newLevels)
    }

    const clearFilters = () => {
        setSelectedTopics(new Set())
        setSelectedLevels(new Set())
        setSearchQuery('')
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#21092b]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-[#EC4186]/20 border-t-[#EC4186] rounded-full animate-spin" />
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em]">Synchronizing Lab...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col bg-[#21092b] overflow-hidden">
            {/* Header Area */}
            <div className="px-8 pt-8 pb-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Patterns Library</h1>
                        <p className="text-white/40 text-sm mt-1">Foundational schemas for elite problem solving.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Toggle */}
                        <div className="bg-white/5 p-1 rounded-xl flex border border-white/5">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-[#EC4186] text-white' : 'text-white/40 hover:text-white'}`}
                            >
                                <ListIcon size={14} />
                                List
                            </button>
                            <button
                                onClick={() => setViewMode('pattern')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'pattern' ? 'bg-[#EE544A] text-white' : 'text-white/40 hover:text-white'}`}
                            >
                                <Grid size={14} />
                                Patterns
                            </button>
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                            <Bell size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Identify patterns (e.g., 'Sliding Window', 'In-Place')..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#EC4186]/50 focus:bg-white/[0.08] transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`px-6 rounded-2xl border flex items-center gap-3 font-bold transition-all ${isFilterOpen ? 'bg-[#EC4186] border-[#EC4186] text-white' : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'}`}
                    >
                        <Filter size={18} />
                        Filters
                        {(selectedTopics.size > 0 || selectedLevels.size > 0) && (
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                                {selectedTopics.size + selectedLevels.size}
                            </span>
                        )}
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Collapsible Filter Menu */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 p-6 bg-white/[0.03] border border-white/5 rounded-2xl grid grid-cols-2 gap-8">
                                {/* Levels */}
                                <div>
                                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Levels</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {levels.map(l => (
                                            <button
                                                key={l}
                                                onClick={() => toggleLevel(l)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedLevels.has(l) ? 'bg-[#EC4186]/20 border-[#EC4186] text-[#EC4186]' : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Topics */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Algorithm Topics</h4>
                                        {(selectedTopics.size > 0 || selectedLevels.size > 0) && (
                                            <button
                                                onClick={clearFilters}
                                                className="text-[10px] font-bold text-[#EE544A] hover:underline"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 pr-2">
                                        {availableTopics.map(t => (
                                            <button
                                                key={t.key}
                                                onClick={() => toggleTopic(t.key)}
                                                className={`px-4 py-2 rounded-xl text-[11px] font-bold border transition-all ${selectedTopics.has(t.key) ? 'bg-[#EE544A]/20 border-[#EE544A] text-[#EE544A]' : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}
                                            >
                                                {t.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                {viewMode === 'list' ? (
                    <motion.div
                        layout
                        className="space-y-4"
                    >
                        {filteredProblems.map((problem, index) => {
                            const difficultyColor = problem.difficulty === 'Easy' ? '#EE544A' : problem.difficulty === 'Medium' ? '#EC4186' : '#FF6B6B'
                            const primaryPattern = problem.primaryPattern || problem.algorithmType.replace(/_/g, ' ') || 'GENERAL'

                            return (
                                <motion.div
                                    key={problem.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    className="group relative"
                                >
                                    <Link to={`/problems/${problem.slug}`}>
                                        <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all group">
                                            {/* Name Section */}
                                            <div className="flex-1 min-w-0 pr-8">
                                                <h3 className="text-xl font-bold text-white group-hover:text-[#EC4186] transition-colors truncate">
                                                    {problem.title}
                                                </h3>
                                                <div className="flex gap-3 mt-1.5">
                                                    {problem.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Metadata Section: Topic and Level */}
                                            <div className="flex items-center gap-8 shrink-0">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-bold text-[#EE544A] bg-[#EE544A]/10 px-3 py-1 rounded-lg border border-[#EE544A]/20 uppercase tracking-tighter">
                                                        {primaryPattern}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 w-32 justify-end border-l border-white/5 pl-8">
                                                    <span
                                                        className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
                                                        style={{ color: difficultyColor, backgroundColor: `${difficultyColor}11`, border: `1px solid ${difficultyColor}33` }}
                                                    >
                                                        {problem.difficulty}
                                                    </span>
                                                </div>

                                                {/* Action Button */}
                                                <div className="w-10 h-10 rounded-xl bg-[#EC4186]/10 border border-[#EC4186]/20 flex items-center justify-center group-hover:bg-[#EC4186] group-hover:shadow-[0_0_20px_rgba(236,65,134,0.4)] transition-all ml-4">
                                                    <ChevronDown className="-rotate-90 text-[#EC4186] group-hover:text-white group-hover:scale-110 transition-all" size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allPatternGroups.map((pattern, index) => (
                            <motion.div
                                key={pattern.key}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="group bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.06] hover:border-[#EC4186]/30 transition-all cursor-pointer relative overflow-hidden"
                                onClick={() => {
                                    setSelectedTopics(new Set([pattern.key]))
                                    setViewMode('list')
                                }}
                            >
                                {/* Background Decorative Elements */}
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#EC4186]/5 rounded-full blur-3xl group-hover:bg-[#EC4186]/10 transition-colors" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#EC4186]/10 border border-[#EC4186]/20 flex items-center justify-center text-[#EC4186] group-hover:scale-110 transition-transform">
                                            {pattern.title.includes('Pointer') ? '👉' : pattern.title.includes('Window') ? '🗔' : '🧪'}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">{pattern.level}</span>
                                            <span className="text-xl font-bold text-[#EE544A] font-mono">{pattern.count}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#EC4186] transition-colors">{pattern.title}</h3>

                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-2">
                                            {pattern.subPatterns.slice(0, 3).map(sub => (
                                                <span key={sub} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-white/40">{sub}</span>
                                            ))}
                                            {pattern.subPatterns.length > 3 && (
                                                <span className="text-[10px] text-white/20">+{pattern.subPatterns.length - 3} more</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {filteredProblems.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-white/20">
                            <X size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No patterns found matching your search</h3>
                        <p className="text-white/40 text-sm mb-8">Try adjusting your filters or expanding your search criteria.</p>
                        <button
                            onClick={clearFilters}
                            className="bg-[#EC4186] text-white px-8 py-3 rounded-2xl font-bold hover:shadow-glow transition-all"
                        >
                            Reset Logic
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
