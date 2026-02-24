import { motion } from 'framer-motion'

interface TreeNode {
    id: string
    value: string | number
    children?: TreeNode[]
    status?: 'pending' | 'active' | 'completed' | 'skipped'
}

interface RecursionTreeVisualizerProps {
    data: TreeNode
    animationSpeed?: number
}

const TreeNodeComponent = ({ node, depth = 0 }: { node: TreeNode, depth?: number }) => {
    return (
        <div className="flex flex-col items-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: node.status === 'active' ? 1.2 : 1,
                    opacity: 1,
                    backgroundColor: node.status === 'active' ? 'rgba(236, 65, 134, 0.4)' :
                        node.status === 'completed' ? 'rgba(238, 84, 74, 0.4)' :
                            'rgba(255, 255, 255, 0.05)'
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center border text-white font-mono text-sm relative z-10 transition-colors
                    ${node.status === 'active' ? 'border-[#EC4186] shadow-[0_0_15px_rgba(236,65,134,0.4)]' : ''}
                    ${node.status === 'completed' ? 'border-[#EE544A] shadow-[0_0_15px_rgba(238,84,74,0.4)]' : 'border-white/10'}
                `}
            >
                {node.value}
            </motion.div>

            {node.children && node.children.length > 0 && (
                <div className="flex gap-8 mt-8 relative">
                    {/* Connecting lines would go here - simplified for CSS-only layout first */}
                    {/* SVG connections could be overlayed, but for now using simple flex layout */}
                    {node.children.map((child) => (
                        <div key={child.id} className="relative">
                            {/* Vertical Line */}
                            <div className="absolute top-[-32px] left-1/2 w-px h-8 bg-white/10 -translate-x-1/2" />
                            <TreeNodeComponent node={child} depth={depth + 1} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const RecursionTreeVisualizer = ({ data }: RecursionTreeVisualizerProps) => {
    return (
        <div className="w-full h-[400px] overflow-auto custom-scrollbar flex items-start justify-center p-8 bg-black/20 rounded-xl border border-white/5">
            <TreeNodeComponent node={data} />
        </div>
    )
}

export default RecursionTreeVisualizer
