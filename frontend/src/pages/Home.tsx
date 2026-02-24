import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Trophy, Briefcase, Play, Network, Cpu, Database, ChevronDown } from 'lucide-react'

const Home: React.FC = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="flex-1 overflow-y-auto bg-[#38124A] relative flex flex-col font-outfit text-white h-full custom-scrollbar selection:bg-[#EC4186]/30">

            {/* Glowing Orbs Background (Fixed) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#EC4186]/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#EE544A]/10 blur-[150px] rounded-full" />
            </div>

            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 bg-[#38124A]/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EC4186]/20 flex items-center justify-center border border-[#EC4186]/30">
                        <Play size={16} className="text-[#EC4186] fill-current" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white hover:text-[#EC4186] transition-colors">Algoscope</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/60">
                    <button onClick={() => scrollToSection('curriculum')} className="hover:text-white transition-colors tracking-wide">Curriculum</button>
                    <button onClick={() => scrollToSection('engine')} className="hover:text-white transition-colors tracking-wide">Engine</button>
                    <button onClick={() => scrollToSection('map')} className="hover:text-white transition-colors tracking-wide">Cognitive Map</button>
                    <button onClick={() => scrollToSection('timeline')} className="hover:text-white transition-colors tracking-wide">Timeline</button>
                    <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors tracking-wide">FAQ</button>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/problems" className="px-6 py-2.5 bg-[#EC4186] hover:bg-[#d63a78] text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(236,65,134,0.4)]">
                        Enter Library
                    </Link>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="relative z-10">

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-8 py-32 pt-48 flex flex-col lg:flex-row items-center gap-16 min-h-[85vh]">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-left"
                    >
                        <div className="text-[#EC4186] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                            The Future of Algorithm Design
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6">
                            Master the<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC4186] to-[#EE544A]">Invisible Logic</span>
                        </h1>

                        <p className="text-xl text-white/70 max-w-lg mb-10 leading-relaxed font-light">
                            Unlock multi-dimensional algorithm mastery through advanced neural visualization and interactive coding labs.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link to="/problems" className="px-8 py-4 bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_10px_30px_-10px_rgba(236,65,134,0.6)] flex items-center gap-3">
                                Start Learning
                            </Link>
                            <button onClick={() => scrollToSection('engine')} className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/10 backdrop-blur-md">
                                View Engine
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Clean Dashboard Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 w-full relative"
                    >
                        <div className="bg-[#2b0d38] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] relative">
                            {/* Browser-like Header */}
                            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-[#21092b]">
                                <div className="w-3 h-3 rounded-full bg-[#EC4186]" />
                                <div className="w-3 h-3 rounded-full bg-[#EE544A]" />
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                            </div>

                            {/* Mock Code & Visualization Area */}
                            <div className="p-6 h-[350px] flex flex-col gap-4 relative">
                                <div className="h-8 w-1/3 bg-white/10 rounded-md mb-2" />
                                <div className="h-4 w-2/3 bg-white/5 rounded-md" />
                                <div className="h-4 w-1/2 bg-white/5 rounded-md" />
                                <div className="h-4 w-3/4 bg-white/5 rounded-md" />

                                <div className="mt-auto h-32 flex items-end gap-3 opacity-80">
                                    <div className="flex-1 h-full bg-[#EC4186]/20 border border-[#EC4186]/30 rounded-lg flex items-end p-2">
                                        <div className="w-full h-[60%] bg-[#EC4186]/50 rounded animate-pulse" />
                                    </div>
                                    <div className="flex-1 h-[80%] bg-[#EE544A]/20 border border-[#EE544A]/30 rounded-lg flex items-end p-2">
                                        <div className="w-full h-[80%] bg-[#EE544A]/50 rounded animate-pulse delay-75" />
                                    </div>
                                    <div className="flex-1 h-[60%] bg-white/10 border border-white/20 rounded-lg flex items-end p-2">
                                        <div className="w-full h-[40%] bg-white/30 rounded animate-pulse delay-150" />
                                    </div>
                                </div>

                                {/* Status Indicator Layer */}
                                <div className="absolute bottom-4 left-4 bg-[#14051E]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#EC4186] shadow-[0_0_8px_rgba(236,65,134,1)] animate-pulse" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-white">System Online: Live Processing</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tri-Layer Curriculum */}
                <div id="curriculum" className="py-24 relative overflow-hidden bg-[#2b0d38]/30">
                    <div className="max-w-7xl mx-auto px-8 text-center">
                        <h2 className="text-4xl font-bold mb-4 text-white">The Tri-Layer Curriculum</h2>
                        <p className="text-white/60 max-w-2xl mx-auto mb-16 text-lg">
                            A tiered approach to mastery, scaling from foundational principles to elite industry application.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <CurriculumCard
                                icon={GraduationCap}
                                title="Academic Layer"
                                desc="Deep dive into foundational theory, mathematical proofs, and Big O complexity analysis. The 'Why' behind every bit."
                                features={['Data Structures', 'Complexity Proofs']}
                            />
                            <CurriculumCard
                                icon={Trophy}
                                title="Competitive Layer"
                                desc="Advanced heuristics, optimization tricks, and speed-coding patterns used in world-class programming contests."
                                features={['Bit Manipulation', 'Advanced DP']}
                                highlight={true}
                            />
                            <CurriculumCard
                                icon={Briefcase}
                                title="Interview Layer"
                                desc="Industry-level problem-solving patterns. Learn to articulate complex logic clearly under pressure."
                                features={['System Design', 'Behavioral Coding']}
                            />
                        </div>
                    </div>
                </div>

                {/* Real-Time Visualization Engine */}
                <div id="engine" className="py-24">
                    <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-16">
                        {/* Left: Minimal Graphic */}
                        <div className="flex-1 w-full bg-[#2b0d38] border border-[#EC4186]/30 rounded-3xl p-8 shadow-[0_20px_40px_-10px_rgba(236,65,134,0.15)] h-[400px] flex items-center justify-center relative">
                            {/* Simple Visual Abstract */}
                            <div className="w-full max-w-[300px] space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#EC4186] shadow-lg flex items-center justify-center text-white font-bold">1</div>
                                    <div className="h-2 flex-1 bg-white/10 rounded-full">
                                        <div className="h-full w-[80%] bg-[#EC4186] rounded-full" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#EE544A] shadow-lg flex items-center justify-center text-white font-bold">2</div>
                                    <div className="h-2 flex-1 bg-white/10 rounded-full">
                                        <div className="h-full w-[50%] bg-[#EE544A] rounded-full" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 shadow-lg flex items-center justify-center text-white font-bold">3</div>
                                    <div className="h-2 flex-1 bg-white/10 rounded-full">
                                        <div className="h-full w-[30%] bg-white/30 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Real-Time<br /><span className="text-[#EC4186]">Visualization Engine</span></h2>
                            <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-md">
                                Watch code come to life. Our engine translates abstract logic into interactive, dynamic structures that you can manipulate in real-time.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                <EngineFeature icon={Network} title="Recursion Trees" desc="Map state intuitively" />
                                <EngineFeature icon={Database} title="Graph Traversal" desc="Live node mapping" />
                                <EngineFeature icon={Cpu} title="Performance" desc="Real CPU simulation" />
                                <EngineFeature icon={Play} title="Memory Heatmaps" desc="Visual allocation" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cognitive Map */}
                <div id="map" className="py-24 bg-[#2b0d38]/30">
                    <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 order-2 lg:order-1">
                            <h2 className="text-4xl font-bold mb-4">3D Mastery Tracking:<br />The Cognitive Map</h2>
                            <p className="text-white/60 mb-10 text-lg leading-relaxed max-w-md">
                                Forget linear progress bars. See your knowledge as an evolving neural network. Connect concepts, identify weak nodes, and expand your logic universe.
                            </p>

                            <div className="space-y-4 max-w-md">
                                <ProgressItem title="Array Structures" status="Mastered (100%)" type="success" />
                                <ProgressItem title="Graph Theory" status="In Progress (34%)" type="info" />
                                <ProgressItem title="Dynamic Programming" status="Locked" type="locked" />
                            </div>
                        </div>

                        {/* Right: Graphic */}
                        <div className="flex-1 order-1 lg:order-2 flex justify-center w-full">
                            <div className="w-[300px] h-[300px] rounded-full border-4 border-[#EC4186]/20 flex items-center justify-center relative">
                                <div className="w-[200px] h-[200px] rounded-full border-2 border-dashed border-[#EE544A]/40 flex items-center justify-center animate-spin-slow">
                                    <div className="w-[100px] h-[100px] rounded-full bg-[#EC4186]/20 backdrop-blur border border-[#EC4186]/50 flex items-center justify-center">
                                        <Network className="text-[#EC4186] w-10 h-10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div id="timeline" className="py-24">
                    <div className="max-w-3xl mx-auto px-8 text-center">
                        <h2 className="text-4xl font-bold mb-4">The Evolution Timeline</h2>
                        <p className="text-white/60 mb-20 text-lg">
                            Track the lineage of algorithms from 1950s foundations to modern-day machine learning giants.
                        </p>

                        <div className="relative border-l-2 border-[#EC4186]/30 ml-4 md:ml-1/2 md:-translate-x-px">
                            <TimelineEvent
                                year="1945"
                                title="Merge Sort"
                                desc="John von Neumann introduces the divide and conquer strategy."
                                align="right"
                            />
                            <TimelineEvent
                                year="1959"
                                title="Dijkstra's Algorithm"
                                desc="Edsger W. Dijkstra solves the shortest path problem."
                                align="left"
                            />
                            <TimelineEvent
                                year="2010+"
                                title="Transformer Architecture"
                                desc="Attention mechanisms redefine computational linguistics."
                                align="right"
                            />
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div id="faq" className="py-24 bg-[#2b0d38]/30">
                    <div className="max-w-4xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-white/60 text-lg">Everything you need to know about the Algoscope platform.</p>
                        </div>

                        <div className="space-y-4">
                            <FAQItem
                                question="What is Algoscope?"
                                answer="Algoscope is an interactive learning platform designed to help students and developers master data structures and algorithms through real-time visualization, moving beyond static textbooks to dynamic execution."
                            />
                            <FAQItem
                                question="Does Algoscope provide answers to the questions?"
                                answer="Yes. Algoscope provides optimal solutions, brute-force approaches, detailed explanations, and most importantly, interactive step-by-step visual breakdowns of how the algorithm executes."
                            />
                            <FAQItem
                                question="How does it help students?"
                                answer="By bridging the gap between abstract code and concrete understanding. Students can pause, rewind, and step through complex logic, building a stronger intuition for problem-solving."
                            />
                            <FAQItem
                                question="Do I need to install anything?"
                                answer="No installation is required. The entire visualization environment runs natively in your browser, powered by advanced client-side processing."
                            />
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="py-32 px-8">
                    <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#EC4186] to-[#EE544A] rounded-3xl p-12 md:p-20 text-center text-white shadow-[0_20px_60px_-10px_rgba(236,65,134,0.5)]">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to evolve your logic?</h2>
                        <p className="text-white/90 text-xl font-medium mb-10 max-w-2xl mx-auto">
                            Join elite architects in the laboratory and push the boundaries of algorithmic thought.
                        </p>
                        <Link to="/problems" className="block w-full max-w-md mx-auto py-5 bg-white text-[#EC4186] hover:bg-[#ffeaf2] text-lg font-bold rounded-xl transition-colors shadow-xl">
                            Initialize Learning Session
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-8 border-t border-white/5 bg-[#21092b] text-center text-sm text-white/40">
                    <p>© 2026 Algoscope Laboratory. All rights reserved.</p>
                </footer>

            </div>
        </div>
    )
}

