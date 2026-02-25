import React from 'react'
import Editor from '@monaco-editor/react'
import { useStore } from '../../store/useStore'

interface CodeEditorProps {
    height?: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({ height = '400px' }) => {
    const userCode = useStore(state => state.codeExecution.userCode)
    const setUserCode = useStore(state => state.setUserCode)
    const currentProblem = useStore(state => state.currentProblem)

    // Generate default code template based on problem
    const getDefaultCode = () => {
        if (!currentProblem) return '// Write your solution here\nfunction solve(input) {\n  // Your code here\n}'
        
        const problemSlug = currentProblem.slug
        
        // Two Sum template
        if (problemSlug === 'two-sum') {
            return `// Two Sum Solution
// Input: [nums, target] where nums is an array and target is a number
// Output: indices of the two numbers that add up to target

function solve(input) {
  const [nums, target] = input;
  
  // Write your solution here
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`
        }
        
        // Default template
        return `// ${currentProblem.title}
// Difficulty: ${currentProblem.difficulty}

function solve(input) {
  // Write your solution here
  
}`
    }

    // Set default code when problem changes
    React.useEffect(() => {
        if (currentProblem && !userCode) {
            setUserCode(getDefaultCode())
        }
    }, [currentProblem])

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setUserCode(value)
        }
    }

    return (
        <div className="w-full h-full border border-white/10 rounded-xl overflow-hidden bg-[#1e1e1e]">
            <Editor
                height={height}
                defaultLanguage="javascript"
                value={userCode}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                    fontFamily: 'JetBrains Mono, Fira Code, monospace',
                    fontLigatures: true,
                }}
            />
        </div>
    )
}

export default CodeEditor
