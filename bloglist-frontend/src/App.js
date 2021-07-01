import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className='success'>{message}</div>
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className='error'>{message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if(window.localStorage.getItem('loggedUser')){refreshBlogs()}
  }, [])

  const refreshBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    console.log('refreshing')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      refreshBlogs()

      setUser(user)
      setUsername('')
      setPassword('')
      console.log(username)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    console.log('Logging out')
    setUser(null)
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      setSuccessMessage('blog was successfully deleted')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const handleLikeBlog = async (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    }

    await blogService.update(blog.id, blogObject)

    refreshBlogs()
  }

  const handleAddBlog = (blogObject) => {

    blogService
      .addBlog(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage('blog was successfully added')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setAddBlogVisible(false)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs)
      })
  }

  const blogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id='addNewBlog-button' onClick={() => setAddBlogVisible(true)}>
            add a new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm handleSubmit={handleAddBlog}/>
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const blogList = () => {
    return (
      <div><ul>
        {blogs
          .sort((a, b) => {
            if (a.likes > b.likes) {
              return -1
            }
            if (a.likes < b.likes) {
              return 1
            }
            return 0
          })
          .map((blog) => (
            <li key={blog.id}>
              {' '}
              <Blog key={blog.id} blog={blog} handleLikeBlog={() => handleLikeBlog(blog)}/>{' '}
              {user.username === blog.user.username ? (
                <button id='delete_button' onClick={() => handleDeleteBlog(blog)}>delete</button>
              ) : null}{' '}
            </li>
          ))}
      </ul></div>
    )
  }

  if (user === null) {
    return (
      <div>
        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>

      {blogForm()}
      {blogList()}
    </div>
  )
}

export default App
