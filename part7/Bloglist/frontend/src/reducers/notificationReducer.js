/* eslint-disable linebreak-style */
const notificationReducer = (state=null, action) => {
  switch(action.type) {
  case 'NEW_SUCCESS':
    return {
      message: action.data,
      type: 'success'
    }
  case 'NEW_ERROR':
    return {
      message: action.data,
      type:'error'
    }
  case 'NULL':
    return null
  default:
    return state
  }
}

export const newSuccess = (content) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_SUCCESS',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'NULL'
      }
      )}, 5000)
  }
}

export const newError = (content) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_ERROR',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'NULL'
      }
      )}, 5000)
  }
}

export default notificationReducer