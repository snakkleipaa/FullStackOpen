/* eslint-disable linebreak-style */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE': {
    const id = action.data.id
    const blogToLike = state.find(b => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    const newState = state.map(blog =>
      blog.id !== id ? blog : likedBlog
    )
    return newState
  }
  case 'REMOVE_BLOG': {
    const id = action.data.id
    const newState = state.filter(
      b => b.id !== id
    )
    return newState
  }
  case 'ADD_COMMENT': {
    const id = action.data.id
    const blogToComment = state.find(b => b.id === id)
    const commentedBlog = {
      ...blogToComment,
      comments: blogToComment.comments.concat(action.content)
    }
    const newState = state.map(blog =>
      blog.id !== id ? blog : commentedBlog)
    return newState
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addNewBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    const removedBlog = await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: removedBlog
    })
  }
}

export const addComment = ( id, comment ) => {
  return async dispatch => {
    const newComment = {
      content: comment
    }
    const updatedBlog = await blogService.createComment(id, newComment)
    dispatch({
      type: 'ADD_COMMENT',
      content: comment,
      data: updatedBlog
    })
  }
}

export default blogReducer
