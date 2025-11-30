import React, { useState } from 'react'
import Header from './components/Header'
import Problem from './components/Problem'

export default function App() {
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  // Default to a Simple mode (plus/minus only) on initial load
  const [operators, setOperators] = useState<Array<'+' | '-' | '*'>>(['+', '-'])

  function handleCorrect() {
    setScore((s) => s + 1)
  }

  function handleSkip() {
    setScore((s) => (s > 0 ? s - 1 : 0))
  }

  function handleLevelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = parseInt(e.target.value, 10)
    setLevel(v)
    // when user picks our "Simple" level, keep interface easy (only + and -)
    if (v === 1) setOperators(['+', '-'])
    else if (operators.length === 2 && operators.includes('+') && operators.includes('-')) {
      // if previously in simple mode, expand operators for higher difficulty
      setOperators(['+', '-', '*'])
    }
  }

  function handleStart() {
    // Ensure at least one operator is selected
    if (operators.length === 0) {
      setOperators(['+'])
    }
    setStarted(true)
  }

  // Show settings page before starting
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 px-3 sm:px-4">
        <main className="mx-auto w-full max-w-[860px] p-0 bg-white rounded-xl shadow-md my-4 sm:my-5 app-card overflow-hidden">
          <Header />
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Settings</h2>
            
            <div className="space-y-6">
              <div className="setting-group">
                <label className="block text-lg font-semibold mb-3">
                  Difficulty Level
                </label>
                <select 
                  value={level} 
                  onChange={handleLevelChange}
                  className="w-full p-3 rounded-lg border border-slate-300 text-lg"
                >
                  <option value={1}>Simple (numbers 1-5)</option>
                  <option value={2}>Medium (numbers 1-10)</option>
                  <option value={3}>Hard (numbers 1-20)</option>
                </select>
              </div>

              <div className="setting-group">
                <label className="block text-lg font-semibold mb-3">
                  Choose Operators
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={operators.includes('+')}
                      onChange={(e) => {
                        setOperators((prev) =>
                          e.target.checked ? Array.from(new Set([...prev, '+'])) : prev.filter((o) => o !== '+')
                        )
                      }}
                      className="w-5 h-5"
                    />
                    Addition (+)
                  </label>
                  <label className="flex items-center gap-2 text-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={operators.includes('-')}
                      onChange={(e) => {
                        setOperators((prev) =>
                          e.target.checked ? Array.from(new Set([...prev, '-'])) : prev.filter((o) => o !== '-')
                        )
                      }}
                      className="w-5 h-5"
                    />
                    Subtraction (−)
                  </label>
                  <label className="flex items-center gap-2 text-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={operators.includes('*')}
                      onChange={(e) => {
                        setOperators((prev) =>
                          e.target.checked ? Array.from(new Set([...prev, '*'])) : prev.filter((o) => o !== '*')
                        )
                      }}
                      className="w-5 h-5"
                    />
                    Multiplication (×)
                  </label>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full mt-8 px-6 py-4 rounded-lg bg-accent text-white font-bold text-xl"
                disabled={operators.length === 0}
              >
                Start Practice! 🚀
              </button>
            </div>
          </div>
        </main>
        <footer className="footer">Built with ❤️ for curious kids</footer>
      </div>
    )
  }

  // Show main practice page
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 px-3 sm:px-4">
      <main className="mx-auto w-full max-w-[860px] p-0 bg-white rounded-xl shadow-md my-4 sm:my-5 app-card overflow-hidden">
        <Header />
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 px-2 sm:px-0">
            <button
              onClick={() => setStarted(false)}
              className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold"
            >
              ← Settings
            </button>
            <div className="score text-sm font-semibold">Score: {score}</div>
          </div>

          <Problem level={level} allowedOperators={operators} onCorrect={handleCorrect} onSkip={handleSkip} />
        </div>
      </main>

      <footer className="footer">Built with ❤️ for curious kids</footer>
    </div>
  )
}
