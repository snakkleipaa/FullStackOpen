import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import Select from 'react-select'
import { UPDATE_BORN, ALL_AUTHORS } from '../queries'


const Authors = (props) => {

  const names = props.authors.map(a => a.name)
  const options = []
  names.forEach(el => options.push({ label: el, value: el}))

  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(UPDATE_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  const updateBorn = (event) => {
    event.preventDefault()

    const setBornTo = parseInt(born)

    editAuthor({
      variables: { name: name.value, setBornTo }
    })

    setName(null)
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (props.token) {
    return (
      <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>set birthyear:</h3>
      <form onSubmit={updateBorn}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
