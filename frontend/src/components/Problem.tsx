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
        <div className="equation flex items-center gap-3 text-2xl flex-wrap">
          <strong className="text-2xl w-8 text-center">{a}</strong>
          <span className="op text-2xl">{op === '*' ? '×' : op}</span>
          <strong className="text-2xl w-8 text-center">{b}</strong>
          <span className="text-2xl">=</span>
          <input
            aria-label="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            inputMode="numeric"
            className="answer p-3 rounded-lg border border-slate-200 text-center text-lg w-full sm:w-36"
          />
        </div>

        <div className="controls mt-4 flex flex-col sm:flex-row sm:gap-3 gap-2">
          <button type="submit" className="px-4 py-2 rounded-lg bg-accent text-white font-semibold" >
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
