import React, { useState } from 'react'

const Button = ({ handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback yet
      </div>
    )
  }
  return (
    <div>
      <table>
        <Statistic text='Good' value={props.good} />
        <Statistic text='Neutral' value={props.neutral} />
        <Statistic text='Bad' value={props.bad} />
        <Statistic text='All' value={props.all} />
        <Statistic text='Average' value={props.average / props.all} />
        <Statistic text='Positive' value={100 * props.good / props.all} />
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => {
  if (text === 'Positive') {
    return (
      <div>
        <tr><td>
          {text} {value} %
        </td></tr>
      </div>
    )
  }
  return (
    <div>
        <tr><td>
          {text} {value}
        </td></tr>
    </div>
  )
}


const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }

  return (
    <>
      <h1>
        Give feedback!
      </h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics:</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}/>
    </>
  )
}

export default App

