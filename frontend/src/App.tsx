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
    <div className="app-root">
      <Header />
      <main className="container">
        <section className="controls">
          <label>
            Difficulty:
            <select value={level} onChange={handleLevelChange}>
              <option value={1}>Simple</option>
              <option value={2}>Medium</option>
              <option value={3}>Hard</option>
            </select>
          </label>

          <div className="operator-options" aria-hidden={false}>
            <label style={{marginLeft:12}}>Operators:</label>
            <label style={{marginLeft:8}}>
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
            <label style={{marginLeft:8}}>
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
            <label style={{marginLeft:8}}>
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
          <div className="score">Score: {score}</div>
        </section>

        <Problem level={level} allowedOperators={operators} onCorrect={handleCorrect} onSkip={handleSkip} />
      </main>

      <footer className="footer">Built with ❤️ for curious kids</footer>
    </div>
  )
}
