import React from 'react'

const Message = ({ message, error }) => {
  if (error) {
    return (
      <div className="error">{message}</div>
    )
  } else {
    return (
      <div className="message">{message}</div>
    )
  }
}

export default Message