import React, { useEffect, useState } from 'react'

type Props = {
  level: number
  allowedOperators?: Array<'+' | '-' | '*'>
  onCorrect?: () => void
  onSkip?: () => void
}

function randomInt(max: number) {
  return Math.floor(Math.random() * (max + 1))
}

const correctMessages = [
  'Nice job!',
  'Awesome!',
  'Perfect!',
  'Great work!',
  'You got it!',
  'Fantastic!',
  'Well done!',
  'Excellent!',
  'Amazing!',
  'You\'re a star!',
  'Brilliant!',
  'Super!',
]

const incorrectMessages = [
  'Try again',
  'Not quite, try once more',
  'Give it another shot',
  'Almost there!',
  'Keep trying!',
  'Think it through',
  'You can do it!',
]

function getRandomMessage(messages: string[]) {
  return messages[randomInt(messages.length - 1)]
}

export default function Problem({ level, allowedOperators, onCorrect, onSkip }: Props) {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [op, setOp] = useState<'+' | '-' | '*'>('+' )
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [buttonState, setButtonState] = useState<'default' | 'correct' | 'incorrect'>('default')

  function makeProblem() {
    let max = 5
    if (level === 2) max = 10
    if (level === 3) max = 20
    let aa = randomInt(max) + 1
    let bb = randomInt(max) + 1
    const ops = allowedOperators && allowedOperators.length > 0 ? allowedOperators : ['+', '-', '*']
    // pick randomly from allowed ops
    const opChoice = ops[randomInt(ops.length - 1)] as '+' | '-' | '*'
    
    // For subtraction, ensure a >= b so we don't get negative results
    if (opChoice === '-' && aa < bb) {
      [aa, bb] = [bb, aa]
    }
    
    setA(aa)
    setB(bb)
    setOp(opChoice)
    setAnswer('')
    setMessage('')
    setButtonState('default')
  }

  useEffect(() => {
    makeProblem()
    // regenerate when difficulty changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  function expected() {
    if (op === '+') return a + b
    if (op === '-') return a - b
    return a * b
  }

  function handleCheck(e?: React.FormEvent) {
    e?.preventDefault()
    const num = Number(answer.trim())
    if (Number.isNaN(num)) {
      setMessage('Please enter a number')
      setButtonState('default')
      return
    }
    if (num === expected()) {
      setMessage(getRandomMessage(correctMessages))
      setButtonState('correct')
      onCorrect?.()
      setTimeout(makeProblem, 700)
    } else {
      setMessage(getRandomMessage(incorrectMessages))
      setButtonState('incorrect')
    }
  }

  function handleSkipClick() {
    onSkip?.()
    makeProblem()
  }

  return (
    <section className="problem">
      <form onSubmit={handleCheck}>
        <div className="flex flex-col items-center gap-6 mb-4">
          <div className="flex items-center justify-center gap-3 text-2xl">
            <strong className="text-2xl w-8 text-center">{a}</strong>
            <span className="op text-2xl">{op === '*' ? '×' : op}</span>
            <strong className="text-2xl w-8 text-center">{b}</strong>
            <span className="text-2xl">=</span>
          </div>
          <input
            aria-label="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            inputMode="numeric"
            className="answer p-3 rounded-lg border border-slate-200 text-center text-lg w-full sm:w-36 mt-2"
          />
        </div>

        <div className="controls flex flex-col sm:flex-row sm:gap-3 gap-2">
          <button 
            type="submit" 
            className={`px-4 py-2 rounded-lg font-semibold ${
              buttonState === 'correct' 
                ? 'bg-green-500 text-white' 
                : buttonState === 'incorrect' 
                ? 'bg-red-500 text-white' 
                : 'bg-accent text-white'
            }`}
          >
            Check
          </button>
          <button type="button" className="px-4 py-2 rounded-lg bg-slate-100 text-accent font-semibold" onClick={handleSkipClick}>
            Skip
          </button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </section>
  )
}
