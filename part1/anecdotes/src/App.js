import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
      <button onClick={handleClick}>
        {text}
      </button>
  )
}

const Votes = ({ points, index }) => {
  return (
    <div>
      has {points[index]} votes
    </div>
  )
}

const Anecdote = ({ anecdotes, index }) => <div>{anecdotes[index]}</div>

const Header = ({ text }) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const [maxIndex, setMaxIndex] = useState(0)

  const handleClick = () => {
    setSelected(Math.round((Math.random() * 5)))
  }

  const handleClickVote = () => {
    const copy = { ...points }
    copy[selected] += 1
    setPoints(copy)
    setMaxIndex(maxValueIndex)
  }

  function maxValueIndex() {

    const copy = { ...points}
    var max = copy[0]
    var maxIndex = 0

    for (var i = 0; i < Object.keys(copy).length; i++) {
      if (copy[i] > max) {
        max = copy[i]
        maxIndex = i
      }
    }
    return maxIndex
  }


  return (
    <>
      <Header text='Anecdote of the day' />
      <Anecdote anecdotes={anecdotes} index={selected} />
      <Votes points={points} index={selected}/>
      <Button handleClick={handleClick} text='Next anecdote' />
      <Button handleClick={handleClickVote} text='Vote' />
      <Header text='Anecdote with most votes' />
      <Anecdote anecdotes={anecdotes} index={maxIndex} />
      <Votes points={points} index={maxIndex} />
    </>
  )
}

export default App