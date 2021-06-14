import anecdoteService from '../services/anecdotes'

const orderByVotes = (anecdotes) => {
  const sorted = [...anecdotes]
  return sorted.sort((a,b) => b.votes - a.votes)
}

const anecdoteReducer = (state = [], action) => {
  
  switch(action.type) {
    case 'VOTE': {

      const id = action.data.id

      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      return orderByVotes(newState)
    }
    case 'NEW_ANECDOTE': 
      return orderByVotes([...state, action.data])
    case 'INIT_ANECDOTES': 
      return orderByVotes(action.data)
    default:
    return orderByVotes(state)
  }
}

export const voteAnecdote = id => {
  return  async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const addNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer