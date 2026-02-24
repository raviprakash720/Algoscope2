import { motion } from 'framer-motion'

interface Node {
    id: string
    x: number
    y: number
    label: string
    status: 'unvisited' | 'visiting' | 'visited' | 'target'
}

interface Edge {
    source: string
    target: string
    visited: boolean
}

interface GraphVisualizerProps {
    nodes: Node[]
    edges: Edge[]
}

const GraphVisualizer = ({ nodes, edges }: GraphVisualizerProps) => {
    return (
        <div className="w-full h-[400px] relative bg-black/20 rounded-xl border border-white/5 overflow-hidden">
            <svg className="w-full h-full absolute inset-0 pointer-events-none">
                {edges.map((edge, i) => {
                    const sourceNode = nodes.find(n => n.id === edge.source)
                    const targetNode = nodes.find(n => n.id === edge.target)
                    if (!sourceNode || !targetNode) return null

                    return (
                        <motion.line
                            key={i}
                            x1={sourceNode.x}
                            y1={sourceNode.y}
                            x2={targetNode.x}
                            y2={targetNode.y}
                            stroke={edge.visited ? "#FFFFFF" : "rgba(255,255,255,0.2)"}
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    )
                })}
            </svg>

            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        left: node.x,
                        top: node.y,
                        x: '-50%',
                        y: '-50%'
                    }}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center border font-bold text-sm transition-all duration-300
                        ${node.status === 'visiting' ? 'bg-[#EC4186]/20 border-[#EC4186] text-[#EC4186] shadow-[0_0_15px_rgba(236,65,134,0.3)]' :
                            node.status === 'visited' ? 'bg-[#EE544A]/20 border-[#EE544A] text-[#EE544A]' :
                                node.status === 'target' ? 'bg-white/10 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' :
                                    'bg-[#38124A]/40 border-white/5 text-white/30'}
                    `}
                >
                    {node.label}
                </motion.div>
            ))}
        </div>
    )
}

export default GraphVisualizer
