import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

    const vote = (id) => {
        props.voteAnecdote(id)
        const anecdoteVoted = props.anecdotes.find(a => a.id === id)
        props.setNotification(`you voted '${anecdoteVoted.content}'`, 5)
    }

    return (
        <>
            {props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes} votes
                <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === '') {
        return {
            anecdotes: state.anecdotes
        }
    } else {
        return {
            anecdotes: state.anecdotes.filter(a => a.content.toUpperCase().includes(state.filter.toUpperCase()))
        }
    }
}

export default connect(
    mapStateToProps,
    {
        voteAnecdote,
        setNotification
    }
)(Anecdotes)