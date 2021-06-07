import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort(function (a,b) {
                return b.likes - a.likes
            })
            )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        setUser(null)
        blogService.setToken(null)
        window.localStorage.clear()
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNotificationMessage(
                    `successfully added a new blog ${blogObject.title} by ${blogObject.author}`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })
    }

    const handleLike = id => {
        const blog = blogs.find(b => b.id === id)
        const updatedBlog = { ...blog, likes: blog.likes + 1 }

        blogService
            .update(updatedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
            })
            .catch(() => {
                setErrorMessage(
                    'Update not successful'
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })

        setBlogs(blogs.sort(function (a,b) {
            return b.likes - a.likes
        }))
    }

    const handleRemove = id => {
        const blogToRemove = blogs.find(b => b.id === id)
        const confirm = window.confirm(`Remove blog ${blogToRemove.name} by ${blogToRemove.author}?`)
        if (confirm) {
            blogService
                .remove(id)
        }
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable showButton='new blog' cancelButton='cancel' ref ={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )


    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Error message={errorMessage} />
                <form onSubmit={handleLogin} className='loginForm'>
                    <div>
            username
                        <input
                            type="text"
                            value={username}
                            id="username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
            password
                        <input
                            type="password"
                            value={password}
                            id="password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit" id='login-button'>login</button>
                </form>
            </div>
        )
    }
    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={notificationMessage} />
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <div>{blogForm()}</div>
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} className='blog' blog={blog} handleLike={() => handleLike(blog.id)} handleRemove={() => handleRemove(blog.id)} />
                )}
            </div>
        </div>
    )
}

export default App