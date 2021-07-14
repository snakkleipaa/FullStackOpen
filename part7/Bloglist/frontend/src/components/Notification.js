/* eslint-disable linebreak-style */
/* eslint-disable react/no-unknown-property */
import 'bulma/css/bulma.min.css'
import React from 'react'

const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }

  if (notification.type === 'success') {

    return (
      <div class='notification is-success'>
        {notification.message}
      </div>
    )
  }

  if (notification.type === 'error') {
    return (
      <div class='notification is-danger'>
        {notification.message}
      </div>
    )
  }
}

export default Notification