/* eslint-disable linebreak-style */

const initialState = {
  user: null,
  username: '',
  password: '',
  comment: ''
}
const userReducer = (state = initialState, action) => {

  switch(action.type) {
  case 'SET_USER':
    return {
      ...state,
      user: action.data
    }
  case 'NEW_USERNAME':
    return {
      ...state,
      username: action.data
    }
  case 'NEW_PASSWORD':
    return {
      ...state,
      password: action.data
    }
  case 'NEW_COMMENT':
    return {
      ...state,
      comment: action.data
    }
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch  => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const newUsername = (username) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_USERNAME',
      data: username
    })
  }
}

export const newPassword = (password) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_PASSWORD',
      data: password
    })
  }
}

export const newComment = (comment) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_COMMENT',
      data: comment
    })
  }
}

export default userReducer