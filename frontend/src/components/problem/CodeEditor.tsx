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
        // Always return empty string - no predefined templates
        return "";
    }

    // Set default code when problem changes
    React.useEffect(() => {
        if (currentProblem) {
            setUserCode("") // Always set to empty string when problem changes
        }
    }, [currentProblem, setUserCode])

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
