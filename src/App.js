import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })
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
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setError(false)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError(true)
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.addNew(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
      setError(false)
      setError(false)
      setMessage(`Blog ${returnedBlog.title} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch(error => {
      setError(true)
      setMessage(`Blog adding failed; ${error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.filter(blog => blog.id !== id).concat(updatedBlog).sort((a, b) => b.likes - a.likes))
      setError(false)
      setError(false)
      setMessage(`Blog ${updatedBlog.title} updated`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError(true)
      setMessage('Blog updating failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id, title) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id).sort((a, b) => b.likes - a.likes))
      setError(false)
      setError(false)
      setMessage(`Blog ${title} deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError(true)
      setMessage('Blog deletion failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logout = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(null)
      window.localStorage.clear()
      setUser(null)
      setError(false)
      setMessage('Logout succesful')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError(true)
      setMessage('Well this is awkward... logout failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Message message={message} error={error}></Message>
        <h2>Log in to application</h2>
        <Togglable buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Message message={message} error={error}></Message>
      <p>{user.name} logged in </p>
      <input type="button" value="Logout" onClick={logout}></input>
      <h2>blogs</h2>
      <div id='blogs'>{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} userId={user.id} className='blog' />
      )}</div>
      <Togglable buttonLabel='Add a new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
    </div>
  )
}


export default App