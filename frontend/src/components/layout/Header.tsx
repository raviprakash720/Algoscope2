import React from 'react'
import { Orbit } from 'lucide-react'

const Header: React.FC = () => {
    return (
        <header className="h-16 border-b border-white/10 flex items-center px-6 justify-between bg-background/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
                <Orbit className="text-accent-blue w-8 h-8 animate-pulse" />
                <h1 className="text-xl font-bold tracking-tight glow-text">
                    Algo<span className="text-accent-blue">Scope</span>
                </h1>
            </div>
            <div className="flex items-center gap-6">
                <nav className="flex items-center gap-6 text-sm font-medium text-white/60">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-accent-blue/40 border-r border-white/10 pr-6 mr-2">
                        Lab Environment
                    </span>
                </nav>
                <div className="h-6 w-[1px] bg-white/10" />
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-md text-sm transition-all h-10">
                    Portfolio
                </button>
            </div>
        </header>
    )
}

export default Header
