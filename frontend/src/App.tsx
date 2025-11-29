import React, { useState } from 'react'
import Header from './components/Header'
import Problem from './components/Problem'

export default function App() {
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-[860px] p-4 sm:p-6 bg-white rounded-xl shadow-md my-5 app-card">
        <section className="controls flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <label>
            Difficulty:
            <select value={level} onChange={handleLevelChange}>
              <option value={1}>Simple</option>
              <option value={2}>Medium</option>
              <option value={3}>Hard</option>
            </select>
          </label>

          <div className="operator-options flex items-center gap-2" aria-hidden={false}>
            <label className="text-sm text-slate-700 mr-2">Operators:</label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={operators.includes('+')}
                onChange={(e) => {
                  setOperators((prev) =>
                    e.target.checked ? Array.from(new Set([...prev, '+'])) : prev.filter((o) => o !== '+')
                  )
                }}
              />
              +
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={operators.includes('-')}
                onChange={(e) => {
                  setOperators((prev) =>
                    e.target.checked ? Array.from(new Set([...prev, '-'])) : prev.filter((o) => o !== '-')
                  )
                }}
              />
              -
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={operators.includes('*')}
                onChange={(e) => {
                  setOperators((prev) =>
                    e.target.checked ? Array.from(new Set([...prev, '*'])) : prev.filter((o) => o !== '*')
                  )
                }}
              />
              ×
            </label>
          </div>
          <div className="score text-sm font-semibold">Score: {score}</div>
        </section>

        <Problem level={level} allowedOperators={operators} onCorrect={handleCorrect} onSkip={handleSkip} />
      </main>

      <footer className="footer">Built with ❤️ for curious kids</footer>
    </div>
  )
}
