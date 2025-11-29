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

export default function Problem({ level, allowedOperators, onCorrect, onSkip }: Props) {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [op, setOp] = useState<'+' | '-' | '*'>('+' )
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')

  function makeProblem() {
    let max = 5
    if (level === 2) max = 10
    if (level === 3) max = 20
    const aa = randomInt(max) + 1
    const bb = randomInt(max) + 1
    const ops = allowedOperators && allowedOperators.length > 0 ? allowedOperators : ['+', '-', '*']
    // pick randomly from allowed ops
    const opChoice = ops[randomInt(ops.length - 1)]
    setA(aa)
    setB(bb)
    setOp(opChoice)
    setAnswer('')
    setMessage('')
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
    if (Number.isNaN(num)) return setMessage('Please enter a number')
    if (num === expected()) {
      setMessage('Nice job!')
      onCorrect?.()
      setTimeout(makeProblem, 700)
    } else {
      setMessage('Try again')
    }
  }

  function handleSkipClick() {
    onSkip?.()
    makeProblem()
  }

  return (
    <section className="problem">
      <form onSubmit={handleCheck}>
        <div className="equation">
          <strong>{a}</strong>
          <span className="op">{op === '*' ? '×' : op}</span>
          <strong>{b}</strong>
          <span>=</span>
          <input
            aria-label="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            inputMode="numeric"
            className="answer"
          />
        </div>

        <div className="controls">
          <button type="submit" className="btn primary">
            Check
          </button>
          <button type="button" className="btn" onClick={handleSkipClick}>
            Skip
          </button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </section>
  )
}
