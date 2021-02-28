import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)
  const handleLikesChange = (event) => setLikes(event.target.value)

  const handleAdd = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url, likes,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return (
    <div className='blogFormDiv'>
      <form onSubmit={handleAdd}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='Title'
            id='titleInput'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            name='Author'
            id='authorInput'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            value={url}
            name='Url'
            id='urlInput'
            onChange={handleUrlChange}
          />
        </div>
        <div>
          Likes:
          <input
            type='number'
            value={likes}
            name='Likes'
            id='likesInput'
            onChange={handleLikesChange}
          />
        </div>
        <button type='submit' id='blogCreationButton'>Add blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm