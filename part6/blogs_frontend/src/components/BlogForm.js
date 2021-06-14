import React,  { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

    const [newTitle, setTitle] = useState('')
    const [newAuthor, setAuthor] = useState('')
    const [newURL, setURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newURL
        })
        setTitle('')
        setAuthor('')
        setURL('')
    }

    return (
        <div className='formDiv'>
            <h2>add new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                title:
                    <input
                        id='title'
                        value={newTitle}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                author:
                    <input
                        id='author'
                        value={newAuthor}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                url:
                    <input
                        id='url'
                        value={newURL}
                        onChange={({ target }) => setURL(target.value)}
                    />
                </div>
                <button type="submit" id='createBlog-button'>create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm