import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, ArrowRight, Trash2 } from 'lucide-react'

// Advanced Hash Map Visualizer
// Demonstrates: Hashing, Buckets, Collision Resolution (Chaining), Put/Get/Remove

interface Entry {
    key: string
    value: string
    id: string
}

const BUCKET_COUNT = 5

const HashMapVisualizer: React.FC = () => {
    // State
    const [buckets, setBuckets] = useState<Entry[][]>(Array.from({ length: BUCKET_COUNT }, () => []))
    const [inputKey, setInputKey] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [message, setMessage] = useState('Ready.')
    const [isAnimating, setIsAnimating] = useState(false)

    // Animation State
    const [highlightedBucket, setHighlightedBucket] = useState<number | null>(null)
    const [hashingVisualization, setHashingVisualization] = useState<{ k: string, hash: number, code: number } | null>(null)

    // Simple Hash Function
    const hashFunction = (key: string) => {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i))
        }
        return hash
    }

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    const handlePut = async () => {
        if (isAnimating) return
        if (!inputKey || !inputValue) {
            setMessage('Enter Key and Value.')
            return
        }

        setIsAnimating(true)
        const rawHash = hashFunction(inputKey)
        const bucketIdx = rawHash % BUCKET_COUNT

        // Visualize Hashing
        setMessage(`Hashing key "${inputKey}"...`)
        setHashingVisualization({ k: inputKey, hash: bucketIdx, code: rawHash })
        await sleep(1000)

        // Highlight Bucket
        setMessage(`Mapped to Bucket ${bucketIdx}`)
        setHighlightedBucket(bucketIdx)
        await sleep(600)

        // Update State
        setBuckets(prev => {
            const newBuckets = [...prev]
            const bucket = [...newBuckets[bucketIdx]]
            const existingIdx = bucket.findIndex(e => e.key === inputKey)

            if (existingIdx !== -1) {
                setMessage(`Key exists. Updating value...`)
                bucket[existingIdx] = { ...bucket[existingIdx], value: inputValue }
            } else {
                setMessage(bucket.length > 0 ? `Collision! Chaining...` : `Inserted into Bucket ${bucketIdx}.`)
                bucket.push({ key: inputKey, value: inputValue, id: Math.random().toString(36).substr(2, 9) })
            }
            newBuckets[bucketIdx] = bucket
            return newBuckets
        })

        await sleep(800)
        setHashingVisualization(null)
        setHighlightedBucket(null)
        setInputKey('')
        setInputValue('')
        setMessage('Ready.')
        setIsAnimating(false)
    }

    const handleGet = async () => {
        if (isAnimating) return
        if (!inputKey) {
            setMessage('Enter Key to Get.')
            return
        }
        setIsAnimating(true)

        const rawHash = hashFunction(inputKey)
        const bucketIdx = rawHash % BUCKET_COUNT

        setHashingVisualization({ k: inputKey, hash: bucketIdx, code: rawHash })
        await sleep(800)

        setHighlightedBucket(bucketIdx)
        setMessage(`Scanning Bucket ${bucketIdx}... O(1) avg`)

        await sleep(1000)

        const bucket = buckets[bucketIdx]
        const entry = bucket.find(e => e.key === inputKey)

        if (entry) {
            setMessage(`Found! Value: ${entry.value}`)
        } else {
            setMessage(`Key "${inputKey}" not found.`)
        }

        await sleep(1500)
        setHashingVisualization(null)
        setHighlightedBucket(null)
        setMessage('Ready.')
        setIsAnimating(false)
    }

    const handleRemove = async () => {
        if (isAnimating) return
        if (!inputKey) {
            setMessage('Enter Key to Remove.')
            return
        }
        setIsAnimating(true)

        const rawHash = hashFunction(inputKey)
        const bucketIdx = rawHash % BUCKET_COUNT

        setHashingVisualization({ k: inputKey, hash: bucketIdx, code: rawHash })
        await sleep(800)

        setHighlightedBucket(bucketIdx)
        setMessage(`Scanning Bucket ${bucketIdx}...`)

        await sleep(600)

        const bucket = buckets[bucketIdx]
        if (bucket.some(e => e.key === inputKey)) {
            setBuckets(prev => {
                const newBuckets = [...prev]
                newBuckets[bucketIdx] = newBuckets[bucketIdx].filter(e => e.key !== inputKey)
                return newBuckets
            })
            setMessage(`Removed key "${inputKey}".`)
        } else {
            setMessage(`Key "${inputKey}" not found.`)
        }

        await sleep(1000)
        setHashingVisualization(null)
        setHighlightedBucket(null)
        setMessage('Ready.')
        setIsAnimating(false)
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-6 bg-black/20">
            {/* Status Bar */}
            <div className="w-full flex justify-between items-center mb-4 px-4 h-10">
                <div className="font-bold text-white tracking-wider flex items-center gap-2">
                    <span className="text-accent-blue font-mono">HASH_MAP</span>
                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/50">Separate Chaining</span>
                </div>
                <div className="text-white/60 font-mono text-xs bg-white/5 py-1 px-3 rounded-lg border border-white/10">
                    {message}
                </div>
            </div>

            {/* Visualization Area */}
            <div className="flex-1 w-full flex flex-col items-center justify-start p-4 gap-8 relative overflow-hidden">

                {/* Hash Logic Overlay */}
                <AnimatePresence>
                    {hashingVisualization && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-black/90 backdrop-blur-xl border border-accent-blue/30 px-6 py-4 rounded-xl flex items-center gap-4 z-20 shadow-2xl absolute top-10"
                        >
                            <span className="text-xs text-white/40 font-bold uppercase">Hash Process</span>
                            <div className="w-px h-6 bg-white/10" />
                            <div className="flex items-center gap-2 font-mono text-sm">
                                <span className="text-white">"{hashingVisualization.k}"</span>
                                <ArrowRight className="text-white/20" size={14} />
                                <span className="text-purple-400">code({hashingVisualization.code})</span>
                                <ArrowRight className="text-white/20" size={14} />
                                <span className="text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded">Bucket {hashingVisualization.hash}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Buckets Grid */}
                <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl mt-12">
                    {buckets.map((bucket, i) => (
                        <div key={i} className="flex flex-col gap-0 min-w-[120px]">
                            {/* Bucket Index */}
                            <div
                                className={`
                                    h-10 rounded-t-xl border-t border-l border-r border-white/10 flex items-center justify-center font-bold font-mono transition-colors duration-300 text-sm
                                    ${highlightedBucket === i ? 'bg-accent-blue/20 border-accent-blue text-accent-blue' : 'bg-white/5 text-white/40'}
                                `}
                            >
                                [{i}]
                            </div>

                            {/* Chain Container */}
                            <div
                                className={`
                                    min-h-[180px] bg-black/20 border-b border-l border-r border-white/5 rounded-b-xl p-2 flex flex-col gap-2 relative transition-colors duration-300
                                    ${highlightedBucket === i ? 'border-accent-blue/30 bg-accent-blue/5' : ''}
                                `}
                            >
                                <AnimatePresence mode="popLayout">
                                    {bucket.map((entry, idx) => (
                                        <motion.div
                                            key={entry.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="relative"
                                        >
                                            <div className="bg-white/10 border border-white/10 rounded-lg p-2 text-xs font-mono relative group hover:bg-white/20 transition-colors cursor-pointer">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-emerald-400 font-bold max-w-[80px] truncate">{entry.key}</span>
                                                </div>
                                                <div className="text-white/70 truncate border-t border-white/10 pt-1 mt-1 font-sans">{entry.value}</div>
                                            </div>

                                            {/* Chain Link Visual */}
                                            {idx < bucket.length - 1 && (
                                                <div className="h-3 flex justify-center items-center">
                                                    <div className="w-0.5 h-full bg-white/20" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {bucket.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/5 text-[10px] italic pointer-events-none">
                                        NULL
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-6 rounded-[24px] border border-white/10 flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex gap-2 w-1/2">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[9px] uppercase font-bold text-white/30">Key</label>
                            <input type="text" value={inputKey} onChange={(e) => setInputKey(e.target.value)} placeholder="Key" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-white font-mono focus:outline-none focus:border-accent-blue/50 text-sm" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[9px] uppercase font-bold text-white/30">Value</label>
                            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Val" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-white font-mono focus:outline-none focus:border-accent-blue/50 text-sm" />
                        </div>
                    </div>

                    <div className="flex-1 flex gap-2 items-end">
                        <button onClick={handlePut} disabled={isAnimating} className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 justify-center flex-1 h-10 transition-all disabled:opacity-50">
                            <Plus size={14} /> Put
                        </button>
                        <button onClick={handleGet} disabled={isAnimating} className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 justify-center flex-1 h-10 transition-all disabled:opacity-50">
                            <Search size={14} /> Get
                        </button>
                        <button onClick={handleRemove} disabled={isAnimating} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 justify-center flex-1 h-10 transition-all disabled:opacity-50">
                            <Trash2 size={14} /> Del
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4 text-center">
                    <div>
                        <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest mb-1">Avg Access</div>
                        <div className="text-emerald-400 font-mono text-xs">O(1)</div>
                    </div>
                    <div>
                        <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest mb-1">Worst Case</div>
                        <div className="text-pink-400 font-mono text-xs">O(N)</div>
                    </div>
                    <div>
                        <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest mb-1">Space</div>
                        <div className="text-blue-400 font-mono text-xs">O(N)</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HashMapVisualizer
