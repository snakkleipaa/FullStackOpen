import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [filter, setFilter] = useState(null)
  const books = useQuery(ALL_BOOKS, { variables: { genre: filter }})

  if (!props.show) {
    return null
  }

  var genres = []
  const mergedGenres = props.books.map(b => b.genres.map(g => genres.push(g)))
  const distinctGenres = [... new Set(genres)]

  const handleClick = (event) => {
    event.preventDefault()
    const buttonValue = event.target.value
    setFilter(buttonValue)
  }

  if (books.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (filter) {

    return ( 
      <div>
        <h2>books in genre '{filter}'</h2>

        <div>
          {distinctGenres.map(g => 
            <button key={g} value={g} onClick={handleClick}>{g}</button>)}
          <button value={null} onClick={handleClick}>all genres</button>
        </div>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {books.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        {distinctGenres.map(g => 
          <button key={g} value={g} onClick={handleClick}>{g}</button>)}
        <button value={null} onClick={handleClick}>all genres</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books