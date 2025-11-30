import React, { useState } from 'react'
import Header from './components/Header'
import Problem from './components/Problem'

type GameMode = 'practice' | 'quiz'

export default function App() {
  const [started, setStarted] = useState(false)
  const [gameMode, setGameMode] = useState<GameMode>('practice')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  // Default to a Simple mode (plus/minus only) on initial load
  const [operators, setOperators] = useState<Array<'+' | '-' | '*'>>(['+', '-'])
  
  // Quiz mode state
  const [quizProblems, setQuizProblems] = useState(10)
  const [quizProgress, setQuizProgress] = useState(0)
  const [quizCorrect, setQuizCorrect] = useState(0)
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null)
  const [quizEndTime, setQuizEndTime] = useState<number | null>(null)

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

  function handleStart(mode: GameMode) {
    // Ensure at least one operator is selected
    if (operators.length === 0) {
      setOperators(['+'])
    }
    setGameMode(mode)
    if (mode === 'quiz') {
      setQuizProgress(0)
      setQuizCorrect(0)
      setQuizStartTime(Date.now())
      setQuizEndTime(null)
    } else {
      setScore(0)
    }
    setStarted(true)
  }
  
  function handleQuizCorrect() {
    setQuizCorrect((c) => c + 1)
    setQuizProgress((p) => p + 1)
    if (quizProgress + 1 >= quizProblems) {
      setQuizEndTime(Date.now())
    }
  }
  
  function handleQuizNext() {
    setQuizProgress((p) => p + 1)
    if (quizProgress + 1 >= quizProblems) {
      setQuizEndTime(Date.now())
    }
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
                  Game Mode
                </label>
                <div className="flex gap-4 mb-6">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="practice"
                      checked={gameMode === 'practice'}
                      onChange={(e) => setGameMode(e.target.value as GameMode)}
                      className="mr-2"
                    />
                    Practice Mode
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="quiz"
                      checked={gameMode === 'quiz'}
                      onChange={(e) => setGameMode(e.target.value as GameMode)}
                      className="mr-2"
                    />
                    Timed Quiz
                  </label>
                </div>
              </div>

              {gameMode === 'quiz' && (
                <div className="setting-group">
                  <label className="block text-lg font-semibold mb-3">
                    Number of Problems
                  </label>
                  <select 
                    value={quizProblems} 
                    onChange={(e) => setQuizProblems(parseInt(e.target.value, 10))}
                    className="w-full p-3 rounded-lg border border-slate-300 text-lg"
                  >
                    <option value={5}>5 problems</option>
                    <option value={10}>10 problems</option>
                    <option value={15}>15 problems</option>
                    <option value={20}>20 problems</option>
                  </select>
                </div>
              )}

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
                onClick={() => handleStart(gameMode)}
                className="w-full mt-12 px-4 py-2 rounded-lg bg-accent text-white font-semibold"
                disabled={operators.length === 0}
              >
                {gameMode === 'quiz' ? 'Start Quiz! ⏱️' : 'Start Practice! 🚀'}
              </button>
            </div>
          </div>
        </main>
        <footer className="footer">Built with ❤️ for curious kids</footer>
      </div>
    )
  }

  // Show quiz results
  if (gameMode === 'quiz' && quizEndTime !== null && quizStartTime !== null) {
    const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000)
    const minutes = Math.floor(timeTaken / 60)
    const seconds = timeTaken % 60
    const percentage = Math.round((quizCorrect / quizProblems) * 100)
    
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 px-3 sm:px-4">
        <main className="mx-auto w-full max-w-[860px] p-0 bg-white rounded-xl shadow-md my-4 sm:my-5 app-card overflow-hidden">
          <Header />
          <div className="p-6 sm:p-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Quiz Complete! 🎉</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <div className="text-5xl font-bold text-accent mb-2">{percentage}%</div>
                <div className="text-lg text-slate-600">Accuracy</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{quizCorrect}</div>
                  <div className="text-sm text-slate-600">Correct</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{quizProblems - quizCorrect}</div>
                  <div className="text-sm text-slate-600">Incorrect</div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {minutes > 0 ? `${minutes}m ` : ''}{seconds}s
                </div>
                <div className="text-sm text-slate-600">Time Taken</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleStart('quiz')}
                className="flex-1 px-4 py-2 rounded-lg bg-accent text-white font-semibold"
              >
                Try Again
              </button>
              <button
                onClick={() => setStarted(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold"
              >
                Back to Settings
              </button>
            </div>
          </div>
        </main>
        <footer className="footer">Built with ❤️ for curious kids</footer>
      </div>
    )
  }

  // Show main practice or quiz page
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
            <div className="score text-sm font-semibold">
              {gameMode === 'quiz' 
                ? `Question ${quizProgress + 1}/${quizProblems}` 
                : `Score: ${score}`}
            </div>
          </div>

          <Problem 
            level={level} 
            allowedOperators={operators} 
            onCorrect={gameMode === 'quiz' ? handleQuizCorrect : handleCorrect} 
            onSkip={gameMode === 'quiz' ? handleQuizNext : handleSkip} 
          />
        </div>
      </main>

      <footer className="footer">Built with ❤️ for curious kids</footer>
    </div>
  )
}
