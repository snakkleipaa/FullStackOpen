/* eslint-disable react/no-unknown-property */
import React, { useEffect } from 'react'
import 'bulma/css/bulma.min.css'
import {
  BrowserRouter as Router,
  Switch, Route, useParams,
  Link
} from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import User from './components/User'

import loginService from './services/login'
import storage from './utils/storage'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addNewBlog, likeBlog, removeBlog, addComment } from './reducers/blogReducer'
import { newComment, newPassword, newUsername, setUser } from './reducers/userReducer'
import { newSuccess, newError } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'


const Login = ({ notification, handleLogin, username, password }) => {

  const dispatch = useDispatch()
  return (
    <div>
      <h2>Login to application</h2>

      <Notification notification={notification} />

      <div class='field'>
        <input class='input' style={{ width: 300 }} type='username' placeholder='Username' value={username} onChange={({ target }) => dispatch(newUsername(target.value))}/>
      </div>
      <div class='field'>
        <input class='input' style={{ width: 300 }} type='password' placeholder='Password' value={password} onChange={({ target }) => dispatch(newPassword(target.value))}/>
      </div>
      <div class='field'>
        <p class='control'>
          <button class='button is-success' onClick={handleLogin}>
          Login
          </button>
        </p>
      </div>
    </div>
  )
}
const Bloglist = ({ blogFormRef, createBlog, blogs, handleLike, handleRemove, user }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

const UserList = ({ users }) => {
  if (users.length === 0) {
    return (
      <div></div>
    )
  }
  return (
    <>
      <h2>Users</h2>
      <table class='table'>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <User
              user={user}
              key={user.id}
            />
          )}
        </tbody>
      </table>
    </>
  )
}

const UserBlogList = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </>
  )
}

const BlogView = ({ blogs, handleLike, comment, handleComment }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if(!blog) {
    return null
  }

  return (
    <>
      <h2>{blog.title} - {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button class='button is-small is-primary'onClick={() => handleLike(blog.id)}>like</button></div>
      <div>Added by {blog.user.name}</div>
      <h3>Comments:</h3>
      <form onSubmit={() => handleComment(blog.id, comment)}>
        <div class='field'>
          <input
            class='input'
            type='comment'
            style={{ width: 400 }}
            placeholder='New comment'
            value={comment}
            onChange={({ target }) => dispatch(newComment(target.value))}
          />
        </div>
        <div class='field'>
          <div class='control'>
            <button
              class='button is-small is-primary'
              id='addComment'
              onClick={handleComment}>
                add comment
            </button>
          </div>
        </div>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={Math.floor(Math.random() * (10000 - 1) + 1)}>{comment}</li>
        )}
      </ul>
    </>
  )
}

const Menu = ({ user, handleLogout }) => {

  return (
    <div>
      <nav class='navbar is-light'>
        <div class='navbar-menu is-active'>
          <div class='navbar-start'>
            <div class='navbar-item is-expanded'>
              <Link to='/'>Blogs</Link>
            </div>
            <div class='navbar-item is-expanded'>
              <Link to='/users'>Users</Link>
            </div>
          </div>
        </div>
        <div class='navbar-end'>
          <div class='navbar-item'>
            <div style={{ paddingRight: 10 }}>
              {user.name} logged in
            </div>
            <button class='button is-link is-small' onClick={handleLogout}>logout</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

const App = () => {

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user.user)
  const username = useSelector(state => state.user.username)
  const password = useSelector(state => state.user.password)
  const notification = useSelector(state => state.notification)
  const comment = useSelector(state => state.user.comment)

  const notifyWith = (message, type = 'success') => {
    if (type === 'success') {
      dispatch(newSuccess(message))
    }
    if (type === 'error') {
      dispatch(newError(message))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      dispatch(newUsername(''))
      dispatch(newPassword(''))
      dispatch(setUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(addNewBlog(blog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(updatedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }

  const handleComment = (id, comment) => {
    dispatch(addComment(id, comment))
  }


  if ( !user ) {
    return (
      <div class='content'>
        <Login
          notification={notification}
          handleLogin={handleLogin}
          username={username}
          password={password} />
      </div>
    )
  }

  return (
    <div>
      <Router>
        <Menu user={user} handleLogout={handleLogout}/>
        <div class='content'>
          <h1>Blog app</h1>

          <Notification notification={notification} />

          <Switch>
            <Route path='/users/:id'>
              <UserBlogList users={users}/>
            </Route>
            <Route path='/users'>
              <UserList users={users} />
            </Route>
            <Route path='/:id'>
              <BlogView blogs={blogs} handleLike={handleLike} comment={comment} handleComment={handleComment} />
            </Route>
            <Route path='/'>
              <Bloglist
                blogFormRef={blogFormRef}
                createBlog={createBlog}
                blogs={blogs}
                handleLike={handleLike}
                handleRemove={handleRemove}
                user={user} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App