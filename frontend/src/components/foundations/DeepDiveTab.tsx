import React from 'react'
import { motion } from 'framer-motion'
import { Database, Binary, Cpu, Layers as LayersIcon, ChevronRight } from 'lucide-react'
import { FoundationModule } from '../../types/foundation'

interface Props {
    module: FoundationModule
}

export const DeepDiveTab: React.FC<Props> = ({ module }) => {
    const deepDive = module.deepDive

    if (!deepDive) {
        return (
            <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
                <p className="text-white/40 italic">Deep Technical Insight coming soon for {module.title}</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Insight */}
            <div className="bg-gradient-to-r from-accent-blue/10 to-transparent p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative z-10 flex gap-6 items-start">
                    <div className="w-14 h-14 bg-accent-blue/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-accent-blue/30">
                        <Cpu className="text-accent-blue" size={28} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">System Architecture</h2>
                        <p className="text-white/60 leading-relaxed text-lg">
                            {deepDive.foundation}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Technical Details */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Engine Component */}
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex items-center gap-3 text-accent-blue">
                            <Binary size={20} />
                            <h3 className="text-sm font-black uppercase tracking-widest">The Engine</h3>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">
                            {deepDive.engine}
                        </p>
                    </div>

                    {/* Storage Component */}
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                        <div className="flex items-center gap-3 text-purple-400">
                            <Database size={20} />
                            <h3 className="text-sm font-black uppercase tracking-widest">Memory & Storage</h3>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">
                            {deepDive.storage}
                        </p>
                    </div>
                </div>

                {/* Right Column: Visual Blueprint */}
                <div className="lg:col-span-2 p-8 rounded-3xl bg-[#0d021f] border border-white/5 relative overflow-hidden flex flex-col min-h-[400px]">
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="flex flex-col">
                            <h3 className="text-xl font-bold text-white">Visual Blueprint</h3>
                            <span className="text-xs text-white/30 uppercase tracking-[0.2em] font-medium">High-Fidelity Schematic</span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                            Real-Time Mapping
                        </div>
                    </div>

                    {/* Schematic Visualization Area */}
                    <div className="flex-grow flex flex-col justify-center relative">
                        <div className="space-y-6">
                            {deepDive.visualization.layers.map((layer, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex items-center gap-6 group cursor-default"
                                >
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-accent-blue/50 transition-colors">
                                        <LayersIcon size={20} className="text-white/40 group-hover:text-accent-blue transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-white font-bold group-hover:text-accent-blue transition-colors flex items-center gap-2">
                                            {layer.name}
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent-blue" />
                                        </h4>
                                        <p className="text-white/30 text-xs tracking-wide">{layer.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Abstract background graphics representative of the type */}
                        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                            {deepDive.visualization.type === 'memory_grid' && (
                                <div className="grid grid-cols-4 gap-2">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className="w-8 h-8 border border-accent-blue rounded-sm" />
                                    ))}
                                </div>
                            )}
                            {deepDive.visualization.type === 'pointer_web' && (
                                <div className="relative w-32 h-32">
                                    <div className="absolute top-0 left-0 w-8 h-8 bg-accent-blue rounded-full" />
                                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-accent-blue rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-accent-blue -rotate-45 origin-left -translate-x-1/2" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Abstract Footer Info */}
                    <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                        <div className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
                            Architecture: x64/ARM Optimized
                        </div>
                        <div className="text-[10px] text-white/20 uppercase tracking-widest font-bold text-right">
                            Access Pattern: {module.visualizerType === 'array' ? 'O(1) Direct' : 'Sequential Branch'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
