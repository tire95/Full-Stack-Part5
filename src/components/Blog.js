import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderLeftColor: 'green',
    borderLeftWidth: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5
  }

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    if (JSON.parse(loggedUserJSON).username === blog.user.username) {
      return (
        <div style={blogStyle} className='blog'>
          <i>{blog.title}</i> by {blog.author}
          <Togglable buttonLabel='Show'>
            <p>{blog.url}</p>
            <p>{blog.likes} <input type='button' value='Like' id='likeButton' onClick={() => updateBlog(blog.id, {
              author: blog.author,
              title: blog.title,
              url: blog.url,
              likes: blog.likes + 1
            })}></input></p>
            <input type='button' value='Delete' id='deleteButton' onClick={() => deleteBlog(blog.id, blog.title)}></input>
          </Togglable>
        </div>
      )
    } else {
      return (
        <div style={blogStyle} className='blog'>
          <i>{blog.title}</i> by {blog.author}
          <Togglable buttonLabel='Show'>
            <p>{blog.url}</p>
            <p>{blog.likes} <input type='button' value='Like' id='likeButton' onClick={() => updateBlog(blog.id, {
              author: blog.author,
              title: blog.title,
              url: blog.url,
              likes: blog.likes + 1
            })}></input></p>
          </Togglable>
        </div>
      )
    }
  } else {
    return (
      <div style={blogStyle} className='blog'>
        <i>{blog.title}</i> by {blog.author}
        <Togglable buttonLabel='Show'>
          <p>{blog.url}</p>
          <p>{blog.likes} <input type='button' value='Like' id='likeButton' onClick={() => updateBlog(blog.id, {
            author: blog.author,
            title: blog.title,
            url: blog.url,
            likes: blog.likes + 1
          })}></input></p>
        </Togglable>
      </div>
    )
  }
}

export default Blog