// Subcomponents

const CurriculumCard = ({ icon: Icon, title, desc, features, highlight }: any) => (
    <div className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1
        ${highlight ? 'bg-[#2b0d38] border-[#EC4186]/50 shadow-[0_10px_30px_-5px_rgba(236,65,134,0.2)]' : 'bg-black/20 border-white/10 hover:border-white/20'}
    `}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 
            ${highlight ? 'bg-gradient-to-tr from-[#EC4186] to-[#EE544A] text-white' : 'bg-white/5 text-[#EC4186]'}
        `}>
            <Icon size={20} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-white/60 mb-8 text-sm leading-relaxed min-h-[80px]">{desc}</p>
        <div className="space-y-3">
            {features.map((feat: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#EC4186]/20 flex items-center justify-center text-[#EC4186]">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-xs font-semibold text-white/80">{feat}</span>
                </div>
            ))}
        </div>
    </div>
)

const EngineFeature = ({ icon: Icon, title, desc }: any) => (
    <div className="flex gap-4 items-start">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-[#EC4186]/10 text-[#EC4186] flex items-center justify-center border border-[#EC4186]/20">
            <Icon size={18} strokeWidth={2.5} />
        </div>
        <div>
            <h4 className="font-bold text-white mb-1">{title}</h4>
            <p className="text-sm text-white/50">{desc}</p>
        </div>
    </div>
)

const ProgressItem = ({ title, status, type }: any) => {
    const colors = {
        success: 'bg-[#EC4186]/10 border-[#EC4186]/30 text-[#EC4186]',
        info: 'bg-white/5 border-white/10 text-white/70',
        locked: 'bg-transparent border-dashed border-white/10 text-white/30'
    }[type as 'success' | 'info' | 'locked']

    const badge = {
        success: 'bg-[#EC4186] text-white',
        info: 'bg-white/10 text-white',
        locked: 'hidden'
    }[type as 'success' | 'info' | 'locked']

    return (
        <div className={`p-4 rounded-xl border flex items-center justify-between ${colors} backdrop-blur-sm`}>
            <span className="font-semibold text-sm">{title}</span>
            {type !== 'locked' ? (
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${badge} uppercase tracking-wider`}>
                    {status}
                </span>
            ) : (
                <span className={`text-[10px] font-bold uppercase tracking-wider`}>
                    Locked
                </span>
            )}
        </div>
    )
}

const TimelineEvent = ({ year, title, desc, align }: any) => {
    const isRight = align === 'right'
    return (
        <div className="relative mb-12 last:mb-0 w-full flex items-center justify-start md:justify-center">
            {/* Timeline Dot */}
            <div className="absolute left-[-11px] md:left-1/2 md:-ml-[11px] w-6 h-6 rounded-full bg-[#EC4186] flex items-center justify-center border-4 border-[#38124A] z-10" />

            {/* Content Container */}
            <div className={`w-[calc(100%-2rem)] ml-8 md:ml-0 md:w-[45%] ${isRight ? 'md:ml-auto md:pl-10 text-left' : 'md:mr-auto md:pr-10 text-left md:text-right'}`}>
                <div className="text-[#EE544A] font-black tracking-widest uppercase text-xs mb-1">{year}</div>
                <h4 className="font-bold text-white text-xl mb-2">{title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <div className="border border-white/10 rounded-xl bg-black/20 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <span className="font-bold text-white">{question}</span>
                <ChevronDown size={20} className={`text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {answer}
                </div>
            )}
        </div>
    )
}

export default Home
