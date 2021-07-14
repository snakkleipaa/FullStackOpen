/* eslint-disable linebreak-style */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react'
import 'bulma/css/bulma.min.css'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <div class='field'>
        <input
          class='input'
          type='author'
          style={{ width: 300 }}
          placeholder='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div class='field'>
        <input
          class='input'
          type='title'
          style={{ width: 300 }}
          placeholder='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div class='field'>
        <input
          class='input'
          type='url'
          style={{ width: 300 }}
          placeholder='URL'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div class='field'>
        <p class='control'>
          <button class='button is-primary' onClick={handleNewBlog}>Create</button>
        </p>
      </div>
    </div>
  )
}

export default NewBlog