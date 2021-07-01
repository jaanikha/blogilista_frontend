import React, { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    handleSubmit({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }


  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            id='title'
            type="text"
            value={newTitle}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author
          <input
            id='author'
            type="text"
            value={newAuthor}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL
          <input
            id='url'
            type="text"
            value={newURL}
            name="URL"
            onChange={handleURLChange}
          />
        </div>
        <button id='submit-button' type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm
