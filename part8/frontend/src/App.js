
import { useApolloClient, useQuery, useLazyQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

import { ALL_AUTHORS, ALL_BOOKS, USER, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('books-user-token'))
  const resAuthors = useQuery(ALL_AUTHORS)
  const resBooks = useQuery(ALL_BOOKS)
  const user = useQuery(USER, { pollInterval: 1000 })
  const client = useApolloClient()

  /*useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New book (${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}) added!`)
    }
  })*/

  if (resAuthors.loading || resBooks.loading || user.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={() => logout()}>logout</button>
        </div>

        <Authors
          token={token}
          show={page === 'authors'}
          authors={resAuthors.data.allAuthors}
        />

        <Books 
          show={page === 'books'}
          books={resBooks.data.allBooks}
        />

        <NewBook
          show={page === 'add'}
        />

        <Recommended
          show={page === 'recommended'}
          user={user}
        />

      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors
        token ={token}
        show={page === 'authors'}
        authors={resAuthors.data.allAuthors}
      />

      <Books 
        show={page === 'books'}
        books={resBooks.data.allBooks}
      />

      <LoginForm 
        setToken={setToken}
        show={page === 'login'}
      />

    </div>
  )
}

export default App